use
	..bags.? -> Opt->?
	..Error -> oh-no!
	..js -> global
	.Map -> ?get has-key? keys
	.Map! -> clear! delete! set!
	..types.Interface -> implementor!
	..types.Method -> impl!

Weak-Identity-Map! =
	doc. "TODO"
	global.WeakMap

impl! ?get Weak-Identity-Map! |_ key
	Opt->? (_.get key)
impl! has-key? Weak-Identity-Map! |_ key
	_.has key
impl! keys Weak-Identity-Map! |
	oh-no! "Can't get keys of Weak-Identity-Map because the garbage collector can freely change this."
impl! clear! Weak-Identity-Map! |_
	_.clear ()
impl! delete! Weak-Identity-Map! |_ key
	_.delete key
impl! set! Weak-Identity-Map! |_ key val
	_.set key val

implementor! Weak-Identity-Map! Map!

Weak-Identity-Map!