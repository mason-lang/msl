"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./control","./Function","./Generatorbang","./js","./methods","./Type/Method","./Type/Pred-Type","./Type/Type","./io/time","./Try","./bang","./compare","./math/Number","./math/methods","./Try"],function(exports,_64_0,control_1,Function_2,Generator_33_3,js_4,methods_5,Method_6,Pred_45Type_7,Type_8,time_9,Try_10,_33_11,compare_12,Number_13,methods_14,Try_15){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),flatten=_ms.get(_$2,"flatten"),map=_ms.get(_$2,"map"),_$3=_ms.getModule(control_1),_if=_ms.get(_$3,"if"),_$4=_ms.getModule(Function_2),apply=_ms.get(_$4,"apply"),Thunk=_ms.get(_$4,"Thunk"),Generator_33=_ms.getDefaultExport(Generator_33_3),_$6=_ms.getModule(js_4),_new=_ms.get(_$6,"new"),_$7=_ms.getModule(methods_5),sub=_ms.get(_$7,"sub"),_$8=_ms.getModule(Method_6),self_45impl_33=_ms.get(_$8,"self-impl!"),_$9=_ms.getModule(Pred_45Type_7),Any=_ms.get(_$9,"Any"),_$10=_ms.getModule(Type_8),_61_62=_ms.get(_$10,"=>"),_$12=_ms.lazyGetModule(time_9),$after_45time=_ms.lazyProp(_$12,"$after-time"),_$13=_ms.lazyGetModule(Try_10),$catch=_ms.lazyProp(_$13,"$catch"),oh_45no_33=_ms.lazyProp(_$13,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_11)
		}),_$16=_ms.lazyGetModule(compare_12),_61_63=_ms.lazyProp(_$16,"=?"),_$17=_ms.lazyGetModule(Number_13),divisible_63=_ms.lazyProp(_$17,"divisible?"),_$18=_ms.lazyGetModule(methods_14),_43=_ms.lazyProp(_$18,"+"),_$19=_ms.lazyGetModule(Try_15),$try=_ms.lazyProp(_$19,"$try");
		const $=function(){
			const doc="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise\nCalled `$` because you \"cash in\" on it after some time.";
			return _ms.set(global.Promise,"doc",doc,"name","$")
		}();
		self_45impl_33(sub,$,function(){
			return $
		});
		const $done=exports.$done=function(){
			const doc="Don't forget $done!\nLogs any errors that happen inside a promise.\nIt would be great if we could make these errors happen top-level...\nThis is probably a kludge. See <http://blog.soareschen.com/the-problem-with-es6-promises>.";
			return _ms.set(function $done(_){
				_ms.checkContains($,_,"_");
				return _ms.unlazy($catch)(_,function(err){
					global.console.log((((("=== error ===\n"+_ms.show(err.message))+"\n")+_ms.show(err.stack))+"\n=== error ==="));
					_ms.unlazy(oh_45no_33)(err)
				})
			},"doc",doc)
		}();
		const $fail_45after_45time=exports["$fail-after-time"]=function(){
			const doc="Fails if it takes too long.";
			const $test=function* $test(){
				const $x=_ms.unlazy($after_45time)(100,function(){
					return 1
				});
				const a=(yield _ms.unlazy($try)($fail_45after_45time($x,1)));
				_ms.unlazy(_33)(_ms.unlazy(_61_63),a.message,"Took longer than 1 milliseconds.");
				_ms.unlazy(_33)(_ms.unlazy(_61_63),1,(yield $fail_45after_45time($x,200)))
			};
			return _ms.set(function $fail_45after_45time(_,time_45ms){
				_ms.checkContains($,_,"_");
				_ms.checkContains(Number,time_45ms,"time-ms");
				return _ms.checkContains($,_new($,function(resolve,reject){
					$after(_,resolve);
					const timeout=function timeout(){
						return reject(_61_62(Error,(("Took longer than "+_ms.show(time_45ms))+" milliseconds.")))
					};
					return global.setTimeout(timeout,time_45ms)
				}),"res")
			},"doc",doc,"$test",$test)
		}();
		const $after=exports.$after=function(){
			const doc="Applies `then` to the result whenever it is ready.\nIf `then` returns a $, returns a $ for that $'s value; else returns a $ for the result of `then`.";
			const $test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),2,(yield $after($resolved(1),_ms.sub(_ms.unlazy(_43),1))))
			};
			return _ms.set(function $after(_,then){
				_ms.checkContains($,_,"_");
				_ms.checkContains(Function,then,"then");
				return _ms.checkContains($,_.then(then),"res")
			},"doc",doc,"$test",$test)
		}();
		const $resolved=exports.$resolved=function(){
			const doc="$ that is already resolved.";
			const $test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),1,(yield $resolved(1)))
			};
			return _ms.set(function $resolved(value){
				return _ms.checkContains($,$.resolve(value),"res")
			},"doc",doc,"$test",$test)
		}();
		const $rejected=exports.$rejected=function(){
			const doc="$ that is already rejected.";
			const test=function test(){
				return $ing(function*(){
					const r=$rejected("a");
					_ms.unlazy(_33)(_ms.unlazy(_61_63),"a",(yield _ms.unlazy($try)(r)).message);
					const b=(yield _ms.unlazy($try)($after(r,function(){
						return _ms.unlazy(oh_45no_33)("b")
					})));
					_ms.unlazy(_33)(_ms.unlazy(_61_63),"a",b.message)
				})
			};
			return _ms.set(function $rejected(_){
				return $.reject(_61_62(Error,_))
			},"doc",doc,"test",test)
		}();
		const $delay=exports.$delay=function(){
			const doc="Schedules a computation to happen later.\nDoes *not* run it in parallel.\nIt should go without saying,\nbut if you needlessly $delay things all the time your program will take longer.";
			const $test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),1,(yield $delay(function(){
					return 1
				})))
			};
			return _ms.set(function $delay(delayed){
				_ms.checkContains(Thunk,delayed,"delayed");
				return _ms.unlazy($after_45time)(0,delayed)
			},"doc",doc,"$test",$test)
		}();
		const $all=exports.$all=function(){
			const doc="$ that resolves when the last $ in the input does, with every value in the original iteration order.\nIf any one of them fails, fails with the first such failure.";
			const $test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),[1,2],(yield $all([$resolved(1),$resolved(2)])));
				const all_45rejected=$all([$rejected("a"),$rejected("b")]);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),"a",(yield _ms.unlazy($try)(all_45rejected)).message)
			};
			return _ms.set(function $all(_){
				_ms.checkContains(_ms.sub(_64,$),_,"_");
				return _ms.checkContains(_ms.sub($,Array),$.all(_61_62(Array,_)),"res")
			},"doc",doc,"$test",$test)
		}();
		const $map=exports.$map=function(){
			const doc="Asynchronously runs mapper for every element of mapped and returns a $ joining them.\nUnlike map, this always returns an Array.";
			const $test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),[2,3,4],(yield $map([1,2,3],function(_){
					return $delay(function(){
						return _ms.unlazy(_43)(_,1)
					})
				})))
			};
			return _ms.set(function $map(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Function,Any,$),mapper,"mapper");
				return _ms.checkContains(_ms.sub($,Array),$all(map(mapped,mapper)),"res")
			},"doc",doc,"$test",$test)
		}();
		const $flat_45map=exports["$flat-map"]=function(){
			const doc="Like $map but flattens the result.";
			const $test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),[1,1,2,2,3,3],(yield $flat_45map([1,2,3],function(_){
					return $delay(function(){
						return [_,_]
					})
				})))
			};
			return _ms.set(function $flat_45map(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,_64)),mapper,"mapper");
				return _ms.checkContains(_ms.sub($,_64),$after($map(mapped,mapper),flatten),"res")
			},"doc",doc,"$test",$test)
		}();
		const $keep=exports.$keep=function(){
			const doc="Asynchronously runs keep-if? on each element and creates an Array of those that match.\nMaintains the original order.";
			const $test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),[2,4],(yield $keep([1,2,3,4],function(_){
					return $delay(function(){
						return _ms.unlazy(divisible_63)(_,2)
					})
				})))
			};
			return _ms.set(function $keep(keep_45some,keep_45if_63){
				_ms.checkContains(_64,keep_45some,"keep-some");
				_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,Boolean)),keep_45if_63,"keep-if?");
				return _ms.checkContains(_ms.sub($,Array),$flat_45map(keep_45some,function(_){
					return $after(keep_45if_63(_),function(keep){
						return _if(keep,_)
					})
				}),"res")
			},"doc",doc,"$test",$test)
		}();
		const $call=exports.$call=function(){
			const doc="Allows you to cal a function on $s as if they were the arguments.\nSo for any place you would write `f x` where `x` is an actualized value,\nyou may write `$call f $x` where `$x` is a promise.";
			const $test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),3,(yield $call(_ms.unlazy(_43),$resolved(1),$resolved(2))))
			};
			return _ms.set(function $call(f){
				const $args=[].slice.call(arguments,1);
				return _ms.checkContains($,$after($all($args),_ms.sub(apply,f)),"res")
			},"doc",doc,"$test",$test)
		}();
		const $ing=exports.$ing=function(){
			const doc="Within the generator, you may write:\n\ta <~ $get-a\nThe code after the assignment will become an $after of it.\nNote that $ing returns a $; it does *not* call $done at the end.";
			const $test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),"res",(yield $ing(function*(){
					const promised=(yield $resolved("promised"));
					_ms.unlazy(_33)(_ms.unlazy(_61_63),"promised",promised);
					return "res"
				})));
				const $whoops=(yield _ms.unlazy($try)($ing(function*(){
					(yield $rejected("whoops"));
					_ms.unlazy(oh_45no_33)("It's been rejected, so the rest is never called.")
				})));
				_ms.unlazy(_33)(_ms.unlazy(_61_63),"whoops",$whoops.message)
			};
			return _ms.set(function $ing(code){
				_ms.checkContains(_ms.sub(Function,Generator_33),code,"code");
				const gen=code();
				const do_45next=function do_45next(last_45value){
					const _$179=gen.next(last_45value),value=_$179.value,done=_$179.done;
					return function(){
						if(_ms.bool(done)){
							return value
						} else {
							return $after(value,do_45next)
						}
					}()
				};
				return _ms.checkContains($,do_45next(),"res")
			},"doc",doc,"$test",$test)
		}();
		const name=exports.name="$";
		exports.default=$;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy8kLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFvQkEsa0JBQ0c7R0FBRixVQUNDO2tCQUVEOztFQUVELGVBQVcsSUFBSSxFQUNHLFVBQUE7VUFBakI7RUFBQTtFQUlELG9DQUNNO0dBQUwsVUFDQztrQkFJQSxlQUFBLEVBQ0c7c0JBREQ7OEJBQ0ssRUFBSSxTQUFBLElBQ0c7S0FDYixtQkFDQywrQkFDQyw2QkFDQTs0QkFHSztJQUFBO0dBQUE7O0VBRVYsaUVBQ2lCO0dBQWhCLFVBQU07R0FDTixZQUNVLGlCQUFBO0lBQVQsbUNBQWlCLElBQ0ssVUFBQTtZQUFyQjtJQUFBO0lBQ0QsUUFBSyx3QkFBTSxxQkFBaUIsR0FBRzt1Q0FDMUIsVUFBVzt1Q0FDWCxFQUFHLE9BQUcscUJBQWlCLEdBQUc7R0FBQTtrQkFDL0IsOEJBQUcsRUFBSSxVQUNjO3NCQURoQjtzQkFBVTs2QkFBZCxFQUVELEtBQUksRUFBRyxTQUFBLFFBQVEsT0FDTTtLQUFwQixPQUFPLEVBQUU7S0FDVCxjQUNXLGtCQUFBO2FBQVYsT0FBUSxPQUFHLE1BQU8sK0JBQWtCOztZQUNyQyxrQkFBa0IsUUFBUTtJQUFBOzs7RUFFN0Isc0NBQ087R0FBTixVQUNDO0dBRUQsWUFDVSxpQkFBQTt1Q0FBSixFQUFHLE9BQUcsT0FBUSxVQUFVLDJCQUFLO0dBQUE7a0JBQ2xDLGdCQUFHLEVBQUksS0FDYTtzQkFEZjtzQkFBTzs2QkFBWCxFQUNELE9BQU87OztFQUVULDRDQUNVO0dBQVQsVUFBTTtHQUNOLFlBQ1UsaUJBQUE7dUNBQUosRUFBRyxPQUFHLFVBQVU7R0FBQTtrQkFDckIsbUJBQUcsTUFDSzs2QkFEUCxFQUNELFVBQVU7OztFQUVaLDRDQUNVO0dBQVQsVUFBTTtHQUNOLFdBQ08sZUFBQTtXQUFOLEtBQ1EsV0FBQTtLQUFQLFFBQUksVUFBVzt3Q0FDVCxJQUFJLHdCQUFRO0tBRWxCLFFBQUssd0JBQU0s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