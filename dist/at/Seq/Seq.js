"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../Function","../../math/methods","../../methods","../../String","../../Type/Kind","../../Type/Method","../../Type/Type","../at","../at-Type","../../math/Number","../../to-string","../q","../Range","./Stream","../../compare","../../Try","../q"],(exports,compare_0,Function_1,methods_2,methods_3,String_4,Kind_5,Method_6,Type_7,_64_8,_64_45Type_9,Number_10,to_45string_11,_63_12,Range_13,Stream_14,compare_15,Try_16,_63_17)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(Function_1),Pred=_ms.get(_$3,"Pred"),_$4=_ms.getModule(methods_2),_45=_ms.get(_$4,"-"),_43=_ms.get(_$4,"+"),_$5=_ms.getModule(methods_3),freeze=_ms.get(_$5,"freeze"),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(String_4),indent=_ms.get(_$6,"indent"),Kind=_ms.getDefaultExport(Kind_5),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),Method=_ms.getDefaultExport(Method_6),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),type_45of=_ms.get(_$9,"type-of"),_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),_43_43=_ms.get(_$10,"++"),count=_ms.get(_$10,"count"),empty_63=_ms.get(_$10,"empty?"),iterator=_ms.get(_$10,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),from_45stream=_ms.get(_$11,"from-stream"),_$12=_ms.lazyGetModule(Number_10),Nat=_ms.lazyProp(_$12,"Nat"),to_45string=_ms.lazy(()=>_ms.getDefaultExport(to_45string_11)),_$13=_ms.lazyGetModule(_63_12),Opt_45_62_63=_ms.lazyProp(_$13,"Opt->?"),un_45_63=_ms.lazyProp(_$13,"un-?"),Range=_ms.lazy(()=>_ms.getDefaultExport(Range_13)),Stream=_ms.lazy(()=>_ms.getDefaultExport(Stream_14)),_$14=_ms.lazyGetModule(compare_15),_60_63=_ms.lazyProp(_$14,"<?"),_$15=_ms.lazyGetModule(Try_16),fails_63=_ms.lazyProp(_$15,"fails?"),_$16=_ms.lazyGetModule(_63_17),_63some=_ms.lazyProp(_$16,"?some"),_63None=_ms.lazyProp(_$16,"?None");
		const Seq=new (Kind)((()=>{
			const built={};
			built[`name`]="Seq";
			const doc=built.doc=`@ whose values are in a meaningful order.`;
			return built
		})());
		kind_33(Seq,_64);
		self_45kind_33(Seq,_64_45Type);
		const _60_43_43_39=exports["<++'"]=new (Method)((()=>{
			const built={};
			built[`name`]="<++'";
			const doc=built.doc=`TODO:REST
(There is no \`++>'\` because \`++\` by default adds to the right for Seqs.)`;
			const test=built.test=function test(){};
			const args=built.args=2;
			const _default=built.default=function _default(left_45added){
				const _this=this;
				_ms.checkContains(_64,left_45added,"left-added");
				return _61_62(type_45of(_this),_43_43(left_45added,_this))
			};
			return built
		})());
		const first=exports.first=(()=>{
			const built={};
			const doc=built.doc=`First value in iteration order.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],1);
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return first([])
				});
				return built
			};
			return _ms.set(_=>{
				return _ms.unlazy(un_45_63)(_63first(_),`Can not take first of empty.`)
			},built)
		})();
		const _63first=exports["?first"]=new (Method)((()=>{
			const built={};
			built[`name`]="?first";
			const doc=built.doc=`First value in iteration order, if non-empty.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],_ms.unlazy(_63some)(1));
				_ms.assoc(built,[[]],_ms.unlazy(_63None));
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return _63nth(_this,0)
			};
			return built
		})());
		const last=exports.last=(()=>{
			const built={};
			const doc=built.doc=`Last value in iteration order.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],2);
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return last([])
				});
				return built
			};
			const args=built.args=1;
			return _ms.set(_=>{
				return _ms.unlazy(un_45_63)(_63last(_),`Can not take last of empty.`)
			},built)
		})();
		const _63last=exports["?last"]=new (Method)((()=>{
			const built={};
			built[`name`]="?last";
			const doc=built.doc=`Last value in iteration order, if non-empty.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],_ms.unlazy(_63some)(2));
				_ms.assoc(built,[[]],_ms.unlazy(_63None));
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return empty_63(_this)?_ms.None:_ms.some((()=>{
					return _ms.sub(_this,_45(count(_this),1))
				})())
			};
			return built
		})());
		const tail=exports.tail=new (Method)((()=>{
			const built={};
			built[`name`]="tail";
			const doc=built.doc=`All elements but the first.
TODO: Eager for Linked-Lists.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],[2]);
				_ms.assoc(built,[[]],[]);
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return (()=>{
					const _=_this;
					if(empty_63(_)){
						return _
					} else {
						return drop(_,1)
					}
				})()
			};
			return built
		})());
		const rtail=exports.rtail=new (Method)((()=>{
			const built={};
			built[`name`]="rtail";
			const doc=built.doc=`All elements but the last.
TODO: Eager for finger trees.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],[1]);
				_ms.assoc(built,[[]],[]);
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return (()=>{
					const _=_this;
					if(empty_63(_)){
						return _
					} else {
						return take(_,_45(count(_),1))
					}
				})()
			};
			return built
		})());
		const seq_61_63=exports["seq=?"]=(()=>{
			const built={};
			const doc=built.doc=`Whether two @s share the same elements in the same order.
The types of the @s do not matter.
Equivalent to \`=? (=> Array @a) (=> Array @b)\`, but may not have to fully unlazy both.`;
			const test=built.test=function test(){
				const s=new (_ms.unlazy(Stream))(function*(){
					(yield 1)
				});
				_ms.assert(seq_61_63,s,[1]);
				_ms.assertNot(seq_61_63,s,[2])
			};
			return _ms.set((_64a,_64b)=>{
				_ms.checkContains(_64,_64a,"@a");
				_ms.checkContains(_64,_64b,"@b");
				const iter_45a=iterator(_64a);
				const iter_45b=iterator(_64b);
				return (()=>{
					for(;;){
						const next_45a=iter_45a.next();
						const next_45b=iter_45b.next();
						if(next_45a.done){
							return next_45b.done
						} else if(next_45b.done){
							return false
						} else if(_61_63(next_45a.value,next_45b.value)){} else {
							return false
						}
					}
				})()
			},built)
		})();
		const _63nth=exports["?nth"]=new (Method)((()=>{
			const built={};
			built[`name`]="?nth";
			const doc=built.doc=`|_ n:Nat
\`n\`th element in iteration order, if there are at least that many values.
0th is the first."`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1],1],_ms.unlazy(_63some)(1));
				_ms.assoc(built,[[0,1],2],_ms.unlazy(_63None));
				return built
			};
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`n`,_ms.unlazy(Nat)]);
				return built
			})();
			const _default=built.default=function _default(n){
				const _this=this;
				let i=0;
				return _ms.unlazy(Opt_45_62_63)((()=>{
					for(let elem of _this){
						{
							const _=elem;
							if(_61_63(i,n)){
								return _
							} else {
								i=_43(1,i)
							}
						}
					}
				})())
			};
			return built
		})());
		impl_33(sub,Seq,(()=>{
			const built={};
			const doc=built.doc=`Nth value in iteration order.`;
			const test=built.test=function test(){
				_ms.assert(_61_63,_ms.sub([0,1],1),1);
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return _ms.sub([0,1],2)
				})
			};
			return _ms.set(function(n){
				const _this=this;
				_ms.checkContains(_ms.unlazy(Nat),n,"n");
				return _ms.unlazy(un_45_63)(_63nth(_this,n),_ms.lazy(()=>`No element at index ${n} for
	${indent(_ms.unlazy(to_45string)(_this))}`))
			},built)
		})());
		const slice_45args=(()=>{
			const built=[];
			_ms.add(built,`_`);
			_ms.add(built,[`start`,_ms.unlazy(Nat)]);
			_ms.add(built,[`end`,_ms.unlazy(Nat)]);
			return built
		})();
		const slice=exports.slice=new (Method)((()=>{
			const built={};
			built[`name`]="slice";
			const doc=built.doc=`The elements from index start (inclusive) to end (exclusive).
Takes as much as possible.
Result length should be - end start, unless \`end\` was past the end.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1,2,3],1,3],[1,2]);
				return built
			};
			const args=built.args=slice_45args;
			const _default=built.default=function _default(start,end){
				const _this=this;
				return _61_62(type_45of(_this),slice_39(_this,start,end))
			};
			return built
		})());
		const slice_39=exports["slice'"]=(()=>{
			const built={};
			const doc=built.doc=`Lazy slice.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1,2,3],1,3],_61_62(_ms.unlazy(Stream),[1,2]));
				return built
			};
			const args=built.args=slice_45args;
			return _ms.set((_,start,end)=>{
				return _ms.checkContains(_64,take_39(drop_39(_,start),_45(end,start)),"res")
			},built)
		})();
		const take=exports.take=new (Method)((()=>{
			const built={};
			built[`name`]="take";
			const doc=built.doc=`TODO`;
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`count-to-take`,_ms.unlazy(Nat)]);
				return built
			})();
			const _default=built.default=function _default(count_45to_45take){
				const _this=this;
				return _61_62(type_45of(_this),take_39(_this,count_45to_45take))
			};
			return built
		})());
		const take_39=exports["take'"]=(()=>{
			const built={};
			const doc=built.doc=`Stream including only the first count-to-take elements.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1,2],2],_61_62(_ms.unlazy(Stream),[0,1]));
				_ms.assoc(built,[[0],2],_61_62(_ms.unlazy(Stream),[0]));
				const _=[0,1,2,3,4];
				_ms.assert(seq_61_63,_,_43_43(take_39(_,2),drop_39(_,2)));
				return built
			};
			return _ms.set((_,count_45to_45take)=>{
				_ms.checkContains(_ms.unlazy(Nat),count_45to_45take,"count-to-take");
				return (()=>{
					if(_61_63(0,count_45to_45take)){
						return empty(_ms.unlazy(Stream))
					} else {
						return new (_ms.unlazy(Stream))(function*(){
							let n=count_45to_45take;
							for(let elem of _){
								(yield elem);
								n=_45(n,1);
								if(_61_63(0,n)){
									break
								}
							}
						})
					}
				})()
			},built)
		})();
		const take_45while_39=exports["take-while'"]=(()=>{
			const built={};
			const doc=built.doc=`Stream stopping (and not including) the first element not satisfying while?.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2,- 1,3],_ms.sub(_ms.unlazy(_60_63),0)],_61_62(_ms.unlazy(Stream),[1,2]));
				return built
			};
			return _ms.set((_,while_63)=>{
				_ms.checkContains(Pred,while_63,"while?");
				return new (_ms.unlazy(Stream))(function*(){
					for(let elem of _){
						if(! while_63(elem)){
							break
						};
						(yield elem)
					}
				})
			},built)
		})();
		const drop=exports.drop=new (Method)((()=>{
			const built={};
			built[`name`]="drop";
			const doc=built.doc=`TODO`;
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`count-to-drop`,_ms.unlazy(Nat)]);
				return built
			})();
			const _default=built.default=function _default(count_45to_45drop){
				const _this=this;
				return _61_62(type_45of(_this),drop_39(_this,count_45to_45drop))
			};
			return built
		})());
		const drop_39=exports["drop'"]=(()=>{
			const built={};
			const doc=built.doc=`Stream without the first count-to-drop elements.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1,2,3],2],_61_62(_ms.unlazy(Stream),[2,3]));
				return built
			};
			return _ms.set((_,count_45to_45drop)=>{
				return new (_ms.unlazy(Stream))(function*(){
					const iter=iterator(_);
					let i=0;
					for(;;){
						if(_61_63(i,count_45to_45drop)){
							break
						};
						if(iter.next().done){
							break
						};
						i=_43(1,i)
					};
					(yield* iter)
				})
			},built)
		})();
		const zip=exports.zip=(()=>{
			const built={};
			const doc=built.doc=`Type-preserving zip.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2],[10,20],_43],[11,22]);
				return built
			};
			return _ms.set((_64a,_64b,zipper)=>{
				_ms.checkContains(_64,_64a,"@a");
				_ms.checkContains(_64,_64b,"@b");
				_ms.checkContains(_ms.sub(Function,2),zipper,"zipper");
				return _61_62(type_45of(_64a),zip_39(_64a,_64b,zipper))
			},built)
		})();
		const zip_39=exports["zip'"]=(()=>{
			const built={};
			const doc=built.doc=`Seq of zipper applied to corresponding elements of @a and @b.
Ends as soon as either of them does, discarding extra elements.
(Corresponding means: with the same index.)`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2],[10,20,30],_43],_61_62(_ms.unlazy(Stream),[11,22]));
				return built
			};
			return _ms.set((_64a,_64b,zipper)=>{
				_ms.checkContains(_64,_64a,"@a");
				_ms.checkContains(_64,_64b,"@b");
				_ms.checkContains(_ms.sub(Function,2),zipper,"zipper");
				return new (_ms.unlazy(Stream))(function*(){
					const iter_45a=iterator(_64a);
					const iter_45b=iterator(_64b);
					for(;;){
						const next_45a=iter_45a.next();
						if(next_45a.done){
							break
						};
						const next_45b=iter_45b.next();
						if(next_45b.done){
							break
						};
						(yield zipper(next_45a.value,next_45b.value))
					}
				})
			},built)
		})();
		const groups_45of_39=exports["groups-of'"]=(()=>{
			const built={};
			const doc=built.doc=`Seq of consecutive groups of \`group-size\` elements.`;
			const test=built.test=function test(){
				_ms.assert(seq_61_63,[[1,2],[3,4]],groups_45of_39(2,[1,2,3,4]));
				_ms.assert(seq_61_63,[[1,2,3]],groups_45of_39(3,[1,2,3,4]));
				_ms.assert(seq_61_63,[[],[],[]],take_39(groups_45of_39(0,[1]),3))
			};
			return _ms.set((group_45size,_)=>{
				_ms.checkContains(_ms.unlazy(Nat),group_45size,"group-size");
				return _ms.checkContains(Seq,(()=>{
					if(_61_63(group_45size,0)){
						return new (_ms.unlazy(Stream))(function*(){
							for(;;){
								(yield [])
							}
						})
					} else {
						return new (_ms.unlazy(Stream))(function*(){
							const iter=iterator(_);
							for(;;){
								const next_45group=[];
								for(;;){
									const _$0=iter.next(),value=_$0.value,done=_$0.done;
									if(done){
										break
									};
									_43_43_62_33(next_45group,[value]);
									if(_61_63(group_45size,count(next_45group))){
										break
									}
								};
								if(! _61_63(group_45size,count(next_45group))){
									break
								};
								(yield freeze(next_45group))
							}
						})
					}
				})(),"res")
			},built)
		})();
		const indexes=exports.indexes=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,0,0]],new (_ms.unlazy(Range))(0,3));
				return built
			};
			return _ms.set(_=>{
				_ms.checkContains(Seq,_,"_");
				return new (_ms.unlazy(Range))(0,count(_))
			},built)
		})();
		const reverse_39=exports["reverse'"]=new (Method)((()=>{
			const built={};
			built[`name`]="reverse'";
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				const arr=_61_62(Array,_this);
				return new (_ms.unlazy(Stream))(function*(){
					for(let _ of reverse(indexes(arr))){
						(yield _ms.sub(arr,_))
					}
				})
			};
			return built
		})());
		const reverse=exports.reverse=new (Method)((()=>{
			const built={};
			built[`name`]="reverse";
			const doc=built.doc=`Seq with the opposite order.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],[2,1]);
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return from_45stream(Array,_this).reverse()
			};
			return built
		})());
		const split_39=exports["split'"]=(()=>{
			const built={};
			const doc=built.doc=`Subseqs separated by elements where split? is true.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,0,1],_ms.sub(_61_63,0)],_61_62(_ms.unlazy(Stream),[[1],[1]]));
				_ms.assoc(built,[[0],_ms.sub(_61_63,0)],_61_62(_ms.unlazy(Stream),[[],[]]));
				return built
			};
			return _ms.set((_,split_63)=>{
				_ms.checkContains(Pred,split_63,"split?");
				return new (_ms.unlazy(Stream))(function*(){
					const iter=iterator(_);
					let prev_45idx=0;
					let cur_45idx=0;
					for(;;){
						const _$1=iter.next(),value=_$1.value,done=_$1.done;
						const next_45idx=_ms.lazy(()=>_43(1,cur_45idx));
						if(done){
							(yield slice(_,prev_45idx,cur_45idx));
							break
						} else if(split_63(value)){
							(yield slice(_,prev_45idx,cur_45idx));
							prev_45idx=_ms.unlazy(next_45idx);
							cur_45idx=_ms.unlazy(next_45idx)
						} else {
							cur_45idx=_ms.unlazy(next_45idx)
						}
					}
				})
			},built)
		})();
		const _60_43_33=exports["<+!"]=new (Method)((()=>{
			const built={};
			built[`name`]="<+!";
			const doc=built.doc=`TODO`;
			const args=built.args=[`_`,`added`];
			return built
		})());
		const _60_43_43_33=exports["<++!"]=new (Method)((()=>{
			const built={};
			built[`name`]="<++!";
			const doc=built.doc=`Makes \`_\` into \`+ added _\`.`;
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`@added`,_64]);
				return built
			})();
			const _default=built.default=function _default(_64added){
				const _this=this;
				for(let _ of reverse_39(_64added)){
					_60_43_33(_this,_)
				}
			};
			return built
		})());
		const _43_62_33=exports["+>!"]=new (Method)((()=>{
			const built={};
			built[`name`]="+>!";
			const doc=built.doc=`TODO`;
			const args=built.args=[`_`,`added`];
			return built
		})());
		const _43_43_62_33=exports["++>!"]=new (Method)((()=>{
			const built={};
			built[`name`]="++>!";
			const doc=built.doc=`Makes \`_\` into \`+ _ added\`.`;
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`@added`,_64]);
				return built
			})();
			const _default=built.default=function _default(_64added){
				const _this=this;
				for(let _ of _64added){
					_43_62_33(_this,_)
				}
			};
			return built
		})());
		const _63_60pop_33=exports["?<pop!"]=new (Method)((()=>{
			const built={};
			built[`name`]="?<pop!";
			const doc=built.doc=`Takes one element off the left side, if not empty?.`;
			const args=built.args=1;
			return built
		})());
		const _63pop_62_33=exports["?pop>!"]=new (Method)((()=>{
			const built={};
			built[`name`]="?pop>!";
			const doc=built.doc=`Takes one element off the right side, if not empty?.`;
			const args=built.args=1;
			return built
		})());
		const set_45nth_33=exports["set-nth!"]=new (Method)((()=>{
			const built={};
			built[`name`]="set-nth!";
			const doc=built.doc=`Makes \`_[n]\` be \`val\`.`;
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`n`,_ms.unlazy(Nat)]);
				_ms.add(built,`val`);
				return built
			})();
			return built
		})());
		const name=exports.name=`Seq`;
		exports.default=Seq;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC9TZXEvU2VxLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBc0JBLFVBQUssS0FBSSxNQUNJLEtBQUE7O1NBQVosUUFBQTtHQUNBLG9CQUFNOzs7RUFFUCxRQUFNLElBQUk7RUFFVixlQUFXLElBQUk7RUFJZCxtQ0FBTSxLQUFJLFFBQ00sS0FBQTs7U0FBZixRQUFBO0dBQ0Esb0JBQ0M7R0FFRCxzQkFDUSxlQUFBO0dBQ1Isc0JBQU07R0FDTiw2QkFBVyxrQkFBQSxhQUNZO1VBNlhqQjtzQkE5WGdCO1dBQ3JCLE9BQUksVUE2WEMsT0E3WGMsT0FBRyxhQTZYakI7R0FBQTs7O0VBMVhQLDBCQUNNLEtBQUE7O0dBQUwsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxJQUFTO29DQUVDLElBQUE7WUFBZixNQUFNO0lBQUE7OztrQkFDUCxHQUNDO2dDQUFJLFNBQUEsR0FBUzs7O0VBRWhCLGlDQUFRLEtBQUksUUFDTSxLQUFBOztTQUFqQixRQUFBO0dBQ0Esb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSx3QkFBZTtvQkFDckIsQ0FBRTs7O0dBQ0gsc0JBQU07R0FDTiw2QkFDVyxtQkFBQTtVQXlXTDtXQXpXTCxPQXlXSyxNQXpXSztHQUFBOzs7RUFFWix3QkFDSyxLQUFBOztHQUFKLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsSUFBUztvQ0FFQyxJQUFBO1lBQWYsS0FBSztJQUFBOzs7R0FDUCxzQkFBTTtrQkFDTCxHQUNDO2dDQUFJLFFBQUEsR0FBUTs7O0VBRWYsK0JBQU8sS0FBSSxRQUNNLEtBQUE7O1NBQWhCLFFBQUE7R0FDQSxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLHdCQUFlO29CQUNyQixDQUFFOzs7R0FDSCxzQkFBTTtHQUNOLDZCQUNXLG1CQUFBO1VB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QUNJO3FCQUF0QixJQUFJO0tBQUE7SUFBQTtHQUFBOzs7RUFFWCw4QkFBUyxLQUFJLFFBQ00sS0FBQTs7U0FBbEIsUUFBQTtHQUNBLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsSUFBUyxDQUFFLEVBQUU7OztHQUNwQixzQkFBTTtHQUNOLDZCQUNXLG1CQUFBO1VBMERMO1dBMURKLGNBQVksTUEwRFI7Ozs7RUF4RFAsaUNBQ08sS0FBQTs7R0FBTixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLEVBQUUsV0FBSSxPQUFHLElBQVEsMEJBQVUsQ0FBRSxDQUFFLEdBQUksQ0FBRTtvQkFDM0MsQ0FBRSxDQUFFLFdBQUksT0FBRyxJQUFRLDBCQUFVLENBQUUsR0FBRzs7O2tCQUNsQyxDQUFBLEVBQUUsV0FDVztzQkFESjtXQUVULHlCQUNjLFdBQUE7S0FBYixXQUFPLFNBQUE7S0FDUCxlQUFhO0tBQ2IsY0FBWTtLQUVSLE9BQUE7TUFBSCxVQUFhO01BQ2IsOEJBQVksSUFBRSxFQUFFO01BRVgsR0FBSixLQUNJO2NBQUEsTUFBTSxFQUFFLFdBQVM7T0FDcEI7TUFBQSxPQUNELEdBQUEsU0FBTyxPQUNLO2NBQVIsTUFBTSxFQUFFLFdBQVM7OzthQUlqQjs7Ozs7OztFQUlULCtCQUFLLEtBQUksUUFDTSxLQUFBOztTQUFkLFFBQUE7R0FDQSxvQkFBTTtHQUNOLHNCQUFNLENBQUcsSUFBSTs7O0VBRWQsbUNBQU0sS0FBSSxRQUNNLEtBQUE7O1NBQWYsUUFBQTtHQUNBLG9CQUFNO0dBQ04sc0JBQ0ssS0FBQTs7a0JBQUQ7a0JBQ0QsQ0FBRyxTQUFROzs7R0FDZCw2QkFBWSxrQkFBQSxTQUNNO1VBaUJaO0lBakJBLFFBQUEsS0FBQSxXQUFTLFVBQ007S0FBbkIsVUFnQkksTUFoQks7SUFBQTtHQUFBOzs7RUFHWiwrQkFBSyxLQUFJLFFBQ00sS0FBQTs7U0FBZCxRQUFBO0dBQ0Esb0JBQU07R0FDTixzQkFBTSxDQUFHLElBQUk7OztFQUVkLG1DQUFNLEtBQUksUUFDTSxLQUFBOztTQUFmLFFBQUE7R0FDQSxvQkFBTTtHQUNOLHNCQUNLLEtBQUE7O2tCQUFEO2tCQUNELENBQUcsU0FBUTs7O0dBQ2QsNkJBQVksa0JBQUEsU0FDTTtVQUNaO0lBREEsUUFBQSxLQUFBLFNBQ007S0FBVixVQUFJLE1BQUs7SUFBQTtHQUFBOzs7RUFHWixxQ0FBUSxLQUFJLFFBQ00sS0FBQTs7U0FBakIsUUFBQTtHQUNBLG9CQUFNO0dBQ04sc0JBQU07OztFQUVQLHFDQUFRLEtBQUksUUFDTSxLQUFBOztTQUFqQixRQUFBO0dBQ0Esb0JBQU07R0FDTixzQkFBTTs7O0VBR1AsdUNBQVUsS0FBSSxRQUNNLEtBQUE7O1NBQW5CLFFBQUE7R0FDQSxvQkFBTTtHQUNOLHNCQUNLLEtBQUE7O2tCQUFEO2tCQUNELENBQUc7a0JBQ0Y7Ozs7O0VBMWJOLHdCQUFBO2tCQXNCQSIsImZpbGUiOiJhdC9TZXEvU2VxLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=