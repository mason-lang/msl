if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	var _ms2 = _ms;
	const bool = _ms2.bool;
	const unlazy = _ms2.unlazy;
	const
	// js.ms
	iNew = function (ctr, a, b, c) {
		// TODO:ES6 return new ctr(...args)
		switch (arguments.length) {
			case 0:
				throw new Error('`new` needs a constructor.');
			case 1:
				return new ctr();
			case 2:
				return new ctr(a);
			case 3:
				return new ctr(a, b);
			case 4:
				return new ctr(a, b, c);
			default:
				throw new Error('This many arguments not supported.');
		}
	},
	     

	// Boolean.ms
	// TODO:ES6 ...args
	iAnd = function () {
		const args = arguments;
		switch (args.length) {
			case 0:
				return true;
			case 1:
				return bool(args[0]);
			case 2:
				return bool(args[0]) && bool(unlazy(args[1]));
			case 3:
				return bool(args[0]) && bool(unlazy(args[1])) && bool(unlazy(args[2]));
			default:
				if (!bool(args[0])) return false;
				for (let i = 1; i < args.length; i = i + 1) if (!bool(unlazy(args[i]))) return false;
				return true;
		}
	},
	     

	// TODO:ES6 (...args) => {
	iOr = function () {
		const args = arguments;
		switch (args.length) {
			case 0:
				return false;
			case 1:
				return bool(args[0]);
			case 2:
				return bool(args[0]) || bool(unlazy(args[1]));
			case 3:
				return bool(args[0]) || bool(unlazy(args[1])) || bool(unlazy(args[2]));
			default:
				if (bool(args[0])) return true;
				for (let i = 1; i < args.length; i = i + 1) if (bool(unlazy(args[i]))) return true;
				return true;
		}
	},
	     

	// Kind.ms
	KindContains = function (kind, _) {
		return _ != null && _[kind['symbol-for-isa']] !== undefined;
	},
	      isEmpty = function (array) {
		return array.length === 0;
	},
	     

	// Try.ms
	alwaysDoAfter = function (tried, finallyDo) {
		try {
			return tried();
		} finally {
			finallyDo();
		}
	},
	      iTry = function (Success, tried) {
		try {
			return Success(tried());
		} catch (e) {
			return e;
		}
	},
	     

	// show.ms
	newSet = function () {
		return new Set();
	},
	     

	// Obj-Type.ms and Method.ms and Wrap-Type.ms
	buildStr = function (builder) {
		let s = '';
		builder(function (str) {
			s = s + str + '\n';
		});
		return s;
	},
	     
	// Obj-Type.ms
	addOne = function (_) {
		return _ + 1;
	},
	     

	// perf-test.ms
	timeStar = function (times, timeMe) {
		let i = times;
		const out = [];
		while (i > 0) {
			i = i - 1;
			out.push(timeMe(i));
		}
		return out;
	},
	     

	// Function.ms
	// TODO:ES6 (f, ...args) => Function.prototype.bind.call(f, null, ...args)
	iCurry = function (f) {
		return Function.prototype.bind.apply(f, arguments);
	},
	     

	// Method.js
	// TODO: Should be doable in Mason...
	methodArgNames = function (nArgs) {
		const res = [];
		const a = 'a'.charCodeAt(0);
		for (let i = 0; i < nArgs; i = i + 1) res.push(String.fromCharCode(a + i));
		return res.join(',');
	};

	exports.iNew = iNew;
	exports.iAnd = iAnd;
	exports.iOr = iOr;
	exports.KindContains = KindContains;
	exports.isEmpty = isEmpty;
	exports.alwaysDoAfter = alwaysDoAfter;
	exports.iTry = iTry;
	exports.newSet = newSet;
	exports.buildStr = buildStr;
	exports.addOne = addOne;
	exports.timeStar = timeStar;
	exports.iCurry = iCurry;
	exports.methodArgNames = methodArgNames;
	// hash-code.ms
	const hashes = new WeakMap();
	const hashCodeDefault = function (_, hashCode) {
		if (_ === null) return 108;
		if (_ === undefined) return 109;

		let hash = hashes.get(_);
		if (hash !== undefined) return hash;

		// Don't recurse infinitely.
		hashes.set(_, 17);

		hash = 17;
		for (let key in _) hash = hashCode(_[key]) + (hash * 23 | 0) | 0;

		hashes.set(_, hash);
		return hash;
	},
	      hashCodeString = function (_) {
		let hash = 13;
		for (let i = 0; i < _.length; i = i + 1) hash = (hash + _.charCodeAt(i) | 0) * 31;
		return hash;
	};
	exports.hashCodeDefault = hashCodeDefault;
	exports.hashCodeString = hashCodeString;
});
//# sourceMappingURL=data:application/json;base64,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QUFHLEVBQUUsQ0FBQTtBQUNiLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUN0QyxJQUFJLEdBQUcsQ0FBQyxBQUFDLElBQUksR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxHQUFJLENBQUMsQ0FBQSxHQUFJLEVBQUUsQ0FBQTtBQUMzQyxTQUFPLElBQUksQ0FBQTtFQUNYLENBQUE7U0ExQkQsZUFBZSxHQUFmLGVBQWU7U0FxQmYsY0FBYyxHQUFkLGNBQWMiLCJmaWxlIjoicHJpdmF0ZS9qcy1pbXBsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBib29sLCB1bmxhenkgfSA9IF9tc1xuXG5leHBvcnRcdGNvbnN0XG5cdC8vIGpzLm1zXG5cdGlOZXcgPSBmdW5jdGlvbihjdHIsIGEsIGIsIGMpIHtcblx0XHQvLyBUT0RPOkVTNiByZXR1cm4gbmV3IGN0ciguLi5hcmdzKVxuXHRcdHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuXHRcdFx0Y2FzZSAwOiB0aHJvdyBuZXcgRXJyb3IoJ2BuZXdgIG5lZWRzIGEgY29uc3RydWN0b3IuJylcblx0XHRcdGNhc2UgMTogcmV0dXJuIG5ldyBjdHIoKVxuXHRcdFx0Y2FzZSAyOiByZXR1cm4gbmV3IGN0cihhKVxuXHRcdFx0Y2FzZSAzOiByZXR1cm4gbmV3IGN0cihhLCBiKVxuXHRcdFx0Y2FzZSA0OiByZXR1cm4gbmV3IGN0cihhLCBiLCBjKVxuXHRcdFx0ZGVmYXVsdDogdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1hbnkgYXJndW1lbnRzIG5vdCBzdXBwb3J0ZWQuJylcblx0XHR9XG5cdH0sXG5cblx0Ly8gQm9vbGVhbi5tc1xuXHQvLyBUT0RPOkVTNiAuLi5hcmdzXG5cdGlBbmQgPSBmdW5jdGlvbigpIHtcblx0XHRjb25zdCBhcmdzID0gYXJndW1lbnRzXG5cdFx0c3dpdGNoIChhcmdzLmxlbmd0aCkge1xuXHRcdFx0Y2FzZSAwOiByZXR1cm4gdHJ1ZVxuXHRcdFx0Y2FzZSAxOiByZXR1cm4gYm9vbChhcmdzWzBdKVxuXHRcdFx0Y2FzZSAyOiByZXR1cm4gYm9vbChhcmdzWzBdKSAmJiBib29sKHVubGF6eShhcmdzWzFdKSlcblx0XHRcdGNhc2UgMzogcmV0dXJuIGJvb2woYXJnc1swXSkgJiYgYm9vbCh1bmxhenkoYXJnc1sxXSkpICYmIGJvb2wodW5sYXp5KGFyZ3NbMl0pKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0aWYgKCFib29sKGFyZ3NbMF0pKVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0XHRmb3IgKGxldCBpID0gMTsgaSA8IGFyZ3MubGVuZ3RoOyBpID0gaSArIDEpXG5cdFx0XHRcdFx0aWYgKCFib29sKHVubGF6eShhcmdzW2ldKSkpXG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cdH0sXG5cblx0Ly8gVE9ETzpFUzYgKC4uLmFyZ3MpID0+IHtcblx0aU9yID0gZnVuY3Rpb24oKSB7XG5cdFx0Y29uc3QgYXJncyA9IGFyZ3VtZW50c1xuXHRcdHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcblx0XHRcdGNhc2UgMDogcmV0dXJuIGZhbHNlXG5cdFx0XHRjYXNlIDE6IHJldHVybiBib29sKGFyZ3NbMF0pXG5cdFx0XHRjYXNlIDI6IHJldHVybiBib29sKGFyZ3NbMF0pIHx8IGJvb2wodW5sYXp5KGFyZ3NbMV0pKVxuXHRcdFx0Y2FzZSAzOiByZXR1cm4gYm9vbChhcmdzWzBdKSB8fCBib29sKHVubGF6eShhcmdzWzFdKSkgfHwgYm9vbCh1bmxhenkoYXJnc1syXSkpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRpZiAoYm9vbChhcmdzWzBdKSlcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFx0XHRmb3IgKGxldCBpID0gMTsgaSA8IGFyZ3MubGVuZ3RoOyBpID0gaSArIDEpXG5cdFx0XHRcdFx0aWYgKGJvb2wodW5sYXp5KGFyZ3NbaV0pKSlcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHR9LFxuXG5cdC8vIEtpbmQubXNcblx0S2luZENvbnRhaW5zID0gKGtpbmQsIF8pID0+XG5cdFx0XyAhPSBudWxsICYmIF9ba2luZFsnc3ltYm9sLWZvci1pc2EnXV0gIT09IHVuZGVmaW5lZCxcblx0aXNFbXB0eSA9IGFycmF5ID0+IGFycmF5Lmxlbmd0aCA9PT0gMCxcblxuXHQvLyBUcnkubXNcblx0YWx3YXlzRG9BZnRlciA9ICh0cmllZCwgZmluYWxseURvKSA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiB0cmllZCgpXG5cdFx0fSBmaW5hbGx5IHtcblx0XHRcdGZpbmFsbHlEbygpXG5cdFx0fVxuXHR9LFxuXHRpVHJ5ID0gKFN1Y2Nlc3MsIHRyaWVkKSA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdHJldHVybiBTdWNjZXNzKHRyaWVkKCkpXG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0cmV0dXJuIGVcblx0XHR9XG5cdH0sXG5cblx0Ly8gc2hvdy5tc1xuXHRuZXdTZXQgPSAoKSA9PiBuZXcgU2V0KCksXG5cblx0Ly8gT2JqLVR5cGUubXMgYW5kIE1ldGhvZC5tcyBhbmQgV3JhcC1UeXBlLm1zXG5cdGJ1aWxkU3RyID0gYnVpbGRlciA9PiB7XG5cdFx0bGV0IHMgPSAnJ1xuXHRcdGJ1aWxkZXIoc3RyID0+IHsgcyA9IHMgKyBzdHIgKyAnXFxuJyB9KVxuXHRcdHJldHVybiBzXG5cdH0sXG5cdC8vIE9iai1UeXBlLm1zXG5cdGFkZE9uZSA9IF8gPT4gXyArIDEsXG5cblx0Ly8gcGVyZi10ZXN0Lm1zXG5cdHRpbWVTdGFyID0gKHRpbWVzLCB0aW1lTWUpID0+IHtcblx0XHRsZXQgaSA9IHRpbWVzXG5cdFx0Y29uc3Qgb3V0ID0gW11cblx0XHR3aGlsZSAoaSA+IDApIHtcblx0XHRcdGkgPSBpIC0gMVxuXHRcdFx0b3V0LnB1c2godGltZU1lKGkpKVxuXHRcdH1cblx0XHRyZXR1cm4gb3V0XG5cdH0sXG5cblx0Ly8gRnVuY3Rpb24ubXNcblx0Ly8gVE9ETzpFUzYgKGYsIC4uLmFyZ3MpID0+IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kLmNhbGwoZiwgbnVsbCwgLi4uYXJncylcblx0aUN1cnJ5ID0gZnVuY3Rpb24oZikge1xuXHRcdHJldHVybiBGdW5jdGlvbi5wcm90b3R5cGUuYmluZC5hcHBseShmLCBhcmd1bWVudHMpXG5cdH0sXG5cblx0Ly8gTWV0aG9kLmpzXG5cdC8vIFRPRE86IFNob3VsZCBiZSBkb2FibGUgaW4gTWFzb24uLi5cblx0bWV0aG9kQXJnTmFtZXMgPSBuQXJncyA9PiB7XG5cdFx0Y29uc3QgcmVzID0gWyBdXG5cdFx0Y29uc3QgYSA9ICdhJy5jaGFyQ29kZUF0KDApXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuQXJnczsgaSA9IGkgKyAxKVxuXHRcdFx0cmVzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShhICsgaSkpXG5cdFx0cmV0dXJuIHJlcy5qb2luKCcsJylcblx0fVxuXG4vLyBoYXNoLWNvZGUubXNcbmNvbnN0IGhhc2hlcyA9IG5ldyBXZWFrTWFwKClcbmV4cG9ydCBjb25zdFxuXHRoYXNoQ29kZURlZmF1bHQgPSAoXywgaGFzaENvZGUpID0+IHtcblx0XHRpZiAoXyA9PT0gbnVsbClcblx0XHRcdHJldHVybiAxMDhcblx0XHRpZiAoXyA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0cmV0dXJuIDEwOVxuXG5cdFx0bGV0IGhhc2ggPSBoYXNoZXMuZ2V0KF8pXG5cdFx0aWYgKGhhc2ggIT09IHVuZGVmaW5lZClcblx0XHRcdHJldHVybiBoYXNoXG5cblx0XHQvLyBEb24ndCByZWN1cnNlIGluZmluaXRlbHkuXG5cdFx0aGFzaGVzLnNldChfLCAxNylcblxuXHRcdGhhc2ggPSAxN1xuXHRcdGZvciAobGV0IGtleSBpbiBfKVxuXHRcdFx0aGFzaCA9IChoYXNoQ29kZShfW2tleV0pICsgKChoYXNoICogMjMpIHwgMCkpIHwgMFxuXG5cdFx0aGFzaGVzLnNldChfLCBoYXNoKVxuXHRcdHJldHVybiBoYXNoXG5cdH0sXG5cblx0aGFzaENvZGVTdHJpbmcgPSBfID0+IHtcblx0XHRsZXQgaGFzaCA9IDEzXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBfLmxlbmd0aDsgaSA9IGkgKyAxKVxuXHRcdFx0aGFzaCA9ICgoaGFzaCArIF8uY2hhckNvZGVBdChpKSkgfCAwKSAqIDMxXG5cdFx0cmV0dXJuIGhhc2hcblx0fVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=