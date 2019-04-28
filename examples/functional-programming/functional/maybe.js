'use strict';

var Maybe = function Maybe (x)
{
	this.__value = x;
};

Maybe.of = function of (x)
{
	return new Maybe(x);
};

Maybe.prototype.isNothing = function isNothing ()
{
	return (this.__value === null || this.__value === undefined);
};

Maybe.prototype.map = function map (f)
{
	return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
};


// Example usage

Maybe.of('Malkovich Malkovich').map(match(/a/ig));
//=> Maybe(['a', 'a'])

Maybe.of(null).map(match(/a/ig));
//=> Maybe(null)

Maybe.of({
	name: 'Boris',
}).map(_.prop('age')).map(add(10));
//=> Maybe(null)

Maybe.of({
	name: 'Dinah',
	age: 14,
}).map(_.prop('age')).map(add(10));
//=> Maybe(24)

// Real world examples

//  safeHead :: [a] -> Maybe(a)
var safeHead = function(xs) {
	return Maybe.of(xs[0]);
};

var streetName = compose(map(_.prop('street')), safeHead, _.prop('addresses'));

streetName({
	addresses: [],
});
// Maybe(null)

streetName({
	addresses: [{
		street: 'Shady Ln.',
		number: 4201,
	}],
});
// Maybe("Shady Ln.")


