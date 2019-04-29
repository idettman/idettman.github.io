'use strict';

/**
 * These collection methods make transforming data a breeze and with near universal support,
 * we can pair them with arrow functions to help us write terse alternatives to the implementations offered by Lodash
 */
[1, 2, 3].map(n => n * 3);
[1, 2, 3].reduce((total, n) => total + n);
[1, 2, 3].filter(n => n <= 2);

// Destructuring syntax allows us to get the head and tail of a list without utility functions
const [head, ...tail] = [1, 2, 3];

// It’s also possible to get the initial elements and the last element in a similar way
const [last, ...initial] = [1, 2, 3].reverse();

/**
 * If you find it annoying that reverse mutates the data structure,
 * then you can use the spread operator to clone the array before calling reverse.
 */
const xs = [1, 2, 3];
const [last, ...initial] = [...xs].reverse();

/**
 * The rest and spread functions allow us to define and invoke functions that accept a variable number of arguments.
 * ES6 introduced dedicated syntaxes for both of these operations.
 */
const say = (what, ...names) => {
		const [last, ...initial] = names.reverse();
		const finalSeparator = (names.length > 1 ? ', &' : '');
		return `${what} ${initial.join(', ')} ${finalSeparator} ${last}`;
	};

say('hello', 'fred', 'barney', 'pebbles');
// "hello fred, barney, & pebbles"

/**
 * Curry
 Without a higher level language such as TypeScript or Flow,
 we can’t give our functions type signatures which makes currying quite difficult.
 When we receive curried functions it’s hard to know how many arguments have already been supplied and which we will need to provide next.
 With arrow functions we can define curried functions explicitly, making them easier to understand for other programmers
 */
const add = a => b => a + b;
const add2 = add(2);
add2(1);
// 3

// These explicitly curried arrow functions are particularly important for debugging
// becomes

const es6Add = a => b => a + b;
const add3 = es6Add(3);
console.log(add3.length);
// 1
console.log(add3);
// function b => a + b

/**
 * If we’re using a functional library like lodash/fp or ramda then we can also use arrows to remove the need for the auto-curry style.
 */
const people = new Array(10);
people.map(person => person.name);

/**
 * Partial
 * Like with currying, we can use arrow functions to make partial application easy and explicit.
 */
const sayHelloTo = name => greet('hello', name);
sayHelloTo('fred');
// "hello fred"

// It’s also possible to use rest parameters with the spread operator to partially apply variadic functions.
const sayHelloTo = (name, ...args) => greet('hello', name, ...args);
sayHelloTo('fred', 1, 2, 3);
// "hello fred"

/**
 * Pick
 The pick utility allows us to select the properties we want from a target object.
 We can achieve the same results using destructuring and shorthand object literals.
 */
const { a, c } = { a: 1, b: 2, c: 3 };

return { a, c };

/**
 * Chaining & Flow
 Lodash provides some functions for helping us write chained statements.
 In many cases the built-in collection methods return an array instance that can be directly chained,
 but in some cases where the method mutates the collection, this isn’t possible.

 However, we can define the same transformations as an array of arrow functions.
 */
const pipeline = [
	array => { array.pop(); return array; },
	array => array.reverse()
];

pipeline.reduce((xs, f) => f(xs), [1, 2, 3]);

/**
 * This way, we don’t even have to think about the difference between tap and thru.
 * Wrapping this reduction in a utility function makes a great general purpose tool.
 */
const pipe = functions => data => {
	return functions.reduce(
		(value, func) => func(value), data
	);
};

const pipeline = pipe([
	x => x * 2,
	x => x / 3,
	x => x > 5,
	b => !b
]);

pipeline(5);
// true
pipeline(20);
// false
