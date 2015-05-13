"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Bool","../compare","../Fun","../js","../math/methods","../Obj","../private/bootstrap","../Type/Type","../Type/Kind","../Type/Method","../Type/Pred-Type","../control","../math/Num","./atbang","./at-Type","./q","./Seq/Seq","./Seq/Stream","./Set/Setbang","../control","../bang","../math/Num","../Try","./at-Type","./Map/Weak-Id-Mapbang"],function(exports,Bool_0,compare_1,Fun_2,js_3,methods_4,Obj_5,bootstrap_6,Type_7,Kind_8,Method_9,Pred_45Type_10,control_11,Num_12,_64_33_13,_64_45Type_14,_63_15,Seq_16,Stream_17,Set_33_18,control_19,_33_20,Num_21,Try_22,_64_45Type_23,Weak_45Id_45Map_33_24){
	exports._get=_ms.lazy(function(){
		const Bool=_ms.getDefaultExport(Bool_0),_$2=_ms.getModule(Bool_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),Fun=_ms.getDefaultExport(Fun_2),_$4=_ms.getModule(Fun_2),Act=_ms.get(_$4,"Act"),identity=_ms.get(_$4,"identity"),Pred=_ms.get(_$4,"Pred"),_$5=_ms.getModule(js_3),defined_63=_ms.get(_$5,"defined?"),id_61_63=_ms.get(_$5,"id=?"),_$6=_ms.getModule(methods_4),_43=_ms.get(_$6,"+"),Obj=_ms.getDefaultExport(Obj_5),_$8=_ms.getModule(bootstrap_6),msDef=_ms.get(_$8,"msDef"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),contains_63=_ms.get(_$9,"contains?"),type_45of=_ms.get(_$9,"type-of"),Kind=_ms.getDefaultExport(Kind_8),Method=_ms.getDefaultExport(Method_9),_$11=_ms.getModule(Method_9),impl_33=_ms.get(_$11,"impl!"),_$12=_ms.getModule(Pred_45Type_10),Any=_ms.get(_$12,"Any"),Opt=_ms.get(_$12,"Opt"),_$14=_ms.lazyGetModule(control_11),opr=_ms.lazyProp(_$14,"opr"),Ref_33=_ms.lazyProp(_$14,"Ref!"),get=_ms.lazyProp(_$14,"get"),set_33=_ms.lazyProp(_$14,"set!"),_$15=_ms.lazyGetModule(Num_12),Nat=_ms.lazyProp(_$15,"Nat"),_$16=_ms.lazyGetModule(_64_33_13),_45_45_33=_ms.lazyProp(_$16,"--!"),_$17=_ms.lazyGetModule(_64_45Type_14),empty=_ms.lazyProp(_$17,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_15)
		}),_$19=_ms.lazyGetModule(Seq_16),first=_ms.lazyProp(_$19,"first"),seq_61_63=_ms.lazyProp(_$19,"seq=?"),tail=_ms.lazyProp(_$19,"tail"),Stream=_ms.lazy(function(){
			return _ms.getDefaultExport(Stream_17)
		}),Set_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Set_33_18)
		}),_$23=_ms.lazyGetModule(control_19),build=_ms.lazyProp(_$23,"build"),if_33=_ms.lazyProp(_$23,"if!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_20)
		}),_$24=_ms.lazyGetModule(_33_20),_33not=_ms.lazyProp(_$24,"!not"),_$25=_ms.lazyGetModule(Num_21),divisible_63=_ms.lazyProp(_$25,"divisible?"),_$26=_ms.lazyGetModule(Try_22),fails_63=_ms.lazyProp(_$26,"fails?"),_64_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_45Type_23)
		}),Weak_45Id_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Weak_45Id_45Map_33_24)
		});
		const _64=Kind(function(){
			const doc="\"Bag\". Contains a variable number of elements. Most things implementing `iterator` should be @s.\nIf the iteration order of an @ is meaningful and `+ a b` is the concatenation, it is a Seq.\nIf an @ only stores a given element once, it is a Set.";
			const implementor_45test=_ms.set(function(_64_45type){
				return _ms.unlazy(if_33)(not(_61_63(_64_45type,_ms.unlazy(Weak_45Id_45Map_33))),function(){
					_ms.unlazy(_33)(contains_63(_ms.unlazy(_64_45Type),_64_45type),"Be sure to make your @ type a @-Type.");
					const _=_ms.unlazy(empty)(_64_45type);
					return _ms.unlazy(_33)(empty_63,_)
				})
			},"displayName","implementor-test");
			return {
				doc:doc,
				"implementor-test":implementor_45test,
				displayName:"@"
			}
		}());
		const iterator=exports.iterator=Method(function(){
			const doc="Creates a new Generator! which yields the values in the @.";
			return {
				doc:doc,
				displayName:"iterator"
			}
		}());
		msDef("iterator",iterator);
		const empty_63=exports["empty?"]=Method(function(){
			const doc="Whether `count` is 0. Often much faster.";
			const test=_ms.set(function(){
				const _k0=[[]],_v0=true;
				const _k1=[[1]],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			const _default=_ms.set(function(_){
				return _ms.checkContains(Bool,iterator(_).next().done,"res")
			},"displayName","default");
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"empty?"
			}
		}());
		impl_33(contains_63,_64,function(){
			const doc="Whether one of the elements =? em.";
			const test=_ms.set(function(){
				_ms.unlazy(_33)(contains_63,[0],0);
				return _ms.unlazy(_33not)(contains_63,[0],1)
			},"displayName","test");
			return _ms.set(function(_,em){
				_ms.checkContains(Any,em,"em");
				return any_63(_,function(em_45compare){
					return _61_63(em,em_45compare)
				})
			},"doc",doc,"test",test)
		}());
		const fold=exports.fold=function(){
			const doc="Keeps a state variable `acc` and keeps applying `folder acc em` for the elements, in order.\nReturns the final value.\nIf empty?_, fails unless a `start` value for `acc` is provided. Otherwise `acc` starts as the first element.";
			const test=_ms.set(function(){
				const _k0=[[1,2,3],_43],_v0=6;
				const _k1=[[1,2,3],4,_43],_v1=10;
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			return _ms.set(function(_,b,c){
				_ms.checkContains(_64,_,"_");
				const _$72=function(){
					if(_ms.bool(defined_63(c))){
						const start=b;
						const folder=c;
						const rest=_;
						return {
							start:start,
							folder:folder,
							rest:rest
						}
					} else {
						const start=_ms.unlazy(first)(_);
						const folder=b;
						const rest=_ms.unlazy(tail)(_);
						return {
							start:start,
							folder:folder,
							rest:rest
						}
					}
				}(),start=_$72.start,rest=_$72.rest,folder=_$72.folder;
				const acc=_ms.unlazy(Ref_33)(start);
				const iter=iterator(rest);
				loop84:while(true){
					const _$85=iter.next(),value=_$85.value,done=_$85.done;
					if(_ms.bool(done)){
						break loop84
					} else {
						_ms.unlazy(set_33)(acc,folder(_ms.unlazy(get)(acc),value))
					}
				};
				return _ms.unlazy(get)(acc)
			},"doc",doc,"test",test,"displayName","fold")
		}();
		const each_33=exports["each!"]=Method(function(){
			const doc="Calls do-for-each on every element in the @, in order.";
			const test=_ms.set(function(){
				return _ms.unlazy(_33)(_61_63,[1,2,3],_ms.unlazy(build)(function(_yield){
					return each_33([1,2,3],_yield)
				}))
			},"displayName","test");
			const _default=_ms.set(function(_,do_45for_45each){
				_ms.checkContains(Act,do_45for_45each,"do-for-each");
				const iter=iterator(_);
				loop100:while(true){
					const _$101=iter.next(),value=_$101.value,done=_$101.done;
					if(_ms.bool(done)){
						break loop100
					} else {
						do_45for_45each(value)
					}
				}
			},"displayName","default");
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"each!"
			}
		}());
		const any_63=exports["any?"]=function(){
			const doc="Whether pred? is true for at least one element.";
			const test=_ms.set(function(){
				const _k0=[[0,1],_ms.sub(_61_63,1)],_v0=true;
				const _k1=[[0,1],_ms.sub(_61_63,2)],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			return _ms.set(function(_,_63pred_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_ms.sub(Opt,Pred),_63pred_63,"?pred?");
				const pred_63=_ms.unlazy(opr)(_63pred_63,identity);
				return not(empty_63(_63find(_,pred_63)))
			},"doc",doc,"test",test,"displayName","any?")
		}();
		const all_63=exports["all?"]=function(){
			const doc="Whether pred? is true for every element.";
			const test=_ms.set(function(){
				const _k0=[[0,0],_ms.sub(_61_63,0)],_v0=true;
				const _k1=[[0,1],_ms.sub(_61_63,0)],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			return _ms.set(function(_,_63pred_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_ms.sub(Opt,Pred),_63pred_63,"?pred?");
				const pred_63=_ms.unlazy(opr)(_63pred_63,identity);
				return empty_63(_63find(_,function(em){
					return not(pred_63(em))
				}))
			},"doc",doc,"test",test,"displayName","all?")
		}();
		const _63find=exports["?find"]=function(){
			const doc="First element for which pred? is true.\n(To find all, use `keep`.)";
			const test=_ms.set(function(){
				const _k0=[[0,1],_ms.sub(_61_63,1)],_v0=_ms.unlazy(_63)(1);
				const _k1=[[0],_ms.sub(_61_63,1)],_v1=_ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			return _ms.set(function(_,pred_63){
				_ms.checkContains(Pred,pred_63,"pred?");
				const iter=iterator(_);
				const found=_ms.unlazy(Ref_33)(_ms.unlazy(empty)(_ms.unlazy(_63)));
				loop138:while(true){
					const _$139=iter.next(),value=_$139.value,done=_$139.done;
					if(_ms.bool(done)){
						break loop138
					} else if(_ms.bool(pred_63(value))){
						_ms.unlazy(set_33)(found,_ms.unlazy(_63)(value));
						break loop138
					} else {
						null
					}
				};
				return _ms.unlazy(get)(found)
			},"doc",doc,"test",test,"displayName","?find")
		}();
		const count=exports.count=Method(function(){
			const doc="Number of elements.";
			const test=_ms.set(function(){
				const _k0=[[]],_v0=0;
				const _k1=[[1,2,3]],_v1=3;
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			const _default=_ms.set(function(_){
				_ms.checkContains(_64,_,"_");
				return _ms.checkContains(_ms.unlazy(Nat),fold(_,0,_ms.sub(_43,1)),"res")
			},"displayName","default");
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"count"
			}
		}());
		const keep=exports.keep=Method(function(){
			const doc="Only the elements that satisfy `keep-if?`.";
			const test=_ms.set(function(){
				const _k0=[[1,2],_ms.sub(_61_63,2)],_v0=[2];
				return _ms.map(_k0,_v0)
			},"displayName","test");
			const _default=_ms.set(function(_,keep_45if_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Pred,keep_45if_63,"keep-if?");
				return _61_62(type_45of(_),keep_39(_,keep_45if_63))
			},"displayName","default");
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"keep"
			}
		}());
		const keep_39=exports["keep'"]=function(){
			const doc="Lazy keep.";
			const test=_ms.set(function(){
				const _k0=[[1,2],_ms.sub(_61_63,2)],_v0=_61_62(_ms.unlazy(Stream),[2]);
				return _ms.map(_k0,_v0)
			},"displayName","test");
			return _ms.set(function(_,keep_45if_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Pred,keep_45if_63,"keep-if?");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop174:while(true){
						const _$175=iter.next(),value=_$175.value,done=_$175.done;
						if(_ms.bool(done)){
							break loop174
						} else if(_ms.bool(keep_45if_63(value))){
							(yield value)
						} else {
							null
						}
					}
				})
			},"doc",doc,"test",test,"displayName","keep'")
		}();
		const map=exports.map=function(){
			const doc="TODO";
			const test=_ms.set(function(){
				const _k0=[[true,false],not],_v0=[false,true];
				return _ms.map(_k0,_v0)
			},"displayName","test");
			return _ms.set(function(_,mapper){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Fun,mapper,"mapper");
				return _61_62(type_45of(_),map_39(_,mapper))
			},"doc",doc,"test",test,"displayName","map")
		}();
		const map_39=exports["map'"]=function(){
			const doc="Lazy map.";
			const test=_ms.set(function(){
				const _k0=[[true,false],not],_v0=_61_62(_ms.unlazy(Stream),[false,true]);
				return _ms.map(_k0,_v0)
			},"displayName","test");
			return _ms.set(function(_,mapper){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Fun,mapper,"mapper");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop199:while(true){
						const _$200=iter.next(),value=_$200.value,done=_$200.done;
						if(_ms.bool(done)){
							break loop199
						} else {
							(yield mapper(value))
						}
					}
				})
			},"doc",doc,"test",test,"displayName","map'")
		}();
		const fold_45map=exports["fold-map"]=function(){
			const doc="Performs a map while also carrying some state from one element to the next.\n`mapper-folder` takes in the state and the element,\nand produces `here` (the mapped value) and `next` (the next state value).\nUnlike map, this must be eagerly evaluated, like fold.";
			const test=_ms.set(function(){
				const f=_ms.set(function(acc,em){
					const here=_43(1,em);
					const next=_43(1,acc);
					return {
						here:here,
						next:next
					}
				},"displayName","f");
				const _k0=[[1,2,3],0,f],_v0=function(){
					const mapped=[2,3,4];
					const folded=3;
					return {
						mapped:mapped,
						folded:folded
					}
				}();
				return _ms.map(_k0,_v0)
			},"displayName","test");
			return _ms.set(function(_,start,mapper_45folder){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Any,start,"start");
				_ms.checkContains(_ms.sub(Fun,2,Obj),mapper_45folder,"mapper-folder");
				const acc=_ms.unlazy(Ref_33)(start);
				const mapped=_61_62(Array,map(_,_ms.set(function(em){
					const _$225=mapper_45folder(_ms.unlazy(get)(acc),em),here=_ms.checkContains(Any,_$225.here,"here"),next=_ms.checkContains(Any,_$225.next,"next");
					_ms.unlazy(set_33)(acc,next);
					return here
				},"displayName","mapped")));
				const folded=_ms.unlazy(get)(acc);
				return {
					mapped:mapped,
					folded:folded
				}
			},"doc",doc,"test",test,"displayName","fold-map")
		}();
		const flat_45map=exports["flat-map"]=Method(function(){
			const doc="Like `map`, but each mapping produces multiple values.";
			const test=_ms.set(function(){
				const f=_ms.set(function(a){
					return [a,a]
				},"displayName","f");
				const _k0=[[1,2],f],_v0=[1,1,2,2];
				return _ms.map(_k0,_v0)
			},"displayName","test");
			const _default=_ms.set(function(_,mapper){
				_ms.checkContains(_ms.sub(Fun,Any,_64),mapper,"mapper");
				return _61_62(type_45of(_),flat_45map_39(_,mapper))
			},"displayName","default");
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"flat-map"
			}
		}());
		const flat_45map_39=exports["flat-map'"]=function(){
			const doc="Lazy flat-map.";
			const test=_ms.set(function(){
				const f=_ms.set(function(_){
					return function(){
						if(_ms.bool(_ms.unlazy(divisible_63)(_,2))){
							return [_,_]
						} else {
							return [_]
						}
					}()
				},"displayName","f");
				const _k0=[[1,2,3,4],f],_v0=_61_62(_ms.unlazy(Stream),[1,2,2,3,4,4]);
				return _ms.map(_k0,_v0)
			},"displayName","test");
			return _ms.set(function(_,mapper){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_ms.sub(Fun,Any,_64),mapper,"mapper");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop253:while(true){
						const _$254=iter.next(),value=_$254.value,done=_$254.done;
						if(_ms.bool(done)){
							break loop253
						} else {
							(yield* iterator(mapper(value)))
						}
					}
				})
			},"doc",doc,"test",test,"displayName","flat-map'")
		}();
		const flatten=exports.flatten=Method(function(){
			const doc="For an @ containing many @, produces an @ containing all of their entries combined.\nThis does *not* consider more than 1 nested level, and there *every* element of _ must be an @.\nMore efficient than `fold + _`.";
			const test=_ms.set(function(){
				const _k0=[[[1,2],[3],[]]],_v0=[1,2,3];
				return _ms.map(_k0,_v0)
			},"displayName","test");
			const _default=_ms.set(function(_){
				return _61_62(type_45of(_),flatten_39(_))
			},"displayName","default");
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"flatten"
			}
		}());
		const flatten_39=exports["flatten'"]=function(){
			const doc="Lazy flatten.";
			const test=_ms.set(function(){
				const _k0=[[[1,2],[3],[]]],_v0=_61_62(_ms.unlazy(Stream),[1,2,3]);
				const _k1=[[[1],[[2]]]],_v1=_61_62(_ms.unlazy(Stream),[1,[2]]);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return _61_62(Array,flatten([[1],2,[3]]))
				});
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			return _ms.set(function(_){
				_ms.checkContains(_ms.sub(_64,_64),_,"_");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop284:while(true){
						const _$285=iter.next(),value=_$285.value,done=_$285.done;
						if(_ms.bool(done)){
							break loop284
						} else {
							(yield* iterator(value))
						}
					}
				})
			},"doc",doc,"test",test,"displayName","flatten'")
		}();
		const _43_43=exports["++"]=Method(function(){
			const doc="Type-preserving +.";
			const test=_ms.set(function(){
				const _k0=[[0],[1]],_v0=[0,1];
				return _ms.map(_k0,_v0)
			},"displayName","test");
			const _default=_ms.set(function(_64a,_64b){
				return _61_62(type_45of(_64a),_43_43_39(_64a,_64b))
			},"displayName","default");
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"++"
			}
		}());
		const _43_43_39=exports["++'"]=function(){
			const doc="Concatenation. Sets should override this.";
			const test=_ms.set(function(){
				const _k0=[[0],[1]],_v0=_61_62(_ms.unlazy(Stream),[0,1]);
				return _ms.map(_k0,_v0)
			},"displayName","test");
			return _ms.set(function(_64a,_64b){
				return _ms.checkContains(_ms.unlazy(Stream),_ms.unlazy(Stream)(function*(){
					(yield* iterator(_64a));
					return (yield* iterator(_64b))
				}),"res")
			},"doc",doc,"test",test,"displayName","++'")
		}();
		const _45_45=exports["--"]=Method(function(){
			const doc="@ without any of the elements in `remove`.\nRemoves the *first* occurrence of each element.";
			const test=_ms.set(function(){
				const _k0=[[1,2,1],[1]],_v0=[2,1];
				return _ms.map(_k0,_v0)
			},"displayName","test");
			const _default=_ms.set(function(_,_64remove){
				_ms.checkContains(_64,_64remove,"@remove");
				return _61_62(type_45of(_),_45_45_39(_,_64remove))
			},"displayName","default");
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"--"
			}
		}());
		const _45_45_39=exports["--'"]=function(){
			const doc="Lazy --.";
			const test=_ms.set(function(){
				const _k0=[[1,2,1],[1]],_v0=_61_62(_ms.unlazy(Stream),[2,1]);
				return _ms.map(_k0,_v0)
			},"displayName","test");
			return _ms.set(function(_,_64remove){
				_ms.checkContains(_64,_64remove,"@remove");
				return _ms.checkContains(_64,_ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					const _64remove_45remaining=_61_62(_ms.unlazy(Set_33),_64remove);
					loop327:while(true){
						const _$328=iter.next(),value=_$328.value,done=_$328.done;
						if(_ms.bool(done)){
							break loop327
						} else {
							{
								const _=value;
								if(_ms.bool(_ms.contains(_64remove_45remaining,_))){
									_ms.unlazy(_45_45_33)(_64remove_45remaining,[value])
								} else {
									(yield value)
								}
							}
						}
					}
				}),"res")
			},"doc",doc,"test",test,"displayName","--'")
		}();
		impl_33(_61_63,_64,function(){
			const test=_ms.set(function(){
				return _ms.unlazy(_33)(_61_63,[1],[1])
			},"displayName","test");
			return _ms.set(function(_64a,_64b){
				return and(id_61_63(type_45of(_64a),type_45of(_64b)),_ms.lazy(function(){
					return _ms.unlazy(seq_61_63)(_64a,_64b)
				}))
			},"test",test)
		}());
		const displayName=exports.displayName="@";
		exports.default=_64;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0AubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE2QkEsVUFBSSxlQUNJO0dBQVAsVUFDQztHQUdELGlDQUFtQixTQUFBLFdBQ007NkJBQW5CLElBQUssT0FBRyw0Q0FDdUIsVUFBQTtxQkFBaEMsbUNBQWlCLFlBQVM7S0FDN0IsMEJBQVU7NEJBQ1IsU0FBTztJQUFBO0dBQUE7VUFSSjs7Ozs7O0VBVVIsZ0NBQVUsaUJBQ007R0FBZixVQUFNO1VBQVM7Ozs7O0VBQ2hCLE1BQU8sV0FBVTtFQUVqQixpQ0FBUSxpQkFDTTtHQUFiLFVBQU07R0FDTixtQkFDTyxVQUFBO0lBQU4sVUFBQSxDQUFFLFFBQVM7SUFDWCxVQUFBLENBQUUsQ0FBRSxRQUFTOzs7R0FDZCx1QkFBVSxTQUFNLEVBQ0M7NkJBRE4sS0FDVixTQUFBOztVQUxZOzs7Ozs7O0VBUWIsUUFBTSxZQUFVLGNBQ0M7R0FBaEIsVUFBTTtHQUNOLG1CQUNPLFVBQUE7b0JBQUosWUFBVSxDQUFFLEdBQUk7OEJBQ2IsWUFBVSxDQUFFLEdBQUk7R0FBQTtrQkFDckIsU0FBQSxFQUFFLEdBQ007c0JBREg7V0FDTCxPQUFLLEVBQUcsU0FBQSxhQUNVO1lBQWpCLE9BQUcsR0FBRztJQUFBO0dBQUE7O0VBRVQsa0NBQ0s7R0FBSixVQUNDO0dBR0QsbUJBQ08sVUFBQTtJQUFOLFVBQUEsQ0FBRSxDQUFFLEVBQUUsRUFBRSxHQUFJLFNBQU87SUFDbkIsVUFBQSxDQUFFLENBQUUsRUFBRSxFQUFFLEdBQUksRUFBRSxTQUFPOzs7a0JBQ3JCLFNBQUEsRUFBSSxFQUFFLEVBQ0M7c0JBREw7SUFDRjtLQUNDLFlBQUEsV0FBUyxJQUNDO01BQVQsWUFBTztNQUNQLGFBQVE7TUFDUixXQUFNO2FBRkc7Ozs7O1lBSU47TUFBSCw4QkFBTztNQUNQLGFBQVE7TUFDUiw0QkFBTTthQUZIOzs7Ozs7O0lBSUwsNkJBQVc7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