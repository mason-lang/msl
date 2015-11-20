"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./js","./math/Number","./Type/Method"],(exports,compare_0,js_1,Number_2,Method_3)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),id_61_63=_ms.get(_$1,"id=?"),js_42=_ms.get(_$1,"js*"),js_45=_ms.get(_$1,"js-"),js_43=_ms.get(_$1,"js+"),js_45bar=_ms.get(_$1,"js-bar"),_$2=_ms.getModule(Number_2),Int=_ms.get(_$2,"Int"),Method=_ms.getDefaultExport(Method_3),_$3=_ms.getModule(Method_3),impl_33=_ms.get(_$3,"impl!");
		let hash_45code=exports.default=new (Method)((()=>{
			let built={};
			built.name="hash-code";
			let args=built.args=[];
			let returns=built.returns=Int;
			let allow_45null_63=built["allow-null?"]=true;
			let _default=built.default=function _default(){
				let _this=this;
				return (()=>{
					if(id_61_63(_this,null)){
						return 108
					} else if(! defined_63(_this)){
						return 109
					} else {
						return (()=>{
							let _=hashes_45cache.get(_this);
							if(defined_63(_)){
								return _
							} else {
								hashes_45cache.set(_this,17);
								let hash=17;
								for(let key of Object.keys(_this)){
									let val=_this[`${key}`];
									let val_45hash=hash_45code(val);
									hash=js_45bar(js_42(hash,23),0);
									hash=js_45bar(js_43(hash,val_45hash),0)
								};
								hashes_45cache.set(_this,hash);
								return hash
							}
						})()
					}
				})()
			};
			return built
		})());
		let hashes_45cache=new (WeakMap)();
		impl_33(hash_45code,Boolean,function(){
			let _this=this;
			return (_this?1:0)
		});
		impl_33(hash_45code,Function,function(){
			let _this=this;
			return hash_45code((()=>{
				let _=_this.name;
				if(_61_63(0,_.length)){
					return _this.toString()
				} else {
					return _
				}
			})())
		});
		impl_33(hash_45code,String,function(){
			let _this=this;
			let hash=13;
			let i=_this.length;
			for(;;){
				hash=js_43(hash,_this.charCodeAt(i));
				hash=js_45bar(hash,0);
				hash=js_42(hash,31);
				if(id_61_63(i,0)){
					break
				};
				i=js_45(i,1)
			};
			return hash
		});
		impl_33(hash_45code,Symbol,()=>{
			return 42
		});
		impl_33(hash_45code,Number,function(){
			let _this=this;
			return js_45bar(_this,0)
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvaGFzaC1jb2RlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0EsZ0NBQVcsS0FBSSxRQUNNLEtBQUE7O2NBRXBCO0dBQ0Esb0JBQU07R0FDTiwwQkFBUztHQUNULHlDQUFhO0dBQ2IsMkJBQ1c7UUEwREg7V0F6REg7S0FBSCxHQUFBLFNBeURNLE1BekRJLE1BQ0k7YUFBYjtLQUFBLE9BQ0QsR0FBQSxFQUFJLFdBdURFLE9BdERXO2FBQWhCO0tBQUEsT0FFRzthQUFFO09BQUEsTUFBQSxtQkFvREE7T0FuREosR0FBQSxXQUFBLEdBQ1M7ZUFBUjtPQUFBLE9BRUc7UUFDSCxtQkErQ0csTUEvQ21CO1FBQ3RCLFNBQU87UUFFSCxRQUFBLE9BQU8sWUE0Q1IsT0EzQ3dCO1NBQTFCLFFBMkNFLE1BM0NVLEdBQUM7U0FDYixlQUFXLFlBQVU7Y0FDYixTQUFRLE1BQUksS0FBSyxJQUFJO2NBQ3JCLFNBQVEsTUFBSSxLQUFLLFlBQVU7UUFBQTtRQUVwQyxtQkFzQ0csTUF0Q21CO2VBQ3RCO09BQUE7TUFBQTtLQUFBO0lBQUE7R0FBQTs7O0VBRU4sbUJBQWUsS0FBSTtFQUdsQixRQUFNLFlBQVUsUUFDVTtPQStCbEI7VUEvQkYsQ0ErQkUsTUEvQkcsRUFBRTtFQUFBO0VBRWIsUUFBTSxZQUFVLFNBQ1c7T0E0Qm5CO1VBM0JQLFlBQWU7SUFBQSxNQTJCUjtJQTFCTixHQUFBLE9BQUcsRUFBRSxVQUNzQjtZQXlCckI7V0F2QkY7WUFBSDtJQUFBO0dBQUE7RUFBQTtFQUdILFFBQU0sWUFBVSxPQUNTO09BbUJqQjtHQW5CUCxTQUFPO0dBQ1AsTUFrQk87R0FoQkosT0FBQTtTQUFNLE1BQUksS0FnQk4saUJBaEJ3QjtTQUN0QixTQUFPLEtBQUs7U0FDWixNQUFJLEtBQUs7SUFFZCxHQUFBLFNBQUssRUFBRSxHQUNDO0tBQVY7SUFBQTtNQUNJLE1BQUksRUFBRTtHQUFBO1VBQ1o7RUFBQTtFQUVELFFBQU0sWUFBVSxPQUNRO1VBRXZCO0VBQUE7RUFHRCxRQUFNLFlBQVUsT0FDUztPQUFqQjtVQUFQLFNBQU8sTUFBSztFQUFBIiwiZmlsZSI6Imhhc2gtY29kZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
