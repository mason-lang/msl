if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', 'tupl/dist/tupl', 'tupl/dist/type', './private/language'], function (exports, _esastDistLoc, _tuplDistTupl, _tuplDistType, _privateLanguage) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Loc = _interopRequireDefault(_esastDistLoc);

	var _tupl = _interopRequireDefault(_tuplDistTupl);

	const MsAst = (0, _tuplDistTupl.abstract)('MsAst', Object, 'doc');
	exports.default = MsAst;
	const LineContent = (0, _tuplDistTupl.abstract)('ValOrDo', MsAst, 'Valid part of a Block.'),
	      Do = (0, _tuplDistTupl.abstract)('Do', LineContent, '\n\t\tThese can only appear as lines in a Block.\n\t\tNot to be confused with Generator expressions resulting from `do` keyword.'),
	      Val = (0, _tuplDistTupl.abstract)('Val', LineContent, 'These can appear in any expression.');

	exports.LineContent = LineContent;
	exports.Do = Do;
	exports.Val = Val;
	const makeType = function (superType) {
		return function (name, doc, namesTypes, protoProps, tuplProps) {
			return (0, _tupl.default)(name, superType, doc, ['loc', _Loc.default].concat(namesTypes), protoProps, tuplProps);
		};
	};

	const m = makeType(MsAst),
	      d = makeType(Do),
	      v = makeType(Val);

	const LD_Const = 0,
	      LD_Lazy = 1,
	      LD_Mutable = 2,
	      LocalDeclare = m('LocalDeclare', 'TODO:DOC', ['name', String, 'opType', (0, _tuplDistType.Nullable)(Val), 'kind', Number], {
		isLazy: function () {
			return this.kind === LD_Lazy;
		},
		isMutable: function () {
			return this.kind === LD_Mutable;
		}
	}),
	      LocalDeclareUntyped = makeType(LocalDeclare)('LocalDeclareUntyped', 'TODO:DOC', ['name', String, 'kind', Number], { opType: null }),
	      LocalDeclarePlain = makeType(LocalDeclareUntyped)('LocalDeclarePlain', 'TODO:DOC', ['name', String], { kind: LD_Const });

	exports.LD_Const = LD_Const;
	exports.LD_Lazy = LD_Lazy;
	exports.LD_Mutable = LD_Mutable;
	exports.LocalDeclare = LocalDeclare;
	exports.LocalDeclareUntyped = LocalDeclareUntyped;
	exports.LocalDeclarePlain = LocalDeclarePlain;
	const localDeclarePlainType = function (name) {
		return makeType(LocalDeclarePlain)('LocalDeclare_' + name, 'TODO:DOC', [], { name: name });
	};

	const LocalDeclareBuilt = localDeclarePlainType('built'),
	      LocalDeclareFocus = localDeclarePlainType('_'),
	      LocalDeclareName = localDeclarePlainType('name'),
	      LocalDeclareRes = makeType(LocalDeclare)('LocalDeclareRes', 'TODO:DOC', ['opType', (0, _tuplDistType.Nullable)(Val)], {
		name: 'res',
		kind: LD_Const
	}),
	     

	// All have .allAssignees()
	Assign = (0, _tuplDistTupl.abstract)('Assign', Do, 'TODO:DOC'),
	      AssignSingle = makeType(Assign)('AssignSingle', 'TODO:DOC', ['assignee', LocalDeclare, 'value', Val], {
		allAssignees: function () {
			return [this.assignee];
		}
	}, {
		focus: function (loc, value) {
			return AssignSingle(loc, LocalDeclareFocus(loc), value);
		}
	}),
	      AssignDestructure = makeType(Assign)('AssignDestructure', 'TODO:DOC', ['assignees', [LocalDeclare], 'value', Val], {
		allAssignees: function () {
			return this.assignees;
		},
		// All assignees must share the same kind.
		kind: function () {
			return this.assignees[0].kind;
		}
	}),
	      Debug = d('Debug', 'TODO:DOC', ['lines', [LineContent]]),
	      Block = (0, _tuplDistTupl.abstract)('Block', MsAst, 'TODO:DOC'),
	      BlockDo = makeType(Block)('BlockDo', 'TODO:DOC', ['lines', [LineContent]]),
	      BlockVal = (0, _tuplDistTupl.abstract)('BlockVal', Block, 'TODO:DOC'),
	      BlockWithReturn = makeType(BlockVal)('BlockWithReturn', 'TODO:DOC', ['lines', [LineContent], 'returned', Val]),
	      ObjEntry = m('ObjEntry', 'TODO:DOC', ['assign', Assign]),
	     

	// TODO: BlockBag, BlockMap, BlockObj => BlockBuild(kind, ...)
	BlockObj = makeType(BlockVal)('BlockObj', 'TODO:DOC', ['built', LocalDeclareBuilt, 'lines', [LineContent], 'opObjed', (0, _tuplDistType.Nullable)(Val), 'opName', (0, _tuplDistType.Nullable)(String)], {}, {
		of: function (loc, lines, opObjed, opName) {
			return BlockObj(loc, LocalDeclareBuilt(loc), lines, opObjed, opName);
		}
	}),
	      BagEntry = m('BagEntry', 'TODO:DOC', ['value', Val]),
	      BlockBag = makeType(BlockVal)('BlockBag', 'TODO:DOC', ['built', LocalDeclareBuilt, 'lines', [(0, _tuplDistType.Union)(LineContent, BagEntry)]], {}, { of: function (loc, lines) {
			return BlockBag(loc, LocalDeclareBuilt(loc), lines);
		} }),
	      MapEntry = m('MapEntry', 'TODO:DOC', ['key', Val, 'val', Val]),
	      BlockMap = makeType(BlockVal)('BlockMap', 'TODO:DOC', ['built', LocalDeclareBuilt, 'lines', [(0, _tuplDistType.Union)(LineContent, MapEntry)]], {}, { of: function (loc, lines) {
			return BlockMap(loc, LocalDeclareBuilt(loc), lines);
		} }),
	      LocalAccess = v('LocalAccess', 'TODO:DOC', ['name', String], {}, { focus: function (loc) {
			return LocalAccess(loc, '_');
		} }),
	      GlobalAccess = v('GlobalAccess', 'TODO:DOC', ['name', _privateLanguage.JsGlobals]),
	      LocalMutate = d('LocalMutate', 'TODO:DOC', ['name', String, 'value', Val]),
	     

	// Module
	UseDo = m('UseDo', 'TODO:DOC', ['path', String]),
	      Use = m('Use', 'TODO:DOC', ['path', String, 'used', [LocalDeclare], 'opUseDefault', (0, _tuplDistType.Nullable)(LocalDeclare)]),
	      Module = m('Module', 'TODO:DOC', ['doUses', [UseDo], 'uses', [Use], 'debugUses', [Use], 'lines', [Do], 'exports', [LocalDeclare], 'opDefaultExport', (0, _tuplDistType.Nullable)(Val)]),
	     

	// Data
	BagSimple = v('BagSimple', 'TODO:DOC', ['parts', [Val]]),
	      ObjPair = m('ObjPair', 'TODO:DOC', ['key', String, 'value', Val]),
	     
	// Verifier checks that no two pairs may have the same key.
	ObjSimple = v('ObjSimple', 'TODO:DOC', ['pairs', [ObjPair]]),
	     

	// Case
	Pattern = m('Pattern', 'TODO:DOC', ['type', Val, 'locals', [LocalDeclare], 'patterned', LocalAccess]),
	      CaseDoPart = m('CaseDoPart', 'TODO:DOC', ['test', (0, _tuplDistType.Union)(Val, Pattern), 'result', BlockDo]),
	      CaseValPart = m('CaseValPart', 'TODO:DOC', ['test', (0, _tuplDistType.Union)(Val, Pattern), 'result', BlockVal]),
	      CaseDo = d('CaseDo', 'TODO:DOC', ['opCased', (0, _tuplDistType.Nullable)(AssignSingle), 'parts', [CaseDoPart], 'opElse', (0, _tuplDistType.Nullable)(BlockDo)]),
	     
	// Unlike CaseDo, this has `return` statements.
	CaseVal = v('CaseVal', 'TODO:DOC', ['opCased', (0, _tuplDistType.Nullable)(AssignSingle), 'parts', [CaseValPart], 'opElse', (0, _tuplDistType.Nullable)(BlockVal)]),
	      Iteratee = m('Iteratee', 'TODO:DOC', ['element', LocalDeclare, 'bag', Val]),
	      ForDo = d('ForDo', 'TODO:DOC', ['opIteratee', (0, _tuplDistType.Nullable)(Iteratee), 'block', BlockDo]),
	      ForVal = v('ForVal', 'TODO:DOC', ['opIteratee', (0, _tuplDistType.Nullable)(Iteratee), 'block', BlockDo]),
	      ForBag = v('ForBag', 'TODO:DOC', ['built', LocalDeclareBuilt, 'opIteratee', (0, _tuplDistType.Nullable)(Iteratee), 'block', BlockDo], {}, {
		of: function (loc, opIteratee, block) {
			return ForBag(loc, LocalDeclareBuilt(loc), opIteratee, block);
		}
	}),
	      BreakDo = d('BreakDo', 'TODO:DOC', []),
	      BreakVal = d('BreakVal', 'TODO:DOC', ['value', Val]),
	      Continue = d('Continue', 'TODO:DOC', []),
	     

	// Other statements
	IfDo = d('IfDo', 'TODO:DOC', ['test', Val, 'result', BlockDo]),
	      UnlessDo = d('UnlessDo', 'TODO:DOC', ['test', Val, 'result', BlockDo]),
	     

	// Generators
	Yield = v('Yield', 'TODO:DOC', ['yielded', Val]),
	      YieldTo = v('YieldTo', 'TODO:DOC', ['yieldedTo', Val]),
	     

	// Expressions
	Splat = m('Splat', 'TODO:DOC', ['splatted', Val]),
	      Call = v('Call', 'TODO:DOC', ['called', Val, 'args', [(0, _tuplDistType.Union)(Val, Splat)]], {}, {
		contains: function (loc, testType, tested) {
			return Call(loc, SpecialVal(loc, SV_Contains), [testType, tested]);
		},
		sub: function (loc, args) {
			return Call(loc, SpecialVal(loc, SV_Sub), args);
		}
	}),
	      BlockWrap = v('BlockWrap', 'TODO:DOC', ['block', BlockVal]),
	      Fun = v('Fun', 'TODO:DOC', ['isGenerator', Boolean, 'args', [LocalDeclare], 'opRestArg', (0, _tuplDistType.Nullable)(LocalDeclare), 'block', Block, 'opIn', (0, _tuplDistType.Nullable)(Debug),
	// If non-empty, block should be a BlockVal,
	// and either it has a type or opOut is non-empty.
	'opResDeclare', (0, _tuplDistType.Nullable)(LocalDeclareRes), 'opOut', (0, _tuplDistType.Nullable)(Debug), 'name', (0, _tuplDistType.Nullable)(String)]),
	      Lazy = v('Lazy', 'TODO:DOC', ['value', Val]),
	      NumberLiteral = v('NumberLiteral', 'TODO:DOC', ['value', Number]),
	      Member = v('Member', 'TODO:DOC', ['object', Val, 'name', String]),
	     
	// parts are Strings interleaved with Vals.
	Quote = v('Quote', 'TODO:DOC', ['parts', [Object]], {}, {
		forString: function (loc, str) {
			return Quote(loc, [str]);
		}
	}),
	      SD_Debugger = 0,
	      SpecialDo = d('SpecialDo', 'TODO:DOC', ['kind', Number]),
	      SV_Contains = 0,
	      SV_False = 1,
	      SV_Null = 2,
	      SV_Sub = 3,
	      SV_This = 4,
	      SV_ThisModuleDirectory = 5,
	      SV_True = 6,
	      SV_Undefined = 7,
	      SpecialVal = v('SpecialVal', 'TODO:DOC', ['kind', Number]);
	exports.LocalDeclareBuilt = LocalDeclareBuilt;
	exports.LocalDeclareFocus = LocalDeclareFocus;
	exports.LocalDeclareName = LocalDeclareName;
	exports.LocalDeclareRes = LocalDeclareRes;
	exports.Assign = Assign;
	exports.AssignSingle = AssignSingle;
	exports.AssignDestructure = AssignDestructure;
	exports.Debug = Debug;
	exports.Block = Block;
	exports.BlockDo = BlockDo;
	exports.BlockVal = BlockVal;
	exports.BlockWithReturn = BlockWithReturn;
	exports.ObjEntry = ObjEntry;
	exports.BlockObj = BlockObj;
	exports.BagEntry = BagEntry;
	exports.BlockBag = BlockBag;
	exports.MapEntry = MapEntry;
	exports.BlockMap = BlockMap;
	exports.LocalAccess = LocalAccess;
	exports.GlobalAccess = GlobalAccess;
	exports.LocalMutate = LocalMutate;
	exports.UseDo = UseDo;
	exports.Use = Use;
	exports.Module = Module;
	exports.BagSimple = BagSimple;
	exports.ObjPair = ObjPair;
	exports.ObjSimple = ObjSimple;
	exports.Pattern = Pattern;
	exports.CaseDoPart = CaseDoPart;
	exports.CaseValPart = CaseValPart;
	exports.CaseDo = CaseDo;
	exports.CaseVal = CaseVal;
	exports.Iteratee = Iteratee;
	exports.ForDo = ForDo;
	exports.ForVal = ForVal;
	exports.ForBag = ForBag;
	exports.BreakDo = BreakDo;
	exports.BreakVal = BreakVal;
	exports.Continue = Continue;
	exports.IfDo = IfDo;
	exports.UnlessDo = UnlessDo;
	exports.Yield = Yield;
	exports.YieldTo = YieldTo;
	exports.Splat = Splat;
	exports.Call = Call;
	exports.BlockWrap = BlockWrap;
	exports.Fun = Fun;
	exports.Lazy = Lazy;
	exports.NumberLiteral = NumberLiteral;
	exports.Member = Member;
	exports.Quote = Quote;
	exports.SD_Debugger = SD_Debugger;
	exports.SpecialDo = SpecialDo;
	exports.SV_Contains = SV_Contains;
	exports.SV_False = SV_False;
	exports.SV_Null = SV_Null;
	exports.SV_Sub = SV_Sub;
	exports.SV_This = SV_This;
	exports.SV_ThisModuleDirectory = SV_ThisModuleDirectory;
	exports.SV_True = SV_True;
	exports.SV_Undefined = SV_Undefined;
	exports.SpecialVal = SpecialVal;
});
//# sourceMappingURL=data:application/json;base64,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QWVILElBQUksR0FBSixJQUFJO1NBR0osYUFBYSxHQUFiLGFBQWE7U0FHYixNQUFNLEdBQU4sTUFBTTtTQU9OLEtBQUssR0FBTCxLQUFLO1NBUUwsV0FBVyxHQUFYLFdBQVc7U0FDWCxTQUFTLEdBQVQsU0FBUztTQUlULFdBQVcsR0FBWCxXQUFXO1NBQ1gsUUFBUSxHQUFSLFFBQVE7U0FDUixPQUFPLEdBQVAsT0FBTztTQUNQLE1BQU0sR0FBTixNQUFNO1NBQ04sT0FBTyxHQUFQLE9BQU87U0FDUCxzQkFBc0IsR0FBdEIsc0JBQXNCO1NBQ3RCLE9BQU8sR0FBUCxPQUFPO1NBQ1AsWUFBWSxHQUFaLFlBQVk7U0FDWixVQUFVLEdBQVYsVUFBVSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvTXNBc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jIGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHR1cGwsIHsgYWJzdHJhY3QgfSBmcm9tICd0dXBsL2Rpc3QvdHVwbCdcbmltcG9ydCB7IE51bGxhYmxlLCBVbmlvbiB9IGZyb20gJ3R1cGwvZGlzdC90eXBlJ1xuaW1wb3J0IHsgSnNHbG9iYWxzIH0gZnJvbSAnLi9wcml2YXRlL2xhbmd1YWdlJ1xuXG5jb25zdCBNc0FzdCA9IGFic3RyYWN0KCdNc0FzdCcsIE9iamVjdCwgJ2RvYycpXG5leHBvcnQgZGVmYXVsdCBNc0FzdFxuXG5leHBvcnQgY29uc3Rcblx0TGluZUNvbnRlbnQgPSBhYnN0cmFjdCgnVmFsT3JEbycsIE1zQXN0LCAnVmFsaWQgcGFydCBvZiBhIEJsb2NrLicpLFxuXHREbyA9IGFic3RyYWN0KCdEbycsIExpbmVDb250ZW50LCBgXG5cdFx0VGhlc2UgY2FuIG9ubHkgYXBwZWFyIGFzIGxpbmVzIGluIGEgQmxvY2suXG5cdFx0Tm90IHRvIGJlIGNvbmZ1c2VkIHdpdGggR2VuZXJhdG9yIGV4cHJlc3Npb25zIHJlc3VsdGluZyBmcm9tIFxcYGRvXFxgIGtleXdvcmQuYCksXG5cdFZhbCA9IGFic3RyYWN0KCdWYWwnLCBMaW5lQ29udGVudCwgJ1RoZXNlIGNhbiBhcHBlYXIgaW4gYW55IGV4cHJlc3Npb24uJylcblxuY29uc3QgbWFrZVR5cGUgPSBzdXBlclR5cGUgPT4gKG5hbWUsIGRvYywgbmFtZXNUeXBlcywgcHJvdG9Qcm9wcywgdHVwbFByb3BzKSA9PlxuXHR0dXBsKG5hbWUsIHN1cGVyVHlwZSwgZG9jLCBbICdsb2MnLCBMb2MgXS5jb25jYXQobmFtZXNUeXBlcyksIHByb3RvUHJvcHMsIHR1cGxQcm9wcylcblxuY29uc3Rcblx0bSA9IG1ha2VUeXBlKE1zQXN0KSwgZCA9IG1ha2VUeXBlKERvKSwgdiA9IG1ha2VUeXBlKFZhbClcblxuZXhwb3J0IGNvbnN0XG5cdExEX0NvbnN0ID0gMCxcblx0TERfTGF6eSA9IDEsXG5cdExEX011dGFibGUgPSAyLFxuXHRMb2NhbERlY2xhcmUgPSBtKCdMb2NhbERlY2xhcmUnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J25hbWUnLCBTdHJpbmcsXG5cdFx0XHQnb3BUeXBlJywgTnVsbGFibGUoVmFsKSxcblx0XHRcdCdraW5kJywgTnVtYmVyXG5cdFx0XSxcblx0XHR7XG5cdFx0XHRpc0xhenkoKSB7IHJldHVybiB0aGlzLmtpbmQgPT09IExEX0xhenkgfSxcblx0XHRcdGlzTXV0YWJsZSgpIHsgcmV0dXJuIHRoaXMua2luZCA9PT0gTERfTXV0YWJsZSB9XG5cdFx0fSksXG5cdExvY2FsRGVjbGFyZVVudHlwZWQgPSBtYWtlVHlwZShMb2NhbERlY2xhcmUpKCdMb2NhbERlY2xhcmVVbnR5cGVkJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ25hbWUnLCBTdHJpbmcsICdraW5kJywgTnVtYmVyIF0sXG5cdFx0eyBvcFR5cGU6IG51bGwgfSksXG5cdExvY2FsRGVjbGFyZVBsYWluID0gbWFrZVR5cGUoTG9jYWxEZWNsYXJlVW50eXBlZCkoJ0xvY2FsRGVjbGFyZVBsYWluJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ25hbWUnLCBTdHJpbmcgXSxcblx0XHR7IGtpbmQ6IExEX0NvbnN0IH0pXG5cbmNvbnN0IGxvY2FsRGVjbGFyZVBsYWluVHlwZSA9IG5hbWUgPT5cblx0bWFrZVR5cGUoTG9jYWxEZWNsYXJlUGxhaW4pKGBMb2NhbERlY2xhcmVfJHtuYW1lfWAsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbIF0sXG5cdFx0eyBuYW1lIH0pXG5cbmV4cG9ydCBjb25zdFxuXHRMb2NhbERlY2xhcmVCdWlsdCA9IGxvY2FsRGVjbGFyZVBsYWluVHlwZSgnYnVpbHQnKSxcblx0TG9jYWxEZWNsYXJlRm9jdXMgPSBsb2NhbERlY2xhcmVQbGFpblR5cGUoJ18nKSxcblx0TG9jYWxEZWNsYXJlTmFtZSA9IGxvY2FsRGVjbGFyZVBsYWluVHlwZSgnbmFtZScpLFxuXHRMb2NhbERlY2xhcmVSZXMgPSBtYWtlVHlwZShMb2NhbERlY2xhcmUpKCdMb2NhbERlY2xhcmVSZXMnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAnb3BUeXBlJywgTnVsbGFibGUoVmFsKSBdLFxuXHRcdHtcblx0XHRcdG5hbWU6ICdyZXMnLFxuXHRcdFx0a2luZDogTERfQ29uc3Rcblx0XHR9KSxcblxuXHQvLyBBbGwgaGF2ZSAuYWxsQXNzaWduZWVzKClcblx0QXNzaWduID0gYWJzdHJhY3QoJ0Fzc2lnbicsIERvLCAnVE9ETzpET0MnKSxcblx0QXNzaWduU2luZ2xlID0gbWFrZVR5cGUoQXNzaWduKSgnQXNzaWduU2luZ2xlJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFtcblx0XHRcdCdhc3NpZ25lZScsIExvY2FsRGVjbGFyZSxcblx0XHRcdCd2YWx1ZScsIFZhbFxuXHRcdF0sXG5cdFx0e1xuXHRcdFx0YWxsQXNzaWduZWVzKCkgeyByZXR1cm4gWyB0aGlzLmFzc2lnbmVlIF0gfVxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0Zm9jdXM6IChsb2MsIHZhbHVlKSA9PlxuXHRcdFx0XHRBc3NpZ25TaW5nbGUobG9jLCBMb2NhbERlY2xhcmVGb2N1cyhsb2MpLCB2YWx1ZSlcblx0XHR9KSxcblx0QXNzaWduRGVzdHJ1Y3R1cmUgPSBtYWtlVHlwZShBc3NpZ24pKCdBc3NpZ25EZXN0cnVjdHVyZScsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbXG5cdFx0XHQnYXNzaWduZWVzJywgW0xvY2FsRGVjbGFyZV0sXG5cdFx0XHQndmFsdWUnLCBWYWxcblx0XHRdLFxuXHRcdHtcblx0XHRcdGFsbEFzc2lnbmVlcygpIHsgcmV0dXJuIHRoaXMuYXNzaWduZWVzIH0sXG5cdFx0XHQvLyBBbGwgYXNzaWduZWVzIG11c3Qgc2hhcmUgdGhlIHNhbWUga2luZC5cblx0XHRcdGtpbmQoKSB7IHJldHVybiB0aGlzLmFzc2lnbmVlc1swXS5raW5kIH1cblx0XHR9KSxcblxuXHREZWJ1ZyA9IGQoJ0RlYnVnJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2xpbmVzJywgW0xpbmVDb250ZW50XSBdKSxcblxuXHRCbG9jayA9IGFic3RyYWN0KCdCbG9jaycsIE1zQXN0LCAnVE9ETzpET0MnKSxcblx0QmxvY2tEbyA9IG1ha2VUeXBlKEJsb2NrKSgnQmxvY2tEbycsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICdsaW5lcycsIFtMaW5lQ29udGVudF0gXSksXG5cdEJsb2NrVmFsID0gYWJzdHJhY3QoJ0Jsb2NrVmFsJywgQmxvY2ssICdUT0RPOkRPQycpLFxuXHRCbG9ja1dpdGhSZXR1cm4gPSBtYWtlVHlwZShCbG9ja1ZhbCkoJ0Jsb2NrV2l0aFJldHVybicsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICdsaW5lcycsIFtMaW5lQ29udGVudF0sICdyZXR1cm5lZCcsIFZhbCBdKSxcblxuXHRPYmpFbnRyeSA9IG0oJ09iakVudHJ5Jyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2Fzc2lnbicsIEFzc2lnbiBdKSxcblxuXHQvLyBUT0RPOiBCbG9ja0JhZywgQmxvY2tNYXAsIEJsb2NrT2JqID0+IEJsb2NrQnVpbGQoa2luZCwgLi4uKVxuXHRCbG9ja09iaiA9IG1ha2VUeXBlKEJsb2NrVmFsKSgnQmxvY2tPYmonLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J2J1aWx0JywgTG9jYWxEZWNsYXJlQnVpbHQsXG5cdFx0XHQnbGluZXMnLCBbTGluZUNvbnRlbnRdLFxuXHRcdFx0J29wT2JqZWQnLCBOdWxsYWJsZShWYWwpLFxuXHRcdFx0J29wTmFtZScsIE51bGxhYmxlKFN0cmluZylcblx0XHRdLFxuXHRcdHsgfSxcblx0XHR7XG5cdFx0XHRvZjogKGxvYywgbGluZXMsIG9wT2JqZWQsIG9wTmFtZSkgPT5cblx0XHRcdFx0QmxvY2tPYmoobG9jLCBMb2NhbERlY2xhcmVCdWlsdChsb2MpLCBsaW5lcywgb3BPYmplZCwgb3BOYW1lKVxuXHRcdH0pLFxuXG5cdEJhZ0VudHJ5ID0gbSgnQmFnRW50cnknLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAndmFsdWUnLCBWYWwgXSksXG5cdEJsb2NrQmFnID0gbWFrZVR5cGUoQmxvY2tWYWwpKCdCbG9ja0JhZycsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICdidWlsdCcsIExvY2FsRGVjbGFyZUJ1aWx0LCAnbGluZXMnLCBbVW5pb24oTGluZUNvbnRlbnQsIEJhZ0VudHJ5KV0gXSxcblx0XHR7IH0sXG5cdFx0eyBvZjogKGxvYywgbGluZXMpID0+IEJsb2NrQmFnKGxvYywgTG9jYWxEZWNsYXJlQnVpbHQobG9jKSwgbGluZXMpIH0pLFxuXG5cdE1hcEVudHJ5ID0gbSgnTWFwRW50cnknLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAna2V5JywgVmFsLCAndmFsJywgVmFsIF0pLFxuXHRCbG9ja01hcCA9IG1ha2VUeXBlKEJsb2NrVmFsKSgnQmxvY2tNYXAnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAnYnVpbHQnLCBMb2NhbERlY2xhcmVCdWlsdCwgJ2xpbmVzJywgW1VuaW9uKExpbmVDb250ZW50LCBNYXBFbnRyeSldIF0sXG5cdFx0eyB9LFxuXHRcdHsgb2Y6IChsb2MsIGxpbmVzKSA9PiBCbG9ja01hcChsb2MsIExvY2FsRGVjbGFyZUJ1aWx0KGxvYyksIGxpbmVzKSB9KSxcblxuXHRMb2NhbEFjY2VzcyA9IHYoJ0xvY2FsQWNjZXNzJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ25hbWUnLCBTdHJpbmcgXSxcblx0XHR7IH0sXG5cdFx0eyBmb2N1czogbG9jID0+IExvY2FsQWNjZXNzKGxvYywgJ18nKSB9KSxcblx0R2xvYmFsQWNjZXNzID0gdignR2xvYmFsQWNjZXNzJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ25hbWUnLCBKc0dsb2JhbHMgXSksXG5cblx0TG9jYWxNdXRhdGUgPSBkKCdMb2NhbE11dGF0ZScsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbXG5cdFx0XHQnbmFtZScsIFN0cmluZyxcblx0XHRcdCd2YWx1ZScsIFZhbFxuXHRcdF0pLFxuXG5cdC8vIE1vZHVsZVxuXHRVc2VEbyA9IG0oJ1VzZURvJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ3BhdGgnLCBTdHJpbmcgXSksXG5cdFVzZSA9IG0oJ1VzZScsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbXG5cdFx0XHQncGF0aCcsIFN0cmluZyxcblx0XHRcdCd1c2VkJywgW0xvY2FsRGVjbGFyZV0sXG5cdFx0XHQnb3BVc2VEZWZhdWx0JywgTnVsbGFibGUoTG9jYWxEZWNsYXJlKVxuXHRcdF0pLFxuXHRNb2R1bGUgPSBtKCdNb2R1bGUnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J2RvVXNlcycsIFtVc2VEb10sXG5cdFx0XHQndXNlcycsIFtVc2VdLFxuXHRcdFx0J2RlYnVnVXNlcycsIFtVc2VdLFxuXHRcdFx0J2xpbmVzJywgW0RvXSxcblx0XHRcdCdleHBvcnRzJywgW0xvY2FsRGVjbGFyZV0sXG5cdFx0XHQnb3BEZWZhdWx0RXhwb3J0JywgTnVsbGFibGUoVmFsKVxuXHRcdF0pLFxuXG5cdC8vIERhdGFcblx0QmFnU2ltcGxlID0gdignQmFnU2ltcGxlJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ3BhcnRzJywgW1ZhbF0gXSksXG5cdE9ialBhaXIgPSBtKCdPYmpQYWlyJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFtcblx0XHRcdCdrZXknLCBTdHJpbmcsXG5cdFx0XHQndmFsdWUnLCBWYWxcblx0XHRdKSxcblx0Ly8gVmVyaWZpZXIgY2hlY2tzIHRoYXQgbm8gdHdvIHBhaXJzIG1heSBoYXZlIHRoZSBzYW1lIGtleS5cblx0T2JqU2ltcGxlID0gdignT2JqU2ltcGxlJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ3BhaXJzJywgW09ialBhaXJdIF0pLFxuXG5cdC8vIENhc2Vcblx0UGF0dGVybiA9IG0oJ1BhdHRlcm4nLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J3R5cGUnLCBWYWwsXG5cdFx0XHQnbG9jYWxzJywgW0xvY2FsRGVjbGFyZV0sXG5cdFx0XHQncGF0dGVybmVkJywgTG9jYWxBY2Nlc3Ncblx0XHRdKSxcblx0Q2FzZURvUGFydCA9IG0oJ0Nhc2VEb1BhcnQnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J3Rlc3QnLCBVbmlvbihWYWwsIFBhdHRlcm4pLFxuXHRcdFx0J3Jlc3VsdCcsIEJsb2NrRG9cblx0XHRdKSxcblx0Q2FzZVZhbFBhcnQgPSBtKCdDYXNlVmFsUGFydCcsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbXG5cdFx0XHQndGVzdCcsIFVuaW9uKFZhbCwgUGF0dGVybiksXG5cdFx0XHQncmVzdWx0JywgQmxvY2tWYWxcblx0XHRdKSxcblx0Q2FzZURvID0gZCgnQ2FzZURvJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFtcblx0XHRcdCdvcENhc2VkJywgTnVsbGFibGUoQXNzaWduU2luZ2xlKSxcblx0XHRcdCdwYXJ0cycsIFtDYXNlRG9QYXJ0XSxcblx0XHRcdCdvcEVsc2UnLCBOdWxsYWJsZShCbG9ja0RvKVxuXHRcdF0pLFxuXHQvLyBVbmxpa2UgQ2FzZURvLCB0aGlzIGhhcyBgcmV0dXJuYCBzdGF0ZW1lbnRzLlxuXHRDYXNlVmFsID0gdignQ2FzZVZhbCcsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbXG5cdFx0XHQnb3BDYXNlZCcsIE51bGxhYmxlKEFzc2lnblNpbmdsZSksXG5cdFx0XHQncGFydHMnLCBbQ2FzZVZhbFBhcnRdLFxuXHRcdFx0J29wRWxzZScsIE51bGxhYmxlKEJsb2NrVmFsKVxuXHRcdF0pLFxuXG5cdEl0ZXJhdGVlID0gbSgnSXRlcmF0ZWUnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J2VsZW1lbnQnLCBMb2NhbERlY2xhcmUsXG5cdFx0XHQnYmFnJywgVmFsXG5cdFx0XSksXG5cblxuXHRGb3JEbyA9IGQoJ0ZvckRvJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ29wSXRlcmF0ZWUnLCBOdWxsYWJsZShJdGVyYXRlZSksICdibG9jaycsIEJsb2NrRG8gXSksXG5cdEZvclZhbCA9IHYoJ0ZvclZhbCcsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICdvcEl0ZXJhdGVlJywgTnVsbGFibGUoSXRlcmF0ZWUpLCAnYmxvY2snLCBCbG9ja0RvIF0pLFxuXHRGb3JCYWcgPSB2KCdGb3JCYWcnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAnYnVpbHQnLCBMb2NhbERlY2xhcmVCdWlsdCwgJ29wSXRlcmF0ZWUnLCBOdWxsYWJsZShJdGVyYXRlZSksICdibG9jaycsIEJsb2NrRG8gXSxcblx0XHR7IH0sXG5cdFx0e1xuXHRcdFx0b2Y6IChsb2MsIG9wSXRlcmF0ZWUsIGJsb2NrKSA9PiBGb3JCYWcobG9jLCBMb2NhbERlY2xhcmVCdWlsdChsb2MpLCBvcEl0ZXJhdGVlLCBibG9jaylcblx0XHR9KSxcblxuXHRCcmVha0RvID0gZCgnQnJlYWtEbycsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbIF0pLFxuXHRCcmVha1ZhbCA9IGQoJ0JyZWFrVmFsJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ3ZhbHVlJywgVmFsIF0pLFxuXHRDb250aW51ZSA9IGQoJ0NvbnRpbnVlJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgXSksXG5cblx0Ly8gT3RoZXIgc3RhdGVtZW50c1xuXHRJZkRvID0gZCgnSWZEbycsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICd0ZXN0JywgVmFsLCAncmVzdWx0JywgQmxvY2tEbyBdKSxcblx0VW5sZXNzRG8gPSBkKCdVbmxlc3NEbycsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICd0ZXN0JywgVmFsLCAncmVzdWx0JywgQmxvY2tEbyBdKSxcblxuXHQvLyBHZW5lcmF0b3JzXG5cdFlpZWxkID0gdignWWllbGQnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAneWllbGRlZCcsIFZhbCBdKSxcblx0WWllbGRUbyA9IHYoJ1lpZWxkVG8nLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAneWllbGRlZFRvJywgVmFsIF0pLFxuXG5cdC8vIEV4cHJlc3Npb25zXG5cdFNwbGF0ID0gbSgnU3BsYXQnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAnc3BsYXR0ZWQnLCBWYWwgXSksXG5cdENhbGwgPSB2KCdDYWxsJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFtcblx0XHRcdCdjYWxsZWQnLCBWYWwsXG5cdFx0XHQnYXJncycsIFtVbmlvbihWYWwsIFNwbGF0KV1cblx0XHRdLFxuXHRcdHsgfSxcblx0XHR7XG5cdFx0XHRjb250YWluczogKGxvYywgdGVzdFR5cGUsIHRlc3RlZCkgPT5cblx0XHRcdFx0Q2FsbChsb2MsIFNwZWNpYWxWYWwobG9jLCBTVl9Db250YWlucyksIFsgdGVzdFR5cGUsIHRlc3RlZCBdKSxcblx0XHRcdHN1YjogKGxvYywgYXJncykgPT4gQ2FsbChsb2MsIFNwZWNpYWxWYWwobG9jLCBTVl9TdWIpLCBhcmdzKVxuXHRcdH0pLFxuXHRCbG9ja1dyYXAgPSB2KCdCbG9ja1dyYXAnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAnYmxvY2snLCBCbG9ja1ZhbCBdKSxcblxuXHRGdW4gPSB2KCdGdW4nLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J2lzR2VuZXJhdG9yJywgQm9vbGVhbixcblx0XHRcdCdhcmdzJywgW0xvY2FsRGVjbGFyZV0sXG5cdFx0XHQnb3BSZXN0QXJnJywgTnVsbGFibGUoTG9jYWxEZWNsYXJlKSxcblx0XHRcdCdibG9jaycsIEJsb2NrLFxuXHRcdFx0J29wSW4nLCBOdWxsYWJsZShEZWJ1ZyksXG5cdFx0XHQvLyBJZiBub24tZW1wdHksIGJsb2NrIHNob3VsZCBiZSBhIEJsb2NrVmFsLFxuXHRcdFx0Ly8gYW5kIGVpdGhlciBpdCBoYXMgYSB0eXBlIG9yIG9wT3V0IGlzIG5vbi1lbXB0eS5cblx0XHRcdCdvcFJlc0RlY2xhcmUnLCBOdWxsYWJsZShMb2NhbERlY2xhcmVSZXMpLFxuXHRcdFx0J29wT3V0JywgTnVsbGFibGUoRGVidWcpLFxuXHRcdFx0J25hbWUnLCBOdWxsYWJsZShTdHJpbmcpXG5cdFx0XSksXG5cblx0TGF6eSA9IHYoJ0xhenknLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAndmFsdWUnLCBWYWwgXSksXG5cdE51bWJlckxpdGVyYWwgPSB2KCdOdW1iZXJMaXRlcmFsJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ3ZhbHVlJywgTnVtYmVyIF0pLFxuXHRNZW1iZXIgPSB2KCdNZW1iZXInLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J29iamVjdCcsIFZhbCxcblx0XHRcdCduYW1lJywgU3RyaW5nXG5cdFx0XSksXG5cdC8vIHBhcnRzIGFyZSBTdHJpbmdzIGludGVybGVhdmVkIHdpdGggVmFscy5cblx0UXVvdGUgPSB2KCdRdW90ZScsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICdwYXJ0cycsIFtPYmplY3RdIF0sXG5cdFx0eyB9LFxuXHRcdHtcblx0XHRcdGZvclN0cmluZzogKGxvYywgc3RyKSA9PiBRdW90ZShsb2MsIFsgc3RyIF0pXG5cdFx0fSksXG5cblx0U0RfRGVidWdnZXIgPSAwLFxuXHRTcGVjaWFsRG8gPSBkKCdTcGVjaWFsRG8nLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAna2luZCcsIE51bWJlciBdKSxcblxuXHRTVl9Db250YWlucyA9IDAsXG5cdFNWX0ZhbHNlID0gMSxcblx0U1ZfTnVsbCA9IDIsXG5cdFNWX1N1YiA9IDMsXG5cdFNWX1RoaXMgPSA0LFxuXHRTVl9UaGlzTW9kdWxlRGlyZWN0b3J5ID0gNSxcblx0U1ZfVHJ1ZSA9IDYsXG5cdFNWX1VuZGVmaW5lZCA9IDcsXG5cdFNwZWNpYWxWYWwgPSB2KCdTcGVjaWFsVmFsJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2tpbmQnLCBOdW1iZXIgXSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9