"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/mangle-identifier","../Object","../show","./Method","./Type"],(exports,mangle_45identifier_0,Object_1,show_2,Method_3,Type_4)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(mangle_45identifier_0),unmangle=_ms.get(_$2,"unmangle"),_$3=_ms.getModule(Object_1),flag_63=_ms.get(_$3,"flag?"),show=_ms.getDefaultExport(show_2),Method=_ms.getDefaultExport(Method_3),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),Type=_ms.getDefaultExport(Type_4);
		impl_33(show,Type,()=>{
			const built={};
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[Method],`Method`);
				return built
			};
			return _ms.set(function(opts){
				const _this=this;
				return ()=>{
					if(flag_63(opts,`repr`)){
						return show.default(_this,opts)
					} else {
						return unmangle(_this.name)
					}
				}()
			},built)
		}());
		const name=exports.name=`show-Type`;
		exports.default=impl_33(show,Method,()=>{
			const built={};
			const test=built.test=function test(){};
			return _ms.set(function(opts){
				const _this=this;
				return ()=>{
					if(flag_63(opts,`repr`)){
						return show.default(_this,opts)
					} else {
						return unmangle(_this.name)
					}
				}()
			},built)
		}());
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL3Nob3ctVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQU9BLFFBQU0sS0FBSyxTQUNJOztHQUFkLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsUUFBYTs7O2tCQUNkLFNBQUEsS0FDSTtVQVlVOztLQVhkLEdBQUEsUUFBTSxLQUFNLFFBQ0s7YUFBaEIsYUFVYSxNQVZLO0tBQUEsT0FFZjthQUFILFNBUWE7Ozs7O0VBdkJqQix3QkFBQTtrQkFpQkEsUUFBTSxLQUFLLFdBQ007O0dBQWhCLHNCQUNRLGVBQUE7a0JBQ04sU0FBQSxLQUNJO1VBRVU7O0tBRGQsR0FBQSxRQUFNLEtBQU0sUUFDSzthQUFoQixhQUFhLE1BQUs7S0FBQSxPQUVmO2FBQUgsU0FGYSIsImZpbGUiOiJUeXBlL3Nob3ctVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9