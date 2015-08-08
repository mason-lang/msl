"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./methods","./Type/Alias-Type","./Type/Method","./at/at","./at/at-Type","./at/Map/Hash-Map","./at/Map/Map","./at/Map/Weak-Id-Map","./at/Seq/Seq","./Object","./Type/Pred-Type","./Type/Type","./at/Seq/Seq","./compare","./control","./math/methods"],(exports,methods_0,Alias_45Type_1,Method_2,_64_3,_64_45Type_4,Hash_45Map_5,Map_6,Weak_45Id_45Map_7,Seq_8,Object_9,Pred_45Type_10,Type_11,Seq_12,compare_13,control_14,methods_15)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(methods_0),sub=_ms.get(_$2,"sub"),Alias_45Type=_ms.getDefaultExport(Alias_45Type_1),_$4=_ms.getModule(Method_2),impl_33=_ms.get(_$4,"impl!"),self_45impl_33=_ms.get(_$4,"self-impl!"),_64=_ms.lazy(()=>{
			return _ms.getDefaultExport(_64_3)
		}),_$6=_ms.lazyGetModule(_64_3),_43_43=_ms.lazyProp(_$6,"++"),_$7=_ms.lazyGetModule(_64_45Type_4),empty=_ms.lazyProp(_$7,"empty"),Hash_45Map=_ms.lazy(()=>{
			return _ms.getDefaultExport(Hash_45Map_5)
		}),Map=_ms.lazy(()=>{
			return _ms.getDefaultExport(Map_6)
		}),_$9=_ms.lazyGetModule(Map_6),get_45or_45add_33=_ms.lazyProp(_$9,"get-or-add!"),Weak_45Id_45Map=_ms.lazy(()=>{
			return _ms.getDefaultExport(Weak_45Id_45Map_7)
		}),_$11=_ms.lazyGetModule(Seq_8),rtail=_ms.lazyProp(_$11,"rtail"),last=_ms.lazyProp(_$11,"last"),_$12=_ms.lazyGetModule(Object_9),Object_45_62Map=_ms.lazyProp(_$12,"Object->Map"),_$13=_ms.lazyGetModule(Pred_45Type_10),ObjLit=_ms.lazyProp(_$13,"ObjLit"),_$14=_ms.lazyGetModule(Type_11),_61_62=_ms.lazyProp(_$14,"=>"),_$16=_ms.lazyGetModule(Seq_12),seq_61_63=_ms.lazyProp(_$16,"seq=?"),_$17=_ms.lazyGetModule(compare_13),_61_63=_ms.lazyProp(_$17,"=?"),_$18=_ms.lazyGetModule(control_14),build=_ms.lazyProp(_$18,"build"),_$19=_ms.lazyGetModule(methods_15),_43=_ms.lazyProp(_$19,"+");
		const Action=exports.Action=new (Alias_45Type)((()=>{
			const built={};
			const doc=built.doc=`A function returning nothing.\nFunction[Number] describes a Function taking nothing and returning a Number;\nAction[Number] describes a Function taking a Number and returning nothing.`;
			const alias_45of=built["alias-of"]=Function;
			return _ms.setName(built,"Action")
		})());
		const Pred=exports.Pred=new (Alias_45Type)((()=>{
			const built={};
			const doc=built.doc=`Function[Any Boolean].`;
			const alias_45of=built["alias-of"]=Function;
			return _ms.setName(built,"Pred")
		})());
		const Thunk=exports.Thunk=new (Alias_45Type)((()=>{
			const built={};
			const doc=built.doc=`Function with no args returning a value.`;
			const alias_45of=built["alias-of"]=Function;
			return _ms.setName(built,"Thunk")
		})());
		const apply=exports.apply=(()=>{
			const built={};
			const doc=built.doc=`Calls the function with the given arguments list.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[_ms.unlazy(_43),[1,2]],3);
				return built
			};
			return _ms.set(function apply(_,args){
				_ms.checkContains(Function,_,"_");
				_ms.checkContains(_ms.unlazy(_64),args,"args");
				return Function.apply.call(_,null,[].concat(_ms.arr(args)))
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
			return _ms.set(function call(_){
				const args=[].slice.call(arguments,1);
				_ms.checkContains(Function,_,"_");
				return Function.apply.call(_,null,[].concat(_ms.arr(args)))
			},built)
		})();
		const fun_45copy=exports["fun-copy"]=(()=>{
			const built={};
			const doc=built.doc=`Creates a new function with identical functionality.\n*Does* copy any values captured by its scope.\nDoes *not* copy any properties on the old function.`;
			const test=built.test=function test(){
				const f1=(()=>{
					const built={};
					const doc=built.doc=`f1`;
					return _ms.set(function f1(_){
						return _
					},built)
				})();
				const f2=(()=>{
					const built={};
					const doc=built.doc=`f2`;
					return _ms.set(fun_45copy(f1),built,"f2")
				})();
				_ms.assert(_ms.unlazy(_61_63),f1.doc,`f1`);
				_ms.assert(_ms.unlazy(_61_63),f2.doc,`f2`);
				_ms.assert(_ms.unlazy(_61_63),f1(1),f2(1))
			};
			return _ms.set(function fun_45copy(_){
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
			return _ms.set(function identity(_){
				return _
			},built)
		})();
		const noop=exports.noop=(()=>{
			const built={};
			const doc=built.doc=`Does nothing.`;
			return _ms.set(function noop(){},built)
		})();
		const id_45memoize=exports["id-memoize"]=(()=>{
			const built={};
			const doc=built.doc=`When an Object is passed into \`fun\`, stores the result in a Weak-Id-Map\nand uses that if the exact same (\`id=?\`) Object is used again.`;
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
			return _ms.set(function id_45memoize(_){
				_ms.checkContains(Function,_,"_");
				const wm=_ms.unlazy(empty)(_ms.unlazy(Weak_45Id_45Map));
				return arg=>{
					_ms.checkContains(Object,arg,"arg");
					return _ms.unlazy(get_45or_45add_33)(wm,arg,_ms.lazy(()=>{
						return _(arg)
					}))
				}
			},built)
		})();
		const hash_45memoize=exports["hash-memoize"]=(()=>{
			const built={};
			const doc=built.doc=`Stores the argument every time you call it,\nand re-uses the result if called again with the same argument.\nThis will make those arguments unavailable for garbage collection...`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(seq_61_63),[1,2],_ms.unlazy(build)(_yield=>{
					const get_45a=hash_45memoize(x=>{
						_yield(x.a);
						return x.a
					});
					const a1=call(()=>{
						const built={};
						const a=built.a=1;
						return built
					});
					_ms.assert(_ms.unlazy(_61_63),get_45a(a1),1);
					_ms.assert(_ms.unlazy(_61_63),get_45a(a1),1);
					const a2={
						a:2
					};
					_ms.assert(_ms.unlazy(_61_63),get_45a(a2),2);
					const a1b=call(()=>{
						const built={};
						const a=built.a=1;
						return built
					});
					_ms.assert(_ms.unlazy(_61_63),a1,a1b);
					_ms.assert(_ms.unlazy(_61_63),get_45a(a1b),1)
				}))
			};
			return _ms.set(function hash_45memoize(_){
				_ms.checkContains(Function,_,"_");
				const hm=_ms.unlazy(empty)(_ms.unlazy(Hash_45Map));
				return arg=>{
					_ms.checkContains(Object,arg,"arg");
					return _ms.unlazy(get_45or_45add_33)(hm,arg,_ms.lazy(()=>{
						return _(arg)
					}))
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
			return _ms.set(function spread(fun){
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
						throw _ms.error(`Can only spread a @, Map, or ObjLit, not ${_}`)
					}
				})();
				return _ms.checkContains(_ms.unlazy(_64),(()=>{
					const built=[];
					for(let _ of _64spreaded){
						const all_45args=_ms.unlazy(_43_43)(init_45args,_);
						_ms.add(built,Function.apply.call(fun,null,[].concat(_ms.arr(all_45args))))
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
			return _ms.set(function spread_33(fun){
				const args=[].slice.call(arguments,1);
				Function.apply.call(spread,null,[].concat(fun,_ms.arr(args)))
			},built)
		})();
		const thunk=exports.thunk=(()=>{
			const built={};
			const doc=built.doc=`Makes function which, when called, returns \`a\`.`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(_61_63),thunk(1)(),1)
			};
			return _ms.set(function thunk(_){
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
			return _ms.set(Function(`f`,`return Function.prototype.bind.apply(f, arguments)`),built,"curry")
		})();
		impl_33(sub,Function,function(){
			const _this=this;
			const args=[].slice.call(arguments,0);
			return Function.apply.call(curry,null,[].concat(_this,_ms.arr(args)))
		});
		self_45impl_33(sub,Function,(()=>{
			const built={};
			const doc=built.doc=`Subbing Function does nothing and is only for documentation.\n* Function[Number String] takes a Number and returns a String.\n* Function[2] takes 2 arguments.\n* Function[2 String] takes 2 arguments and returns a String.\n* Function without a sub is assumed to be a one-argument function, so never write Function[1].`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9GdW5jdGlvbi5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBb0JBLDRCQUFRLEtBQUksY0FDVSxLQUFBOztHQUFyQixvQkFDQztHQUdELG1DQUFVOzs7RUFFWCx3QkFBTSxLQUFJLGNBQ1UsS0FBQTs7R0FBbkIsb0JBQU07R0FDTixtQ0FBVTs7O0VBRVgsMEJBQU8sS0FBSSxjQUNVLEtBQUE7O0dBQXBCLG9CQUFNO0dBQ04sbUNBQVU7OztFQUVYLDBCQUNNLEtBQUE7O0dBQUwsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixpQkFBSSxDQUFFLEVBQUUsSUFBUzs7O2tCQUNqQixlQUFBLEVBQVcsS0FDTTtzQkFEZjs7K0JBQ0YseUJBQUU7R0FBQTs7RUFFSix3QkFDSyxLQUFBOztHQUFKLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4saUJBQUksRUFBRSxHQUFPOzs7a0JBQ2IsY0FBQSxFQUNrQjs7c0JBRGhCOytCQUNGLHlCQUFFO0dBQUE7O0VBRUoscUNBQ1MsS0FBQTs7R0FBUixvQkFDQztHQUdELHNCQUNRLGVBQUE7SUFBUCxTQUNJLEtBQUE7O0tBQUgsb0JBQU07b0JBQ0wsWUFBQSxFQUNDO2FBQUQ7S0FBQTs7SUFDRixTQUNJLEtBQUE7O0tBQUgsb0JBQU07b0JBQ04sV0FBUzs7a0NBQ0MsT0FBUTtrQ0FDUixPQUFRO2tDQUNQLEdBQUcsR0FBSSxHQUFHO0dBQUE7a0JBRXRCLG9CQUFBLEVBQ1U7c0JBRFI7V0FFRiw2QkFBNkIsRUFBRTtHQUFBOztFQUVqQyxnQ0FDUyxLQUFBOztHQUFSLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxHQUFPOzs7a0JBQ1Qsa0JBQUEsRUFDQztXQUFEO0dBQUE7O0VBRUYsd0JBQ0ssS0FBQTs7R0FBSixvQkFBTTtrQkFFSixlQUFBOztFQUlGLHlDQUNXLEtBQUE7O0dBQVYsb0JBQ0M7R0FFRCxzQkFDUSxlQUFBO3FDQUFPLENBQUUsRUFBRSxFQUFFLHFCQUFhLFFBQ0s7S0FBckMsY0FBUSxhQUFZLEdBQ0M7TUFBcEIsT0FBTTthQUNOOztLQUNELFNBQUs7UUFBRztLQUFBO21DQUNJLFFBQU0sSUFBSTttQ0FDVixRQUFNLElBQUk7S0FDdEIsU0FBSztRQUFHO0tBQUE7bUNBQ0ksUUFBTSxJQUFJO0tBQ3RCLFVBQU07UUFBRztLQUFBO21DQUNHLFFBQU0sS0FBSztJQUFBO0dBQUE7a0JBQ3hCLHNCQUFBLEVBQ1U7c0JBRFI7SUFDRjtXQUNDLEtBQ1U7dUJBRE47MENBQ1EsR0FBRzthQUFNLEVBQUU7S0FBQTtJQUFBO0dBQUE7O0VBRTFCLDZDQUNhLEtBQUE7O0dBQVosb0JBQ0M7R0FHRCxzQkFDUSxlQUFBO3FDQUFPLENBQUUsRUFBRSxxQkFBYSxRQUNLO0tBQW5DLGNBQVEsZUFBYyxHQUNDO01BQXRCLE9BQU07YUFDTjs7S0FDRCxTQUFLLEtBQ3lCLElBQUE7O01BQTdCLGdCQUFHOzs7bUNBQ1EsUUFBTSxJQUFJO21DQUNWLFFBQU0sSUFBSTtLQUN0QixTQUFLO1FBQUc7S0FBQTttQ0FDSSxRQUFNLElBQUk7S0FDdEIsVUFBTSxLQUN5QixJQUFBOztNQUE5QixnQkFBRzs7O21DQUNPLEdBQUc7bUNBQ0YsUUFBTSxLQUFLO0lBQUE7R0FBQTtrQkFDeEIsd0JBQUEsRUFDVTtzQkFEUjtJQUNGO1dBQ0MsS0FDVTt1QkFETjswQ0FDUSxHQUFHO2FBQU0sRUFBRTtLQUFBO0lBQUE7R0FBQTs7RUFFM0IsNEJBQ08sS0FBQTs7R0FBTixvQkFBTTtHQUNOLHNCQUNRLGVBQUE7SUFBUCxjQUFTLGlCQUFBLEVBQUUsRUFBRSxFQUFFLEVBQ0M7WUFBZixDQUFFLEVBQUUsRUFBRSxFQUFFO0lBQUE7cUNBQ00sT0FBTyxRQUFNLEVBQUUsRUFBRSxFQUFFLENBQUUsRUFBRSxJQUNJLEtBQUE7O21CQUF2QyxDQUFFLEVBQUUsRUFBRSxFQUFFO21CQUNSLENBQUUsRUFBRSxFQUFFLEVBQUU7OztJQUVYLFFBQUksT0FBTyxRQUFNLEVBQUUsRUFDQyxLQUFBOztxQkFBbkIsRUFBSztxQkFDTCxFQUFLOzs7cUNBQ1EsRUFDQyxLQUFBOzttQkFBWixDQUFFLEVBQUUsRUFBRSxFQUFFO21CQUNSLENBQUUsRUFBRSxFQUFFLEVBQUU7OztxQ0FFSSxPQUFPLFFBQU0sRUFBRSxFQUFFO1dBQVE7VUFBUTtJQUFBLEdBQ0csS0FBQTs7bUJBQWhELENBQUUsRUFBRSxFQUFHLFFBQU87bUJBQ2QsQ0FBRSxFQUFFLEVBQUcsT0FBTTs7OztrQkFHaEIsZ0JBQUcsSUFDb0I7O3NCQURoQjtJQUVQLG9DQUFrQjtJQUNsQixrQ0FBZ0I7SUFDaEIsa0JBQWlCO0tBQUEsUUFBQTtLQUNoQixnQ0FBQSxHQUNJO2dDQUNBLE1BQU07S0FBQSxPQUNWLGdDQUFBLEdBQ0U7YUFBSTs7ZUFBQSxRQUFRLEVBQ0M7c0JBQWIsQ0FBRTtPQUFBOzs7WUFDSixtQ0FBQSxHQUNPO2dDQUFILGtDQUFpQjtLQUFBLE9BRWpCO01BQUgsZ0JBQVEsNENBQTBDOzs7NkNBRS9DOzthQUFBLEtBQUEsWUFDUztNQUFiLG9DQUFjLFlBQVU7d0NBQ3RCLDJCQUFJO0tBQUE7Ozs7O0VBRVQsbUNBQ1EsS0FBQTs7R0FBUCxvQkFBTTtHQUNOLHNCQUNRLGVBQUE7a0NBQUksQ0FBRSxFQUFFLEVBQUUscUJBQVksVUFDTTtLQUFsQyxRQUFLLFdBQUEsRUFBRSxFQUFFLEVBQ0M7TUFBVCxTQUFPO01BQ1AsU0FBTzthQUNQLFNBQU87S0FBQTtZQUNSLFVBQVEsRUFBRSxFQUNDLEtBQUE7O3NCQUFWLEVBQUs7Ozs7O2tCQUNOLG1CQUFBLElBQ1c7O3dCQUFaLHNCQUFPLFlBQUk7R0FBQTs7RUFFYiwwQkFDTSxLQUFBOztHQUFMLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtrQ0FBSyxNQUFNLEtBQUs7R0FBQTtrQkFDdkIsZUFBQSxFQUNDO1dBQ0EsSUFBQTtZQUFBO0lBQUE7R0FBQTs7RUFFSCxZQUNPLEtBQUE7O0dBQU4sb0JBQU07R0FDTixzQkFDUSxlQUFBO0lBQVAsbUNBQU87a0NBQ0ssS0FBRyxHQUFHO0lBQ2xCLGNBQVMsaUJBQUEsRUFBRSxFQUFFLEVBQ0M7WUFBYixDQUFFLEVBQUUsRUFBRTtJQUFBO0lBQ1Asd0JBQVUsUUFBTSxFQUFFO2tDQUNOLFVBQVEsR0FBRyxDQUFFLEVBQUUsRUFBRTtHQUFBO2tCQUM5QixTQUFVLElBQUk7O0VBS2YsUUFBTSxJQUFJLFNBQVcsVUFDTztTQUFyQjs7OEJBQU4scUJBQU0sY0FBSztFQUFBO0VBRVosZUFBVyxJQUFJLFNBQ1EsS0FBQTs7R0FBdEIsb0JBQ0M7R0FLRCxzQkFDUSxlQUFBOzBDQUFJLFNBQVMsU0FBUyxVQUFVO0dBQUE7a0JBRXZDLElBQUE7V0FBQTtHQUFBOztFQTNORix3QkFBQSIsImZpbGUiOiJGdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9