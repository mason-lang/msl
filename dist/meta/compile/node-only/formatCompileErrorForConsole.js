if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'chalk', '../CompileError', '../private/U/Bag', '../private/U/util'], function (exports, _chalk, _CompileError, _privateUBag, _privateUUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	exports.default = function (error, modulePath) {
		return format(error.warning, modulePath, 'error');
	};

	const formatWarningForConsole = function (warning, modulePath) {
		_privateUUtil.type(warning, _CompileError.Warning, modulePath, String);
		// Extra space to match up with 'error'
		return format(warning, modulePath, 'warn ');
	};

	exports.formatWarningForConsole = formatWarningForConsole;
	const format = function (warning, modulePath, kind) {
		// Turn code green
		const message = _privateUBag.toArray(_CompileError.formatCode(warning.message, _chalk.green)).join('');
		return '' + _chalk.blue(modulePath) + '\n' + _chalk.magenta(kind) + ' ' + _chalk.bold.red(warning.loc) + ' ' + message;
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9ub2RlLW9ubHkvZm9ybWF0Q29tcGlsZUVycm9yRm9yQ29uc29sZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O21CQUtlLFVBQUMsS0FBSyxFQUFFLFVBQVU7U0FBSyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDO0VBQUE7O0FBRXpFLE9BQU0sdUJBQXVCLEdBQUcsVUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFLO0FBQy9ELGdCQUxRLElBQUksQ0FLUCxPQUFPLGdCQVBKLE9BQU8sRUFPUSxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUE7O0FBRTFDLFNBQU8sTUFBTSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUE7RUFDM0MsQ0FBQTs7U0FKWSx1QkFBdUIsR0FBdkIsdUJBQXVCO0FBTXBDLE9BQU0sTUFBTSxHQUFHLFVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUs7O0FBRTdDLFFBQU0sT0FBTyxHQUFHLGFBYlIsT0FBTyxDQWFTLGNBZFAsVUFBVSxDQWNRLE9BQU8sQ0FBQyxPQUFPLFNBZnBDLEtBQUssQ0FldUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUNwRSxjQUFVLE9BaEJGLElBQUksQ0FnQkcsVUFBVSxDQUFDLFVBQUssT0FoQlYsT0FBTyxDQWdCVyxJQUFJLENBQUMsU0FBSSxPQWhCbEIsSUFBSSxDQWdCbUIsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBSSxPQUFPLENBQUU7RUFDbEYsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvbm9kZS1vbmx5L2Zvcm1hdENvbXBpbGVFcnJvckZvckNvbnNvbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBibHVlLCBncmVlbiwgbWFnZW50YSwgYm9sZCB9IGZyb20gJ2NoYWxrJ1xuaW1wb3J0IHsgV2FybmluZywgZm9ybWF0Q29kZSB9IGZyb20gJy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCB7IHRvQXJyYXkgfSBmcm9tICcuLi9wcml2YXRlL1UvQmFnJ1xuaW1wb3J0IHsgdHlwZSB9IGZyb20gJy4uL3ByaXZhdGUvVS91dGlsJ1xuXG5leHBvcnQgZGVmYXVsdCAoZXJyb3IsIG1vZHVsZVBhdGgpID0+IGZvcm1hdChlcnJvci53YXJuaW5nLCBtb2R1bGVQYXRoLCAnZXJyb3InKVxuXG5leHBvcnQgY29uc3QgZm9ybWF0V2FybmluZ0ZvckNvbnNvbGUgPSAod2FybmluZywgbW9kdWxlUGF0aCkgPT4ge1xuXHR0eXBlKHdhcm5pbmcsIFdhcm5pbmcsIG1vZHVsZVBhdGgsIFN0cmluZylcblx0Ly8gRXh0cmEgc3BhY2UgdG8gbWF0Y2ggdXAgd2l0aCAnZXJyb3InXG5cdHJldHVybiBmb3JtYXQod2FybmluZywgbW9kdWxlUGF0aCwgJ3dhcm4gJylcbn1cblxuY29uc3QgZm9ybWF0ID0gKHdhcm5pbmcsIG1vZHVsZVBhdGgsIGtpbmQpID0+IHtcblx0Ly8gVHVybiBjb2RlIGdyZWVuXG5cdGNvbnN0IG1lc3NhZ2UgPSB0b0FycmF5KGZvcm1hdENvZGUod2FybmluZy5tZXNzYWdlLCBncmVlbikpLmpvaW4oJycpXG5cdHJldHVybiBgJHtibHVlKG1vZHVsZVBhdGgpfVxcbiR7bWFnZW50YShraW5kKX0gJHtib2xkLnJlZCh3YXJuaW5nLmxvYyl9ICR7bWVzc2FnZX1gXG59XG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==