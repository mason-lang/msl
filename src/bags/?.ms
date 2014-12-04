use
	..assert -> ! !not
	..basic-methods -> sub
	.Bag -> all? empty? iterator map
	.Bag-Type -> empty
	..Bool -> and
	..Fun -> thunk
	..js -> identical?
	..math.Num
	..pred-types -> Any
	.Seq
	..Symbol
	..Try -> fails? oh-no!
	..types.Interface -> implementor!
	..types.Method -> impl!
	..types.Record-Type
	..types.Type -> subsumes?
	..types.util -> self-type

? = Record-Type
	doc. "
		A Seq with 0 or 1 elements.
		Either `?none` or `?some`.
		Its content can never be null.

	members.
		val.

?some.
	doc. "`?` with the given element."
	|some-of:Any
		?
			val. some-of

?none.
	doc. "? with no element."
	?
		val. `undefined`

implementor! ? Seq

\ Can't use implementor! map because ? is required to create maps
impl! empty? ? |_
	identical? _ ?none

impl! iterator ? ~|case!
	\ TODO: Use unless~ instead of case!
	empty?_
		()
	else
		<~ _.val

Opt->?.
	doc. "?some unless the value is null/undefined."
	test. |
		[ 0 ]  -> ?some 0
		[ () ] -> ?none
	|case
		:Any
			?some_
		else
			?none

?->Opt.
	doc. "?none becomes undefined, ?some x becomes x."
	test. |
		[ (?some 0) ] -> 0
		!not subsumes? Any (?->Opt ?none)
	|_:?
		_.val

impl! map ? |_ f:Fun
	case
		empty?_
			_
		else
			?some (f _.val)

\ TODO: Just use first?
un-?.
	doc. "Tries to extract the value out of a `?`. Throws an error if it is empty."
	test. |
		[ (?some 1) ] -> 1
		! fails? |
			un-? ?none
	|_:?
		case
			empty?_
				oh-no! "Tried to force `?none`."
			else
				_.val

get-or.
	doc. "If ?some, gets the value. Else defaults to `or`."
	test. |
		"TODO"
	|:Any _:? ~or:Any
		case
			empty?_
				or
			else
				_.val

region sub
	impl! sub (self-type ?)
		doc. "`?[A]` matches a `?` containing an `A`, or ?none."
		test. |
			! subsumes? ?[Num] (?some 0)
			! subsumes? ?[Num] ?none
			!not subsumes? ?[Num] (?some "0")
		|ignore Em-Type:Type
			ignore \ TODO:Ignored vars
			?-Sub
				Element-Type. Em-Type

	?-Sub = Record-Type
		doc. "Used by ?[A]"
		members.
			Element-Type. Type

	implementor! ?-Sub Type
	impl! subsumes? ?-Sub |?-sub subsumed
		and (subsumes? ? subsumed) ~(all? subsumed subsumes?[?-sub.Element-Type])

implementor! (self-type ?) Bag-Type
impl! empty (self-type ?) (thunk ?none)

?