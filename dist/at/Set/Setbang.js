"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../atbang","../at-Type","../at-Type","./Set","./Hash-Setbang","../../bang","../../Type/Type","../at","../atbang"],function(exports,Kind_0,_64_33_1,_64_45Type_2,_64_45Type_3,Set_4,Hash_45Set_33_5,_33_6,Type_7,_64_8,_64_33_9){
	exports._get=_ms.lazy(function(){
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),_64_33=_ms.getDefaultExport(_64_33_1),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),_64_45Type=_ms.getDefaultExport(_64_45Type_3),_$5=_ms.getModule(_64_45Type_3),from_45stream=_ms.get(_$5,"from-stream"),Set=_ms.getDefaultExport(Set_4),Hash_45Set_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Hash_45Set_33_5)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_6)
		}),_$10=_ms.lazyGetModule(_33_6),_33not=_ms.lazyProp(_$10,"!not"),_$11=_ms.lazyGetModule(Type_7),contains_63=_ms.lazyProp(_$11,"contains?"),_$12=_ms.lazyGetModule(_64_8),empty_63=_ms.lazyProp(_$12,"empty?"),_$13=_ms.lazyGetModule(_64_33_9),_43_43_33=_ms.lazyProp(_$13,"++!"),_45_45_33=_ms.lazyProp(_$13,"--!"),empty_33=_ms.lazyProp(_$13,"empty!");
		const Set_33=Kind(function(){
			const doc="Mutable Set.";
			const implementor_45test=function implementor_45test(type){
				const _=empty(type);
				_ms.unlazy(_43_43_33)(_,[1,2]);
				_ms.unlazy(_33)(_ms.unlazy(contains_63),_,1);
				_ms.unlazy(_33)(_ms.unlazy(contains_63),_,2);
				_ms.unlazy(_33not)(_ms.unlazy(contains_63),_,3);
				_ms.unlazy(_45_45_33)(_,[1,2]);
				_ms.unlazy(_33)(_ms.unlazy(empty_63),_);
				_ms.unlazy(_43_43_33)(_,[1,2,3]);
				_ms.unlazy(empty_33)(_);
				_ms.unlazy(_33)(_ms.unlazy(empty_63),_)
			};
			return {
				doc:doc,
				"implementor-test":implementor_45test,
				name:"Set!"
			}
		}());
		self_45kind_33(Set_33,_64_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,function(){
				return empty(_ms.unlazy(Hash_45Set_33))
			});
			_ms.assoc(built,from_45stream,function(_){
				return from_45stream(_ms.unlazy(Hash_45Set_33),_)
			});
			return built
		}());
		kind_33(Set_33,Set);
		kind_33(Set_33,_64_33);
		const name=exports.name="Set!";
		exports.default=Set_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NldC9TZXQhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztFQWNBLGFBQU8sZUFDSTtHQUFWLFVBQU07R0FDTix5QkFBb0IsNEJBQUEsS0FDSTtJQUF2QixRQUFJLE1BQU07MEJBQ04sRUFBRSxDQUFFLEVBQUU7NENBQ0UsRUFBRTs0Q0FDRixFQUFFOytDQUNDLEVBQUU7MEJBQ2IsRUFBRSxDQUFFLEVBQUU7eUNBQ0Q7MEJBQ0wsRUFBRSxDQUFFLEVBQUUsRUFBRTt5QkFDTDt5Q0FDRTtHQUFBOzs7Ozs7O0VBRVgsZUFBVyxPQUFLLHFCQUNNOzttQkFBckIsTUFDVSxVQUFBO1dBQVQ7O21CQUNELGNBQWdCLFNBQUEsRUFDQztXQUFoQix3Q0FBc0I7R0FBQTs7O0VBR3hCLFFBQU0sT0FBSztFQUNYLFFBQU0sT0FBSztFQXBDWCx3QkFBQTtrQkFzQ0EiLCJmaWxlIjoiYXQvU2V0L1NldGJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==