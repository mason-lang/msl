"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../cash","../Fun","../js","../private/bootstrap","../RegExp","../Str"],function(exports,$_0,Fun_1,js_2,bootstrap_3,RegExp_4,Str_5){
	exports._get=_ms.lazy(function(){
		const $=_ms.getDefaultExport($_0),_$2=_ms.getModule($_0),$after=_ms.get(_$2,"$after"),$map=_ms.get(_$2,"$map"),Fun=_ms.getDefaultExport(Fun_1),_$4=_ms.getModule(js_2),_new=_ms.get(_$4,"new"),_$5=_ms.getModule(bootstrap_3),msCall=_ms.get(_$5,"msCall"),_$6=_ms.getModule(RegExp_4),regexp=_ms.get(_$6,"regexp"),Str=_ms.getDefaultExport(Str_5);
		const $require=function(){
			return _ms.set(function(require,path){
				return _new($,function(resolve,reject){
					return require([path],resolve,reject)
				})
			},"displayName","$require")
		}();
		const dirname=function(){
			return _ms.set(function(path){
				return path.replace(regexp("/[^/]*$"),"")
			},"displayName","dirname")
		}();
		const $get_45module=exports["$get-module"]=function(){
			const doc="Retrieves module code and evaluates it.\nFirst parameter should be the result of using `require` as a global module.\nThis allows module-path to be relative to the module calling this function.\nThe module is represented as an object whose keys are its exports and whose `default` key is its default export.\nNote that `use~` lazily evaluates the content of a module, but eagerly loads the module code.";
			return _ms.set(function(require,module_45path){
				_ms.checkContains(Fun,require,"require");
				_ms.checkContains(Str,module_45path,"module-path");
				return $after($require(require,module_45path),_ms.sub(msCall,"getModule"))
			},"doc",doc,"displayName","$get-module")
		}();
		const $_64all_45modules=exports["$@all-modules"]=function(){
			const doc="All listed modules, as generated by Mason's list-modules task.\nmodule-list-path should point to the modules-list file.\nrequire and module-list-path are like in $get-module.";
			return _ms.set(function(require,module_45list_45path){
				_ms.checkContains(Fun,require,"require");
				_ms.checkContains(Str,module_45list_45path,"module-list-path");
				const modules_45list_45dir=dirname(module_45list_45path);
				return $after($get_45module(require,module_45list_45path),function(mp){
					const module_45paths=msCall("getDefaultExport",mp);
					return $map(module_45paths,function(module_45path){
						return $get_45module(require,(((""+_ms.show(modules_45list_45dir))+"/")+_ms.show(module_45path)))
					})
				})
			},"doc",doc,"displayName","$@all-modules")
		}();
		const displayName=exports.displayName="modules";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL21vZHVsZXMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFRQSx5QkFBWTtrQkFBQSxTQUFBLFFBQVEsS0FDSTtXQUN2QixLQUFJLEVBQUcsU0FBQSxRQUFRLE9BQ007WUFBcEIsUUFBUSxDQUFFLE1BQU8sUUFBUTtJQUFBO0dBQUE7O0VBRTNCLHdCQUFXO2tCQUFBLFNBQUEsS0FDSTtXQUFkLGFBQWMsT0FBUSxXQUFXO0dBQUE7O0VBRWxDLHFEQUNZO0dBQVgsVUFDQztrQkFLQSxTQUFBLFFBQVksY0FDZTtzQkFEbkI7c0JBQWdCO1dBQ3hCLE9BQVEsU0FBUyxRQUFRLHVCQUFhLE9BQVE7R0FBQTs7RUFFaEQsMkRBQ2M7R0FBYixVQUNDO2tCQUdBLFNBQUEsUUFBWSxxQkFDb0I7c0JBRHhCO3NCQUFxQjtJQUM3QiwyQkFBbUIsUUFBUTtXQUMzQixPQUFRLGNBQVksUUFBUSxzQkFBbUIsU0FBQSxHQUNFO0tBQWhELHFCQUFlLE9BQVEsbUJBQWtCO1lBQ3pDLEtBQUssZUFBYyxTQUFBLGNBQ1c7YUFDN0IsY0FBWSxRQUFTLEdBdkJTLFlBdUJSLHFDQUFtQjtLQUFBO0lBQUE7R0FBQTs7RUFyQzdDLHNDQUFBIiwiZmlsZSI6Im1ldGEvbW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9