if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/Loc', 'tupl/dist/tupl', '../CompileError', '../MsAst', './util'], function (exports, _esastDistLoc, _tuplDistTupl, _CompileError, _MsAst, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Loc = _interopRequireDefault(_esastDistLoc);

	var _tupl = _interopRequireDefault(_tuplDistTupl);

	/*
 Token tree, output of `lex/group`.
 That's right: in Mason, the tokens form a tree containing both plain tokens and Group tokens.
 This means that the parser avoids doing much of the work that parsers normally have to do;
 it doesn't have to handle a "left parenthesis", only a Group(tokens, G_Parenthesis).
 */
	const tokenType = function (name, namesTypes) {
		return (0, _tupl.default)(name, Object, null, ['loc', _Loc.default].concat(namesTypes));
	};

	const
	// `.name`, `..name`, etc.
	// Currently nDots > 1 is only used by `use` blocks.
	DotName = tokenType('DotName', ['nDots', Number, 'name', String]),
	     
	// kind is a G_***.
	Group = tokenType('Group', ['subTokens', [Object], 'kind', Number]),
	     
	/*
 A key"word" is any set of characters with a particular meaning.
 This can even include ones like `. ` (defines an object property, as in `key. value`).
 Kind is a KW_***. See the full list below.
 */
	Keyword = tokenType('Keyword', ['kind', Number]),
	     
	// A name is guaranteed to *not* be a keyword.
	// It's also not a DotName.
	Name = tokenType('Name', ['name', String]);
	exports.DotName = DotName;
	exports.Group = Group;
	exports.Keyword = Keyword;
	exports.Name = Name;
	// NumberLiteral is also both a token and an MsAst.

	// toString is used by some parsing errors. Use U.inspect for a more detailed view.
	(0, _util.implementMany)({ DotName: DotName, Group: Group, Keyword: Keyword, Name: Name, NumberLiteral: _MsAst.NumberLiteral }, 'show', {
		DotName: function () {
			return '' + '.'.repeat(this.nDots) + '' + this.name;
		},
		Group: function () {
			return '' + groupKindToName.get(this.kind);
		},
		Keyword: function () {
			return (0, _CompileError.code)(keywordKindToName.get(this.kind));
		},
		Name: function () {
			return this.name;
		},
		NumberLiteral: function () {
			return this.value;
		}
	});

	let nextGroupKind = 0;
	const groupKindToName = new Map(),
	      g = function (name) {
		const kind = nextGroupKind;
		groupKindToName.set(kind, name);
		nextGroupKind = nextGroupKind + 1;
		return kind;
	};
	const G_Parenthesis = g('( )'),
	      G_Bracket = g('[ ]'),
	     
	// Lines in an indented block.
	// Sub-tokens will always be G_Line groups.
	// Note that G_Blocks do not always map to Block* MsAsts.
	G_Block = g('indented block'),
	     
	// Within a quote.
	// Sub-tokens may be strings, or G_Parenthesis groups.
	G_Quote = g('quote'),
	     
	/*
 Tokens on a line.
 NOTE: The indented block following the end of the line is considered to be a part of the line!
 This means that in this code:
 	a
 		b
 		c
 	d
 There are 2 lines, one starting with 'a' and one starting with 'd'.
 The first line contains 'a' and a G_Block which in turn contains two other lines.
 */
	G_Line = g('line'),
	     
	/*
 Groups two or more tokens that are *not* separated by spaces.
 `a[b].c` is an example.
 A single token on its own will not be given a G_Space.
 */
	G_Space = g('spaced group'),
	      showGroupKind = function (groupKind) {
		return groupKindToName.get(groupKind);
	};

	exports.G_Parenthesis = G_Parenthesis;
	exports.G_Bracket = G_Bracket;
	exports.G_Block = G_Block;
	exports.G_Quote = G_Quote;
	exports.G_Line = G_Line;
	exports.G_Space = G_Space;
	exports.showGroupKind = showGroupKind;
	let nextKeywordKind = 0;
	const keywordNameToKind = new Map(),
	      keywordKindToName = new Map(),
	     
	// These keywords are special names.
	// When lexing a name, a map lookup is done by keywordKindFromName.
	kw = function (name) {
		const kind = kwNotName(name);
		keywordNameToKind.set(name, kind);
		return kind;
	},
	     
	// These keywords must be lexed specially.
	kwNotName = function (debugName) {
		const kind = nextKeywordKind;
		keywordKindToName.set(kind, debugName);
		nextKeywordKind = nextKeywordKind + 1;
		return kind;
	},
	      kwReserved = function (name) {
		return keywordNameToKind.set(name, -1);
	};['for', 'of', 'return', 'with'].forEach(kwReserved);

	const KW_Assign = kw('='),
	      KW_AssignMutable = kw('::='),
	      KW_LocalMutate = kw(':='),
	      KW_BreakDo = kw('break!'),
	      KW_BreakVal = kw('break'),
	      KW_Built = kw('built'),
	      KW_CaseDo = kw('case!'),
	      KW_CaseVal = kw('case'),
	      KW_Continue = kw('continue!'),
	      KW_Debug = kw('debug'),
	      KW_Debugger = kw('debugger!'),
	      KW_Else = kw('else'),
	      KW_False = kw('false'),
	      KW_Focus = kwNotName('_'),
	      KW_ForBag = kw('@for'),
	      KW_ForDo = kw('for!'),
	      KW_ForVal = kw('for'),
	      KW_Fun = kw('|'),
	      KW_FunDo = kw('!|'),
	      KW_GenFun = kw('~|'),
	      KW_GenFunDo = kw('~!|'),
	      KW_IfDo = kw('if!'),
	      KW_In = kw('in'),
	      KW_Lazy = kwNotName('~'),
	      KW_MapEntry = kw('->'),
	      KW_Null = kw('null'),
	      KW_ObjAssign = kw('. '),
	      KW_Out = kw('out'),
	      KW_Pass = kw('pass'),
	      KW_Region = kw('region'),
	      KW_This = kw('this'),
	      KW_ThisModuleDirectory = kw('this-module-directory'),
	      KW_True = kw('true'),
	      KW_Type = kwNotName(':'),
	      KW_Undefined = kw('undefined'),
	      KW_UnlessDo = kw('unless!'),
	      KW_Use = kw('use'),
	      KW_UseDebug = kw('use-debug'),
	      KW_UseDo = kw('use!'),
	      KW_UseLazy = kw('use~'),
	      KW_Yield = kw('<~'),
	      KW_YieldTo = kw('<~~'),
	     

	// Returns -1 for reserved keyword or undefined for not-a-keyword.
	opKeywordKindFromName = function (name) {
		return keywordNameToKind.get(name);
	},
	      opKeywordKindToSpecialValueKind = function (kw) {
		switch (kw) {
			case KW_False:
				return _MsAst.SV_False;
			case KW_Null:
				return _MsAst.SV_Null;
			case KW_This:
				return _MsAst.SV_This;
			case KW_ThisModuleDirectory:
				return _MsAst.SV_ThisModuleDirectory;
			case KW_True:
				return _MsAst.SV_True;
			case KW_Undefined:
				return _MsAst.SV_Undefined;
			default:
				return null;
		}
	},
	      isGroup = function (groupKind, token) {
		return token instanceof Group && token.kind === groupKind;
	},
	      isKeyword = function (keywordKind, token) {
		return token instanceof Keyword && token.kind === keywordKind;
	};
	exports.KW_Assign = KW_Assign;
	exports.KW_AssignMutable = KW_AssignMutable;
	exports.KW_LocalMutate = KW_LocalMutate;
	exports.KW_BreakDo = KW_BreakDo;
	exports.KW_BreakVal = KW_BreakVal;
	exports.KW_Built = KW_Built;
	exports.KW_CaseDo = KW_CaseDo;
	exports.KW_CaseVal = KW_CaseVal;
	exports.KW_Continue = KW_Continue;
	exports.KW_Debug = KW_Debug;
	exports.KW_Debugger = KW_Debugger;
	exports.KW_Else = KW_Else;
	exports.KW_False = KW_False;
	exports.KW_Focus = KW_Focus;
	exports.KW_ForBag = KW_ForBag;
	exports.KW_ForDo = KW_ForDo;
	exports.KW_ForVal = KW_ForVal;
	exports.KW_Fun = KW_Fun;
	exports.KW_FunDo = KW_FunDo;
	exports.KW_GenFun = KW_GenFun;
	exports.KW_GenFunDo = KW_GenFunDo;
	exports.KW_IfDo = KW_IfDo;
	exports.KW_In = KW_In;
	exports.KW_Lazy = KW_Lazy;
	exports.KW_MapEntry = KW_MapEntry;
	exports.KW_Null = KW_Null;
	exports.KW_ObjAssign = KW_ObjAssign;
	exports.KW_Out = KW_Out;
	exports.KW_Pass = KW_Pass;
	exports.KW_Region = KW_Region;
	exports.KW_This = KW_This;
	exports.KW_ThisModuleDirectory = KW_ThisModuleDirectory;
	exports.KW_True = KW_True;
	exports.KW_Type = KW_Type;
	exports.KW_Undefined = KW_Undefined;
	exports.KW_UnlessDo = KW_UnlessDo;
	exports.KW_Use = KW_Use;
	exports.KW_UseDebug = KW_UseDebug;
	exports.KW_UseDo = KW_UseDo;
	exports.KW_UseLazy = KW_UseLazy;
	exports.KW_Yield = KW_Yield;
	exports.KW_YieldTo = KW_YieldTo;
	exports.opKeywordKindFromName = opKeywordKindFromName;
	exports.opKeywordKindToSpecialValueKind = opKeywordKindToSpecialValueKind;
	exports.isGroup = isGroup;
	exports.isKeyword = isKeyword;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1Rva2VuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFjQSxPQUFNLFNBQVMsR0FBRyxVQUFDLElBQUksRUFBRSxVQUFVO1NBQ2xDLG1CQUFLLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUUsS0FBSyxlQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0VBQUEsQ0FBQTs7QUFFckQ7OztBQUdOLFFBQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFFLENBQUM7OztBQUVuRSxNQUFLLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFFLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQzs7Ozs7OztBQU1yRSxRQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBRSxDQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQzs7OztBQUdsRCxLQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFFLE1BQU0sRUFBRSxNQUFNLENBQUUsQ0FBQyxDQUFBO1NBWDVDLE9BQU8sR0FBUCxPQUFPO1NBRVAsS0FBSyxHQUFMLEtBQUs7U0FNTCxPQUFPLEdBQVAsT0FBTztTQUdQLElBQUksR0FBSixJQUFJOzs7O0FBSUwsV0E3QlMsYUFBYSxFQTZCUixFQUFFLE9BQU8sRUFBUCxPQUFPLEVBQUUsS0FBSyxFQUFMLEtBQUssRUFBRSxPQUFPLEVBQVAsT0FBTyxFQUFFLElBQUksRUFBSixJQUFJLEVBQUUsYUFBYSxTQWhDbkQsYUFBYSxBQWdDc0MsRUFBRSxFQUFFLE1BQU0sRUFBRTtBQUN2RSxTQUFPLEVBQUEsWUFBRztBQUFFLGVBQVUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQUcsSUFBSSxDQUFDLElBQUks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QVcsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO09BQ3pCLFFBQVEsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO09BQ3RCLFNBQVMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO09BQ3ZCLFVBQVUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ3ZCLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO09BQzdCLFFBQVEsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO09BQ3RCLFdBQVcsR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDO09BQzdCLE9BQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ3BCLFFBQVEsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDO09BQ3RCLFFBQVEsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO09BQ3pCLFNBQVMsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ3RCLFFBQVEsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ3JCLFNBQVMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ3JCLE1BQU0sR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO09BQ2hCLFFBQVEsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO09BQ25CLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO09BQ3BCLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ3ZCLE9BQU8sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ25CLEtBQUssR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO09BQ2hCLE9BQU8sR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDO09BQ3hCLFdBQVcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO09BQ3RCLE9BQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ3BCLFlBQVksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO09BQ3ZCLE1BQU0sR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO09BQ2xCLE9BQU8sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO09BQ3BCLFNB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QVk7U0FDWixXQUFXLEdBQVgsV0FBVztTQUNYLE1BQU0sR0FBTixNQUFNO1NBQ04sV0FBVyxHQUFYLFdBQVc7U0FDWCxRQUFRLEdBQVIsUUFBUTtTQUNSLFVBQVUsR0FBVixVQUFVO1NBQ1YsUUFBUSxHQUFSLFFBQVE7U0FDUixVQUFVLEdBQVYsVUFBVTtTQUdWLHFCQUFxQixHQUFyQixxQkFBcUI7U0FFckIsK0JBQStCLEdBQS9CLCtCQUErQjtTQVcvQixPQUFPLEdBQVAsT0FBTztTQUVQLFNBQVMsR0FBVCxTQUFTIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL1Rva2VuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYyBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB0dXBsIGZyb20gJ3R1cGwvZGlzdC90dXBsJ1xuaW1wb3J0IHsgY29kZSB9IGZyb20gJy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCB7IE51bWJlckxpdGVyYWwgfSBmcm9tICcuLi9Nc0FzdCdcbmltcG9ydCB7IFNWX0ZhbHNlLCBTVl9OdWxsLCBTVl9UaGlzLCBTVl9UaGlzTW9kdWxlRGlyZWN0b3J5LCBTVl9UcnVlLCBTVl9VbmRlZmluZWRcblx0fSBmcm9tICcuLi9Nc0FzdCdcbmltcG9ydCB7IGltcGxlbWVudE1hbnkgfSBmcm9tICcuL3V0aWwnXG5cbi8qXG5Ub2tlbiB0cmVlLCBvdXRwdXQgb2YgYGxleC9ncm91cGAuXG5UaGF0J3MgcmlnaHQ6IGluIE1hc29uLCB0aGUgdG9rZW5zIGZvcm0gYSB0cmVlIGNvbnRhaW5pbmcgYm90aCBwbGFpbiB0b2tlbnMgYW5kIEdyb3VwIHRva2Vucy5cblRoaXMgbWVhbnMgdGhhdCB0aGUgcGFyc2VyIGF2b2lkcyBkb2luZyBtdWNoIG9mIHRoZSB3b3JrIHRoYXQgcGFyc2VycyBub3JtYWxseSBoYXZlIHRvIGRvO1xuaXQgZG9lc24ndCBoYXZlIHRvIGhhbmRsZSBhIFwibGVmdCBwYXJlbnRoZXNpc1wiLCBvbmx5IGEgR3JvdXAodG9rZW5zLCBHX1BhcmVudGhlc2lzKS5cbiovXG5jb25zdCB0b2tlblR5cGUgPSAobmFtZSwgbmFtZXNUeXBlcykgPT5cblx0dHVwbChuYW1lLCBPYmplY3QsIG51bGwsIFsgJ2xvYycsIExvYyBdLmNvbmNhdChuYW1lc1R5cGVzKSlcblxuZXhwb3J0IGNvbnN0XG5cdC8vIGAubmFtZWAsIGAuLm5hbWVgLCBldGMuXG5cdC8vIEN1cnJlbnRseSBuRG90cyA+IDEgaXMgb25seSB1c2VkIGJ5IGB1c2VgIGJsb2Nrcy5cblx0RG90TmFtZSA9IHRva2VuVHlwZSgnRG90TmFtZScsIFsgJ25Eb3RzJywgTnVtYmVyLCAnbmFtZScsIFN0cmluZyBdKSxcblx0Ly8ga2luZCBpcyBhIEdfKioqLlxuXHRHcm91cCA9IHRva2VuVHlwZSgnR3JvdXAnLCBbICdzdWJUb2tlbnMnLCBbT2JqZWN0XSwgJ2tpbmQnLCBOdW1iZXIgXSksXG5cdC8qXG5cdEEga2V5XCJ3b3JkXCIgaXMgYW55IHNldCBvZiBjaGFyYWN0ZXJzIHdpdGggYSBwYXJ0aWN1bGFyIG1lYW5pbmcuXG5cdFRoaXMgY2FuIGV2ZW4gaW5jbHVkZSBvbmVzIGxpa2UgYC4gYCAoZGVmaW5lcyBhbiBvYmplY3QgcHJvcGVydHksIGFzIGluIGBrZXkuIHZhbHVlYCkuXG5cdEtpbmQgaXMgYSBLV18qKiouIFNlZSB0aGUgZnVsbCBsaXN0IGJlbG93LlxuXHQqL1xuXHRLZXl3b3JkID0gdG9rZW5UeXBlKCdLZXl3b3JkJywgWyAna2luZCcsIE51bWJlciBdKSxcblx0Ly8gQSBuYW1lIGlzIGd1YXJhbnRlZWQgdG8gKm5vdCogYmUgYSBrZXl3b3JkLlxuXHQvLyBJdCdzIGFsc28gbm90IGEgRG90TmFtZS5cblx0TmFtZSA9IHRva2VuVHlwZSgnTmFtZScsIFsgJ25hbWUnLCBTdHJpbmcgXSlcblx0Ly8gTnVtYmVyTGl0ZXJhbCBpcyBhbHNvIGJvdGggYSB0b2tlbiBhbmQgYW4gTXNBc3QuXG5cbi8vIHRvU3RyaW5nIGlzIHVzZWQgYnkgc29tZSBwYXJzaW5nIGVycm9ycy4gVXNlIFUuaW5zcGVjdCBmb3IgYSBtb3JlIGRldGFpbGVkIHZpZXcuXG5pbXBsZW1lbnRNYW55KHsgRG90TmFtZSwgR3JvdXAsIEtleXdvcmQsIE5hbWUsIE51bWJlckxpdGVyYWwgfSwgJ3Nob3cnLCB7XG5cdERvdE5hbWUoKSB7IHJldHVybiBgJHsnLicucmVwZWF0KHRoaXMubkRvdHMpfSR7dGhpcy5uYW1lfWAgfSxcblx0R3JvdXAoKSB7IHJldHVybiBgJHtncm91cEtpbmRUb05hbWUuZ2V0KHRoaXMua2luZCl9YCB9LFxuXHRLZXl3b3JkKCkgeyByZXR1cm4gY29kZShrZXl3b3JkS2luZFRvTmFtZS5nZXQodGhpcy5raW5kKSkgfSxcblx0TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZSB9LFxuXHROdW1iZXJMaXRlcmFsKCkgeyByZXR1cm4gdGhpcy52YWx1ZSB9XG59KVxuXG5sZXQgbmV4dEdyb3VwS2luZCA9IDBcbmNvbnN0XG5cdGdyb3VwS2luZFRvTmFtZSA9IG5ldyBNYXAoKSxcblx0ZyA9IG5hbWUgPT4ge1xuXHRcdGNvbnN0IGtpbmQgPSBuZXh0R3JvdXBLaW5kXG5cdFx0Z3JvdXBLaW5kVG9OYW1lLnNldChraW5kLCBuYW1lKVxuXHRcdG5leHRHcm91cEtpbmQgPSBuZXh0R3JvdXBLaW5kICsgMVxuXHRcdHJldHVybiBraW5kXG5cdH1cbmV4cG9ydCBjb25zdFxuXHRHX1BhcmVudGhlc2lzID0gZygnKCApJyksXG5cdEdfQnJhY2tldCA9IGcoJ1sgXScpLFxuXHQvLyBMaW5lcyBpbiBhbiBpbmRlbnRlZCBibG9jay5cblx0Ly8gU3ViLXRva2VucyB3aWxsIGFsd2F5cyBiZSBHX0xpbmUgZ3JvdXBzLlxuXHQvLyBOb3RlIHRoYXQgR19CbG9ja3MgZG8gbm90IGFsd2F5cyBtYXAgdG8gQmxvY2sqIE1zQXN0cy5cblx0R19CbG9jayA9IGcoJ2luZGVudGVkIGJsb2NrJyksXG5cdC8vIFdpdGhpbiBhIHF1b3RlLlxuXHQvLyBTdWItdG9rZW5zIG1heSBiZSBzdHJpbmdzLCBvciBHX1BhcmVudGhlc2lzIGdyb3Vwcy5cblx0R19RdW90ZSA9IGcoJ3F1b3RlJyksXG5cdC8qXG5cdFRva2VucyBvbiBhIGxpbmUuXG5cdE5PVEU6IFRoZSBpbmRlbnRlZCBibG9jayBmb2xsb3dpbmcgdGhlIGVuZCBvZiB0aGUgbGluZSBpcyBjb25zaWRlcmVkIHRvIGJlIGEgcGFydCBvZiB0aGUgbGluZSFcblx0VGhpcyBtZWFucyB0aGF0IGluIHRoaXMgY29kZTpcblx0XHRhXG5cdFx0XHRiXG5cdFx0XHRjXG5cdFx0ZFxuXHRUaGVyZSBhcmUgMiBsaW5lcywgb25lIHN0YXJ0aW5nIHdpdGggJ2EnIGFuZCBvbmUgc3RhcnRpbmcgd2l0aCAnZCcuXG5cdFRoZSBmaXJzdCBsaW5lIGNvbnRhaW5zICdhJyBhbmQgYSBHX0Jsb2NrIHdoaWNoIGluIHR1cm4gY29udGFpbnMgdHdvIG90aGVyIGxpbmVzLlxuXHQqL1xuXHRHX0xpbmUgPSBnKCdsaW5lJyksXG5cdC8qXG5cdEdyb3VwcyB0d28gb3IgbW9yZSB0b2tlbnMgdGhhdCBhcmUgKm5vdCogc2VwYXJhdGVkIGJ5IHNwYWNlcy5cblx0YGFbYl0uY2AgaXMgYW4gZXhhbXBsZS5cblx0QSBzaW5nbGUgdG9rZW4gb24gaXRzIG93biB3aWxsIG5vdCBiZSBnaXZlbiBhIEdfU3BhY2UuXG5cdCovXG5cdEdfU3BhY2UgPSBnKCdzcGFjZWQgZ3JvdXAnKSxcblx0c2hvd0dyb3VwS2luZCA9IGdyb3VwS2luZCA9PiBncm91cEtpbmRUb05hbWUuZ2V0KGdyb3VwS2luZClcblxuXG5sZXQgbmV4dEtleXdvcmRLaW5kID0gMFxuY29uc3Rcblx0a2V5d29yZE5hbWVUb0tpbmQgPSBuZXcgTWFwKCksXG5cdGtleXdvcmRLaW5kVG9OYW1lID0gbmV3IE1hcCgpLFxuXHQvLyBUaGVzZSBrZXl3b3JkcyBhcmUgc3BlY2lhbCBuYW1lcy5cblx0Ly8gV2hlbiBsZXhpbmcgYSBuYW1lLCBhIG1hcCBsb29rdXAgaXMgZG9uZSBieSBrZXl3b3JkS2luZEZyb21OYW1lLlxuXHRrdyA9IG5hbWUgPT4ge1xuXHRcdGNvbnN0IGtpbmQgPSBrd05vdE5hbWUobmFtZSlcblx0XHRrZXl3b3JkTmFtZVRvS2luZC5zZXQobmFtZSwga2luZClcblx0XHRyZXR1cm4ga2luZFxuXHR9LFxuXHQvLyBUaGVzZSBrZXl3b3JkcyBtdXN0IGJlIGxleGVkIHNwZWNpYWxseS5cblx0a3dOb3ROYW1lID0gZGVidWdOYW1lID0+IHtcblx0XHRjb25zdCBraW5kID0gbmV4dEtleXdvcmRLaW5kXG5cdFx0a2V5d29yZEtpbmRUb05hbWUuc2V0KGtpbmQsIGRlYnVnTmFtZSlcblx0XHRuZXh0S2V5d29yZEtpbmQgPSBuZXh0S2V5d29yZEtpbmQgKyAxXG5cdFx0cmV0dXJuIGtpbmRcblx0fSxcblx0a3dSZXNlcnZlZCA9IG5hbWUgPT5cblx0XHRrZXl3b3JkTmFtZVRvS2luZC5zZXQobmFtZSwgLTEpXG5cbjsgWyAnZm9yJywgJ29mJywgJ3JldHVybicsICd3aXRoJyBdLmZvckVhY2goa3dSZXNlcnZlZClcblxuZXhwb3J0IGNvbnN0XG5cdEtXX0Fzc2lnbiA9IGt3KCc9JyksXG5cdEtXX0Fzc2lnbk11dGFibGUgPSBrdygnOjo9JyksXG5cdEtXX0xvY2FsTXV0YXRlID0ga3coJzo9JyksXG5cdEtXX0JyZWFrRG8gPSBrdygnYnJlYWshJyksXG5cdEtXX0JyZWFrVmFsID0ga3coJ2JyZWFrJyksXG5cdEtXX0J1aWx0ID0ga3coJ2J1aWx0JyksXG5cdEtXX0Nhc2VEbyA9IGt3KCdjYXNlIScpLFxuXHRLV19DYXNlVmFsID0ga3coJ2Nhc2UnKSxcblx0S1dfQ29udGludWUgPSBrdygnY29udGludWUhJyksXG5cdEtXX0RlYnVnID0ga3coJ2RlYnVnJyksXG5cdEtXX0RlYnVnZ2VyID0ga3coJ2RlYnVnZ2VyIScpLFxuXHRLV19FbHNlID0ga3coJ2Vsc2UnKSxcblx0S1dfRmFsc2UgPSBrdygnZmFsc2UnKSxcblx0S1dfRm9jdXMgPSBrd05vdE5hbWUoJ18nKSxcblx0S1dfRm9yQmFnID0ga3coJ0Bmb3InKSxcblx0S1dfRm9yRG8gPSBrdygnZm9yIScpLFxuXHRLV19Gb3JWYWwgPSBrdygnZm9yJyksXG5cdEtXX0Z1biA9IGt3KCd8JyksXG5cdEtXX0Z1bkRvID0ga3coJyF8JyksXG5cdEtXX0dlbkZ1biA9IGt3KCd+fCcpLFxuXHRLV19HZW5GdW5EbyA9IGt3KCd+IXwnKSxcblx0S1dfSWZEbyA9IGt3KCdpZiEnKSxcblx0S1dfSW4gPSBrdygnaW4nKSxcblx0S1dfTGF6eSA9IGt3Tm90TmFtZSgnficpLFxuXHRLV19NYXBFbnRyeSA9IGt3KCctPicpLFxuXHRLV19OdWxsID0ga3coJ251bGwnKSxcblx0S1dfT2JqQXNzaWduID0ga3coJy4gJyksXG5cdEtXX091dCA9IGt3KCdvdXQnKSxcblx0S1dfUGFzcyA9IGt3KCdwYXNzJyksXG5cdEtXX1JlZ2lvbiA9IGt3KCdyZWdpb24nKSxcblx0S1dfVGhpcyA9IGt3KCd0aGlzJyksXG5cdEtXX1RoaXNNb2R1bGVEaXJlY3RvcnkgPSBrdygndGhpcy1tb2R1bGUtZGlyZWN0b3J5JyksXG5cdEtXX1RydWUgPSBrdygndHJ1ZScpLFxuXHRLV19UeXBlID0ga3dOb3ROYW1lKCc6JyksXG5cdEtXX1VuZGVmaW5lZCA9IGt3KCd1bmRlZmluZWQnKSxcblx0S1dfVW5sZXNzRG8gPSBrdygndW5sZXNzIScpLFxuXHRLV19Vc2UgPSBrdygndXNlJyksXG5cdEtXX1VzZURlYnVnID0ga3coJ3VzZS1kZWJ1ZycpLFxuXHRLV19Vc2VEbyA9IGt3KCd1c2UhJyksXG5cdEtXX1VzZUxhenkgPSBrdygndXNlficpLFxuXHRLV19ZaWVsZCA9IGt3KCc8ficpLFxuXHRLV19ZaWVsZFRvID0ga3coJzx+ficpLFxuXG5cdC8vIFJldHVybnMgLTEgZm9yIHJlc2VydmVkIGtleXdvcmQgb3IgdW5kZWZpbmVkIGZvciBub3QtYS1rZXl3b3JkLlxuXHRvcEtleXdvcmRLaW5kRnJvbU5hbWUgPSBuYW1lID0+XG5cdFx0a2V5d29yZE5hbWVUb0tpbmQuZ2V0KG5hbWUpLFxuXHRvcEtleXdvcmRLaW5kVG9TcGVjaWFsVmFsdWVLaW5kID0ga3cgPT4ge1xuXHRcdHN3aXRjaCAoa3cpIHtcblx0XHRcdGNhc2UgS1dfRmFsc2U6IHJldHVybiBTVl9GYWxzZVxuXHRcdFx0Y2FzZSBLV19OdWxsOiByZXR1cm4gU1ZfTnVsbFxuXHRcdFx0Y2FzZSBLV19UaGlzOiByZXR1cm4gU1ZfVGhpc1xuXHRcdFx0Y2FzZSBLV19UaGlzTW9kdWxlRGlyZWN0b3J5OiByZXR1cm4gU1ZfVGhpc01vZHVsZURpcmVjdG9yeVxuXHRcdFx0Y2FzZSBLV19UcnVlOiByZXR1cm4gU1ZfVHJ1ZVxuXHRcdFx0Y2FzZSBLV19VbmRlZmluZWQ6IHJldHVybiBTVl9VbmRlZmluZWRcblx0XHRcdGRlZmF1bHQ6IHJldHVybiBudWxsXG5cdFx0fVxuXHR9LFxuXHRpc0dyb3VwID0gKGdyb3VwS2luZCwgdG9rZW4pID0+XG5cdFx0dG9rZW4gaW5zdGFuY2VvZiBHcm91cCAmJiB0b2tlbi5raW5kID09PSBncm91cEtpbmQsXG5cdGlzS2V5d29yZCA9IChrZXl3b3JkS2luZCwgdG9rZW4pID0+XG5cdFx0dG9rZW4gaW5zdGFuY2VvZiBLZXl3b3JkICYmIHRva2VuLmtpbmQgPT09IGtleXdvcmRLaW5kXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==