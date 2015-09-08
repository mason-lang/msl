if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	if (typeof window !== 'undefined') window.global = window;else global.window = global;

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
		return ms[name](...args);
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
			if (!fun(...args)) throw new Error(assertErrorMessage(`assert! ${ fun.name }`, args));
		},

		assertNot(fun) {
			// TODO:ES6 Splat
			const args = Array.prototype.slice.call(arguments, 1);
			if (fun(...args)) throw new Error(assertErrorMessage(`forbid! ${ fun.name }`, args));
		},

		assertMember(obj, member) {
			// TODO:ES6 Splat
			const args = Array.prototype.slice.call(arguments, 2);
			if (!obj[member](...args)) throw new Error(assertErrorMessage(`assert! ${ _ms.inspect(obj) }.${ member }`, args));
		},

		assertNotMember(obj, member) {
			const args = Array.prototype.slice.call(arguments, 2);
			if (obj[member](...args)) throw new Error(assertErrorMessage(`assert! ${ _ms.inspect(obj) }.${ member }`, args));
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

		// Unlike Object.assign, does *not* invoke getters.
		set(value, propertiesObject, opName) {
			for (const key in propertiesObject) Object.defineProperty(value, key, Object.getOwnPropertyDescriptor(propertiesObject, key));
			if (!(value instanceof Function)) if (opName !== undefined) ms.setName(value, opName);
			return value;
		},
		setName(value, name) {
			value.name = name;
			return value;
		},
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJvb3RzdHJhcC5qcyIsInByaXZhdGUvYm9vdHN0cmFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQSxLQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFDaEMsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUEsS0FFdEIsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7O0FBRWhCLE9BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEtBQ3RDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtBQUNsQyxPQUFLO0FBQ0wsVUFBUSxFQUFFLEtBQUs7QUFDZixZQUFVLEVBQUUsS0FBSztBQUNqQixjQUFZLEVBQUUsS0FBSztFQUNuQixDQUFDLENBQUE7Ozs7QUFHSTs7QUFFTixHQUFFLEdBQUcsRUFBRztPQUNSLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEtBQ2pCLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQztPQUNwQixNQUFNLEdBQUcsVUFBUyxJQUFJLEVBQUU7O0FBRXZCLFFBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDckQsU0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQTtFQUN4QixDQUFBOzs7OztBQUVGLEtBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFBOztBQUV2QixPQUFNLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUE7O0FBRWhELE9BQU0sa0JBQWtCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxLQUFLO0FBQzFDLFFBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMs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QUcsR0FBRyxDQUFBOzs7O0FBSVIsT0FBTSxrQkFBa0IsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7O0FBQzlDLE9BQU0sWUFBWSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksS0FDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUE7Ozs7QUFHL0MsVUFBUyxDQUFDLGVBQWUsRUFBRSxDQUFDLEtBQUssRUFBRSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUE7OztBQUcvQyxNQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEVBQUU7O0FBRXJELFFBQU0sR0FBRyxHQUFHLHVCQUF1QixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFBO0FBQ25FLE1BQUksQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO0VBQ2xEOzs7O0FBSUQsS0FBSSxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxVQUFTLENBQUMsRUFBRTtBQUM1QyxNQUFJLENBQUMsS0FBSyxJQUFJLEVBQ2IsT0FBTyxLQUFLLENBQUE7QUFDYixVQUFRLE9BQU8sQ0FBQztBQUNmLFFBQUssVUFBVSxDQUFDO0FBQ2hCLFFBQUssUUFBUTtBQUNaLFdBQU8sSUFBSSxDQUFBO0FBQUEsQUFDWjtBQUNDLFdBQU8sS0FBSyxDQUFBO0FBQUEsR0FDYjtFQUNELENBQUMsQ0FBQTs7QUFFRixhQUFZLENBQUMsUUFBUSxFQUFFLFVBQVMsQ0FBQyxFQUFFO0FBQUUsU0FBTyxDQUFDLFlBQVksSUFBSSxDQUFBO0VBQUUsQ0FBQyxDQUFBIiwiZmlsZSI6InByaXZhdGUvYm9vdHN0cmFwLmpzIiwic291cmNlc0NvbnRlbnQiOltudWxsLCJpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpXG5cdHdpbmRvdy5nbG9iYWwgPSB3aW5kb3dcbmVsc2Vcblx0Z2xvYmFsLndpbmRvdyA9IGdsb2JhbFxuXG5leHBvcnQgY29uc3QgcEFkZCA9IChvYmplY3QsIGtleSwgdmFsdWUpID0+XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuXHRcdHZhbHVlLFxuXHRcdHdyaXRhYmxlOiBmYWxzZSxcblx0XHRlbnVtZXJhYmxlOiBmYWxzZSxcblx0XHRjb25maWd1cmFibGU6IGZhbHNlXG5cdH0pXG5cbi8vIHJlZ2lvbiBCdWlsdGluIEZ1bmN0aW9ucyBmb3IgdXNlIGJ5IHRoZSBjb21waWxlclxuZXhwb3J0IGNvbnN0XG5cdC8vIFRoaXMgb2JqZWN0IGNvbnRhaW5zIGZ1bmN0aW9ucyBjYWxsZWQgdXBvbiBieSBjb21waWxlZCBjb2RlLlxuXHRtcyA9IHsgfSxcblx0bXNEZWYgPSAobmFtZSwgZnVuKSA9PlxuXHRcdHBBZGQobXMsIG5hbWUsIGZ1biksXG5cdG1zQ2FsbCA9IGZ1bmN0aW9uKG5hbWUpIHtcblx0XHQvLyBUT0RPOkVTNiBTcGxhdFxuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG5cdFx0cmV0dXJuIG1zW25hbWVdKC4uLmFyZ3MpXG5cdH1cblxucEFkZChnbG9iYWwsICdfbXMnLCBtcylcblxuY29uc3QgaW5kZW50ID0gc3RyID0+IHN0ci5yZXBsYWNlKC9cXG4vZywgJ1xcblxcdCcpXG5cbmNvbnN0IGFzc2VydEVycm9yTWVzc2FnZSA9IChsZWFkLCBhcmdzKSA9PiB7XG5cdGNvbnN0IHNob3dBcmdzID0gYXJncy5tYXAoX21zLmluc3BlY3QpLmpvaW4oJ1xcbicpXG5cdHJldHVybiBgJHtsZWFkfVxcblxcdCR7aW5kZW50KHNob3dBcmdzKX1gXG59XG5cbmNvbnN0IG1zRGVmcyA9IHtcblx0Ly8gVE9ETzogdXNlICshIG1ldGhvZFxuXHRhZGQoYmFnLCB2YWx1ZSkge1xuXHRcdGJhZy5wdXNoKHZhbHVlKVxuXHR9LFxuXG5cdGFkZE1hbnkoYmFnLCB2YWx1ZXMpIHtcblx0XHRmb3IgKGxldCB2YWx1ZSBvZiB2YWx1ZXMpXG5cdFx0XHRtcy5hZGQoYmFnLCB2YWx1ZSlcblx0fSxcblxuXHRhc3NlcnQoZnVuKSB7XG5cdFx0Ly8gVE9ETzpFUzYgU3BsYXRcblx0XHRjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuXHRcdGlmICghZnVuKC4uLmFyZ3MpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGFzc2VydEVycm9yTWVzc2FnZShgYXNzZXJ0ISAke2Z1bi5uYW1lfWAsIGFyZ3MpKVxuXHR9LFxuXG5cdGFzc2VydE5vdChmdW4pIHtcblx0XHQvLyBUT0RPOkVTNiBTcGxhdFxuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG5cdFx0aWYgKGZ1biguLi5hcmdzKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihhc3NlcnRFcnJvck1lc3NhZ2UoYGZvcmJpZCEgJHtmdW4ubmFtZX1gLCBhcmdzKSlcblx0fSxcblxuXHRhc3NlcnRNZW1iZXIob2JqLCBtZW1iZXIpIHtcblx0XHQvLyBUT0RPOkVTNiBTcGxhdFxuXHRcdGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpXG5cdFx0aWYgKCFvYmpbbWVtYmVyXSguLi5hcmdzKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihhc3NlcnRFcnJvck1lc3NhZ2UoYGFzc2VydCEgJHtfbXMuaW5zcGVjdChvYmopfS4ke21lbWJlcn1gLCBhcmdzKSlcblx0fSxcblxuXHRhc3NlcnROb3RNZW1iZXIob2JqLCBtZW1iZXIpIHtcblx0XHRjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKVxuXHRcdGlmIChvYmpbbWVtYmVyXSguLi5hcmdzKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihhc3NlcnRFcnJvck1lc3NhZ2UoYGFzc2VydCEgJHtfbXMuaW5zcGVjdChvYmopfS4ke21lbWJlcn1gLCBhcmdzKSlcblx0fSxcblxuXHRsYXp5R2V0TW9kdWxlKG1vZHVsZSkge1xuXHRcdGlmIChtb2R1bGUgPT09IHVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcignTW9kdWxlIHVuZGVmaW5lZC4nKVxuXHRcdHJldHVybiBtb2R1bGUuX2dldCBpbnN0YW5jZW9mIG1zLkxhenkgPyBtb2R1bGUuX2dldCA6IG1zLmxhenkoKCkgPT4gbW9kdWxlKVxuXHR9LFxuXG5cdGdldE1vZHVsZShtb2R1bGUpIHtcblx0XHRpZiAobW9kdWxlID09IG51bGwpIHJldHVybiBudWxsXG5cdFx0Ly9pZiAobW9kdWxlID09PSB1bmRlZmluZWQpXG5cdFx0Ly9cdHRocm93IG5ldyBFcnJvcignTW9kdWxlIHVuZGVmaW5lZC4nKVxuXHRcdHJldHVybiBtb2R1bGUuX2dldCBpbnN0YW5jZW9mIG1zLkxhenkgPyBtb2R1bGUuX2dldC5nZXQoKSA6IG1vZHVsZVxuXHR9LFxuXG5cdGdldERlZmF1bHRFeHBvcnQobW9kdWxlKSB7XG5cdFx0aWYgKG1vZHVsZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNb2R1bGUgdW5kZWZpbmVkLicpXG5cdFx0Y29uc3QgbW9kID0gbXMuZ2V0TW9kdWxlKG1vZHVsZSlcblx0XHRyZXR1cm4gbW9kLmRlZmF1bHQgPT09IHVuZGVmaW5lZCA/IG1vZCA6IG1vZC5kZWZhdWx0XG5cdH0sXG5cblx0bGF6eVByb3AobGF6eU9iamVjdCwga2V5KSB7XG5cdFx0aWYgKCEobGF6eU9iamVjdCBpbnN0YW5jZW9mIG1zLkxhenkpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBhIExhenksIGdvdDogJHtsYXp5T2JqZWN0fWApXG5cdFx0cmV0dXJuIG1zLmxhenkoKCkgPT4gbGF6eU9iamVjdC5nZXQoKVtrZXldKVxuXHR9LFxuXG5cdGdldChvYmplY3QsIGtleSkge1xuXHRcdGNvbnN0IF8gPSBvYmplY3Rba2V5XVxuXHRcdGlmIChfID09PSB1bmRlZmluZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYE1vZHVsZSAke29iamVjdC5uYW1lfSBkb2VzIG5vdCBoYXZlICR7a2V5fWApXG5cdFx0cmV0dXJuIF9cblx0fSxcblxuXHRMYXp5OiBmdW5jdGlvbiBMYXp5KGdldCkge1xuXHRcdHRoaXMuZ2V0ID0gKCkgPT4ge1xuXHRcdFx0dGhpcy5nZXQgPSAoKSA9PiB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgTGF6eSB2YWx1ZSBkZXBlbmRzIG9uIGl0c2VsZi4gVGh1bms6ICR7Z2V0fWApXG5cdFx0XHR9XG5cdFx0XHRjb25zdCBfID0gZ2V0KClcblx0XHRcdHRoaXMuZ2V0ID0gKCkgPT4gX1xuXHRcdFx0cmV0dXJuIF9cblx0XHR9XG5cdH0sXG5cdGxhenk6IF8gPT4gbmV3IG1zLkxhenkoXyksXG5cdHVubGF6eTogXyA9PiBfIGluc3RhbmNlb2YgbXMuTGF6eSA/IF8uZ2V0KCkgOiBfLFxuXG5cdC8vIFVubGlrZSBPYmplY3QuYXNzaWduLCBkb2VzICpub3QqIGludm9rZSBnZXR0ZXJzLlxuXHRzZXQodmFsdWUsIHByb3BlcnRpZXNPYmplY3QsIG9wTmFtZSkge1xuXHRcdGZvciAoY29uc3Qga2V5IGluIHByb3BlcnRpZXNPYmplY3QpXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodmFsdWUsIGtleSxcblx0XHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm9wZXJ0aWVzT2JqZWN0LCBrZXkpKVxuXHRcdGlmICghKHZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pKVxuXHRcdFx0aWYgKG9wTmFtZSAhPT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRtcy5zZXROYW1lKHZhbHVlLCBvcE5hbWUpXG5cdFx0cmV0dXJuIHZhbHVlXG5cdH0sXG5cdHNldE5hbWUodmFsdWUsIG5hbWUpIHtcblx0XHR2YWx1ZS5uYW1lID0gbmFtZVxuXHRcdHJldHVybiB2YWx1ZVxuXHR9LFxuXHRzZXRMYXp5KHZhbHVlLCBuYW1lLCBsYXp5KSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbHVlLCBuYW1lLCB7IGdldDogbGF6eS5nZXQsIGVudW1lcmFibGU6IHRydWUgfSlcblx0fSxcblxuXHRzeW1ib2wodmFsdWUpIHtcblx0XHRjb25zdCBzeW1ib2wgPSB2YWx1ZVsnaW1wbC1zeW1ib2wnXVxuXHRcdHJldHVybiBzeW1ib2wgPT09IHVuZGVmaW5lZCA/IHZhbHVlIDogc3ltYm9sXG5cdH0sXG5cblx0bmV3UHJvcGVydHkob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuXHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBuYW1lKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihgUHJvcGVydHkgJHtuYW1lfSBhbHJlYWR5IGV4aXN0cy5gKVxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZVxuXHRcdH0pXG5cdH0sXG5cdG5ld011dGFibGVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG5cdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIG5hbWUpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBQcm9wZXJ0eSAke25hbWV9IGFscmVhZHkgZXhpc3RzLmApXG5cdFx0b2JqZWN0W25hbWVdID0gdmFsdWVcblx0fVxufVxuZm9yIChjb25zdCBkZWYgaW4gbXNEZWZzKVxuXHRtc0RlZihkZWYsIG1zRGVmc1tkZWZdKVxuXG5jb25zdCBtc0RlZlRlbXAgPSAobmFtZSwgZnVuKSA9PlxuXHRtc1tuYW1lXSA9IGZ1blxuXG4vLyByZWdpb24gQ29udGFpbnNcbi8vIFNvbWUgVHlwZXMgd2FudCB0byBpbXBsZW1lbnQgY29udGFpbnM/IGJlZm9yZSBpdCBpcyBvZmZpY2lhbGx5IGRlZmluZWQuXG5leHBvcnQgY29uc3QgY29udGFpbnNJbXBsU3ltYm9sID0gU3ltYm9sKCdjb250YWlucz8nKVxuZXhwb3J0IGNvbnN0IGltcGxDb250YWlucyA9ICh0eXBlLCBpbXBsKSA9PlxuXHRwQWRkKHR5cGUucHJvdG90eXBlLCBjb250YWluc0ltcGxTeW1ib2wsIGltcGwpXG5cbi8vIE92ZXJ3cml0dGVuIGJ5IFR5cGUvaW5kZXgubXMgdG8gYWN0dWFsbHkgZG8gdHlwZSBjaGVja2luZy5cbm1zRGVmVGVtcCgnY2hlY2tDb250YWlucycsIChfdHlwZSwgdmFsKSA9PiB2YWwpXG5cbi8vIFNpbmNlIHRoZXNlIGFyZSBwcmltaXRpdmVzLCB3ZSBjYW4ndCB1c2UgYGluc3RhbmNlb2ZgLlxuZm9yIChjb25zdCB0eXBlIG9mIFtCb29sZWFuLCBTdHJpbmcsIFN5bWJvbCwgTnVtYmVyXSkge1xuXHQvLyBHZW5lcmF0ZWQgY29kZSBpcyBmYXN0ZXIgdGhhbiB1c2luZyBhIGNsb3N1cmUuXG5cdGNvbnN0IHNyYyA9ICdyZXR1cm4gdHlwZW9mIF8gPT09IFwiJyArIHR5cGUubmFtZS50b0xvd2VyQ2FzZSgpICsgJ1wiJ1xuXHRwQWRkKHR5cGUsIGNvbnRhaW5zSW1wbFN5bWJvbCwgRnVuY3Rpb24oJ18nLCBzcmMpKVxufVxuXG4vLyBGdW5jdGlvbnMgYXJlIE9iamVjdHMsIHNvIHdlIGRvIHRoaXMgb25lIGRpZmZlcmVudGx5LlxuLy8gVE9ETzogVGhpcyB0cmVhdHMgT2JqZWN0LmNyZWF0ZShudWxsKSBhcyBhbiBvYmplY3QuIERvIHdlIHdhbnQgdGhhdD9cbnBBZGQoT2JqZWN0LCBjb250YWluc0ltcGxTeW1ib2wsIGZ1bmN0aW9uKF8pIHtcblx0aWYgKF8gPT09IG51bGwpXG5cdFx0cmV0dXJuIGZhbHNlXG5cdHN3aXRjaCAodHlwZW9mIF8pIHtcblx0XHRjYXNlICdmdW5jdGlvbic6XG5cdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBmYWxzZVxuXHR9XG59KVxuXG5pbXBsQ29udGFpbnMoRnVuY3Rpb24sIGZ1bmN0aW9uKF8pIHsgcmV0dXJuIF8gaW5zdGFuY2VvZiB0aGlzIH0pXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==