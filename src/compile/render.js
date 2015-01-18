"use strict"

const
	assert = require("assert"),
	E = require ("./E"),
	Lang = require("./Lang"),
	Op = require("./U/Op"),
	Opts = require("./Opts"),
	SourceNode = require("source-map").SourceNode,
	Span = require("./Span"),
	Sq = require("./U/Sq"),
	T = require("./T"),
	type = require("./U/type"),
	types = require("./U/types"),
	U = require("./U"),
	Vr = require("./Vr")

module.exports = function render(e, opts, vr) {
	type(e, E, opts, Opts, vr, Vr)
	return r(Rx({ indent: "", opts: opts, vr: vr }))(e)
}

// Context used while rendering.
const Rx = types.recordType("Rx", Object, {
	indent: String, // Made entirely out of \t
	opts: Opts,
	vr: Vr,
})
Object.assign(Rx.prototype, {
	indented: function() { return U.with(this, "indent", "\t" + this.indent) },
	nl: function() { return "\n" + this.indent },
	snl: function() { return ";\n" + this.indent },
	cnl: function() { return ",\n" + this.indent }
})

E.prototype.render = function(rx, arg) { // Some E_s pass an arg to their child
	type(rx, Rx)
	const content = this.renderContent(rx, arg)
	const line = this.span.start.line
	const column = this.span.start.column
	type(line, Number, column, Number)
	assert(line >= 1 && column >= 1)
	const typeJ = function(j) {
		if (typeof j === "string" || j instanceof SourceNode) return
		type(j, Array)
		j.forEach(typeJ)
	}
	typeJ(content)
	return new SourceNode(line, column, rx.opts.msPathRelToJs(), content)
}

const r = function(rx, othArg) {
	type(rx, Rx)
	return function(e) { return e.render(rx, othArg) }
}

const commad = function(rx, parts) {
	type(rx, Rx, parts, [E])
	return Sq.interleave(parts.map(r(rx)), ", ")
}

U.implementMany(E, "renderContent", {
	Assign: function(rx) {
		return makeAssign(rx, this.span, this.assignee, this.k, this.value)
	},

	AssignDestructure: function(rx) {
		const destructuredName = "_$" + this.span.start.line
		const k = this.k
		const access = accessMangledLocal(destructuredName, this.isLazy)
		const assigns = this.assignees.map(function(assignee) {
			const get = (assignee.okToNotUse && !rx.vr.isAccessed(assignee)) ?
				access + makeMember(assignee.name) // TODO: Ignore...
				: "_ms.get(" + access + ", \"" + assignee.name + "\")"
			const value = E.Literal({
				span: assignee.span,
				k: "js",
				value: get
			})
			return makeAssign(rx, assignee.span, assignee, k, value)
		})
		const value =
			this.isLazy ? lazyWrap(r(rx)(this.value)) : r(rx)(this.value)
		return [
			"const ",
			destructuredName,
			" = ",
			value,
			rx.snl(),
			Sq.interleave(assigns, rx.snl())
		]
	},

	BlockBody: function (rx, opResCheck) {
		if (opResCheck === undefined)
			opResCheck = []

		const opIn = rx.opts.includeInoutChecks() ? this.opIn : []
		const opOut = rx.opts.includeInoutChecks() ? this.opOut : []

		const _in = opIn.map(r(rx))
		const body = this.lines.map(r(rx))

		const needResLocal = !(Sq.isEmpty(opResCheck) && Sq.isEmpty(opOut))
		if (needResLocal) {
			const makeRes = this.opReturn.map(function(ret) { return [
				"const res = ",
				r(rx)(ret)
			]})
			const _out = rx.opts.includeInoutChecks() ? opOut.map(r(rx)) : []
			const ret = this.opReturn.map(function() { return "return res" })
			return Sq.interleave(_in.concat(body, makeRes, opResCheck, _out, ret), rx.snl())
		}
		else {
			// no res check or out
			const ret = this.opReturn.map(function(ret) { return [
				"return ",
				r(rx)(ret)
			]})
			return Sq.interleave(_in.concat(body, ret), rx.snl())
		}
	},
	BlockWrap: function(rx) { return [
		rx.vr.eIsInGenerator(this) ? "yield* (function*() {" : "(function() {",
		rx.nl(), "\t",
		r(rx.indented())(this.body),
		rx.snl(),
		"})()"
	]},
	Call: function(rx) { return [
		r(rx)(this.called),
		"(",
		commad(rx, this.args),
		")"
	]},
	CaseDo: function(rx) {
		return caseBody(rx, this.parts, this.opElse, true)
	},
	CaseVal: function(rx) {
		return caseBody(rx, this.parts, this.opElse, false)
	},
	CasePart: function(rx, needBreak) {
		const rxResult = rx.indented()
		return [
			"case ",
			r(rx)(this.test),
			": {",
			rxResult.nl(),
			r(rxResult)(this.result),
			needBreak ? [ rxResult.snl(), "break" ] : [],
			rx.snl(),
			"}"
		]
	},
	Debugger: function() { return "debugger" },
	DictReturn: function(rx) {
		const keysVals = this.keys.map(function(key) { return [
			quote(key),
			", ",
			mangle(key)
		]}).concat(this.opDisplayName.map(function(_) { return [
			quote("displayName"),
			", ",
			quote(_)
		]}))
		const args = Sq.interleave(keysVals, ", ")
		return Op.ifElse(this.opDicted,
			function(dicted) { return [
				"_ms.dictify(",
				r(rx)(dicted),
				", ",
				args,
				")"
			]},
			function() { return [
				"_ms.Dict(",
				args,
				")"
			]})
	},
	EndLoop: function() {
		return "break " + mangle(this.name)
	},
	Fun: function(rx) {
		const rxFun = rx.indented()
		const span = this.span
		const opResCheck = Sq.flatMap(this.opReturnType, function(_) {
			// TODO: Probably a better way
			return opLocalCheck(
				rx,
				E.LocalDeclare({
					span: span,
					name: "res",
					opType: Op.Some(_),
					isLazy: false,
					okToNotUse: false
				}),
				false)
		})
		const args = this.args
		return [
			(this.k === "|") ? "function(" : "function*(",
			commad(rx, args),
			") {",
			rxFun.nl(),
			this.opRestArg.map(function(rest) { return [
				"const ",
				r(rx)(rest),
				" = [].slice.call(arguments, ",
				args.length.toString(),
				");",
				rxFun.nl(),
			]}),
			Sq.interleavePlus(
				Sq.mpf(args, function(arg) { return opLocalCheck(rx, arg, arg.isLazy); }),
				rxFun.snl()),
			r(rxFun, opResCheck)(this.body),
			rx.snl(),
			"}"
		]
	},
	Lazy: function(rx) {
		return lazyWrap(r(rx)(this.value))
	},
	ListReturn: function(rx) { return [
		"_ms.mkArray(",
		Sq.interleave(
			Sq.range(0, this.length).map(function(i) { return "_" + i }),
			", "),
		")"
	]},
	ListSimple: function(rx) { return [
		"_ms.mkArray(",
		commad(rx, this.parts),
		")"
	] },
	ListEntry: function(rx) { return [
		"const _",
		this.index.toString(),
		" = ",
		r(rx)(this.value)
	]},
	Literal: function() {
		const v = this.value
		switch (this.k) {
			case Number:
				return /[\.e]/.test(v) ? v : [ "(", v, ")" ]
			case String:
				return [ quote(v) ]
			case "js":
				return v
			default: fail()
		}
	},
	LocalAccess: function(rx) {
		return accessLocal(this.name, rx.vr.isLazy(this))
	},
	LocalDeclare: function(rx) {
		return mangle(this.name)
	},
	Loop: function(rx) { return [
		mangle(this.name),
		": while (true) {",
		rx.nl(), "\t",
		r(rx.indented())(this.body),
		rx.nl(),
		"}"
	]},
	Map: function(rx) { return [
		"_ms.map(",
		Sq.interleave(
			Sq.range(0, this.length).map(function(i) { return [
				"_k",
				i.toString(),
				", ",
				"_v",
				i.toString()
			]}),
			", "),
		")"
	]},
	MapEntry: function(rx) { return [
		"const _k",
		this.index.toString(),
		" = ",
		r(rx)(this.key),
		", _v",
		this.index.toString(),
		" = ",
		r(rx)(this.val)
	]},
	Member: function(rx) { return [
		r(rx)(this.object),
		makeMember(this.name)
	]},
	Module: function(rx) { return [
		"// Compiled from ", rx.opts.msPathRelToJs(), "\n",
		"//# sourceMappingURL=", rx.opts.sourceMapPathRelToJs(), "\n",
		"\"use strict\"",
		// "\nglobal.console.log(\">>> " + rx.opts.moduleName() + "\")\n",
		rx.snl(),
		r(rx)(this.body),
		rx.snl(),
		// "\nglobal.console.log(\"<<< " + rx.opts.moduleName() + "\")\n"
	]},
	// TODO:ES6
	ModuleDefaultExport: function(rx) { return [
		"exports",
		makeMember(rx.opts.moduleName()),
		" = ",
		r(rx)(this.value)
	]},
	Null: function() { return "null" },
	True: function() { return "true" },
	Quote: function(rx) {
		return (this.parts.length == 0) ?
			"\"\"" :
			(this.parts.length === 1 && this.parts[0] instanceof E.Literal && this.parts[0].k === String) ?
			r(rx)(Sq.head(this.parts)) :
			[ "_ms.mkStr(", commad(rx, this.parts), ")" ]
	},
	Require: function() { return [
		"require(\"",
		this.path,
		"\")"
	]},
	Scope: function(rx) { return [
		"{", rx.nl(),
		"\t",
		Sq.interleave(this.lines.map(r(rx.indented())), rx.nl() + "\t"),
		rx.nl(),
		"}"
	]},
	SpecialKeyword: function(rx) {
		switch (this.k) {
			case "undefined": return "undefined"
			case "this-module-directory": return "__dirname"
			default: throw up
		}
	},
	Sub: function(rx) { return [
		"_ms.sub(",
		commad(rx, Sq.cons(this.subject, this.subbers)),
		")"
	]},
	This: function() { return "this" },
	TypeTest: function(rx) { return [
		"_ms.contains(",
		r(rx)(this.testType),
		", ",
		r(rx)(this.tested),
		")"
	]},
	Yield: function(rx) { return [
		"yield ",
		r(rx)(this.yielded)
	]},
	YieldTo: function(rx) { return [
		"yield* ",
		r(rx)(this.yieldedTo)
	]}
})

const lazyWrap = function(value) { return [
	"_ms.Lazy(function() { return ",
	value,
	"; })"
]}

const accessLocal = function(name, isLazy) {
	return accessMangledLocal(mangle(name), isLazy)
}
const accessMangledLocal = function(mangledName, isLazy) {
	type(mangledName, String, isLazy, Boolean)
	return isLazy ? ("_ms.unlazy(" + mangledName + ")") : mangledName
}

const opLocalCheck = function(rx, local, isLazy) {
	type(local, E.LocalDeclare, isLazy, Boolean)
	if (!rx.opts.includeTypeChecks())
		return []
	// TODO: Way to typecheck lazies
	return isLazy ? Op.None : local.opType.map(function(typ) { return [
		"_ms.checkContains(",
		r(rx)(typ),
		", ",
		accessLocal(local.name, false),
		", \"",
		local.name,
		"\")",
	]})
}

const makeAssign = function(rx, span, assignee, k, value) {
	type(rx, Rx, span, Span, assignee, E, k, Lang.KAssign, value, E)
	const to = r(rx)(assignee)
	const doAssign = (function() { switch (k) {
		case "=": case ". ": case "<~": case "<~~":
			if (assignee.isLazy) {
				// For a lazy value, type checking is not done until after it is generated.
				const fun = E.Fun({
					span: span,
					opName: Op.None,
					args: [],
					opRestArg: Op.None,
					body: E.BlockBody({
						span: span,
						lines: [],
						opReturn: Op.Some(value),
						opIn: Op.None,
						opOut: Op.None
					}),
					opReturnType: assignee.opType,
					k: "|"
				})
				return [
					"const ",
					to,
					" = _ms.Lazy(",
					r(rx)(fun),
					")"
				]
			}
			else
				return [ "const ", to, " = ", r(rx)(value) ]
		case "export":
			assert(!assignee.isLazy) // TODO:ES6
			return [ "const ", to, " = exports", makeMember(assignee.name), " = ", r(rx)(value) ]
			// return [ "export const ", to, " = ", jValue ]; TODO:ES6
		default: fail()
	} })()
	return [
		doAssign,
		opLocalCheck(rx, assignee, k === "~=").map(function(lc) { return [ rx.snl(), lc ] })
	]
}

const makeMember = function(name) {
	type(name, String)
	return needsMangle(name) ? "[\"" + name + "\"]" : "." + name
}

const caseBody = function(rx, parts, opElse, needBreak) {
	const rxSwitch = rx.indented()
	const rxResult = rxSwitch.indented()
	const jElse = Op.ifElse(opElse,
		function(elze) { return [
			"default: {",
			rxResult.nl(),
			r(rxResult)(elze),
			rxSwitch.snl(),
			// This one never needs a break, because it's at the end anyway.
			"}"
		]},
		function() { return "default: throw new global.Error(\"Case fail\");" })
	const jParts = parts.map(function(part) { return r(rxSwitch, needBreak)(part) })
	const jAllParts = Sq.rcons(jParts, jElse)
	return [
		"switch (true) {",
		rxSwitch.nl(),
		Sq.interleave(jAllParts, rxSwitch.nl()),
		rx.nl(),
		"}"
	]
}

const mangle = function(name) {
	return JSKeywords.has(name) ?
		"_" + name :
		name.replace(/[^a-zA-Z0-9_]/g, function(ch) { return "_" + ch.charCodeAt(0) })
}

const needsMangle = function(name) {
	return JSKeywords.has(name) || name.search(/[^a-zA-Z0-9_]/) !== -1
}

const JSKeywords = new Set([
	"abstract",
	"arguments",
	"boolean",
	"break",
	"byte",
	"case",
	"catch",
	"char",
	"class",
	"comment",
	"const",
	"continue",
	"debugger",
	"default",
	"delete",
	"do",
	"double",
	"else",
	"enum",
	"eval",
	"export",
	"extends",
	"false",
	"final",
	"finally",
	"float",
	"for",
	"function",
	"function*",
	"global",
	"goto",
	"if",
	"implements",
	"import",
	"in",
	"instanceOf",
	"int",
	"interface",
	"label",
	"long",
	"module",
	"native",
	"new",
	"null",
	"package",
	"private",
	"protected",
	"public",
	"return",
	"short",
	"static",
	"super",
	"switch",
	"synchronized",
	"this",
	"throw",
	"throws",
	"transient",
	"true",
	"try",
	"typeof",
	"undefined",
	"var",
	"void",
	"while",
	"with",
	"yield",
	"yield*"
])

const quote = function(str) {
	type(str, String);
	const escaped = str.split('').map(function(ch) {
		return {
			'\n': '\\n',
			'\t': '\\t',
			'"': "\\\"",
			'\\': "\\\\"
		}[ch] || ch;
	}).join('')
	const res = "\"" + escaped + "\""
	assert(eval(res) === str)
	return res
}
