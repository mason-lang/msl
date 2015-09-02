"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./Type/Method","./at/at","./at/at-Type","./at/q","./at/Seq/Seq","./control","./Function","./Object","./Type/Pred-Type","./at/at","./at/q","./Try"],(exports,js_0,Method_1,_64_2,_64_45Type_3,_63_4,Seq_5,control_6,Function_7,Object_8,Pred_45Type_9,_64_10,_63_11,Try_12)=>{
	exports._get=_ms.lazy(()=>{
		const _$1=_ms.getModule(js_0),id_61_63=_ms.get(_$1,"id=?"),Method=_ms.getDefaultExport(Method_1),_64=_ms.lazy(()=>_ms.getDefaultExport(_64_2)),_$2=_ms.lazyGetModule(_64_2),all_63=_ms.lazyProp(_$2,"all?"),empty_63=_ms.lazyProp(_$2,"empty?"),iterator=_ms.lazyProp(_$2,"iterator"),_$3=_ms.lazyGetModule(_64_45Type_3),from_45stream=_ms.lazyProp(_$3,"from-stream"),_$4=_ms.lazyGetModule(_63_4),un_45_63=_ms.lazyProp(_$4,"un-?"),Seq=_ms.lazy(()=>_ms.getDefaultExport(Seq_5)),_$5=_ms.lazyGetModule(Seq_5),first=_ms.lazyProp(_$5,"first"),tail=_ms.lazyProp(_$5,"tail"),_$6=_ms.lazyGetModule(control_6),opr=_ms.lazyProp(_$6,"opr"),_$7=_ms.lazyGetModule(Function_7),identity=_ms.lazyProp(_$7,"identity"),_$8=_ms.lazyGetModule(Object_8),object_61_63=_ms.lazyProp(_$8,"object=?"),_$9=_ms.lazyGetModule(Pred_45Type_9),Opt=_ms.lazyProp(_$9,"Opt"),_$10=_ms.lazyGetModule(_64_10),count=_ms.lazyProp(_$10,"count"),_$11=_ms.lazyGetModule(_63_11),_63None=_ms.lazyProp(_$11,"?None"),_63some=_ms.lazyProp(_$11,"?some"),_$12=_ms.lazyGetModule(Try_12),fails_63=_ms.lazyProp(_$12,"fails?");
		const compare=new (Method)((()=>{
			const built={};
			built[`name`]="compare";
			const doc=built.doc=`A Number < 0 if a < b, > 0 if a > b, and = 0 if a = b.
It could be implemented as:
	case
		<? a b
			-1
		>? a b
			1
		else
			0
But instead, other comparison operators are defined in terms of this.
\`compare a b\` should always be \`* -1 (compare b a)\`.`;
			const args=built.args=2;
			return built
		})());
		const _61_63=exports["=?"]=new (Method)((()=>{
			const built={};
			built[`name`]="=?";
			const doc=built.doc=`Whether two objects are considered equivalent.
Generally, if two values are \`=?\`, then most Functions called on them should return the same results.
\`=?\` defaults to \`object=?\`.
Values can be \`=?\` but not \`object=?\` if they are conceptually the same, but have different representations.
For example, two Sets with the same values might internally have different ordering.

Values of different types should generally not be =?.
For example, [ 1 2 3 ] is not \`=?\` (=> Stream [ 1 2 3 ]), but it is \`seq=?\`.
Unlike other comparison methods, \`=?\` should not make assertions about type.`;
			const args=built.args=2;
			const allow_45null_63=built["allow-null?"]=true;
			const _default=built.default=function _default(other){
				const _this=this;
				return (id_61_63(_this,other)||_ms.unlazy(object_61_63)(_this,other))
			};
			return built
		})());
		const _60_63=exports["<?"]=new (Method)((()=>{
			const built={};
			built[`name`]="<?";
			const doc=built.doc=`Whether \`lesser\` comes before \`greater\` in these values' ordering.
Same as \`not  (>=? lesser greater)\`.`;
			const args=built.args=2;
			const _default=built.default=function _default(other){
				const _this=this;
				return _60_63(compare(_this,other),0)
			};
			return built
		})());
		const _60_61_63=exports["<=?"]=new (Method)((()=>{
			const built={};
			built[`name`]="<=?";
			const doc=built.doc=`<? or =?.`;
			const args=built.args=2;
			const _default=built.default=function _default(other){
				const _this=this;
				return _60_61_63(compare(_this,other),0)
			};
			return built
		})());
		const same_63=exports["same?"]=(()=>{
			const built={};
			const doc=built.doc=`Whether two values have the same \`f\`.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[_ms.unlazy(count),[1],[2]],true);
				_ms.assoc(built,[_ms.unlazy(count),[],[1]],false);
				return built
			};
			return _ms.set((f,a,b)=>{
				_ms.checkContains(Function,f,"f");
				return _61_63(f(a),f(b))
			},built)
		})();
		const max=exports.max=(()=>{
			const built={};
			const doc=built.doc=`An element that is >=? all others. Fails when empty.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,3,2]],3);
				_ms.assoc(built,[[2,1,2]],2);
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return max([])
				});
				return built
			};
			return _ms.set(_=>{
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				return _ms.unlazy(un_45_63)(_63max(_),`Can not take max of empty.`)
			},built)
		})();
		const _63max=exports["?max"]=(()=>{
			const built={};
			const doc=built.doc=`Like max, but returns empty ? for empty.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1]],_ms.unlazy(_63some)(1));
				_ms.assoc(built,[[]],_ms.unlazy(_63None));
				return built
			};
			return _ms.set(_=>{
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				return _63max_45by(_,_ms.unlazy(identity))
			},built)
		})();
		const max_45by=exports["max-by"]=(()=>{
			const built={};
			const doc=built.doc=`An element whose \`by em\` is >=? all other elements' \`by em\`s.
Like \`max (map _ by)\` except the mapping is not applied to the result.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[`five`,`six`,`seven`],_ms.unlazy(count)],`seven`);
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return max_45by([],_ms.unlazy(identity))
				});
				return built
			};
			return _ms.set((_,by)=>{
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				_ms.checkContains(Function,by,"by");
				return _ms.unlazy(un_45_63)(_63max_45by(_,by),`Can not take max of empty.`)
			},built)
		})();
		const _63max_45by=exports["?max-by"]=(()=>{
			const built={};
			const doc=built.doc=`Like max-by, but returns empty ? for empty.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1],_ms.unlazy(identity)],_ms.unlazy(_63some)(1));
				_ms.assoc(built,[[],_ms.unlazy(identity)],_ms.unlazy(_63None));
				return built
			};
			return _ms.set((_,by)=>{
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				_ms.checkContains(Function,by,"by");
				return _ms.unlazy(empty_63)(_)?_ms.None:_ms.some((()=>{
					const iter=_ms.unlazy(iterator)(_);
					const value=iter.next().value;
					let cur_45max=value;
					let cur_45max_45by=by(value);
					for(;;){
						const _$0=iter.next(),value=_$0.value,done=_$0.done;
						if(done){
							break
						} else {
							const value_45by=by(value);
							if(_60_63(cur_45max_45by,value_45by)){
								cur_45max=value;
								cur_45max_45by=value_45by
							}
						}
					};
					return cur_45max
				})())
			},built)
		})();
		const sorted_63=exports["sorted?"]=(()=>{
			const built={};
			const doc=built.doc=`Whether it is already in sorted order.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[]],true);
				_ms.assoc(built,[[1,2,3]],true);
				_ms.assoc(built,[[3,2,1]],false);
				_ms.assoc(built,[[`six`,`five`,`seven`],_ms.unlazy(count)],true);
				return built
			};
			return _ms.set((seq,sort_45by)=>{
				_ms.checkContains(_ms.unlazy(Seq),seq,"seq");
				_ms.checkContains(_ms.sub(_ms.unlazy(Opt),Function),sort_45by,"sort-by");
				sort_45by=_ms.unlazy(opr)(sort_45by,_ms.unlazy(identity));
				return (()=>{
					const _=seq;
					if(_ms.unlazy(empty_63)(_)){
						return true
					} else {
						let sb_45prev=sort_45by(_ms.unlazy(first)(_));
						return _ms.unlazy(all_63)(_ms.unlazy(tail)(_),em=>{
							const sb_45cur=sort_45by(em);
							return (_=>{
								sb_45prev=sb_45cur;
								return _
							})(_60_63(sb_45prev,sb_45cur))
						})
					}
				})()
			},built)
		})();
		const sort=exports.sort=new (Method)((()=>{
			const built={};
			built[`name`]="sort";
			const doc=built.doc=`Puts the elements in sorted order.
Order is determined by calling \`compare\`.
Optional \`sort-by\` determines an attribute of elements to be compared.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[3,2,1]],[1,2,3]);
				_ms.assoc(built,[[`five`,`six`,`seven`],_ms.unlazy(count)],[`six`,`five`,`seven`]);
				_ms.assoc(built,[`bac`],`abc`);
				return built
			};
			const args=built.args=(()=>{
				return 2
			})();
			const _default=built.default=function _default(sort_45by){
				const _this=this;
				sort_45by=_ms.unlazy(opr)(sort_45by,_ms.unlazy(identity));
				const sorted=_ms.unlazy(from_45stream)(Array,_this);
				sorted.sort((a,b)=>{
					return compare(sort_45by(a),sort_45by(b))
				});
				return sorted
			};
			return built
		})());
		const name=exports.name=`compare`;
		exports.default=compare;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvY29tcGFyZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWlCQSxjQUFTLEtBQUksUUFDTSxLQUFBOztTQUFsQixRQUFBO0dBQ0Esb0JBQ0M7R0FXRCxzQkFBTTs7O0VBRVAsMkJBQUksS0FBSSxRQUNNLEtBQUE7O1NBQWIsUUFBQTtHQUNBLG9CQUNDO0dBU0Qsc0JBQU07R0FDTiwyQ0FBYTtHQUNiLDZCQUFXLGtCQUFBLE1BQ0s7VUF1SGE7V0F2SDVCLENBQUksU0F1SHdCLE1BdkhkLGlDQXVIYyxNQXZIUTtHQUFBOzs7RUFFdEMsMkJBQUksS0FBSSxRQUNNLEtBQUE7O1NBQWIsUUFBQTtHQUNBLG9CQUNDO0dBRUQsc0JBQU07R0FDTiw2QkFBVyxrQkFBQSxNQUNLO1VBOEdhO1dBOUc1QixPQUFJLFFBOEd3QixNQTlHWCxPQUFPO0dBQUE7OztFQUUxQiwrQkFBSyxLQUFJLFFBQ00sS0FBQTs7U0FBZCxRQUFBO0dBQ0Esb0JBQU07R0FDTixzQkFBTTtHQUNOLDZCQUFXLGtCQUFBLE1BQ0s7VUF1R2E7V0F2RzVCLFVBQUssUUF1R3VCLE1BdkdWLE9BQU87R0FBQTs7O0VBRzFCLCtCQUNNLEtBQUE7O0dBQUwsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixtQkFBUSxDQUFFLEdBQUksQ0FBRSxJQUFTO29CQUN6QixtQkFBUSxHQUFJLENBQUUsSUFBUzs7O2tCQUN2QixDQUFBLEVBQVcsRUFBRSxJQUNDO3NCQWlFTTtXQWpFcEIsT0FBSSxFQUFFLEdBQUksRUFBRTtHQUFBOztFQUtkLHNCQUNJLEtBQUE7O0dBQUgsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxFQUFFLElBQVM7b0JBQ2pCLENBQUUsQ0FBRSxFQUFFLEVBQUUsSUFBUztvQ0FFRCxJQUFBO1lBQWYsSUFBSTtJQUFBOzs7a0JBQ0wsR0FDRzs7Z0NBQUUsT0FBQSxHQUFPOzs7RUFFZCw2QkFDSyxLQUFBOztHQUFKLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLHdCQUFlO29CQUNuQixDQUFFOzs7a0JBQ0YsR0FDRzs7V0FBSCxZQUFROzs7RUFFVixpQ0FDTyxLQUFBOztHQUFOLG9CQUNDO0dBRUQsc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFHLE9BQU8sTUFBTSw0QkFBcUI7b0NBRXZCLElBQUE7WUFBZixTQUFPOzs7O2tCQUNSLENBQUEsRUFBSSxLQUNXOztzQkFpQ0s7Z0NBakNkLFlBQVEsRUFBRSxJQUFLOzs7RUFFdkIscUNBQ1EsS0FBQTs7R0FBUCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSw2Q0FBd0I7b0JBQzVCLENBQUU7OztrQkFDRixDQUFBLEVBQUksS0FDVzs7c0JBeUJLO2dDQXpCYiwwQkFDTztLQUFiLGdDQUFPO0tBQ1AsWUFBUTtLQUNSLGNBQVk7S0FDWixtQkFBZSxHQUFHO0tBRWQsT0FBQTtNQUFILFVBQWE7TUFFUixHQUFKLEtBQ0k7T0FBSDtNQUFBLE9BRUc7T0FBSCxpQkFBVyxHQUFHO09BQ2QsR0FBSSxPQUFHLGVBQVcsWUFDUTtrQkFBZDt1QkFDRztPQUFBO01BQUE7S0FBQTtZQUNsQjtJQUFBO0dBQUE7O0VBR0gsbUNBQ1EsS0FBQTs7R0FBUCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsSUFBUztvQkFDWCxDQUFFLENBQUUsRUFBRSxFQUFFLElBQVM7b0JBQ2pCLENBQUUsQ0FBRSxFQUFFLEVBQUUsSUFBUztvQkFDakIsQ0FBRSxDQUFHLE1BQU0sT0FBTyw0QkFBb0I7OztrQkFDdEMsQ0FBQSxJQUFRLFlBQ3FCOzs4Q0FEVDs4QkFDTDtXQUNWO0tBQUEsUUFBQTtLQUNKLHdCQUFBLEdBQ087YUFBTjtLQUFBLE9BRUc7TUFBSCxjQUFZLDRCQUFRO2lEQUNmLEdBQU8sSUFDRTtPQUFiLGVBQVMsVUFBUTtjQUNaLElBQ2lCO2tCQUFWOztVQURQLE9BQUcsVUFBUTtNQUFBO0tBQUE7SUFBQTtHQUFBOztFQUdyQix3QkFBTSxLQUFJLFFBQ00sS0FBQTs7U0FBZixRQUFBO0dBQ0Esb0JBQ0M7R0FHRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxFQUFFLElBQVMsQ0FBRSxFQUFFLEVBQUU7b0JBQ3ZCLENBQUUsQ0FBRyxPQUFPLE1BQU0sNEJBQW9CLENBQUcsTUFBTSxPQUFPO29CQUN0RCxDQUFHLE9BQVc7OztHQUNmLHNCQUNLLEtBQUE7V0FBSjtHQUFBO0dBR0QsNkJBQVcsa0JBQUEsVUFDTztVQUVVOzhCQUZaO0lBRWYsdUNBQXFCLE1BQU07SUFDM0IsWUFBYSxDQUFBLEVBQUUsSUFDQztZQUFmLFFBQVMsVUFBUSxHQUFJLFVBQVE7SUFBQTtXQUM5QjtHQUFBOzs7RUExS0gsd0JBQUE7a0JBaUJBIiwiZmlsZSI6ImNvbXBhcmUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==