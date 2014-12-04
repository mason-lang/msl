use
	..arithmetic-methods -> +
	..assert -> !
	..bags.? ->  get-or
	..bags.Array
	..bags.Bag -> each! empty? map
	..basic-methods -> freeze sub
	..Bool -> not
	..Comparable -> =?
	..Fun -> identity
	.Hash-Map
	.Map! -> set!
	..pred-types -> Any
	..Try -> oh-no!
	..types.Interface
	..types.Method -> impl!
	..types.util -> self-type

?get. Method
	doc. |:? _ key:Any
		"?some of the value corresponding to `key`, or ?none if not `has-key? _ key`."

has-key?. Method
	doc. |:Bool _ key:Any
		"Whether the key is in the Map."
	default. |_ key:Any
		not (empty? (?get _ key))

keys. Method
	doc. |:Bag _
		"Every key that the Map `has-key?`."

values. Method
	doc. |:Bag _
		"Every value in the Map."
	default. |_
		map keys_ |key
			_[key]

keys-values. Method
	\ TODO: Dict types
	doc. |:Bag[Any]
		"Every \{ key, val }."
	default. |_
		map keys_ |k
			key. k
			val. _[k]

Map = Interface
	doc. "Mapping from keys to values."
	methods.
		. sub
		. ?get
		. has-key?
		. keys
		. keys-values

make-map.
	doc. "TODO"
	test. |
		map = make-map [ 1 2 ] |x
			+ x 1
		! =? map[1] 2
		! =? map[2] 3
	|keys:Bag mapper:Fun
		map = Hash-Map.new-empty ()
		each! keys |key
			set! map key (mapper key)
		freeze map

impl! sub Map |map key:Any
	get-or (?get map key) ~(oh-no! "{map} does not contain {key}.")

\ TODO: impl! sub Map-Type identity
impl! sub (self-type Map) identity

Map