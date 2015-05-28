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
	      ObjEntry = d('ObjEntry', 'TODO:DOC', ['assign', Assign]),
	     

	// TODO: BlockBag, BlockMap, BlockObj => BlockBuild(kind, ...)
	BlockObj = makeType(BlockVal)('BlockObj', 'TODO:DOC', ['built', LocalDeclareBuilt, 'lines', [LineContent], 'opObjed', (0, _tuplDistType.Nullable)(Val), 'opName', (0, _tuplDistType.Nullable)(String)], {}, {
		of: function (loc, lines, opObjed, opName) {
			return BlockObj(loc, LocalDeclareBuilt(loc), lines, opObjed, opName);
		}
	}),
	      BagEntry = d('BagEntry', 'TODO:DOC', ['value', Val]),
	      BagEntryMany = d('BagEntryMany', 'TODO:DOC', ['value', Val]),
	      BlockBag = makeType(BlockVal)('BlockBag', 'TODO:DOC', ['built', LocalDeclareBuilt, 'lines', [(0, _tuplDistType.Union)(LineContent, BagEntry)]], {}, { of: function (loc, lines) {
			return BlockBag(loc, LocalDeclareBuilt(loc), lines);
		} }),
	      MapEntry = d('MapEntry', 'TODO:DOC', ['key', Val, 'val', Val]),
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
	ConditionalDo = d('ConditionalDo', 'TODO:DOC', ['test', Val, 'result', BlockDo, 'isUnless', Boolean]),
	      ConditionalVal = v('ConditionalVal', 'TODO:DOC', ['test', Val, 'result', BlockVal, 'isUnless', Boolean]),
	     

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
	exports.BagEntryMany = BagEntryMany;
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
	exports.ConditionalDo = ConditionalDo;
	exports.ConditionalVal = ConditionalVal;
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
//# sourceMappingURL=data:application/json;base64,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QUliLGNBQWMsR0FBZCxjQUFjO1NBS2QsS0FBSyxHQUFMLEtBQUs7U0FHTCxPQUFPLEdBQVAsT0FBTztTQUtQLEtBQUssR0FBTCxLQUFLO1NBR0wsSUFBSSxHQUFKLElBQUk7U0FZSixTQUFTLEdBQVQsU0FBUztTQUlULEdBQUcsR0FBSCxHQUFHO1NBZUgsSUFBSSxHQUFKLElBQUk7U0FHSixhQUFhLEdBQWIsYUFBYTtTQUdiLE1BQU0sR0FBTixNQUFNO1NBT04sS0FBSyxHQUFMLEtBQUs7U0FRTCxXQUFXLEdBQVgsV0FBVztTQUNYLFNBQVMsR0FBVCxTQUFTO1NBSVQsV0FBVyxHQUFYLFdBQVc7U0FDWCxRQUFRLEdBQVIsUUFBUTtTQUNSLE9BQU8sR0FBUCxPQUFPO1NBQ1AsTUFBTSxHQUFOLE1BQU07U0FDTixPQUFPLEdBQVAsT0FBTztTQUNQLHNCQUFzQixHQUF0QixzQkFBc0I7U0FDdEIsT0FBTyxHQUFQLE9BQU87U0FDUCxZQUFZLEdBQVosWUFBWTtTQUNaLFVBQVUsR0FBVixVQUFVIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9Nc0FzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2MgZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgdHVwbCwgeyBhYnN0cmFjdCB9IGZyb20gJ3R1cGwvZGlzdC90dXBsJ1xuaW1wb3J0IHsgTnVsbGFibGUsIFVuaW9uIH0gZnJvbSAndHVwbC9kaXN0L3R5cGUnXG5pbXBvcnQgeyBKc0dsb2JhbHMgfSBmcm9tICcuL3ByaXZhdGUvbGFuZ3VhZ2UnXG5cbmNvbnN0IE1zQXN0ID0gYWJzdHJhY3QoJ01zQXN0JywgT2JqZWN0LCAnZG9jJylcbmV4cG9ydCBkZWZhdWx0IE1zQXN0XG5cbmV4cG9ydCBjb25zdFxuXHRMaW5lQ29udGVudCA9IGFic3RyYWN0KCdWYWxPckRvJywgTXNBc3QsICdWYWxpZCBwYXJ0IG9mIGEgQmxvY2suJyksXG5cdERvID0gYWJzdHJhY3QoJ0RvJywgTGluZUNvbnRlbnQsIGBcblx0XHRUaGVzZSBjYW4gb25seSBhcHBlYXIgYXMgbGluZXMgaW4gYSBCbG9jay5cblx0XHROb3QgdG8gYmUgY29uZnVzZWQgd2l0aCBHZW5lcmF0b3IgZXhwcmVzc2lvbnMgcmVzdWx0aW5nIGZyb20gXFxgZG9cXGAga2V5d29yZC5gKSxcblx0VmFsID0gYWJzdHJhY3QoJ1ZhbCcsIExpbmVDb250ZW50LCAnVGhlc2UgY2FuIGFwcGVhciBpbiBhbnkgZXhwcmVzc2lvbi4nKVxuXG5jb25zdCBtYWtlVHlwZSA9IHN1cGVyVHlwZSA9PiAobmFtZSwgZG9jLCBuYW1lc1R5cGVzLCBwcm90b1Byb3BzLCB0dXBsUHJvcHMpID0+XG5cdHR1cGwobmFtZSwgc3VwZXJUeXBlLCBkb2MsIFsgJ2xvYycsIExvYyBdLmNvbmNhdChuYW1lc1R5cGVzKSwgcHJvdG9Qcm9wcywgdHVwbFByb3BzKVxuXG5jb25zdFxuXHRtID0gbWFrZVR5cGUoTXNBc3QpLCBkID0gbWFrZVR5cGUoRG8pLCB2ID0gbWFrZVR5cGUoVmFsKVxuXG5leHBvcnQgY29uc3Rcblx0TERfQ29uc3QgPSAwLFxuXHRMRF9MYXp5ID0gMSxcblx0TERfTXV0YWJsZSA9IDIsXG5cdExvY2FsRGVjbGFyZSA9IG0oJ0xvY2FsRGVjbGFyZScsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbXG5cdFx0XHQnbmFtZScsIFN0cmluZyxcblx0XHRcdCdvcFR5cGUnLCBOdWxsYWJsZShWYWwpLFxuXHRcdFx0J2tpbmQnLCBOdW1iZXJcblx0XHRdLFxuXHRcdHtcblx0XHRcdGlzTGF6eSgpIHsgcmV0dXJuIHRoaXMua2luZCA9PT0gTERfTGF6eSB9LFxuXHRcdFx0aXNNdXRhYmxlKCkgeyByZXR1cm4gdGhpcy5raW5kID09PSBMRF9NdXRhYmxlIH1cblx0XHR9KSxcblx0TG9jYWxEZWNsYXJlVW50eXBlZCA9IG1ha2VUeXBlKExvY2FsRGVjbGFyZSkoJ0xvY2FsRGVjbGFyZVVudHlwZWQnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAnbmFtZScsIFN0cmluZywgJ2tpbmQnLCBOdW1iZXIgXSxcblx0XHR7IG9wVHlwZTogbnVsbCB9KSxcblx0TG9jYWxEZWNsYXJlUGxhaW4gPSBtYWtlVHlwZShMb2NhbERlY2xhcmVVbnR5cGVkKSgnTG9jYWxEZWNsYXJlUGxhaW4nLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAnbmFtZScsIFN0cmluZyBdLFxuXHRcdHsga2luZDogTERfQ29uc3QgfSlcblxuY29uc3QgbG9jYWxEZWNsYXJlUGxhaW5UeXBlID0gbmFtZSA9PlxuXHRtYWtlVHlwZShMb2NhbERlY2xhcmVQbGFpbikoYExvY2FsRGVjbGFyZV8ke25hbWV9YCxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgXSxcblx0XHR7IG5hbWUgfSlcblxuZXhwb3J0IGNvbnN0XG5cdExvY2FsRGVjbGFyZUJ1aWx0ID0gbG9jYWxEZWNsYXJlUGxhaW5UeXBlKCdidWlsdCcpLFxuXHRMb2NhbERlY2xhcmVGb2N1cyA9IGxvY2FsRGVjbGFyZVBsYWluVHlwZSgnXycpLFxuXHRMb2NhbERlY2xhcmVOYW1lID0gbG9jYWxEZWNsYXJlUGxhaW5UeXBlKCduYW1lJyksXG5cdExvY2FsRGVjbGFyZVJlcyA9IG1ha2VUeXBlKExvY2FsRGVjbGFyZSkoJ0xvY2FsRGVjbGFyZVJlcycsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICdvcFR5cGUnLCBOdWxsYWJsZShWYWwpIF0sXG5cdFx0e1xuXHRcdFx0bmFtZTogJ3JlcycsXG5cdFx0XHRraW5kOiBMRF9Db25zdFxuXHRcdH0pLFxuXG5cdC8vIEFsbCBoYXZlIC5hbGxBc3NpZ25lZXMoKVxuXHRBc3NpZ24gPSBhYnN0cmFjdCgnQXNzaWduJywgRG8sICdUT0RPOkRPQycpLFxuXHRBc3NpZ25TaW5nbGUgPSBtYWtlVHlwZShBc3NpZ24pKCdBc3NpZ25TaW5nbGUnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J2Fzc2lnbmVlJywgTG9jYWxEZWNsYXJlLFxuXHRcdFx0J3ZhbHVlJywgVmFsXG5cdFx0XSxcblx0XHR7XG5cdFx0XHRhbGxBc3NpZ25lZXMoKSB7IHJldHVybiBbIHRoaXMuYXNzaWduZWUgXSB9XG5cdFx0fSxcblx0XHR7XG5cdFx0XHRmb2N1czogKGxvYywgdmFsdWUpID0+XG5cdFx0XHRcdEFzc2lnblNpbmdsZShsb2MsIExvY2FsRGVjbGFyZUZvY3VzKGxvYyksIHZhbHVlKVxuXHRcdH0pLFxuXHRBc3NpZ25EZXN0cnVjdHVyZSA9IG1ha2VUeXBlKEFzc2lnbikoJ0Fzc2lnbkRlc3RydWN0dXJlJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFtcblx0XHRcdCdhc3NpZ25lZXMnLCBbTG9jYWxEZWNsYXJlXSxcblx0XHRcdCd2YWx1ZScsIFZhbFxuXHRcdF0sXG5cdFx0e1xuXHRcdFx0YWxsQXNzaWduZWVzKCkgeyByZXR1cm4gdGhpcy5hc3NpZ25lZXMgfSxcblx0XHRcdC8vIEFsbCBhc3NpZ25lZXMgbXVzdCBzaGFyZSB0aGUgc2FtZSBraW5kLlxuXHRcdFx0a2luZCgpIHsgcmV0dXJuIHRoaXMuYXNzaWduZWVzWzBdLmtpbmQgfVxuXHRcdH0pLFxuXG5cdERlYnVnID0gZCgnRGVidWcnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAnbGluZXMnLCBbTGluZUNvbnRlbnRdIF0pLFxuXG5cdEJsb2NrID0gYWJzdHJhY3QoJ0Jsb2NrJywgTXNBc3QsICdUT0RPOkRPQycpLFxuXHRCbG9ja0RvID0gbWFrZVR5cGUoQmxvY2spKCdCbG9ja0RvJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2xpbmVzJywgW0xpbmVDb250ZW50XSBdKSxcblx0QmxvY2tWYWwgPSBhYnN0cmFjdCgnQmxvY2tWYWwnLCBCbG9jaywgJ1RPRE86RE9DJyksXG5cdEJsb2NrV2l0aFJldHVybiA9IG1ha2VUeXBlKEJsb2NrVmFsKSgnQmxvY2tXaXRoUmV0dXJuJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2xpbmVzJywgW0xpbmVDb250ZW50XSwgJ3JldHVybmVkJywgVmFsIF0pLFxuXG5cdE9iakVudHJ5ID0gZCgnT2JqRW50cnknLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAnYXNzaWduJywgQXNzaWduIF0pLFxuXG5cdC8vIFRPRE86IEJsb2NrQmFnLCBCbG9ja01hcCwgQmxvY2tPYmogPT4gQmxvY2tCdWlsZChraW5kLCAuLi4pXG5cdEJsb2NrT2JqID0gbWFrZVR5cGUoQmxvY2tWYWwpKCdCbG9ja09iaicsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbXG5cdFx0XHQnYnVpbHQnLCBMb2NhbERlY2xhcmVCdWlsdCxcblx0XHRcdCdsaW5lcycsIFtMaW5lQ29udGVudF0sXG5cdFx0XHQnb3BPYmplZCcsIE51bGxhYmxlKFZhbCksXG5cdFx0XHQnb3BOYW1lJywgTnVsbGFibGUoU3RyaW5nKVxuXHRcdF0sXG5cdFx0eyB9LFxuXHRcdHtcblx0XHRcdG9mOiAobG9jLCBsaW5lcywgb3BPYmplZCwgb3BOYW1lKSA9PlxuXHRcdFx0XHRCbG9ja09iaihsb2MsIExvY2FsRGVjbGFyZUJ1aWx0KGxvYyksIGxpbmVzLCBvcE9iamVkLCBvcE5hbWUpXG5cdFx0fSksXG5cblx0QmFnRW50cnkgPSBkKCdCYWdFbnRyeScsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICd2YWx1ZScsIFZhbCBdKSxcblx0QmFnRW50cnlNYW55ID0gZCgnQmFnRW50cnlNYW55Jyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ3ZhbHVlJywgVmFsIF0pLFxuXHRCbG9ja0JhZyA9IG1ha2VUeXBlKEJsb2NrVmFsKSgnQmxvY2tCYWcnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAnYnVpbHQnLCBMb2NhbERlY2xhcmVCdWlsdCwgJ2xpbmVzJywgW1VuaW9uKExpbmVDb250ZW50LCBCYWdFbnRyeSldIF0sXG5cdFx0eyB9LFxuXHRcdHsgb2Y6IChsb2MsIGxpbmVzKSA9PiBCbG9ja0JhZyhsb2MsIExvY2FsRGVjbGFyZUJ1aWx0KGxvYyksIGxpbmVzKSB9KSxcblxuXHRNYXBFbnRyeSA9IGQoJ01hcEVudHJ5Jyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2tleScsIFZhbCwgJ3ZhbCcsIFZhbCBdKSxcblx0QmxvY2tNYXAgPSBtYWtlVHlwZShCbG9ja1ZhbCkoJ0Jsb2NrTWFwJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2J1aWx0JywgTG9jYWxEZWNsYXJlQnVpbHQsICdsaW5lcycsIFtVbmlvbihMaW5lQ29udGVudCwgTWFwRW50cnkpXSBdLFxuXHRcdHsgfSxcblx0XHR7IG9mOiAobG9jLCBsaW5lcykgPT4gQmxvY2tNYXAobG9jLCBMb2NhbERlY2xhcmVCdWlsdChsb2MpLCBsaW5lcykgfSksXG5cblx0TG9jYWxBY2Nlc3MgPSB2KCdMb2NhbEFjY2VzcycsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICduYW1lJywgU3RyaW5nIF0sXG5cdFx0eyB9LFxuXHRcdHsgZm9jdXM6IGxvYyA9PiBMb2NhbEFjY2Vzcyhsb2MsICdfJykgfSksXG5cdEdsb2JhbEFjY2VzcyA9IHYoJ0dsb2JhbEFjY2VzcycsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICduYW1lJywgSnNHbG9iYWxzIF0pLFxuXG5cdExvY2FsTXV0YXRlID0gZCgnTG9jYWxNdXRhdGUnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J25hbWUnLCBTdHJpbmcsXG5cdFx0XHQndmFsdWUnLCBWYWxcblx0XHRdKSxcblxuXHQvLyBNb2R1bGVcblx0VXNlRG8gPSBtKCdVc2VEbycsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICdwYXRoJywgU3RyaW5nIF0pLFxuXHRVc2UgPSBtKCdVc2UnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J3BhdGgnLCBTdHJpbmcsXG5cdFx0XHQndXNlZCcsIFtMb2NhbERlY2xhcmVdLFxuXHRcdFx0J29wVXNlRGVmYXVsdCcsIE51bGxhYmxlKExvY2FsRGVjbGFyZSlcblx0XHRdKSxcblx0TW9kdWxlID0gbSgnTW9kdWxlJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFtcblx0XHRcdCdkb1VzZXMnLCBbVXNlRG9dLFxuXHRcdFx0J3VzZXMnLCBbVXNlXSxcblx0XHRcdCdkZWJ1Z1VzZXMnLCBbVXNlXSxcblx0XHRcdCdsaW5lcycsIFtEb10sXG5cdFx0XHQnZXhwb3J0cycsIFtMb2NhbERlY2xhcmVdLFxuXHRcdFx0J29wRGVmYXVsdEV4cG9ydCcsIE51bGxhYmxlKFZhbClcblx0XHRdKSxcblxuXHQvLyBEYXRhXG5cdEJhZ1NpbXBsZSA9IHYoJ0JhZ1NpbXBsZScsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICdwYXJ0cycsIFtWYWxdIF0pLFxuXHRPYmpQYWlyID0gbSgnT2JqUGFpcicsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbXG5cdFx0XHQna2V5JywgU3RyaW5nLFxuXHRcdFx0J3ZhbHVlJywgVmFsXG5cdFx0XSksXG5cdC8vIFZlcmlmaWVyIGNoZWNrcyB0aGF0IG5vIHR3byBwYWlycyBtYXkgaGF2ZSB0aGUgc2FtZSBrZXkuXG5cdE9ialNpbXBsZSA9IHYoJ09ialNpbXBsZScsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICdwYWlycycsIFtPYmpQYWlyXSBdKSxcblxuXHQvLyBDYXNlXG5cdFBhdHRlcm4gPSBtKCdQYXR0ZXJuJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFtcblx0XHRcdCd0eXBlJywgVmFsLFxuXHRcdFx0J2xvY2FscycsIFtMb2NhbERlY2xhcmVdLFxuXHRcdFx0J3BhdHRlcm5lZCcsIExvY2FsQWNjZXNzXG5cdFx0XSksXG5cdENhc2VEb1BhcnQgPSBtKCdDYXNlRG9QYXJ0Jyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFtcblx0XHRcdCd0ZXN0JywgVW5pb24oVmFsLCBQYXR0ZXJuKSxcblx0XHRcdCdyZXN1bHQnLCBCbG9ja0RvXG5cdFx0XSksXG5cdENhc2VWYWxQYXJ0ID0gbSgnQ2FzZVZhbFBhcnQnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J3Rlc3QnLCBVbmlvbihWYWwsIFBhdHRlcm4pLFxuXHRcdFx0J3Jlc3VsdCcsIEJsb2NrVmFsXG5cdFx0XSksXG5cdENhc2VEbyA9IGQoJ0Nhc2VEbycsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbXG5cdFx0XHQnb3BDYXNlZCcsIE51bGxhYmxlKEFzc2lnblNpbmdsZSksXG5cdFx0XHQncGFydHMnLCBbQ2FzZURvUGFydF0sXG5cdFx0XHQnb3BFbHNlJywgTnVsbGFibGUoQmxvY2tEbylcblx0XHRdKSxcblx0Ly8gVW5saWtlIENhc2VEbywgdGhpcyBoYXMgYHJldHVybmAgc3RhdGVtZW50cy5cblx0Q2FzZVZhbCA9IHYoJ0Nhc2VWYWwnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0W1xuXHRcdFx0J29wQ2FzZWQnLCBOdWxsYWJsZShBc3NpZ25TaW5nbGUpLFxuXHRcdFx0J3BhcnRzJywgW0Nhc2VWYWxQYXJ0XSxcblx0XHRcdCdvcEVsc2UnLCBOdWxsYWJsZShCbG9ja1ZhbClcblx0XHRdKSxcblxuXHRJdGVyYXRlZSA9IG0oJ0l0ZXJhdGVlJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFtcblx0XHRcdCdlbGVtZW50JywgTG9jYWxEZWNsYXJlLFxuXHRcdFx0J2JhZycsIFZhbFxuXHRcdF0pLFxuXG5cblx0Rm9yRG8gPSBkKCdGb3JEbycsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICdvcEl0ZXJhdGVlJywgTnVsbGFibGUoSXRlcmF0ZWUpLCAnYmxvY2snLCBCbG9ja0RvIF0pLFxuXHRGb3JWYWwgPSB2KCdGb3JWYWwnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAnb3BJdGVyYXRlZScsIE51bGxhYmxlKEl0ZXJhdGVlKSwgJ2Jsb2NrJywgQmxvY2tEbyBdKSxcblx0Rm9yQmFnID0gdignRm9yQmFnJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2J1aWx0JywgTG9jYWxEZWNsYXJlQnVpbHQsICdvcEl0ZXJhdGVlJywgTnVsbGFibGUoSXRlcmF0ZWUpLCAnYmxvY2snLCBCbG9ja0RvIF0sXG5cdFx0eyB9LFxuXHRcdHtcblx0XHRcdG9mOiAobG9jLCBvcEl0ZXJhdGVlLCBibG9jaykgPT4gRm9yQmFnKGxvYywgTG9jYWxEZWNsYXJlQnVpbHQobG9jKSwgb3BJdGVyYXRlZSwgYmxvY2spXG5cdFx0fSksXG5cblx0QnJlYWtEbyA9IGQoJ0JyZWFrRG8nLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyBdKSxcblx0QnJlYWtWYWwgPSBkKCdCcmVha1ZhbCcsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICd2YWx1ZScsIFZhbCBdKSxcblx0Q29udGludWUgPSBkKCdDb250aW51ZScsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbIF0pLFxuXG5cdC8vIE90aGVyIHN0YXRlbWVudHNcblx0Q29uZGl0aW9uYWxEbyA9IGQoJ0NvbmRpdGlvbmFsRG8nLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAndGVzdCcsIFZhbCwgJ3Jlc3VsdCcsIEJsb2NrRG8sICdpc1VubGVzcycsIEJvb2xlYW4gXSksXG5cblx0Q29uZGl0aW9uYWxWYWwgPSB2KCdDb25kaXRpb25hbFZhbCcsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICd0ZXN0JywgVmFsLCAncmVzdWx0JywgQmxvY2tWYWwsICdpc1VubGVzcycsIEJvb2xlYW4gXSksXG5cblx0Ly8gR2VuZXJhdG9yc1xuXHRZaWVsZCA9IHYoJ1lpZWxkJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ3lpZWxkZWQnLCBWYWwgXSksXG5cdFlpZWxkVG8gPSB2KCdZaWVsZFRvJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ3lpZWxkZWRUbycsIFZhbCBdKSxcblxuXHQvLyBFeHByZXNzaW9uc1xuXHRTcGxhdCA9IG0oJ1NwbGF0Jyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ3NwbGF0dGVkJywgVmFsIF0pLFxuXHRDYWxsID0gdignQ2FsbCcsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbXG5cdFx0XHQnY2FsbGVkJywgVmFsLFxuXHRcdFx0J2FyZ3MnLCBbVW5pb24oVmFsLCBTcGxhdCldXG5cdFx0XSxcblx0XHR7IH0sXG5cdFx0e1xuXHRcdFx0Y29udGFpbnM6IChsb2MsIHRlc3RUeXBlLCB0ZXN0ZWQpID0+XG5cdFx0XHRcdENhbGwobG9jLCBTcGVjaWFsVmFsKGxvYywgU1ZfQ29udGFpbnMpLCBbIHRlc3RUeXBlLCB0ZXN0ZWQgXSksXG5cdFx0XHRzdWI6IChsb2MsIGFyZ3MpID0+IENhbGwobG9jLCBTcGVjaWFsVmFsKGxvYywgU1ZfU3ViKSwgYXJncylcblx0XHR9KSxcblx0QmxvY2tXcmFwID0gdignQmxvY2tXcmFwJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2Jsb2NrJywgQmxvY2tWYWwgXSksXG5cblx0RnVuID0gdignRnVuJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFtcblx0XHRcdCdpc0dlbmVyYXRvcicsIEJvb2xlYW4sXG5cdFx0XHQnYXJncycsIFtMb2NhbERlY2xhcmVdLFxuXHRcdFx0J29wUmVzdEFyZycsIE51bGxhYmxlKExvY2FsRGVjbGFyZSksXG5cdFx0XHQnYmxvY2snLCBCbG9jayxcblx0XHRcdCdvcEluJywgTnVsbGFibGUoRGVidWcpLFxuXHRcdFx0Ly8gSWYgbm9uLWVtcHR5LCBibG9jayBzaG91bGQgYmUgYSBCbG9ja1ZhbCxcblx0XHRcdC8vIGFuZCBlaXRoZXIgaXQgaGFzIGEgdHlwZSBvciBvcE91dCBpcyBub24tZW1wdHkuXG5cdFx0XHQnb3BSZXNEZWNsYXJlJywgTnVsbGFibGUoTG9jYWxEZWNsYXJlUmVzKSxcblx0XHRcdCdvcE91dCcsIE51bGxhYmxlKERlYnVnKSxcblx0XHRcdCduYW1lJywgTnVsbGFibGUoU3RyaW5nKVxuXHRcdF0pLFxuXG5cdExhenkgPSB2KCdMYXp5Jyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ3ZhbHVlJywgVmFsIF0pLFxuXHROdW1iZXJMaXRlcmFsID0gdignTnVtYmVyTGl0ZXJhbCcsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICd2YWx1ZScsIE51bWJlciBdKSxcblx0TWVtYmVyID0gdignTWVtYmVyJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFtcblx0XHRcdCdvYmplY3QnLCBWYWwsXG5cdFx0XHQnbmFtZScsIFN0cmluZ1xuXHRcdF0pLFxuXHQvLyBwYXJ0cyBhcmUgU3RyaW5ncyBpbnRlcmxlYXZlZCB3aXRoIFZhbHMuXG5cdFF1b3RlID0gdignUXVvdGUnLFxuXHRcdCdUT0RPOkRPQycsXG5cdFx0WyAncGFydHMnLCBbT2JqZWN0XSBdLFxuXHRcdHsgfSxcblx0XHR7XG5cdFx0XHRmb3JTdHJpbmc6IChsb2MsIHN0cikgPT4gUXVvdGUobG9jLCBbIHN0ciBdKVxuXHRcdH0pLFxuXG5cdFNEX0RlYnVnZ2VyID0gMCxcblx0U3BlY2lhbERvID0gZCgnU3BlY2lhbERvJyxcblx0XHQnVE9ETzpET0MnLFxuXHRcdFsgJ2tpbmQnLCBOdW1iZXIgXSksXG5cblx0U1ZfQ29udGFpbnMgPSAwLFxuXHRTVl9GYWxzZSA9IDEsXG5cdFNWX051bGwgPSAyLFxuXHRTVl9TdWIgPSAzLFxuXHRTVl9UaGlzID0gNCxcblx0U1ZfVGhpc01vZHVsZURpcmVjdG9yeSA9IDUsXG5cdFNWX1RydWUgPSA2LFxuXHRTVl9VbmRlZmluZWQgPSA3LFxuXHRTcGVjaWFsVmFsID0gdignU3BlY2lhbFZhbCcsXG5cdFx0J1RPRE86RE9DJyxcblx0XHRbICdraW5kJywgTnVtYmVyIF0pXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==