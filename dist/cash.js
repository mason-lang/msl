"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./Function","./Generatorbang","./methods","./Type/Method","./Type/Pred-Type","./Type/Type","./io/time","./Try","./compare","./math/Number","./math/methods","./Try"],(exports,_64_0,Function_1,Generator_33_2,methods_3,Method_4,Pred_45Type_5,Type_6,time_7,Try_8,compare_9,Number_10,methods_11,Try_12)=>{
	exports._get=_ms.lazy(()=>{
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),flatten=_ms.get(_$2,"flatten"),_$3=_ms.getModule(Function_1),apply=_ms.get(_$3,"apply"),Thunk=_ms.get(_$3,"Thunk"),Generator_33=_ms.getDefaultExport(Generator_33_2),_$5=_ms.getModule(methods_3),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(Method_4),self_45impl_33=_ms.get(_$6,"self-impl!"),_$7=_ms.getModule(Pred_45Type_5),Any=_ms.get(_$7,"Any"),_$8=_ms.getModule(Type_6),_61_62=_ms.get(_$8,"=>"),_$10=_ms.lazyGetModule(time_7),$after_45time=_ms.lazyProp(_$10,"$after-time"),_$11=_ms.lazyGetModule(Try_8),$catch=_ms.lazyProp(_$11,"$catch"),_$13=_ms.lazyGetModule(compare_9),_61_63=_ms.lazyProp(_$13,"=?"),_$14=_ms.lazyGetModule(Number_10),divisible_63=_ms.lazyProp(_$14,"divisible?"),_$15=_ms.lazyGetModule(methods_11),_43=_ms.lazyProp(_$15,"+"),_$16=_ms.lazyGetModule(Try_12),$try=_ms.lazyProp(_$16,"$try");
		const $=()=>{
			const built={};
			const doc=built.doc=`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise\nCalled \`$\` because you "cash in" on it after some time.`;
			return _ms.set(global.Promise,built,"$")
		}();
		self_45impl_33(sub,$,()=>{
			return $
		});
		const $done=exports.$done=()=>{
			const built={};
			const doc=built.doc=`Don't forget $done!\nLogs any errors that happen inside a promise.\nIt would be great if we could make these errors happen top-level...\nThis is probably a kludge. See <http://blog.soareschen.com/the-problem-with-es6-promises>.`;
			return _ms.set(function $done(_){
				_ms.checkContains($,_,"_");
				return _ms.unlazy($catch)(_,err=>{
					global.console.log(`=== error ===\n${_ms.show(err.message)}\n${_ms.show(err.stack)}\n=== error ===`);
					throw _ms.error(err)
				})
			},built)
		}();
		const $fail_45after_45time=exports["$fail-after-time"]=()=>{
			const built={};
			const doc=built.doc=`Fails if it takes too long.`;
			const $test=built.$test=function* $test(){
				const $x=_ms.unlazy($after_45time)(100,()=>{
					return 1
				});
				const a=(yield _ms.unlazy($try)($fail_45after_45time($x,1)));
				_ms.assert(_ms.unlazy(_61_63),a.message,`Took longer than 1 milliseconds.`);
				_ms.assert(_ms.unlazy(_61_63),1,(yield $fail_45after_45time($x,200)))
			};
			return _ms.set(function $fail_45after_45time(_,time_45ms){
				_ms.checkContains($,_,"_");
				_ms.checkContains(Number,time_45ms,"time-ms");
				return _ms.checkContains($,new $((resolve,reject)=>{
					$after(_,resolve);
					const timeout=function timeout(){
						return reject(_61_62(Error,`Took longer than ${_ms.show(time_45ms)} milliseconds.`))
					};
					return global.setTimeout(timeout,time_45ms)
				}),"res")
			},built)
		}();
		const $after=exports.$after=()=>{
			const built={};
			const doc=built.doc=`Applies \`then\` to the result whenever it is ready.\nIf \`then\` returns a $, returns a $ for that $'s value; else returns a $ for the result of \`then\`.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),2,(yield $after($resolved(1),_ms.sub(_ms.unlazy(_43),1))))
			};
			return _ms.set(function $after(_,then){
				_ms.checkContains($,_,"_");
				_ms.checkContains(Function,then,"then");
				return _ms.checkContains($,_.then(then),"res")
			},built)
		}();
		const $resolved=exports.$resolved=()=>{
			const built={};
			const doc=built.doc=`$ that is already resolved.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),1,(yield $resolved(1)))
			};
			return _ms.set(function $resolved(value){
				return _ms.checkContains($,$.resolve(value),"res")
			},built)
		}();
		const $rejected=exports.$rejected=()=>{
			const built={};
			const doc=built.doc=`$ that is already rejected.`;
			const test=built.test=function test(){
				return $ing(function*(){
					const r=$rejected(`a`);
					_ms.assert(_ms.unlazy(_61_63),`a`,(yield _ms.unlazy($try)(r)).message);
					const b=(yield _ms.unlazy($try)($after(r,()=>{
						throw _ms.error(`b`)
					})));
					_ms.assert(_ms.unlazy(_61_63),`a`,b.message)
				})
			};
			return _ms.set(function $rejected(_){
				return $.reject(_61_62(Error,_))
			},built)
		}();
		const $delay=exports.$delay=()=>{
			const built={};
			const doc=built.doc=`Schedules a computation to happen later.\nDoes *not* run it in parallel.\nIt should go without saying,\nbut if you needlessly $delay things all the time your program will take longer.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),1,(yield $delay(()=>{
					return 1
				})))
			};
			return _ms.set(function $delay(delayed){
				_ms.checkContains(Thunk,delayed,"delayed");
				return _ms.unlazy($after_45time)(0,delayed)
			},built)
		}();
		const $all=exports.$all=()=>{
			const built={};
			const doc=built.doc=`$ that resolves when the last $ in the input does, with every value in the original iteration order.\nIf any one of them fails, fails with the first such failure.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),[1,2],(yield $all([$resolved(1),$resolved(2)])));
				const all_45rejected=$all([$rejected(`a`),$rejected(`b`)]);
				_ms.assert(_ms.unlazy(_61_63),`a`,(yield _ms.unlazy($try)(all_45rejected)).message)
			};
			return _ms.set(function $all(_){
				_ms.checkContains(_ms.sub(_64,$),_,"_");
				return _ms.checkContains(_ms.sub($,Array),$.all(_61_62(Array,_)),"res")
			},built)
		}();
		const $map=exports.$map=()=>{
			const built={};
			const doc=built.doc=`Asynchronously runs mapper for every element of mapped and returns a $ joining them.\nUnlike map, this always returns an Array.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),[2,3,4],(yield $map([1,2,3],_=>{
					return $delay(()=>{
						return _ms.unlazy(_43)(_,1)
					})
				})))
			};
			return _ms.set(function $map(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Function,Any,$),mapper,"mapper");
				return _ms.checkContains(_ms.sub($,Array),$all(()=>{
					const built=[];
					for(let _ of mapped){
						_ms.add(built,mapper(_))
					};
					return built
				}()),"res")
			},built)
		}();
		const $flat_45map=exports["$flat-map"]=()=>{
			const built={};
			const doc=built.doc=`Like $map but flattens the result.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),[1,1,2,2,3,3],(yield $flat_45map([1,2,3],_=>{
					return $delay(()=>{
						return [_,_]
					})
				})))
			};
			return _ms.set(function $flat_45map(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,_64)),mapper,"mapper");
				return _ms.checkContains(_ms.sub($,_64),$after($map(mapped,mapper),flatten),"res")
			},built)
		}();
		const $keep=exports.$keep=()=>{
			const built={};
			const doc=built.doc=`Asynchronously runs keep-if? on each element and creates an Array of those that match.\nMaintains the original order.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),[2,4],(yield $keep([1,2,3,4],_=>{
					return $delay(()=>{
						return _ms.unlazy(divisible_63)(_,2)
					})
				})))
			};
			return _ms.set(function $keep(keep_45some,keep_45if_63){
				_ms.checkContains(_64,keep_45some,"keep-some");
				_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,Boolean)),keep_45if_63,"keep-if?");
				return _ms.checkContains(_ms.sub($,Array),$flat_45map(keep_45some,_=>{
					return $after(keep_45if_63(_),keep=>{
						return _ms.bool(keep)?_ms.some(()=>{
							return _
						}()):_ms.None
					})
				}),"res")
			},built)
		}();
		const $call=exports.$call=()=>{
			const built={};
			const doc=built.doc=`Allows you to cal a function on $s as if they were the arguments.\nSo for any place you would write \`f x\` where \`x\` is an actualized value,\nyou may write \`$call f $x\` where \`$x\` is a promise.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),3,(yield $call(_ms.unlazy(_43),$resolved(1),$resolved(2))))
			};
			return _ms.set(function $call(f){
				const $args=[].slice.call(arguments,1);
				return _ms.checkContains($,$after($all($args),_ms.sub(apply,f)),"res")
			},built)
		}();
		const $ing=exports.$ing=()=>{
			const built={};
			const doc=built.doc=`Within the generator, you may write:\n\ta <~ $get-a\nThe code after the assignment will become an $after of it.\nNote that $ing returns a $; it does *not* call $done at the end.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),`res`,(yield $ing(function*(){
					const promised=(yield $resolved(`promised`));
					_ms.assert(_ms.unlazy(_61_63),`promised`,promised);
					return `res`
				})));
				const $whoops=(yield _ms.unlazy($try)($ing(function*(){
					(yield $rejected(`whoops`));
					throw _ms.error(`It's been rejected, so the rest is never called.`)
				})));
				_ms.assert(_ms.unlazy(_61_63),`whoops`,$whoops.message)
			};
			return _ms.set(function $ing(code){
				_ms.checkContains(_ms.sub(Function,Generator_33),code,"code");
				const $_45generator=code();
				const do_45next=function do_45next(last_45value){
					const _$178=$_45generator.next(last_45value),value=_$178.value,done=_$178.done;
					return ()=>{
						if(_ms.bool(done)){
							return value
						} else {
							return $after(value,do_45next)
						}
					}()
				};
				return _ms.checkContains($,do_45next(),"res")
			},built)
		}();
		const name=exports.name=`$`;
		exports.default=$;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy8kLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBaUJBLFlBQ0U7O0dBQUQsb0JBQ0M7a0JBRUQ7O0VBRUQsZUFBVyxJQUFJLEVBQ0csSUFBQTtVQUFqQjtFQUFBO0VBSUQsOEJBQ007O0dBQUwsb0JBQ0M7a0JBSUEsZUFBQSxFQUNHO3NCQUREOzhCQUNLLEVBQUksS0FDRztLQUNiLG1CQUNDLDJCQUNDLDBCQUNBO0tBR0YsZ0JBQU87SUFBQTtHQUFBOztFQUVWLDJEQUNpQjs7R0FBaEIsb0JBQU07R0FDTix3QkFDVSxpQkFBQTtJQUFULG1DQUFpQixJQUNLLElBQUE7WUFBckI7SUFBQTtJQUNELFFBQUssd0JBQU0scUJBQWlCLEdBQUc7a0NBQ3BCLFVBQVc7a0NBQ1gsRUFBRyxPQUFHLHFCQUFpQixHQUFHO0dBQUE7a0JBQ3JDLDhCQUFHLEVBQUksVUFDYztzQkFEaEI7c0JBQVU7NkJBQWQsRUFFRCxJQUFJLEVBQUcsQ0FBQSxRQUFRLFNBQ007S0FBcEIsT0FBTyxFQUFFO0tBQ1QsY0FDVyxrQkFBQTthQUFWLE9BQVEsT0FBRyxNQUFPLDZCQUFrQjs7WUFDckMsa0JBQWtCLFFBQVE7SUFBQTs7O0VBRTdCLGdDQUNPOztHQUFOLG9CQUNDO0dBRUQsd0JBQ1UsaUJBQUE7a0NBQUUsRUFBRyxPQUFHLE9BQVEsVUFBVSwyQkFBSztHQUFBO2tCQUN4QyxnQkFBRyxFQUFJLEtBQ2E7c0JBRGY7c0JBQU87NkJBQVgsRUFDRCxPQUFPOzs7RUFFVCxzQ0FDVTs7R0FBVCxvQkFBTTtHQUNOLHdCQUNVLGlCQUFBO2tDQUFFLEVBQUcsT0FBRyxVQUFVO0dBQUE7a0JBQzNCLG1CQUFHLE1BQ0s7NkJBRFAsRUFDRCxVQUFVOzs7RUFFWixzQ0FDVTs7R0FBVCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7V0FBTixLQUNRLFdBQUE7S0FBUCxRQUFJLFVBQVc7bUNBQ0gsSUFBSSx3QkFBUTtLQUV4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