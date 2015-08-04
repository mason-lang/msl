"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./js","./math/Number","./Type/Method"],(exports,compare_0,js_1,Number_2,Method_3)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),js_42=_ms.get(_$3,"js*"),js_45=_ms.get(_$3,"js-"),js_43=_ms.get(_$3,"js+"),js_45bar=_ms.get(_$3,"js-bar"),js_45sub=_ms.get(_$3,"js-sub"),_$4=_ms.getModule(Number_2),Int=_ms.get(_$4,"Int"),Method=_ms.getDefaultExport(Method_3),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!");
		const hash_45code=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Integer used to identify a value in a Hash-Map (or Hash-Set).\nThis should have a high probability of being different than the hash-codes of the other values in the map.`;
			const test=built.test=function test(){
				const a=()=>{
					const built={};
					const x=built.x=1;
					const y=built.y=2;
					return _ms.setName(built,"a")
				}();
				const b=()=>{
					const built={};
					const x=built.x=1;
					const y=built.y=1;
					return _ms.setName(built,"b")
				}();
				_ms.assert(_61_63,hash_45code(a),hash_45code(a));
				_ms.assertNot(_61_63,hash_45code(a),hash_45code(b))
			};
			const args=built.args=1;
			const returns=built.returns=Int;
			const allow_45null_63=built["allow-null?"]=true;
			const _default=built.default=function _default(){
				const _this=this;
				return ()=>{
					if(id_61_63(_this,null)){
						return 108
					} else if(id_61_63(_this,void 0)){
						return 109
					} else {
						return ()=>{
							const _=hashes_45cache.get(_this);
							if(id_61_63(_,void 0)){
								hashes_45cache.set(_this,17);
								let hash=17;
								for(let key of Object.keys(_this)){
									const val=js_45sub(_this,key);
									const val_45hash=hash_45code(val);
									hash=js_45bar(js_42(hash,23),0);
									hash=js_45bar(js_43(hash,val_45hash),0)
								};
								hashes_45cache.set(_this,hash);
								return hash
							} else {
								return _
							}
						}()
					}
				}()
			};
			return _ms.setName(built,"hash-code")
		}());
		const hashes_45cache=new (global.WeakMap)();
		impl_33(hash_45code,Boolean,function(){
			const _this=this;
			return ()=>{
				const _=_this;
				if(_){
					return 1
				} else {
					return 0
				}
			}()
		});
		impl_33(hash_45code,Function,function(){
			const _this=this;
			return hash_45code(()=>{
				const _=_this.name;
				if(_61_63(0,_.length)){
					return _this.toString()
				} else {
					return _
				}
			}())
		});
		impl_33(hash_45code,String,()=>{
			const built={};
			const test=built.test=function test(){
				_ms.assert(_61_63,hash_45code(`a`),hash_45code(`a`));
				_ms.assertNot(_61_63,hash_45code(`a`),hash_45code(`b`))
			};
			return _ms.set(function(){
				const _this=this;
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
			},built)
		}());
		impl_33(hash_45code,Symbol,()=>{
			const built={};
			const test=built.test=function test(){
				const sym=Symbol(`test`);
				_ms.assert(_61_63,hash_45code(sym),hash_45code(sym))
			};
			return _ms.set(()=>{
				return 42
			},built)
		}());
		impl_33(hash_45code,Number,function(){
			const _this=this;
			return js_45bar(_this,0)
		});
		const name=exports.name=`hash-code`;
		exports.default=hash_45code;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9oYXNoLWNvZGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFNQSxrQkFBVyxLQUFJLFlBQ007O0dBQXBCLG9CQUNDO0dBRUQsc0JBQ1EsZUFBQTtJQUFQLFlBQ0c7O0tBQUYsZ0JBQUc7S0FDSCxnQkFBRzs7O0lBQ0osWUFDRzs7S0FBRixnQkFBRztLQUNILGdCQUFHOzs7ZUFDSSxPQUFJLFlBQVUsR0FBSSxZQUFVO2tCQUM1QixPQUFJLFlBQVUsR0FBSSxZQUFVO0dBQUE7R0FFckMsc0JBQU07R0FDTiw0QkFBUztHQUNULDJDQUFhO0dBQ2IsNkJBQ1csbUJBQUE7VUFxRUo7O0tBcEVMLEdBQUEsU0FvRUssTUFwRUssTUFDSTthQUFiO0tBQUEsT0FDRCxHQUFBLFNBa0VLLE1BbEVLLFFBQ1M7YUFBbEI7S0FBQSxPQUVHOztPQUFFLFFBQUEsbUJBK0REO09BOURILEdBQUEsU0FBSyxFQUFFLFFBQ1M7UUFDZixtQkE0REUsTUE1RG9CO1FBQ3RCLFNBQVM7UUFFSixRQUFBLE9BQU8sWUF5RFYsT0F4RDBCO1NBQTNCLFVBQU0sU0F3REwsTUF4RGlCO1NBQ2xCLGlCQUFXLFlBQVU7Y0FDYixTQUFRLE1BQUksS0FBSyxJQUFJO2NBQ3JCLFNBQVEsTUFBSSxLQUFLLFlBQVU7UUFBQTtRQUVwQyxtQkFtREUsTUFuRG9CO2VBQ3RCO09BQUEsT0FFRztlQUFIO09BQUE7TUFBQTtLQUFBO0lBQUE7R0FBQTs7O0VBRU4scUJBQWUsS0FBSTtFQUduQixRQUFNLFlBQVUsUUFDVSxVQUFBO1NBMENsQjs7SUExQ0YsUUEwQ0U7SUF6Q04sR0FBQSxFQUNDO1lBQUE7SUFBQSxPQUVHO1lBQUg7SUFBQTtHQUFBO0VBQUE7RUFFSCxRQUFNLFlBQVUsU0FDVyxVQUFBO1NBbUNuQjtVQWxDUDtJQUFlLFFBa0NSO0lBakNOLEdBQUEsT0FBRyxFQUFFLFVBQ3dCO1lBZ0N2QjtXQTlCRjtZQUFIO0lBQUE7R0FBQTtFQUFBO0VBR0gsUUFBTSxZQUFVLFdBQ007O0dBQXJCLHNCQUNRLGVBQUE7ZUFBQyxPQUFJLFlBQVcsS0FBSyxZQUFXO2tCQUMvQixPQUFJLFlBQVcsS0FBSyxZQUFXOztrQkFFdEMsVUFBQTtVQXNCSztJQXRCTixTQUFTO0lBQ1QsTUFxQk07SUFuQkYsT0FBQTtVQUFLLE1BQUksS0FtQlAsaUJBbkJ5QjtVQUN0QixTQUFPLEtBQUs7VUFDWixNQUFJLEtBQUs7S0FFakIsR0FBSSxTQUFLLEVBQUUsR0FDQztNQUFYO0tBQUE7T0FDSSxNQUFJLEVBQUU7SUFBQTtXQUNaO0dBQUE7O0VBRUYsUUFBTSxZQUFVLFdBQ007O0dBQXJCLHNCQUNRLGVBQUE7SUFBUCxVQUFNLE9BQVE7ZUFDTixPQUFJLFlBQVUsS0FBTSxZQUFVO0dBQUE7a0JBRXRDLElBQUE7V0FDQTtHQUFBOztFQUdGLFFBQU0sWUFBVSxPQUNTLFVBQUE7U0FBakI7VUFBUCxTQUFPLE1BQUs7RUFBQTtFQTdGYix3QkFBQTtrQkFNQSIsImZpbGUiOiJoYXNoLWNvZGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==