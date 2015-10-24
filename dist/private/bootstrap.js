if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	if (typeof global === 'undefined') window.global = window;

	if (global.setImmediate === undefined) global.setImmediate = action => {
		setTimeout(action, 0);
	};

	const pAdd = (object, key, value) => Object.defineProperty(object, key, {
		value,
		writable: false,
		enumerable: false,
		configurable: false
	});

	exports.pAdd = pAdd;
	// region Builtin Functions for use by the compiler
	const
	// This object contains functions called upon by compiled code.
	ms = {},
	      msDef = (name, fun) => pAdd(ms, name, fun),
	      msCall = function (name) {
		// TODO:ES6 Splat
		const args = Array.prototype.slice.call(arguments, 1);
		return ms[name].apply(ms, _toConsumableArray(args));
	};

	exports.ms = ms;
	exports.msDef = msDef;
	exports.msCall = msCall;
	pAdd(global, '_ms', ms);

	const indent = str => str.replace(/\n/g, '\n\t');

	const assertErrorMessage = (lead, args) => {
		const showArgs = args.map(_ms.inspect).join('\n');
		return `${ lead }\n\t${ indent(showArgs) }`;
	};

	const msDefs = {
		// TODO: use +! method
		add(bag, value) {
			bag.push(value);
		},

		addMany(bag, values) {
			for (let value of values) ms.add(bag, value);
		},

		assert(fun) {
			// TODO:ES6 Splat
			const args = Array.prototype.slice.call(arguments, 1);
			if (!fun.apply(undefined, _toConsumableArray(args))) throw new Error(assertErrorMessage(`assert! ${ fun.name }`, args));
		},

		assertNot(fun) {
			// TODO:ES6 Splat
			const args = Array.prototype.slice.call(arguments, 1);
			if (fun.apply(undefined, _toConsumableArray(args))) throw new Error(assertErrorMessage(`forbid! ${ fun.name }`, args));
		},

		assertMember(obj, member) {
			// TODO:ES6 Splat
			const args = Array.prototype.slice.call(arguments, 2);
			if (!obj[member].apply(obj, _toConsumableArray(args))) throw new Error(assertErrorMessage(`assert! ${ _ms.inspect(obj) }.${ member }`, args));
		},

		assertNotMember(obj, member) {
			const args = Array.prototype.slice.call(arguments, 2);
			if (obj[member].apply(obj, _toConsumableArray(args))) throw new Error(assertErrorMessage(`assert! ${ _ms.inspect(obj) }.${ member }`, args));
		},

		lazyGetModule(module) {
			if (module === undefined) throw new Error('Module undefined.');
			return module._get instanceof ms.Lazy ? module._get : ms.lazy(() => module);
		},

		getModule(module) {
			if (module == null) return null;
			//if (module === undefined)
			//	throw new Error('Module undefined.')
			return module._get instanceof ms.Lazy ? module._get.get() : module;
		},

		getDefaultExport(module) {
			if (module === undefined) throw new Error('Module undefined.');
			const mod = ms.getModule(module);
			return mod.default === undefined ? mod : mod.default;
		},

		lazyProp(lazyObject, key) {
			if (!(lazyObject instanceof ms.Lazy)) throw new Error(`Expected a Lazy, got: ${ lazyObject }`);
			return ms.lazy(() => lazyObject.get()[key]);
		},

		get(object, key) {
			const _ = object[key];
			if (_ === undefined) throw new Error(`Module ${ object.name } does not have ${ key }`);
			return _;
		},

		Lazy: function Lazy(get) {
			this.get = () => {
				this.get = () => {
					throw new Error(`Lazy value depends on itself. Thunk: ${ get }`);
				};
				const _ = get();
				this.get = () => _;
				return _;
			};
		},
		lazy: _ => new ms.Lazy(_),
		unlazy: _ => _ instanceof ms.Lazy ? _.get() : _,

		setLazy(value, name, lazy) {
			Object.defineProperty(value, name, { get: lazy.get, enumerable: true });
		},

		symbol(value) {
			const symbol = value['impl-symbol'];
			return symbol === undefined ? value : symbol;
		},

		newProperty(object, name, value) {
			if (Object.prototype.hasOwnProperty.call(object, name)) throw new Error(`Property ${ name } already exists.`);
			Object.defineProperty(object, name, {
				configurable: true,
				enumerable: true,
				writable: false,
				value
			});
		},
		newMutableProperty(object, name, value) {
			if (Object.prototype.hasOwnProperty.call(object, name)) throw new Error(`Property ${ name } already exists.`);
			object[name] = value;
		}
	};
	for (const def in msDefs) msDef(def, msDefs[def]);

	const msDefTemp = (name, fun) => ms[name] = fun;

	// region Contains
	// Some Types want to implement contains? before it is officially defined.
	const containsImplSymbol = Symbol('contains?');
	exports.containsImplSymbol = containsImplSymbol;
	const implContains = (type, impl) => pAdd(type.prototype, containsImplSymbol, impl);

	exports.implContains = implContains;
	// Overwritten by Type/index.ms to actually do type checking.
	msDefTemp('checkContains', (_type, val) => val);

	// Since these are primitives, we can't use `instanceof`.
	for (const type of [Boolean, String, Symbol, Number]) {
		// Generated code is faster than using a closure.
		const src = 'return typeof _ === "' + type.name.toLowerCase() + '"';
		pAdd(type, containsImplSymbol, Function('_', src));
	}

	// Functions are Objects, so we do this one differently.
	// TODO: This treats Object.create(null) as an object. Do we want that?
	pAdd(Object, containsImplSymbol, function (_) {
		if (_ === null) return false;
		switch (typeof _) {
			case 'function':
			case 'object':
				return true;
			default:
				return false;
		}
	});

	implContains(Function, function (_) {
		return _ instanceof this;
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3RzdHJhcC5qcyIsInByaXZhdGUvYm9vdHN0cmFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNBQSxLQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFDaEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7O0FBRXZCLEtBQUksTUFBTSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQ3BDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsTUFBTSxJQUFJO0FBQy9CLFlBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUE7RUFDckIsQ0FBQTs7QUFFSyxPQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxLQUN0QyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7QUFDbEMsT0FBSztBQUNMLFVBQVEsRUFBRSxLQUFLO0FBQ2YsWUFBVSxFQUFFLEtBQUs7QUFDakIsY0FBWSxFQUFFLEtBQUs7RUFDbkIsQ0FBQyxDQUFBOzs7O0FBR0k7O0FBRU4sR0FBRSxHQUFHLEVBQUc7T0FDUixLQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxLQUNqQixJQUFJLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLENBQUM7T0FDcEIsTUFBTSxHQUFHLFVBQVMsSUFBSSxFQUFFOztBQUV2QixRQUFNLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3JELFNBQU8sRUFBRSxDQUFDLElBQUksT0FBQyxDQUFSLEVBQUUscUJBQVUsSUFBSSxFQUFDLENBQUE7RUFDeEIsQ0FBQTs7Ozs7QUFFRixLQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQTs7QUFFdkIsT0FBTSxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FB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UUFBTSxHQUFHLEdBQUcsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUE7QUFDbkUsTUFBSSxDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7RUFDbEQ7Ozs7QUFJRCxLQUFJLENBQUMsTUFBTSxFQUFFLGtCQUFrQixFQUFFLFVBQVMsQ0FBQyxFQUFFO0FBQzVDLE1BQUksQ0FBQyxLQUFLLElBQUksRUFDYixPQUFPLEtBQUssQ0FBQTtBQUNiLFVBQVEsT0FBTyxDQUFDO0FBQ2YsUUFBSyxVQUFVLENBQUM7QUFDaEIsUUFBSyxRQUFRO0FBQ1osV0FBTyxJQUFJLENBQUE7QUFBQSxBQUNaO0FBQ0MsV0FBTyxLQUFLLENBQUE7QUFBQSxHQUNiO0VBQ0QsQ0FBQyxDQUFBOztBQUVGLGFBQVksQ0FBQyxRQUFRLEVBQUUsVUFBUyxDQUFDLEVBQUU7QUFBRSxTQUFPLENBQUMsWUFBWSxJQUFJLENBQUE7RUFBRSxDQUFDLENBQUEiLCJmaWxlIjoicHJpdmF0ZS9ib290c3RyYXAuanMiLCJzb3VyY2VzQ29udGVudCI6W251bGwsImlmICh0eXBlb2YgZ2xvYmFsID09PSAndW5kZWZpbmVkJylcblx0d2luZG93Lmdsb2JhbCA9IHdpbmRvd1xuXG5pZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSA9PT0gdW5kZWZpbmVkKVxuXHRnbG9iYWwuc2V0SW1tZWRpYXRlID0gYWN0aW9uID0+IHtcblx0XHRzZXRUaW1lb3V0KGFjdGlvbiwgMClcblx0fVxuXG5leHBvcnQgY29uc3QgcEFkZCA9IChvYmplY3QsIGtleSwgdmFsdWUpID0+XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuXHRcdHZhbHVlLFxuXHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRjb25maWd1cmFibGU6IGZhbHNlXG5cdH0pXG5cbi8vIHJlZ2lvbiBCdWlsdGluIEZ1bmN0aW9ucyBmb3IgdXNlIGJ5IHRoZSBjb21waWxlclxuZXhwb3J0IGNvbnN0XG5cdC8vIFRoaXMgb2JqZWN0IGNvbnRhaW5zIGZ1bmN0aW9ucyBjYWxsZWQgdXBvbiBieSBjb21waWxlZCBjb2RlLlxuXHRtcyA9IHsgfSxcblx0bXNEZWYgPSAobmFtZSwgZnVuKSA9PlxuXHRcdHBBZGQobXMsIG5hbWUsIGZ1biksXG5cdG1zQ2FsbCA9IGZ1bmN0aW9uKG5hbWUpIHtcblx0XHQvLyBUT0RPOkVTNiBTcGxhdFxuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG5cdFx0cmV0dXJuIG1zW25hbWVdKC4uLmFyZ3MpXG5cdH1cblxucEFkZChnbG9iYWwsICdfbXMnLCBtcylcblxuY29uc3QgaW5kZW50ID0gc3RyID0+IHN0ci5yZXBsYWNlKC9cXG4vZywgJ1xcblxcdCcpXG5cbmNvbnN0IGFzc2VydEVycm9yTWVzc2FnZSA9IChsZWFkLCBhcmdzKSA9PiB7XG5cdGNvbnN0IHNob3dBcmdzID0gYXJncy5tYXAoX21zLmluc3BlY3QpLmpvaW4oJ1xcbicpXG5cdHJldHVybiBgJHtsZWFkfVxcblxcdCR7aW5kZW50KHNob3dBcmdzKX1gXG59XG5cbmNvbnN0IG1zRGVmcyA9IHtcblx0Ly8gVE9ETzogdXNlICshIG1ldGhvZFxuXHRhZGQoYmFnLCB2YWx1ZSkge1xuXHRcdGJhZy5wdXNoKHZhbHVlKVxuXHR9LFxuXG5cdGFkZE1hbnkoYmFnLCB2YWx1ZXMpIHtcblx0XHRmb3IgKGxldCB2YWx1ZSBvZiB2YWx1ZXMpXG5cdFx0XHRtcy5hZGQoYmFnLCB2YWx1ZSlcblx0fSxcblxuXHRhc3NlcnQoZnVuKSB7XG5cdFx0Ly8gVE9ETzpFUzYgU3BsYXRcblx0XHRjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXHRcdGlmICghZnVuKC4uLmFyZ3MpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGFzc2VydEVycm9yTWVzc2FnZShgYXNzZXJ0ISAke2Z1bi5uYW1lfWAsIGFyZ3MpKVxuXHR9LFxuXG5cdGFzc2VydE5vdChmdW4pIHtcblx0XHQvLyBUT0RPOkVTNiBTcGxhdFxuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG5cdFx0aWYgKGZ1biguLi5hcmdzKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihhc3NlcnRFcnJvck1lc3NhZ2UoYGZvcmJpZCEgJHtmdW4ubmFtZX1gLCBhcmdzKSlcblx0fSxcblxuXHRhc3NlcnRNZW1iZXIob2JqLCBtZW1iZXIpIHtcblx0XHQvLyBUT0RPOkVTNiBTcGxhdFxuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpXG5cdFx0aWYgKCFvYmpbbWVtYmVyXSguLi5hcmdzKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihhc3NlcnRFcnJvck1lc3NhZ2UoYGFzc2VydCEgJHtfbXMuaW5zcGVjdChvYmopfS4ke21lbWJlcn1gLCBhcmdzKSlcblx0fSxcblxuXHRhc3NlcnROb3RNZW1iZXIob2JqLCBtZW1iZXIpIHtcblx0XHRjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKVxuXHRcdGlmIChvYmpbbWVtYmVyXSguLi5hcmdzKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihhc3NlcnRFcnJvck1lc3NhZ2UoYGFzc2VydCEgJHtfbXMuaW5zcGVjdChvYmopfS4ke21lbWJlcn1gLCBhcmdzKSlcblx0fSxcblxuXHRsYXp5R2V0TW9kdWxlKG1vZHVsZSkge1xuXHRcdGlmIChtb2R1bGUgPT09IHVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcignTW9kdWxlIHVuZGVmaW5lZC4nKVxuXHRcdHJldHVybiBtb2R1bGUuX2dldCBpbnN0YW5jZW9mIG1zLkxhenkgPyBtb2R1bGUuX2dldCA6IG1zLmxhenkoKCkgPT4gbW9kdWxlKVxuXHR9LFxuXG5cdGdldE1vZHVsZShtb2R1bGUpIHtcblx0XHRpZiAobW9kdWxlID09IG51bGwpIHJldHVybiBudWxsXG5cdFx0Ly9pZiAobW9kdWxlID09PSB1bmRlZmluZWQpXG5cdFx0Ly9cdHRocm93IG5ldyBFcnJvcignTW9kdWxlIHVuZGVmaW5lZC4nKVxuXHRcdHJldHVybiBtb2R1bGUuX2dldCBpbnN0YW5jZW9mIG1zLkxhenkgPyBtb2R1bGUuX2dldC5nZXQoKSA6IG1vZHVsZVxuXHR9LFxuXG5cdGdldERlZmF1bHRFeHBvcnQobW9kdWxlKSB7XG5cdFx0aWYgKG1vZHVsZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNb2R1bGUgdW5kZWZpbmVkLicpXG5cdFx0Y29uc3QgbW9kID0gbXMuZ2V0TW9kdWxlKG1vZHVsZSlcblx0XHRyZXR1cm4gbW9kLmRlZmF1bHQgPT09IHVuZGVmaW5lZCA/IG1vZCA6IG1vZC5kZWZhdWx0XG5cdH0sXG5cblx0bGF6eVByb3AobGF6eU9iamVjdCwga2V5KSB7XG5cdFx0aWYgKCEobGF6eU9iamVjdCBpbnN0YW5jZW9mIG1zLkxhenkpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhIExhenksIGdvdDogJHtsYXp5T2JqZWN0fWApXG5cdFx0cmV0dXJuIG1zLmxhenkoKCkgPT4gbGF6eU9iamVjdC5nZXQoKVtrZXldKVxuXHR9LFxuXG5cdGdldChvYmplY3QsIGtleSkge1xuXHRcdGNvbnN0IF8gPSBvYmplY3Rba2V5XVxuXHRcdGlmIChfID09PSB1bmRlZmluZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYE1vZHVsZSAke29iamVjdC5uYW1lfSBkb2VzIG5vdCBoYXZlICR7a2V5fWApXG5cdFx0cmV0dXJuIF9cblx0fSxcblxuXHRMYXp5OiBmdW5jdGlvbiBMYXp5KGdldCkge1xuXHRcdHRoaXMuZ2V0ID0gKCkgPT4ge1xuXHRcdFx0dGhpcy5nZXQgPSAoKSA9PiB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgTGF6eSB2YWx1ZSBkZXBlbmRzIG9uIGl0c2VsZi4gVGh1bms6ICR7Z2V0fWApXG5cdFx0XHR9XG5cdFx0XHRjb25zdCBfID0gZ2V0KClcblx0XHRcdHRoaXMuZ2V0ID0gKCkgPT4gX1xuXHRcdFx0cmV0dXJuIF9cblx0XHR9XG5cdH0sXG5cdGxhenk6IF8gPT4gbmV3IG1zLkxhenkoXyksXG5cdHVubGF6eTogXyA9PiBfIGluc3RhbmNlb2YgbXMuTGF6eSA/IF8uZ2V0KCkgOiBfLFxuXG5cdHNldExhenkodmFsdWUsIG5hbWUsIGxhenkpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodmFsdWUsIG5hbWUsIHsgZ2V0OiBsYXp5LmdldCwgZW51bWVyYWJsZTogdHJ1ZSB9KVxuXHR9LFxuXG5cdHN5bWJvbCh2YWx1ZSkge1xuXHRcdGNvbnN0IHN5bWJvbCA9IHZhbHVlWydpbXBsLXN5bWJvbCddXG5cdFx0cmV0dXJuIHN5bWJvbCA9PT0gdW5kZWZpbmVkID8gdmFsdWUgOiBzeW1ib2xcblx0fSxcblxuXHRuZXdQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG5cdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIG5hbWUpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBQcm9wZXJ0eSAke25hbWV9IGFscmVhZHkgZXhpc3RzLmApXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgbmFtZSwge1xuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHRcdHZhbHVlXG5cdFx0fSlcblx0fSxcblx0bmV3TXV0YWJsZVByb3BlcnR5KG9iamVjdCwgbmFtZSwgdmFsdWUpIHtcblx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgbmFtZSkpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYFByb3BlcnR5ICR7bmFtZX0gYWxyZWFkeSBleGlzdHMuYClcblx0XHRvYmplY3RbbmFtZV0gPSB2YWx1ZVxuXHR9XG59XG5mb3IgKGNvbnN0IGRlZiBpbiBtc0RlZnMpXG5cdG1zRGVmKGRlZiwgbXNEZWZzW2RlZl0pXG5cbmNvbnN0IG1zRGVmVGVtcCA9IChuYW1lLCBmdW4pID0+XG5cdG1zW25hbWVdID0gZnVuXG5cbi8vIHJlZ2lvbiBDb250YWluc1xuLy8gU29tZSBUeXBlcyB3YW50IHRvIGltcGxlbWVudCBjb250YWlucz8gYmVmb3JlIGl0IGlzIG9mZmljaWFsbHkgZGVmaW5lZC5cbmV4cG9ydCBjb25zdCBjb250YWluc0ltcGxTeW1ib2wgPSBTeW1ib2woJ2NvbnRhaW5zPycpXG5leHBvcnQgY29uc3QgaW1wbENvbnRhaW5zID0gKHR5cGUsIGltcGwpID0+XG5cdHBBZGQodHlwZS5wcm90b3R5cGUsIGNvbnRhaW5zSW1wbFN5bWJvbCwgaW1wbClcblxuLy8gT3ZlcndyaXR0ZW4gYnkgVHlwZS9pbmRleC5tcyB0byBhY3R1YWxseSBkbyB0eXBlIGNoZWNraW5nLlxubXNEZWZUZW1wKCdjaGVja0NvbnRhaW5zJywgKF90eXBlLCB2YWwpID0+IHZhbClcblxuLy8gU2luY2UgdGhlc2UgYXJlIHByaW1pdGl2ZXMsIHdlIGNhbid0IHVzZSBgaW5zdGFuY2VvZmAuXG5mb3IgKGNvbnN0IHR5cGUgb2YgW0Jvb2xlYW4sIFN0cmluZywgU3ltYm9sLCBOdW1iZXJdKSB7XG5cdC8vIEdlbmVyYXRlZCBjb2RlIGlzIGZhc3RlciB0aGFuIHVzaW5nIGEgY2xvc3VyZS5cblx0Y29uc3Qgc3JjID0gJ3JldHVybiB0eXBlb2YgXyA9PT0gXCInICsgdHlwZS5uYW1lLnRvTG93ZXJDYXNlKCkgKyAnXCInXG5cdHBBZGQodHlwZSwgY29udGFpbnNJbXBsU3ltYm9sLCBGdW5jdGlvbignXycsIHNyYykpXG59XG5cbi8vIEZ1bmN0aW9ucyBhcmUgT2JqZWN0cywgc28gd2UgZG8gdGhpcyBvbmUgZGlmZmVyZW50bHkuXG4vLyBUT0RPOiBUaGlzIHRyZWF0cyBPYmplY3QuY3JlYXRlKG51bGwpIGFzIGFuIG9iamVjdC4gRG8gd2Ugd2FudCB0aGF0P1xucEFkZChPYmplY3QsIGNvbnRhaW5zSW1wbFN5bWJvbCwgZnVuY3Rpb24oXykge1xuXHRpZiAoXyA9PT0gbnVsbClcblx0XHRyZXR1cm4gZmFsc2Vcblx0c3dpdGNoICh0eXBlb2YgXykge1xuXHRcdGNhc2UgJ2Z1bmN0aW9uJzpcblx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdH1cbn0pXG5cbmltcGxDb250YWlucyhGdW5jdGlvbiwgZnVuY3Rpb24oXykgeyByZXR1cm4gXyBpbnN0YW5jZW9mIHRoaXMgfSlcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9
