if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../CompileError', '../MsAst', './language', './Token', './util'], function (exports, module, _esastDistLoc, _CompileError, _MsAst, _language, _Token, _util) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Loc = _interopRequireDefault(_esastDistLoc);

	/*
 This produces the Token tree (see Token.js).
 */

	module.exports = function (context, sourceString) {
		// Lexing algorithm requires trailing newline to close any blocks.
		// Use a null-terminated string because it's faster than checking whether index === length.
		sourceString = sourceString + '\n\u0000';

		// --------------------------------------------------------------------------------------------
		// GROUPING
		// --------------------------------------------------------------------------------------------
		// We only ever write to the innermost Group;
		// when we close that Group we add it to the enclosing Group and continue with that one.
		// Note that `curGroup` is conceptually the top of the stack, but is not stored in `stack`.
		const groupStack = [];
		let curGroup;
		const addToCurrentGroup = function (token) {
			return curGroup.subTokens.push(token);
		},
		     

		// Pause writing to curGroup in favor of writing to a sub-group.
		// When the sub-group finishes we will pop the stack and resume writing to its parent.
		openGroup = function (openPos, groupKind) {
			groupStack.push(curGroup);
			// Contents will be added to by `o`.
			// curGroup.loc.end will be written to when closing it.
			curGroup = (0, _Token.Group)((0, _Loc.default)(openPos, null), [], groupKind);
		},
		     

		// A group ending may close mutliple groups.
		// For example, in `log! (+ 1 1`, the G_Line will also close a G_Parenthesis.
		closeGroups = function (closePos, closeKind) {
			// curGroup is different each time we go through the loop
			// because _closeSingleGroup brings us to an enclosing group.
			while (curGroup.kind !== closeKind) {
				const curKind = curGroup.kind;
				// A line can close a parenthesis, but a parenthesis can't close a line!
				context.check(curKind === _Token.G_Parenthesis || curKind === _Token.G_Bracket || curKind === _Token.G_Space, closePos, function () {
					return 'Trying to close ' + (0, _Token.showGroupKind)(closeKind) + ', ' + ('but last opened was ' + (0, _Token.showGroupKind)(curKind));
				});
				_closeSingleGroup(closePos, curGroup.kind);
			}
			_closeSingleGroup(closePos, closeKind);
		},
		      _closeSingleGroup = function (closePos, closeKind) {
			let justClosed = curGroup;
			curGroup = groupStack.pop();
			justClosed.loc.end = closePos;
			switch (closeKind) {
				case _Token.G_Space:
					{
						const size = justClosed.subTokens.length;
						if (size !== 0)
							// Spaced should always have at least two elements.
							addToCurrentGroup(size === 1 ? justClosed.subTokens[0] : justClosed);
						break;
					}
				case _Token.G_Line:
					// Line must have content.
					// This can happen if there was just a comment.
					if (!(0, _util.isEmpty)(justClosed.subTokens)) addToCurrentGroup(justClosed);
					break;
				case _Token.G_Block:
					context.check(!(0, _util.isEmpty)(justClosed.subTokens), closePos, 'Empty block.');
					addToCurrentGroup(justClosed);
					break;
				default:
					addToCurrentGroup(justClosed);
			}
		},
		      openParenthesis = function (loc) {
			openGroup(loc.start, _Token.G_Parenthesis);
			openGroup(loc.end, _Token.G_Space);
		},
		      openBracket = function (loc) {
			openGroup(loc.start, _Token.G_Bracket);
			openGroup(loc.end, _Token.G_Space);
		},
		     

		// When starting a new line, a spaced group is created implicitly.
		openLine = function (pos) {
			openGroup(pos, _Token.G_Line);
			openGroup(pos, _Token.G_Space);
		},
		      closeLine = function (pos) {
			closeGroups(pos, _Token.G_Space);
			closeGroups(pos, _Token.G_Line);
		},
		     

		// When encountering a space, it both closes and opens a spaced group.
		space = function (loc) {
			closeGroups(loc.start, _Token.G_Space);
			openGroup(loc.end, _Token.G_Space);
		};

		// --------------------------------------------------------------------------------------------
		// ITERATING THROUGH SOURCESTRING
		// --------------------------------------------------------------------------------------------
		/*
  These are kept up-to-date as we iterate through sourceString.
  Every access to index has corresponding changes to line and/or column.
  This also explains why there are different functions for newlines vs other characters.
  */
		let index = 0,
		    line = _esastDistLoc.StartLine,
		    column = _esastDistLoc.StartColumn;

		/*
  NOTE: We use character *codes* for everything.
  Characters are of type Number and not just Strings of length one.
  */
		const pos = function () {
			return (0, _esastDistLoc.Pos)(line, column);
		},
		      peek = function () {
			return sourceString.charCodeAt(index);
		},
		      peekNext = function () {
			return sourceString.charCodeAt(index + 1);
		},
		     

		// May eat a Newline.
		// If that happens, line and column will temporarily be wrong,
		// but we handle it in that special case (rather than checking for Newline every time).
		eat = function () {
			const char = sourceString.charCodeAt(index);
			index = index + 1;
			column = column + 1;
			return char;
		},
		      skip = eat,
		     

		// charToEat must not be Newline.
		tryEat = function (charToEat) {
			const canEat = peek() === charToEat;
			if (canEat) {
				index = index + 1;
				column = column + 1;
			}
			return canEat;
		},
		      mustEat = function (charToEat, precededBy) {
			const canEat = tryEat(charToEat);
			context.check(canEat, pos, function () {
				return (0, _CompileError.code)(precededBy) + ' must be followed by ' + showChar(charToEat);
			});
		},
		      tryEatNewline = function () {
			const canEat = peek() === Newline;
			if (canEat) {
				index = index + 1;
				line = line + 1;
				column = _esastDistLoc.StartColumn;
			}
			return canEat;
		},
		     

		// Caller must ensure that backing up nCharsToBackUp characters brings us to oldPos.
		stepBackMany = function (oldPos, nCharsToBackUp) {
			index = index - nCharsToBackUp;
			line = oldPos.line;
			column = oldPos.column;
		},
		     

		// For takeWhile, takeWhileWithPrev, and skipWhileEquals,
		// characterPredicate must *not* accept Newline.
		// Otherwise there may be an infinite loop!
		takeWhile = function (characterPredicate) {
			const startIndex = index;
			_skipWhile(characterPredicate);
			return sourceString.slice(startIndex, index);
		},
		      takeWhileWithPrev = function (characterPredicate) {
			const startIndex = index;
			_skipWhile(characterPredicate);
			return sourceString.slice(startIndex - 1, index);
		},
		      skipWhileEquals = function (char) {
			return _skipWhile(function (_) {
				return _ === char;
			});
		},
		      skipRestOfLine = function () {
			return _skipWhile(function (_) {
				return _ !== Newline;
			});
		},
		      _skipWhile = function (characterPredicate) {
			const startIndex = index;
			while (characterPredicate(peek())) index = index + 1;
			const diff = index - startIndex;
			column = column + diff;
			return diff;
		},
		     

		// Called after seeing the first newline.
		// Returns # total newlines, including the first.
		skipNewlines = function () {
			const startLine = line;
			line = line + 1;
			while (peek() === Newline) {
				index = index + 1;
				line = line + 1;
			}
			column = _esastDistLoc.StartColumn;
			return line - startLine;
		};

		// Sprinkle checkPos() around to debug line and column tracking errors.
		/*
  const
  	checkPos = () => {
  		const p = _getCorrectPos()
  		if (p.line !== line || p.column !== column)
  			throw new Error(`index: ${index}, wrong: ${Pos(line, column)}, right: ${p}`)
  	},
  	_indexToPos = new Map(),
  	_getCorrectPos = () => {
  		if (index === 0)
  			return Pos(StartLine, StartColumn)
  			let oldPos, oldIndex
  		for (oldIndex = index - 1; ; oldIndex = oldIndex - 1) {
  			oldPos = _indexToPos.get(oldIndex)
  			if (oldPos !== undefined)
  				break
  			assert(oldIndex >= 0)
  		}
  		let newLine = oldPos.line, newColumn = oldPos.column
  		for (; oldIndex < index; oldIndex = oldIndex + 1)
  			if (sourceString.charCodeAt(oldIndex) === Newline) {
  				newLine = newLine + 1
  				newColumn = StartColumn
  			} else
  				newColumn = newColumn + 1
  			const p = Pos(newLine, newColumn)
  		_indexToPos.set(index, p)
  		return p
  	}
  */

		/*
  In the case of quote interpolation ("a{b}c") we'll recurse back into here.
  When isInQuote is true, we will not allow newlines.
  */
		const lexPlain = function (isInQuote) {
			// This tells us which indented block we're in.
			// Incrementing it means issuing a GP_OpenBlock and decrementing it means a GP_CloseBlock.
			// Does nothing if isInQuote.
			let indent = 0;

			// Make closures now rather than inside the loop.
			// This is significantly faster as of node v0.11.14.

			// This is where we started lexing the current token.
			let startColumn;
			const startPos = function () {
				return (0, _esastDistLoc.Pos)(line, startColumn);
			},
			      loc = function () {
				return (0, _Loc.default)(startPos(), pos());
			},
			      keyword = function (kind) {
				return addToCurrentGroup((0, _Token.Keyword)(loc(), kind));
			},
			      funKeyword = function (kind) {
				keyword(kind);
				space(loc());
			},
			      eatAndAddNumber = function () {
				// TODO: A real number literal lexer, not just JavaScript's...
				const numberString = takeWhileWithPrev(isNumberCharacter);
				const number = Number(numberString);
				context.check(!Number.isNaN(number), pos, function () {
					return 'Invalid number literal ' + (0, _CompileError.code)(numberString);
				});
				addToCurrentGroup((0, _MsAst.NumberLiteral)(loc(), number));
			};

			const handleName = function () {
				// All other characters should be handled in a case above.
				const name = takeWhileWithPrev(isNameCharacter);
				const keywordKind = (0, _Token.opKeywordKindFromName)(name);
				if (keywordKind !== undefined) {
					context.check(keywordKind !== -1, pos, function () {
						return 'Reserved name ' + (0, _CompileError.code)(name);
					});
					if (keywordKind === _Token.KW_Region)
						// TODO: Eat and put it in Region expression
						skipRestOfLine();
					keyword(keywordKind);
				} else addToCurrentGroup((0, _Token.Name)(loc(), name));
			};

			while (true) {
				startColumn = column;
				const characterEaten = eat();
				// Generally, the type of a token is determined by the first character.
				switch (characterEaten) {
					case Zero:
						return;
					case CloseBrace:
						context.check(isInQuote, loc, function () {
							return 'Reserved character ' + showChar(CloseBrace);
						});
						return;
					case Quote:
						lexQuote(indent);
						break;

					// GROUPS

					case OpenParenthesis:
						openParenthesis(loc());
						break;
					case OpenBracket:
						openBracket(loc());
						break;
					case CloseParenthesis:
						closeGroups(pos(), _Token.G_Parenthesis);
						break;
					case CloseBracket:
						closeGroups(pos(), _Token.G_Bracket);
						break;

					case Space:
						{
							const next = peek();
							context.warnIf(next === Space, loc, 'Multiple spaces in a row.');
							context.warnIf(next === Newline, loc, 'Line ends in a space.');
							space(loc());
							break;
						}

					case Newline:
						{
							context.check(!isInQuote, loc, 'Quote interpolation cannot contain newline');

							// Skip any blank lines.
							skipNewlines();
							const oldIndent = indent;
							indent = skipWhileEquals(Tab);
							context.check(peek() !== Space, pos, 'Line begins in a space');
							if (indent <= oldIndent) {
								const l = loc();
								for (let i = indent; i < oldIndent; i = i + 1) {
									closeLine(l.start);
									closeGroups(l.end, _Token.G_Block);
								}
								closeLine(l.start);
								openLine(l.end);
							} else {
								context.check(indent === oldIndent + 1, loc, 'Line is indented more than once');
								// Block at end of line goes in its own spaced group.
								// However, `~` preceding a block goes in a group with it.
								if ((0, _util.isEmpty)(curGroup.subTokens) || !(0, _Token.isKeyword)(_Token.KW_Lazy, (0, _util.last)(curGroup.subTokens))) space(loc());
								openGroup(loc().start, _Token.G_Block);
								openLine(loc().end);
							}
							break;
						}
					case Tab:
						// We always eat tabs in the Newline handler,
						// so this will only happen in the middle of a line.
						context.fail(loc(), 'Tab may only be used to indent');

					// FUN

					case Bang:
						if (tryEat(Bar)) funKeyword(_Token.KW_FunDo);else handleName();
						break;
					case Tilde:
						if (tryEat(Bang)) {
							mustEat(Bar, '~!');
							funKeyword(_Token.KW_FunGenDo);
						} else if (tryEat(Bar)) funKeyword(_Token.KW_FunGen);else keyword(_Token.KW_Lazy);
						break;
					case Bar:
						keyword(_Token.KW_Fun);
						// First arg in its own spaced group
						space(loc());
						break;

					// NUMBER

					case Hyphen:
						if (isDigit(peek()))
							// eatNumber() looks at prev character, so hyphen included.
							eatAndAddNumber();else handleName();
						break;
					case N0:case N1:case N2:case N3:case N4:
					case N5:case N6:case N7:case N8:case N9:
						eatAndAddNumber();
						break;

					// OTHER

					case Hash:
						if (tryEat(Hash)) {
							// Multi-line comment
							mustEat(Hash, '##');
							while (true) if (eat() === Hash && eat() === Hash && eat() === Hash) {
								const nl = tryEat(Newline);
								context.check(nl, loc, function () {
									return '#Closing {code(\'###\')} must be followed by newline.';
								});
								break;
							}
						} else {
							// Single-line comment
							if (!(tryEat(Space) || tryEat(Tab))) context.fail(loc, function () {
								return (0, _CompileError.code)('#') + ' must be followed by space or tab.';
							});
							skipRestOfLine();
						}
						break;

					case Dot:
						{
							const next = peek();
							if (next === Space || next === Newline) {
								// ObjLit assign in its own spaced group.
								// We can't just create a new Group here because we want to
								// ensure it's not part of the preceding or following spaced group.
								closeGroups(startPos(), _Token.G_Space);
								keyword(_Token.KW_ObjAssign);
								// This exists solely so that the Space or Newline handler can close it...
								openGroup(pos(), _Token.G_Space);
							} else if (next === Bar) {
								skip();
								keyword(_Token.KW_FunThis);
								space(loc());
							} else if (next === Bang && peekNext() === Bar) {
								skip();
								skip();
								keyword(_Token.KW_FunThisDo);
								space(loc());
							} else if (next === Tilde) {
								skip();
								if (tryEat(Bang)) {
									mustEat(Bar, '.~!');
									keyword(_Token.KW_FunThisGenDo);
								} else {
									mustEat(Bar, '.~');
									keyword(_Token.KW_FunThisGen);
								}
								space(loc());
							} else {
								// +1 for the dot we just ate.
								const nDots = skipWhileEquals(Dot) + 1;
								const next = peek();
								if (nDots === 3 && next === Space || next === Newline) keyword(_Token.KW_Ellipsis);else addToCurrentGroup((0, _Token.DotName)(loc(), nDots, takeWhile(isNameCharacter)));
							}
							break;
						}

					case Colon:
						if (tryEat(Colon)) {
							mustEat(Equal, '::');
							keyword(_Token.KW_AssignMutable);
						} else if (tryEat(Equal)) keyword(_Token.KW_LocalMutate);else keyword(_Token.KW_Type);
						break;

					case Underscore:
						keyword(_Token.KW_Focus);
						break;

					case Ampersand:case Backslash:case Backtick:case Caret:
					case Comma:case Percent:case Semicolon:
						context.fail(loc, 'Reserved character ' + showChar(characterEaten));
					default:
						handleName();
				}
			}
		};

		const lexQuote = function (indent) {
			const quoteIndent = indent + 1;

			// Indented quote is characterized by being immediately followed by a newline.
			// The next line *must* have some content at the next indentation.
			const isIndented = tryEatNewline();
			if (isIndented) {
				const actualIndent = skipWhileEquals(Tab);
				context.check(actualIndent === quoteIndent, pos, 'Indented quote must have exactly one more indent than previous line.');
			}

			// Current string literal part of quote we are reading.
			let read = '';

			const maybeOutputRead = function () {
				if (read !== '') {
					addToCurrentGroup(read);
					read = '';
				}
			};

			const locSingle = function () {
				return (0, _esastDistLoc.singleCharLoc)(pos());
			};

			openGroup(locSingle().start, _Token.G_Quote);

			eatChars: while (true) {
				const char = eat();
				switch (char) {
					case Backslash:
						{
							read = read + quoteEscape(eat());
							break;
						}
					case OpenBrace:
						{
							maybeOutputRead();
							const l = locSingle();
							openParenthesis(l);
							lexPlain(true);
							closeGroups(l.end, _Token.G_Parenthesis);
							break;
						}
					case Newline:
						{
							const originalPos = pos();
							// Go back to before we ate it.
							originalPos.column = originalPos.column - 1;

							context.check(isIndented, locSingle, 'Unclosed quote.');
							// Allow extra blank lines.
							const numNewlines = skipNewlines();
							const newIndent = skipWhileEquals(Tab);
							if (newIndent < quoteIndent) {
								// Indented quote section is over.
								// Undo reading the tabs and newline.
								stepBackMany(originalPos, numNewlines + newIndent);
								(0, _util.assert)(peek() === Newline);
								break eatChars;
							} else read = read + '\n'.repeat(numNewlines) + '\t'.repeat(newIndent - quoteIndent);
							break;
						}
					case Quote:
						if (!isIndented) break eatChars;
					// Else fallthrough
					default:
						// I've tried pushing character codes to an array and stringifying them later,
						// but this turned out to be better.
						read = read + String.fromCharCode(char);
				}
			}

			maybeOutputRead();
			closeGroups(pos(), _Token.G_Quote);
		};

		const quoteEscape = function (ch) {
			switch (ch) {
				case OpenBrace:
					return '{';
				case LetterN:
					return '\n';
				case LetterT:
					return '\t';
				case Quote:
					return '"';
				case Backslash:
					return '\\';
				default:
					context.fail(pos, 'No need to escape ' + showChar(ch));
			}
		};

		curGroup = (0, _Token.Group)((0, _Loc.default)(_esastDistLoc.StartPos, null), [], _Token.G_Block);
		openLine(_esastDistLoc.StartPos);

		lexPlain(false);

		const endPos = pos();
		closeLine(endPos);
		(0, _util.assert)((0, _util.isEmpty)(groupStack));
		curGroup.loc.end = endPos;
		return curGroup;
	};

	const cc = function (_) {
		return _.charCodeAt(0);
	};
	const Ampersand = cc('&'),
	      Backslash = cc('\\'),
	      Backtick = cc('`'),
	      Bang = cc('!'),
	      Bar = cc('|'),
	      Caret = cc('^'),
	      CloseBrace = cc('}'),
	      CloseBracket = cc(']'),
	      CloseParenthesis = cc(')'),
	      Colon = cc(':'),
	      Comma = cc(','),
	      Dot = cc('.'),
	      Equal = cc('='),
	      Hash = cc('#'),
	      Hyphen = cc('-'),
	      LetterN = cc('n'),
	      LetterT = cc('t'),
	      N0 = cc('0'),
	      N1 = cc('1'),
	      N2 = cc('2'),
	      N3 = cc('3'),
	      N4 = cc('4'),
	      N5 = cc('5'),
	      N6 = cc('6'),
	      N7 = cc('7'),
	      N8 = cc('8'),
	      N9 = cc('9'),
	      Newline = cc('\n'),
	      OpenBrace = cc('{'),
	      OpenBracket = cc('['),
	      OpenParenthesis = cc('('),
	      Percent = cc('%'),
	      Quote = cc('"'),
	      Semicolon = cc(';'),
	      Space = cc(' '),
	      Tab = cc('\t'),
	      Tilde = cc('~'),
	      Underscore = cc('_'),
	      Zero = cc('\u0000');

	const showChar = function (char) {
		return (0, _CompileError.code)(String.fromCharCode(char));
	},
	      _charPred = function (chars, negate) {
		let src = 'switch(ch) {\n';
		for (let i = 0; i < chars.length; i = i + 1) src = src + 'case ' + chars.charCodeAt(i) + ': ';
		src = src + ' return ' + !negate + '\ndefault: return ' + negate + '\n}';
		return Function('ch', src);
	},
	      isDigit = _charPred('0123456789'),
	      isNameCharacter = _charPred(_language.NonNameCharacters, true),
	      isNumberCharacter = _charPred('0123456789.e');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQkFhZSxVQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUs7OztBQUd6QyxjQUFZLEdBQUcsWUFBWSxHQUFHLFVBQU0sQ0FBQTs7Ozs7Ozs7QUFRcEMsUUFBTSxVQUFVLEdBQUcsRUFBRyxDQUFBO0FBQ3RCLE1BQUksUUFBUSxDQUFBO0FBQ1osUUFDQyxpQkFBaUIsR0FBRyxVQUFBLEtBQUs7VUFDeEIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0dBQUE7Ozs7O0FBSS9CLFdBQVMsR0FBRyxVQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUs7QUFDbkMsYUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTs7O0FBR3pCLFdBQVEsR0FBRyxXQWhDSSxLQUFLLEVBZ0NILGtCQUFJLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFHLEVBQUUsU0FBUyxDQUFDLENBQUE7R0FDcEQ7Ozs7O0FBSUQsYUFBVyxHQUFHLFVBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSzs7O0FBR3RDLFVBQU8sUUFBUSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7QUFDbkMsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQTs7QUFFN0IsV0FBTyxDQUFDLEtBQUssQ0FDWixPQUFPLFlBNUN5QyxhQUFhLEFBNENwQyxJQUFJLE9BQU8sWUE1Q1AsU0FBUyxBQTRDWSxJQUFJLE9BQU8sWUE1Q0UsT0FBTyxBQTRDRyxFQUN6RSxRQUFRLEVBQUU7WUFDVixxQkFBbUIsV0EzQ3dDLGFBQWEsRUEyQ3ZDLFNBQVMsQ0FBQyxvQ0FDcEIsV0E1Q29DLGFBQWEsRUE0Q25DLE9BQU8sQ0FBQyxDQUFFO0tBQUEsQ0FBQyxDQUFBO0FBQ2pELHFCQUFpQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUM7QUFDRCxvQkFBaUIs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LFNBQVMsQ0FBQyxZQUFZLENBQUM7T0FDakMsZUFBZSxHQUFHLFNBQVMsV0Fwb0JuQixpQkFBaUIsRUFvb0JzQixJQUFJLENBQUM7T0FDcEQsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL2xleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2MsIHsgUG9zLCBTdGFydExpbmUsIFN0YXJ0UG9zLCBTdGFydENvbHVtbiwgc2luZ2xlQ2hhckxvYyB9IGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHsgY29kZSB9IGZyb20gJy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCB7IE51bWJlckxpdGVyYWwgfSBmcm9tICcuLi9Nc0FzdCdcbmltcG9ydCB7IE5vbk5hbWVDaGFyYWN0ZXJzIH0gZnJvbSAnLi9sYW5ndWFnZSdcbmltcG9ydCB7IERvdE5hbWUsIEdyb3VwLCBHX0Jsb2NrLCBHX0JyYWNrZXQsIEdfTGluZSwgR19QYXJlbnRoZXNpcywgR19TcGFjZSwgR19RdW90ZSxcblx0aXNLZXl3b3JkLCBLZXl3b3JkLCBLV19Bc3NpZ25NdXRhYmxlLCBLV19FbGxpcHNpcywgS1dfRm9jdXMsIEtXX0Z1biwgS1dfRnVuRG8sIEtXX0Z1bkdlbixcblx0S1dfRnVuR2VuRG8sIEtXX0Z1blRoaXMsIEtXX0Z1blRoaXNEbywgS1dfRnVuVGhpc0dlbiwgS1dfRnVuVGhpc0dlbkRvLCBLV19MYXp5LCBLV19Mb2NhbE11dGF0ZSxcblx0S1dfT2JqQXNzaWduLCBLV19SZWdpb24sIEtXX1R5cGUsIE5hbWUsIG9wS2V5d29yZEtpbmRGcm9tTmFtZSwgc2hvd0dyb3VwS2luZCB9IGZyb20gJy4vVG9rZW4nXG5pbXBvcnQgeyBhc3NlcnQsIGlzRW1wdHksIGxhc3QgfSBmcm9tICcuL3V0aWwnXG5cbi8qXG5UaGlzIHByb2R1Y2VzIHRoZSBUb2tlbiB0cmVlIChzZWUgVG9rZW4uanMpLlxuKi9cbmV4cG9ydCBkZWZhdWx0IChjb250ZXh0LCBzb3VyY2VTdHJpbmcpID0+IHtcblx0Ly8gTGV4aW5nIGFsZ29yaXRobSByZXF1aXJlcyB0cmFpbGluZyBuZXdsaW5lIHRvIGNsb3NlIGFueSBibG9ja3MuXG5cdC8vIFVzZSBhIG51bGwtdGVybWluYXRlZCBzdHJpbmcgYmVjYXVzZSBpdCdzIGZhc3RlciB0aGFuIGNoZWNraW5nIHdoZXRoZXIgaW5kZXggPT09IGxlbmd0aC5cblx0c291cmNlU3RyaW5nID0gc291cmNlU3RyaW5nICsgJ1xcblxcMCdcblxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBHUk9VUElOR1xuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBXZSBvbmx5IGV2ZXIgd3JpdGUgdG8gdGhlIGlubmVybW9zdCBHcm91cDtcblx0Ly8gd2hlbiB3ZSBjbG9zZSB0aGF0IEdyb3VwIHdlIGFkZCBpdCB0byB0aGUgZW5jbG9zaW5nIEdyb3VwIGFuZCBjb250aW51ZSB3aXRoIHRoYXQgb25lLlxuXHQvLyBOb3RlIHRoYXQgYGN1ckdyb3VwYCBpcyBjb25jZXB0dWFsbHkgdGhlIHRvcCBvZiB0aGUgc3RhY2ssIGJ1dCBpcyBub3Qgc3RvcmVkIGluIGBzdGFja2AuXG5cdGNvbnN0IGdyb3VwU3RhY2sgPSBbIF1cblx0bGV0IGN1ckdyb3VwXG5cdGNvbnN0XG5cdFx0YWRkVG9DdXJyZW50R3JvdXAgPSB0b2tlbiA9PlxuXHRcdFx0Y3VyR3JvdXAuc3ViVG9rZW5zLnB1c2godG9rZW4pLFxuXG5cdFx0Ly8gUGF1c2Ugd3JpdGluZyB0byBjdXJHcm91cCBpbiBmYXZvciBvZiB3cml0aW5nIHRvIGEgc3ViLWdyb3VwLlxuXHRcdC8vIFdoZW4gdGhlIHN1Yi1ncm91cCBmaW5pc2hlcyB3ZSB3aWxsIHBvcCB0aGUgc3RhY2sgYW5kIHJlc3VtZSB3cml0aW5nIHRvIGl0cyBwYXJlbnQuXG5cdFx0b3Blbkdyb3VwID0gKG9wZW5Qb3MsIGdyb3VwS2luZCkgPT4ge1xuXHRcdFx0Z3JvdXBTdGFjay5wdXNoKGN1ckdyb3VwKVxuXHRcdFx0Ly8gQ29udGVudHMgd2lsbCBiZSBhZGRlZCB0byBieSBgb2AuXG5cdFx0XHQvLyBjdXJHcm91cC5sb2MuZW5kIHdpbGwgYmUgd3JpdHRlbiB0byB3aGVuIGNsb3NpbmcgaXQuXG5cdFx0XHRjdXJHcm91cCA9IEdyb3VwKExvYyhvcGVuUG9zLCBudWxsKSwgWyBdLCBncm91cEtpbmQpXG5cdFx0fSxcblxuXHRcdC8vIEEgZ3JvdXAgZW5kaW5nIG1heSBjbG9zZSBtdXRsaXBsZSBncm91cHMuXG5cdFx0Ly8gRm9yIGV4YW1wbGUsIGluIGBsb2chICgrIDEgMWAsIHRoZSBHX0xpbmUgd2lsbCBhbHNvIGNsb3NlIGEgR19QYXJlbnRoZXNpcy5cblx0XHRjbG9zZUdyb3VwcyA9IChjbG9zZVBvcywgY2xvc2VLaW5kKSA9PiB7XG5cdFx0XHQvLyBjdXJHcm91cCBpcyBkaWZmZXJlbnQgZWFjaCB0aW1lIHdlIGdvIHRocm91Z2ggdGhlIGxvb3Bcblx0XHRcdC8vIGJlY2F1c2UgX2Nsb3NlU2luZ2xlR3JvdXAgYnJpbmdzIHVzIHRvIGFuIGVuY2xvc2luZyBncm91cC5cblx0XHRcdHdoaWxlIChjdXJHcm91cC5raW5kICE9PSBjbG9zZUtpbmQpIHtcblx0XHRcdFx0Y29uc3QgY3VyS2luZCA9IGN1ckdyb3VwLmtpbmRcblx0XHRcdFx0Ly8gQSBsaW5lIGNhbiBjbG9zZSBhIHBhcmVudGhlc2lzLCBidXQgYSBwYXJlbnRoZXNpcyBjYW4ndCBjbG9zZSBhIGxpbmUhXG5cdFx0XHRcdGNvbnRleHQuY2hlY2soXG5cdFx0XHRcdFx0Y3VyS2luZCA9PT0gR19QYXJlbnRoZXNpcyB8fCBjdXJLaW5kID09PSBHX0JyYWNrZXQgfHwgY3VyS2luZCA9PT0gR19TcGFjZSxcblx0XHRcdFx0XHRjbG9zZVBvcywgKCkgPT5cblx0XHRcdFx0XHRgVHJ5aW5nIHRvIGNsb3NlICR7c2hvd0dyb3VwS2luZChjbG9zZUtpbmQpfSwgYCArXG5cdFx0XHRcdFx0YGJ1dCBsYXN0IG9wZW5lZCB3YXMgJHtzaG93R3JvdXBLaW5kKGN1cktpbmQpfWApXG5cdFx0XHRcdF9jbG9zZVNpbmdsZUdyb3VwKGNsb3NlUG9zLCBjdXJHcm91cC5raW5kKVxuXHRcdFx0fVxuXHRcdFx0X2Nsb3NlU2luZ2xlR3JvdXAoY2xvc2VQb3MsIGNsb3NlS2luZClcblx0XHR9LFxuXG5cdFx0X2Nsb3NlU2luZ2xlR3JvdXAgPSAoY2xvc2VQb3MsIGNsb3NlS2luZCkgPT4ge1xuXHRcdFx0bGV0IGp1c3RDbG9zZWQgPSBjdXJHcm91cFxuXHRcdFx0Y3VyR3JvdXAgPSBncm91cFN0YWNrLnBvcCgpXG5cdFx0XHRqdXN0Q2xvc2VkLmxvYy5lbmQgPSBjbG9zZVBvc1xuXHRcdFx0c3dpdGNoIChjbG9zZUtpbmQpIHtcblx0XHRcdFx0Y2FzZSBHX1NwYWNlOiB7XG5cdFx0XHRcdFx0Y29uc3Qgc2l6ZSA9IGp1c3RDbG9zZWQuc3ViVG9rZW5zLmxlbmd0aFxuXHRcdFx0XHRcdGlmIChzaXplICE9PSAwKVxuXHRcdFx0XHRcdFx0Ly8gU3BhY2VkIHNob3VsZCBhbHdheXMgaGF2ZSBhdCBsZWFzdCB0d28gZWxlbWVudHMuXG5cdFx0XHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChzaXplID09PSAxID8ganVzdENsb3NlZC5zdWJUb2tlbnNbMF0gOiBqdXN0Q2xvc2VkKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBHX0xpbmU6XG5cdFx0XHRcdFx0Ly8gTGluZSBtdXN0IGhhdmUgY29udGVudC5cblx0XHRcdFx0XHQvLyBUaGlzIGNhbiBoYXBwZW4gaWYgdGhlcmUgd2FzIGp1c3QgYSBjb21tZW50LlxuXHRcdFx0XHRcdGlmICghaXNFbXB0eShqdXN0Q2xvc2VkLnN1YlRva2VucykpXG5cdFx0XHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChqdXN0Q2xvc2VkKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgR19CbG9jazpcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKCFpc0VtcHR5KGp1c3RDbG9zZWQuc3ViVG9rZW5zKSwgY2xvc2VQb3MsICdFbXB0eSBibG9jay4nKVxuXHRcdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKGp1c3RDbG9zZWQpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChqdXN0Q2xvc2VkKVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRvcGVuUGFyZW50aGVzaXMgPSBsb2MgPT4ge1xuXHRcdFx0b3Blbkdyb3VwKGxvYy5zdGFydCwgR19QYXJlbnRoZXNpcylcblx0XHRcdG9wZW5Hcm91cChsb2MuZW5kLCBHX1NwYWNlKVxuXHRcdH0sXG5cblx0XHRvcGVuQnJhY2tldCA9IGxvYyA9PiB7XG5cdFx0XHRvcGVuR3JvdXAobG9jLnN0YXJ0LCBHX0JyYWNrZXQpXG5cdFx0XHRvcGVuR3JvdXAobG9jLmVuZCwgR19TcGFjZSlcblx0XHR9LFxuXG5cdFx0Ly8gV2hlbiBzdGFydGluZyBhIG5ldyBsaW5lLCBhIHNwYWNlZCBncm91cCBpcyBjcmVhdGVkIGltcGxpY2l0bHkuXG5cdFx0b3BlbkxpbmUgPSBwb3MgPT4ge1xuXHRcdFx0b3Blbkdyb3VwKHBvcywgR19MaW5lKVxuXHRcdFx0b3Blbkdyb3VwKHBvcywgR19TcGFjZSlcblx0XHR9LFxuXG5cdFx0Y2xvc2VMaW5lID0gcG9zID0+IHtcblx0XHRcdGNsb3NlR3JvdXBzKHBvcywgR19TcGFjZSlcblx0XHRcdGNsb3NlR3JvdXBzKHBvcywgR19MaW5lKVxuXHRcdH0sXG5cblx0XHQvLyBXaGVuIGVuY291bnRlcmluZyBhIHNwYWNlLCBpdCBib3RoIGNsb3NlcyBhbmQgb3BlbnMgYSBzcGFjZWQgZ3JvdXAuXG5cdFx0c3BhY2UgPSBsb2MgPT4ge1xuXHRcdFx0Y2xvc2VHcm91cHMobG9jLnN0YXJ0LCBHX1NwYWNlKVxuXHRcdFx0b3Blbkdyb3VwKGxvYy5lbmQsIEdfU3BhY2UpXG5cdFx0fVxuXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIElURVJBVElORyBUSFJPVUdIIFNPVVJDRVNUUklOR1xuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvKlxuXHRUaGVzZSBhcmUga2VwdCB1cC10by1kYXRlIGFzIHdlIGl0ZXJhdGUgdGhyb3VnaCBzb3VyY2VTdHJpbmcuXG5cdEV2ZXJ5IGFjY2VzcyB0byBpbmRleCBoYXMgY29ycmVzcG9uZGluZyBjaGFuZ2VzIHRvIGxpbmUgYW5kL29yIGNvbHVtbi5cblx0VGhpcyBhbHNvIGV4cGxhaW5zIHdoeSB0aGVyZSBhcmUgZGlmZmVyZW50IGZ1bmN0aW9ucyBmb3IgbmV3bGluZXMgdnMgb3RoZXIgY2hhcmFjdGVycy5cblx0Ki9cblx0bGV0IGluZGV4ID0gMCwgbGluZSA9IFN0YXJ0TGluZSwgY29sdW1uID0gU3RhcnRDb2x1bW5cblxuXHQvKlxuXHROT1RFOiBXZSB1c2UgY2hhcmFjdGVyICpjb2RlcyogZm9yIGV2ZXJ5dGhpbmcuXG5cdENoYXJhY3RlcnMgYXJlIG9mIHR5cGUgTnVtYmVyIGFuZCBub3QganVzdCBTdHJpbmdzIG9mIGxlbmd0aCBvbmUuXG5cdCovXG5cdGNvbnN0XG5cdFx0cG9zID0gKCkgPT4gUG9zKGxpbmUsIGNvbHVtbiksXG5cblx0XHRwZWVrID0gKCkgPT4gc291cmNlU3RyaW5nLmNoYXJDb2RlQXQoaW5kZXgpLFxuXHRcdHBlZWtOZXh0ID0gKCkgPT4gc291cmNlU3RyaW5nLmNoYXJDb2RlQXQoaW5kZXggKyAxKSxcblxuXHRcdC8vIE1heSBlYXQgYSBOZXdsaW5lLlxuXHRcdC8vIElmIHRoYXQgaGFwcGVucywgbGluZSBhbmQgY29sdW1uIHdpbGwgdGVtcG9yYXJpbHkgYmUgd3JvbmcsXG5cdFx0Ly8gYnV0IHdlIGhhbmRsZSBpdCBpbiB0aGF0IHNwZWNpYWwgY2FzZSAocmF0aGVyIHRoYW4gY2hlY2tpbmcgZm9yIE5ld2xpbmUgZXZlcnkgdGltZSkuXG5cdFx0ZWF0ID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgY2hhciA9IHNvdXJjZVN0cmluZy5jaGFyQ29kZUF0KGluZGV4KVxuXHRcdFx0aW5kZXggPSBpbmRleCArIDFcblx0XHRcdGNvbHVtbiA9IGNvbHVtbiArIDFcblx0XHRcdHJldHVybiBjaGFyXG5cdFx0fSxcblx0XHRza2lwID0gZWF0LFxuXG5cdFx0Ly8gY2hhclRvRWF0IG11c3Qgbm90IGJlIE5ld2xpbmUuXG5cdFx0dHJ5RWF0ID0gY2hhclRvRWF0ID0+IHtcblx0XHRcdGNvbnN0IGNhbkVhdCA9IHBlZWsoKSA9PT0gY2hhclRvRWF0XG5cdFx0XHRpZiAoY2FuRWF0KSB7XG5cdFx0XHRcdGluZGV4ID0gaW5kZXggKyAxXG5cdFx0XHRcdGNvbHVtbiA9IGNvbHVtbiArIDFcblx0XHRcdH1cblx0XHRcdHJldHVybiBjYW5FYXRcblx0XHR9LFxuXG5cdFx0bXVzdEVhdCA9IChjaGFyVG9FYXQsIHByZWNlZGVkQnkpID0+IHtcblx0XHRcdGNvbnN0IGNhbkVhdCA9IHRyeUVhdChjaGFyVG9FYXQpXG5cdFx0XHRjb250ZXh0LmNoZWNrKGNhbkVhdCwgcG9zLCAoKSA9PlxuXHRcdFx0XHRgJHtjb2RlKHByZWNlZGVkQnkpfSBtdXN0IGJlIGZvbGxvd2VkIGJ5ICR7c2hvd0NoYXIoY2hhclRvRWF0KX1gKVxuXHRcdH0sXG5cblx0XHR0cnlFYXROZXdsaW5lID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgY2FuRWF0ID0gcGVlaygpID09PSBOZXdsaW5lXG5cdFx0XHRpZiAoY2FuRWF0KSB7XG5cdFx0XHRcdGluZGV4ID0gaW5kZXggKyAxXG5cdFx0XHRcdGxpbmUgPSBsaW5lICsgMVxuXHRcdFx0XHRjb2x1bW4gPSBTdGFydENvbHVtblxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNhbkVhdFxuXHRcdH0sXG5cblx0XHQvLyBDYWxsZXIgbXVzdCBlbnN1cmUgdGhhdCBiYWNraW5nIHVwIG5DaGFyc1RvQmFja1VwIGNoYXJhY3RlcnMgYnJpbmdzIHVzIHRvIG9sZFBvcy5cblx0XHRzdGVwQmFja01hbnkgPSAob2xkUG9zLCBuQ2hhcnNUb0JhY2tVcCkgPT4ge1xuXHRcdFx0aW5kZXggPSBpbmRleCAtIG5DaGFyc1RvQmFja1VwXG5cdFx0XHRsaW5lID0gb2xkUG9zLmxpbmVcblx0XHRcdGNvbHVtbiA9IG9sZFBvcy5jb2x1bW5cblx0XHR9LFxuXG5cdFx0Ly8gRm9yIHRha2VXaGlsZSwgdGFrZVdoaWxlV2l0aFByZXYsIGFuZCBza2lwV2hpbGVFcXVhbHMsXG5cdFx0Ly8gY2hhcmFjdGVyUHJlZGljYXRlIG11c3QgKm5vdCogYWNjZXB0IE5ld2xpbmUuXG5cdFx0Ly8gT3RoZXJ3aXNlIHRoZXJlIG1heSBiZSBhbiBpbmZpbml0ZSBsb29wIVxuXHRcdHRha2VXaGlsZSA9IGNoYXJhY3RlclByZWRpY2F0ZSA9PiB7XG5cdFx0XHRjb25zdCBzdGFydEluZGV4ID0gaW5kZXhcblx0XHRcdF9za2lwV2hpbGUoY2hhcmFjdGVyUHJlZGljYXRlKVxuXHRcdFx0cmV0dXJuIHNvdXJjZVN0cmluZy5zbGljZShzdGFydEluZGV4LCBpbmRleClcblx0XHR9LFxuXG5cdFx0dGFrZVdoaWxlV2l0aFByZXYgPSBjaGFyYWN0ZXJQcmVkaWNhdGUgPT4ge1xuXHRcdFx0Y29uc3Qgc3RhcnRJbmRleCA9IGluZGV4XG5cdFx0XHRfc2tpcFdoaWxlKGNoYXJhY3RlclByZWRpY2F0ZSlcblx0XHRcdHJldHVybiBzb3VyY2VTdHJpbmcuc2xpY2Uoc3RhcnRJbmRleCAtIDEsIGluZGV4KVxuXHRcdH0sXG5cblx0XHRza2lwV2hpbGVFcXVhbHMgPSBjaGFyID0+XG5cdFx0XHRfc2tpcFdoaWxlKF8gPT4gXyA9PT0gY2hhciksXG5cblx0XHRza2lwUmVzdE9mTGluZSA9ICgpID0+XG5cdFx0XHRfc2tpcFdoaWxlKF8gPT4gXyAhPT0gTmV3bGluZSksXG5cblx0XHRfc2tpcFdoaWxlID0gY2hhcmFjdGVyUHJlZGljYXRlID0+IHtcblx0XHRcdGNvbnN0IHN0YXJ0SW5kZXggPSBpbmRleFxuXHRcdFx0d2hpbGUgKGNoYXJhY3RlclByZWRpY2F0ZShwZWVrKCkpKVxuXHRcdFx0XHRpbmRleCA9IGluZGV4ICsgMVxuXHRcdFx0Y29uc3QgZGlmZiA9IGluZGV4IC0gc3RhcnRJbmRleFxuXHRcdFx0Y29sdW1uID0gY29sdW1uICsgZGlmZlxuXHRcdFx0cmV0dXJuIGRpZmZcblx0XHR9LFxuXG5cdFx0Ly8gQ2FsbGVkIGFmdGVyIHNlZWluZyB0aGUgZmlyc3QgbmV3bGluZS5cblx0XHQvLyBSZXR1cm5zICMgdG90YWwgbmV3bGluZXMsIGluY2x1ZGluZyB0aGUgZmlyc3QuXG5cdFx0c2tpcE5ld2xpbmVzID0gKCkgPT4ge1xuXHRcdFx0Y29uc3Qgc3RhcnRMaW5lID0gbGluZVxuXHRcdFx0bGluZSA9IGxpbmUgKyAxXG5cdFx0XHR3aGlsZSAocGVlaygpID09PSBOZXdsaW5lKSB7XG5cdFx0XHRcdGluZGV4ID0gaW5kZXggKyAxXG5cdFx0XHRcdGxpbmUgPSBsaW5lICsgMVxuXHRcdFx0fVxuXHRcdFx0Y29sdW1uID0gU3RhcnRDb2x1bW5cblx0XHRcdHJldHVybiBsaW5lIC0gc3RhcnRMaW5lXG5cdFx0fVxuXG5cdC8vIFNwcmlua2xlIGNoZWNrUG9zKCkgYXJvdW5kIHRvIGRlYnVnIGxpbmUgYW5kIGNvbHVtbiB0cmFja2luZyBlcnJvcnMuXG5cdC8qXG5cdGNvbnN0XG5cdFx0Y2hlY2tQb3MgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBwID0gX2dldENvcnJlY3RQb3MoKVxuXHRcdFx0aWYgKHAubGluZSAhPT0gbGluZSB8fCBwLmNvbHVtbiAhPT0gY29sdW1uKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYGluZGV4OiAke2luZGV4fSwgd3Jvbmc6ICR7UG9zKGxpbmUsIGNvbHVtbil9LCByaWdodDogJHtwfWApXG5cdFx0fSxcblx0XHRfaW5kZXhUb1BvcyA9IG5ldyBNYXAoKSxcblx0XHRfZ2V0Q29ycmVjdFBvcyA9ICgpID0+IHtcblx0XHRcdGlmIChpbmRleCA9PT0gMClcblx0XHRcdFx0cmV0dXJuIFBvcyhTdGFydExpbmUsIFN0YXJ0Q29sdW1uKVxuXG5cdFx0XHRsZXQgb2xkUG9zLCBvbGRJbmRleFxuXHRcdFx0Zm9yIChvbGRJbmRleCA9IGluZGV4IC0gMTsgOyBvbGRJbmRleCA9IG9sZEluZGV4IC0gMSkge1xuXHRcdFx0XHRvbGRQb3MgPSBfaW5kZXhUb1Bvcy5nZXQob2xkSW5kZXgpXG5cdFx0XHRcdGlmIChvbGRQb3MgIT09IHVuZGVmaW5lZClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRhc3NlcnQob2xkSW5kZXggPj0gMClcblx0XHRcdH1cblx0XHRcdGxldCBuZXdMaW5lID0gb2xkUG9zLmxpbmUsIG5ld0NvbHVtbiA9IG9sZFBvcy5jb2x1bW5cblx0XHRcdGZvciAoOyBvbGRJbmRleCA8IGluZGV4OyBvbGRJbmRleCA9IG9sZEluZGV4ICsgMSlcblx0XHRcdFx0aWYgKHNvdXJjZVN0cmluZy5jaGFyQ29kZUF0KG9sZEluZGV4KSA9PT0gTmV3bGluZSkge1xuXHRcdFx0XHRcdG5ld0xpbmUgPSBuZXdMaW5lICsgMVxuXHRcdFx0XHRcdG5ld0NvbHVtbiA9IFN0YXJ0Q29sdW1uXG5cdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdG5ld0NvbHVtbiA9IG5ld0NvbHVtbiArIDFcblxuXHRcdFx0Y29uc3QgcCA9IFBvcyhuZXdMaW5lLCBuZXdDb2x1bW4pXG5cdFx0XHRfaW5kZXhUb1Bvcy5zZXQoaW5kZXgsIHApXG5cdFx0XHRyZXR1cm4gcFxuXHRcdH1cblx0Ki9cblxuXHQvKlxuXHRJbiB0aGUgY2FzZSBvZiBxdW90ZSBpbnRlcnBvbGF0aW9uIChcImF7Yn1jXCIpIHdlJ2xsIHJlY3Vyc2UgYmFjayBpbnRvIGhlcmUuXG5cdFdoZW4gaXNJblF1b3RlIGlzIHRydWUsIHdlIHdpbGwgbm90IGFsbG93IG5ld2xpbmVzLlxuXHQqL1xuXHRjb25zdCBsZXhQbGFpbiA9IGlzSW5RdW90ZSA9PiB7XG5cdFx0Ly8gVGhpcyB0ZWxscyB1cyB3aGljaCBpbmRlbnRlZCBibG9jayB3ZSdyZSBpbi5cblx0XHQvLyBJbmNyZW1lbnRpbmcgaXQgbWVhbnMgaXNzdWluZyBhIEdQX09wZW5CbG9jayBhbmQgZGVjcmVtZW50aW5nIGl0IG1lYW5zIGEgR1BfQ2xvc2VCbG9jay5cblx0XHQvLyBEb2VzIG5vdGhpbmcgaWYgaXNJblF1b3RlLlxuXHRcdGxldCBpbmRlbnQgPSAwXG5cblx0XHQvLyBNYWtlIGNsb3N1cmVzIG5vdyByYXRoZXIgdGhhbiBpbnNpZGUgdGhlIGxvb3AuXG5cdFx0Ly8gVGhpcyBpcyBzaWduaWZpY2FudGx5IGZhc3RlciBhcyBvZiBub2RlIHYwLjExLjE0LlxuXG5cdFx0Ly8gVGhpcyBpcyB3aGVyZSB3ZSBzdGFydGVkIGxleGluZyB0aGUgY3VycmVudCB0b2tlbi5cblx0XHRsZXQgc3RhcnRDb2x1bW5cblx0XHRjb25zdFxuXHRcdFx0c3RhcnRQb3MgPSAoKSA9PiBQb3MobGluZSwgc3RhcnRDb2x1bW4pLFxuXHRcdFx0bG9jID0gKCkgPT4gTG9jKHN0YXJ0UG9zKCksIHBvcygpKSxcblx0XHRcdGtleXdvcmQgPSBraW5kID0+XG5cdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKEtleXdvcmQobG9jKCksIGtpbmQpKSxcblx0XHRcdGZ1bktleXdvcmQgPSBraW5kID0+IHtcblx0XHRcdFx0a2V5d29yZChraW5kKVxuXHRcdFx0XHRzcGFjZShsb2MoKSlcblx0XHRcdH0sXG5cdFx0XHRlYXRBbmRBZGROdW1iZXIgPSAoKSA9PiB7XG5cdFx0XHRcdC8vIFRPRE86IEEgcmVhbCBudW1iZXIgbGl0ZXJhbCBsZXhlciwgbm90IGp1c3QgSmF2YVNjcmlwdCdzLi4uXG5cdFx0XHRcdGNvbnN0IG51bWJlclN0cmluZyA9IHRha2VXaGlsZVdpdGhQcmV2KGlzTnVtYmVyQ2hhcmFjdGVyKVxuXHRcdFx0XHRjb25zdCBudW1iZXIgPSBOdW1iZXIobnVtYmVyU3RyaW5nKVxuXHRcdFx0XHRjb250ZXh0LmNoZWNrKCFOdW1iZXIuaXNOYU4obnVtYmVyKSwgcG9zLCAoKSA9PlxuXHRcdFx0XHRcdGBJbnZhbGlkIG51bWJlciBsaXRlcmFsICR7Y29kZShudW1iZXJTdHJpbmcpfWApXG5cdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKE51bWJlckxpdGVyYWwobG9jKCksIG51bWJlcikpXG5cdFx0XHR9XG5cblx0XHRjb25zdCBoYW5kbGVOYW1lID0gKCkgPT4ge1xuXHRcdFx0Ly8gQWxsIG90aGVyIGNoYXJhY3RlcnMgc2hvdWxkIGJlIGhhbmRsZWQgaW4gYSBjYXNlIGFib3ZlLlxuXHRcdFx0Y29uc3QgbmFtZSA9IHRha2VXaGlsZVdpdGhQcmV2KGlzTmFtZUNoYXJhY3Rlcilcblx0XHRcdGNvbnN0IGtleXdvcmRLaW5kID0gb3BLZXl3b3JkS2luZEZyb21OYW1lKG5hbWUpXG5cdFx0XHRpZiAoa2V5d29yZEtpbmQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250ZXh0LmNoZWNrKGtleXdvcmRLaW5kICE9PSAtMSwgcG9zLCAoKSA9PlxuXHRcdFx0XHRcdGBSZXNlcnZlZCBuYW1lICR7Y29kZShuYW1lKX1gKVxuXHRcdFx0XHRpZiAoa2V5d29yZEtpbmQgPT09IEtXX1JlZ2lvbilcblx0XHRcdFx0XHQvLyBUT0RPOiBFYXQgYW5kIHB1dCBpdCBpbiBSZWdpb24gZXhwcmVzc2lvblxuXHRcdFx0XHRcdHNraXBSZXN0T2ZMaW5lKClcblx0XHRcdFx0a2V5d29yZChrZXl3b3JkS2luZClcblx0XHRcdH0gZWxzZVxuXHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChOYW1lKGxvYygpLCBuYW1lKSlcblx0XHR9XG5cblx0XHR3aGlsZSAodHJ1ZSkge1xuXHRcdFx0c3RhcnRDb2x1bW4gPSBjb2x1bW5cblx0XHRcdGNvbnN0IGNoYXJhY3RlckVhdGVuID0gZWF0KClcblx0XHRcdC8vIEdlbmVyYWxseSwgdGhlIHR5cGUgb2YgYSB0b2tlbiBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBmaXJzdCBjaGFyYWN0ZXIuXG5cdFx0XHRzd2l0Y2ggKGNoYXJhY3RlckVhdGVuKSB7XG5cdFx0XHRcdGNhc2UgWmVybzpcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0Y2FzZSBDbG9zZUJyYWNlOlxuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soaXNJblF1b3RlLCBsb2MsICgpID0+XG5cdFx0XHRcdFx0XHRgUmVzZXJ2ZWQgY2hhcmFjdGVyICR7c2hvd0NoYXIoQ2xvc2VCcmFjZSl9YClcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0Y2FzZSBRdW90ZTpcblx0XHRcdFx0XHRsZXhRdW90ZShpbmRlbnQpXG5cdFx0XHRcdFx0YnJlYWtcblxuXHRcdFx0XHQvLyBHUk9VUFNcblxuXHRcdFx0XHRjYXNlIE9wZW5QYXJlbnRoZXNpczpcblx0XHRcdFx0XHRvcGVuUGFyZW50aGVzaXMobG9jKCkpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBPcGVuQnJhY2tldDpcblx0XHRcdFx0XHRvcGVuQnJhY2tldChsb2MoKSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIENsb3NlUGFyZW50aGVzaXM6XG5cdFx0XHRcdFx0Y2xvc2VHcm91cHMocG9zKCksIEdfUGFyZW50aGVzaXMpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBDbG9zZUJyYWNrZXQ6XG5cdFx0XHRcdFx0Y2xvc2VHcm91cHMocG9zKCksIEdfQnJhY2tldClcblx0XHRcdFx0XHRicmVha1xuXG5cdFx0XHRcdGNhc2UgU3BhY2U6IHtcblx0XHRcdFx0XHRjb25zdCBuZXh0ID0gcGVlaygpXG5cdFx0XHRcdFx0Y29udGV4dC53YXJuSWYobmV4dCA9PT0gU3BhY2UsIGxvYywgJ011bHRpcGxlIHNwYWNlcyBpbiBhIHJvdy4nKVxuXHRcdFx0XHRcdGNvbnRleHQud2FybklmKG5leHQgPT09IE5ld2xpbmUsIGxvYywgJ0xpbmUgZW5kcyBpbiBhIHNwYWNlLicpXG5cdFx0XHRcdFx0c3BhY2UobG9jKCkpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNhc2UgTmV3bGluZToge1xuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soIWlzSW5RdW90ZSwgbG9jLCAnUXVvdGUgaW50ZXJwb2xhdGlvbiBjYW5ub3QgY29udGFpbiBuZXdsaW5lJylcblxuXHRcdFx0XHRcdC8vIFNraXAgYW55IGJsYW5rIGxpbmVzLlxuXHRcdFx0XHRcdHNraXBOZXdsaW5lcygpXG5cdFx0XHRcdFx0Y29uc3Qgb2xkSW5kZW50ID0gaW5kZW50XG5cdFx0XHRcdFx0aW5kZW50ID0gc2tpcFdoaWxlRXF1YWxzKFRhYilcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKHBlZWsoKSAhPT0gU3BhY2UsIHBvcywgJ0xpbmUgYmVnaW5zIGluIGEgc3BhY2UnKVxuXHRcdFx0XHRcdGlmIChpbmRlbnQgPD0gb2xkSW5kZW50KSB7XG5cdFx0XHRcdFx0XHRjb25zdCBsID0gbG9jKClcblx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSBpbmRlbnQ7IGkgPCBvbGRJbmRlbnQ7IGkgPSBpICsgMSkge1xuXHRcdFx0XHRcdFx0XHRjbG9zZUxpbmUobC5zdGFydClcblx0XHRcdFx0XHRcdFx0Y2xvc2VHcm91cHMobC5lbmQsIEdfQmxvY2spXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjbG9zZUxpbmUobC5zdGFydClcblx0XHRcdFx0XHRcdG9wZW5MaW5lKGwuZW5kKVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKGluZGVudCA9PT0gb2xkSW5kZW50ICsgMSwgbG9jLFxuXHRcdFx0XHRcdFx0XHQnTGluZSBpcyBpbmRlbnRlZCBtb3JlIHRoYW4gb25jZScpXG5cdFx0XHRcdFx0XHQvLyBCbG9jayBhdCBlbmQgb2YgbGluZSBnb2VzIGluIGl0cyBvd24gc3BhY2VkIGdyb3VwLlxuXHRcdFx0XHRcdFx0Ly8gSG93ZXZlciwgYH5gIHByZWNlZGluZyBhIGJsb2NrIGdvZXMgaW4gYSBncm91cCB3aXRoIGl0LlxuXHRcdFx0XHRcdFx0aWYgKGlzRW1wdHkoY3VyR3JvdXAuc3ViVG9rZW5zKSB8fFxuXHRcdFx0XHRcdFx0XHQhaXNLZXl3b3JkKEtXX0xhenksIGxhc3QoY3VyR3JvdXAuc3ViVG9rZW5zKSkpXG5cdFx0XHRcdFx0XHRcdHNwYWNlKGxvYygpKVxuXHRcdFx0XHRcdFx0b3Blbkdyb3VwKGxvYygpLnN0YXJ0LCBHX0Jsb2NrKVxuXHRcdFx0XHRcdFx0b3BlbkxpbmUobG9jKCkuZW5kKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgVGFiOlxuXHRcdFx0XHRcdC8vIFdlIGFsd2F5cyBlYXQgdGFicyBpbiB0aGUgTmV3bGluZSBoYW5kbGVyLFxuXHRcdFx0XHRcdC8vIHNvIHRoaXMgd2lsbCBvbmx5IGhhcHBlbiBpbiB0aGUgbWlkZGxlIG9mIGEgbGluZS5cblx0XHRcdFx0XHRjb250ZXh0LmZhaWwobG9jKCksICdUYWIgbWF5IG9ubHkgYmUgdXNlZCB0byBpbmRlbnQnKVxuXG5cdFx0XHRcdC8vIEZVTlxuXG5cdFx0XHRcdGNhc2UgQmFuZzpcblx0XHRcdFx0XHRpZiAodHJ5RWF0KEJhcikpXG5cdFx0XHRcdFx0XHRmdW5LZXl3b3JkKEtXX0Z1bkRvKVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGhhbmRsZU5hbWUoKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgVGlsZGU6XG5cdFx0XHRcdFx0aWYgKHRyeUVhdChCYW5nKSkge1xuXHRcdFx0XHRcdFx0bXVzdEVhdChCYXIsICd+IScpXG5cdFx0XHRcdFx0XHRmdW5LZXl3b3JkKEtXX0Z1bkdlbkRvKVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHJ5RWF0KEJhcikpXG5cdFx0XHRcdFx0XHRmdW5LZXl3b3JkKEtXX0Z1bkdlbilcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX0xhenkpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBCYXI6XG5cdFx0XHRcdFx0a2V5d29yZChLV19GdW4pXG5cdFx0XHRcdFx0Ly8gRmlyc3QgYXJnIGluIGl0cyBvd24gc3BhY2VkIGdyb3VwXG5cdFx0XHRcdFx0c3BhY2UobG9jKCkpXG5cdFx0XHRcdFx0YnJlYWtcblxuXHRcdFx0XHQvLyBOVU1CRVJcblxuXHRcdFx0XHRjYXNlIEh5cGhlbjpcblx0XHRcdFx0XHRpZiAoaXNEaWdpdChwZWVrKCkpKVxuXHRcdFx0XHRcdFx0Ly8gZWF0TnVtYmVyKCkgbG9va3MgYXQgcHJldiBjaGFyYWN0ZXIsIHNvIGh5cGhlbiBpbmNsdWRlZC5cblx0XHRcdFx0XHRcdGVhdEFuZEFkZE51bWJlcigpXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0aGFuZGxlTmFtZSgpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBOMDogY2FzZSBOMTogY2FzZSBOMjogY2FzZSBOMzogY2FzZSBONDpcblx0XHRcdFx0Y2FzZSBONTogY2FzZSBONjogY2FzZSBONzogY2FzZSBOODogY2FzZSBOOTpcblx0XHRcdFx0XHRlYXRBbmRBZGROdW1iZXIoKVxuXHRcdFx0XHRcdGJyZWFrXG5cblxuXHRcdFx0XHQvLyBPVEhFUlxuXG5cdFx0XHRcdGNhc2UgSGFzaDpcblx0XHRcdFx0XHRpZiAodHJ5RWF0KEhhc2gpKSB7XG5cdFx0XHRcdFx0XHQvLyBNdWx0aS1saW5lIGNvbW1lbnRcblx0XHRcdFx0XHRcdG11c3RFYXQoSGFzaCwgJyMjJylcblx0XHRcdFx0XHRcdHdoaWxlICh0cnVlKVxuXHRcdFx0XHRcdFx0XHRpZiAoZWF0KCkgPT09IEhhc2ggJiYgZWF0KCkgPT09IEhhc2ggJiYgZWF0KCkgPT09IEhhc2gpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBubCA9IHRyeUVhdChOZXdsaW5lKVxuXHRcdFx0XHRcdFx0XHRcdGNvbnRleHQuY2hlY2sobmwsIGxvYywgKCkgPT5cblx0XHRcdFx0XHRcdFx0XHRcdGAjQ2xvc2luZyB7Y29kZSgnIyMjJyl9IG11c3QgYmUgZm9sbG93ZWQgYnkgbmV3bGluZS5gKVxuXHRcdFx0XHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gU2luZ2xlLWxpbmUgY29tbWVudFxuXHRcdFx0XHRcdFx0aWYgKCEodHJ5RWF0KFNwYWNlKSB8fCB0cnlFYXQoVGFiKSkpXG5cdFx0XHRcdFx0XHRcdGNvbnRleHQuZmFpbChsb2MsICgpID0+XG5cdFx0XHRcdFx0XHRcdFx0YCR7Y29kZSgnIycpfSBtdXN0IGJlIGZvbGxvd2VkIGJ5IHNwYWNlIG9yIHRhYi5gKVxuXHRcdFx0XHRcdFx0c2tpcFJlc3RPZkxpbmUoKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVha1xuXG5cdFx0XHRcdGNhc2UgRG90OiB7XG5cdFx0XHRcdFx0Y29uc3QgbmV4dCA9IHBlZWsoKVxuXHRcdFx0XHRcdGlmIChuZXh0ID09PSBTcGFjZSB8fCBuZXh0ID09PSBOZXdsaW5lKSB7XG5cdFx0XHRcdFx0XHQvLyBPYmpMaXQgYXNzaWduIGluIGl0cyBvd24gc3BhY2VkIGdyb3VwLlxuXHRcdFx0XHRcdFx0Ly8gV2UgY2FuJ3QganVzdCBjcmVhdGUgYSBuZXcgR3JvdXAgaGVyZSBiZWNhdXNlIHdlIHdhbnQgdG9cblx0XHRcdFx0XHRcdC8vIGVuc3VyZSBpdCdzIG5vdCBwYXJ0IG9mIHRoZSBwcmVjZWRpbmcgb3IgZm9sbG93aW5nIHNwYWNlZCBncm91cC5cblx0XHRcdFx0XHRcdGNsb3NlR3JvdXBzKHN0YXJ0UG9zKCksIEdfU3BhY2UpXG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX09iakFzc2lnbilcblx0XHRcdFx0XHRcdC8vIFRoaXMgZXhpc3RzIHNvbGVseSBzbyB0aGF0IHRoZSBTcGFjZSBvciBOZXdsaW5lIGhhbmRsZXIgY2FuIGNsb3NlIGl0Li4uXG5cdFx0XHRcdFx0XHRvcGVuR3JvdXAocG9zKCksIEdfU3BhY2UpXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChuZXh0ID09PSBCYXIpIHtcblx0XHRcdFx0XHRcdHNraXAoKVxuXHRcdFx0XHRcdFx0a2V5d29yZChLV19GdW5UaGlzKVxuXHRcdFx0XHRcdFx0c3BhY2UobG9jKCkpXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChuZXh0ID09PSBCYW5nICYmIHBlZWtOZXh0KCkgPT09IEJhcikge1xuXHRcdFx0XHRcdFx0c2tpcCgpXG5cdFx0XHRcdFx0XHRza2lwKClcblx0XHRcdFx0XHRcdGtleXdvcmQoS1dfRnVuVGhpc0RvKVxuXHRcdFx0XHRcdFx0c3BhY2UobG9jKCkpXG5cdFx0XHRcdFx0fSBlbHNlIGlmIChuZXh0ID09PSBUaWxkZSkge1xuXHRcdFx0XHRcdFx0c2tpcCgpXG5cdFx0XHRcdFx0XHRpZiAodHJ5RWF0KEJhbmcpKSB7XG5cdFx0XHRcdFx0XHRcdG11c3RFYXQoQmFyLCAnLn4hJylcblx0XHRcdFx0XHRcdFx0a2V5d29yZChLV19GdW5UaGlzR2VuRG8pXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRtdXN0RWF0KEJhciwgJy5+Jylcblx0XHRcdFx0XHRcdFx0a2V5d29yZChLV19GdW5UaGlzR2VuKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0c3BhY2UobG9jKCkpXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vICsxIGZvciB0aGUgZG90IHdlIGp1c3QgYXRlLlxuXHRcdFx0XHRcdFx0Y29uc3QgbkRvdHMgPSBza2lwV2hpbGVFcXVhbHMoRG90KSArIDFcblx0XHRcdFx0XHRcdGNvbnN0IG5leHQgPSBwZWVrKClcblx0XHRcdFx0XHRcdGlmIChuRG90cyA9PT0gMyAmJiBuZXh0ID09PSBTcGFjZSB8fCBuZXh0ID09PSBOZXdsaW5lKVxuXHRcdFx0XHRcdFx0XHRrZXl3b3JkKEtXX0VsbGlwc2lzKVxuXHRcdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChEb3ROYW1lKGxvYygpLCBuRG90cywgdGFrZVdoaWxlKGlzTmFtZUNoYXJhY3RlcikpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y2FzZSBDb2xvbjpcblx0XHRcdFx0XHRpZiAodHJ5RWF0KENvbG9uKSkge1xuXHRcdFx0XHRcdFx0bXVzdEVhdChFcXVhbCwgJzo6Jylcblx0XHRcdFx0XHRcdGtleXdvcmQoS1dfQXNzaWduTXV0YWJsZSlcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRyeUVhdChFcXVhbCkpXG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX0xvY2FsTXV0YXRlKVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGtleXdvcmQoS1dfVHlwZSlcblx0XHRcdFx0XHRicmVha1xuXG5cdFx0XHRcdGNhc2UgVW5kZXJzY29yZTpcblx0XHRcdFx0XHRrZXl3b3JkKEtXX0ZvY3VzKVxuXHRcdFx0XHRcdGJyZWFrXG5cblx0XHRcdFx0Y2FzZSBBbXBlcnNhbmQ6IGNhc2UgQmFja3NsYXNoOiBjYXNlIEJhY2t0aWNrOiBjYXNlIENhcmV0OlxuXHRcdFx0XHRjYXNlIENvbW1hOiBjYXNlIFBlcmNlbnQ6IGNhc2UgU2VtaWNvbG9uOlxuXHRcdFx0XHRcdGNvbnRleHQuZmFpbChsb2MsIGBSZXNlcnZlZCBjaGFyYWN0ZXIgJHtzaG93Q2hhcihjaGFyYWN0ZXJFYXRlbil9YClcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRoYW5kbGVOYW1lKClcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjb25zdCBsZXhRdW90ZSA9IGluZGVudCA9PiB7XG5cdFx0Y29uc3QgcXVvdGVJbmRlbnQgPSBpbmRlbnQgKyAxXG5cblx0XHQvLyBJbmRlbnRlZCBxdW90ZSBpcyBjaGFyYWN0ZXJpemVkIGJ5IGJlaW5nIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IGEgbmV3bGluZS5cblx0XHQvLyBUaGUgbmV4dCBsaW5lICptdXN0KiBoYXZlIHNvbWUgY29udGVudCBhdCB0aGUgbmV4dCBpbmRlbnRhdGlvbi5cblx0XHRjb25zdCBpc0luZGVudGVkID0gdHJ5RWF0TmV3bGluZSgpXG5cdFx0aWYgKGlzSW5kZW50ZWQpIHtcblx0XHRcdGNvbnN0IGFjdHVhbEluZGVudCA9IHNraXBXaGlsZUVxdWFscyhUYWIpXG5cdFx0XHRjb250ZXh0LmNoZWNrKGFjdHVhbEluZGVudCA9PT0gcXVvdGVJbmRlbnQsIHBvcyxcblx0XHRcdFx0J0luZGVudGVkIHF1b3RlIG11c3QgaGF2ZSBleGFjdGx5IG9uZSBtb3JlIGluZGVudCB0aGFuIHByZXZpb3VzIGxpbmUuJylcblx0XHR9XG5cblx0XHQvLyBDdXJyZW50IHN0cmluZyBsaXRlcmFsIHBhcnQgb2YgcXVvdGUgd2UgYXJlIHJlYWRpbmcuXG5cdFx0bGV0IHJlYWQgPSAnJ1xuXG5cdFx0Y29uc3QgbWF5YmVPdXRwdXRSZWFkID0gKCkgPT4ge1xuXHRcdFx0aWYgKHJlYWQgIT09ICcnKSB7XG5cdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKHJlYWQpXG5cdFx0XHRcdHJlYWQgPSAnJ1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IGxvY1NpbmdsZSA9ICgpID0+IHNpbmdsZUNoYXJMb2MocG9zKCkpXG5cblx0XHRvcGVuR3JvdXAobG9jU2luZ2xlKCkuc3RhcnQsIEdfUXVvdGUpXG5cblx0XHRlYXRDaGFyczogd2hpbGUgKHRydWUpIHtcblx0XHRcdGNvbnN0IGNoYXIgPSBlYXQoKVxuXHRcdFx0c3dpdGNoIChjaGFyKSB7XG5cdFx0XHRcdGNhc2UgQmFja3NsYXNoOiB7XG5cdFx0XHRcdFx0cmVhZCA9IHJlYWQgKyBxdW90ZUVzY2FwZShlYXQoKSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgT3BlbkJyYWNlOiB7XG5cdFx0XHRcdFx0bWF5YmVPdXRwdXRSZWFkKClcblx0XHRcdFx0XHRjb25zdCBsID0gbG9jU2luZ2xlKClcblx0XHRcdFx0XHRvcGVuUGFyZW50aGVzaXMobClcblx0XHRcdFx0XHRsZXhQbGFpbih0cnVlKVxuXHRcdFx0XHRcdGNsb3NlR3JvdXBzKGwuZW5kLCBHX1BhcmVudGhlc2lzKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBOZXdsaW5lOiB7XG5cdFx0XHRcdFx0Y29uc3Qgb3JpZ2luYWxQb3MgPSBwb3MoKVxuXHRcdFx0XHRcdC8vIEdvIGJhY2sgdG8gYmVmb3JlIHdlIGF0ZSBpdC5cblx0XHRcdFx0XHRvcmlnaW5hbFBvcy5jb2x1bW4gPSBvcmlnaW5hbFBvcy5jb2x1bW4gLSAxXG5cblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKGlzSW5kZW50ZWQsIGxvY1NpbmdsZSwgJ1VuY2xvc2VkIHF1b3RlLicpXG5cdFx0XHRcdFx0Ly8gQWxsb3cgZXh0cmEgYmxhbmsgbGluZXMuXG5cdFx0XHRcdFx0Y29uc3QgbnVtTmV3bGluZXMgPSBza2lwTmV3bGluZXMoKVxuXHRcdFx0XHRcdGNvbnN0IG5ld0luZGVudCA9IHNraXBXaGlsZUVxdWFscyhUYWIpXG5cdFx0XHRcdFx0aWYgKG5ld0luZGVudCA8IHF1b3RlSW5kZW50KSB7XG5cdFx0XHRcdFx0XHQvLyBJbmRlbnRlZCBxdW90ZSBzZWN0aW9uIGlzIG92ZXIuXG5cdFx0XHRcdFx0XHQvLyBVbmRvIHJlYWRpbmcgdGhlIHRhYnMgYW5kIG5ld2xpbmUuXG5cdFx0XHRcdFx0XHRzdGVwQmFja01hbnkob3JpZ2luYWxQb3MsIG51bU5ld2xpbmVzICsgbmV3SW5kZW50KVxuXHRcdFx0XHRcdFx0YXNzZXJ0KHBlZWsoKSA9PT0gTmV3bGluZSlcblx0XHRcdFx0XHRcdGJyZWFrIGVhdENoYXJzXG5cdFx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0XHRyZWFkID0gcmVhZCArXG5cdFx0XHRcdFx0XHRcdCdcXG4nLnJlcGVhdChudW1OZXdsaW5lcykgKyAnXFx0Jy5yZXBlYXQobmV3SW5kZW50IC0gcXVvdGVJbmRlbnQpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIFF1b3RlOlxuXHRcdFx0XHRcdGlmICghaXNJbmRlbnRlZClcblx0XHRcdFx0XHRcdGJyZWFrIGVhdENoYXJzXG5cdFx0XHRcdFx0Ly8gRWxzZSBmYWxsdGhyb3VnaFxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIEkndmUgdHJpZWQgcHVzaGluZyBjaGFyYWN0ZXIgY29kZXMgdG8gYW4gYXJyYXkgYW5kIHN0cmluZ2lmeWluZyB0aGVtIGxhdGVyLFxuXHRcdFx0XHRcdC8vIGJ1dCB0aGlzIHR1cm5lZCBvdXQgdG8gYmUgYmV0dGVyLlxuXHRcdFx0XHRcdHJlYWQgPSByZWFkICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG1heWJlT3V0cHV0UmVhZCgpXG5cdFx0Y2xvc2VHcm91cHMocG9zKCksIEdfUXVvdGUpXG5cdH1cblxuXHRjb25zdCBxdW90ZUVzY2FwZSA9IGNoID0+IHtcblx0XHRzd2l0Y2ggKGNoKSB7XG5cdFx0XHRjYXNlIE9wZW5CcmFjZTogcmV0dXJuICd7J1xuXHRcdFx0Y2FzZSBMZXR0ZXJOOiByZXR1cm4gJ1xcbidcblx0XHRcdGNhc2UgTGV0dGVyVDogcmV0dXJuICdcXHQnXG5cdFx0XHRjYXNlIFF1b3RlOiByZXR1cm4gJ1wiJ1xuXHRcdFx0Y2FzZSBCYWNrc2xhc2g6IHJldHVybiAnXFxcXCdcblx0XHRcdGRlZmF1bHQ6IGNvbnRleHQuZmFpbChwb3MsIGBObyBuZWVkIHRvIGVzY2FwZSAke3Nob3dDaGFyKGNoKX1gKVxuXHRcdH1cblx0fVxuXG5cdGN1ckdyb3VwID0gR3JvdXAoTG9jKFN0YXJ0UG9zLCBudWxsKSwgWyBdLCBHX0Jsb2NrKVxuXHRvcGVuTGluZShTdGFydFBvcylcblxuXHRsZXhQbGFpbihmYWxzZSlcblxuXHRjb25zdCBlbmRQb3MgPSBwb3MoKVxuXHRjbG9zZUxpbmUoZW5kUG9zKVxuXHRhc3NlcnQoaXNFbXB0eShncm91cFN0YWNrKSlcblx0Y3VyR3JvdXAubG9jLmVuZCA9IGVuZFBvc1xuXHRyZXR1cm4gY3VyR3JvdXBcbn1cblxuY29uc3QgY2MgPSBfID0+IF8uY2hhckNvZGVBdCgwKVxuY29uc3Rcblx0QW1wZXJzYW5kID0gY2MoJyYnKSxcblx0QmFja3NsYXNoID0gY2MoJ1xcXFwnKSxcblx0QmFja3RpY2sgPSBjYygnYCcpLFxuXHRCYW5nID0gY2MoJyEnKSxcblx0QmFyID0gY2MoJ3wnKSxcblx0Q2FyZXQgPSBjYygnXicpLFxuXHRDbG9zZUJyYWNlID0gY2MoJ30nKSxcblx0Q2xvc2VCcmFja2V0ID0gY2MoJ10nKSxcblx0Q2xvc2VQYXJlbnRoZXNpcyA9IGNjKCcpJyksXG5cdENvbG9uID0gY2MoJzonKSxcblx0Q29tbWEgPSBjYygnLCcpLFxuXHREb3QgPSBjYygnLicpLFxuXHRFcXVhbCA9IGNjKCc9JyksXG5cdEhhc2ggPSBjYygnIycpLFxuXHRIeXBoZW4gPSBjYygnLScpLFxuXHRMZXR0ZXJOID0gY2MoJ24nKSxcblx0TGV0dGVyVCA9IGNjKCd0JyksXG5cdE4wID0gY2MoJzAnKSxcblx0TjEgPSBjYygnMScpLFxuXHROMiA9IGNjKCcyJyksXG5cdE4zID0gY2MoJzMnKSxcblx0TjQgPSBjYygnNCcpLFxuXHRONSA9IGNjKCc1JyksXG5cdE42ID0gY2MoJzYnKSxcblx0TjcgPSBjYygnNycpLFxuXHROOCA9IGNjKCc4JyksXG5cdE45ID0gY2MoJzknKSxcblx0TmV3bGluZSA9IGNjKCdcXG4nKSxcblx0T3BlbkJyYWNlID0gY2MoJ3snKSxcblx0T3BlbkJyYWNrZXQgPSBjYygnWycpLFxuXHRPcGVuUGFyZW50aGVzaXMgPSBjYygnKCcpLFxuXHRQZXJjZW50ID0gY2MoJyUnKSxcblx0UXVvdGUgPSBjYygnXCInKSxcblx0U2VtaWNvbG9uID0gY2MoJzsnKSxcblx0U3BhY2UgPSBjYygnICcpLFxuXHRUYWIgPSBjYygnXFx0JyksXG5cdFRpbGRlID0gY2MoJ34nKSxcblx0VW5kZXJzY29yZSA9IGNjKCdfJyksXG5cdFplcm8gPSBjYygnXFwwJylcblxuY29uc3Rcblx0c2hvd0NoYXIgPSBjaGFyID0+IGNvZGUoU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyKSksXG5cdF9jaGFyUHJlZCA9IChjaGFycywgbmVnYXRlKSA9PiB7XG5cdFx0bGV0IHNyYyA9ICdzd2l0Y2goY2gpIHtcXG4nXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkgPSBpICsgMSlcblx0XHRcdHNyYyA9IGAke3NyY31jYXNlICR7Y2hhcnMuY2hhckNvZGVBdChpKX06IGBcblx0XHRzcmMgPSBgJHtzcmN9IHJldHVybiAkeyFuZWdhdGV9XFxuZGVmYXVsdDogcmV0dXJuICR7bmVnYXRlfVxcbn1gXG5cdFx0cmV0dXJuIEZ1bmN0aW9uKCdjaCcsIHNyYylcblx0fSxcblx0aXNEaWdpdCA9IF9jaGFyUHJlZCgnMDEyMzQ1Njc4OScpLFxuXHRpc05hbWVDaGFyYWN0ZXIgPSBfY2hhclByZWQoTm9uTmFtZUNoYXJhY3RlcnMsIHRydWUpLFxuXHRpc051bWJlckNoYXJhY3RlciA9IF9jaGFyUHJlZCgnMDEyMzQ1Njc4OS5lJylcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9