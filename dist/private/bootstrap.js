if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	const pAdd = (object, key, value) => Object.defineProperty(object, key, {
		value,
		writable: false,
		enumerable: false,
		configurable: false
	});

	// region Builtin Functions for use by the compiler
	exports.pAdd = pAdd;
	const
	// This object contains functions called upon by compiled code.
	ms = {},
	      msDef = (name, fun) => pAdd(ms, name, fun),
	      msCall = (name, ...args) => ms[name](...args);

	exports.ms = ms;
	exports.msDef = msDef;
	exports.msCall = msCall;
	pAdd(global, '_ms', ms);

	const indent = str => str.replace(/\n/g, '\n\t');

	const msDefs = {
		// TODO: use +! method
		add(bag, value) {
			bag.push(value);
		},

		addMany(bag, values) {
			for (let value of values) ms.add(bag, value);
		},

		assert(fun, ...args) {
			if (!Function.prototype.apply.call(fun, null, args)) {
				const showArgs = args.map(_ms.repr).join('\n');
				throw new Error(`assert! ${ _ms.show(fun) }\n\t${ indent(showArgs) }`);
			}
		},

		assertNot(fun, ...args) {
			if (Function.prototype.apply.call(fun, null, args)) {
				const showArgs = args.map(_ms.repr).join('\n');
				throw new Error(`forbid! ${ _ms.show(fun) }\n\t${ indent(showArgs) }`);
			}
		},

		lazyGetModule(module) {
			if (module === undefined) throw new Error('Module undefined.');
			return module._get instanceof ms.Lazy ? module._get : ms.lazy(() => module);
		},

		getModule(module) {
			if (module === undefined) throw new Error('Module undefined.');
			return module._get instanceof ms.Lazy ? module._get.get() : module;
		},

		getDefaultExport: module => {
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

		bool(b) {
			if (typeof b !== 'boolean') {
				console.log(b);
				throw new Error(`Expected Boolean, got ${ b }`);
			}
			return b;
		},

		// Used for splat calls.
		// TODO:ES6 Shouldn't need. `fun(...arg)` should work for any iterable.
		arr(_) {
			if (_ instanceof Array) return _;
			const out = [];
			for (let em of _) out.push(em);
			return out;
		},

		error(err) {
			if (err instanceof Error) return err;else if (typeof err === 'string') return new Error(err);else if (err instanceof _ms.Lazy) return _ms.error(err.get());else throw new Error('Thrown value must be Error or String');
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

	// Overridden by show.ms.
	msDefTemp('show', _ => {
		if (typeof _ !== 'string' && typeof _ !== 'number') throw new Error(`Only use Strings or Numbers here until this is overridden by show.ms. Got:\n${ _ }`);
		return _.toString();
	});

	// region Contains
	// Some Types want to implement contains? before it is officially defined.
	const containsImplSymbol = Symbol('contains?');
	exports.containsImplSymbol = containsImplSymbol;
	const implContains = (type, impl) => pAdd(type.prototype, containsImplSymbol, impl);

	// Overwritten by Type/index.ms to actually do type checking.
	exports.implContains = implContains;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByaXZhdGUvYm9vdHN0cmFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFPLE9BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxLQUFLLEtBQ3RDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRTtBQUNsQyxPQUFLO0FBQ0wsVUFBUSxFQUFFLEtBQUs7QUFDZixZQUFVLEVBQUUsS0FBSztBQUNqQixjQUFZLEVBQUUsS0FBSztFQUNuQixDQUFDLENBQUE7Ozs7QUFHSTs7QUFFTixHQUFFLEdBQUcsRUFBRztPQUNSLEtBQUssR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLEtBQ2pCLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQztPQUNwQixNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLEtBQ3RCLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFBOzs7OztBQUVuQixLQUFJLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQTs7QUFFdkIsT0FBTSxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFBOztBQUVoRCxPQUFNLE1BQU0sR0FBRzs7QUFFZCxLQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUNmLE1BQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7R0FDZjs7QUFFRCxTQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRTtBQUNwQixRQUFLLElBQUksS0FBSyxJQUFJLE1BQU0sRUFDdkIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUE7R0FDbkI7O0FBRUQsUUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksRUFBRTtBQUNwQixPQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7QUFDcEQsVUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzlDLFVBQU0sSUFBSSxLQUFLLENBQUMsQ0FBQyxRQUFRLEdBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxJQUFJLEdBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2xFO0dBQ0Q7O0FBRUQsV0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksRUFBRTtBQUN2QixPQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO0FBQ25ELFVBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUM5QyxVQUFNLElBQUksS0FBSyxDQUFDLENBQUMsUUFBUSxHQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsSUFBSSxHQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtJQUNsRTtHQUNEOztBQUVELGVBQWEsQ0FBQyxNQUFNLEVBQUU7QUFDckIsT0FBSSxNQUFNLEtBQUssU0FBUyxFQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDckMsVUFBTyxNQUFNLENBQUMsSUFBSSxZQUFZLEVBQUUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sTUFBTSxDQUFDLENBQUE7R0FDM0U7O0FBRUQsV0FBUyxDQUFDLE1BQU0sRUFBRTtBQUNqQixPQUFJLE1BQU0sS0FBSyxTQUFT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Q3JGLFNBQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO0VBQ25CLENBQUMsQ0FBQTs7OztBQUlLLE9BQU0sa0JBQWtCLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBOztBQUM5QyxPQUFNLFlBQVksR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLEtBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFBOzs7O0FBRy9DLFVBQVMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFBOzs7QUFHL0MsTUFBSyxNQUFNLElBQUksSUFBSSxDQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBRSxFQUFFOztBQUV2RCxRQUFNLEdBQUcsR0FBRyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQTtBQUNuRSxNQUFJLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTtFQUNsRDs7OztBQUlELEtBQUksQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsVUFBUyxDQUFDLEVBQUU7QUFDNUMsTUFBSSxDQUFDLEtBQUssSUFBSSxFQUNiLE9BQU8sS0FBSyxDQUFBO0FBQ2IsVUFBUSxPQUFPLENBQUM7QUFDZixRQUFLLFVBQVUsQ0FBQztBQUNoQixRQUFLLFFBQVE7QUFDWixXQUFPLElBQUksQ0FBQTtBQUFBLEFBQ1o7QUFDQyxXQUFPLEtBQUssQ0FBQTtBQUFBLEdBQ2I7RUFDRCxDQUFDLENBQUE7O0FBRUYsYUFBWSxDQUFDLFFBQVEsRUFBRSxVQUFTLENBQUMsRUFBRTtBQUFFLFNBQU8sQ0FBQyxZQUFZLElBQUksQ0FBQTtFQUFFLENBQUMsQ0FBQSIsImZpbGUiOiJwcml2YXRlL2Jvb3RzdHJhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBwQWRkID0gKG9iamVjdCwga2V5LCB2YWx1ZSkgPT5cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwga2V5LCB7XG5cdFx0dmFsdWUsXG5cdFx0d3JpdGFibGU6IGZhbHNlLFxuXHRcdGVudW1lcmFibGU6IGZhbHNlLFxuXHRcdGNvbmZpZ3VyYWJsZTogZmFsc2Vcblx0fSlcblxuLy8gcmVnaW9uIEJ1aWx0aW4gRnVuY3Rpb25zIGZvciB1c2UgYnkgdGhlIGNvbXBpbGVyXG5leHBvcnQgY29uc3Rcblx0Ly8gVGhpcyBvYmplY3QgY29udGFpbnMgZnVuY3Rpb25zIGNhbGxlZCB1cG9uIGJ5IGNvbXBpbGVkIGNvZGUuXG5cdG1zID0geyB9LFxuXHRtc0RlZiA9IChuYW1lLCBmdW4pID0+XG5cdFx0cEFkZChtcywgbmFtZSwgZnVuKSxcblx0bXNDYWxsID0gKG5hbWUsIC4uLmFyZ3MpID0+XG5cdFx0bXNbbmFtZV0oLi4uYXJncylcblxucEFkZChnbG9iYWwsICdfbXMnLCBtcylcblxuY29uc3QgaW5kZW50ID0gc3RyID0+IHN0ci5yZXBsYWNlKC9cXG4vZywgJ1xcblxcdCcpXG5cbmNvbnN0IG1zRGVmcyA9IHtcblx0Ly8gVE9ETzogdXNlICshIG1ldGhvZFxuXHRhZGQoYmFnLCB2YWx1ZSkge1xuXHRcdGJhZy5wdXNoKHZhbHVlKVxuXHR9LFxuXG5cdGFkZE1hbnkoYmFnLCB2YWx1ZXMpIHtcblx0XHRmb3IgKGxldCB2YWx1ZSBvZiB2YWx1ZXMpXG5cdFx0XHRtcy5hZGQoYmFnLCB2YWx1ZSlcblx0fSxcblxuXHRhc3NlcnQoZnVuLCAuLi5hcmdzKSB7XG5cdFx0aWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChmdW4sIG51bGwsIGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBzaG93QXJncyA9IGFyZ3MubWFwKF9tcy5yZXByKS5qb2luKCdcXG4nKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBhc3NlcnQhICR7X21zLnNob3coZnVuKX1cXG5cXHQke2luZGVudChzaG93QXJncyl9YClcblx0XHR9XG5cdH0sXG5cblx0YXNzZXJ0Tm90KGZ1biwgLi4uYXJncykge1xuXHRcdGlmIChGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHkuY2FsbChmdW4sIG51bGwsIGFyZ3MpKSB7XG5cdFx0XHRjb25zdCBzaG93QXJncyA9IGFyZ3MubWFwKF9tcy5yZXByKS5qb2luKCdcXG4nKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBmb3JiaWQhICR7X21zLnNob3coZnVuKX1cXG5cXHQke2luZGVudChzaG93QXJncyl9YClcblx0XHR9XG5cdH0sXG5cblx0bGF6eUdldE1vZHVsZShtb2R1bGUpIHtcblx0XHRpZiAobW9kdWxlID09PSB1bmRlZmluZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSB1bmRlZmluZWQuJylcblx0XHRyZXR1cm4gbW9kdWxlLl9nZXQgaW5zdGFuY2VvZiBtcy5MYXp5ID8gbW9kdWxlLl9nZXQgOiBtcy5sYXp5KCgpID0+IG1vZHVsZSlcblx0fSxcblxuXHRnZXRNb2R1bGUobW9kdWxlKSB7XG5cdFx0aWYgKG1vZHVsZSA9PT0gdW5kZWZpbmVkKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNb2R1bGUgdW5kZWZpbmVkLicpXG5cdFx0cmV0dXJuIG1vZHVsZS5fZ2V0IGluc3RhbmNlb2YgbXMuTGF6eSA/IG1vZHVsZS5fZ2V0LmdldCgpIDogbW9kdWxlXG5cdH0sXG5cblx0Z2V0RGVmYXVsdEV4cG9ydDogbW9kdWxlID0+IHtcblx0XHRpZiAobW9kdWxlID09PSB1bmRlZmluZWQpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ01vZHVsZSB1bmRlZmluZWQuJylcblx0XHRjb25zdCBtb2QgPSBtcy5nZXRNb2R1bGUobW9kdWxlKVxuXHRcdHJldHVybiBtb2QuZGVmYXVsdCA9PT0gdW5kZWZpbmVkID8gbW9kIDogbW9kLmRlZmF1bHRcblx0fSxcblxuXHRsYXp5UHJvcChsYXp5T2JqZWN0LCBrZXkpIHtcblx0XHRpZiAoIShsYXp5T2JqZWN0IGluc3RhbmNlb2YgbXMuTGF6eSkpXG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIGEgTGF6eSwgZ290OiAke2xhenlPYmplY3R9YClcblx0XHRyZXR1cm4gbXMubGF6eSgoKSA9PiBsYXp5T2JqZWN0LmdldCgpW2tleV0pXG5cdH0sXG5cblx0Z2V0KG9iamVjdCwga2V5KSB7XG5cdFx0Y29uc3QgXyA9IG9iamVjdFtrZXldXG5cdFx0aWYgKF8gPT09IHVuZGVmaW5lZClcblx0XHRcdHRocm93IG5ldyBFcnJvcihgTW9kdWxlICR7b2JqZWN0Lm5hbWV9IGRvZXMgbm90IGhhdmUgJHtrZXl9YClcblx0XHRyZXR1cm4gX1xuXHR9LFxuXG5cdGJvb2woYikge1xuXHRcdGlmICh0eXBlb2YgYiAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0XHRjb25zb2xlLmxvZyhiKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBFeHBlY3RlZCBCb29sZWFuLCBnb3QgJHtifWApXG5cdFx0fVxuXHRcdHJldHVybiBiXG5cdH0sXG5cblx0Ly8gVXNlZCBmb3Igc3BsYXQgY2FsbHMuXG5cdC8vIFRPRE86RVM2IFNob3VsZG4ndCBuZWVkLiBgZnVuKC4uLmFyZylgIHNob3VsZCB3b3JrIGZvciBhbnkgaXRlcmFibGUuXG5cdGFycihfKSB7XG5cdFx0aWYgKF8gaW5zdGFuY2VvZiBBcnJheSlcblx0XHRcdHJldHVybiBfXG5cdFx0Y29uc3Qgb3V0ID0gWyBdXG5cdFx0Zm9yIChsZXQgZW0gb2YgXylcblx0XHRcdG91dC5wdXNoKGVtKVxuXHRcdHJldHVybiBvdXRcblx0fSxcblxuXHRlcnJvcihlcnIpIHtcblx0XHRpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpXG5cdFx0XHRyZXR1cm4gZXJyXG5cdFx0ZWxzZSBpZiAodHlwZW9mIGVyciA9PT0gJ3N0cmluZycpXG5cdFx0XHRyZXR1cm4gbmV3IEVycm9yKGVycilcblx0XHRlbHNlIGlmIChlcnIgaW5zdGFuY2VvZiBfbXMuTGF6eSlcblx0XHRcdHJldHVybiBfbXMuZXJyb3IoZXJyLmdldCgpKVxuXHRcdGVsc2Vcblx0XHRcdHRocm93IG5ldyBFcnJvcignVGhyb3duIHZhbHVlIG11c3QgYmUgRXJyb3Igb3IgU3RyaW5nJylcblx0fSxcblxuXHRMYXp5OiBmdW5jdGlvbiBMYXp5KGdldCkge1xuXHRcdHRoaXMuZ2V0ID0gKCkgPT4ge1xuXHRcdFx0dGhpcy5nZXQgPSAoKSA9PiB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgTGF6eSB2YWx1ZSBkZXBlbmRzIG9uIGl0c2VsZi4gVGh1bms6ICR7Z2V0fWApXG5cdFx0XHR9XG5cdFx0XHRjb25zdCBfID0gZ2V0KClcblx0XHRcdHRoaXMuZ2V0ID0gKCkgPT4gX1xuXHRcdFx0cmV0dXJuIF9cblx0XHR9XG5cdH0sXG5cdGxhenk6IF8gPT4gbmV3IG1zLkxhenkoXyksXG5cdHVubGF6eTogXyA9PiBfIGluc3RhbmNlb2YgbXMuTGF6eSA/IF8uZ2V0KCkgOiBfLFxuXG5cdC8vIFVubGlrZSBPYmplY3QuYXNzaWduLCBkb2VzICpub3QqIGludm9rZSBnZXR0ZXJzLlxuXHRzZXQodmFsdWUsIHByb3BlcnRpZXNPYmplY3QsIG9wTmFtZSkge1xuXHRcdGZvciAoY29uc3Qga2V5IGluIHByb3BlcnRpZXNPYmplY3QpXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodmFsdWUsIGtleSxcblx0XHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm9wZXJ0aWVzT2JqZWN0LCBrZXkpKVxuXHRcdGlmICghKHZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24pKVxuXHRcdFx0aWYgKG9wTmFtZSAhPT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRtcy5zZXROYW1lKHZhbHVlLCBvcE5hbWUpXG5cdFx0cmV0dXJuIHZhbHVlXG5cdH0sXG5cdHNldE5hbWUodmFsdWUsIG5hbWUpIHtcblx0XHR2YWx1ZS5uYW1lID0gbmFtZVxuXHRcdHJldHVybiB2YWx1ZVxuXHR9LFxuXHRzZXRMYXp5KHZhbHVlLCBuYW1lLCBsYXp5KSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbHVlLCBuYW1lLCB7IGdldDogbGF6eS5nZXQsIGVudW1lcmFibGU6IHRydWUgfSlcblx0fSxcblxuXHRzeW1ib2wodmFsdWUpIHtcblx0XHRjb25zdCBzeW1ib2wgPSB2YWx1ZVsnaW1wbC1zeW1ib2wnXVxuXHRcdHJldHVybiBzeW1ib2wgPT09IHVuZGVmaW5lZCA/IHZhbHVlIDogc3ltYm9sXG5cdH0sXG5cblx0bmV3UHJvcGVydHkob2JqZWN0LCBuYW1lLCB2YWx1ZSkge1xuXHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBuYW1lKSlcblx0XHRcdHRocm93IG5ldyBFcnJvcihgUHJvcGVydHkgJHtuYW1lfSBhbHJlYWR5IGV4aXN0cy5gKVxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogdHJ1ZSxcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHR3cml0YWJsZTogZmFsc2UsXG5cdFx0XHR2YWx1ZVxuXHRcdH0pXG5cdH0sXG5cdG5ld011dGFibGVQcm9wZXJ0eShvYmplY3QsIG5hbWUsIHZhbHVlKSB7XG5cdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIG5hbWUpKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBQcm9wZXJ0eSAke25hbWV9IGFscmVhZHkgZXhpc3RzLmApXG5cdFx0b2JqZWN0W25hbWVdID0gdmFsdWVcblx0fVxufVxuZm9yIChjb25zdCBkZWYgaW4gbXNEZWZzKVxuXHRtc0RlZihkZWYsIG1zRGVmc1tkZWZdKVxuXG5jb25zdCBtc0RlZlRlbXAgPSAobmFtZSwgZnVuKSA9PlxuXHRtc1tuYW1lXSA9IGZ1blxuXG4vLyBPdmVycmlkZGVuIGJ5IHNob3cubXMuXG5tc0RlZlRlbXAoJ3Nob3cnLCBfID0+IHtcblx0aWYgKHR5cGVvZiBfICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgXyAhPT0gJ251bWJlcicpXG5cdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0YE9ubHkgdXNlIFN0cmluZ3Mgb3IgTnVtYmVycyBoZXJlIHVudGlsIHRoaXMgaXMgb3ZlcnJpZGRlbiBieSBzaG93Lm1zLiBHb3Q6XFxuJHtffWApXG5cdHJldHVybiBfLnRvU3RyaW5nKClcbn0pXG5cbi8vIHJlZ2lvbiBDb250YWluc1xuLy8gU29tZSBUeXBlcyB3YW50IHRvIGltcGxlbWVudCBjb250YWlucz8gYmVmb3JlIGl0IGlzIG9mZmljaWFsbHkgZGVmaW5lZC5cbmV4cG9ydCBjb25zdCBjb250YWluc0ltcGxTeW1ib2wgPSBTeW1ib2woJ2NvbnRhaW5zPycpXG5leHBvcnQgY29uc3QgaW1wbENvbnRhaW5zID0gKHR5cGUsIGltcGwpID0+XG5cdHBBZGQodHlwZS5wcm90b3R5cGUsIGNvbnRhaW5zSW1wbFN5bWJvbCwgaW1wbClcblxuLy8gT3ZlcndyaXR0ZW4gYnkgVHlwZS9pbmRleC5tcyB0byBhY3R1YWxseSBkbyB0eXBlIGNoZWNraW5nLlxubXNEZWZUZW1wKCdjaGVja0NvbnRhaW5zJywgKF90eXBlLCB2YWwpID0+IHZhbClcblxuLy8gU2luY2UgdGhlc2UgYXJlIHByaW1pdGl2ZXMsIHdlIGNhbid0IHVzZSBgaW5zdGFuY2VvZmAuXG5mb3IgKGNvbnN0IHR5cGUgb2YgWyBCb29sZWFuLCBTdHJpbmcsIFN5bWJvbCwgTnVtYmVyIF0pIHtcblx0Ly8gR2VuZXJhdGVkIGNvZGUgaXMgZmFzdGVyIHRoYW4gdXNpbmcgYSBjbG9zdXJlLlxuXHRjb25zdCBzcmMgPSAncmV0dXJuIHR5cGVvZiBfID09PSBcIicgKyB0eXBlLm5hbWUudG9Mb3dlckNhc2UoKSArICdcIidcblx0cEFkZCh0eXBlLCBjb250YWluc0ltcGxTeW1ib2wsIEZ1bmN0aW9uKCdfJywgc3JjKSlcbn1cblxuLy8gRnVuY3Rpb25zIGFyZSBPYmplY3RzLCBzbyB3ZSBkbyB0aGlzIG9uZSBkaWZmZXJlbnRseS5cbi8vIFRPRE86IFRoaXMgdHJlYXRzIE9iamVjdC5jcmVhdGUobnVsbCkgYXMgYW4gb2JqZWN0LiBEbyB3ZSB3YW50IHRoYXQ/XG5wQWRkKE9iamVjdCwgY29udGFpbnNJbXBsU3ltYm9sLCBmdW5jdGlvbihfKSB7XG5cdGlmIChfID09PSBudWxsKVxuXHRcdHJldHVybiBmYWxzZVxuXHRzd2l0Y2ggKHR5cGVvZiBfKSB7XG5cdFx0Y2FzZSAnZnVuY3Rpb24nOlxuXHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0fVxufSlcblxuaW1wbENvbnRhaW5zKEZ1bmN0aW9uLCBmdW5jdGlvbihfKSB7IHJldHVybiBfIGluc3RhbmNlb2YgdGhpcyB9KVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=