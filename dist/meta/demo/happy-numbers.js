"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/at-Type","../../at/Range","../../at/Seq/Seq","../../at/Seq/Stream","../../at/Set/Id-Set","../../compare","../../js","../../math/Number","../../math/methods","../../at/Seq/Seq"],(exports,_64_0,_64_45Type_1,Range_2,Seq_3,Stream_4,Id_45Set_5,compare_6,js_7,Number_8,methods_9,Seq_10)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(_64_0),_43_43_33=_ms.get(_$0,"++!"),fold=_ms.get(_$0,"fold"),keep_39=_ms.get(_$0,"keep'"),map=_ms.get(_$0,"map"),_$1=_ms.getModule(_64_45Type_1),empty=_ms.get(_$1,"empty"),Range=_ms.getDefaultExport(Range_2),_$2=_ms.getModule(Seq_3),set_45nth_33=_ms.get(_$2,"set-nth!"),Stream=_ms.getDefaultExport(Stream_4),Id_45Set=_ms.getDefaultExport(Id_45Set_5),_$3=_ms.getModule(compare_6),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(js_7),defined_63=_ms.get(_$4,"defined?"),js_45sub=_ms.get(_$4,"js-sub"),_$5=_ms.getModule(Number_8),int_47=_ms.get(_$5,"int/"),Nat=_ms.get(_$5,"Nat"),remainder=_ms.get(_$5,"remainder"),square=_ms.get(_$5,"square"),_$6=_ms.getModule(methods_9),_43=_ms.get(_$6,"+"),_$7=_ms.lazyGetModule(Seq_10),seq_61_63=_ms.lazyProp(_$7,"seq=?"),take=_ms.lazyProp(_$7,"take");
		const digits=function digits(_){
			const base=10;
			return new (Stream)(function*(){
				let left=_;
				for(;;){
					(yield remainder(left,base));
					left=int_47(left,base);
					if(_61_63(left,0)){
						break
					}
				}
			})
		};
		const happy_45step=function happy_45step(_){
			return fold(map(digits(_),square),_43)
		};
		const cache=[];
		set_45nth_33(cache,1,true);
		const happy_63=exports["happy?"]=(()=>{
			const built={};
			const doc=built.doc=`http://rosettacode.org/wiki/Happy_numbers`;
			return _ms.set(n=>{
				_ms.checkContains(Nat,n,"n");
				const stepped_45through=empty(Id_45Set);
				let cur=n;
				const n_45happy_63=(()=>{
					for(;;){
						{
							const _=js_45sub(cache,cur);
							if(defined_63(_)){
								return _
							} else {
								if(_ms.contains(stepped_45through,cur)){
									return false
								};
								_43_43_33(stepped_45through,[cur]);
								cur=happy_45step(cur)
							}
						}
					}
				})();
				return (_=>{
					set_45nth_33(cache,n,_);
					for(let _ of stepped_45through){
						set_45nth_33(cache,_,n_45happy_63)
					};
					return _
				})(n_45happy_63)
			},built)
		})();
		const happy_45numbers=_ms.checkContains(_ms.sub(Stream,Nat),(()=>{
			const built={};
			const doc=built.doc=`Stream of all happy numbers.`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(seq_61_63),_ms.unlazy(take)(happy_45numbers,8),(()=>{
					const built=[];
					_ms.add(built,1);
					_ms.add(built,7);
					_ms.add(built,10);
					_ms.add(built,13);
					_ms.add(built,19);
					_ms.add(built,23);
					_ms.add(built,28);
					_ms.add(built,31);
					return built
				})())
			};
			return _ms.set(keep_39(new (Range)(1,Number.POSITIVE_INFINITY),happy_63),built)
		})(),"happy-numbers");
		const name=exports.name=`happy-numbers`;
		exports.default=happy_45numbers;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvbWV0YS9kZW1vL2hhcHB5LW51bWJlcnMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFlQSxhQUFVLGdCQUFBLEVBQ0M7R0FBVixXQUFPO1VBQ1AsS0FBSSxRQUNVLFdBQUE7SUFBYixTQUFTO0lBRUwsT0FBQTtZQUFBLFVBQVUsS0FBSztVQUNWLE9BQUssS0FBSztLQUNsQixHQUFJLE9BQUcsS0FBSyxHQUNDO01BQVo7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUVKLG1CQUFjLHNCQUFBLEVBQ0M7VUFDZCxLQUFNLElBQUksT0FBQSxHQUFRLFFBQVE7RUFBQTtFQUUzQixZQUFRO0VBQ1IsYUFBUyxNQUFNLEVBQUU7RUFFakIsaUNBQ08sS0FBQTs7R0FBTixvQkFBTTtrQkFDTCxHQUNLO3NCQURIO0lBQ0Ysd0JBQWtCLE1BQU07SUFDeEIsUUFBUTtJQUNSLG1CQUNjO1lBQUE7TUFBUDtPQUFBLFFBQUEsU0FBTyxNQUFNO09BQ2xCLEdBQUEsV0FBQSxHQUNTO1FBQVIsT0FBTTtPQUFBLE9BRUg7UUFBSCxnQkFBUSxrQkFBSixLQUNtQjtTQUF0QixPQUFNO1FBQUE7UUFFUCxVQUFJLGtCQUFnQixDQUFFO1lBQ2YsYUFBVztPQUFBO01BQUE7S0FBQTtJQUFBO1dBQ2hCLElBQ1E7S0FBWixhQUFTLE1BQU0sRUFBRTtLQUNaLFFBQUEsS0FBQSxrQkFDZTtNQUFuQixhQUFTLE1BQU0sRUFBRTtLQUFBOztPQUhkO0dBQUE7O0VBS1AsZ0RBQWMsT0FBTyxLQUNLLEtBQUE7O0dBQXpCLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtzREFBYSxnQkFBYyxHQUNFLEtBQUE7O21CQUFqQzttQkFDQTttQkFDQTttQkFDQTttQkFDQTttQkFDQTttQkFDQTttQkFDQTs7OztrQkFDSixRQUFPLEtBQUksT0FBTSxFQUFFLDBCQUEwQjs7RUFoRTlDLHdCQUFBO2tCQW9EQSIsImZpbGUiOiJtZXRhL2RlbW8vaGFwcHktbnVtYmVycy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9