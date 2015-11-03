"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../control","./../js","./../private/bootstrap","./../to-string","./../Type/Kind","./../Type/Method","./../Type/Type","./at","./at-Type","./Seq/Seq"],(exports,control_0,js_1,bootstrap_2,to_45string_3,Kind_4,Method_5,Type_6,_64_7,_64_45Type_8,Seq_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$1=_ms.getModule(control_0),opr=_ms.get(_$1,"opr"),_$2=_ms.getModule(js_1),defined_63=_ms.get(_$2,"defined?"),id_61_63=_ms.get(_$2,"id=?"),_$3=_ms.getModule(bootstrap_2),msDef=_ms.get(_$3,"msDef"),to_45string=_ms.getDefaultExport(to_45string_3),_$4=_ms.getModule(Kind_4),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(Method_5),self_45impl_33=_ms.get(_$5,"self-impl!"),_$6=_ms.getModule(Type_6),extract=_ms.get(_$6,"extract"),_$7=_ms.getModule(_64_7),empty_63=_ms.get(_$7,"empty?"),iterator=_ms.get(_$7,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_8),_$8=_ms.getModule(_64_45Type_8),empty=_ms.get(_$8,"empty"),from_45stream=_ms.get(_$8,"from-stream"),Seq=_ms.getDefaultExport(Seq_9);
		const _63=exports.default=(()=>{
			const _=class _63{
				static [_ms.symbol(empty)](){
					const _this=this;
					return _63None
				}
				static [_ms.symbol(from_45stream)](_){
					const _this=this;
					const iter=iterator(_);
					const _$0=iter.next(),value=_$0.value,done=_$0.done;
					return (done?_63None:_63some(value))
				}
				constructor(val){
					_ms.newProperty(this,"val",val)
				}
				[_ms.symbol(empty_63)](){
					const _this=this;
					return id_61_63(_this,_63None)
				}
				*[_ms.symbol(iterator)](){
					const _this=this;
					if(! empty_63(_this)){
						(yield _this.val)
					}
				}
				[_ms.symbol(to_45string)](){
					const _this=this;
					return (()=>{
						if(empty_63(_this)){
							return "?None"
						} else {
							return `?some ${_this.val}`
						}
					})()
				}
			};
			_ms.kindDo(_,Seq);
			self_45kind_33(_,_64_45Type);
			return _
		})();
		const empty_45marker=(()=>{
			return new (Object)()
		})();
		const _63None=exports["?None"]=new (_63)(empty_45marker);
		const _63some=exports["?some"]=function _63some(_){
			return new (_63)(_)
		};
		self_45impl_33(extract,_63some,_=>{
			return (()=>{
				if(empty_63(_)){
					return null
				} else {
					return [_.val]
				}
			})()
		});
		msDef("some",_63some);
		msDef("None",_63None);
		const Opt_45_62_63=exports["Opt->?"]=function Opt_45_62_63(_){
			return (defined_63(_)?_ms.some((()=>{
				return _
			})()):_ms.None)
		};
		const _63_45_62Opt=exports["?->Opt"]=function _63_45_62Opt(_){
			_ms.checkContains(_63,_,"_");
			return (()=>{
				if(empty_63(_)){
					return void 0
				} else {
					return _.val
				}
			})()
		};
		const un_45_63=exports["un-?"]=function un_45_63(_,fail_45message){
			_ms.checkContains(_63,_,"_");
			if(empty_63(_))throw opr(_ms.unlazy(fail_45message),`Tried to force empty \`?\`.`);
			return _.val
		};
		const _63_45or=exports["?-or"]=function _63_45or(_,or_45else){
			_ms.checkContains(_63,_,"_");
			return (()=>{
				if(empty_63(_)){
					return _ms.unlazy(or_45else)
				} else {
					return _.val
				}
			})()
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC8/Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBZUEsMEJBQVMsS0FLTjs7dUJBR0Q7V0FvQlE7WUFuQlA7SUFBQTt1QkFFRCxnQkFBYTtXQWlCTDtLQWhCUCxXQUFPLFNBQUE7S0FDUCxVQUFhO1lBQ1IsQ0FBQSxLQUFLLFFBQU8sUUFBTTtJQUFBO0lBRWYsWUFBQTs7O2dCQUdWO1dBU1M7WUFSUixTQVFRLE1BUkU7SUFBQTtpQkFFWDtXQU1TO0tBTFIsS0FBTyxTQUtDLE9BSlU7YUFJVjs7O2dCQUZUO1dBRVM7WUFBSjtNQUFILEdBQUEsU0FBTyxPQUNJO2NBQVQ7TUFBQSxPQUVFO2NBQUYsU0FISzs7Ozs7Z0JBNUJJO0dBS1osZUFBVyxFQUFFOzs7RUE0QmYscUJBQ2MsS0FBQTtVQUNiLEtBQUk7RUFBQTtFQUVMLCtCQUFPLEtBQUksS0FBRTtFQUNiLCtCQUFRLGlCQUFBO1VBQ1AsS0FBSSxLQUFFO0VBQUE7RUFFUCxlQUFXLFFBQVEsUUFBTztVQUNJO0lBQTdCLEdBQUEsU0FBQSxHQUNPO1lBQU47SUFBQSxPQUVHO1lBQUgsQ0FBQzs7OztFQUVILE1BQU8sT0FBSztFQUNaLE1BQU8sT0FBSztFQUdYLHFDQUFTLHNCQUFBO1VBR1IsQ0FBRyxXQUFBLGlCQUNTO1dBQVg7R0FBQTs7RUFFRixxQ0FBUyxzQkFBQTtxQkFBRTtVQUdOO0lBQUgsR0FBQSxTQUFBLEdBQ087WUFBTjtXQUVHO1lBQUg7Ozs7RUFHSCwrQkFBTyxrQkFBQSxFQUFJO3FCQUFGO0dBRUQsR0FBQSxTQUFBLFNBQWMsK0JBQWtCO1VBQ3ZDOztFQUVELCtCQUFPLGtCQUFBLEVBQUk7cUJBQUY7VUFHSjtJQUFILEdBQUEsU0FBQSxHQUNPOztXQUVIO1lBQUgiLCJmaWxlIjoiYXQvcS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
