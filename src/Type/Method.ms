use
	..Bool implies
	..js any? defined? global js-sub
	..private.js-impl build-str
	..private.bootstrap Str Symbol Fun set! set-mutable!
	.Record-Type
use~
	..!
	..@.? un-?
	..methods contains?
	..Obj ?p
	..Try oh-no!
	.Impl-Type
	.Kind
debug use~
	..math.Num
	..methods =?
	..Try fails?

writable? = |obj property
	desc = global.Object.getOwnPropertyDescriptor obj property
	implies (any? desc) ~desc.writable

make-callable-method = |method
	src = build-str |add!
		add! "return function(a, b, c) \{"
		impl = case
			defined? method.default
				"(a == null) ? def : (a[\"{method.impl-symbol}\"] || def)"
			else
				"a[\"{method.impl-symbol}\"]"
		add! "var impl = {impl}"
		\ TODO: Debug mode only
		add! "
			if (impl === undefined)
				throw new Error(\"Method {method.displayName} not defined for \" + _ms.show(a, \{ repr: true }))
		case!
			defined? method.wrap
				add! "
					switch (arguments.length) \{
						case 1: return wrap(impl, a)
						case 2: return wrap(impl, a, b)
						case 3: return wrap(impl, a, b, c)
						default: throw new Error("Code not generated to accept " + arguments.length + " arguments.")
					}
			else
				\ TODO: Debug mode only
				add! "
					switch (arguments.length) \{
						case 1: return impl(a)
						case 2: return impl(a, b)
						case 3: return impl(a, b, c)
						default: throw new Error("Code not generated to accept " + arguments.length + " arguments.")
					}
		add! "}"

	f = Fun "def" "wrap" src
	f method.default method.wrap


Method = Record-Type
	doc. "
		TODO:REST
		The `doc` of the method should be its signature, followed by a string of the meaning.
		For example:
			sizeness.
				doc. |:Int _
					"How big it is."
				...
		The `wrap` property can replace the default calling mechanism.
		It will be given the implementation, then the method's arguments.
		You can use this to, for example, apply in/out conditions to every implementation.
			sizeness.
				wrap. |impl x
					out
						! >=? res 0
					impl x

	test. |
		thunk = |x |
			x
		m = Method
			default. thunk "default"
		impl! m Str (thunk "Str")
		impl! m Num Num (thunk "Num Num")
		impl! m Num Str (thunk "Num Str")
		! =? (m ()) "default"
		! =? (m "a") "Str"
		! =? (m 1 1) "Num Num"
		! =? (m 1 "a") "Num Str"
		debug ! fails? |
			m 1 m

		! =? "wrap-call-arg"
			wrap-method = Method
				default. |_
					"call-{_}"
				wrap. |impl arg
					"wrap-{impl arg}"
			wrap-method "arg"

	members.
		displayName. Str \ Required!
		impl-symbol. Str
	optional-members.
		default. Fun
		wrap. Fun
	extensible.
	defaults.
		impl-symbol. |_
			"impl-{_.displayName}"
	make-callable. make-callable-method

impl!.
	doc. "TODO"
	|a b c d
		case!
			defined? d
				impl-double! a b c d
			else
				impl-single! a b c

impl-single! = |method:Method implementor:Impl-Type implementation:Fun
	impl-unchecked! method implementor implementation

impl-double! = |method:Method implementor-0:Impl-Type implementor-1:Impl-Type implementation:Fun
	dispatcher = case
		writable? implementor-0.prototype method.impl-symbol
			m = method
			dd = Double-Dispatcher
				displayName. "<double dispatcher>" \ TODO: "<Double dispatcher for {m.displayName}>"
				method. m
				first-type. implementor-0
				impl-symbol. Symbol "<double dispatcher>" \"{m} for {implementor-0.displayName}"
			impl-unchecked! method implementor-0 dd
			dd
		else
			case js-sub implementor-0.prototype method.impl-symbol
				:Double-Dispatcher
					_
				else
					oh-no! "
						Can't define double dispatch of {method} for {implementor-0}.
						A single-dispatch implementation already exists: {_}.

	impl-unchecked! dispatcher implementor-1 implementation

\ TODO: This will add to the prototype of a Kind inheriting from another Kind.
\ We only want to write to one Kind's prototype.
\ "method" can be a method or a double dispatcher
impl-unchecked!. |method implementor implementation
	in
		case!
			writable? implementor.prototype method.impl-symbol
				()
			else
				oh-no! "Can not redefine method {method} for {implementor}."

	set! implementor.prototype method.impl-symbol implementation
	case! implementor
		:Kind
			_.implementors.forEach |sub
				propagate-method-down! sub method.impl-symbol implementation
		else
			()

\ TODO: Not public
propagate-method-down!. |implementor method-symbol implementation \ TODO: :Impl-Type :Symbol :Fun
	case! implementor
		writable? _.prototype method-symbol
			case!
				:Kind
					_.implementors.forEach |sub-implementor
						propagate-method-down! sub-implementor method-symbol implementation
				else
					\ TODO: What to do in case of multiple inheritance collision?
					\ Since this is inherited, it is mutable and can be overridden.
					set-mutable! _.prototype method-symbol implementation
		else
			()

Double-Dispatcher = Record-Type
	members.
		displayName. Str
		method. Method
		first-type. \ TODO: Impl-Type
		impl-symbol. Symbol
	make-callable. |_
		|...args
			target-2 = js-sub args 1
			case!
				defined? target-2
					()
				else
					oh-no! ~"Can't double-dispatch {_.method} for undefined."

			impl = js-sub target-2 _.impl-symbol
			case!
				defined? impl
					! contains? Fun impl
				else
					oh-no! ~"Can't double-dispatch {_.method} for {_.first-type} on {target-2}"
			Fun.prototype.apply.call impl () args

\impl?.
\	doc. "TODO"
\	|method:Method type:Impl-Type
\		has-property-or-in-prototype? type.prototype method.impl-symbol

\ TODO: This is really ?direct-impl-for.
?impl-for.
	doc. "TODO"
	test. |
		"TODO"
	|method:Method type:Impl-Type
		?p type.prototype method.impl-symbol

impl-for.
	doc. "TODO"
	test. |
		"TODO"
	|method:Method type:Impl-Type
		un-? (?impl-for method type)

Method