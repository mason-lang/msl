"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/q","./cash","./compare","./Function","./private/bootstrap","./Type/Method","./Type/Pred-Type","./Type/Type","./cash","./Function"],(exports,_63_0,$_1,compare_2,Function_3,bootstrap_4,Method_5,Pred_45Type_6,Type_7,$_8,Function_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(_63_0),_63some=_ms.get(_$2,"?some"),_63None=_ms.get(_$2,"?None"),$=_ms.getDefaultExport($_1),_$3=_ms.getModule($_1),$after=_ms.get(_$3,"$after"),_$4=_ms.getModule(compare_2),_61_63=_ms.get(_$4,"=?"),_$5=_ms.getModule(Function_3),Action=_ms.get(_$5,"Action"),noop=_ms.get(_$5,"noop"),_$6=_ms.getModule(bootstrap_4),ms=_ms.get(_$6,"ms"),_$7=_ms.getModule(Method_5),self_45impl_33=_ms.get(_$7,"self-impl!"),_$8=_ms.getModule(Pred_45Type_6),Any=_ms.get(_$8,"Any"),Union=_ms.get(_$8,"Union"),Type=_ms.getDefaultExport(Type_7),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),_$11=_ms.lazyGetModule($_8),$rejected=_ms.lazyProp(_$11,"$rejected"),$resolved=_ms.lazyProp(_$11,"$resolved"),_$12=_ms.lazyGetModule(Function_9),thunk=_ms.lazyProp(_$12,"thunk");
		const fail_33=function fail_33(){
			throw _ms.error("An error occurred.")
		};
		const Success=exports.Success=class Success{
			constructor(val){
				_ms.newProperty(this,"val",val)
			}
		};
		_ms.newProperty(Success,"doc",`Attempt that did not fail. _.val is the result of the attempted code.`);
		self_45impl_33(_61_62,Error,ms.error);
		const try_45result=exports["try-result"]=(()=>{
			const built={};
			const doc=built.doc=`If \`tried\` throws an error, returns it; else returns Success of its result.\nIf you don't care about the value of the error, use \`?try\` instead.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[_ms.unlazy(thunk)(1)],new (Success)(1));
				_ms.assert(_61_63,try_45result(fail_33).message,`An error occurred.`);
				return built
			};
			return _ms.set(function try_45result(tried){
				_ms.checkContains(Action,tried,"tried");
				return (()=>{
					try {
						return new (Success)(tried())
					}catch(_){
						return _
					}
				})()
			},built)
		})();
		const _63try=exports["?try"]=(()=>{
			const built={};
			const doc=built.doc=`\`?\` containing any successes.\nThis can be thought of as translating an Error-throwing Function to an ?-returning one.\nThe opposite of this is \`@.?.un-?\`.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[_ms.unlazy(thunk)(1)],_63some(1));
				_ms.assoc(built,[fail_33],_63None);
				return built
			};
			return _ms.set(function _63try(tried){
				_ms.checkContains(_ms.sub(Function,Any),tried,"tried");
				return (()=>{
					try {
						return _63some(tried())
					}catch(_){
						noop(_);
						return _63None
					}
				})()
			},built)
		})();
		const fails_63=exports["fails?"]=(()=>{
			const built={};
			const doc=built.doc=`Whether the Function throws some error.`;
			const test=built.test=function test(){
				_ms.assert(fails_63,fail_33);
				_ms.assertNot(fails_63,noop)
			};
			return _ms.set(function fails_63(tried){
				_ms.checkContains(Action,tried,"tried");
				return (()=>{
					try {
						tried();
						return false
					}catch(_){
						noop(_);
						return true
					}
				})()
			},built)
		})();
		const fails_45with_63=exports["fails-with?"]=(()=>{
			const built={};
			const doc=built.doc=`Whether the Function throws an error of the given type or with the given message.`;
			const test=built.test=function test(){
				_ms.assert(fails_45with_63,`message`,()=>{
					throw _ms.error(`message`)
				});
				_ms.assert(fails_45with_63,TypeError,()=>{
					return null["missing-property"]
				})
			};
			return _ms.set(function fails_45with_63(expected_45error,tried){
				_ms.checkContains(_ms.sub(Union,String,Type),expected_45error,"expected-error");
				_ms.checkContains(Action,tried,"tried");
				return (()=>{
					try {
						tried();
						return false
					}catch(error){
						return (()=>{
							const _=expected_45error;
							if(_ms.contains(Type,_)){
								return _ms.contains(_,error)
							} else if(_ms.contains(String,_)){
								return _61_63(error.message,_)
							} else throw new (Error)("No branch of `case` matches.")
						})()
					}
				})()
			},built)
		})();
		const annotate_45errors=exports["annotate-errors"]=(()=>{
			const built={};
			const doc=built.doc=`If there are thrown errors, prepends \`annotation\` to their stack and message.`;
			const test=built.test=function test(){
				_ms.assert(fails_45with_63,`ab`,()=>{
					annotate_45errors(`a`,()=>{
						throw _ms.error(`b`)
					})
				})
			};
			return _ms.set(function annotate_45errors(annotation,tried){
				_ms.checkContains(Action,tried,"tried");
				return (()=>{
					try {
						return tried()
					}catch(_){
						_.stack=`${_ms.unlazy(annotation)}${_.stack}`;
						_.message=`${_ms.unlazy(annotation)}${_.message}`;
						throw _ms.error(_)
					}
				})()
			},built)
		})();
		const $try=exports.$try=(()=>{
			const built={};
			const doc=built.doc=`Success if the $ is resolved, Error if rejected.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_61_63,new (Success)(1),(yield $try(_ms.unlazy($resolved)(1))));
				_ms.assert(_61_63,`a`,(yield $try(_ms.unlazy($rejected)(`a`))).message);
				_ms.assert(_61_63,`a`,(yield $try($.reject(`a`))).message)
			};
			return _ms.set(function $try(_){
				_ms.checkContains($,_,"_");
				const success=$after(_,val=>{
					return new (Success)(val)
				});
				return $catch(success,_ms.sub(_61_62,Error))
			},built)
		})();
		const $catch=exports.$catch=(()=>{
			const built={};
			const doc=built.doc=`If \`$\` succeeds, acts like \`identity\`.\nElse returns a \`$\` for the result of running \`catcher\` on the Error.\nLike for \`$after\`, \`catcher\` can also return another \`$\`.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_61_63,`a`,(yield $catch(_ms.unlazy($rejected)(`a`),_=>{
					return _.message
				})))
			};
			return _ms.set(function $catch(promise,catcher){
				_ms.checkContains($,promise,"promise");
				_ms.checkContains(Function,catcher,"catcher");
				return _ms.checkContains($,promise.catch(catcher),"res")
			},built)
		})();
		const $annotate_45errors=exports["$annotate-errors"]=(()=>{
			const built={};
			const doc=built.doc=`Like \`annotate-errors\` but works on errors thrown in a \`$\`.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_61_63,`ab`,(yield $try($annotate_45errors(`a`,_ms.unlazy($rejected)(`b`)))).message)
			};
			return _ms.set(function $annotate_45errors(annotation,$tried){
				_ms.checkContains($,$tried,"$tried");
				return $catch($tried,_=>{
					_.stack=`${_ms.unlazy(annotation)}${_.stack}`;
					_.message=`${_ms.unlazy(annotation)}${_.message}`;
					throw _ms.error(_)
				})
			},built)
		})();
		const name=exports.name=`Try`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvVHJ5Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBY00sY0FDVSxrQkFBQTtHQUFmOztFQUVELDhCQUNjO2VBQ0YsSUFDRztvQkFBYixXQUFPO0dBQUE7RUFBQTtrQkFFVCxjQUFlO0VBRWYsZUFBVyxPQUFHLE1BQU07RUFFcEIseUNBQ1csS0FBQTs7R0FBVixvQkFDQztHQUVELHNCQUNPLGVBQUE7O29CQUFOLG1CQUFTLElBQVEsS0FBSSxTQUFRO2VBQ3JCLE9BQUksYUFBVyxpQkFBZ0I7OztrQkFDdkMsc0JBQUEsTUFDWTtzQkFETjtXQUVBO1NBQ0Y7YUFBRixLQUFJLFNBQVE7S0FBQSxDQUNiLE1BQ0ssRUFBQTthQUFKO0tBQUE7SUFBQTtHQUFBOztFQUVKLDZCQUNLLEtBQUE7O0dBQUosb0JBQ0M7R0FHRCxzQkFDTyxlQUFBOztvQkFBTixtQkFBUyxJQUFRLFFBQU07b0JBQ3ZCLENBQUUsU0FBVzs7O2tCQUNiLGdCQUFBLE1BQ21COzhCQURiLFNBQVM7V0FFVDtTQUNGO2FBQUYsUUFBTTtLQUFBLENBQ1AsTUFDSyxFQUFBO01BQUosS0FBQTthQUNBO0tBQUE7SUFBQTtHQUFBOztFQUVKLGlDQUNPLEtBQUE7O0dBQU4sb0JBQU07R0FDTixzQkFDUSxlQUFBO2VBQUMsU0FBTztrQkFDUCxTQUFPO0dBQUE7a0JBQ2Ysa0JBQUEsTUFDWTtzQkFETjtXQUVBO1NBQ0Y7TUFBRjthQUNBO0tBQUEsQ0FDRCxNQUNLLEVBQUE7TUFBSixLQUFBO2FBQ0E7S0FBQTtJQUFBO0dBQUE7O0VBRUosNkNBQ1ksS0FBQTs7R0FBWCxvQkFBTTtHQUNOLHNCQUNRLGVBQUE7ZUFBQyxnQkFBYSxVQUNXLElBQUE7S0FBL0IsZ0JBQVE7O2VBQ0QsZ0JBQVksVUFDVyxJQUFBO1lBQTlCOzs7a0JBQ0QseUJBQUEsaUJBQWtDLE1BQ1k7OEJBRC9CLE1BQU0sT0FBTztzQkFBWTtXQUVsQztTQUNGO01BQUY7YUFDQTtLQUFBLENBQ0QsTUFBTSxNQUNLO2FBQUw7T0FBQSxRQUFBO09BQ0osZ0JBQUMsS0FBRCxHQUNLOzRCQUFFLEVBQU47T0FBQSxPQUNELGdCQUFDLE9BQUQsR0FDTztlQUFOLE9BQUcsY0FBYztPQUFBOzs7Ozs7RUFFdkIsbURBQ2dCLEtBQUE7O0dBQWYsb0JBQU07R0FDTixzQkFDUSxlQUFBO2VBQUMsZ0JBQWEsS0FDTSxJQUFBO0tBQTFCLGtCQUFpQixJQUNLLElBQUE7TUFBckIsZ0JBQVE7Ozs7a0JBQ1YsMkJBQUEsV0FBbUIsTUFDWTtzQkFETjtXQUVuQjtTQUNGO2FBQUY7S0FBQSxDQUNELE1BQ0ssRUFBQTtNQUFKLFFBQVksNEJBQWE7TUFDekIsVUFBYyw0QkFBYTtNQUMzQixnQkFBTztLQUFBO0lBQUE7R0FBQTs7RUFHVix3QkFDSyxLQUFBOztHQUFKLG9CQUFNO0dBQ04sd0JBQ1UsaUJBQUE7ZUFBRCxPQUFJLEtBQUksU0FBUSxHQUFJLE9BQUcsMkJBQWdCO2VBQ3ZDLE9BQUksSUFBSSxPQUFJLDJCQUFpQjtlQUU3QixPQUFJLElBQUksT0FBSSxLQUFNLFNBQVU7O2tCQUNwQyxjQUFBLEVBQ0c7c0JBREQ7SUFFRixjQUFVLE9BQU8sRUFBRyxLQUNHO1lBQXRCLEtBQUksU0FBUTtJQUFBO1dBQ2IsT0FBTyxnQkFBUSxPQUFHO0dBQUE7O0VBRXBCLDRCQUNPLEtBQUE7O0dBQU4sb0JBQ0M7R0FHRCx3QkFDVSxpQkFBQTtlQUFELE9BQUksSUFBSSxPQUFJLDZCQUFtQixLQUFLLEdBQ0M7WUFBNUM7OztrQkFDRCxnQkFBRyxRQUFVLFFBQ2dCO3NCQURsQjtzQkFBVTs2QkFBcEIsRUFDRCxjQUFjOzs7RUFFaEIscURBQ2lCLEtBQUE7O0dBQWhCLG9CQUFNO0dBQ04sd0JBQ1UsaUJBQUE7ZUFBRCxPQUFJLEtBQUssT0FBRyxLQUFNLG1CQUFrQiwwQkFBZTs7a0JBQzNELDRCQUFBLFdBQW1CLE9BQ1E7c0JBREQ7V0FDMUIsT0FBTyxPQUFRLEdBQ0M7S0FBZixRQUFZLDRCQUFhO0tBQ3pCLFVBQWMsNEJBQWE7S0FDM0IsZ0JBQU87SUFBQTtHQUFBOztFQXpJWCx3QkFBQSIsImZpbGUiOiJUcnkuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==