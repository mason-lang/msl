import
	..tests

make-word-from-blocks. |:? word:String blocks:@ todo  ?[Seq[String]], @[String]
	| http://rosettacode.org/wiki/ABC_Problem
	rec = |chars-left blocks-left
		case chars-left
			empty?_
				? []
			else
				rest-word = @tail_
				this-char-blocks = @keep blocks-left |_
					chars-left[0]:_
				todo SYNTAX @for~
				?first (@flat-map~ this-char-blocks |_
					todo -, not --
					@map~ (rec rest-word (-- blocks-left [_])) |ans
						++ [_] ans
	todo @for
	rec word.toUpperCase() (@map blocks |_
		_.toUpperCase()

tests "demo"
	make-word-from-blocks -> !|
		pass
		todo Make it performant
		todo test. |
		todo	|| Backtracking is necessary - can't use the first block first!
		todo	["AB" ["AB" "AC"]] -> ? ["AC" "AB"]

		todo	sample-blocks =
		todo		. "BO"
		todo		. "XK"
		todo		. "DQ"
		todo		. "CP"
		todo		. "NA"
		todo		. "GT"
		todo		. "RE"
		todo		. "TG"
		todo		. "QD"
		todo		. "FS"
		todo		. "JW"
		todo		. "HU"
		todo		. "VI"
		todo		. "AN"
		todo		. "OB"
		todo		. "ER"
		todo		. "FS"
		todo		. "LY"
		todo		. "PC"
		todo		. "ZM"

		todo	sample-answers =
		todo		"a" -> ? ["NA"]
		todo		"bark" -> ? ["BO" "NA" "RE" "XK"]
		todo		"book" -> empty ?
		todo		"treat" -> ? ["GT" "RE" "ER" "NA" "TG"]
		todo		"common" -> empty ?
		todo		"squad" -> ? ["FS" "DQ" "HU" "NA" "QD"]
		todo		"confuse" -> ? ["CP" "BO" "NA" "FS" "HU" "FS" "RE"]

		todo	for! sample-answers
		todo		todo SYNTAX Array destructure
		todo		! =? _[1] (make-word-from-blocks _[0] sample-blocks)
