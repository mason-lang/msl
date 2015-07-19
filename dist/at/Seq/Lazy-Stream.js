"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Function","../../Generatorbang","../../math/Number","../../math/methods","../../Type/Js-Method","../../Type/Kind","../../Type/Tuple","../at","../at-Type","../q","./Arraybang","./Seq","./Stream","../../compare","../../control","../../math/methods","../../math/Number","../../Type/Type","./Range","./Seq"],(exports,Function_0,Generator_33_1,Number_2,methods_3,Js_45Method_4,Kind_5,Tuple_6,_64_7,_64_45Type_8,_63_9,Array_33_10,Seq_11,Stream_12,compare_13,control_14,methods_15,Number_16,Type_17,Range_18,Seq_19)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Function_0),call=_ms.get(_$2,"call"),thunk=_ms.get(_$2,"thunk"),Generator_33=_ms.getDefaultExport(Generator_33_1),_$3=_ms.getModule(Generator_33_1),empty_45Generator=_ms.get(_$3,"empty-Generator"),_$4=_ms.getModule(Number_2),Nat=_ms.get(_$4,"Nat"),_$5=_ms.getModule(methods_3),_45=_ms.get(_$5,"-"),_$6=_ms.getModule(Js_45Method_4),js_45impl_33=_ms.get(_$6,"js-impl!"),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_6),_$9=_ms.getModule(_64_7),count=_ms.get(_$9,"count"),iterator=_ms.get(_$9,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_8),_$10=_ms.getModule(_64_45Type_8),empty=_ms.get(_$10,"empty"),from_45stream=_ms.get(_$10,"from-stream"),_$11=_ms.getModule(_63_9),_63_45or=_ms.get(_$11,"?-or"),Array_33=_ms.getDefaultExport(Array_33_10),Seq=_ms.getDefaultExport(Seq_11),_$13=_ms.getModule(Seq_11),_63nth=_ms.get(_$13,"?nth"),Stream=_ms.getDefaultExport(Stream_12),_$16=_ms.lazyGetModule(compare_13),_61_63=_ms.lazyProp(_$16,"=?"),_$17=_ms.lazyGetModule(control_14),build=_ms.lazyProp(_$17,"build"),_$18=_ms.lazyGetModule(methods_15),_43=_ms.lazyProp(_$18,"+"),_$19=_ms.lazyGetModule(Number_16),infinity=_ms.lazyProp(_$19,"infinity"),_$20=_ms.lazyGetModule(Type_17),_61_62=_ms.lazyProp(_$20,"=>"),_$21=_ms.lazyGetModule(Range_18),range=_ms.lazyProp(_$21,"range"),_$22=_ms.lazyGetModule(Seq_19),seq_61_63=_ms.lazyProp(_$22,"seq=?"),take_39=_ms.lazyProp(_$22,"take'");
		const Lazy_45Stream=Tuple(()=>{
			const built={};
			const doc=built.doc=`Like Stream, but caches its elements as it produces them.\nIf you want to stream the results of an expensive computation and use it multiple times, use this.\nIf you have a cheap computation or only need to iterate through it once, use Stream.`;
			const props=built.props=()=>{
				const built=[];
				_ms.add(built,[`caching-iterator`,Generator_33]);
				_ms.add(built,[`cache`,Array_33]);
				return built
			}();
			return _ms.setName(built,"Lazy-Stream")
		}());
		self_45kind_33(Lazy_45Stream,_64_45Type,()=>{
			const built=new global.Map();
			_ms.assoc(built,empty,thunk(Lazy_45Stream(empty_45Generator,empty(Array_33))));
			_ms.assoc(built,from_45stream,_=>{
				return lazy_45streaming(()=>{
					return iterator(_)
				})
			});
			return built
		}());
		js_45impl_33(iterator,Lazy_45Stream,()=>{
			const built={};
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(_61_63),[1,2],_ms.unlazy(build)(_yield=>{
					const _=_ms.unlazy(_61_62)(Lazy_45Stream,Stream(function*(){
						_yield(1);
						(yield 1);
						_yield(2);
						(yield 2);
						_yield(3)
					}));
					_ms.assert(_ms.unlazy(seq_61_63),[1],_ms.unlazy(take_39)(_,1));
					_ms.assert(_ms.unlazy(seq_61_63),[1,2],_ms.unlazy(take_39)(_,2))
				}))
			};
			return _ms.set(function*(){
				const _this=this;
				(yield* iterator(_this.cache));
				(yield* _this["caching-iterator"])
			},built)
		}());
		kind_33(Lazy_45Stream,Seq,()=>{
			const built=new global.Map();
			_ms.assoc(built,_63nth,(stream,n)=>{
				_ms.checkContains(Nat,n,"n");
				return _63_45or(_63nth(stream.cache,n),_ms.lazy(()=>{
					return ()=>{
						const n_45left=_45(n,count(stream.cache));
						return _63nth(Stream(stream["caching-iterator"]),n_45left)
					}()
				}))
			});
			return built
		}());
		const lazy_45streaming=exports["lazy-streaming"]=()=>{
			const built={};
			const doc=built.doc=`Creates a Lazy-Stream from a generator.`;
			const test=built.test=function test(){
				const fibonaccis=Stream(function*(){
					(yield 1);
					(yield 1);
					for(let _ of _ms.unlazy(range)(2,_ms.unlazy(infinity))){
						(yield _ms.unlazy(_43)(_ms.sub(fibonaccis,_45(_,1)),_ms.sub(fibonaccis,_45(_,2))))
					}
				});
				_ms.assert(_ms.unlazy(seq_61_63),_ms.unlazy(take_39)(fibonaccis,10),[1,1,2,3,5,8,13,21,34,55])
			};
			return _ms.set(function lazy_45streaming(stream){
				_ms.checkContains(_ms.sub(Function,Generator_33),stream,"stream");
				const cache=empty(Array_33);
				const strm=Stream(stream);
				const iter=call(function*(){
					for(let _ of strm){
						cache.push(_);
						(yield _)
					}
				});
				return Lazy_45Stream(iter,cache)
			},built)
		}();
		const name=exports.name=`Lazy-Stream`;
		exports.default=Lazy_45Stream;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9MYXp5LVN0cmVhbS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQXVCQSxvQkFBYSxVQUNLOztHQUFqQixvQkFDQztHQUdELDRCQUNNOztrQkFBSCxDQUFHLG1CQUFrQjtrQkFDckIsQ0FBRyxRQUFPOzs7OztFQUVkLGVBQVcsY0FBWSxlQUNNOzttQkFBNUIsTUFBUyxNQUFPLGNBQVksa0JBQWlCLE1BQU07bUJBRW5ELGNBQWdCLEdBQ0M7V0FBaEIsaUJBQ2dCLElBQUE7WUFBZixTQUFRO0lBQUE7R0FBQTs7O0VBRVgsYUFBUyxTQUFTLGtCQUNXOztHQUE1QixzQkFDUSxlQUFBO2tDQUFJLENBQUUsRUFBRSxxQkFBYSxRQUNLO0tBQWhDLDJCQUFPLGNBQWEsT0FDVSxXQUFBO01BQTdCLE9BQU07YUFDSDtNQUNILE9BQU07YUFDSDtNQUNILE9BQU07S0FBQTtzQ0FDTyxDQUFFLHVCQUFXLEVBQUU7c0NBQ2YsQ0FBRSxFQUFFLHVCQUFXLEVBQUU7SUFBQTtHQUFBO2tCQUU3QixXQUFBOztZQUFDLFNBQVM7WUFDVDs7O0VBRU4sUUFBTSxjQUFZLFFBQ0c7O21CQUFwQixPQUFTLENBQUEsT0FBTyxJQUNLO3NCQURIO1dBQ2pCLFNBQU0sT0FBSyxhQUFhO2dCQUNJO01BQTNCLGVBQVMsSUFBRSxFQUFHLE1BQU07YUFDcEIsT0FBTSxPQUFPLDRCQUF5QjtLQUFBO0lBQUE7R0FBQTs7O0VBRXpDLHFEQUNlOztHQUFkLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtJQUFQLGlCQUFhLE9BQ1UsV0FBQTtZQUFuQjtZQUNBO0tBQ0UsUUFBQSx1QkFBTSx3QkFDVTtxQ0FDZixXQUFZLElBQUUsRUFBRSxZQUFHLFdBQVksSUFBRSxFQUFFO0tBQUE7SUFBQTt5REFDckIsV0FBVyxJQUFJLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxHQUFHLEdBQUc7R0FBQTtrQkFDM0QsMEJBQUEsT0FDMkI7OEJBRHBCLFNBQVM7SUFDaEIsWUFBUSxNQUFNO0lBSWQsV0FBTyxPQUFPO0lBQ2QsV0FBTyxLQUNRLFdBQUE7S0FBVCxRQUFBLEtBQUEsS0FDSTtNQUNSLFdBQVc7YUFDUjtLQUFBO0lBQUE7V0FDTCxjQUFZLEtBQUs7R0FBQTs7RUFqRm5CLHdCQUFBO2tCQXVCQSIsImZpbGUiOiJhdC9TZXEvTGF6eS1TdHJlYW0uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==