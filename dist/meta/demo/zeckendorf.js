"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/Seq/Seq","../../at/Seq/Stream","../../compare","../../math/Number","../../math/methods","../../Type/Type"],(exports,Seq_0,Stream_1,compare_2,Number_3,methods_4,Type_5)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Seq_0),reverse=_ms.get(_$2,"reverse"),tail=_ms.get(_$2,"tail"),take_45while_39=_ms.get(_$2,"take-while'"),Stream=_ms.getDefaultExport(Stream_1),_$4=_ms.getModule(compare_2),_61_63=_ms.get(_$4,"=?"),_60_61_63=_ms.get(_$4,"<=?"),_$5=_ms.getModule(Number_3),Nat=_ms.get(_$5,"Nat"),_$6=_ms.getModule(methods_4),_43=_ms.get(_$6,"+"),_45=_ms.get(_$6,"-"),_$7=_ms.getModule(Type_5),_61_62=_ms.get(_$7,"=>");
		const fibs=(()=>{
			const rec=function* rec(prev,cur){
				_ms.checkContains(Nat,prev,"prev");
				_ms.checkContains(Nat,cur,"cur");
				(yield cur);
				(yield* rec(cur,_43(prev,cur)))
			};
			return new (Stream)(_ms.sub(rec,0,1))
		})();
		const zeckendorf=(()=>{
			const built={};
			const doc=built.doc=`http://rosettacode.org/wiki/Zeckendorf_number_representation`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[0],"");
				_ms.assoc(built,[1],`1`);
				_ms.assoc(built,[19],`101001`);
				_ms.assoc(built,[1111],`100001010000001`);
				return built
			};
			return _ms.set(function zeckendorf(n){
				_ms.checkContains(Nat,n,"n");
				const z_45fibs=tail(fibs);
				const candidate_45fibs=reverse(take_45while_39(z_45fibs,_=>{
					return _60_61_63(_,n)
				}));
				let left=n;
				const digits=(()=>{
					const built=[];
					for(let _ of candidate_45fibs){
						_ms.add(built,(()=>{
							if(_60_61_63(_,left)){
								left=_45(left,_);
								return 1
							} else {
								return 0
							}
						})())
					};
					return built
				})();
				_ms.assert(_61_63,0,left);
				return _61_62(String,digits)
			},built)
		})();
		const name=exports.name=`zeckendorf`;
		exports.default=zeckendorf;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vemVja2VuZG9yZi5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVFBLFdBQ00sS0FBQTtHQUFMLFVBQVMsY0FBQSxLQUFTLElBQ087c0JBRFg7c0JBQVE7V0FDbEI7WUFDQyxJQUFJLElBQUssSUFBRSxLQUFLO0dBQUE7VUFDckIsS0FBSSxnQkFBTyxJQUFJLEVBQUU7RUFBQTtFQUVsQixpQkFDVyxLQUFBOztHQUFWLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxHQUFRO29CQUNWLENBQUUsR0FBUTtvQkFDVixDQUFFLElBQVM7b0JBQ1gsQ0FBRSxNQUFXOzs7a0JBQ2Isb0JBQUEsRUFDSztzQkFESDtJQUNGLGVBQVMsS0FBSztJQUNkLHVCQUFpQixRQUFTLGdCQUFZLFNBQVEsR0FDQztZQUE5QyxVQUFJLEVBQUU7SUFBQTtJQUNQLFNBQVM7SUFDVCxhQUFjOzthQUFBLEtBQUEsaUJBQ2M7b0JBQ3ZCO09BQUgsR0FBQSxVQUFJLEVBQUUsTUFDSTthQUFELElBQUUsS0FBSztlQUNmO09BQUEsT0FFRztlQUFIO09BQUE7TUFBQTtLQUFBOzs7ZUFDSyxPQUFHLEVBQUU7V0FDYixPQUFHLE9BQU87R0FBQTs7RUFsQ1osd0JBQUE7a0JBY0EiLCJmaWxlIjoibWV0YS9kZW1vL3plY2tlbmRvcmYuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==