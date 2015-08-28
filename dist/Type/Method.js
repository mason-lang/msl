"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../js","../private/bootstrap","../at/q","../assert","../compare","./Impl-Type","./Kind","../Object","../at/q","../Try"],(exports,js_0,bootstrap_1,_63_2,assert_3,compare_4,Impl_45Type_5,Kind_6,Object_7,_63_8,Try_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(js_0),defined_63=_ms.get(_$2,"defined?"),js_61_61_61=_ms.get(_$2,"js==="),js_45delete=_ms.get(_$2,"js-delete"),js_45instanceof=_ms.get(_$2,"js-instanceof"),js_45sub=_ms.get(_$2,"js-sub"),js_45typeof=_ms.get(_$2,"js-typeof"),_$3=_ms.getModule(bootstrap_1),containsImplSymbol=_ms.get(_$3,"containsImplSymbol"),implContains=_ms.get(_$3,"implContains"),msDef=_ms.get(_$3,"msDef"),pAdd=_ms.get(_$3,"pAdd"),_$5=_ms.lazyGetModule(_63_2),un_45_63=_ms.lazyProp(_$5,"un-?"),_$6=_ms.lazyGetModule(assert_3),assert_45call_33=_ms.lazyProp(_$6,"assert-call!"),_$7=_ms.lazyGetModule(compare_4),_61_63=_ms.lazyProp(_$7,"=?"),Impl_45Type=_ms.lazy(()=>_ms.getDefaultExport(Impl_45Type_5)),_$8=_ms.lazyGetModule(Impl_45Type_5),Self_45Type=_ms.lazyProp(_$8,"Self-Type"),Kind=_ms.lazy(()=>_ms.getDefaultExport(Kind_6)),_$10=_ms.lazyGetModule(Object_7),_63p=_ms.lazyProp(_$10,"?p"),p_45with_45proto_63=_ms.lazyProp(_$10,"p-with-proto?"),_$12=_ms.lazyGetModule(_63_8),_63None=_ms.lazyProp(_$12,"?None"),_63some=_ms.lazyProp(_$12,"?some"),_$13=_ms.lazyGetModule(Try_9),fails_63=_ms.lazyProp(_$13,"fails?");
		const flag_63=function flag_63(_){
			return (defined_63(_)&&_)
		};
		const random_45digits=function random_45digits(){
			return Math.random().toString().slice(2)
		};
		const build_45str=function build_45str(builder){
			let built_45str="";
			builder(part=>{
				built_45str=`${built_45str}${part}\n`
			});
			return built_45str
		};
		const str_45lit=function str_45lit(str){
			return JSON.stringify(str)
		};
		const Method=class Method extends Function{
			constructor(params){
				const name=params.name;
				if(! defined_63(name))throw _ms.error(`Must provide method name.`);
				const default_63=defined_63(params.default);
				const wrap_63=defined_63(params.wrap);
				const allow_45null_63=flag_63(params["allow-null?"]);
				if(! (! allow_45null_63||default_63))throw _ms.error(`Method with \`allow-null?\` must have \`default.`);
				const secret_45name=`__method_${name}_${random_45digits()}`;
				const impl_45symbol=(()=>{
					const _=params["impl-symbol"];
					if(defined_63(_)){
						return _
					} else {
						return Symbol(name)
					}
				})();
				const has_45args_63=defined_63(params.args);
				const num_45args=(()=>{
					const _=params.args;
					if(js_61_61_61(js_45typeof(_),`number`)){
						return _
					} else if(js_45instanceof(_,Array)){
						return _.length
					} else if(! defined_63(_)){
						return - 1
					} else throw new (Error)("No branch of `case` matches.")
				})();
				const src=build_45str(add_33=>{
					const access_45method=`global[${str_45lit(secret_45name)}]`;
					const impl=(()=>{
						const _=impl_45symbol;
						if(js_61_61_61(js_45typeof(_),`symbol`)){
							return `a[${access_45method}["impl-symbol"]]`
						} else if(_ms.contains(String,_)){
							return `a[${str_45lit(_)}]`
						} else throw new (Error)("No branch of `case` matches.")
					})();
					if(default_63){
						const cond=(()=>{
							if(allow_45null_63){
								return `a == null || ${impl} === undefined`
							} else {
								return `${impl} === undefined`
							}
						})();
						const call=(()=>{
							if(wrap_63){
								return `${access_45method}.wrap.apply(null, [${access_45method}.default].concat(Array.prototype.slice.call(arguments)))`
							} else {
								return `${access_45method}.default.apply(a, Array.prototype.slice.call(arguments, 1))`
							}
						})();
						add_33(`if (${cond}) return ${call}`)
					};
					const wrap=`${access_45method}.wrap`;
					return add_33((()=>{
						if(has_45args_63){
							const args=(()=>{
								switch(num_45args){
									case 1:{
										return `a`
									}
									case 2:{
										return `a, b`
									}
									case 3:{
										return `a, b, c`
									}
									default:throw new (Error)("No branch of `switch` matches.")
								}
							})();
							return (()=>{
								if(wrap_63){
									return `return ${wrap}(${impl}, ${args})`
								} else {
									return `return ${impl}(${args.slice(3)})`
								}
							})()
						} else if(wrap_63){
							return `switch (arguments.length) \{\n\tcase 1: return ${wrap}(${impl}, a)\n\tcase 2: return ${wrap}(${impl}, a, b)\n\tcase 3: return ${wrap}(${impl}, a, b, c)\n\tcase 4: return ${wrap}(${impl}, a, b, c, d)\n\tdefault: throw new Error(\`Code not generated to handle $\{arguments.length} arguments.\`)\n}`
						} else {
							return `switch (arguments.length) \{\n\tcase 1: return ${impl}()\n\tcase 2: return ${impl}(b)\n\tcase 3: return ${impl}(b, c)\n\tcase 4: return ${impl}(b, c, d)\n\tdefault: throw new Error(\`Code not generated to handle $\{arguments.length} args.\`)\n}`
						}
					})())
				});
				switch(num_45args){
					case 1:{
						super(`a`,src);
						break
					}
					case 2:{
						super(`a`,`b`,src);
						break
					}
					case 3:{
						super(`a`,`b`,`c`,src);
						break
					}
					default:super(`a`,`b`,`c`,`d`,src)
				};
				Object.setPrototypeOf(this,Method.prototype);
				pAdd(global,secret_45name,this);
				js_45delete(params,`name`);
				js_45delete(params,`impl-symbol`);
				Object.assign(this,params);
				_ms.newProperty(this,"impl-symbol",impl_45symbol);
				Object.defineProperty(this,`name`,(()=>{
					const built={};
					const value=built.value=name;
					return built
				})())
			}
			toString(){
				const _this=this;
				return _this.name
			}
		};
		_ms.newProperty(Method,"doc",`TODO`);
		_ms.newProperty(Method,"test",()=>{
			const m=new (Method)((()=>{
				const built={};
				const allow_45null_63=built["allow-null?"]=true;
				const _default=built.default=function _default(){
					return `default`
				};
				return _ms.setName(built,"m")
			})());
			impl_33(m,String,()=>{
				return `String`
			});
			impl_45double_33(m,Number,Number,()=>{
				return `Number Number`
			});
			impl_45double_33(m,Number,String,()=>{
				return `Number String`
			});
			_ms.unlazy(assert_45call_33)(m,(()=>{
				const built=new (global.Map)();
				_ms.assoc(built,[null],`default`);
				_ms.assoc(built,[`a`],`String`);
				_ms.assoc(built,[1,1],`Number Number`);
				_ms.assoc(built,[1,`a`],`Number String`);
				return built
			})());
			_ms.assert(_ms.unlazy(fails_63),()=>{
				return m(1,m)
			});
			_ms.assert(_ms.unlazy(_61_63),`wrap-call-arg`,(()=>{
				const wrap_45method=new (Method)((()=>{
					const built={};
					const _default=built.default=function _default(){
						const _this=this;
						return `call-${_this}`
					};
					const wrap=built.wrap=function wrap(impl,arg){
						return `wrap-${impl.call(arg)}`
					};
					return _ms.setName(built,"wrap-method")
				})());
				return wrap_45method(`arg`)
			})())
		});
		const impl_33=exports["impl!"]=function impl_33(method,implementor,implementation){
			_ms.checkContains(Method,method,"method");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor,"implementor");
			_ms.checkContains(Function,implementation,"implementation");
			do_45impl_33(method,implementor,implementation)
		};
		const impl_45double_33=exports["impl-double!"]=function impl_45double_33(method,implementor_450,implementor_451,implementation){
			_ms.checkContains(Method,method,"method");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor_450,"implementor-0");
			_ms.checkContains(_ms.unlazy(Impl_45Type),implementor_451,"implementor-1");
			_ms.checkContains(Function,implementation,"implementation");
			const dispatcher=(()=>{
				if(writable_63(implementor_450.prototype,method["impl-symbol"])){
					const dd=new (Double_45Dispatcher)(method);
					do_45impl_33(method,implementor_450,dd);
					return dd
				} else {
					const _=js_45sub(implementor_450.prototype,method["impl-symbol"]);
					if(! _ms.contains(Double_45Dispatcher,_))throw _ms.error(`Can't define double dispatch of ${method} for ${implementor_450}.\nA single-dispatch implementation already exists: ${_}.`);
					return _
				}
			})();
			do_45impl_33(dispatcher,implementor_451,implementation)
		};
		const self_45impl_33=exports["self-impl!"]=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
			return _ms.set(function self_45impl_33(method,implementor,implementation){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(Object,implementor,"implementor");
				_ms.checkContains(Function,implementation,"implementation");
				impl_33(method,new (_ms.unlazy(Self_45Type))(implementor),implementation)
			},built)
		})();
		const _63impl_45for=exports["?impl-for"]=(()=>{
			const built={};
			const doc=built.doc=`Implementation of a method for a particular Impl-Type.\nDoes not reference method.default or impls on super-types.\nEmpty if the type would use method.default.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[contains_63,Method],_ms.unlazy(_63some)(method_45contains_63));
				_ms.assoc(built,[_ms.unlazy(_61_63),Method],_ms.unlazy(_63None));
				return built
			};
			return _ms.set(function _63impl_45for(method,type){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),type,"type");
				return _63self_45impl_45for(method,type.prototype)
			},built)
		})();
		const impl_45for=exports["impl-for"]=(()=>{
			const built={};
			const doc=built.doc=`impl-for that fails when there is no implementation.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[contains_63,Method],method_45contains_63);
				return built
			};
			return _ms.set(function impl_45for(method,type){
				_ms.checkContains(Method,method,"method");
				_ms.checkContains(_ms.unlazy(Impl_45Type),type,"type");
				return _ms.unlazy(un_45_63)(_63impl_45for(method,type),_ms.lazy(()=>`${method} not implemented for ${type}.`))
			},built)
		})();
		const _63self_45impl_45for=exports["?self-impl-for"]=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
			return _ms.set(function _63self_45impl_45for(method,object){
				_ms.checkContains(Method,method,"method");
				return _ms.unlazy(_63p)(object,method["impl-symbol"])
			},built)
		})();
		const self_45impl_45for=exports["self-impl-for"]=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
			return _ms.set(function self_45impl_45for(method,object){
				_ms.checkContains(Method,method,"method");
				return _ms.unlazy(un_45_63)(_63self_45impl_45for(method,object),_ms.lazy(()=>`${method} not implemented on ${object}.`))
			},built)
		})();
		const writable_63=function writable_63(obj,property){
			const desc=Object.getOwnPropertyDescriptor(obj,property);
			return (! defined_63(desc)||desc.writable)
		};
		const propagate_45method_45down_33=exports["propagate-method-down!"]=function propagate_45method_45down_33(implementor,method_45symbol,implementation){
			if(! Object.prototype.hasOwnProperty.call(implementor.prototype,method_45symbol)){
				{
					const _=implementor;
					if(_ms.contains(_ms.unlazy(Kind),_)){
						for(let sub_45implementor of _.implementors){
							propagate_45method_45down_33(sub_45implementor,method_45symbol,implementation)
						}
					} else {
						Object.defineProperty(_.prototype,method_45symbol,(()=>{
							const built={};
							const value=built.value=implementation;
							const writable=built.writable=true;
							const configurable=built.configurable=true;
							const enumerable=built.enumerable=false;
							return built
						})())
					}
				}
			}
		};
		const do_45impl_33=function do_45impl_33(method,implementor,implementation){
			if(! writable_63(implementor.prototype,method["impl-symbol"]))throw _ms.error((()=>{
				return `Can not redefine method ${method} for ${implementor}.`
			})());
			Object.defineProperty(implementor.prototype,method["impl-symbol"],(()=>{
				const built={};
				const value=built.value=implementation;
				const writable=built.writable=false;
				const configurable=built.configurable=false;
				const enumerable=built.enumerable=false;
				return built
			})());
			if(contains_63(_ms.unlazy(Kind),implementor)){
				for(let _ of implementor.implementors){
					propagate_45method_45down_33(_,method["impl-symbol"],implementation)
				}
			}
		};
		const Double_45Dispatcher=class Double_45Dispatcher extends Function{
			constructor(method){
				const impl_45symbol=Symbol(`${method.name}_double_dispatch`);
				const secret_45name=`__double_dispatch_${random_45digits()}`;
				pAdd(global,secret_45name,impl_45symbol);
				const src=`target2 = arguments[0]\nif (target2 === undefined)\n\tthrow new Error("Can't double-dispatch ${method.name} for undefined.")\nimpl = target2[global.${secret_45name}]\nif (impl === undefined)\n\tthrow new Error(\`Can't double-dispatch ${method.name} for $\{this} on $\{target2}.\`)\nreturn impl.apply(this, arguments)`;
				super(src);
				Object.setPrototypeOf(this,Double_45Dispatcher.prototype);
				_ms.newProperty(this,"method",method);
				_ms.newProperty(this,"impl-symbol",impl_45symbol);
				Object.defineProperty(this,`name`,(()=>{
					const built={};
					const value=built.value=`${method.name}__double-dispatcher`;
					return built
				})())
			}
		};
		const contains_63=new (Method)((()=>{
			const built={};
			const doc=built.doc=`Whether some collection of things as as an element \`instance\`."`;
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`type`);
				_ms.add(built,`instance`);
				return built
			})();
			const impl_45symbol=built["impl-symbol"]=containsImplSymbol;
			return _ms.setName(built,"contains?")
		})());
		msDef(`contains`,contains_63);
		const method_45contains_63=function method_45contains_63(method,value){
			return _ms.unlazy(p_45with_45proto_63)(value,method["impl-symbol"])
		};
		implContains(Method,method_45contains_63);
		const name=exports.name=`Method`;
		exports.default=Method;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvVHlwZS9NZXRob2QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFjQSxjQUFTLGlCQUFBLEVBQ0M7VUFBVCxDQUFJLFdBQUEsSUFBVTtFQUFBO0VBRWYsc0JBQ2lCLDBCQUFBO1VBQWhCLCtCQUErQjtFQUFBO0VBRWhDLGtCQUFhLHFCQUFBLFFBQ087R0FBbkIsZ0JBQWU7R0FDZixRQUFVLE1BQ0k7Z0JBQUMsR0FBQyxjQUFXOztVQUMzQjtFQUFBO0VBRUQsZ0JBQVcsbUJBQUEsSUFDRztVQUFiLGVBQWU7RUFBQTtFQUVoQixhQUFjLHFCQUFBO2VBQ0YsT0FDTTtJQUFoQixXQUFPO0lBRUMsS0FBQSxXQUFTLHNCQUFhO0lBRTlCLGlCQUFXLFdBQVM7SUFDcEIsY0FBUSxXQUFTO0lBQ2pCLHNCQUFjLFFBQU07SUFDWixLQUFBLENBQUksRUFBSSxpQkFBYSw0QkFBaUI7SUFFOUMsb0JBQWUsWUFBVSxRQUFPO0lBRWhDLG9CQUFtQjtLQUFBLFFBQUE7S0FDbEIsR0FBQSxXQUFBLEdBQ1M7YUFBUjtLQUFBLE9BRUc7YUFBSCxPQUFPO0tBQUE7SUFBQTtJQUVULG9CQUFZLFdBQVM7SUFDckIsaUJBQWdCO0tBQUEsUUFBQTtLQUNmLEdBQUEsWUFBTSxZQUFBLEdBQVksVUFDTzthQUF4QjtLQUFBLE9BQ0QsR0FBQSxnQkFBYyxFQUFFLE9BQ0s7YUFBcEI7WUFDRCxHQUFBLEVBQUksV0FBQSxHQUNTO2FBQVo7OztJQUVGLFVBQU0sWUFBVyxRQUNJO0tBQXBCLHNCQUFpQixVQUFRLFVBQVE7S0FFakMsV0FBWTtNQUFBLFFBQUE7TUFDWCxHQUFBLFlBQU0sWUFBQSxHQUFZLFVBQ087Y0FBdkIsS0FBRzthQUNMLGdCQUFDLE9BQUQsR0FDTztjQUFMLEtBQUcsVUFBUTs7O0tBRWQsR0FBSSxXQUNRO01BQVgsV0FDVztPQUFWLEdBQUEsZ0JBQ1c7ZUFBVCxnQkFBYztjQUVaO2VBQ0YsR0FBQzs7O01BQ0osV0FD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OztvQkFBTixDQUFFLFlBQVUsUUFBWTs7O2tCQUV4QixvQkFBQSxPQUFjLEtBQ2M7c0JBRHJCOztnQ0FDRCxjQUFVLE9BQU8sbUJBQVEsR0FBQyw4QkFBNkI7OztFQUUvRCxxREFDZSxLQUFBOztHQUFkLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtrQkFDUCw4QkFBQSxPQUFjLE9BQ007c0JBRGI7NEJBQ0osT0FBTzs7O0VBRVosaURBQ2MsS0FBQTs7R0FBYixvQkFBTTtHQUNOLHNCQUNRLGVBQUE7a0JBQ1AsMkJBQUEsT0FBYyxPQUNNO3NCQURiO2dDQUNELHFCQUFlLE9BQU8scUJBQVUsR0FBQyw2QkFBNEI7OztFQUdwRSxrQkFBYSxxQkFBQSxJQUFJLFNBQ1E7R0FBeEIsV0FBTyxnQ0FBZ0MsSUFBSTtVQUMzQyxDQUFJLEVBQUksV0FBUyxPQUFNOztFQUl4QixxRUFBMEIsc0NBQUEsWUFBWSxnQkFBYyxlQUNtRDtHQUF0RyxLQUFRLHFDQUFxQyxzQkFBc0IsaUJBQ2E7SUFBekU7S0FBQSxRQUFBO0tBQ0wsaUNBQUEsR0FDSztNQUFDLFFBQUEscUJBQW1CLGVBQ2M7T0FBckMsNkJBQXVCLGtCQUFnQixnQkFBYztNQUFBO0tBQUEsT0FFbkQ7TUFFSCxzQkFBc0IsWUFBWSxnQkFDYSxLQUFBOztPQUE5Qyx3QkFBTztPQUNQLDhCQUFVO09BQ1Ysc0NBQWM7T0FDZCxrQ0FBWTs7Ozs7OztFQUlqQixtQkFBYSxzQkFBQSxPQUFPLFlBQVksZUFLL0I7R0FIUyxLQUFBLFlBQVUsc0JBQXNCLHVDQUN5QixLQUFBO1dBQS9ELDJCQUF5QixjQUFhOztHQUV6QyxzQkFBc0Isc0JBQXNCLHNCQUNrQixLQUFBOztJQUE3RCx3QkFBTztJQUNQLDhCQUFVO0lBQ1Ysc0NBQWM7SUFDZCxrQ0FBWTs7O0dBRWIsR0FBSSw2QkFBZSxhQUNXO0lBQXhCLFFBQUEsS0FBQSx5QkFDd0I7S0FBNUIsNkJBQXVCLEVBQUUsc0JBQW1CO0lBQUE7R0FBQTtFQUFBO0VBRS9DLDBCQUEwQixrQ0FBQTtlQUNkLE9BQ007SUFBaEIsb0JBQWMsT0FBUSxHQUFDO0lBQ3ZCLG9CQUFlLHFCQUFtQjtJQUNsQyxLQUFLLE9BQU8sY0FBWTtJQUV4QixVQUNDLGdHQUV5Qyx1REFDbEIsc0ZBRWtCO0lBRTFDLE1BQU07SUFHTixzQkFBc0IsS0FBSztvQkFFM0IsY0FBVTtvQkFDVixtQkFBZTtJQUNmLHNCQUFzQixLQUFNLE9BQ0ssS0FBQTs7S0FBaEMsd0JBQVEsR0FBQzs7Ozs7RUFFYixrQkFBWSxLQUFJLFFBQ00sS0FBQTs7R0FBckIsb0JBQ0M7R0FDRCxzQkFDSyxLQUFBOztrQkFBRDtrQkFDQTs7O0dBQ0oseUNBQWE7OztFQUNkLE1BQU8sV0FBVTtFQUVqQiwyQkFBb0IsOEJBQUEsT0FBTyxNQUNLOzBDQUFqQixNQUFNOztFQUVyQixhQUFhLE9BQU87RUFwVHBCLHdCQUFBO2tCQTZCQSIsImZpbGUiOiJUeXBlL01ldGhvZC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9