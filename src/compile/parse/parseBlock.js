import assert from "assert"
import check from "../check"
import { Assign, BlockBody, BlockWrap, Debug, DictReturn, ListEntry, ListReturn,
	ELiteral, LocalDeclare, MapReturn, MapEntry, Module, ModuleDefaultExport, Val } from "../E"
import { Group, Keyword } from "../T"
import { set } from "../U"
import { None, some } from "../U/Op"
import { head, isEmpty, last, rightTail, tail } from "../U/Sq"
import type, { isa } from "../U/type"
import Px from "./Px"
// TODO
const parseLine_ = function() { return require("./parseLine") }

const KParseBlock = new Set(["any", "do", "val", "module"])

// TODO:RENAME
export function wrap(px, k) {
	return BlockWrap(px.s({ body: parseBody(px, k) }))
}

export function parseModule(px, moduleName) {
	type(px, Px, moduleName, String)
	const mod = parseBody(px, "module")
	const b = mod.body
	// TODO: This also means no module is allowed to be called `displayName`.
	b.lines.forEach(function(line) {
		if (isa(line, Assign) && line.k === "export")
			px.check(line.assignee.name !== "displayName",
				"Module can not choose its own displayName.")
	})
	b.lines.push(Assign(px.s({
		assignee: LocalDeclare(px.s({
			name: "displayName",
			opType: [],
			isLazy: false,
			okToNotUse: true
		})),
		k: "export",
		value: ELiteral(px.s({ value: moduleName, k: String }))
	})))
	return mod
}

export function justBlock(px, k) {
	type(px, Px, k, KParseBlock)
	const _ = takeBlockFromEnd(px, k)
	px.check(isEmpty(_.before), "Expected just a block")
	return _.block
}

export function takeBlockFromEnd(px, k) {
	type(px, Px, k, KParseBlock)
	const _ = takeBlockLinesFromEnd(px)
	return {
		before: _.before,
		block: parseBody(px.w(_.lines), k)
	}
}

export function takeBlockLinesFromEnd(px) {
	type(px, Px)
	px.check(!isEmpty(px.sqt), "Expected an indented block")
	const l = last(px.sqt)
	check(Group.is('->')(l), l.span, "Expected an indented block at the end")
	return { before: rightTail(px.sqt), lines: l.sqt }
}

const parseBody = function(px, k) {
	type(px, Px, k, KParseBlock)
	const _ = tryTakeInOut(px)
	const opIn = _.opIn, opOut = _.opOut, restLines = _.rest

	let dictKeys = []
	let debugKeys = []
	let listLength = 0
	let mapLength = 0
	const eLines = []
	function addLine(ln, inDebug) {
		if (ln instanceof Array) {
			ln.forEach(function(_) { addLine(_, inDebug) })
			return
		}
		if (ln instanceof Debug)
			ln.lines.forEach(function(_) { addLine(_, true) })
		else if (isa(ln, ListEntry)) {
			assert(!inDebug, "Not supported: debug list entries")
			// When ListEntries are first created they have no index.
			assert(ln.index === -1)
			ln = set(ln, "index", listLength)
			listLength = listLength + 1
		}
		else if (isa(ln, MapEntry)) {
			assert(!inDebug, "Not supported: debug map entries")
			assert(ln.index === -1)
			ln = set(ln, "index", mapLength)
			mapLength = mapLength + 1
		}
		else if (isa(ln, Assign) && ln.k === ". ")
			(inDebug ? debugKeys : dictKeys).push(ln.assignee)

		if (!inDebug)
			eLines.push(ln)
		// Else we are adding the Debug as a single line.
	}
	restLines.forEach(function(line) {
		addLine(parseLine_().default(px.w(line.sqt), listLength))
	})

	// TODO
	// if (isEmpty(dictKeys))
	//	check(isEmpty(debugKeys), px.span, "Block can't have only debug keys")
	const isDict = !(isEmpty(dictKeys) && isEmpty(debugKeys))
	const isList = listLength > 0
	const isMap = mapLength > 0
	px.check(!(isDict && isList), "Block has both list and dict lines.")
	px.check(!(isDict && isMap), "Block has both dict and map lines.")
	px.check(!(isList && isMap), "Block has both list and map lines.")

	const isModule = k === "module"

	const doLinesOpReturn = (function() {
		if (k === "do") {
			px.check(!isDict, "Can't make dict in statement context")
			px.check(!isList, "Can't make list in statement context")
			px.check(!isMap, "Can't make map in statement context")
			return { doLines: eLines, opReturn: None }
		}
		if (isList)
			return {
				doLines: eLines,
				opReturn: some(ListReturn(px.s({ length: listLength })))
			}
		if (isMap)
			return {
				doLines: eLines,
				opReturn: some(MapReturn(px.s({ length: mapLength })))
			}

		const lastReturn = !isEmpty(eLines) && isa(last(eLines), Val)
		if (isDict && !isModule)
			return lastReturn ?
				{
					doLines: rightTail(eLines),
					opReturn: some(
						DictReturn(px.s({
							keys: dictKeys,
							debugKeys: debugKeys,
							opDicted: some(last(eLines)),
							// This is filled in by parseAssign.
							opDisplayName: None
						})))
				} : {
					doLines: eLines,
					opReturn: some(DictReturn(px.s({
						keys: dictKeys,
						debugKeys: debugKeys,
						opDicted: None,
						// This is filled in by parseAssign.
						opDisplayName: None
					})))
				}
		else if (lastReturn)
			return {
				doLines: rightTail(eLines),
				opReturn: some(last(eLines))
			}
		else {
			px.check(k !== "val", "Expected a value block")
			return { doLines: eLines, opReturn: None }
		}
	})()
	const doLines = doLinesOpReturn.doLines, opReturn = doLinesOpReturn.opReturn

	if (isModule) {
		// TODO: Handle debug-only exports
		const moduleLines =
			// Turn dict assigns into exports.
			doLines.map(function(line) {
				return isa(line, Assign) && line.k === ". " ?
					set(line, "k", "export") :
					line
			}).concat(opReturn.map(function(ret) {
				return ModuleDefaultExport({ span: ret.span, value: ret })
			}))

		const body = BlockBody(px.s({
			lines: moduleLines,
			opReturn: None,
			opIn: opIn,
			opOut: opOut
		}))
		return Module(px.s({ body: body }))
	}
	else
		return BlockBody(px.s({ lines: doLines, opReturn: opReturn, opIn: opIn, opOut: opOut }))
}

const tryTakeInOut = function(px) {
	const tryTakeInOrOut = function(lines, inOrOut) {
		if (!isEmpty(lines)) {
			const firstLine = head(lines)
			const sqtFirst = firstLine.sqt
			if (Keyword.is(inOrOut)(head(sqtFirst)))
				return {
					took: some(Debug({
						span: firstLine.span,
						lines: parseLine_().parseLines(px.w(sqtFirst))
					})),
					rest: tail(lines)
				}
		}
		return { took: None, rest: lines }
	}

	const _in = tryTakeInOrOut(px.sqt, "in")
	const _out = tryTakeInOrOut(_in.rest, "out")
	return {
		opIn: _in.took,
		opOut: _out.took,
		rest: _out.rest
	}
}
