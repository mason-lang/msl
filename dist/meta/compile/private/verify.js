if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', '../CompileError', '../Expression', './U/Bag', './U/Op', './U/util', './Vr'], function (exports, module, _CompileError, _Expression, _UBag, _UOp, _UUtil, _Vr) {
	'use strict';

	module.exports = verify;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	const vm = function (es) {
		return es.forEach(function (e) {
			return e.verify();
		});
	};

	let cx, locals,
	// Locals for this block.
	// Replaces `locals` when entering into sub-function.
	pendingBlockLocals, isInDebug, isInGenerator, opLoop, vr;

	const init = function (_cx) {
		cx = _cx;
		locals = new Map();
		pendingBlockLocals = [];
		isInDebug = false;
		isInGenerator = false;
		opLoop = [];
		vr = _Vr.emptyVr();
	},
	     
	// Release for garbage collection
	uninit = function () {
		locals = pendingBlockLocals = opLoop = vr = undefined;
	},
	      withInGenerator = function (_isInGenerator, fun) {
		const g = isInGenerator;
		isInGenerator = _isInGenerator;
		fun();
		isInGenerator = g;
	},
	      plusLocals = function (addedLocals, fun) {
		const shadowed = new Map();
		addedLocals.forEach(function (l) {
			const got = locals.get(l.name);
			if (got !== undefined) shadowed.set(l.name, got);
			locals.set(l.name, l);
		});
		fun();
		addedLocals.forEach(function (l) {
			const s = shadowed.get(l.name);
			if (s === undefined) locals.delete(l.name);else locals.set(l.name, s);
		});
	},
	      plusPendingBlockLocals = function (pending, fun) {
		const oldLength = pendingBlockLocals.length;
		pendingBlockLocals.push.apply(pendingBlockLocals, _toConsumableArray(pending));
		fun();
		while (pendingBlockLocals.length > oldLength) pendingBlockLocals.pop();
	},
	      withInLoop = function (loop, fun) {
		const l = opLoop;
		opLoop = _UOp.some(loop);
		fun();
		opLoop = l;
	},
	      withInDebug = function (_isInDebug, fun) {
		const d = isInDebug;
		isInDebug = _isInDebug;
		fun();
		isInDebug = d;
	},
	      withBlockLocals = function (fun) {
		const bl = pendingBlockLocals;
		pendingBlockLocals = [];
		plusLocals(bl, fun);
		pendingBlockLocals = bl;
	},
	     

	// Vr setters
	setEndLoop = function (endLoop, loop) {
		vr.endLoopToLoop.set(endLoop, loop);
	},
	      registerLocal = function (local) {
		vr.localToInfo.set(local, _Vr.VrLocalInfo(isInDebug, [], []));
	};

	function verify(cx, e) {
		init(cx);
		e.verify();
		verifyLocalUse();
		const out = vr;
		uninit();
		return out;
	}

	const verifyLocalUse = function () {
		vr.localToInfo.forEach(function (info, local) {
			const noNonDebug = _UBag.isEmpty(info.nonDebugAccesses);
			if (noNonDebug && _UBag.isEmpty(info.debugAccesses)) cx.warnIf(!local.okToNotUse, local.loc, function () {
				return 'Unused local variable ' + _CompileError.code(local.name) + '.';
			});else if (info.isInDebug) cx.warnIf(!noNonDebug, function () {
				return _UBag.head(info.nonDebugAccesses).loc;
			}, function () {
				return 'Debug-only local ' + _CompileError.code(local.name) + ' used outside of debug.';
			});else cx.warnIf(!local.okToNotUse && noNonDebug, local.loc, function () {
				return 'Local ' + _CompileError.code(local.name) + ' used only in debug.';
			});
		});
	};

	_UUtil.implementMany(_Expression, 'verify', {
		Assign: function () {
			var _this = this;

			const doV = function () {
				_this.assignee.verify();
				_this.value.verify();
			};
			if (this.assignee.isLazy) withBlockLocals(doV);else doV();
		},
		BlockDo: function () {
			verifyLines(this.lines);
		},
		BlockVal: function () {
			var _this2 = this;

			const newLocals = verifyLines(this.lines);
			plusLocals(newLocals, function () {
				return _this2.returned.verify();
			});
		},
		BlockWrap: function () {
			this.block.verify();
		},
		CaseDo: verifyCase,
		CaseVal: verifyCase,
		// Only reach here for in/out condition
		Debug: function () {
			verifyLines([this]);
		},
		EndLoop: function () {
			var _this3 = this;

			_UOp.ifElse(opLoop, function (loop) {
				return setEndLoop(_this3, loop);
			}, function () {
				return cx.fail(_this3.loc, 'Not in a loop.');
			});
		},
		Fun: function () {
			var _this4 = this;

			withBlockLocals(function () {
				cx.check(_UBag.isEmpty(_this4.opResDeclare) || _this4.block instanceof _Expression.BlockVal, _this4.loc, 'Function with return condition must return something.');
				_this4.args.forEach(function (arg) {
					return vm(arg.opType);
				});
				withInGenerator(_this4.isGenerator, function () {
					const allArgs = _this4.args.concat(_this4.opRestArg);
					allArgs.forEach(function (_) {
						return registerLocal(_);
					});
					plusLocals(allArgs, function () {
						vm(_this4.opIn);
						_this4.block.verify();
						_this4.opResDeclare.forEach(function (rd) {
							rd.verify();
							registerLocal(rd);
						});
						_this4.opOut.forEach(function (o) {
							return plusLocals(_this4.opResDeclare, function () {
								return o.verify();
							});
						});
					});
				});
			});
		},
		LocalAccess: function () {
			const local = locals.get(this.name);
			if (local !== undefined) {
				vr.accessToLocal.set(this, local);
				const info = vr.localToInfo.get(local);
				const accesses = isInDebug ? info.debugAccesses : info.nonDebugAccesses;
				accesses.push(this);
			} else cx.fail(this.loc, 'Could not find local or global ' + _CompileError.code(this.name) + '.\n' + 'Available locals are:\n' + ('' + _CompileError.code(_UUtil.mapKeys(locals).join(' ')) + '.'));
		},
		Loop: function () {
			var _this5 = this;

			withInLoop(this, function () {
				return _this5.block.verify();
			});
		},
		// Adding LocalDeclares to the available locals is done by Fun or lineNewLocals.
		LocalDeclare: function () {
			vm(this.opType);
		},
		MapEntry: function () {
			this.key.verify();
			this.val.verify();
		},
		Module: function () {
			var _this6 = this;

			const useLocals = verifyUses(this.uses, this.debugUses);
			plusLocals(useLocals, function () {
				return _this6.block.verify();
			});
		},
		Yield: function () {
			cx.check(isInGenerator, this.loc, 'Cannot yield outside of generator context');
			this.yielded.verify();
		},
		YieldTo: function () {
			cx.check(isInGenerator, this.loc, 'Cannot yield outside of generator context');
			this.yieldedTo.verify();
		},

		// These ones just recurse to their children.
		AssignDestructure: function () {
			this.value.verify();
			vm(this.assignees);
		},
		Call: function () {
			this.called.verify();
			vm(this.args);
		},
		CaseDoPart: verifyCasePart,
		CaseValPart: verifyCasePart,
		GlobalAccess: function () {},
		ObjReturn: function () {
			vm(this.opObjed);
		},
		ObjSimple: function () {
			const keys = new Set();
			this.pairs.forEach(function (pair) {
				cx.check(!keys.has(pair.key), pair.loc, function () {
					return 'Duplicate key ' + pair.key;
				});
				keys.add(pair.key);
				pair.value.verify();
			});
		},
		Lazy: function () {
			var _this7 = this;

			withBlockLocals(function () {
				return _this7.value.verify();
			});
		},
		ListReturn: function () {},
		ListEntry: function () {
			this.value.verify();
		},
		ListSimple: function () {
			vm(this.parts);
		},
		NumberLiteral: function () {},
		MapReturn: function () {},
		Member: function () {
			this.object.verify();
		},
		ModuleDefaultExport: function () {
			this.value.verify();
		},
		Quote: function () {
			this.parts.forEach(function (_) {
				if (typeof _ !== 'string') _.verify();
			});
		},
		Special: function () {},
		Splat: function () {
			this.splatted.verify();
		}
	});

	function verifyCase() {
		var _this8 = this;

		const newLocals = [];
		this.opCased.forEach(function (cased) {
			registerLocal(cased.assignee);
			cased.verify();
			newLocals.push(cased.assignee);
		});
		plusLocals(newLocals, function () {
			vm(_this8.parts);
			vm(_this8.opElse);
		});
	}

	function verifyCasePart() {
		var _this9 = this;

		if (this.test instanceof _Expression.Pattern) {
			this.test.type.verify();
			this.test.patterned.verify();
			vm(this.test.locals);
			this.test.locals.forEach(registerLocal);
			plusLocals(this.test.locals, function () {
				return _this9.result.verify();
			});
		} else {
			this.test.verify();
			this.result.verify();
		}
	}

	const verifyUses = function (uses, debugUses) {
		const useLocals = [];
		const verifyUse = function (use) {
			use.used.forEach(useLocal);
			use.opUseDefault.forEach(useLocal);
		},
		      useLocal = function (_) {
			registerLocal(_);
			useLocals.push(_);
		};
		uses.forEach(function (use) {
			if (!(use instanceof _Expression.UseDo)) verifyUse(use);
		});
		withInDebug(true, function () {
			return debugUses.forEach(verifyUse);
		});
		return useLocals;
	},
	      verifyLines = function (lines) {
		const allNewLocals = [];
		// First, get locals for the whole block.
		const getLineLocals = function (line) {
			if (line instanceof _Expression.Debug) withInDebug(true, function () {
				return line.lines.forEach(getLineLocals);
			});else {
				const news = lineNewLocals(line);
				news.forEach(registerLocal);
				allNewLocals.push.apply(allNewLocals, _toConsumableArray(news));
			}
		};

		lines.forEach(getLineLocals);

		const thisBlockLocalNames = new Set();
		const shadowed = new Map();

		const verifyLine = function (line) {
			if (line instanceof _Expression.Debug)
				// TODO: Do anything in this situation?
				// cx.check(!inDebug, line.loc, 'Redundant `debug`.')
				withInDebug(true, function () {
					return line.lines.forEach(verifyLine);
				});else {
				verifyIsStatement(line);
				lineNewLocals(line).forEach(function (l) {
					const got = locals.get(l.name);
					if (got !== undefined) {
						cx.check(!thisBlockLocalNames.has(l.name), l.loc, function () {
							return 'A local ' + _CompileError.code(l.name) + ' is already in this block.';
						});
						shadowed.set(l.name, got);
					}
					locals.set(l.name, l);
					thisBlockLocalNames.add(l.name);
				});
				line.verify();
			}
		};

		plusPendingBlockLocals(allNewLocals, function () {
			return lines.forEach(verifyLine);
		});

		allNewLocals.forEach(function (l) {
			const s = shadowed.get(l.name);
			if (s === undefined) locals.delete(l.name);else locals.set(l.name, s);
		});

		return allNewLocals;
	},
	      verifyIsStatement = function (line) {
		switch (true) {
			case line instanceof _Expression.Do:
			// Some Vals are also conceptually Dos, but this was easier than multiple inheritance.
			case line instanceof _Expression.Call:
			case line instanceof _Expression.Yield:
			case line instanceof _Expression.YieldTo:
			case line instanceof _Expression.Special && line.k === 'debugger':
			// OK, used to mean `pass`
			case line instanceof _Expression.GlobalAccess && line.name === 'null':
				return;
			default:
				cx.fail(line.loc, 'Expression in statement position.');
		}
	},
	      lineNewLocals = function (line) {
		return line instanceof _Expression.Assign ? [line.assignee] : line instanceof _Expression.AssignDestructure ? line.assignees : [];
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL3ZlcmlmeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7a0JBb0d3QixNQUFNOzs7O0FBM0Y5QixPQUFNLEVBQUUsR0FBRyxVQUFBLEVBQUU7U0FBSSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztVQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUU7R0FBQSxDQUFDO0VBQUEsQ0FBQTs7QUFFNUMsS0FDQyxFQUFFLEVBQ0YsTUFBTTs7O0FBR04sbUJBQWtCLEVBQ2xCLFNBQVMsRUFDVCxhQUFhLEVBQ2IsTUFBTSxFQUNOLEVBQUUsQ0FBQTs7QUFFSCxPQUNDLElBQUksR0FBRyxVQUFBLEdBQUcsRUFBSTtBQUNiLElBQUUsR0FBRyxHQUFHLENBQUE7QUFDUixRQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQTtBQUNsQixvQkFBa0IsR0FBRyxFQUFFLENBQUE7QUFDdkIsV0FBUyxHQUFHLEtBQUssQ0FBQTtBQUNqQixlQUFhLEdBQUcsS0FBSyxDQUFBO0FBQ3JCLFFBQU0sR0FBRyxFQUFFLENBQUE7QUFDWCxJQUFFLEdBQUcsSUF2QkUsT0FBTyxFQXVCQSxDQUFBO0VBQ2Q7OztBQUVELE9BQU0sR0FBRyxZQUFNO0FBQ2QsUUFBTSxHQUFHLGtCQUFrQixHQUFHLE1BQU0sR0FBRyxFQUFFLEdBQUcsU0FBUyxDQUFBO0VBQ3JEO09BRUQsZUFBZSxHQUFHLFVBQUMsY0FBYyxFQUFFLEdBQUcsRUFBSztBQUMxQyxRQUFNLENBQUMsR0FBRyxhQUFhLENBQUE7QUFDdkIsZUFBYSxHQUFHLGNBQWMsQ0FBQTtBQUM5QixLQUFHLEVBQUUsQ0FBQTtBQUNMLGVBQWEsR0FBRyxDQUFDLENBQUE7RUFDakI7T0FFRCxVQUFVLEdBQUcsVUFBQyxXQUFXLEVBQUUsR0FBRyxFQUFLO0FBQ2xDLFFBQU0sUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7QUFDMUIsYUFBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUMsRUFBSTtB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SUFBSSx3QkF4VmtDLElBQUksQUF3VnRCLENBQUM7QUFDMUIsUUFBSyxJQUFJLHdCQXhWYyxLQUFLLEFBd1ZGLENBQUM7QUFDM0IsUUFBSyxJQUFJLHdCQXpWcUIsT0FBTyxBQXlWVCxDQUFDO0FBQzdCLFFBQUssSUFBSSx3QkExVkYsT0FBTyxBQTBWYyxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssVUFBVSxDQUFDOztBQUV0RCxRQUFLLElBQUksd0JBN1ZtRCxZQUFZLEFBNlZ2QyxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssTUFBTTtBQUN4RCxXQUFNO0FBQUEsQUFDUDtBQUNDLE1BQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxtQ0FBbUMsQ0FBQyxDQUFBO0FBQUEsR0FDdkQ7RUFDRDtPQUVELGFBQWEsR0FBRyxVQUFBLElBQUk7U0FDbkIsSUFBSSx3QkFyV0csTUFBTSxBQXFXUyxHQUNyQixDQUFFLElBQUksQ0FBQyxRQUFRLENBQUUsR0FDakIsSUFBSSx3QkF2V1UsaUJBQWlCLEFBdVdFLEdBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQ2QsRUFBRztFQUFBLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvdmVyaWZ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29kZSB9IGZyb20gJy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCAqIGFzIEVFeHBvcnRzIGZyb20gJy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgeyBBc3NpZ24sIEFzc2lnbkRlc3RydWN0dXJlLCBCbG9ja1ZhbCwgQ2FsbCwgRGVidWcsIERvLCBHbG9iYWxBY2Nlc3MsXG5cdFBhdHRlcm4sIFNwZWNpYWwsIFVzZURvLCBZaWVsZCwgWWllbGRUbyB9IGZyb20gJy4uL0V4cHJlc3Npb24nXG5pbXBvcnQgeyBoZWFkLCBpc0VtcHR5IH0gZnJvbSAnLi9VL0JhZydcbmltcG9ydCB7IGlmRWxzZSwgc29tZSB9IGZyb20gJy4vVS9PcCdcbmltcG9ydCB7IGltcGxlbWVudE1hbnksIG1hcEtleXMgfSBmcm9tICcuL1UvdXRpbCdcbmltcG9ydCB7IGVtcHR5VnIsIFZyTG9jYWxJbmZvIH0gZnJvbSAnLi9WcidcblxuY29uc3Qgdm0gPSBlcyA9PiBlcy5mb3JFYWNoKGUgPT4gZS52ZXJpZnkoKSlcblxubGV0XG5cdGN4LFxuXHRsb2NhbHMsXG5cdC8vIExvY2FscyBmb3IgdGhpcyBibG9jay5cblx0Ly8gUmVwbGFjZXMgYGxvY2Fsc2Agd2hlbiBlbnRlcmluZyBpbnRvIHN1Yi1mdW5jdGlvbi5cblx0cGVuZGluZ0Jsb2NrTG9jYWxzLFxuXHRpc0luRGVidWcsXG5cdGlzSW5HZW5lcmF0b3IsXG5cdG9wTG9vcCxcblx0dnJcblxuY29uc3Rcblx0aW5pdCA9IF9jeCA9PiB7XG5cdFx0Y3ggPSBfY3hcblx0XHRsb2NhbHMgPSBuZXcgTWFwKClcblx0XHRwZW5kaW5nQmxvY2tMb2NhbHMgPSBbXVxuXHRcdGlzSW5EZWJ1ZyA9IGZhbHNlXG5cdFx0aXNJbkdlbmVyYXRvciA9IGZhbHNlXG5cdFx0b3BMb29wID0gW11cblx0XHR2ciA9IGVtcHR5VnIoKVxuXHR9LFxuXHQvLyBSZWxlYXNlIGZvciBnYXJiYWdlIGNvbGxlY3Rpb25cblx0dW5pbml0ID0gKCkgPT4ge1xuXHRcdGxvY2FscyA9IHBlbmRpbmdCbG9ja0xvY2FscyA9IG9wTG9vcCA9IHZyID0gdW5kZWZpbmVkXG5cdH0sXG5cblx0d2l0aEluR2VuZXJhdG9yID0gKF9pc0luR2VuZXJhdG9yLCBmdW4pID0+IHtcblx0XHRjb25zdCBnID0gaXNJbkdlbmVyYXRvclxuXHRcdGlzSW5HZW5lcmF0b3IgPSBfaXNJbkdlbmVyYXRvclxuXHRcdGZ1bigpXG5cdFx0aXNJbkdlbmVyYXRvciA9IGdcblx0fSxcblxuXHRwbHVzTG9jYWxzID0gKGFkZGVkTG9jYWxzLCBmdW4pID0+IHtcblx0XHRjb25zdCBzaGFkb3dlZCA9IG5ldyBNYXAoKVxuXHRcdGFkZGVkTG9jYWxzLmZvckVhY2gobCA9PiB7XG5cdFx0XHRjb25zdCBnb3QgPSBsb2NhbHMuZ2V0KGwubmFtZSlcblx0XHRcdGlmIChnb3QgIT09IHVuZGVmaW5lZClcblx0XHRcdFx0c2hhZG93ZWQuc2V0KGwubmFtZSwgZ290KVxuXHRcdFx0bG9jYWxzLnNldChsLm5hbWUsIGwpXG5cdFx0fSlcblx0XHRmdW4oKVxuXHRcdGFkZGVkTG9jYWxzLmZvckVhY2gobCA9PiB7XG5cdFx0XHRjb25zdCBzID0gc2hhZG93ZWQuZ2V0KGwubmFtZSlcblx0XHRcdGlmIChzID09PSB1bmRlZmluZWQpXG5cdFx0XHRcdGxvY2Fscy5kZWxldGUobC5uYW1lKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRsb2NhbHMuc2V0KGwubmFtZSwgcylcblx0XHR9KVxuXHR9LFxuXG5cdHBsdXNQZW5kaW5nQmxvY2tMb2NhbHMgPSAocGVuZGluZywgZnVuKSA9PiB7XG5cdFx0Y29uc3Qgb2xkTGVuZ3RoID0gcGVuZGluZ0Jsb2NrTG9jYWxzLmxlbmd0aFxuXHRcdHBlbmRpbmdCbG9ja0xvY2Fscy5wdXNoKC4uLnBlbmRpbmcpXG5cdFx0ZnVuKClcblx0XHR3aGlsZSAocGVuZGluZ0Jsb2NrTG9jYWxzLmxlbmd0aCA+IG9sZExlbmd0aClcblx0XHRcdHBlbmRpbmdCbG9ja0xvY2Fscy5wb3AoKVxuXHR9LFxuXG5cdHdpdGhJbkxvb3AgPSAobG9vcCwgZnVuKSA9PiB7XG5cdFx0Y29uc3QgbCA9IG9wTG9vcFxuXHRcdG9wTG9vcCA9IHNvbWUobG9vcClcblx0XHRmdW4oKVxuXHRcdG9wTG9vcCA9IGxcblx0fSxcblxuXHR3aXRoSW5EZWJ1ZyA9IChfaXNJbkRlYnVnLCBmdW4pID0+IHtcblx0XHRjb25zdCBkID0gaXNJbkRlYnVnXG5cdFx0aXNJbkRlYnVnID0gX2lzSW5EZWJ1Z1xuXHRcdGZ1bigpXG5cdFx0aXNJbkRlYnVnID0gZFxuXHR9LFxuXG5cdHdpdGhCbG9ja0xvY2FscyA9IGZ1biA9PiB7XG5cdFx0Y29uc3QgYmwgPSBwZW5kaW5nQmxvY2tMb2NhbHNcblx0XHRwZW5kaW5nQmxvY2tMb2NhbHMgPSBbXVxuXHRcdHBsdXNMb2NhbHMoYmwsIGZ1bilcblx0XHRwZW5kaW5nQmxvY2tMb2NhbHMgPSBibFxuXHR9LFxuXG5cdC8vIFZyIHNldHRlcnNcblx0c2V0RW5kTG9vcCA9IChlbmRMb29wLCBsb29wKSA9PiB7XG5cdFx0dnIuZW5kTG9vcFRvTG9vcC5zZXQoZW5kTG9vcCwgbG9vcClcblx0fSxcblxuXHRyZWdpc3RlckxvY2FsID0gbG9jYWwgPT4ge1xuXHRcdHZyLmxvY2FsVG9JbmZvLnNldChsb2NhbCwgVnJMb2NhbEluZm8oXHRpc0luRGVidWcsIFtdLCBbXSkpXG5cdH1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdmVyaWZ5KGN4LCBlKSB7XG5cdGluaXQoY3gpXG5cdGUudmVyaWZ5KClcblx0dmVyaWZ5TG9jYWxVc2UoKVxuXHRjb25zdCBvdXQgPSB2clxuXHR1bmluaXQoKVxuXHRyZXR1cm4gb3V0XG59XG5cbmNvbnN0IHZlcmlmeUxvY2FsVXNlID0gKCkgPT4ge1xuXHR2ci5sb2NhbFRvSW5mby5mb3JFYWNoKChpbmZvLCBsb2NhbCkgPT4ge1xuXHRcdGNvbnN0IG5vTm9uRGVidWcgPSBpc0VtcHR5KGluZm8ubm9uRGVidWdBY2Nlc3Nlcylcblx0XHRpZiAobm9Ob25EZWJ1ZyAmJiBpc0VtcHR5KGluZm8uZGVidWdBY2Nlc3NlcykpXG5cdFx0XHRjeC53YXJuSWYoIWxvY2FsLm9rVG9Ob3RVc2UsIGxvY2FsLmxvYywgKCkgPT5cblx0XHRcdFx0YFVudXNlZCBsb2NhbCB2YXJpYWJsZSAke2NvZGUobG9jYWwubmFtZSl9LmApXG5cdFx0ZWxzZSBpZiAoaW5mby5pc0luRGVidWcpXG5cdFx0XHRjeC53YXJuSWYoIW5vTm9uRGVidWcsICgpID0+IGhlYWQoaW5mby5ub25EZWJ1Z0FjY2Vzc2VzKS5sb2MsICgpID0+XG5cdFx0XHRcdGBEZWJ1Zy1vbmx5IGxvY2FsICR7Y29kZShsb2NhbC5uYW1lKX0gdXNlZCBvdXRzaWRlIG9mIGRlYnVnLmApXG5cdFx0ZWxzZVxuXHRcdFx0Y3gud2FybklmKCFsb2NhbC5va1RvTm90VXNlICYmIG5vTm9uRGVidWcsIGxvY2FsLmxvYywgKCkgPT5cblx0XHRcdFx0YExvY2FsICR7Y29kZShsb2NhbC5uYW1lKX0gdXNlZCBvbmx5IGluIGRlYnVnLmApXG5cdH0pXG59XG5cbmltcGxlbWVudE1hbnkoRUV4cG9ydHMsICd2ZXJpZnknLCB7XG5cdEFzc2lnbigpIHtcblx0XHRjb25zdCBkb1YgPSAoKSA9PiB7XG5cdFx0XHR0aGlzLmFzc2lnbmVlLnZlcmlmeSgpXG5cdFx0XHR0aGlzLnZhbHVlLnZlcmlmeSgpXG5cdFx0fVxuXHRcdGlmICh0aGlzLmFzc2lnbmVlLmlzTGF6eSlcblx0XHRcdHdpdGhCbG9ja0xvY2Fscyhkb1YpXG5cdFx0ZWxzZVxuXHRcdFx0ZG9WKClcblx0fSxcblx0QmxvY2tEbygpIHsgdmVyaWZ5TGluZXModGhpcy5saW5lcykgfSxcblx0QmxvY2tWYWwoKSB7XG5cdFx0Y29uc3QgbmV3TG9jYWxzID0gdmVyaWZ5TGluZXModGhpcy5saW5lcylcblx0XHRwbHVzTG9jYWxzKG5ld0xvY2FscywgKCkgPT4gdGhpcy5yZXR1cm5lZC52ZXJpZnkoKSlcblx0fSxcblx0QmxvY2tXcmFwKCkge1xuXHRcdHRoaXMuYmxvY2sudmVyaWZ5KClcblx0fSxcblx0Q2FzZURvOiB2ZXJpZnlDYXNlLFxuXHRDYXNlVmFsOiB2ZXJpZnlDYXNlLFxuXHQvLyBPbmx5IHJlYWNoIGhlcmUgZm9yIGluL291dCBjb25kaXRpb25cblx0RGVidWcoKSB7IHZlcmlmeUxpbmVzKFsgdGhpcyBdKSB9LFxuXHRFbmRMb29wKCkge1xuXHRcdGlmRWxzZShvcExvb3AsXG5cdFx0XHRsb29wID0+IHNldEVuZExvb3AodGhpcywgbG9vcCksXG5cdFx0XHQoKSA9PiBjeC5mYWlsKHRoaXMubG9jLCAnTm90IGluIGEgbG9vcC4nKSlcblx0fSxcblx0RnVuKCkge1xuXHRcdHdpdGhCbG9ja0xvY2FscygoKSA9PiB7XG5cdFx0XHRjeC5jaGVjayhpc0VtcHR5KHRoaXMub3BSZXNEZWNsYXJlKSB8fCB0aGlzLmJsb2NrIGluc3RhbmNlb2YgQmxvY2tWYWwsIHRoaXMubG9jLFxuXHRcdFx0XHQnRnVuY3Rpb24gd2l0aCByZXR1cm4gY29uZGl0aW9uIG11c3QgcmV0dXJuIHNvbWV0aGluZy4nKVxuXHRcdFx0dGhpcy5hcmdzLmZvckVhY2goYXJnID0+IHZtKGFyZy5vcFR5cGUpKVxuXHRcdFx0d2l0aEluR2VuZXJhdG9yKHRoaXMuaXNHZW5lcmF0b3IsICgpID0+IHtcblx0XHRcdFx0Y29uc3QgYWxsQXJncyA9IHRoaXMuYXJncy5jb25jYXQodGhpcy5vcFJlc3RBcmcpXG5cdFx0XHRcdGFsbEFyZ3MuZm9yRWFjaChfID0+IHJlZ2lzdGVyTG9jYWwoXykpXG5cdFx0XHRcdHBsdXNMb2NhbHMoYWxsQXJncywgKCkgPT4ge1xuXHRcdFx0XHRcdHZtKHRoaXMub3BJbilcblx0XHRcdFx0XHR0aGlzLmJsb2NrLnZlcmlmeSgpXG5cdFx0XHRcdFx0dGhpcy5vcFJlc0RlY2xhcmUuZm9yRWFjaChyZCA9PiB7XG5cdFx0XHRcdFx0XHRyZC52ZXJpZnkoKVxuXHRcdFx0XHRcdFx0cmVnaXN0ZXJMb2NhbChyZClcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdHRoaXMub3BPdXQuZm9yRWFjaChvID0+IHBsdXNMb2NhbHModGhpcy5vcFJlc0RlY2xhcmUsICgpID0+IG8udmVyaWZ5KCkpKVxuXHRcdFx0XHR9KVxuXHRcdFx0fSlcblx0XHR9KVxuXHR9LFxuXHRMb2NhbEFjY2VzcygpIHtcblx0XHRjb25zdCBsb2NhbCA9IGxvY2Fscy5nZXQodGhpcy5uYW1lKVxuXHRcdGlmIChsb2NhbCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR2ci5hY2Nlc3NUb0xvY2FsLnNldCh0aGlzLCBsb2NhbClcblx0XHRcdGNvbnN0IGluZm8gPSB2ci5sb2NhbFRvSW5mby5nZXQobG9jYWwpXG5cdFx0XHRjb25zdCBhY2Nlc3NlcyA9IGlzSW5EZWJ1ZyA/IGluZm8uZGVidWdBY2Nlc3NlcyA6IGluZm8ubm9uRGVidWdBY2Nlc3Nlc1xuXHRcdFx0YWNjZXNzZXMucHVzaCh0aGlzKVxuXHRcdH0gZWxzZVxuXHRcdFx0Y3guZmFpbCh0aGlzLmxvYyxcblx0XHRcdFx0YENvdWxkIG5vdCBmaW5kIGxvY2FsIG9yIGdsb2JhbCAke2NvZGUodGhpcy5uYW1lKX0uXFxuYCArXG5cdFx0XHRcdCdBdmFpbGFibGUgbG9jYWxzIGFyZTpcXG4nICtcblx0XHRcdFx0YCR7Y29kZShtYXBLZXlzKGxvY2Fscykuam9pbignICcpKX0uYClcblx0fSxcblx0TG9vcCgpIHsgd2l0aEluTG9vcCh0aGlzLCAoKSA9PiB0aGlzLmJsb2NrLnZlcmlmeSgpKSB9LFxuXHQvLyBBZGRpbmcgTG9jYWxEZWNsYXJlcyB0byB0aGUgYXZhaWxhYmxlIGxvY2FscyBpcyBkb25lIGJ5IEZ1biBvciBsaW5lTmV3TG9jYWxzLlxuXHRMb2NhbERlY2xhcmUoKSB7IHZtKHRoaXMub3BUeXBlKSB9LFxuXHRNYXBFbnRyeSgpIHtcblx0XHR0aGlzLmtleS52ZXJpZnkoKVxuXHRcdHRoaXMudmFsLnZlcmlmeSgpXG5cdH0sXG5cdE1vZHVsZSgpIHtcblx0XHRjb25zdCB1c2VMb2NhbHMgPSB2ZXJpZnlVc2VzKHRoaXMudXNlcywgdGhpcy5kZWJ1Z1VzZXMpXG5cdFx0cGx1c0xvY2Fscyh1c2VMb2NhbHMsICgpID0+IHRoaXMuYmxvY2sudmVyaWZ5KCkpXG5cdH0sXG5cdFlpZWxkKCkge1xuXHRcdGN4LmNoZWNrKGlzSW5HZW5lcmF0b3IsIHRoaXMubG9jLCAnQ2Fubm90IHlpZWxkIG91dHNpZGUgb2YgZ2VuZXJhdG9yIGNvbnRleHQnKVxuXHRcdHRoaXMueWllbGRlZC52ZXJpZnkoKVxuXHR9LFxuXHRZaWVsZFRvKCkge1xuXHRcdGN4LmNoZWNrKGlzSW5HZW5lcmF0b3IsIHRoaXMubG9jLCAnQ2Fubm90IHlpZWxkIG91dHNpZGUgb2YgZ2VuZXJhdG9yIGNvbnRleHQnKVxuXHRcdHRoaXMueWllbGRlZFRvLnZlcmlmeSgpXG5cdH0sXG5cblx0Ly8gVGhlc2Ugb25lcyBqdXN0IHJlY3Vyc2UgdG8gdGhlaXIgY2hpbGRyZW4uXG5cdEFzc2lnbkRlc3RydWN0dXJlKCkge1xuXHRcdHRoaXMudmFsdWUudmVyaWZ5KClcblx0XHR2bSh0aGlzLmFzc2lnbmVlcylcblx0fSxcblx0Q2FsbCgpIHtcblx0XHR0aGlzLmNhbGxlZC52ZXJpZnkoKVxuXHRcdHZtKHRoaXMuYXJncylcblx0fSxcblx0Q2FzZURvUGFydDogdmVyaWZ5Q2FzZVBhcnQsXG5cdENhc2VWYWxQYXJ0OiB2ZXJpZnlDYXNlUGFydCxcblx0R2xvYmFsQWNjZXNzKCkgeyB9LFxuXHRPYmpSZXR1cm4oKSB7IHZtKHRoaXMub3BPYmplZCkgfSxcblx0T2JqU2ltcGxlKCkge1xuXHRcdGNvbnN0IGtleXMgPSBuZXcgU2V0KClcblx0XHR0aGlzLnBhaXJzLmZvckVhY2gocGFpciA9PiB7XG5cdFx0XHRjeC5jaGVjaygha2V5cy5oYXMocGFpci5rZXkpLCBwYWlyLmxvYywgKCkgPT4gYER1cGxpY2F0ZSBrZXkgJHtwYWlyLmtleX1gKVxuXHRcdFx0a2V5cy5hZGQocGFpci5rZXkpXG5cdFx0XHRwYWlyLnZhbHVlLnZlcmlmeSgpXG5cdFx0fSlcblx0fSxcblx0TGF6eSgpIHsgd2l0aEJsb2NrTG9jYWxzKCgpID0+IHRoaXMudmFsdWUudmVyaWZ5KCkpIH0sXG5cdExpc3RSZXR1cm4oKSB7IH0sXG5cdExpc3RFbnRyeSgpIHsgdGhpcy52YWx1ZS52ZXJpZnkoKSB9LFxuXHRMaXN0U2ltcGxlKCkgeyB2bSh0aGlzLnBhcnRzKSB9LFxuXHROdW1iZXJMaXRlcmFsKCkgeyB9LFxuXHRNYXBSZXR1cm4oKSB7IH0sXG5cdE1lbWJlcigpIHsgdGhpcy5vYmplY3QudmVyaWZ5KCkgfSxcblx0TW9kdWxlRGVmYXVsdEV4cG9ydCgpIHsgdGhpcy52YWx1ZS52ZXJpZnkoKSB9LFxuXHRRdW90ZSgpIHtcblx0XHR0aGlzLnBhcnRzLmZvckVhY2goXyA9PiB7XG5cdFx0XHRpZiAodHlwZW9mIF8gIT09ICdzdHJpbmcnKVxuXHRcdFx0XHRfLnZlcmlmeSgpXG5cdFx0fSlcblx0fSxcblx0U3BlY2lhbCgpIHsgfSxcblx0U3BsYXQoKSB7IHRoaXMuc3BsYXR0ZWQudmVyaWZ5KCkgfVxufSlcblxuZnVuY3Rpb24gdmVyaWZ5Q2FzZSgpIHtcblx0Y29uc3QgbmV3TG9jYWxzID0gW11cblx0dGhpcy5vcENhc2VkLmZvckVhY2goY2FzZWQgPT4ge1xuXHRcdHJlZ2lzdGVyTG9jYWwoY2FzZWQuYXNzaWduZWUpXG5cdFx0Y2FzZWQudmVyaWZ5KClcblx0XHRuZXdMb2NhbHMucHVzaChjYXNlZC5hc3NpZ25lZSlcblx0fSlcblx0cGx1c0xvY2FscyhuZXdMb2NhbHMsICgpID0+IHtcblx0XHR2bSh0aGlzLnBhcnRzKVxuXHRcdHZtKHRoaXMub3BFbHNlKVxuXHR9KVxufVxuXG5mdW5jdGlvbiB2ZXJpZnlDYXNlUGFydCgpIHtcblx0aWYgKHRoaXMudGVzdCBpbnN0YW5jZW9mIFBhdHRlcm4pIHtcblx0XHR0aGlzLnRlc3QudHlwZS52ZXJpZnkoKVxuXHRcdHRoaXMudGVzdC5wYXR0ZXJuZWQudmVyaWZ5KClcblx0XHR2bSh0aGlzLnRlc3QubG9jYWxzKVxuXHRcdHRoaXMudGVzdC5sb2NhbHMuZm9yRWFjaChyZWdpc3RlckxvY2FsKVxuXHRcdHBsdXNMb2NhbHModGhpcy50ZXN0LmxvY2FscywgKCkgPT4gdGhpcy5yZXN1bHQudmVyaWZ5KCkpXG5cdH0gZWxzZSB7XG5cdFx0dGhpcy50ZXN0LnZlcmlmeSgpXG5cdFx0dGhpcy5yZXN1bHQudmVyaWZ5KClcblx0fVxufVxuXG5jb25zdFxuXHR2ZXJpZnlVc2VzID0gKHVzZXMsIGRlYnVnVXNlcykgPT4ge1xuXHRcdGNvbnN0IHVzZUxvY2FscyA9IFtdXG5cdFx0Y29uc3Rcblx0XHRcdHZlcmlmeVVzZSA9IHVzZSA9PiB7XG5cdFx0XHRcdHVzZS51c2VkLmZvckVhY2godXNlTG9jYWwpXG5cdFx0XHRcdHVzZS5vcFVzZURlZmF1bHQuZm9yRWFjaCh1c2VMb2NhbClcblx0XHRcdH0sXG5cdFx0XHR1c2VMb2NhbCA9IF8gPT4ge1xuXHRcdFx0XHRyZWdpc3RlckxvY2FsKF8pXG5cdFx0XHRcdHVzZUxvY2Fscy5wdXNoKF8pXG5cdFx0XHR9XG5cdFx0dXNlcy5mb3JFYWNoKHVzZSA9PiB7XG5cdFx0XHRpZiAoISh1c2UgaW5zdGFuY2VvZiBVc2VEbykpIHZlcmlmeVVzZSh1c2UpXG5cdFx0fSlcblx0XHR3aXRoSW5EZWJ1Zyh0cnVlLCAoKSA9PiBkZWJ1Z1VzZXMuZm9yRWFjaCh2ZXJpZnlVc2UpKVxuXHRcdHJldHVybiB1c2VMb2NhbHNcblx0fSxcblxuXHR2ZXJpZnlMaW5lcyA9IGxpbmVzID0+IHtcblx0XHRjb25zdCBhbGxOZXdMb2NhbHMgPSBbIF1cblx0XHQvLyBGaXJzdCwgZ2V0IGxvY2FscyBmb3IgdGhlIHdob2xlIGJsb2NrLlxuXHRcdGNvbnN0IGdldExpbmVMb2NhbHMgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdHdpdGhJbkRlYnVnKHRydWUsICgpID0+IGxpbmUubGluZXMuZm9yRWFjaChnZXRMaW5lTG9jYWxzKSlcblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRjb25zdCBuZXdzID0gbGluZU5ld0xvY2FscyhsaW5lKVxuXHRcdFx0XHRuZXdzLmZvckVhY2gocmVnaXN0ZXJMb2NhbClcblx0XHRcdFx0YWxsTmV3TG9jYWxzLnB1c2goLi4ubmV3cylcblx0XHRcdH1cblx0XHR9XG5cblx0XHRsaW5lcy5mb3JFYWNoKGdldExpbmVMb2NhbHMpXG5cblx0XHRjb25zdCB0aGlzQmxvY2tMb2NhbE5hbWVzID0gbmV3IFNldCgpXG5cdFx0Y29uc3Qgc2hhZG93ZWQgPSBuZXcgTWFwKClcblxuXHRcdGNvbnN0IHZlcmlmeUxpbmUgPSBsaW5lID0+IHtcblx0XHRcdGlmIChsaW5lIGluc3RhbmNlb2YgRGVidWcpXG5cdFx0XHRcdC8vIFRPRE86IERvIGFueXRoaW5nIGluIHRoaXMgc2l0dWF0aW9uP1xuXHRcdFx0XHQvLyBjeC5jaGVjayghaW5EZWJ1ZywgbGluZS5sb2MsICdSZWR1bmRhbnQgYGRlYnVnYC4nKVxuXHRcdFx0XHR3aXRoSW5EZWJ1Zyh0cnVlLCAoKSA9PiBsaW5lLmxpbmVzLmZvckVhY2godmVyaWZ5TGluZSkpXG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0dmVyaWZ5SXNTdGF0ZW1lbnQobGluZSlcblx0XHRcdFx0bGluZU5ld0xvY2FscyhsaW5lKS5mb3JFYWNoKGwgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IGdvdCA9IGxvY2Fscy5nZXQobC5uYW1lKVxuXHRcdFx0XHRcdGlmIChnb3QgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0Y3guY2hlY2soIXRoaXNCbG9ja0xvY2FsTmFtZXMuaGFzKGwubmFtZSksIGwubG9jLFxuXHRcdFx0XHRcdFx0XHQoKSA9PiBgQSBsb2NhbCAke2NvZGUobC5uYW1lKX0gaXMgYWxyZWFkeSBpbiB0aGlzIGJsb2NrLmApXG5cdFx0XHRcdFx0XHRzaGFkb3dlZC5zZXQobC5uYW1lLCBnb3QpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGxvY2Fscy5zZXQobC5uYW1lLCBsKVxuXHRcdFx0XHRcdHRoaXNCbG9ja0xvY2FsTmFtZXMuYWRkKGwubmFtZSlcblx0XHRcdFx0fSlcblx0XHRcdFx0bGluZS52ZXJpZnkoKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHBsdXNQZW5kaW5nQmxvY2tMb2NhbHMoYWxsTmV3TG9jYWxzLCAoKSA9PlxuXHRcdFx0bGluZXMuZm9yRWFjaCh2ZXJpZnlMaW5lKSlcblxuXHRcdGFsbE5ld0xvY2Fscy5mb3JFYWNoKGwgPT4ge1xuXHRcdFx0Y29uc3QgcyA9IHNoYWRvd2VkLmdldChsLm5hbWUpXG5cdFx0XHRpZiAocyA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRsb2NhbHMuZGVsZXRlKGwubmFtZSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0bG9jYWxzLnNldChsLm5hbWUsIHMpXG5cdFx0fSlcblxuXHRcdHJldHVybiBhbGxOZXdMb2NhbHNcblx0fSxcblxuXHR2ZXJpZnlJc1N0YXRlbWVudCA9IGxpbmUgPT4ge1xuXHRcdHN3aXRjaCAodHJ1ZSkge1xuXHRcdFx0Y2FzZSBsaW5lIGluc3RhbmNlb2YgRG86XG5cdFx0XHQvLyBTb21lIFZhbHMgYXJlIGFsc28gY29uY2VwdHVhbGx5IERvcywgYnV0IHRoaXMgd2FzIGVhc2llciB0aGFuIG11bHRpcGxlIGluaGVyaXRhbmNlLlxuXHRcdFx0Y2FzZSBsaW5lIGluc3RhbmNlb2YgQ2FsbDpcblx0XHRcdGNhc2UgbGluZSBpbnN0YW5jZW9mIFlpZWxkOlxuXHRcdFx0Y2FzZSBsaW5lIGluc3RhbmNlb2YgWWllbGRUbzpcblx0XHRcdGNhc2UgbGluZSBpbnN0YW5jZW9mIFNwZWNpYWwgJiYgbGluZS5rID09PSAnZGVidWdnZXInOlxuXHRcdFx0Ly8gT0ssIHVzZWQgdG8gbWVhbiBgcGFzc2Bcblx0XHRcdGNhc2UgbGluZSBpbnN0YW5jZW9mIEdsb2JhbEFjY2VzcyAmJiBsaW5lLm5hbWUgPT09ICdudWxsJzpcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRjeC5mYWlsKGxpbmUubG9jLCAnRXhwcmVzc2lvbiBpbiBzdGF0ZW1lbnQgcG9zaXRpb24uJylcblx0XHR9XG5cdH0sXG5cblx0bGluZU5ld0xvY2FscyA9IGxpbmUgPT5cblx0XHRsaW5lIGluc3RhbmNlb2YgQXNzaWduID9cblx0XHRcdFsgbGluZS5hc3NpZ25lZSBdIDpcblx0XHRcdGxpbmUgaW5zdGFuY2VvZiBBc3NpZ25EZXN0cnVjdHVyZSA/XG5cdFx0XHRsaW5lLmFzc2lnbmVlcyA6XG5cdFx0XHRbIF1cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9