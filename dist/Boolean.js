"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./private/js-impl","./Try"],function(exports,js_45impl_0,Try_1){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_45impl_0),iAnd=_ms.get(_$2,"iAnd"),iOr=_ms.get(_$2,"iOr"),_$4=_ms.lazyGetModule(Try_1),oh_45no_33=_ms.lazyProp(_$4,"oh-no!");
		const not=exports.not=function(){
			const doc="Negation of a Boolean.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[false],true);
				_ms.assoc(built,[true],false);
				return built
			};
			return _ms.set(function not(_){
				_ms.checkContains(Boolean,_,"_");
				return function(){
					if(_ms.bool(_)){
						return false
					} else {
						return true
					}
				}()
			},"doc",doc,"test",test)
		}();
		const and=exports.and=function(){
			const doc="True iff all conditions are true.\nEquivalent to `all? args`.\nAll arguments after the first may be lazy.\"";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[false,false],false);
				_ms.assoc(built,[false,true],false);
				_ms.assoc(built,[true,false],false);
				_ms.assoc(built,[true,true],true);
				_ms.assoc(built,[true,true,false],false);
				_ms.assoc(built,[true,false,_ms.lazy(function(){
					return _ms.unlazy(oh_45no_33)()
				})],false);
				return built
			};
			return _ms.set(iAnd,"doc",doc,"test",test,"name","and")
		}();
		const nand=exports.nand=function(){
			const doc="Negation of and.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[false,false],true);
				_ms.assoc(built,[false,true],true);
				_ms.assoc(built,[true,false],true);
				_ms.assoc(built,[true,true],false);
				_ms.assoc(built,[true,true,false],true);
				_ms.assoc(built,[true,false,_ms.lazy(function(){
					return _ms.unlazy(oh_45no_33)()
				})],true);
				return built
			};
			return _ms.set(function nand(){
				const args=[].slice.call(arguments,0);
				return not(Function.apply.call(and,null,[].concat(_ms.arr(args))))
			},"doc",doc,"test",test)
		}();
		const or=exports.or=function(){
			const doc="True iff any condition is true.\nEquivalent to `any? args`.\nAll arguments after the first may be lazy.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[false,false],false);
				_ms.assoc(built,[false,true],true);
				_ms.assoc(built,[true,false],true);
				_ms.assoc(built,[true,true],true);
				_ms.assoc(built,[false,false,true],true);
				_ms.assoc(built,[false,true,_ms.lazy(function(){
					return _ms.unlazy(oh_45no_33)()
				})],true);
				return built
			};
			return _ms.set(iOr,"doc",doc,"test",test,"name","or")
		}();
		const nor=exports.nor=function(){
			const doc="Negation of or.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[false,false],true);
				_ms.assoc(built,[false,true],false);
				_ms.assoc(built,[true,false],false);
				_ms.assoc(built,[true,true],false);
				_ms.assoc(built,[false,false,true],false);
				_ms.assoc(built,[false,true,_ms.lazy(function(){
					return _ms.unlazy(oh_45no_33)()
				})],false);
				return built
			};
			return _ms.set(function nor(){
				const args=[].slice.call(arguments,0);
				return not(Function.apply.call(or,null,[].concat(_ms.arr(args))))
			},"doc",doc,"test",test)
		}();
		const implies=exports.implies=function(){
			const doc="Whether `then` is true whenever `if` is.\nAlways true when `if` is false.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[false,false],true);
				_ms.assoc(built,[false,true],true);
				_ms.assoc(built,[true,false],false);
				_ms.assoc(built,[true,true],true);
				return built
			};
			return _ms.set(function implies(_if,then){
				_ms.checkContains(Boolean,_if,"if");
				return function(){
					if(_ms.bool(_if)){
						return _ms.unlazy(then)
					} else {
						return true
					}
				}()
			},"doc",doc,"test",test)
		}();
		const xor=exports.xor=function(){
			const doc="True if `a` and `b` differ.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[false,false],false);
				_ms.assoc(built,[false,true],true);
				_ms.assoc(built,[true,false],true);
				_ms.assoc(built,[true,true],false);
				return built
			};
			return _ms.set(function xor(a,b){
				_ms.checkContains(Boolean,a,"a");
				_ms.checkContains(Boolean,b,"b");
				return function(){
					if(_ms.bool(a)){
						return not(b)
					} else {
						return b
					}
				}()
			},"doc",doc,"test",test)
		}();
		const name=exports.name="Boolean";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9Cb29sZWFuLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBS0EsZ0NBQ0k7R0FBSCxVQUFNO0dBQ04sV0FDTyxlQUFBOztvQkFBTixDQUFFLE9BQVc7b0JBQ2IsQ0FBRSxNQUFVOzs7a0JBQ1osYUFBQSxFQUNTO3NCQURQOztLQUVELFlBQUEsR0FDQzthQUFBO0tBQUEsT0FFRzthQUFIO0tBQUE7SUFBQTtHQUFBOztFQUVKLGdDQUNJO0dBQUgsVUFDQztHQUdELFdBQ08sZUFBQTs7b0JBQU4sQ0FBRSxNQUFNLE9BQVc7b0JBQ25CLENBQUUsTUFBTSxNQUFVO29CQUNsQixDQUFFLEtBQUssT0FBVztvQkFDbEIsQ0FBRSxLQUFLLE1BQVU7b0JBQ2pCLENBQUUsS0FBSyxLQUFLLE9BQVc7b0JBRXZCLENBQUUsS0FBSzs7UUFBdUI7OztrQkFDL0I7O0VBRUQsa0NBQ0s7R0FBSixVQUFNO0dBQ04sV0FDTyxlQUFBOztvQkFBTixDQUFFLE1BQU0sT0FBVztvQkFDbkIsQ0FBRSxNQUFNLE1BQVU7b0JBQ2xCLENBQUUsS0FBSyxPQUFXO29CQUNsQixDQUFFLEtBQUssTUFBVTtvQkFDakIsQ0FBRSxLQUFLLEtBQUssT0FBVztvQkFFdkIsQ0FBRSxLQUFLOztRQUF1Qjs7O2tCQUM5QixlQUNPOztXQUFQLHdCQUFLLDJCQUFJO0dBQUE7O0VBRVgsOEJBQ0c7R0FBRixVQUNDO0dBR0QsV0FDTyxlQUFBOztvQkFBTixDQUFFLE1BQU0sT0FBVztvQkFDbkIsQ0FBRSxNQUFNLE1BQVU7b0JBQ2xCLENBQUUsS0FBSyxPQUFXO29CQUNsQixDQUFFLEtBQUssTUFBVTtvQkFDakIsQ0FBRSxNQUFNLE1BQU0sTUFBVTtvQkFFeEIsQ0FBRSxNQUFNOztRQUFzQjs7O2tCQUMvQjs7RUFFRCxnQ0FDSTtHQUFILFVBQU07R0FDTixXQUNPLGVBQUE7O29CQUFOLENBQUUsTUFBTSxPQUFXO29CQUNuQixDQUFFLE1BQU0sTUFBVTtvQkFDbEIsQ0FBRSxLQUFLLE9BQVc7b0JBQ2xCLENBQUUsS0FBSyxNQUFVO29CQUNqQixDQUFFLE1BQU0sTUFBTSxNQUFVO29CQUV4QixDQUFFLE1BQU07O1FBQXNCOzs7a0JBQzlCLGNBQ087O1dBQVAsd0JBQUssMEJBQUc7R0FBQTs7RUFFVix3Q0FDUTtHQUFQLFVBQ0M7R0FFRCxXQUNPLGVBQUE7O29CQUFOLENBQUUsTUFBTSxPQUFXO29CQUNuQixDQUFFLE1BQU0sTUFBVTtvQkFDbEIsQ0FBRSxLQUFLLE9BQVc7b0JBQ2xCLENBQUUsS0FBSyxNQUFVOzs7a0JBQ2pCLGlCQUFBLElBQVcsS0FDYTtzQkFEckI7O0tBRUYsWUFBQSxLQUNFO3dCQUhRO0tBQUEsT0FLTjthQUFIO0tBQUE7SUFBQTtHQUFBOztFQUVKLGdDQUNJO0dBQUgsVUFBTTtHQUNOLFdBQ08sZUFBQTs7b0JBQU4sQ0FBRSxNQUFNLE9BQVc7b0JBQ25CLENBQUUsTUFBTSxNQUFVO29CQUNsQixDQUFFLEtBQUssT0FBVztvQkFDbEIsQ0FBRSxLQUFLLE1BQVU7OztrQkFDakIsYUFBQSxFQUFVLEVBQ1M7c0JBRGpCO3NCQUFVOztLQUVYLFlBQUEsR0FDQzthQUFBLElBQUk7S0FBQSxPQUVEO2FBQUg7S0FBQTtJQUFBO0dBQUE7O0VBckdKLHdCQUFBIiwiZmlsZSI6IkJvb2xlYW4uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==