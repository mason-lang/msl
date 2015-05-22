"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../cash","../js","../private/bootstrap"],function(exports,$_0,js_1,bootstrap_2){
	exports._get=_ms.lazy(function(){
		const $=_ms.getDefaultExport($_0),_$2=_ms.getModule($_0),$after=_ms.get(_$2,"$after"),$map=_ms.get(_$2,"$map"),_$3=_ms.getModule(js_1),_new=_ms.get(_$3,"new"),_$4=_ms.getModule(bootstrap_2),msCall=_ms.get(_$4,"msCall");
		const $require=function $require(require,path){
			return _new($,function(resolve,reject){
				return require([path],resolve,reject)
			})
		};
		const dirname=function dirname(path){
			return path.replace(RegExp("/[^/]*$"),"")
		};
		const $get_45module=exports["$get-module"]=function(){
			const doc="Retrieves module code and evaluates it.\nFirst parameter should be the result of using `require` as a global module.\nThis allows module-path to be relative to the module calling $get-module.\nThe module is represented as an object whose keys are its exports and whose `default` key is its default export.\nNote that `use~` lazily evaluates the content of a module, but eagerly loads the module code.";
			return _ms.set(function $get_45module(require,module_45path){
				_ms.checkContains(Function,require,"require");
				_ms.checkContains(String,module_45path,"module-path");
				return $after($require(require,module_45path),_ms.sub(msCall,"getModule"))
			},"doc",doc)
		}();
		const $_64all_45modules=exports["$@all-modules"]=function(){
			const doc="All listed modules, as generated by Mason's list-modules task.\nmodule-list-path should point to the modules-list file.\nrequire and module-list-path are like in $get-module.";
			return _ms.set(function $_64all_45modules(require,module_45list_45path){
				_ms.checkContains(Function,require,"require");
				_ms.checkContains(String,module_45list_45path,"module-list-path");
				const modules_45list_45dir=dirname(module_45list_45path);
				return $after($get_45module(require,module_45list_45path),function(mp){
					const module_45paths=msCall("getDefaultExport",mp);
					return $map(module_45paths,function(module_45path){
						const full_45path=(((""+_ms.show(modules_45list_45dir))+"/")+_ms.show(module_45path));
						return $get_45module(require,full_45path)
					})
				})
			},"doc",doc)
		}();
		const name=exports.name="modules";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL21vZHVsZXMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFLQSxlQUFZLGtCQUFBLFFBQVEsS0FDSTtVQUN2QixLQUFJLEVBQUcsU0FBQSxRQUFRLE9BQ007V0FBcEIsUUFBUSxDQUFFLE1BQU8sUUFBUTtHQUFBO0VBQUE7RUFFM0IsY0FBVyxpQkFBQSxLQUNJO1VBQWQsYUFBYyxPQUFRLFdBQVc7RUFBQTtFQUVsQyxxREFDWTtHQUFYLFVBQ0M7a0JBS0EsdUJBQUEsUUFBaUIsY0FDa0I7c0JBRDNCO3NCQUFxQjtXQUM3QixPQUFRLFNBQVMsUUFBUSx1QkFBYSxPQUFRO0dBQUE7O0VBRWhELDJEQUNjO0dBQWIsVUFDQztrQkFHQSwyQkFBQSxRQUFpQixxQkFDdUI7c0JBRGhDO3NCQUEwQjtJQUNsQywyQkFBbUIsUUFBUTtXQUMzQixPQUFRLGNBQVksUUFBUSxzQkFBbUIsU0FBQSxHQUNFO0tBQWhELHFCQUFlLE9BQVEsbUJBQWtCO1lBQ3pDLEtBQUssZUFBYyxTQUFBLGNBQ1c7TUFBN0Isa0JBQWEsR0F0QmlCLFlBc0JoQixxQ0FBbUI7YUFFakMsY0FBWSxRQUFRO0tBQUE7SUFBQTtHQUFBOztFQW5DeEIsd0JBQUEiLCJmaWxlIjoibWV0YS9tb2R1bGVzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=