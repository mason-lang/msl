"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../at/at","./methods"],(exports,_64_0,methods_1)=>{
	exports._get=_ms.lazy(()=>{
		let _64=_ms.getDefaultExport(_64_0),_$0=_ms.getModule(_64_0),fold=_ms.get(_$0,"fold"),_$1=_ms.getModule(methods_1),_43=_ms.get(_$1,"+"),_47=_ms.get(_$1,"/");
		let average=exports.average=function average(_64vals){
			_ms.checkInstance(_ms.sub(_64,Number),_64vals,"@vals");
			let sum=0;
			let count=0;
			for(let _ of _64vals){
				sum=_43(sum,_);
				count=_43(1,count)
			};
			return _47(sum,count)
		};
		let sum=exports.sum=function sum(_64vals){
			_ms.checkInstance(_ms.sub(_64,Number),_64vals,"@vals");
			return fold(_64vals,0,_43)
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvbWF0aC91dGlsLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBSUEsNEJBQVUsaUJBQUEsUUFDZTs2QkFEVCxJQUFFO0dBRWpCLFFBQU07R0FDTixVQUFRO0dBQ0osUUFBQSxLQUFBLFFBQ0s7UUFBRCxJQUFFLElBQUs7VUFDTCxJQUFFLEVBQUU7R0FBQTtVQUNkLElBQUUsSUFBSTtFQUFBO0VBRVAsb0JBQU0sYUFBQSxRQUNlOzZCQURULElBQUU7VUFFYixLQUFLLFFBQU0sRUFBRTtFQUFBIiwiZmlsZSI6Im1hdGgvdXRpbC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
