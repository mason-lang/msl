use
	.? -> get-or ?none ?some
	..arithmetic-methods -> + -
	.Array -> ->Array
	..assert -> ! !not
	.Bag -> all? count iterator from-stream
	..basic-methods -> =>
	..Bool -> and or
	..Comparable -> =? <=? >=?
	..control -> if
	..Fun
	..math.Num -> Nat
	..pred-types -> Any
	.Stream -> streaming
	..Try -> fails? oh-no!
	..types.Interface -> implementor!
	..types.Method

Seq = Interface
	doc. "TODO"

implementor! Seq Bag

region Search
	seq=?.
		doc. "
			Whether two Seqs share the same elements in the same order.
			The types of the Seqs does not matter.
			Equivalent to `=? (=> Array seq-0) (=> Array seq-1)`

		test. |
			s = streaming ~|
				<~ 1
			! seq=? s [ 1 ]
			!not seq=? s [ 2 ]
		|seq-0:Bag seq-1:Bag
			and (=? (count seq-0) (count seq-1)) ~(all? (zip seq-0 seq-1 =?))

	?first. Method
		doc. "TODO"
		test. |
			[ [ 0 ] ] -> ?some 0
			[ [] ] -> ?none
		default. |:Any _
			?nth _ 0

	?last. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:Any _
			?nth _ (- count_ 1)

	?nth. Method
		doc. |:Any _ n:Nat
			"`n`th element in iteration order. 0th is the first."
		test. |
			[ [ 0 1 ] 1 ] -> ?some 1
			[ [ 0 1 ] 2 ] -> ?none
		default. |_ n:Nat
			iter = iterator_
			i ::= 0
			\ TODO:ES6 for (let em of _)
			s = ?some
			`for (let em of iter) { if (i == n) return s(em); i++; }`
			?none

	\ TODO: sub
	nth. Method
		doc. "TODO"
		test. |
			! =? (nth [ 0 1 ] 1) 1
			! fails? |
				nth [ 0 1 ] 2
		default. |_ n:Nat
			get-or (?nth _ n) ~(oh-no! "Bag only has {count_} elements, so can't return element {n}")

region Update
	<pop. Method
		doc. "TODO"
		test. |
			[ [] ] -> []
			[ [ 0 ] ] -> []
			[ [ 0 1 ] ] -> [ 1 ]
		default. |:Bag _
			drop _ 1

	pop>. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:Bag _
			take _ (- count_ 1)

	?slice.
		doc. "TODO"
		test. |
			"TODO"
		|:?[Bag] _ start:Nat end:Nat
			if (and (>=? end start) ~(<=? end count_))
				slice _ start end

	slice. Method
		doc. "
			Bag containing the elements from index start (inclusive) to end (exclusive).
			Takes as much as possible.
			Result length should be - end start, unless `end` was past the end.

		test. |
			[ [ 0 1 2 3 ] 1 3 ] -> [ 1 2 ]

		default. |:Bag _ start:Nat end:Nat
			from-stream _ (slice (=> Stream _) start end)

	take. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:Bag _ count-to-take:Nat
			from-stream _ (take (=> Stream _) count-to-take)

	drop. Method
		doc. "TODO"
		test. |
			"TODO"
		default. |:Bag _ count-to-drop:Nat
			from-stream _ (drop (=> Stream _) count-to-drop)

region Combination
	\ TODO: Variadic
	\ TODO: Builder? (whose?)
	zip. |s0:Bag s1:Bag zipper:Fun[Any Any Any]
		streaming ~|
			iter0 = iterator s0
			iter1 = iterator s1
			loop!
				next0 = iter0.next ()
				next1 = iter1.next ()
				case!
					or next0.done next1.done
						end-loop!
					else
						<~ zipper next0.value next1.value

region TODO: put somewhere
	reverse. Method
		doc. "TODO"
		test. |
			[ [ 1 2 ] ] -> [ 2 1 ]
		default. |_
			arr = => Array _
			reverse-stream = streaming ~|
				i ::= count arr
				loop!
					case!
						=? i 0
							end-loop!
						else
							i := - i 1
							<~ arr[i]
			from-stream _ reverse-stream

	\ TODO: sort, sort-by
Seq