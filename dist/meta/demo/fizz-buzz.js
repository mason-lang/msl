"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "../../at/at", "../../at/Range", "../../control", "../../math/Num", "../../Obj", "../../Str", "../../Type/Type", "../../bang", "../../at/Seq" ], function(exports, _64_0, Range_1, control_2, Num_3, Obj_4, Str_5, Type_6, _33_7, Seq_8) {
	exports._get = _ms.lazy(function() {
		const _$2 = _ms.getModule(_64_0), empty_63 = _ms.get(_$2, "empty?"), flat_45map = _ms.get(_$2, "flat-map"), map = _ms.get(_$2, "map"), _$3 = _ms.getModule(Range_1), range = _ms.get(_$3, "range"), _$4 = _ms.getModule(control_2), _if = _ms.get(_$4, "if"), _$5 = _ms.getModule(Num_3), divisible_63 = _ms.get(_$5, "divisible?"), infinity = _ms.get(_$5, "infinity"), Nat = _ms.get(_$5, "Nat"), _$6 = _ms.getModule(Obj_4), Obj_45_62Map = _ms.get(_$6, "Obj->Map"), Str = _ms.getDefaultExport(Str_5), _$8 = _ms.getModule(Type_6), _61_62 = _ms.get(_$8, "=>"), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_7)
		}), _$11 = _ms.lazyGetModule(Seq_8), seq_61_63 = _ms.lazyProp(_$11, "seq=?"), take = _ms.lazyProp(_$11, "take");
		const exports = { };
		const make_45fb = function(spec) {
			return map(range(1, infinity), function(n) {
				const parts = flat_45map(Obj_45_62Map(spec), function(_) {
					const divisor = _ms.checkContains(Nat, _.val, "divisor");
					const shout = _ms.checkContains(Str, _.key, "shout");
					return _if(divisible_63(n, divisor), shout)
				});
				return function() {
					const _ = parts;
					switch (true) {
						case _ms.bool(empty_63(_)): {
							return n
						}
						default: {
							return _61_62(Str, parts, " ")
						}
					}
				}()
			})
		};
		const fizz_45buzz = exports["fizz-buzz"] = function() {
			const doc = "Infinite Seq of Fizz Buzz game.";
			const test = function() {
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63), _ms.unlazy(take)(fizz_45buzz, 6), function() {
					const _0 = 1;
					const _1 = 2;
					const _2 = "Fizz";
					const _3 = 4;
					const _4 = "Buzz";
					const _5 = "Fizz";
					return [ _0, _1, _2, _3, _4, _5 ]
				}())
			};
			return _ms.set(make_45fb(function() {
				const Fizz = 3;
				const Buzz = 5;
				return {
					Fizz: Fizz,
					Buzz: Buzz
				}
			}()), "doc", doc, "test", test, "displayName", "fizz-buzz")
		}();
		const fizz_45buzz_45jazz = exports["fizz-buzz-jazz"] = function() {
			const doc = "Infinite Seq of Fizz Buzz Jazz game.";
			const test = function() {
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63), _ms.unlazy(take)(fizz_45buzz_45jazz, 17), function() {
					const _0 = 1;
					const _1 = 2;
					const _2 = "Fizz";
					const _3 = "Jazz";
					const _4 = "Buzz";
					const _5 = "Fizz";
					const _6 = 7;
					const _7 = "Jazz";
					const _8 = "Fizz";
					const _9 = "Buzz";
					const _10 = 11;
					const _11 = "Fizz Jazz";
					const _12 = 13;
					const _13 = 14;
					const _14 = "Fizz Buzz";
					const _15 = "Jazz";
					const _16 = 17;
					return [ _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16 ]
				}())
			};
			return _ms.set(make_45fb(function() {
				const Fizz = 3;
				const Jazz = 4;
				const Buzz = 5;
				return {
					Fizz: Fizz,
					Jazz: Jazz,
					Buzz: Buzz
				}
			}()), "doc", doc, "test", test, "displayName", "fizz-buzz-jazz")
		}();
		const displayName = exports.displayName = "fizz-buzz";
		return exports
	})
})
//# sourceMappingURL=../../meta/demo/fizz-buzz.js.map