import assert from 'assert'
import { builders } from 'ast-types'
const { blockStatement, returnStatement } = builders
import { flatMap, isEmpty } from '../U/Bag'
import { ifElse, opIf, None } from '../U/Op'
import { BlockVal, LocalDeclare } from '../Expression'
import { declare, toStatements } from './ast-util'
import { t, maybeWrapInCheckContains, ReturnRes } from './util'

export default (_, tx, lead, opResDeclare, opOut) => {
	if (lead === undefined) {
		lead = []
		opResDeclare = opOut = None
	}
	const body = flatMap(_.lines, line => toStatements(t(tx)(line)))
	const fin = ifElse(opResDeclare,
		rd => {
			assert(_ instanceof BlockVal)
			const returned = maybeWrapInCheckContains(t(tx)(_.returned), tx, rd.opType, 'res')
			return ifElse(opOut,
				o => [ declare(rd, returned) ].concat(o, [ ReturnRes ]),
				() => [ returnStatement(returned) ])
		},
		() => opOut.concat(opIf(_ instanceof BlockVal, () => returnStatement(t(tx)(_.returned)))))
	return blockStatement(lead.concat(body, fin))
}