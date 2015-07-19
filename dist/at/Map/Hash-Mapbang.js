"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../hash-code","../../js","../../methods","../../Objectbang","../../Type/Js-Method","../../Type/Kind","../../Type/Tuple","../../Type/Wrap-Type","../at","../atbang","../at-Type","../q","./Map","./Id-Mapbang","./Mapbang","./Map-Type","../Seq/Seq","./Map"],(exports,compare_0,hash_45code_1,js_2,methods_3,Object_33_4,Js_45Method_5,Kind_6,Tuple_7,Wrap_45Type_8,_64_9,_64_33_10,_64_45Type_11,_63_12,Map_13,Id_45Map_33_14,Map_33_15,Map_45Type_16,Seq_17,Map_18)=>{
	exports._get=_ms.lazy(()=>{
		const _$3=_ms.getModule(compare_0),_61_63=_ms.get(_$3,"=?"),hash_45code=_ms.getDefaultExport(hash_45code_1),_$5=_ms.getModule(js_2),defined_63=_ms.get(_$5,"defined?"),_$6=_ms.getModule(methods_3),freeze=_ms.get(_$6,"freeze"),_$7=_ms.getModule(Object_33_4),p_33=_ms.get(_$7,"p!"),_$8=_ms.getModule(Js_45Method_5),js_45impl_33=_ms.get(_$8,"js-impl!"),_$9=_ms.getModule(Kind_6),kind_33=_ms.get(_$9,"kind!"),self_45kind_33=_ms.get(_$9,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_7),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_8),_$12=_ms.getModule(_64_9),iterator=_ms.get(_$12,"iterator"),map=_ms.get(_$12,"map"),_$13=_ms.getModule(_64_33_10),empty_33=_ms.get(_$13,"empty!"),_$14=_ms.getModule(_64_45Type_11),empty=_ms.get(_$14,"empty"),_63=_ms.getDefaultExport(_63_12),_$15=_ms.getModule(_63_12),Opt_45_62_63=_ms.get(_$15,"Opt->?"),_$16=_ms.getModule(Map_13),_63get=_ms.get(_$16,"?get"),values=_ms.get(_$16,"values"),Id_45Map_33=_ms.getDefaultExport(Id_45Map_33_14),Map_33=_ms.getDefaultExport(Map_33_15),_$18=_ms.getModule(Map_33_15),assoc_33=_ms.get(_$18,"assoc!"),un_45assoc_33=_ms.get(_$18,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_16),_$21=_ms.lazyGetModule(Seq_17),seq_61_63=_ms.lazyProp(_$21,"seq=?"),_$22=_ms.lazyGetModule(Map_18),keys=_ms.lazyProp(_$22,"keys");
		const Hash_45Map_33=Wrap_45Type(()=>{
			const built={};
			const doc=built.doc=`Default Map! type. Depends on efficient \`hash-code\` of its keys.`;
			const test=built.test=function test(){
				const _=()=>{
					const built=new global.Map();
					_ms.assoc(built,1,2);
					_ms.assoc(built,3,4);
					return built
				}();
				_ms.assert(_61_63,_ms.sub(_,1),2);
				_ms.assert(_61_63,_ms.sub(_,3),4);
				_ms.assert(_ms.unlazy(seq_61_63),_,()=>{
					const built=[];
					_ms.add(built,[1,2]);
					_ms.add(built,[3,4]);
					return built
				}());
				_ms.assert(_ms.unlazy(seq_61_63),_ms.unlazy(keys)(_),[1,3]);
				_ms.assert(_61_63,_63get(_,8),empty(_63))
			};
			const wrapped_45type=built["wrapped-type"]=Id_45Map_33;
			return _ms.setName(built,"Hash-Map!")
		}());
		const Bucket=Tuple(()=>{
			const built={};
			const props=built.props=[`key`,`val!`,`next!`];
			return _ms.setName(built,"Bucket")
		}());
		self_45kind_33(Hash_45Map_33,Map_45Type,()=>{
			const built=new global.Map();
			_ms.assoc(built,empty,()=>{
				return Hash_45Map_33(empty(Id_45Map_33))
			});
			return built
		}());
		const opt_45bucket_45entry=function opt_45bucket_45entry(opt_45bucket,key){
			let cur=opt_45bucket;
			return ()=>{
				for(;;){
					if(! _ms.bool(defined_63(cur))){
						return void 0
					};
					if(_61_63(cur.key,key)){
						return cur
					};
					cur=cur["next!"]
				}
			}()
		};
		js_45impl_33(iterator,Hash_45Map_33,function*(){
			const _this=this;
			for(let bucket of values(_this.val)){
				let cur=bucket;
				for(;;){
					if(! _ms.bool(defined_63(cur))){
						break
					};
					(yield [cur.key,cur["val!"]]);
					cur=cur["next!"]
				}
			}
		});
		kind_33(Hash_45Map_33,Map_33,()=>{
			const built=new global.Map();
			_ms.assoc(built,_63get,(_,key)=>{
				const bucket=_.val.get(hash_45code(key));
				const entry=opt_45bucket_45entry(bucket,key);
				return map(Opt_45_62_63(entry),_=>{
					return _["val!"]
				})
			});
			_ms.assoc(built,assoc_33,(hm,key,val)=>{
				const hash=hash_45code(key);
				const bucket=hm.val.get(hash);
				{
					const _=opt_45bucket_45entry(bucket,key);
					if(_ms.bool(defined_63(_))){
						p_33(_,`val!`,val)
					} else {
						hm.val.set(hash,Bucket(key,val,bucket))
					}
				}
			});
			_ms.assoc(built,un_45assoc_33,(hm,key)=>{
				const hash=hash_45code(key);
				const bucket=hm.val.get(hash);
				return ()=>{
					const _=bucket;
					if(_ms.bool(defined_63(_))){
						return ()=>{
							if(_ms.bool(_61_63(_.key,key))){
								{
									const _=bucket["next!"];
									if(_ms.bool(defined_63(_))){
										assoc_33(hm.val,key,_)
									} else {
										un_45assoc_33(hm.val,hash)
									}
								};
								return _63(_["val!"])
							} else {
								let cur=bucket;
								return ()=>{
									for(;;){
										const next=cur["next!"];
										if(! _ms.bool(defined_63(_)(next))){
											return empty(_63)
										};
										if(_61_63(next.key,key)){
											p_33(cur,`next!`,next["next!"]);
											return _63(next["val!"])
										};
										cur=next
									}
								}()
							}
						}()
					} else {
						return empty(_63)
					}
				}()
			});
			_ms.assoc(built,freeze,_=>{
				freeze(_.val);
				return Object.freeze(_)
			});
			_ms.assoc(built,empty_33,_=>{
				empty_33(_.val)
			});
			return built
		}());
		const name=exports.name=`Hash-Map!`;
		exports.default=Hash_45Map_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9IYXNoLU1hcCEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUF1QkEsb0JBQVcsZ0JBQ1M7O0dBQW5CLG9CQUFNO0dBRU4sc0JBQ1EsZUFBQTtJQUFQLFlBQ0c7O3FCQUFGLEVBQUs7cUJBQ0wsRUFBSzs7O2VBQ0UsZUFBRyxFQUFFLEdBQUc7ZUFDUixlQUFHLEVBQUUsR0FBRztxQ0FDRixNQUNDOzttQkFBWixDQUFFLEVBQUU7bUJBQ0osQ0FBRSxFQUFFOzs7c0RBQ1csR0FBRSxDQUFFLEVBQUU7ZUFDaEIsT0FBSSxPQUFLLEVBQUUsR0FBSSxNQUFNO0dBQUE7R0FFOUIsMkNBQWM7OztFQUVmLGFBQVMsVUFDSzs7R0FBYix3QkFBTyxDQUFHLE1BQU0sT0FBTzs7O0VBRXhCLGVBQVcsY0FBVSxlQUNROzttQkFBNUIsTUFDVSxJQUFBO1dBQVQsY0FBVyxNQUFNO0dBQUE7OztFQUluQiwyQkFBb0IsOEJBQUEsYUFBVyxJQUNHO0dBQWpDLFFBQVE7O1dBRUw7S0FBRixjQUFRLFdBQVMsTUFDRztNQUFuQixPQUFNOztLQUNQLEdBQUksT0FBRyxRQUFRLEtBQ0c7TUFBakIsT0FBTTtLQUFBO1NBQ0E7Ozs7RUFFVCxhQUFTLFNBQVMsY0FDYyxXQUFBOztHQUExQixRQUFBLFVBQVUsT0FBTyxXQUNJO0lBQXpCLFFBQVE7SUFFSixPQUFBO0tBQUgsY0FBUSxXQUFTLE1BQ0c7TUFBbkI7S0FBQTtZQUNFLENBQUUsUUFBUTtTQUNOOzs7O0VBRVYsUUFBTSxjQUFVLFdBQ0k7O21CQUFuQixPQUFTLENBQUEsRUFBRSxNQUNHO0lBQWIsYUFBUyxVQUFXLFlBQVU7SUFDOUIsWUFBUSxxQkFBaUIsT0FBTztXQUNoQyxJQUFLLGFBQU8sT0FBUSxHQUNDO1lBQXBCOzs7bUJBRUYsU0FBWSxDQUFBLEdBQUcsSUFBSSxNQUNHO0lBQXJCLFdBQU8sWUFBVTtJQUNqQixhQUFTLFdBQVc7SUFDZDtLQUFBLFFBQUEscUJBQWlCLE9BQU87S0FDN0IsWUFBQSxXQUFRLElBQ0M7TUFDUixLQUFHLEVBQUcsT0FBTTtLQUFBLE9BRVQ7TUFDSCxXQUFXLEtBQU0sT0FBTyxJQUFJLElBQUk7S0FBQTtJQUFBO0dBQUE7bUJBRW5DLGNBQWMsQ0FBQSxHQUFHLE1BQ0c7SUFBbkIsV0FBTyxZQUFVO0lBQ2pCLGFBQVMsV0FBVzs7S0FDZixRQUFBO0tBQ0osWUFBQSxXQUFRLElBQ0M7O09BQ1AsWUFBQSxPQUFHLE1BQU0sTUFDRztRQUFMO1NBQUEsUUFBQTtTQUNMLFlBQUEsV0FBUSxJQUNDO1VBQVIsU0FBTyxPQUFPLElBQUk7U0FBQSxPQUVmO1VBQUgsY0FBVSxPQUFPO1NBQUE7UUFBQTtlQUNuQixJQUFFO2NBRUM7UUFBSCxRQUFROztnQkFFTDtVQUFGLFdBQU87VUFDUCxjQUFRLFdBQVEsR0FBRSxPQUNJO1dBQXJCLE9BQU0sTUFBTTtVQUFBO1VBQ2IsR0FBSSxPQUFHLFNBQVMsS0FDRztXQUFsQixLQUFHLElBQUssUUFBTztXQUNmLE9BQU0sSUFBRTs7Y0FDRjtTQUFBO1FBQUE7T0FBQTtNQUFBO0tBQUEsT0FFUDthQUFILE1BQU07S0FBQTtJQUFBO0dBQUE7bUJBRVQsT0FBVyxHQUNDO0lBQVgsT0FBTztXQUNQLGNBQWM7R0FBQTttQkFFZixTQUFZLEdBQ0M7SUFBWixTQUFPOzs7O0VBcEhULHdCQUFBO2tCQXVCQSIsImZpbGUiOiJhdC9NYXAvSGFzaC1NYXBiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=