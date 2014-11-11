
use
	.Interface -> unchecked-implementor!
	.Method
	..private.bootstrap -> set! Fun Object
	.Record-Type

\ TODO
\prototype. Method
\	doc. "TODO"

Impl-Type = Interface
	doc. "TODO"
	methods. `[]`
	\	. prototype

\ Needed since would normally done by default for `prototype`
unchecked-implementor! Record-Type Impl-Type
unchecked-implementor! Interface Impl-Type
unchecked-implementor! Fun Impl-Type

\region Implement prototype
\	\ Can't use impl! to implement prototype because impl! requires prototype
\	sym-i-t-prototype = prototype.impl-symbol
\	get-proto = |_
\		_.prototype
\	set! Record-Type.prototype sym-i-t-prototype get-proto
\	set! Interface.prototype sym-i-t-prototype get-proto
\	set! Fun.prototype sym-i-t-prototype get-proto

Impl-Type