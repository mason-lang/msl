"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../hash-code","./../../js","./../../methods","./../../Type/Kind","./../at","./../at-Type","./../q","./Id-Map","./Map","./Map-Type"],(exports,compare_0,hash_45code_1,js_2,methods_3,Kind_4,_64_5,_64_45Type_6,_63_7,Id_45Map_8,Map_9,Map_45Type_10)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),hash_45code=_ms.getDefaultExport(hash_45code_1),_$1=_ms.getModule(js_2),defined_63=_ms.get(_$1,"defined?"),_$2=_ms.getModule(methods_3),del_45sub_33=_ms.get(_$2,"del-sub!"),set_45sub_33=_ms.get(_$2,"set-sub!"),_$3=_ms.getModule(Kind_4),self_45kind_33=_ms.get(_$3,"self-kind!"),_$4=_ms.getModule(_64_5),empty_33=_ms.get(_$4,"empty!"),iterator=_ms.get(_$4,"iterator"),_64map=_ms.get(_$4,"@map"),_$5=_ms.getModule(_64_45Type_6),empty=_ms.get(_$5,"empty"),_$6=_ms.getModule(_63_7),_63None=_ms.get(_$6,"?None"),Opt_45_62_63=_ms.get(_$6,"Opt->?"),_63some=_ms.get(_$6,"?some"),Id_45Map=_ms.getDefaultExport(Id_45Map_8),Map=_ms.getDefaultExport(Map_9),_$7=_ms.getModule(Map_9),_63get=_ms.get(_$7,"?get"),Map_45Type=_ms.getDefaultExport(Map_45Type_10);
		const Hash_45Map=exports.default=(()=>{
			const _=class Hash_45Map{
				static [_ms.symbol(empty)](){
					const _this=this;
					return new (_this)(new (global.Map)())
				}
				constructor(val){
					_ms.newProperty(this,"val",val);
					_ms.checkContains(Id_45Map,val,"val")
				}
				*[_ms.symbol(iterator)](){
					const _this=this;
					for(let bucket of _this.val.values()){
						let cur=bucket;
						for(;;){
							if(! defined_63(cur)){
								break
							};
							(yield [cur.key,cur["val!"]]);
							cur=cur["next!"]
						}
					}
				}
				[_ms.symbol(_63get)](key){
					const _this=this;
					const bucket=_this.val.get(hash_45code(key));
					const entry=opt_45bucket_45entry(bucket,key);
					return _64map(Opt_45_62_63(entry),_=>{
						return _["val!"]
					})
				}
				[_ms.symbol(set_45sub_33)](key,val){
					const _this=this;
					const hash=hash_45code(key);
					const bucket=_this.val.get(hash);
					{
						const _=opt_45bucket_45entry(bucket,key);
						if(defined_63(_)){
							_["val!"]=val
						} else {
							_this.val.set(hash,new (Bucket)(key,val,bucket))
						}
					}
				}
				[_ms.symbol(del_45sub_33)](key){
					const _this=this;
					const hash=hash_45code(key);
					const bucket=_this.val.get(hash);
					return (()=>{
						const _=bucket;
						if(defined_63(_)){
							return (()=>{
								if(_61_63(_.key,key)){
									{
										const _=bucket["next!"];
										if(defined_63(_)){
											_this.val.set(key,_)
										} else {
											_this.val.delete(hash)
										}
									};
									return _63some(_["val!"])
								} else {
									let cur=bucket;
									return (()=>{
										for(;;){
											const next=cur["next!"];
											if(! defined_63(next)){
												return _63None
											};
											if(_61_63(next.key,key)){
												cur["next!"]=next["next!"];
												return _63some(next["val!"])
											};
											cur=next
										}
									})()
								}
							})()
						} else {
							return _63None
						}
					})()
				}
				[_ms.symbol(empty_33)](){
					const _this=this;
					_this.val.clear()
				}
			};
			_ms.kindDo(_,Map);
			self_45kind_33(_,Map_45Type);
			return _
		})();
		const Bucket=class Bucket{
			constructor(key,val_33,next_33){
				_ms.newProperty(this,"key",key);
				_ms.newMutableProperty(this,"val!",val_33);
				_ms.newMutableProperty(this,"next!",next_33)
			}
		};
		const opt_45bucket_45entry=function opt_45bucket_45entry(opt_45bucket,key){
			let cur=opt_45bucket;
			return (()=>{
				for(;;){
					if(! defined_63(cur)){
						return void 0
					};
					if(_61_63(cur.key,key)){
						return cur
					};
					cur=cur["next!"]
				}
			})()
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvSGFzaC1NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFpQkEsaUNBQWdCLEtBR1o7O3VCQUdGO1dBNERBO1lBM0RDLEtBMkRELE9BM0RXLEtBQUk7O0lBRUwsWUFBQTs7dUJBQUs7O2lCQUdoQjtXQXNEQztLQXJESyxRQUFBLFVBcURMLG1CQXBENEI7TUFBM0IsUUFBUTtNQUVKLE9BQUE7T0FBSCxLQUFRLFdBQVMsS0FDRztRQUFuQjtPQUFBO2NBQ0UsQ0FBQyxRQUFRO1dBQ0w7Ozs7Z0JBRVYsU0FBTTtXQTZDTDtLQTVDQSxhQTRDQSxjQTVDbUIsWUFBVTtLQUM3QixZQUFRLHFCQUFpQixPQUFPO1lBRWhDLE9BQU0sYUFBTyxPQUFRO2FBQ3BCOzs7Z0JBRUYsZUFBVyxJQUFJO1dBc0NkO0tBckNBLFdBQU8sWUFBVTtLQUNqQixhQW9DQSxjQXBDa0I7S0FDWjtNQUFBLFFBQUEscUJBQWlCLE9BQU87TUFDN0IsR0FBQSxXQUFBLEdBQ1M7T0FDUixVQUFVO01BQUEsT0FFUDtPQThCTCxjQTdCVyxLQUFNLEtBQUksUUFBTyxJQUFJLElBQUk7TUFBQTtLQUFBO0lBQUE7Z0JBRXJDLGVBQVU7V0EyQlQ7S0ExQkEsV0FBTyxZQUFVO0tBQ2pCLGFBeUJBLGNBekJrQjtZQUNiO01BQUEsUUFBQTtNQUNKLEdBQUEsV0FBQSxHQUNTO2NBQ0o7UUFBSCxHQUFBLE9BQUcsTUFBTSxLQUNHO1NBQUw7VUFBQSxRQUFBO1VBQ0wsR0FBQSxXQUFBLEdBQ1M7V0FrQmQsY0FsQmUsSUFBSTtVQUFBLE9BRVY7V0FnQlQsaUJBaEJrQjtVQUFBO1NBQUE7Z0JBQ2QsUUFBTTtlQUVIO1NBQUgsUUFBUTtnQkFFTDtpQkFBQTtXQUFGLFdBQU87V0FDUCxLQUFRLFdBQVMsTUFDSTtZQUFwQixPQUFNO1dBQUE7V0FDUCxHQUFJLE9BQUcsU0FBUyxLQUNHO1lBQWxCLGFBQWE7WUFDYixPQUFNLFFBQU07O2VBQ047VUFBQTtTQUFBO1FBQUE7T0FBQTtNQUFBLE9BRVA7Y0FBSDtNQUFBO0tBQUE7SUFBQTtnQkFFSDtXQUNDO0tBQUE7OztnQkFsRW1CO0dBR25CLGVBQVcsRUFBRTs7O0VBa0VkLGFBQ2M7R0FBRixZQUFBLElBQUssT0FBSzs7MkJBQ3BCLFlBQVU7MkJBQ1YsYUFBVztHQUFBO0VBQUE7RUFJYiwyQkFBb0IsOEJBQUEsYUFBVztHQUM5QixRQUFRO1VBRUw7V0FBQTtLQUFGLEtBQVEsV0FBUyxLQUNHO01BQW5CLE9BQU07O0tBQ1AsR0FBSSxPQUFHLFFBQVEsS0FDRztNQUFqQixPQUFNO0tBQUE7U0FDQSIsImZpbGUiOiJhdC9NYXAvSGFzaC1NYXAuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
