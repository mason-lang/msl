"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./compare","./js","./Type/primitive","./Type/Trait","./Type/Type","./at/at","./at/q","./at/Map/Map","./at/Set/Id-Set"],(exports,Boolean_0,compare_1,js_2,primitive_3,Trait_4,Type_5,_64_6,_63_7,Map_8,Id_45Set_9)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(Boolean_0),xor=_ms.get(_$0,"xor"),_$1=_ms.getModule(compare_1),_61_63=_ms.get(_$1,"=?"),_$2=_ms.getModule(js_2),defined_63=_ms.get(_$2,"defined?"),exists_63=_ms.get(_$2,"exists?"),id_61_63=_ms.get(_$2,"id=?"),js_45delete=_ms.get(_$2,"js-delete"),js_45set=_ms.get(_$2,"js-set"),js_45sub=_ms.get(_$2,"js-sub"),_$3=_ms.getModule(primitive_3),Bool=_ms.get(_$3,"Bool"),Trait=_ms.getDefaultExport(Trait_4),_$4=_ms.getModule(Type_5),_61_62=_ms.get(_$4,"=>"),_$5=_ms.lazyGetModule(_64_6),_43_43=_ms.lazyProp(_$5,"++"),all_63=_ms.lazyProp(_$5,"all?"),count=_ms.lazyProp(_$5,"count"),empty_63=_ms.lazyProp(_$5,"empty?"),_64keep=_ms.lazyProp(_$5,"@keep"),_$6=_ms.lazyGetModule(_63_7),_63_45or=_ms.lazyProp(_$6,"?-or"),Opt_45_62_63=_ms.lazyProp(_$6,"Opt->?"),_63None=_ms.lazyProp(_$6,"?None"),Map=_ms.lazy(()=>_ms.getDefaultExport(Map_8)),_$7=_ms.lazyGetModule(Map_8),make_45map=_ms.lazyProp(_$7,"make-map"),Id_45Set=_ms.lazy(()=>_ms.getDefaultExport(Id_45Set_9));
		let Object_45Key=exports["Object-Key"]=new (Trait)((()=>{
			let built={};
			built.name="Object-Key";
			let implementors=built.implementors=[String,Symbol];
			return built
		})());
		let flag_63=exports["flag?"]=function flag_63(obj,flag){
			_ms.checkInstance(Object_45Key,flag,"flag");
			return _ms.checkInstance(Bool,_ms.unlazy(_63_45or)(_63property(obj,flag),false),"returned value")
		};
		let forbidden_45fun_45props=_ms.lazy(()=>_61_62(_ms.unlazy(Id_45Set),["arguments","caller"]));
		let _64all_45properties=exports["@all-properties"]=function _64all_45properties(_){
			let props=Object.getOwnPropertyNames(_);
			let own_45names=(_ms.hasInstance(Function,_)?_ms.unlazy(_64keep)(props,_=>! _ms.hasInstance(_ms.unlazy(forbidden_45fun_45props),_)):props);
			return _ms.unlazy(_43_43)(own_45names,Object.getOwnPropertySymbols(_))
		};
		let _64properties=exports["@properties"]=function _64properties(_){
			return (exists_63(_)?Object.keys(_):[])
		};
		let _63property=exports["?property"]=function _63property(_,prop_45name){
			_ms.checkInstance(Object_45Key,prop_45name,"prop-name");
			return (property_63(_,prop_45name)?_ms.some((()=>{
				return js_45sub(_,prop_45name)
			})()):_ms.None)
		};
		let _63property_45with_45proto=exports["?property-with-proto"]=function _63property_45with_45proto(_,prop_45name){
			_ms.checkInstance(Object_45Key,prop_45name,"prop-name");
			return (exists_63(_)?_ms.unlazy(Opt_45_62_63)(js_45sub(_,prop_45name)):_ms.unlazy(_63None))
		};
		let property_63=exports["property?"]=function property_63(_,prop_45name){
			_ms.checkInstance(Object_45Key,prop_45name,"prop-name");
			return (exists_63(_)&&Object.prototype.hasOwnProperty.call(_,prop_45name))
		};
		let property_45with_45proto_63=exports["property-with-proto?"]=function property_45with_45proto_63(_,prop_45name){
			_ms.checkInstance(Object_45Key,prop_45name,"prop-name");
			return (exists_63(_)&&defined_63(js_45sub(_,prop_45name)))
		};
		let object_61_63=exports["object=?"]=function object_61_63(a,b){
			return (()=>{
				if(! (_ms.hasInstance(Object,a)||_ms.hasInstance(Object,b))){
					return id_61_63(a,b)
				} else if(xor(_ms.hasInstance(Object,a),_ms.hasInstance(Object,b))){
					return false
				} else {
					let same_45type=id_61_63(Object.getPrototypeOf(a),Object.getPrototypeOf(b));
					return (same_45type&&(()=>{
						let ak=Object.getOwnPropertyNames(a);
						let bk=Object.getOwnPropertyNames(b);
						return (_61_63(_ms.unlazy(count)(ak),_ms.unlazy(count)(bk))&&(()=>{
							return _ms.unlazy(all_63)(ak,k=>{
								return _61_63(js_45sub(a,k),js_45sub(b,k))
							})
						})())
					})())
				}
			})()
		};
		let empty_45Object=exports["empty-Object"]=Object.freeze(new (Object)());
		let empty_45Object_63=exports["empty-Object?"]=function empty_45Object_63(_){
			_ms.checkInstance(Object,_,"_");
			return _ms.unlazy(empty_63)(_64all_45properties(_))
		};
		let Object_45_62Map=exports["Object->Map"]=function Object_45_62Map(_){
			return _ms.unlazy(make_45map)(_64all_45properties(_),_ms.sub(js_45sub,_))
		};
		let Map_45_62Object=exports["Map->Object"]=function Map_45_62Object(_){
			_ms.checkInstance(_ms.unlazy(Map),_,"_");
			return (()=>{
				let obj=new (Object)();
				for(let elem of _){
					js_45set(obj,_ms.sub(elem,0),_ms.sub(elem,1))
				};
				return obj
			})()
		};
		let delete_45property_33=exports["delete-property!"]=function delete_45property_33(_,prop_45name){
			_ms.checkInstance(Object,_,"_");
			_ms.checkInstance(Object_45Key,prop_45name,"prop-name");
			_ms.assert(property_63,_,prop_45name);
			js_45delete(_,prop_45name)
		};
		let object_45merge=exports["object-merge"]=function object_45merge(){
			let objects=[].slice.call(arguments,0);
			return Object.assign(new (Object)(),...objects)
		};
		let object_45select=exports["object-select"]=function object_45select(obj){
			let _64keys=[].slice.call(arguments,1);
			_ms.checkInstance(Object,obj,"obj");
			return (()=>{
				let kept=new (Object)();
				for(let key of _64keys){
					js_45set(kept,key,js_45sub(obj,key))
				};
				return kept
			})()
		};
		let map_45object_45values=exports["map-object-values"]=function map_45object_45values(obj,mapper){
			_ms.checkInstance(Object,obj,"obj");
			_ms.checkInstance(Function,mapper,"mapper");
			return (()=>{
				let mapped=new (Object)();
				for(let key of _64properties(obj)){
					js_45set(mapped,key,mapper(js_45sub(obj,key)))
				};
				return mapped
			})()
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvT2JqZWN0Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBYUEsdUNBQVksS0FBSSxPQUNLLEtBQUE7O2NBQ3BCO0dBQ0Esb0NBQWMsQ0FBQyxPQUFPOzs7RUFFdkIsNkJBQVEsaUJBQU0sSUFBSSxLQUNlO3FCQURWOzRCQUFkLDBCQUVGLFlBQVUsSUFBSSxNQUFNOztFQUUzQix5Q0FBdUIsNEJBQVUsQ0FBRSxZQUFXO0VBQzlDLG1EQUFtQiw2QkFBQSxFQUNBO0dBR2xCLFVBQVEsMkJBQTJCO0dBQ25DLGdCQUFpQixpQkFBQyxTQUFELHVCQUFpQixTQUFRLHNEQUFJLElBQXVCOzZCQUNsRSxZQUFVLDZCQUE2QjtFQUFBO0VBRTNDLHlDQUFlLHVCQUFBLEVBQ0E7VUFDVCxDQUFBLFVBQVEsR0FBQyxZQUFZLEdBQUM7RUFBQTtFQUU1QixxQ0FBYSxxQkFBQSxFQUFDLFlBQ29CO3FCQURWO1VBRXBCLENBQUEsWUFBVyxFQUFDLDJCQUNTO1dBQXZCLFNBQVEsRUFBQztHQUFBOztFQUVYLCtEQUF3QixvQ0FBQSxFQUFDLFlBQ29CO3FCQURWO1VBRTdCLENBQUEsVUFBUSw0QkFBVSxTQUFRLEVBQUM7O0VBRWpDLHFDQUFhLHFCQUFBLEVBQUMsWUFDb0I7cUJBRFY7VUFFdkIsQ0FBSSxVQUFRLElBQUUscUNBQXNDLEVBQUM7RUFBQTtFQUV0RCwrREFBd0Isb0NBQUEsRUFBQyxZQUNvQjtxQkFEVjtVQUVsQyxDQUFJLFVBQVEsSUFBRSxXQUFVLFNBQVEsRUFBQztFQUFBO0VBR2xDLHFDQUFXLHNCQUFBLEVBQUUsRUFDQztVQUdUO0lBQUgsR0FBQSxFQUFJLGlCQUFLLE9BQUYsb0JBQVcsT0FBRixJQUNRO1lBQXZCLFNBQUssRUFBRTtJQUFBLE9BQ1IsR0FBQSxvQkFBTSxPQUFGLG1CQUFXLE9BQUYsSUFDUTtZQUFwQjtJQUFBLE9BRUc7S0FBSCxnQkFBWSxTQUFNLHNCQUFzQixHQUFJLHNCQUFzQjtZQUNsRSxDQUFJLGFBQ1MsS0FBQTtNQUFaLE9BQUssMkJBQTJCO01BQ2hDLE9BQUssMkJBQTJCO2FBQ2hDLENBQUsseUJBQVUsc0JBQVcsTUFDSSxLQUFBO2lDQUF4QixHQUFJLEdBQ0M7ZUFBVCxPQUFJLFNBQU8sRUFBRSxHQUFJLFNBQU8sRUFBRTtPQUFBO01BQUE7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUVoQywyQ0FBYyxjQUFjLEtBQUk7RUFFaEMsK0NBQWdCLDJCQUFBLEVBQ1E7cUJBRE47K0JBRVYsb0JBQWdCO0VBQUE7RUFFeEIsMkNBQWUseUJBQUEsRUFDQTtpQ0FDTCxvQkFBZ0IsV0FBQyxTQUFRO0VBQUE7RUFFbkMsMkNBQWMseUJBQUEsRUFDSzs7VUFDYixLQUNpQjtZQURqQixLQUFJO0lBQ0osUUFBQSxRQUFTLEVBQ0E7S0FDWixTQUFPLFlBQUksS0FBSyxXQUFHLEtBQUs7SUFBQTs7OztFQUcxQixxREFBb0IsOEJBQUEsRUFBUyxZQUNvQjtxQkFEM0I7cUJBQWlCO2NBQy9CLFlBQVcsRUFBQztHQUNuQixZQUFXLEVBQUM7RUFBQTtFQUVkLDJDQUFlLHlCQUNVOztVQUF4QixjQUFlLEtBQUksVUFBUSxHQUFHO0VBQUE7RUFFL0IsNkNBQWdCLHlCQUFBLElBQ21COztxQkFEZjtVQUNkLEtBQ2tCO2FBRGxCLEtBQUk7SUFDSixRQUFBLE9BQU8sUUFDSztLQUFmLFNBQU8sS0FBSyxJQUFLLFNBQU8sSUFBSTtJQUFBOzs7O0VBRS9CLHVEQUFvQiwrQkFBQSxJQUFXLE9BQ2U7cUJBRHRCO3FCQUFjO1VBQ2hDLEtBQ29CO2VBRHBCLEtBQUk7SUFDSixRQUFBLE9BQU8sY0FBWSxLQUNHO0tBQXpCLFNBQU8sT0FBTyxJQUFLLE9BQVEsU0FBTyxJQUFJO0lBQUEiLCJmaWxlIjoiT2JqZWN0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
