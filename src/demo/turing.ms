use
	..@ -> count
	..@.Array
	..@.Deque!
	..@.Seq
	..@.Seq! -> <+! +>! set-nth!
	..Bool -> false
	..Comparable -> =?
	..control -> end-loop if! loop
	..methods -> => + - empty?
	..Object -> get-property
	..pred-types -> Any

region Rule results
	R. |written new-state
		write. written
		go-right.
		state. new-state
	L. |written new-state
		write. written
		go-right. false
		state. new-state
	fin.
		doc. "Stops the machine."

run-turing.
	doc. "
		http://rosettacode.org/wiki/Universal_Turing_machine
	test. |
		incrementer =
			init-state. "a"
			blank. 0
			rules.
				a.
					1 -> R 1 "a"
					0 -> fin
		[ incrementer [ 1 1 1 ] ] -> [ 1 1 1 0 ]

		busy-beaver =
			init-state. "a"
			blank. 0
			rules.
				a.
					0 -> R 1 "b"
					1 -> L 1 "c"
				b.
					0 -> L 1 "a"
					1 -> R 1 "b"
				c.
					0 -> L 1 "b"
					1 -> fin
		[ busy-beaver [ ] ] -> [ 1 1 1 1 1 1 ]

		sorting-test =
			init-state. "a"
			blank. 0
			rules.
				a.
					0 -> L 0 "e"
					1 -> R 1 "a"
					2 -> R 3 "b"
				b.
					0 -> L 0 "c"
					1 -> R 1 "b"
					2 -> R 2 "b"
				c.
					1 -> L 2 "d"
					2 -> L 2 "c"
					3 -> L 2 "e"
				d.
					1 -> L 1 "d"
					2 -> L 2 "d"
					3 -> R 1 "a"
				e.
					0 -> fin
					1 -> L 1 "e"
		[ sorting-test [ 2 2 2 1 2 2 1 2 1 2 1 2 1 2 ] ] -> [ 0 1 1 1 1 1 2 2 2 2 2 2 2 2 2 0 ]

	|:Seq spec init-tape:Seq
		rules:Object blank:Any init-state:Any = spec
		tape = => Deque! case
			empty? init-tape
				[ blank ]
			else
				init-tape
		\ TODO:SYNTAX [ idx. 0, state. spec.init-state ]
		start =
			idx. 0
			state. init-state
		loop start
			|prev
				pi = prev.idx
				symbol = tape[pi]
				case (get-property rules prev.state)[symbol]
					=? fin _
						end-loop ()
					else
						write go-right = _
						set-nth! tape pi write
						state. _.state
						idx. case
							go-right
								if! (=? pi (- (count tape) 1)) |
									+>! tape [ blank ]
								+ pi 1
							=? pi 0
								<+! tape [ blank ]
								0
							else
								- pi 1
		=> Array tape