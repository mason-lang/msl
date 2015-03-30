# TODO: TEST

use
	...compare =?
	...hash-code
	...js defined?
	...methods freeze
	...Obj
	...Obj! p!
	...Type.Kind kind! self-kind!
	...Type.Method impl! self-impl!
	...Type.Obj-Type
	...@ flat-map map'
	..@! empty!
	..@-Type empty
	..Stream
	..? _ Opt->?
	..Map ?get keys values
	.Id-Map!
	.Map! _ assoc! un-assoc!
	.Map-Type
use~
	...Generator! if~
use-debug
	...!
	..Seq seq=?

Hash-Map! = Obj-Type
	doc. "Default Map! type. Depends on efficient `hash-code` of its keys."
	test. |
		_ =
			1 -> 2
			3 -> 4
		! =? _[1] 2
		! =? _[3] 4
		! seq=? keys_ [ 1 3 ]
		! =? (?get _ 8) (empty ?)

	props.
		hash->bucket. Id-Map!

kind! Hash-Map! Map!

self-kind! Hash-Map! Map-Type
self-impl! empty Hash-Map! |
	Hash-Map!
		hash->bucket. empty Id-Map!

opt-bucket = |_ key
	_.hash->bucket.get (hash-code key

opt-bucket-entry = |opt-bucket key
	case opt-bucket
		defined?_
			case
				=? _.key key
					_
				else
					opt-bucket-entry _.next! key
		else
			undefined

impl! ?get Hash-Map! |:? _ key
	bucket = opt-bucket _ key
	entry = opt-bucket-entry bucket key
	map' (Opt->? entry) |be
		be.val!

impl! keys Hash-Map! |_
	buckets = values _.hash->bucket
	bucket-keys~ = |_
		if~ defined?_ ~|
			<~ _.key
			<~~ bucket-keys~ _.next!
	flat-map buckets |_
		Stream |
			bucket-keys~_

# TODO: impl! values, similarly

impl! assoc! Hash-Map! |hm key val
	bucket = opt-bucket hm key
	case! opt-bucket-entry bucket key
		defined?_
			p! _ "val!" val
		else
			# Add it at the front.
			k = key # TODO:SYNTAX
			hm.hash->bucket.set (hash-code key)
				key. k # TODO:SYNTAX
				val!. val
				next!. bucket

impl! un-assoc! Hash-Map! |hm key
	bucket = opt-bucket hm key
	case bucket
		defined?_
			case
				=? _.key key
					case! bucket.next!
						defined?_
							assoc! hm.hash->bucket key _
						else
							un-assoc! hm.hash->bucket (hash-code key
					? _.val!
				else
					delete-from-next-bucket! = |prev-bucket
						next = prev-bucket.next!
						case next
							defined?_
								case
									=? next.key key
										p! prev-bucket "next!" next.next!
										? next.val!
									else
										delete-from-next-bucket! next
							else
								empty ?

					delete-from-next-bucket! bucket
		else
			empty ?

impl! freeze Hash-Map! |_
	freeze _.hash->bucket
	Obj.freeze _

impl! empty! Hash-Map! |_
	empty! _.hash->bucket

Hash-Map!