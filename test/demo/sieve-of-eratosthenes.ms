import
	msl.@.Map.multi-map add-to-@!
	msl.math.Number square
	..tests

primes.
	| http://stackoverflow.com/questions/13463417/the-genuine-sieve-of-eratosthenes-in-python-why-is-heapq-slower-than-dict
	| Infinite Seq of Numbers > 2, each divisible only by itself and one.
	new Stream ~!|
		<~ 2
		<~ 3
		|| Maps a composite number to its prime factors.
		prime-factors = => Id-Map
			9 -> [3]
		for! candidate of new Range 5 Number.POSITIVE_INFINITY 2
			|| del is to save memory - we won't need to look up this value any more.
			case! del prime-factors[candidate]
				:?some factors
					for! factors
						key = + candidate (* 2 _)
						todo  Function to add single element
						add-to-@! prime-factors key [_]
				else
					<~ candidate
					prime-factors[(square candidate)] = [candidate]

tests "demo"
	primes -> !|
		is-prime? = |_
			not any? (new Range 2 _) divisible?[_]
		for! @take primes 20
			assert! is-prime? _