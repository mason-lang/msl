import { UseDo } from '../../Expression'
import { ArrayExpression, BinaryExpression, BlockStatement, CallExpression,
	Identifier, ExpressionStatement, FunctionExpression, IfStatement, Literal, ObjectExpression,
	Program, ReturnStatement, UnaryExpression, VariableDeclaration, VariableDeclarator,
	assignmentExpressionPlain, member, idCached, idSpecialCached }
	from '../esast'
import manglePath from '../manglePath'
import { flatMap, isEmpty, last, push } from '../U/Bag'
import { None, opIf } from '../U/Op'
import { t, IdDefine, IdExports, IdModule, lazyWrap,
	msGetModule, msLazyGetModule, msGetDefaultExport,
	makeDestructureDeclarators, msLazy } from './util'

/*
'use strict';
if (typeof define !== 'function')
	var define = require('amdefine')(module);
define(['exports', 'a', 'b', 'c'], function(exports) {
	// Fake exports -- just a getter.
	exports._get = _ms.lazy(function() {
		const exports = {} // Real exports
		... imports ...
		{
			... exports ...
		}
		return exports
	})
})
*/
export default (_, tx) => {
	const allUses = _.doUses.concat(_.uses, _.debugUses)
	const amdNames = ArrayExpression(AmdFirstUses.concat(
		allUses.map(use => Literal(manglePath(use.path, tx)))))
	const useIdentifiers = allUses.map(useIdentifier)
	const amdArgs = AmdFirstArgs.concat(useIdentifiers)
	const useDos = _.doUses.map((use, i) => {
		const d = ExpressionStatement(msGetModule([ useIdentifiers[i] ]))
		d.loc = use.span
		return d
	})
	const allUseDeclarators = flatMap(_.uses.concat(_.debugUses), (use, i) =>
		useDeclarators(tx, use, useIdentifiers[i + _.doUses.length]))
	const opUseDeclare = opIf(!isEmpty(allUseDeclarators),
		() => VariableDeclaration('const', allUseDeclarators))

	// TODO: Some way of determining when it's OK for a module to not be lazy.
	const isLazy = tx.opts().lazyModule()

	const lead = useDos.concat(opUseDeclare, opIf(isLazy, () => DeclareExports))
	const trail = [ ReturnStatement(IdExports) ]
	const moduleBody = t(tx, lead, None, trail)(_.block)
	const body =
		isLazy ?
			BlockStatement([ lazyBody(moduleBody) ])
			: moduleBody

	const doDefine = ExpressionStatement(
		CallExpression(IdDefine, [
			amdNames,
			FunctionExpression(null, amdArgs, body) ]))

	return Program([ UseStrict ].concat(
		opIf(tx.opts().amdefine(), () => AmdefineHeader),
		[ doDefine ]))
}

const useDeclarators = (tx, _, moduleIdentifier) => {
	// TODO: Could be neater about this
	const isLazy = (isEmpty(_.used) ? _.opUseDefault[0] : _.used[0]).isLazy
	const value = (isLazy ? msLazyGetModule : msGetModule)([ moduleIdentifier ])

	const usedDefault = _.opUseDefault.map(def => {
		const defexp = msGetDefaultExport([ moduleIdentifier ])
		const val = isLazy ? lazyWrap(defexp) : defexp
		const vd = VariableDeclarator(idCached(def), val)
		vd.loc = def.span
		return vd
	})

	const usedDestruct = isEmpty(_.used) ? [] :
		makeDestructureDeclarators(tx, _.span, _.used, isLazy, value, '=', true)
	usedDestruct.forEach(_ => _.loc = _.span)

	return usedDefault.concat(usedDestruct)
}

const
	useIdentifier = (use, i) => idSpecialCached(`${last(use.path.split('/'))}_${i}`),

	// const exports = { }
	DeclareExports = VariableDeclaration('const', [
		VariableDeclarator(IdExports, ObjectExpression([]))]),

	lazyBody = body =>
		ExpressionStatement(
			assignmentExpressionPlain(member(IdExports, '_get'), msLazy([
				FunctionExpression(null, [ ], body)]))),

	// if (typeof define !== 'function') var define = require('amdefine')(module)
	AmdefineHeader = IfStatement(
		BinaryExpression('!==', UnaryExpression('typeof', IdDefine), Literal('function')),
		VariableDeclaration('var', [
			VariableDeclarator(IdDefine, CallExpression(
				CallExpression(Identifier('require'), [ Literal('amdefine') ]),
				[ IdModule ])) ])),

	UseStrict = ExpressionStatement(Literal('use strict')),

	AmdFirstUses = [ Literal('exports') ],
	AmdFirstArgs = [ IdExports ]