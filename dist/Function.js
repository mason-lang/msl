"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./methods","./Type/Alias-Type","./Type/Method","./at/at","./at/at-Type","./at/Map/Hash-Map","./at/Map/Map","./at/Map/Weak-Id-Map","./at/Seq/Seq","./Object","./Type/Pred-Type","./Type/Type","./at/Seq/Seq","./compare","./control","./math/methods"],(exports,methods_0,Alias_45Type_1,Method_2,_64_3,_64_45Type_4,Hash_45Map_5,Map_6,Weak_45Id_45Map_7,Seq_8,Object_9,Pred_45Type_10,Type_11,Seq_12,compare_13,control_14,methods_15)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(methods_0),sub=_ms.get(_$0,"sub"),Alias_45Type=_ms.getDefaultExport(Alias_45Type_1),_$1=_ms.getModule(Method_2),impl_33=_ms.get(_$1,"impl!"),self_45impl_33=_ms.get(_$1,"self-impl!"),_64=_ms.lazy(()=>_ms.getDefaultExport(_64_3)),_$2=_ms.lazyGetModule(_64_3),_43_43=_ms.lazyProp(_$2,"++"),_$3=_ms.lazyGetModule(_64_45Type_4),empty=_ms.lazyProp(_$3,"empty"),Hash_45Map=_ms.lazy(()=>_ms.getDefaultExport(Hash_45Map_5)),Map=_ms.lazy(()=>_ms.getDefaultExport(Map_6)),_$4=_ms.lazyGetModule(Map_6),get_45or_45add_33=_ms.lazyProp(_$4,"get-or-add!"),Weak_45Id_45Map=_ms.lazy(()=>_ms.getDefaultExport(Weak_45Id_45Map_7)),_$5=_ms.lazyGetModule(Seq_8),rtail=_ms.lazyProp(_$5,"rtail"),last=_ms.lazyProp(_$5,"last"),_$6=_ms.lazyGetModule(Object_9),Object_45_62Map=_ms.lazyProp(_$6,"Object->Map"),_$7=_ms.lazyGetModule(Pred_45Type_10),ObjLit=_ms.lazyProp(_$7,"ObjLit"),_$8=_ms.lazyGetModule(Type_11),_61_62=_ms.lazyProp(_$8,"=>"),_$9=_ms.lazyGetModule(Seq_12),seq_61_63=_ms.lazyProp(_$9,"seq=?"),_$10=_ms.lazyGetModule(compare_13),_61_63=_ms.lazyProp(_$10,"=?"),_$11=_ms.lazyGetModule(control_14),build=_ms.lazyProp(_$11,"build"),_$12=_ms.lazyGetModule(methods_15),_43=_ms.lazyProp(_$12,"+");
		const Action=exports.Action=new (Alias_45Type)((()=>{
			const built={};
			built[`name`]="Action";
			const doc=built.doc=`A function returning nothing.
Function[Number] describes a Function taking nothing and returning a Number;
Action[Number] describes a Function taking a Number and returning nothing.`;
			const alias_45of=built["alias-of"]=Function;
			return built
		})());
		const Pred=exports.Pred=new (Alias_45Type)((()=>{
			const built={};
			built[`name`]="Pred";
			const doc=built.doc=`Function[Any Boolean].`;
			const alias_45of=built["alias-of"]=Function;
			return built
		})());
		const Thunk=exports.Thunk=new (Alias_45Type)((()=>{
			const built={};
			built[`name`]="Thunk";
			const doc=built.doc=`Function with no args returning a value.`;
			const alias_45of=built["alias-of"]=Function;
			return built
		})());
		const apply=exports.apply=(()=>{
			const built={};
			const doc=built.doc=`Calls the function with the given arguments list.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[_ms.unlazy(_43),[1,2]],3);
				return built
			};
			return _ms.set((_,args)=>{
				_ms.checkContains(Function,_,"_");
				_ms.checkContains(_ms.unlazy(_64),args,"args");
				return _(...args)
			},built)
		})();
		const call=exports.call=(()=>{
			const built={};
			const doc=built.doc=`Calls the function with the given arguments.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[_ms.unlazy(_43),1,2],3);
				return built
			};
			return _ms.set(function(_){
				const args=[].slice.call(arguments,1);
				_ms.checkContains(Function,_,"_");
				return _(...args)
			},built)
		})();
		const fun_45copy=exports["fun-copy"]=(()=>{
			const built={};
			const doc=built.doc=`Creates a new function with identical functionality.
*Does* copy any values captured by its scope.
Does *not* copy any properties on the old function.`;
			const test=built.test=function test(){
				const f1=(()=>{
					const built={};
					const doc=built.doc=`f1`;
					return _ms.set(_=>{
						return _
					},built)
				})();
				const f2=(()=>{
					const built={};
					const doc=built.doc=`f2`;
					return _ms.set(fun_45copy(f1),built)
				})();
				_ms.assert(_ms.unlazy(_61_63),f1.doc,`f1`);
				_ms.assert(_ms.unlazy(_61_63),f2.doc,`f2`);
				_ms.assert(_ms.unlazy(_61_63),f1(1),f2(1))
			};
			return _ms.set(_=>{
				_ms.checkContains(Function,_,"_");
				return Function.prototype.call.bind(_,null)
			},built)
		})();
		const identity=exports.identity=(()=>{
			const built={};
			const doc=built.doc=`Outputs its input unmodified.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[1],1);
				return built
			};
			return _ms.set(_=>{
				return _
			},built)
		})();
		const id_45memoize=exports["id-memoize"]=(()=>{
			const built={};
			const doc=built.doc=`When an Object is passed into \`fun\`, stores the result in a Weak-Id-Map
and uses that if the exact same (\`id=?\`) Object is used again.`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(seq_61_63),[1,2,1],_ms.unlazy(build)(_yield=>{
					const get_45a=id_45memoize(x=>{
						_yield(x.a);
						return x.a
					});
					const a1={
						a:1
					};
					_ms.assert(_ms.unlazy(_61_63),get_45a(a1),1);
					_ms.assert(_ms.unlazy(_61_63),get_45a(a1),1);
					const a2={
						a:2
					};
					_ms.assert(_ms.unlazy(_61_63),get_45a(a2),2);
					const a1b={
						a:1
					};
					_ms.assert(_ms.unlazy(_61_63),get_45a(a1b),1)
				}))
			};
			return _ms.set(_=>{
				_ms.checkContains(Function,_,"_");
				const wm=_ms.unlazy(empty)(_ms.unlazy(Weak_45Id_45Map));
				return arg=>{
					_ms.checkContains(Object,arg,"arg");
					return _ms.unlazy(get_45or_45add_33)(wm,arg,_ms.lazy(()=>_(arg)))
				}
			},built)
		})();
		const hash_45memoize=exports["hash-memoize"]=(()=>{
			const built={};
			const doc=built.doc=`Stores the argument every time you call it,
and re-uses the result if called again with the same argument.
This will make those arguments unavailable for garbage collection...`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(seq_61_63),[1,2],_ms.unlazy(build)(_yield=>{
					const get_45a=hash_45memoize(x=>{
						_yield(x.a);
						return x.a
					});
					const a1={
						a:1
					};
					_ms.assert(_ms.unlazy(_61_63),get_45a(a1),1);
					_ms.assert(_ms.unlazy(_61_63),get_45a(a1),1);
					const a2={
						a:2
					};
					_ms.assert(_ms.unlazy(_61_63),get_45a(a2),2);
					const a1_45copy={
						a:1
					};
					_ms.assert(_ms.unlazy(_61_63),get_45a(a1_45copy),1)
				}))
			};
			return _ms.set(_=>{
				_ms.checkContains(Function,_,"_");
				const hm=_ms.unlazy(empty)(_ms.unlazy(Hash_45Map));
				return arg=>{
					_ms.checkContains(Object,arg,"arg");
					return _ms.unlazy(get_45or_45add_33)(hm,arg,_ms.lazy(()=>_(arg)))
				}
			},built)
		})();
		const spread=exports.spread=(()=>{
			const built={};
			const doc=built.doc=`Applies \`fun\`, starting with the given args, to each entry in an arguments list or map.`;
			const test=built.test=function test(){
				const all_454=function all_454(a,b,c,d){
					return [a,b,c,d]
				};
				_ms.assert(_ms.unlazy(seq_61_63),spread(all_454,1,2,3,[4,5]),(()=>{
					const built=[];
					_ms.add(built,[1,2,3,4]);
					_ms.add(built,[1,2,3,5]);
					return built
				})());
				const y=spread(all_454,1,2,(()=>{
					const built=new (global.Map)();
					_ms.assoc(built,3,4);
					_ms.assoc(built,5,6);
					return built
				})());
				_ms.assert(_ms.unlazy(seq_61_63),y,(()=>{
					const built=[];
					_ms.add(built,[1,2,3,4]);
					_ms.add(built,[1,2,5,6]);
					return built
				})());
				_ms.assert(_ms.unlazy(seq_61_63),spread(all_454,1,2,{
					three:4,
					five:6
				}),(()=>{
					const built=[];
					_ms.add(built,[1,2,`three`,4]);
					_ms.add(built,[1,2,`five`,6]);
					return built
				})())
			};
			return _ms.set(function(fun){
				const args=[].slice.call(arguments,1);
				_ms.checkContains(Function,fun,"fun");
				const init_45args=_ms.unlazy(rtail)(args);
				const last_45arg=_ms.unlazy(last)(args);
				const _64spreaded=(()=>{
					const _=last_45arg;
					if(_ms.contains(_ms.unlazy(Map),_)){
						return _ms.unlazy(_61_62)(Array,_)
					} else if(_ms.contains(_ms.unlazy(_64),_)){
						return (()=>{
							const built=[];
							for(let elem of _){
								_ms.add(built,[elem])
							};
							return built
						})()
					} else if(_ms.contains(_ms.unlazy(ObjLit),_)){
						return _ms.unlazy(_61_62)(Array,_ms.unlazy(Object_45_62Map)(_))
					} else {
						throw new (Error)(`Can only spread a @, Map, or ObjLit, not ${_}`)
					}
				})();
				return _ms.checkContains(_ms.unlazy(_64),(()=>{
					const built=[];
					for(let _ of _64spreaded){
						const all_45args=_ms.unlazy(_43_43)(init_45args,_);
						_ms.add(built,fun(...all_45args))
					};
					return built
				})(),"res")
			},built)
		})();
		const spread_33=exports["spread!"]=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(_61_63),[1,2,3],_ms.unlazy(build)(yield_33=>{
					const f=function f(a,b,c){
						yield_33(a);
						yield_33(b);
						return yield_33(c)
					};
					return spread_33(f,1,(()=>{
						const built=new (global.Map)();
						_ms.assoc(built,2,3);
						return built
					})())
				}))
			};
			return _ms.set(function(fun){
				const args=[].slice.call(arguments,1);
				spread(fun,...args)
			},built)
		})();
		const thunk=exports.thunk=(()=>{
			const built={};
			const doc=built.doc=`Makes function which, when called, returns \`a\`.`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(_61_63),thunk(1)(),1)
			};
			return _ms.set(_=>{
				return ()=>{
					return _
				}
			},built)
		})();
		const curry=(()=>{
			const built={};
			const doc=built.doc=`Creates a function which calls \`f\` with the given arguments first.`;
			const test=built.test=function test(){
				const _431=_ms.sub(_ms.unlazy(_43),1);
				_ms.assert(_ms.unlazy(_61_63),_431(1),2);
				const all_453=function all_453(a,b,c){
					return [a,b,c]
				};
				const one_45two=_ms.sub(all_453,1,2);
				_ms.assert(_ms.unlazy(_61_63),one_45two(3),[1,2,3])
			};
			return _ms.set(Function(`f`,`return Function.prototype.bind.apply(f, arguments)`),built)
		})();
		impl_33(sub,Function,function(){
			const _this=this;
			const args=[].slice.call(arguments,0);
			return curry(_this,...args)
		});
		self_45impl_33(sub,Function,(()=>{
			const built={};
			const doc=built.doc=`Subbing Function does nothing and is only for documentation.
* Function[Number String] takes a Number and returns a String.
* Function[2] takes 2 arguments.
* Function[2 String] takes 2 arguments and returns a String.
* Function without a sub is assumed to be a one-argument function, so never write Function[1].`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(_61_63),_ms.sub(Function,Function,Function),Function)
			};
			return _ms.set(()=>{
				return Function
			},built)
		})());
		const name=exports.name=`Function`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvRnVuY3Rpb24ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFvQkEsNEJBQVEsS0FBSSxjQUNVLEtBQUE7O1NBQXJCLFFBQUE7R0FDQSxvQkFDQztHQUdELG1DQTRMQzs7O0VBMUxGLHdCQUFNLEtBQUksY0FDVSxLQUFBOztTQUFuQixRQUFBO0dBQ0Esb0JBQU07R0FDTixtQ0F1TEM7OztFQXJMRiwwQkFBTyxLQUFJLGNBQ1UsS0FBQTs7U0FBcEIsUUFBQTtHQUNBLG9CQUFNO0dBQ04sbUNBa0xDOzs7RUFoTEYsMEJBQ00sS0FBQTs7R0FBTCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLGlCQUFJLENBQUUsRUFBRSxJQUFTOzs7a0JBQ2pCLENBQUEsRUFBVyxPQUNNO3NCQTJLakI7O1dBM0tBLEVBQUUsR0FBQTtHQUFBOztFQUVKLHdCQUNLLEtBQUE7O0dBQUosb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixpQkFBSSxFQUFFLEdBQU87OztrQkFDYixTQUFBLEVBQ2tCOztzQkFvS2xCO1dBcEtBLEVBQUUsR0FBQTtHQUFBOztFQUVKLHFDQUNTLEtBQUE7O0dBQVIsb0JBQ0M7R0FHRCxzQkFDUSxlQUFBO0lBQVAsU0FDSSxLQUFBOztLQUFILG9CQUFNO29CQUNMLEdBQ0M7YUFBRDtLQUFBOztJQUNGLFNBQ0ksS0FBQTs7S0FBSCxvQkFBTTtvQkFDTixXQUFTOztrQ0FDQyxPQUFRO2tDQUNSLE9BQVE7a0NBQ1AsR0FBRyxHQUFJLEdBQUc7R0FBQTtrQkFFdEIsR0FDVTtzQkFnSlY7V0FBQSw2QkEvSTZCLEVBQUU7R0FBQTs7RUFFakMsZ0NBQ1MsS0FBQTs7R0FBUixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsR0FBTzs7O2tCQUNULEdBQ0M7V0FBRDtHQUFBOztFQUlELHlDQUNXLEtBQUE7O0dBQVYsb0JBQ0M7R0FFRCxzQkFDUSxlQUFBO3FDQUFPLENBQUUsRUFBRSxFQUFFLHFCQUFhLFFBQ0s7S0FBckMsY0FBUSxhQUFZLEdBQ0M7TUFBcEIsT0FBTTthQUNOOztLQUNELFNBQUs7UUFBRztLQUFBO21DQUNJLFFBQU0sSUFBSTttQ0FDVixRQUFNLElBQUk7S0FDdEIsU0FBSztRQUFHO0tBQUE7bUNBQ0ksUUFBTSxJQUFJO0tBQ3RCLFVBQU07UUFBRztLQUFBO21DQUNHLFFBQU0sS0FBSztJQUFBO0dBQUE7a0JBQ3hCLEdBQ1U7c0JBbUhYO0lBbkhDO1dBQ0MsS0FDVTt1QkFxQk47MENBckJRLEdBQUcsaUJBQU0sRUFBRTtJQUFBO0dBQUE7O0VBRTFCLDZDQUNhLEtBQUE7O0dBQVosb0JBQ0M7R0FHRCxzQkFDUSxlQUFBO3FDQUFPLENBQUUsRUFBRSxxQkFBYSxRQUNLO0tBQW5DLGNBQVEsZUFBYyxHQUNDO01BQXRCLE9BQU07YUFDTjs7S0FDRCxTQUFLO1FBQUc7S0FBQTttQ0FDSSxRQUFNLElBQUk7bUNBQ1YsUUFBTSxJQUFJO0tBQ3RCLFNBQUs7UUFBRztLQUFBO21DQUNJLFFBQU0sSUFBSTtLQUN0QixnQkFBVTtRQUFHO0tBQUE7bUNBQ0QsUUFBTSxXQUFTO0lBQUE7R0FBQTtrQkFDNUIsR0FDVTtzQkE2Rlg7SUE3RkM7V0FDQyxLQUNVO3VCQUROOzBDQUNRLEdBQUcsaUJBQU0sRUFBRTtJQUFBO0dBQUE7O0VBRTNCLDRCQUNPLEtBQUE7O0dBQU4sb0JBQU07R0FDTixzQkFDUSxlQUFBO0lBQVAsY0FBUyxpQkFBQSxFQUFFLEVBQUUsRUFBRSxFQUNDO1lBQWYsQ0FBRSxFQUFFLEVBQUUsRUFBRTtJQUFBO3FDQUNNLE9BQU8sUUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFFLEVBQUUsSUFDSSxLQUFBOzttQkFBdkMsQ0FBRSxFQUFFLEVBQUUsRUFBRTttQkFDUixDQUFFLEVBQUUsRUFBRSxFQUFFOzs7SUFFWCxRQUFJLE9BQU8sUUFBTSxFQUFFLEVBQ0MsS0FBQTs7cUJBQW5CLEVBQUs7cUJBQ0wsRUFBSzs7O3FDQUNRLEVBQ0MsS0FBQTs7bUJBQVosQ0FBRSxFQUFFLEVBQUUsRUFBRTttQkFDUixDQUFFLEVBQUUsRUFBRSxFQUFFOzs7cUNBRUksT0FBTyxRQUFNLEVBQUUsRUFBRTtXQUFRO1VBQVE7SUFBQSxHQUNHLEtBQUE7O21CQUFoRCxDQUFFLEVBQUUsRUFBRyxRQUFPO21CQUNkLENBQUUsRUFBRSxFQUFHLE9BQU07Ozs7a0JBR2hCLFNBQUcsSUFDb0I7O3NCQW1FdkI7SUFsRUEsb0NBQWtCO0lBQ2xCLGtDQUFnQjtJQUNoQixrQkFBaUI7S0FBQSxRQUFBO0tBQ2hCLGdDQUFBLEdBQ0k7Z0NBQ0EsTUFBTTtLQUFBLE9BQ1YsZ0NBQUEsR0FDRTthQUFJOztlQUFBLFFBQVEsRUFDQztzQkFBYixDQUFFO09BQUE7OztZQUNKLG1DQUFBLEdBQ087Z0NBTEgsa0NBS007S0FBQSxPQUVOO01BQUgsa0JBQVEsNENBQTBDOzs7NkNBRS9DOzthQUFBLEtBQUEsWUFDUztNQUFiLG9DQUFjLFlBQVU7b0JBQ3RCLElBQUksR0FBQTtLQUFBOzs7OztFQUVULG1DQUNRLEtBQUE7O0dBQVAsb0JBQU07R0FDTixzQkFDUSxlQUFBO2tDQUFJLENBQUUsRUFBRSxFQUFFLHFCQUFZLFVBQ007S0FBbEMsUUFBSyxXQUFBLEVBQUUsRUFBRSxFQUNDO01BQVQsU0FBTztNQUNQLFNBQU87YUFDUCxTQUFPO0tBQUE7WUFDUixVQUFRLEVBQUUsRUFDQyxLQUFBOztzQkFBVixFQUFLOzs7OztrQkFDTixTQUFBLElBQ1c7O0lBQVosT0FBTyxJQUFJLEdBQUE7R0FBQTs7RUFFYiwwQkFDTSxLQUFBOztHQUFMLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtrQ0FBSyxNQUFNLEtBQUs7R0FBQTtrQkFDdkIsR0FDQztXQUNBLElBQUE7WUFBQTtJQUFBO0dBQUE7O0VBRUgsWUFDTyxLQUFBOztHQUFOLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtJQUFQLG1DQUFPO2tDQUNLLEtBQUcsR0FBRztJQUNsQixjQUFTLGlCQUFBLEVBQUUsRUFBRSxFQUNDO1lBQWIsQ0FBRSxFQUFFLEVBQUU7SUFBQTtJQUNQLHdCQUFVLFFBQU0sRUFBRTtrQ0FDTixVQUFRLEdBQUcsQ0FBRSxFQUFFLEVBQUU7R0FBQTtrQkFtQjdCLFNBbEJTLElBQUk7O0VBS2YsUUFBTSxJQWFKLFNBYm1CLFVBQ087U0FBckI7O1VBQU4sTUFBTSxNQUFLLEdBQUE7RUFBQTtFQUVaLGVBQVcsSUFVVCxTQVRxQixLQUFBOztHQUF0QixvQkFDQztHQUtELHNCQUNRLGVBQUE7MENBRVA7R0FBQTtrQkFBQSxJQUFBO1dBQUE7R0FBQTs7RUF0TkYsd0JBQUEiLCJmaWxlIjoiRnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==