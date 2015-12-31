"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../Function","./../js","./../math/methods","./../methods","./../to-string","./../String","./../Type/Method","./../Type/Pred-Type","./../Type/Type","./../control","./q","./Seq/Seq","./Seq/Stream","./Set/Set"],(exports,compare_0,Function_1,js_2,methods_3,methods_4,to_45string_5,String_6,Method_7,Pred_45Type_8,Type_9,control_10,_63_11,Seq_12,Stream_13,Set_14)=>{
	exports._get=_ms.lazy(()=>{
		let _$1=_ms.getModule(compare_0),_61_63=_ms.get(_$1,"=?"),_$2=_ms.getModule(Function_1),Action=_ms.get(_$2,"Action"),identity=_ms.get(_$2,"identity"),Pred=_ms.get(_$2,"Pred"),_$3=_ms.getModule(js_2),defined_63=_ms.get(_$3,"defined?"),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(methods_3),_43=_ms.get(_$4,"+"),_$5=_ms.getModule(methods_4),sub=_ms.get(_$5,"sub"),to_45string=_ms.getDefaultExport(to_45string_5),_$6=_ms.getModule(to_45string_5),inspect=_ms.get(_$6,"inspect"),_$7=_ms.getModule(String_6),indent=_ms.get(_$7,"indent"),Method=_ms.getDefaultExport(Method_7),_$8=_ms.getModule(Pred_45Type_8),Any=_ms.get(_$8,"Any"),Opt=_ms.get(_$8,"Opt"),_$9=_ms.getModule(Type_9),_61_62=_ms.get(_$9,"=>"),has_45instance_63=_ms.get(_$9,"has-instance?"),type_45of=_ms.get(_$9,"type-of"),_$10=_ms.lazyGetModule(control_10),opr=_ms.lazyProp(_$10,"opr"),_$11=_ms.lazyGetModule(_63_11),Opt_45_62_63=_ms.lazyProp(_$11,"Opt->?"),_$12=_ms.lazyGetModule(Seq_12),_43_62_33=_ms.lazyProp(_$12,"+>!"),_43_43_62_33=_ms.lazyProp(_$12,"++>!"),first=_ms.lazyProp(_$12,"first"),seq_61_63=_ms.lazyProp(_$12,"seq=?"),_64tail=_ms.lazyProp(_$12,"@tail"),Stream=_ms.lazy(()=>_ms.getDefaultExport(Stream_13)),Set=_ms.lazy(()=>_ms.getDefaultExport(Set_14));
		let _64=exports.default=_ms.trait("@",[],{
			[_ms.symbol(_61_62)](stream){
				let _this=this;
				return from_45stream(_this,stream)
			},
			[_ms.symbol(sub)](){
				let _this=this;
				return _this
			}
		},{
			[_ms.symbol(has_45instance_63)](em){
				let _this=this;
				_ms.checkInstance(Any,em,"em");
				return any_63(_this,em_45compare=>{
					return _61_63(em,em_45compare)
				})
			},
			[_ms.symbol(_61_63)](_64other){
				let _this=this;
				return (id_61_63(type_45of(_this),type_45of(_64other))&&_ms.unlazy(seq_61_63)(_this,_64other))
			},
			[_ms.symbol(to_45string)](){
				let _this=this;
				return do_45inspect(_this,to_45string)
			},
			[_ms.symbol(inspect)](){
				let _this=this;
				return do_45inspect(_this,inspect)
			}
		});
		let do_45inspect=function do_45inspect(_,recurse){
			return (()=>{
				if(empty_63(_)){
					return `empty ${_.constructor.name}`
				} else {
					let content=(()=>{
						let show_45ems=_61_62(Array,(()=>{
							let built=[];
							for(let em of _){
								_ms.add(built,indent(recurse(em)))
							};
							return built
						})());
						return `\n\t. ${show_45ems.join(`\n\t. `)}`
					})();
					return `${_.constructor.name}${content}`
				}
			})()
		};
		let iterator=exports.iterator=new (Method)((()=>{
			let built={};
			built.name="iterator";
			let args=built.args=[];
			let impl_45symbol=built["impl-symbol"]=Symbol.iterator;
			return built
		})());
		let empty_63=exports["empty?"]=_ms.method("empty?",[],function(){
			let _this=this;
			return iterator(_this).next().done
		});
		let empty=exports.empty=_ms.method("empty",[],function(){
			let _this=this;
			return new (_this)()
		});
		let from_45stream=exports["from-stream"]=_ms.method("from-stream",[["stream",_64]],function(stream){
			let _this=this;
			_ms.checkInstance(_64,stream,"stream");
			return (()=>{
				let _=empty(_this);
				_43_43_33(_,stream);
				return _
			})()
		});
		let each_33=exports["each!"]=function each_33(_,do_45for_45each_33){
			_ms.checkInstance(_64,_,"_");
			_ms.checkInstance(Action,do_45for_45each_33,"do-for-each!");
			for(let elem of _){
				do_45for_45each_33(elem)
			}
		};
		let fold=exports.fold=function fold(_,b,c){
			_ms.checkInstance(_64,_,"_");
			let _$0=(()=>{
				if(defined_63(c)){
					let built={};
					let start=built.start=b;
					let folder=built.folder=c;
					let rest=built.rest=_;
					return built
				} else {
					let built={};
					let start=built.start=_ms.unlazy(first)(_);
					let folder=built.folder=b;
					let rest=built.rest=_ms.unlazy(_64tail)(_);
					return built
				}
			})(),start=_$0.start,rest=_$0.rest,folder=_$0.folder;
			let acc=start;
			for(let _ of rest){
				acc=folder(acc,_)
			};
			return acc
		};
		let any_63=exports["any?"]=function any_63(_,pred_63){
			_ms.checkInstance(_64,_,"_");
			_ms.checkInstance(_ms.sub(Opt,Pred),pred_63,"pred?");
			pred_63=_ms.unlazy(opr)(pred_63,identity);
			return ! empty_63(_63find(_,pred_63))
		};
		let all_63=exports["all?"]=function all_63(_,pred_63){
			_ms.checkInstance(_64,_,"_");
			_ms.checkInstance(_ms.sub(Opt,Pred),pred_63,"pred?");
			pred_63=_ms.unlazy(opr)(pred_63,identity);
			return empty_63(_63find(_,em=>{
				return ! pred_63(em)
			}))
		};
		let _63find=exports["?find"]=function _63find(_,pred_63){
			_ms.checkInstance(Pred,pred_63,"pred?");
			return _ms.unlazy(Opt_45_62_63)((()=>{
				for(let elem of _){
					if(pred_63(elem)){
						return elem
					}
				}
			})())
		};
		let count=exports.count=_ms.method("count",[],function(){
			let _this=this;
			return fold(_this,0,_ms.sub(_43,1))
		});
		let _64keep=exports["@keep"]=_ms.method("@keep",[["keep-if?",Pred]],function(keep_45if_63){
			let _this=this;
			_ms.checkInstance(Pred,keep_45if_63,"keep-if?");
			return _61_62(type_45of(_this),(()=>{
				let built=[];
				for(let _ of _this){
					if(keep_45if_63(_)){
						_ms.add(built,_)
					}
				};
				return built
			})())
		});
		let _64keep_126=exports["@keep~"]=function _64keep_126(_64filtered,keep_45if_63){
			_ms.checkInstance(_64,_64filtered,"@filtered");
			_ms.checkInstance(Pred,keep_45if_63,"keep-if?");
			return new (_ms.unlazy(Stream))(function*(){
				for(let _ of _64filtered){
					if(keep_45if_63(_)){
						(yield _)
					}
				}
			})
		};
		let _64toss=exports["@toss"]=function _64toss(_64filtered,toss_45if_63){
			_ms.checkInstance(_64,_64filtered,"@filtered");
			_ms.checkInstance(Pred,toss_45if_63,"toss-if?");
			return _64keep(_64filtered,_=>! toss_45if_63(_))
		};
		let _64toss_126=exports["@toss~"]=function _64toss_126(_64filtered,toss_45if_63){
			_ms.checkInstance(_64,_64filtered,"@filtered");
			_ms.checkInstance(Pred,toss_45if_63,"toss-if?");
			return _64keep_126(_64filtered,_=>! toss_45if_63(_))
		};
		let _64map=exports["@map"]=function _64map(_,mapper){
			_ms.checkInstance(_64,_,"_");
			_ms.checkInstance(Function,mapper,"mapper");
			return _61_62(type_45of(_),(()=>{
				let built=[];
				for(let elem of _){
					_ms.add(built,mapper(elem))
				};
				return built
			})())
		};
		let _64map_126=exports["@map~"]=function _64map_126(mapped,mapper){
			_ms.checkInstance(_64,mapped,"mapped");
			_ms.checkInstance(Function,mapper,"mapper");
			return new (_ms.unlazy(Stream))(function*(){
				for(let _ of mapped){
					(yield mapper(_))
				}
			})
		};
		let _64flat_45map=exports["@flat-map"]=_ms.method("@flat-map",[["mapper",_ms.sub(Function,Any,_64)]],function(mapper){
			let _this=this;
			_ms.checkInstance(_ms.sub(Function,Any,_64),mapper,"mapper");
			return _61_62(type_45of(_this),(()=>{
				let built=[];
				for(let _ of _this){
					_ms.addMany(built,mapper(_))
				};
				return built
			})())
		});
		let _64flat_45map_126=exports["@flat-map~"]=function _64flat_45map_126(mapped,mapper){
			_ms.checkInstance(_64,mapped,"mapped");
			_ms.checkInstance(_ms.sub(Function,Any,_64),mapper,"mapper");
			return new (_ms.unlazy(Stream))(function*(){
				for(let _ of mapped){
					(yield* iterator(mapper(_)))
				}
			})
		};
		let _64flatten=exports["@flatten"]=_ms.method("@flatten",[],function(){
			let _this=this;
			return _61_62(type_45of(_this),(()=>{
				let built=[];
				for(let _ of _this){
					_ms.addMany(built,_)
				};
				return built
			})())
		});
		let _64flatten_126=exports["@flatten~"]=function _64flatten_126(flattened){
			return new (_ms.unlazy(Stream))(function*(){
				for(let _ of flattened){
					(yield* iterator(_))
				}
			})
		};
		let _43_43=exports["++"]=_ms.method("++",[["@other",_64]],function(_64other){
			let _this=this;
			_ms.checkInstance(_64,_64other,"@other");
			return _61_62(type_45of(_this),(()=>{
				let built=[];
				_ms.addMany(built,_this);
				_ms.addMany(built,_64other);
				return built
			})())
		});
		let _43_43_126=exports["++~"]=function _43_43_126(_64a,_64b){
			return _ms.checkInstance(_ms.unlazy(Stream),new (_ms.unlazy(Stream))(function*(){
				(yield* iterator(_64a));
				(yield* iterator(_64b))
			}),"returned value")
		};
		let _45_45=exports["--"]=_ms.method("--",[["@remove",_64]],function(_64remove){
			let _this=this;
			_ms.checkInstance(_64,_64remove,"@remove");
			return _61_62(type_45of(_this),_45_45_126(_this,_64remove))
		});
		let _45_45_126=exports["--~"]=function _45_45_126(_64removed_45from,_64remove){
			_ms.checkInstance(_64,_64remove,"@remove");
			return _ms.checkInstance(_64,new (_ms.unlazy(Stream))(function*(){
				let _64remove_45remaining=_61_62(_ms.unlazy(Set),_64remove);
				for(let _ of _64removed_45from){
					if(_ms.hasInstance(_64remove_45remaining,_)){
						_45_45_33(_64remove_45remaining,[_])
					} else {
						(yield _)
					}
				}
			}),"returned value")
		};
		let empty_33=exports["empty!"]=_ms.method("empty!",[]);
		let _43_33=exports["+!"]=_ms.method("+!",["added"],function(added){
			let _this=this;
			_ms.unlazy(_43_62_33)(_this,added)
		});
		let _43_43_33=exports["++!"]=_ms.method("++!",[["@added",_64]],function(_64added){
			let _this=this;
			_ms.checkInstance(_64,_64added,"@added");
			_ms.unlazy(_43_43_62_33)(_this,_64added)
		});
		let _45_33=exports["-!"]=_ms.method("-!",[["@removed",_64]]);
		let _45_45_33=exports["--!"]=_ms.method("--!",[["@removed",_64]]);
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9ALm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBa0JBO2VBTUUsU0FBSSxPQUNNO1FBNk5MO1dBN05KLGNBNk5JLE1BN05hO0dBQUE7ZUFFbEIsT0FDSztRQTBOQTtXQUFBO0dBQUE7RUFBQTtlQXZOTixvQkFBZSxHQUNNO1FBc05mO3NCQXZOWTtXQUVqQixPQXFOSyxNQXJOTSxjQUNVO1lBQXBCLE9BQUcsR0FBRztJQUFBO0dBQUE7ZUFFUixTQUFJLFNBQ007UUFpTko7V0FqTkwsQ0FBSyxTQUFNLFVBaU5OLE9Bak5xQixVQUFRLGtDQWlON0IsTUFqTmtEO0dBQUE7ZUFFeEQsZUFDVztRQThNTDtXQTlNTCxhQThNSyxNQTlNVztHQUFBO2VBRWpCLFdBQ1M7UUEyTUg7V0EzTUwsYUEyTUssTUEzTVc7R0FBQTtFQUFBO0VBRWxCLGlCQUFlLHNCQUFBLEVBQUMsUUFDTztVQUNsQjtJQUFILEdBQUEsU0FBUSxHQUNBO1lBQU4sU0FBUztXQUVQO0tBQUgsWUFDUyxLQUFBO01BQ1IsZUFBVyxPQUFHLE1BQVc7O2VBQUEsTUFBTyxFQUNBO3NCQUE3QixPQUFRLFFBQVE7T0FBQTs7O2FBQ2xCLFNBQVEsZ0JBQWU7O1lBQ3hCLEdBQUcscUJBQW1COzs7O0VBRTFCLDhCQUFVLEtBQUksUUFDTSxLQUFBOztjQUNuQjtHQUNBLG9CQUFNO0dBQ04sdUNBQWE7OztFQUVkLHNEQUNnQixVQUFBO09Bc0xUO1VBckxMLFNBcUxLOztFQWxMTiw4Q0FDZSxVQUFBO09BaUxUO1VBL0tMLEtBK0tLO0VBQUE7RUE3S04sNkVBQTRCLE1BQVAsU0FBQSxPQUNRO09BNEt2QjtxQkE3S3NCO1VBRXRCLEtBQ1U7VUFEVixNQTJLQTtJQTFLSixVQUFLLEVBQUM7Ozs7RUFHUiw2QkFBUyxpQkFBQSxFQUFJLG1CQUNtQjtxQkFEckI7cUJBQWU7R0FNckIsUUFBQSxRQUFTLEVBQ0E7SUFBWixtQkFBYTtHQUFBO0VBQUE7RUFFZixzQkFBTyxjQUFBLEVBQUksRUFBRSxFQUNDO3FCQURMO0dBSVIsUUFDd0I7SUFBdkIsR0FBQSxXQUFTLEdBQ0M7O0tBQVQsc0JBQU87S0FDUCx3QkFBUTtLQUNSLG9CQUFPOztXQUVKOztLQUFILHdDQUFhO0tBQ2Isd0JBQVE7S0FDUix3Q0FBWTs7OztHQUVkLFFBQU07R0FDRixRQUFBLEtBQUEsS0FDSTtRQUFBLE9BQU8sSUFBSztHQUFBO1VBQ3BCO0VBQUE7RUFFRCwyQkFBTyxnQkFBQSxFQUFJLFFBQ2U7cUJBRGpCOzZCQUFRLElBQUk7MkJBRVAsUUFBTTtVQUNuQixFQUFJLFNBQVEsUUFBTyxFQUFDO0VBQUE7RUFFckIsMkJBQU8sZ0JBQUEsRUFBSSxRQUNlO3FCQURqQjs2QkFBUSxJQUFJOzJCQUVQLFFBQU07VUFDbkIsU0FBUSxRQUFPLEVBQUUsSUFDRTtXQUFsQixFQUFJLFFBQU07R0FBQTtFQUFBO0VBRVosNkJBQVMsaUJBQUEsRUFBQyxRQUNVO3FCQURKO21DQUlKO1lBQUEsUUFBUyxFQUNBO0tBQWhCLEdBQUEsUUFBTSxNQUNJO01BQVosT0FBTTtLQUFBO0lBQUE7R0FBQTtFQUFBO0VBRVQsOENBQ2UsVUFBQTtPQXVIVDtVQXRITCxLQXNISyxNQXRISyxVQUFFLElBQUU7RUFBQTtFQUtmLDZEQUF3QixPQUFULFNBQUEsYUFDYTtPQWdIdEI7cUJBakhrQjtVQUd2QixPQUFJLFVBOEdDLE9BOUdrQjs7WUFBQSxLQThHbEIsTUE3R3NCO0tBQXZCLEdBQUEsYUFBUyxHQUNBO29CQUFSO0tBQUE7SUFBQTs7OztFQUVOLGtDQUFTLHFCQUFBLFlBQVksYUFDYTtxQkFEZjtxQkFBVztVQUc3Qix5QkFDYyxXQUFBO0lBQVQsUUFBQSxLQUFBLFlBQ1M7S0FBVCxHQUFBLGFBQVMsR0FDQTthQUFKO0tBQUE7SUFBQTtHQUFBO0VBQUE7RUFFWCw2QkFBUSxpQkFBQSxZQUFZLGFBQ2E7cUJBRGY7cUJBQVc7VUFHNUIsUUFBTSxlQUFZLEVBQUksYUFBUztFQUFBO0VBRWhDLGtDQUFTLHFCQUFBLFlBQVksYUFDYTtxQkFEZjtxQkFBVztVQUU3QixZQUFPLGVBQVksRUFBSSxhQUFTO0VBQUE7RUFHakMsMkJBQU8sZ0JBQUEsRUFBSSxPQUNlO3FCQURqQjtxQkFBUztVQUdqQixPQUFHLFVBQVEsR0FBTTs7WUFBQSxRQUFTLEVBQ0E7bUJBQXZCLE9BQU87SUFBQTs7OztFQUVYLGdDQUFRLG9CQUFBLE9BQVMsT0FDZTtxQkFEakI7cUJBQVM7VUFHdkIseUJBQ2MsV0FBQTtJQUFULFFBQUEsS0FBQSxPQUNNO1lBQUgsT0FBTztJQUFBO0dBQUE7RUFBQTtFQUdoQixpRkFBMEIsU0FBUyxJQUFJLE9BQXBCLFNBQUEsT0FDc0I7T0F5RW5DOzZCQTFFb0IsU0FBUyxJQUFJO1VBR3RDLE9BQUksVUF1RUMsT0F2RWtCOztZQUFBLEtBdUVsQixNQXRFc0I7dUJBQXRCLE9BQU87SUFBQTs7OztFQUViLDRDQUFhLDJCQUFBLE9BQVMsT0FDc0I7cUJBRHhCOzZCQUFTLFNBQVMsSUFBSTtVQUd6Qyx5QkFDYyxXQUFBO0lBQVQsUUFBQSxLQUFBLE9BQ007YUFBRixTQUFTLE9BQU87SUFBQTtHQUFBO0VBQUE7RUFFMUIsNERBQ2tCLFVBQUE7T0E0RFo7VUF4REwsT0FBSSxVQXdEQyxPQXhEa0I7O1lBQUEsS0F3RGxCLE1BdkRzQjt1QkFBckI7SUFBQTs7OztFQUVQLHdDQUFZLHdCQUFBLFVBQ1M7VUFFcEIseUJBQ2MsV0FBQTtJQUFULFFBQUEsS0FBQSxVQUNTO2FBQUwsU0FBUztJQUFBO0dBQUE7RUFBQTtFQUVuQixvREFBbUIsTUFBUCxTQUFBLFNBQ1E7T0E2Q2Q7cUJBOUNhO1VBR2xCLE9BQUksVUEyQ0MsT0ExQ1ksS0FBQTs7c0JBMENaO3NCQXpDQTs7OztFQUVOLDhCQUFNLG9CQUFRLEtBQUcsS0FDRTsrQ0FFbEIseUJBQ2MsV0FBQTtZQUFOLFNBQVM7WUFDVCxTQUFTO0dBQUE7O0VBR2xCLHFEQUFvQixNQUFSLFNBQUEsVUFDUztPQThCZjtxQkEvQmM7VUFHbkIsT0FBSSxVQTRCQyxPQTVCYyxXQTRCZCxNQTVCdUI7RUFBQTtFQUU3Qiw4QkFBTSxvQkFBRyxrQkFBYyxVQUNTO3FCQUREOzRCQUF4QixJQUdOLHlCQUNjLFdBQUE7SUFBYiwwQkFBb0IsdUJBQU87SUFDdkIsUUFBQSxLQUFBLGtCQUNhO0tBQ1osbUJBQUYsc0JBQUQsR0FDa0I7TUFDakIsVUFBSSxzQkFBa0IsQ0FBRTtLQUFBLE9BRXJCO2FBQUk7S0FBQTtJQUFBO0dBQUE7O0VBR1o7RUFLQSxtREFBYSxTQUFBLE1BQ0s7T0FNWjt5QkFBQSxNQUxJO0VBQUE7RUFFVix5REFBcUIsTUFBUCxTQUFBLFNBQ1E7T0FFaEI7cUJBSGU7NEJBR2YsTUFBSztFQUFBO0VBR1gsc0RBQXFCO0VBSXJCLDJEQUFzQiIsImZpbGUiOiJhdC9hdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
