"use strict";

QUnit.test( "core: API methods", function test(assert){
	assert.expect( 50 );

	assert.ok( _isFunction( FPO.identity ), "identity()" );
	assert.ok( _isFunction( FPO.constant ), "constant()" );
	assert.ok( _isFunction( FPO.pick ), "pick()" );
	assert.ok( _isFunction( FPO.pickAll ), "pickAll()" );
	assert.ok( _isFunction( FPO.nAry ), "nAry()" );
	assert.ok( _isFunction( FPO.unary ), "unary()" );
	assert.ok( _isFunction( FPO.binary ), "binary()" );
	assert.ok( _isFunction( FPO.curry ), "curry()" );
	assert.ok( _isFunction( FPO.curryMultiple ), "curryMultiple()" );
	assert.ok( _isFunction( FPO.uncurry ), "uncurry()" );
	assert.ok( _isFunction( FPO.partial ), "partial()" );
	assert.ok( _isFunction( FPO.complement ), "complement()" );
	assert.ok( _isFunction( FPO.apply ), "apply()" );
	assert.ok( _isFunction( FPO.unapply ), "unapply()" );
	assert.ok( _isFunction( FPO.compose ), "compose()" );
	assert.ok( _isFunction( FPO.pipe ), "pipe()" );
	assert.ok( _isFunction( FPO.prop ), "prop()" );
	assert.ok( _isFunction( FPO.setProp ), "setProp()" );
	assert.ok( _isFunction( FPO.reassoc ), "reassoc()" );
	assert.ok( _isFunction( FPO.filterIn ), "filterIn()" );
	assert.ok( _isFunction( FPO.filterInObj ), "filterInObj()" );
	assert.ok( _isFunction( FPO.filterOut ), "filterOut()" );
	assert.ok( _isFunction( FPO.filterOutObj ), "filterOutObj()" );
	assert.ok( _isFunction( FPO.map ), "map()" );
	assert.ok( _isFunction( FPO.mapObj ), "mapObj()" );
	assert.ok( _isFunction( FPO.flatMap ), "flatMap()" );
	assert.ok( _isFunction( FPO.flatMapObj ), "flatMapObj()" );
	assert.ok( _isFunction( FPO.ap ), "ap()" );
	assert.ok( _isFunction( FPO.reduce ), "reduce()" );
	assert.ok( _isFunction( FPO.reduceObj ), "reduceObj()" );
	assert.ok( _isFunction( FPO.reduceRight ), "reduceRight()" );
	assert.ok( _isFunction( FPO.flatten ), "flatten()" );
	assert.ok( _isFunction( FPO.zip ), "zip()" );
	assert.ok( _isFunction( FPO.trampoline ), "trampoline()" );
	assert.ok( _isObject( FPO.transducers ), "transducers" );
	assert.ok( _isFunction( FPO.transducers.transduce ), "transducers.transduce()" );
	assert.ok( _isFunction( FPO.transducers.into ), "transducers.into()" );
	assert.ok( _isFunction( FPO.transducers.map ), "transducers.map()" );
	assert.ok( _isFunction( FPO.transducers.filter ), "transducers.filter()" );
	assert.ok( _isFunction( FPO.transducers.string ), "transducers.string()" );
	assert.ok( _isFunction( FPO.transducers.array ), "transducers.array()" );
	assert.ok( _isFunction( FPO.transducers.number ), "transducers.number()" );
	assert.ok( _isFunction( FPO.transducers.booleanAnd ), "transducers.booleanAnd()" );
	assert.ok( _isFunction( FPO.transducers.booleanOr ), "transducers.booleanOr()" );
	assert.ok( _isFunction( FPO.transducers.default ), "transducers.default()" );
	assert.ok( _isFunction( FPO.head ), "head()" );
	assert.ok( _isFunction( FPO.tail ), "tail()" );
	assert.ok( _isFunction( FPO.take ), "take()" );
	assert.ok( _isFunction( FPO.memoize ), "memoize()" );
	assert.ok( _isFunction( FPO.remap ), "remap()" );
} );

QUnit.test( "std: API methods", function test(assert){
	assert.expect( 53 );

	assert.ok( _isFunction( FPO.std.identity ), "identity()" );
	assert.ok( _isFunction( FPO.std.constant ), "constant()" );
	assert.ok( _isFunction( FPO.std.pick ), "pick()" );
	assert.ok( _isFunction( FPO.std.pickAll ), "pickAll()" );
	assert.ok( _isFunction( FPO.std.nAry ), "nAry()" );
	assert.ok( _isFunction( FPO.std.unary ), "unary()" );
	assert.ok( _isFunction( FPO.std.binary ), "binary()" );
	assert.ok( _isFunction( FPO.std.curry ), "curry()" );
	assert.ok( _isFunction( FPO.std.curryMultiple ), "curryMultiple()" );
	assert.ok( _isFunction( FPO.std.uncurry ), "uncurry()" );
	assert.ok( _isFunction( FPO.std.partial ), "partial()" );
	assert.ok( _isFunction( FPO.std.partialRight ), "partialRight()" );
	assert.ok( _isFunction( FPO.std.complement ), "complement()" );
	assert.ok( _isFunction( FPO.std.apply ), "apply()" );
	assert.ok( _isFunction( FPO.std.unapply ), "unapply()" );
	assert.ok( _isFunction( FPO.std.compose ), "compose()" );
	assert.ok( _isFunction( FPO.std.pipe ), "pipe()" );
	assert.ok( _isFunction( FPO.std.prop ), "prop()" );
	assert.ok( _isFunction( FPO.std.setProp ), "setProp()" );
	assert.ok( _isFunction( FPO.std.reassoc ), "reassoc()" );
	assert.ok( _isFunction( FPO.std.filterIn ), "filterIn()" );
	assert.ok( _isFunction( FPO.std.filterInObj ), "filterInObj()" );
	assert.ok( _isFunction( FPO.std.filterOut ), "filterOut()" );
	assert.ok( _isFunction( FPO.std.filterOutObj ), "filterOutObj()" );
	assert.ok( _isFunction( FPO.std.map ), "map()" );
	assert.ok( _isFunction( FPO.std.mapObj ), "mapObj()" );
	assert.ok( _isFunction( FPO.std.flatMap ), "flatMap()" );
	assert.ok( _isFunction( FPO.std.flatMapObj ), "flatMapObj()" );
	assert.ok( _isFunction( FPO.std.ap ), "ap()" );
	assert.ok( _isFunction( FPO.std.reduce ), "reduce()" );
	assert.ok( _isFunction( FPO.std.reduceObj ), "reduceObj()" );
	assert.ok( _isFunction( FPO.std.reduceRight ), "reduceRight()" );
	assert.ok( _isFunction( FPO.std.flatten ), "flatten()" );
	assert.ok( _isFunction( FPO.std.zip ), "zip()" );
	assert.ok( _isFunction( FPO.std.trampoline ), "trampoline()" );
	assert.ok( _isObject( FPO.std.transducers ), "transducers" );
	assert.ok( _isFunction( FPO.std.transducers.transduce ), "transducers.transduce()" );
	assert.ok( _isFunction( FPO.std.transducers.into ), "transducers.into()" );
	assert.ok( _isFunction( FPO.std.transducers.map ), "transducers.map()" );
	assert.ok( _isFunction( FPO.std.transducers.filter ), "transducers.filter()" );
	assert.ok( _isFunction( FPO.std.transducers.string ), "transducers.string()" );
	assert.ok( _isFunction( FPO.std.transducers.array ), "transducers.array()" );
	assert.ok( _isFunction( FPO.std.transducers.number ), "transducers.number()" );
	assert.ok( _isFunction( FPO.std.transducers.booleanAnd ), "transducers.booleanAnd()" );
	assert.ok( _isFunction( FPO.std.transducers.booleanOr ), "transducers.booleanOr()" );
	assert.ok( _isFunction( FPO.std.transducers.default ), "transducers.default()" );
	assert.ok( _isFunction( FPO.std.flip ), "flip()" );
	assert.ok( _isFunction( FPO.std.reverseArgs ), "reverseArgs()" );
	assert.ok( _isFunction( FPO.std.head ), "head()" );
	assert.ok( _isFunction( FPO.std.tail ), "tail()" );
	assert.ok( _isFunction( FPO.std.take ), "take()" );
	assert.ok( _isFunction( FPO.std.memoize ), "memoize()" );
	assert.ok( _isFunction( FPO.std.remap ), "remap()" );
} );

QUnit.test( "API method aliases", function test(assert){
	assert.expect( 39 );

	assert.strictEqual( FPO.always, FPO.constant, "always -> constant" );
	assert.strictEqual( FPO.std.always, FPO.std.constant, "std: always -> constant" );
	assert.strictEqual( FPO.partialRight, FPO.partial, "partialRight -> partial" );
	assert.strictEqual( FPO.flowRight, FPO.compose, "flowRight -> compose" );
	assert.strictEqual( FPO.std.flowRight, FPO.std.compose, "std: flowRight -> compose" );
	assert.strictEqual( FPO.flow, FPO.pipe, "flow -> pipe" );
	assert.strictEqual( FPO.std.flow, FPO.std.pipe, "std: flow -> pipe" );
	assert.strictEqual( FPO.sequence, FPO.pipe, "sequence -> pipe" );
	assert.strictEqual( FPO.std.sequence, FPO.std.pipe, "std: sequence -> pipe" );
	assert.strictEqual( FPO.spread, FPO.apply, "spread -> apply" );
	assert.strictEqual( FPO.std.spread, FPO.std.apply, "std: spread -> apply" );
	assert.strictEqual( FPO.gather, FPO.unapply, "gather -> unapply" );
	assert.strictEqual( FPO.std.gather, FPO.std.unapply, "std: gather -> unapply" );
	assert.strictEqual( FPO.assoc, FPO.setProp, "assoc -> setProp" );
	assert.strictEqual( FPO.std.assoc, FPO.std.setProp, "std: assoc -> setProp" );
	assert.strictEqual( FPO.filter, FPO.filterIn, "filter -> filterIn" );
	assert.strictEqual( FPO.std.filter, FPO.std.filterIn, "std: filter -> filterIn" );
	assert.strictEqual( FPO.keep, FPO.filterIn, "keep -> filterIn" );
	assert.strictEqual( FPO.std.keep, FPO.std.filterIn, "std: keep -> filterIn" );
	assert.strictEqual( FPO.keepObj, FPO.filterInObj, "keepObj -> filterInObj" );
	assert.strictEqual( FPO.std.keepObj, FPO.std.filterInObj, "std: keepObj -> filterInObj" );
	assert.strictEqual( FPO.filterObj, FPO.filterInObj, "filterObj -> filterInObj" );
	assert.strictEqual( FPO.std.filterObj, FPO.std.filterInObj, "std: filterObj -> filterInObj" );
	assert.strictEqual( FPO.reject, FPO.filterOut, "reject -> filterOut" );
	assert.strictEqual( FPO.std.reject, FPO.std.filterOut, "std: reject -> filterOut" );
	assert.strictEqual( FPO.chain, FPO.flatMap, "chain -> flatMap" );
	assert.strictEqual( FPO.std.chain, FPO.std.flatMap, "std: chain -> flatMap" );
	assert.strictEqual( FPO.chainObj, FPO.flatMapObj, "chainObj -> flatMapObj" );
	assert.strictEqual( FPO.std.chainObj, FPO.std.flatMapObj, "std: chainObj -> flatMapObj" );
	assert.strictEqual( FPO.fold, FPO.reduce, "fold -> reduce" );
	assert.strictEqual( FPO.std.fold, FPO.std.reduce, "std: fold -> reduce" );
	assert.strictEqual( FPO.foldL, FPO.reduce, "foldL -> reduce" );
	assert.strictEqual( FPO.std.foldL, FPO.std.reduce, "std: foldL -> reduce" );
	assert.strictEqual( FPO.foldObj, FPO.reduceObj, "foldObj -> reduceObj" );
	assert.strictEqual( FPO.std.foldObj, FPO.std.reduceObj, "std: foldObj -> reduceObj" );
	assert.strictEqual( FPO.foldR, FPO.reduceRight, "foldR -> reduceRight" );
	assert.strictEqual( FPO.std.foldR, FPO.std.reduceRight, "std: foldR -> reduceRight" );
	assert.strictEqual( FPO.transducers.boolean, FPO.transducers.booleanAnd, "transducers.boolean -> transducers.booleanAnd" );
	assert.strictEqual( FPO.std.transducers.boolean, FPO.std.transducers.booleanAnd, "std: transducers.boolean -> transducers.booleanAnd" );
} );

QUnit.test( "identity()", function test(assert){
	var rExpected = 2;
	var pExpected = undefined;
	var qExpected = 3;

	var rActual = FPO.identity( {v: 2} );
	var pActual = FPO.identity()( {} )( { v: undefined } );
	var qActual = FPO.identity()( {} )( {v: 3} );

	assert.expect( 3 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried with undefined" );
	assert.strictEqual( qActual, qExpected, "curried with value" );
} );

QUnit.test( "std.identity()", function test(assert){
	var rExpected = 2;
	var pExpected = undefined;
	var qExpected = 3;

	var rActual = FPO.std.identity( 2 );
	var pActual = FPO.std.identity()( undefined );
	var qActual = FPO.std.identity()( 3 );

	assert.expect( 3 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried with undefined" );
	assert.strictEqual( qActual, qExpected, "curried with value" );
} );

QUnit.test( "constant()", function test(assert){
	var rExpected = 2;
	var pExpected = undefined;
	var qExpected = 3;

	var rActual = FPO.constant( {v: 2} )();
	var pActual = FPO.constant()( {} )( { v: undefined } )();
	var qActual = FPO.constant()( {} )( {v: 3} )();

	assert.expect( 3 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried with undefined" );
	assert.strictEqual( qActual, qExpected, "curried with value" );
} );

QUnit.test( "std.constant()", function test(assert){
	var rExpected = 2;
	var pExpected = undefined;
	var qExpected = 3;

	var rActual = FPO.std.constant( 2 )();
	var pActual = FPO.std.constant()( undefined )();
	var qActual = FPO.std.constant()( 3 )();

	assert.expect( 3 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried with undefined" );
	assert.strictEqual( qActual, qExpected, "curried with value" );
} );

QUnit.test( "pick()", function test(assert){
	var obj = { x: 1, y: 2, z: 3, w: 4 };

	var rExpected = { x: 1, z: 3 };
	var pExpected = { y: 2 };
	var qExpected = {};
	var tExpected = {};

	var rActual = FPO.pick( {v: obj, props: ["x","z","x","f"]} );
	var pActual = FPO.pick()( {} )( {v: obj} )( {props: ["y"]} );
	var qActual = FPO.pick( {v: obj, props: []} );
	var tActual = FPO.pick( {v: obj, props: undefined} );

	assert.expect( 4 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "empty props" );
	assert.deepEqual( tActual, tExpected, "undefined props" );
} );

QUnit.test( "std.pick()", function test(assert){
	var obj = { x: 1, y: 2, z: 3, w: 4 };

	var rExpected = { x: 1, z: 3 };
	var pExpected = { y: 2 };
	var qExpected = {};
	var tExpected = {};

	var rActual = FPO.std.pick( ["x","z","x","f"], obj );
	var pActual = FPO.std.pick()( ["y"] )( obj );
	var qActual = FPO.std.pick( [], obj );
	var tActual = FPO.std.pick( undefined, obj );

	assert.expect( 4 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "empty props" );
	assert.deepEqual( tActual, tExpected, "undefined props" );
} );

QUnit.test( "pickAll()", function test(assert){
	var obj = { x: 1, y: 2, z: 3, w: 4 };

	var rExpected = { x: 1, z: 3, f: undefined };
	var pExpected = { y: 2 };
	var qExpected = {};
	var tExpected = {};

	var rActual = FPO.pickAll( {v: obj, props: ["x","z","x","f"]} );
	var pActual = FPO.pickAll()( {} )( {v: obj} )( {props: ["y"]} );
	var qActual = FPO.pickAll( {v: obj, props: []} );
	var tActual = FPO.pickAll( {v: obj, props: undefined} );

	assert.expect( 4 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "empty props" );
	assert.deepEqual( tActual, tExpected, "undefined props" );
} );

QUnit.test( "std.pickAll()", function test(assert){
	var obj = { x: 1, y: 2, z: 3, w: 4 };
	var rExpected = { x: 1, z: 3, f: undefined };
	var pExpected = { y: 2 };
	var qExpected = {};
	var tExpected = {};

	var rActual = FPO.std.pickAll( ["x","z","x","f"], obj );
	var pActual = FPO.std.pickAll()( ["y"] )( obj );
	var qActual = FPO.std.pickAll( [], obj );
	var tActual = FPO.std.pickAll( undefined, obj );

	assert.expect( 4 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "empty props" );
	assert.deepEqual( tActual, tExpected, "undefined props" );
} );

QUnit.test( "nAry()", function test(assert){
	function foo(argsObj) { return argsObj; }

	var obj = { x: 1, y: 2, z: 3, w: 4 };

	var rExpected = { x: 1, y: 2, w: 4 };
	var pExpected = { z: 3, w: 4 };
	var qExpected = {};
	var tExpected = {};
	var sExpected = {};

	var rActual = FPO.nAry( {fn: foo, props: ["x","y","w"]} )( obj );
	var pActual = FPO.nAry()( {} )( {fn: foo} )( {props: ["w","z"]} )( obj );
	var qActual = FPO.nAry( {fn: foo, props: []} )( obj );
	var tActual = FPO.nAry( {fn: foo, props: undefined} )( obj );
	var sActual = FPO.nAry( {fn: foo, props: ["x"]} )( undefined );

	assert.expect( 5 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "empty props (nullary)" );
	assert.deepEqual( tActual, tExpected, "undefined props (nullary)" );
	assert.deepEqual( sActual, sExpected, "undefined props (nullary), no args" );
} );

QUnit.test( "std.nAry()", function test(assert){
	function foo(...args) { return args; }

	var args = [1,2,3,4];

	var rExpected = [1,2,3];
	var pExpected = [1,2];
	var qExpected = [];
	var tExpected = [];

	var rActual = FPO.std.nAry( foo, 3 )( ...args );
	var pActual = FPO.std.nAry()( foo )( 2 )( ...args );
	var qActual = FPO.std.nAry()( foo )( 0 )( ...args );
	var tActual = FPO.std.nAry()( foo )( undefined )( ...args );

	assert.expect( 4 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "arity 0 (nullary)" );
	assert.deepEqual( tActual, tExpected, "undefined arity (nullary)" );
} );

QUnit.test( "unary()", function test(assert){
	function foo(argsObj) { return argsObj; }

	var obj = { x: 1, y: 2, z: 3, w: 4 };

	var rExpected = { y: 2 };
	var pExpected = { w: 4 };
	var qExpected = {};

	var rActual = FPO.unary( {fn: foo, prop: "y"} )( obj );
	var pActual = FPO.unary()( {} )( {fn: foo} )( {prop: "w"} )( obj );
	var qActual = FPO.unary( {fn: foo, prop: undefined} )( obj );

	assert.expect( 3 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "undefined prop" );
} );

QUnit.test( "std.unary()", function test(assert){
	function foo(...args) { return args; }

	var args = [1,2,3,4];

	var rExpected = [1];
	var pExpected = [1];

	var rActual = FPO.std.unary( foo )( ...args );
	var pActual = FPO.std.unary()( foo )( ...args );

	assert.expect( 2 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "binary()", function test(assert){
	function foo(argsObj) { return argsObj; }

	var obj = { x: 1, y: 2, z: 3, w: 4 };

	var rExpected = { x: 1, y: 2 };
	var pExpected = { z: 3, w: 4 };
	var qExpected = {};
	var tExpected = {};

	var rActual = FPO.binary( {fn: foo, props: ["x","y"]} )( obj );
	var pActual = FPO.binary()( {} )( {fn: foo} )( {props: ["w","z"]} )( obj );
	var qActual = FPO.binary( {fn: foo, props: []} )( obj );
	var tActual = FPO.binary( {fn: foo, props: undefined} )( obj );

	assert.expect( 4 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "empty props" );
	assert.deepEqual( tActual, tExpected, "undefined props" );
} );

QUnit.test( "std.binary()", function test(assert){
	function foo(...args) { return args; }

	var args = [1,2,3,4];

	var rExpected = [1,2];
	var pExpected = [1,2];

	var rActual = FPO.std.binary( foo )( ...args );
	var pActual = FPO.std.binary()( foo )( ...args );

	assert.expect( 2 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "curry()", function test(assert){
	function foo(argsObj) { return argsObj; }

	var X = { x: 1 };
	var XY = { x: 1, y: 2 };
	var YZ = { y: 2, z: 3 };
	var W = { w: 4 };

	var rExpected = { x: 1, y: 2, w: 4 };
	var pExpected = { x: 1 };
	var qExpected = { x: 1 };
	var tExpected = { x: 1 };

	var rActual = FPO.curry( {fn: foo, n: 3} )( X )( YZ )( W );
	var pActual = FPO.curry()( {} )( {fn: foo} )()( {} )( XY );
	var qActual = FPO.curry( {fn: foo, n: undefined} )( XY );
	var tActual = FPO.curry( {fn: foo, n: 0} )( XY );

	assert.expect( 4 );
	assert.deepEqual( rActual, rExpected, "regular call with arity 3" );
	assert.deepEqual( pActual, pExpected, "curried without arity" );
	assert.deepEqual( qActual, qExpected, "undefined arity" );
	assert.deepEqual( tActual, tExpected, "zero arity" );
} );

QUnit.test( "std.curry()", function test(assert){
	function foo(...args) { return args; }

	var a1 = [1];
	var a12 = [1,2];
	var a23 = [2,3];
	var a4 = [4];

	var rExpected = [1,2,4];
	var pExpected = [1];
	var qExpected = [1];
	var tExpected = [1];

	var rActual = FPO.std.curry( foo, 3 )( ...a1 )( ...a23 )( ...a4 );
	var pActual = FPO.std.curry()( foo )()( ...a12 );
	var qActual = FPO.std.curry( foo, undefined )( ...a12 );
	var tActual = FPO.std.curry( foo, 0 )( ...a12 );

	assert.expect( 4 );
	assert.deepEqual( rActual, rExpected, "regular call with arity 3" );
	assert.deepEqual( pActual, pExpected, "curried without arity" );
	assert.deepEqual( qActual, qExpected, "undefined arity" );
	assert.deepEqual( tActual, tExpected, "zero arity" );
} );

QUnit.test( "curryMultiple()", function test(assert){
	function foo(argsObj) { return argsObj; }

	var X = { x: 1 };
	var XY = { x: 1, y: 2 };
	var YZ = { y: 2, z: 3 };
	var W = { w: 4 };

	var rExpected = { x: 1, y: 2, z: 3 };
	var pExpected = { x: 1, y: 2 };
	var qExpected = { x: 1, y: 2 };
	var tExpected = { x: 1, y: 2 };

	var rActual = FPO.curryMultiple( {fn: foo, n: 3} )( X )( YZ );
	var pActual = FPO.curryMultiple()( {} )( {fn: foo} )()( {} )( XY );
	var qActual = FPO.curryMultiple( {fn: foo, n: undefined} )( XY );
	var tActual = FPO.curryMultiple( {fn: foo, n: 0} )( XY );

	assert.expect( 4 );
	assert.deepEqual( rActual, rExpected, "regular call with arity 3" );
	assert.deepEqual( pActual, pExpected, "curried without arity" );
	assert.deepEqual( qActual, qExpected, "undefined arity" );
	assert.deepEqual( tActual, tExpected, "zero arity" );
} );

QUnit.test( "std.curryMultiple()", function test(assert){
	function foo(...args) { return args; }

	var a1 = [1];
	var a12 = [1,2];
	var a23 = [2,3];
	var a4 = [4];

	var rExpected = [1,2,3];
	var pExpected = [1,2];
	var qExpected = [1,2];
	var tExpected = [1,2];

	var rActual = FPO.std.curryMultiple( foo, 3 )( ...a1 )( ...a23 );
	var pActual = FPO.std.curryMultiple()( foo )()( ...a12 );
	var qActual = FPO.std.curryMultiple( foo, undefined )( ...a12 );
	var tActual = FPO.std.curryMultiple( foo, 0 )( ...a12 );

	assert.expect( 4 );
	assert.deepEqual( rActual, rExpected, "regular call with arity 3" );
	assert.deepEqual( pActual, pExpected, "curried without arity" );
	assert.deepEqual( qActual, qExpected, "undefined arity" );
	assert.deepEqual( tActual, tExpected, "zero arity" );
} );

QUnit.test( "uncurry()", function test(assert){
	function foo(argsObj) { return argsObj; }

	var XYZ = { x: 1, y: 2, z: 3 };
	var XY = { x: 1, y: 2 };
	var fn1 = FPO.curry( {fn: foo, n: 3} );
	var fn2 = FPO.curry( {fn: foo, n: 2} );

	var rExpected = { x: 1, y: 2, z: 3 };
	var pExpected = { x: 1, y: 2 };

	var rActual = FPO.uncurry( {fn: fn1} )( XYZ );
	var pActual = FPO.uncurry()( {} )( {fn: fn2} )( XY );
	var qActual = FPO.uncurry( {fn: fn1} )( undefined );

	assert.expect( 3 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.ok( typeof qActual == "function", "no args" );
} );

QUnit.test( "std.uncurry()", function test(assert){
	function foo(...args) { return args; }

	var a123 = [1,2,3];
	var a12 = [1,2];
	var fn1 = FPO.std.curry( foo, 3 );
	var fn2 = FPO.std.curry( foo, 2 );

	var rExpected = [1,2,3];
	var pExpected = [1,2];

	var rActual = FPO.std.uncurry( fn1 )( ...a123 );
	var pActual = FPO.std.uncurry()( fn2 )( ...a12 );

	assert.expect( 2 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "partial()", function test(assert){
	function foo(argsObj) { return argsObj; }

	var X = { x: 1 };
	var Y = { y: 2 };
	var Z = { z: 3 };
	var XY = { x: 1, y: 2 };

	var rExpected = { x: 1, y: 2, z: 3 };
	var pExpected = { x: 1, y: 2 };
	var qExpected = { x: 1 };
	var tExpected = { x: 1 };
	var sExpected = { z: 3 };

	var rActual = FPO.partial( {fn: foo, args: Z} )( XY );
	var pActual = FPO.partial()( {} )( {fn: foo} )( {args: Y} )( X );
	var qActual = FPO.partial( {fn: foo, args: undefined} )( X );
	var tActual = FPO.partial( {fn: foo, args: {}} )( X );
	var sActual = FPO.partial( {fn: foo, args: Z} )( undefined );

	assert.expect( 5 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried with partial args" );
	assert.deepEqual( qActual, qExpected, "undefined partial args" );
	assert.deepEqual( tActual, tExpected, "empty partial args" );
	assert.deepEqual( sActual, sExpected, "no args" );
} );

QUnit.test( "std.partial()", function test(assert){
	function foo(...args) { return args; }

	var a1 = [1];
	var a12 = [1,2];
	var a23 = [2,3];
	var a3 = [3];

	var rExpected = [1,2,3];
	var pExpected = [1,2,3];
	var qExpected = [3];
	var tExpected = [3];

	var rActual = FPO.std.partial( foo, a1 )( ...a23 );
	var pActual = FPO.std.partial()( foo )()( a12 )( ...a3 );
	var qActual = FPO.std.partial( foo, undefined )( ...a3 );
	var tActual = FPO.std.partial( foo, [] )( ...a3 );

	assert.expect( 4 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried with partial args" );
	assert.deepEqual( qActual, qExpected, "undefined partial args" );
	assert.deepEqual( tActual, tExpected, "empty partial args" );
} );

QUnit.test( "std.partialRight()", function test(assert){
	function foo(...args) { return args; }

	var a1 = [1];
	var a12 = [1,2];
	var a23 = [2,3];
	var a3 = [3];

	var rExpected = [2,3,1];
	var pExpected = [3,1,2];
	var qExpected = [3];
	var tExpected = [3];

	var rActual = FPO.std.partialRight( foo, a1 )( ...a23 );
	var pActual = FPO.std.partialRight()( foo )()( a12 )( ...a3 );
	var qActual = FPO.std.partialRight( foo, undefined )( ...a3 );
	var tActual = FPO.std.partialRight( foo, [] )( ...a3 );

	assert.expect( 4 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried with partial args" );
	assert.deepEqual( qActual, qExpected, "undefined partial args" );
	assert.deepEqual( tActual, tExpected, "empty partial args" );
} );

QUnit.test( "complement()", function test(assert){
	function xPlusYEven(argsObj) { return (argsObj.x + argsObj.y) % 2 == 0; }

	var XY12 = { x: 1, y: 2 };
	var XY24 = { x: 2, y: 4 };

	var rExpected = true;
	var pExpected = false;

	var rActual = FPO.complement( {fn: xPlusYEven} )( XY12 );
	var pActual = FPO.complement()( {} )( { fn: xPlusYEven } )( XY24 );

	assert.expect( 2 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "std.complement()", function test(assert){
	function argPlusArgEven(...args) { return (args[0] + args[1]) % 2 == 0; }

	var a12 = [1,2];
	var a24 = [2,4];

	var rExpected = true;
	var pExpected = false;

	var rActual = FPO.std.complement( argPlusArgEven )( ...a12 );
	var pActual = FPO.std.complement()( argPlusArgEven )( ...a24 );

	assert.expect( 2 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "apply()", function test(assert){
	function foo(x,y,z) { return {x,y,z}; }

	var obj = { y: 2, z: 3, x: 1 };

	var rExpected = { x: 1, y: 2, z: 3 };
	var pExpected = { x: 3, y: 2, z: 1 };
	var qExpected = { x: 1, y: 2, z: 3 };
	var tExpected = { x: undefined, y: undefined, z: undefined };

	var rActual = FPO.apply( {fn: foo} )( obj );
	// NOTE: intentionally reversing applied prop order
	var pActual = FPO.apply()( {} )( {fn: foo, props: ["z","y","x"]} )( obj );
	var qActual = FPO.apply( {fn: foo, props: undefined} )( obj );
	var tActual = FPO.apply( {fn: foo, props: []} )( obj );

	assert.expect( 4 );
	assert.deepEqual( rActual, rExpected, "regular call without props" );
	assert.deepEqual( pActual, pExpected, "curried with reversed props" );
	assert.deepEqual( qActual, qExpected, "undefined props" );
	assert.deepEqual( tActual, tExpected, "empty props" );
} );

QUnit.test( "std.apply(..)", function test(assert){
	function foo(...args) { return args; }

	var arr = [1,2,3];

	var rExpected = [1,2,3];
	var pExpected = [1,2,3];

	var rActual = FPO.std.apply( foo )( arr );
	var pActual = FPO.std.apply()( foo )( arr );

	assert.expect( 2 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "unapply()", function test(assert){
	function foo({x,y,z}) { return {x,y,z}; }

	var args = [1,2,3];

	var rExpected = { x: 1, y: 2, z: 3 };
	var pExpected = { x: 3, y: 2, z: 1 };
	var qExpected = { x: undefined, y: undefined, z: undefined };
	var tExpected = { x: undefined, y: undefined, z: undefined };

	var rActual = FPO.unapply( {fn: foo, props: ["x","y","z"]} )( ...args );
	// NOTE: intentionally reversing applied prop order
	var pActual = FPO.unapply()( {} )( {fn: foo, props: ["z","y","x"]} )( ...args );
	var qActual = FPO.unapply( {fn: foo, props: undefined} )( ...args );
	var tActual = FPO.unapply( {fn: foo, props: []} )( ...args );

	assert.expect( 4 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried with reversed props" );
	assert.deepEqual( qActual, qExpected, "undefined props" );
	assert.deepEqual( tActual, tExpected, "empty props" );
} );

QUnit.test( "std.unapply()", function test(assert){
	function foo(args) { return args; }

	var arr = [1,2,3];

	var rExpected = [1,2,3];
	var pExpected = [1,2,3];

	var rActual = FPO.std.unapply( foo )( ...arr );
	var pActual = FPO.std.unapply()( foo )( ...arr );

	assert.expect( 2 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "compose()", function test(assert){
	function foo({v}) { return `foo,${v}`; }
	function bar({v}) { return `bar,${v}`; }
	function baz({v}) { return `baz,${v}`; }

	var v = 3;

	var rExpected = "foo,bar,baz,3";
	var pExpected = "foo,3";
	var qExpected = 3;
	var tExpected = 3;

	var rActual = FPO.compose( {fns: [foo,bar,baz]} )( {v} );
	var pActual = FPO.compose()( {} )( {fns: [foo]} )( {v} );
	var qActual = FPO.compose( {fns: undefined} )( {v} );
	var tActual = FPO.compose( {fns: []} )( {v} );

	assert.expect( 4 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "functions list undefined" );
	assert.strictEqual( tActual, tExpected, "functions list empty" );
} );

QUnit.test( "std.compose()", function test(assert){
	function foo(v) { return `foo,${v}`; }
	function bar(v) { return `bar,${v}`; }
	function baz(v) { return `baz,${v}`; }

	var arr = [3,4];

	var rExpected = "foo,bar,baz,3";
	var pExpected = "foo,3";
	var qExpected = 3;
	var tExpected = 3;

	var rActual = FPO.std.compose( [foo,bar,baz] )( ...arr );
	var pActual = FPO.std.compose()( [foo] )( ...arr );
	var qActual = FPO.std.compose( undefined )( ...arr );
	var tActual = FPO.std.compose( [] )( ...arr );

	assert.expect( 4 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "functions list undefined" );
	assert.strictEqual( tActual, tExpected, "functions list empty" );
} );

QUnit.test( "pipe()", function test(assert){
	function foo({v}) { return `foo,${v}`; }
	function bar({v}) { return `bar,${v}`; }
	function baz({v}) { return `baz,${v}`; }

	var v = 3;

	var rExpected = "foo,bar,baz,3";
	var pExpected = "foo,3";
	var qExpected = 3;
	var tExpected = 3;

	var rActual = FPO.pipe( {fns: [baz,bar,foo]} )( {v} );
	var pActual = FPO.pipe()( {} )( {fns: [foo]} )( {v} );
	var qActual = FPO.pipe( {fns: undefined} )( {v} );
	var tActual = FPO.pipe( {fns: []} )( {v} );

	assert.expect( 4 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "functions list undefined" );
	assert.strictEqual( tActual, tExpected, "functions list empty" );
} );

QUnit.test( "std.pipe()", function test(assert){
	function foo(v) { return `foo,${v}`; }
	function bar(v) { return `bar,${v}`; }
	function baz(v) { return `baz,${v}`; }

	var arr = [3,4];

	var rExpected = "foo,bar,baz,3";
	var pExpected = "foo,3";
	var qExpected = 3;
	var tExpected = 3;

	var rActual = FPO.std.pipe( [baz,bar,foo] )( ...arr );
	var pActual = FPO.std.pipe()( [foo] )( ...arr );
	var qActual = FPO.std.pipe( undefined )( ...arr );
	var tActual = FPO.std.pipe( [] )( ...arr );

	assert.expect( 4 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "functions list undefined" );
	assert.strictEqual( tActual, tExpected, "functions list empty" );
} );

QUnit.test( "prop()", function test(assert){
	var obj1 = { x: 1, y: 2, z: 3, w: 4 };
	var obj2 = { x: 1, y: 2 };

	var rExpected = 1;
	var pExpected = 2;
	var qExpected = 3;
	var tExpected = undefined;
	var sExpected = undefined;
	var uExpected = undefined;

	var f = FPO.prop( {prop: "z"} );
	var rActual = FPO.prop( {v: obj1, prop: "x"} );
	var pActual = FPO.prop()( {} )( {v: obj1} )()( {} )( {prop: "y"} );
	var qActual = f( {v: obj1} )
	var tActual = f( {v: obj2} );
	var sActual = FPO.prop( {prop: undefined, v: undefined} );
	var uActual = FPO.prop( {prop: "", v: {}} );

	assert.expect( 6 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "with obj1" );
	assert.strictEqual( tActual, tExpected, "with obj2" );
	assert.strictEqual( sActual, sExpected, "prop and object undefined" );
	assert.strictEqual( uActual, uExpected, "prop and object empty" );
} );

QUnit.test( "std.prop()", function test(assert){
	var obj1 = { x: 1, y: 2, z: 3, w: 4 };
	var obj2 = { x: 1, y: 2 };

	var rExpected = 1;
	var pExpected = 2;
	var qExpected = undefined;
	var tExpected = undefined;

	var rActual = FPO.std.prop( "x", obj1 );
	var pActual = FPO.std.prop()( "y" )( obj1 );
	var qActual = FPO.std.prop( undefined, undefined );
	var tActual = FPO.std.prop( "", {} );

	assert.expect( 4 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "prop and object undefined" );
	assert.strictEqual( tActual, tExpected, "prop and object empty" );
} );

QUnit.test( "setProp()", function test(assert){
	var obj1 = { x: 1, y: 2, z: 3, w: 4 };
	var obj2 = { x: 1, y: 2 };
	var v10 = { v: 10 };

	var rExpected = { x: 10, y: 2, z: 3, w: 4 };
	var pExpected = { x: 1, y: 2, z: 10 };
	var qExpected = { "": 10 };
	var tExpected = { "": 10 };

	var rActual = FPO.setProp( {o: obj1, prop: "x"} )( v10 );
	var pActual = FPO.setProp()( v10 )( {} )( {prop: "z"} )( {} )( {o: obj2} );
	var qActual = FPO.setProp( v10 )( {prop: undefined, o: undefined} );
	var tActual = FPO.setProp( v10 )( {prop: "", o: {}} );

	assert.expect( 5 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "prop and object undefined" );
	assert.deepEqual( tActual, tExpected, "prop and object empty" );
	assert.notStrictEqual( rActual, obj1, "object is cloned, not mutated" );
} );

QUnit.test( "std.setProp()", function test(assert){
	var obj1 = { x: 1, y: 2, z: 3, w: 4 };
	var obj2 = { x: 1, y: 2 };

	var rExpected = { x: 10, y: 2, z: 3, w: 4 };
	var pExpected = { x: 1, y: 2, z: 10 };
	var qExpected = { "": 10 };
	var tExpected = { "": 10 };

	var rActual = FPO.std.setProp( "x", obj1 )( 10 );
	var pActual = FPO.std.setProp()( "z" )()( obj2 )( 10 );
	var qActual = FPO.std.setProp( undefined, undefined, 10 );
	var tActual = FPO.std.setProp( "", {}, 10 );

	assert.expect( 5 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "prop and object undefined" );
	assert.deepEqual( tActual, tExpected, "prop and object empty" );
	assert.notStrictEqual( rActual, obj1, "object is cloned, not mutated" );
} );

QUnit.test( "reassoc()", function test(assert){
	var obj = { x: 1, y: 2, z: 3, w: 4 };
	var props1 = { x: "a", y: "b" };
	var props2 = { A: "B" };

	var rExpected = { a: 1, b: 2, z: 3, w: 4 };
	var pExpected = { a: 1, b: 2, z: 3, w: 4 };
	var qExpected = { x: 1, y: 2, z: 3, w: 4 };
	var tExpected = { x: 1, y: 2, z: 3, w: 4 };
	var sExpected = { x: 1, y: 2, z: 3, w: 4 };

	var rActual = FPO.reassoc( {props: props1, v: obj} );
	var pActual = FPO.reassoc()( {} )( {props: props1} )()( {v: obj} );
	var qActual = FPO.reassoc( {props: props2, v: obj} );
	var tActual = FPO.reassoc( {props: undefined, v: obj} );
	var sActual = FPO.reassoc( {props: {}, v: obj} );

	assert.expect( 6 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "props not present on source object" );
	assert.deepEqual( tActual, tExpected, "props undefined" );
	assert.deepEqual( sActual, sExpected, "props empty" );
	assert.notStrictEqual( tActual, tExpected, "object is cloned, not mutated" );
} );

QUnit.test( "std.reassoc()", function test(assert){
	var obj = { x: 1, y: 2, z: 3, w: 4 };
	var props1 = { x: "a", y: "b" };
	var props2 = { A: "B" };

	var rExpected = { a: 1, b: 2, z: 3, w: 4 };
	var pExpected = { a: 1, b: 2, z: 3, w: 4 };
	var qExpected = { x: 1, y: 2, z: 3, w: 4 };
	var tExpected = { x: 1, y: 2, z: 3, w: 4 };
	var sExpected = { x: 1, y: 2, z: 3, w: 4 };

	var rActual = FPO.std.reassoc( props1, obj );
	var pActual = FPO.std.reassoc()( props1 )()( obj );
	var qActual = FPO.std.reassoc( props2, obj );
	var tActual = FPO.std.reassoc( undefined, obj );
	var sActual = FPO.std.reassoc( {}, obj );

	assert.expect( 6 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "props not present on source object" );
	assert.deepEqual( tActual, tExpected, "props undefined" );
	assert.deepEqual( sActual, sExpected, "props empty" );
	assert.notStrictEqual( tActual, tExpected, "object is cloned, not mutated" );
} );

QUnit.test( "filterIn()", function test(assert){
	function checkParams({ v, i, arr }) {
		if (
			arr === list &&
			typeof v == "number" && typeof i == "number" && _isArray( arr ) &&
			v === (i + 1) && arr[i] === v
		) {
			return false;
		}
		return true;
	}
	function isEven({ v }) { return v % 2 == 0; }
	function alwaysFalse() { return false; }

	var list = [1,2,3,4,5];

	var rExpected = [2,4];
	var pExpected = [2,4];
	var qExpected = [];
	var tExpected = [];
	var sExpected = [];
	var uExpected = [];

	var rActual = FPO.filterIn( {fn: isEven, arr: list} );
	var pActual = FPO.filterIn()( {} )( {fn: isEven} )()( {arr: list} );
	var qActual = FPO.filterIn( {fn: alwaysFalse, arr: list} );
	var tActual = FPO.filterIn( {fn: isEven, arr: undefined} );
	var sActual = FPO.filterIn( {fn: isEven, arr: []} );
	var uActual = FPO.filterIn( {fn: checkParams, arr: list} );

	assert.expect( 6 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "always false predicate" );
	assert.deepEqual( tActual, tExpected, "array undefined" );
	assert.deepEqual( sActual, sExpected, "array empty" );
	assert.deepEqual( uActual, uExpected, "predicate params check" );
} );

QUnit.test( "std.filterIn()", function test(assert){
	function checkParams(v,i,arr) {
		if (
			arr === list &&
			typeof v == "number" && typeof i == "number" && _isArray( arr ) &&
			v === (i + 1) && arr[i] === v
		) {
			return false;
		}
		return true;
	}
	function isEven(v) { return v % 2 == 0; }
	function alwaysFalse() { return false; }

	var list = [1,2,3,4,5];

	var rExpected = [2,4];
	var pExpected = [2,4];
	var qExpected = [];
	var tExpected = [];
	var sExpected = [];
	var uExpected = [];

	var rActual = FPO.std.filterIn( isEven, list );
	var pActual = FPO.std.filterIn()( isEven )()( list );
	var qActual = FPO.std.filterIn( alwaysFalse, list );
	var tActual = FPO.std.filterIn( isEven, undefined );
	var sActual = FPO.std.filterIn( isEven, [] );
	var uActual = FPO.std.filterIn( checkParams, list );

	assert.expect( 6 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "always false predicate" );
	assert.deepEqual( tActual, tExpected, "array undefined" );
	assert.deepEqual( sActual, sExpected, "array empty" );
	assert.deepEqual( uActual, uExpected, "predicate params check" );
} );

QUnit.test( "filterInObj()", function test(assert){
	function checkParams({ v, i, o }) {
		if (
			o === obj &&
			typeof v == "number" && typeof i == "string" && _isObject( o ) &&
			o[i] === v
		) {
			return false;
		}
		return true;
	}
	function isEven({ v }) { return v % 2 == 0; }
	function alwaysFalse() { return false; }

	var obj = {a: 1, b: 2, c: 3, d: 4, e: 5};

	var rExpected = {b: 2, d: 4};
	var pExpected = {b: 2, d: 4};
	var qExpected = {};
	var tExpected = {};
	var sExpected = {};
	var uExpected = {};

	var rActual = FPO.filterInObj( {fn: isEven, o: obj} );
	var pActual = FPO.filterInObj()( {} )( {fn: isEven} )()( {o: obj} );
	var qActual = FPO.filterInObj( {fn: alwaysFalse, o: obj} );
	var tActual = FPO.filterInObj( {fn: isEven, o: undefined} );
	var sActual = FPO.filterInObj( {fn: isEven, o: []} );
	var uActual = FPO.filterInObj( {fn: checkParams, o: obj} );

	assert.expect( 6 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "always false predicate" );
	assert.deepEqual( tActual, tExpected, "array undefined" );
	assert.deepEqual( sActual, sExpected, "array empty" );
	assert.deepEqual( uActual, uExpected, "predicate params check" );
} );

QUnit.test( "std.filterInObj()", function test(assert){
	function checkParams(v,i,o) {
		if (
			o === obj &&
			typeof v == "number" && typeof i == "string" && _isObject( o ) &&
			o[i] === v
		) {
			return false;
		}
		return true;
	}
	function isEven(v) { return v % 2 == 0; }
	function alwaysFalse() { return false; }

	var obj = {a: 1, b: 2, c: 3, d: 4, e: 5};

	var rExpected = {b: 2, d: 4};
	var pExpected = {b: 2, d: 4};
	var qExpected = {};
	var tExpected = {};
	var sExpected = {};
	var uExpected = {};

	var rActual = FPO.std.filterInObj( isEven, obj );
	var pActual = FPO.std.filterInObj()( isEven )()( obj );
	var qActual = FPO.std.filterInObj( alwaysFalse, obj );
	var tActual = FPO.std.filterInObj( isEven, undefined );
	var sActual = FPO.std.filterInObj( isEven, {} );
	var uActual = FPO.std.filterInObj( checkParams, obj );

	assert.expect( 6 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "always false predicate" );
	assert.deepEqual( tActual, tExpected, "array undefined" );
	assert.deepEqual( sActual, sExpected, "array empty" );
	assert.deepEqual( uActual, uExpected, "predicate params check" );
} );

QUnit.test( "filterOut()", function test(assert){
	function checkParams({ v, i, arr }) {
		if (
			arr === list &&
			typeof v == "number" && typeof i == "number" && _isArray( arr ) &&
			v === (i + 1) && arr[i] === v
		) {
			return true;
		}
		return false;
	}
	function isEven({ v }) { return v % 2 == 0; }
	function alwaysTrue() { return true; }

	var list = [1,2,3,4,5];

	var rExpected = [1,3,5];
	var pExpected = [1,3,5];
	var qExpected = [];
	var tExpected = [];
	var sExpected = [];
	var uExpected = [];

	var rActual = FPO.filterOut( {fn: isEven, arr: list} );
	var pActual = FPO.filterOut()( {} )( {fn: isEven} )()( {arr: list} );
	var qActual = FPO.filterOut( {fn: alwaysTrue, arr: list} );
	var tActual = FPO.filterOut( {fn: isEven, arr: undefined} );
	var sActual = FPO.filterOut( {fn: isEven, arr: []} );
	var uActual = FPO.filterOut( {fn: checkParams, arr: list} );

	assert.expect( 6 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "always true predicate" );
	assert.deepEqual( tActual, tExpected, "array undefined" );
	assert.deepEqual( sActual, sExpected, "array empty" );
	assert.deepEqual( uActual, uExpected, "predicate params check" );
} );

QUnit.test( "std.filterOut()", function test(assert){
	function checkParams(v,i,arr) {
		if (
			arr === list &&
			typeof v == "number" && typeof i == "number" && _isArray( arr ) &&
			v === (i + 1) && arr[i] === v
		) {
			return true;
		}
		return false;
	}
	function isEven(v) { return v % 2 == 0; }
	function alwaysTrue() { return true; }

	var list = [1,2,3,4,5];

	var rExpected = [1,3,5];
	var pExpected = [1,3,5];
	var qExpected = [];
	var tExpected = [];
	var sExpected = [];
	var uExpected = [];

	var rActual = FPO.std.filterOut( isEven, list );
	var pActual = FPO.std.filterOut()( isEven )()( list );
	var qActual = FPO.std.filterOut( alwaysTrue, list );
	var tActual = FPO.std.filterOut( isEven, undefined );
	var sActual = FPO.std.filterOut( isEven, [] );
	var uActual = FPO.std.filterOut( checkParams, list );

	assert.expect( 6 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "always true predicate" );
	assert.deepEqual( tActual, tExpected, "array undefined" );
	assert.deepEqual( sActual, sExpected, "array empty" );
	assert.deepEqual( uActual, uExpected, "predicate params check" );
} );

QUnit.test( "filterOutObj()", function test(assert){
	function checkParams({ v, i, o }) {
		if (
			o === obj &&
			typeof v == "number" && typeof i == "string" && _isObject( o ) &&
			o[i] === v
		) {
			return true;
		}
		return false;
	}
	function isEven({ v }) { return v % 2 == 0; }
	function alwaysTrue() { return true; }

	var obj = {a: 1, b: 2, c: 3, d: 4, e: 5};

	var rExpected = {a: 1, c: 3, e: 5};
	var pExpected = {a: 1, c: 3, e: 5};
	var qExpected = {};
	var tExpected = {};
	var sExpected = {};
	var uExpected = {};

	var rActual = FPO.filterOutObj( {fn: isEven, o: obj} );
	var pActual = FPO.filterOutObj()( {} )( {fn: isEven} )()( {o: obj} );
	var qActual = FPO.filterOutObj( {fn: alwaysTrue, o: obj} );
	var tActual = FPO.filterOutObj( {fn: isEven, o: undefined} );
	var sActual = FPO.filterOutObj( {fn: isEven, o: {}} );
	var uActual = FPO.filterOutObj( {fn: checkParams, o: obj} );

	assert.expect( 6 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "always true predicate" );
	assert.deepEqual( tActual, tExpected, "array undefined" );
	assert.deepEqual( sActual, sExpected, "array empty" );
	assert.deepEqual( uActual, uExpected, "predicate params check" );
} );

QUnit.test( "std.filterOutObj()", function test(assert){
	function checkParams(v,i,o) {
		if (
			o === obj &&
			typeof v == "number" && typeof i == "string" && _isObject( o ) &&
			o[i] === v
		) {
			return true;
		}
		return false;
	}
	function isEven(v) { return v % 2 == 0; }
	function alwaysTrue() { return true; }

	var obj = {a: 1, b: 2, c: 3, d: 4, e: 5};

	var rExpected = {a: 1, c: 3, e: 5};
	var pExpected = {a: 1, c: 3, e: 5};
	var qExpected = {};
	var tExpected = {};
	var sExpected = {};
	var uExpected = {};

	var rActual = FPO.std.filterOutObj( isEven, obj );
	var pActual = FPO.std.filterOutObj()( isEven )()( obj );
	var qActual = FPO.std.filterOutObj( alwaysTrue, obj );
	var tActual = FPO.std.filterOutObj( isEven, undefined );
	var sActual = FPO.std.filterOutObj( isEven, {} );
	var uActual = FPO.std.filterOutObj( checkParams, obj );

	assert.expect( 6 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "always true predicate" );
	assert.deepEqual( tActual, tExpected, "array undefined" );
	assert.deepEqual( sActual, sExpected, "array empty" );
	assert.deepEqual( uActual, uExpected, "predicate params check" );
} );

QUnit.test( "map()", function test(assert){
	function checkParams({ v, i, arr }) {
		if (
			arr === list &&
			typeof v == "number" && typeof i == "number" && _isArray( arr ) &&
			v === (i + 1) && arr[i] === v
		) {
			return true;
		}
		return false;
	}
	function mul10({ v }) { return v * 10; }

	var list = [1,2];

	var rExpected = [10,20];
	var pExpected = [10,20];
	var qExpected = [];
	var tExpected = [];
	var sExpected = [true,true];

	var rActual = FPO.map( {fn: mul10, arr: list} );
	var pActual = FPO.map()( {} )( {fn: mul10} )()( {arr: list} );
	var qActual = FPO.map( {fn: mul10, arr: undefined} );
	var tActual = FPO.map( {fn: mul10, arr: []} );
	var sActual = FPO.map( {fn: checkParams, arr: list} );

	assert.expect( 5 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "array undefined" );
	assert.deepEqual( tActual, tExpected, "array empty" );
	assert.deepEqual( sActual, sExpected, "mapper params check" );
} );

QUnit.test( "std.map()", function test(assert){
	function checkParams(v,i,arr) {
		if (
			arr === list &&
			typeof v == "number" && typeof i == "number" && _isArray( arr ) &&
			v === (i + 1) && arr[i] === v
		) {
			return true;
		}
		return false;
	}
	function mul10(v) { return v * 10; }

	var list = [1,2];

	var rExpected = [10,20];
	var pExpected = [10,20];
	var qExpected = [];
	var tExpected = [];
	var sExpected = [true,true];

	var rActual = FPO.std.map( mul10, list );
	var pActual = FPO.std.map()( mul10 )()( list );
	var qActual = FPO.std.map( mul10, undefined );
	var tActual = FPO.std.map( mul10, [] );
	var sActual = FPO.std.map( checkParams, list );

	assert.expect( 5 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "array undefined" );
	assert.deepEqual( tActual, tExpected, "array empty" );
	assert.deepEqual( sActual, sExpected, "mapper params check" );
} );

QUnit.test( "mapObj()", function test(assert){
	function checkParams({ v, i, o }) {
		if (
			o === obj &&
			typeof v == "number" && typeof i == "string" && _isObject( o ) &&
			v === o[i]
		) {
			return true;
		}
		return false;
	}
	function mul10({ v }) { return v * 10; }

	var obj = {a: 1, b: 2};

	var rExpected = {a: 10, b: 20};
	var pExpected = {a: 10, b: 20};
	var qExpected = {};
	var tExpected = {};
	var sExpected = {a: true, b: true};

	var rActual = FPO.mapObj( {fn: mul10, o: obj} );
	var pActual = FPO.mapObj()( {} )( {fn: mul10} )()( {o: obj} );
	var qActual = FPO.mapObj( {fn: mul10, o: undefined} );
	var tActual = FPO.mapObj( {fn: mul10, o: {}} );
	var sActual = FPO.mapObj( {fn: checkParams, o: obj} );

	assert.expect( 5 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "object undefined" );
	assert.deepEqual( tActual, tExpected, "object empty" );
	assert.deepEqual( sActual, sExpected, "mapper params check" );
} );

QUnit.test( "std.mapObj()", function test(assert){
	function checkParams(v,i,o) {
		if (
			o === obj &&
			typeof v == "number" && typeof i == "string" && _isObject( o ) &&
			v === o[i]
		) {
			return true;
		}
		return false;
	}
	function mul10(v) { return v * 10; }

	var obj = {a: 1, b: 2};

	var rExpected = {a: 10, b: 20};
	var pExpected = {a: 10, b: 20};
	var qExpected = {};
	var tExpected = {};
	var sExpected = {a: true, b: true};

	var rActual = FPO.std.mapObj( mul10, obj );
	var pActual = FPO.std.mapObj()( mul10 )()( obj );
	var qActual = FPO.std.mapObj( mul10, undefined );
	var tActual = FPO.std.mapObj( mul10, {} );
	var sActual = FPO.std.mapObj( checkParams, obj );

	assert.expect( 5 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "object undefined" );
	assert.deepEqual( tActual, tExpected, "object empty" );
	assert.deepEqual( sActual, sExpected, "mapper params check" );
} );

QUnit.test( "flatMap()", function test(assert){
	function checkParams({ v, i, arr }) {
		if (
			arr === list &&
			typeof v == "number" && typeof i == "number" && _isArray( arr ) &&
			v === (i + 1) && arr[i] === v
		) {
			return true;
		}
		return false;
	}
	function mul10And100({ v }) {
		if (v <= 1) {
			return [v * 10,v * 100];
		}
		return v * 10;
	}

	var list = [1,2];

	var rExpected = [10,100,20];
	var pExpected = [10,100,20];
	var qExpected = [];
	var tExpected = [];
	var sExpected = [true,true];

	var rActual = FPO.flatMap( {fn: mul10And100, arr: list} );
	var pActual = FPO.flatMap()( {} )( {fn: mul10And100} )()( {arr: list} );
	var qActual = FPO.flatMap( {fn: mul10And100, arr: undefined} );
	var tActual = FPO.flatMap( {fn: mul10And100, arr: []} );
	var sActual = FPO.flatMap( {fn: checkParams, arr: list} );

	assert.expect( 5 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "array undefined" );
	assert.deepEqual( tActual, tExpected, "array empty" );
	assert.deepEqual( sActual, sExpected, "mapper params check" );
} );

QUnit.test( "std.flatMap()", function test(assert){
	function checkParams(v,i,arr) {
		if (
			arr === list &&
			typeof v == "number" && typeof i == "number" && _isArray( arr ) &&
			v === (i + 1) && arr[i] === v
		) {
			return true;
		}
		return false;
	}
	function mul10And100(v) {
		if (v <= 1) {
			return [v * 10,v * 100];
		}
		return v * 10;
	}

	var list = [1,2];

	var rExpected = [10,100,20];
	var pExpected = [10,100,20];
	var qExpected = [];
	var tExpected = [];
	var sExpected = [true,true];

	var rActual = FPO.std.flatMap( mul10And100, list );
	var pActual = FPO.std.flatMap()( mul10And100 )()( list );
	var qActual = FPO.std.flatMap( mul10And100, undefined );
	var tActual = FPO.std.flatMap( mul10And100, [] );
	var sActual = FPO.std.flatMap( checkParams, list );

	assert.expect( 5 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "array undefined" );
	assert.deepEqual( tActual, tExpected, "array empty" );
	assert.deepEqual( sActual, sExpected, "mapper params check" );
} );

QUnit.test( "flatMapObj()", function test(assert){
	function checkParams({ v, i, o }) {
		if (
			o === obj &&
			typeof v == "number" && typeof i == "string" && _isObject( o ) &&
			o[i] === v
		) {
			return true;
		}
		return false;
	}
	function splitEvensInHalf({ v, i }) {
		if (v % 2 == 0) {
			return { [i]: v/2, [i+"_2"]: v/2 };
		}
		return v;
	}

	var obj = {a: 1, b: 2, c: 3, d: 4};

	var rExpected = {a: 1, b: 1, b_2: 1, c: 3, d: 2, d_2: 2};
	var pExpected = {a: 1, b: 1, b_2: 1, c: 3, d: 2, d_2: 2};
	var qExpected = {};
	var tExpected = {};
	var sExpected = {a: true, b: true, c: true, d: true};

	var rActual = FPO.flatMapObj( {fn: splitEvensInHalf, o: obj} );
	var pActual = FPO.flatMapObj()( {} )( {fn: splitEvensInHalf} )()( {o: obj} );
	var qActual = FPO.flatMapObj( {fn: splitEvensInHalf, o: undefined} );
	var tActual = FPO.flatMapObj( {fn: splitEvensInHalf, o: {}} );
	var sActual = FPO.flatMapObj( {fn: checkParams, o: obj} );

	assert.expect( 5 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "object undefined" );
	assert.deepEqual( tActual, tExpected, "object empty" );
	assert.deepEqual( sActual, sExpected, "mapper params check" );
} );

QUnit.test( "std.flatMapObj()", function test(assert){
	function checkParams(v,i,o) {
		if (
			o === obj &&
			typeof v == "number" && typeof i == "string" && _isObject( o ) &&
			o[i] === v
		) {
			return true;
		}
		return false;
	}
	function splitEvensInHalf(v,i) {
		if (v % 2 == 0) {
			return { [i]: v/2, [i+"_2"]: v/2 };
		}
		return v;
	}

	var obj = {a: 1, b: 2, c: 3, d: 4};

	var rExpected = {a: 1, b: 1, b_2: 1, c: 3, d: 2, d_2: 2};
	var pExpected = {a: 1, b: 1, b_2: 1, c: 3, d: 2, d_2: 2};
	var qExpected = {};
	var tExpected = {};
	var sExpected = {a: true, b: true, c: true, d: true};

	var rActual = FPO.std.flatMapObj( splitEvensInHalf, obj );
	var pActual = FPO.std.flatMapObj()( splitEvensInHalf )()( obj );
	var qActual = FPO.std.flatMapObj( splitEvensInHalf, undefined );
	var tActual = FPO.std.flatMapObj( splitEvensInHalf, {} );
	var sActual = FPO.std.flatMapObj( checkParams, obj );

	assert.expect( 5 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "object undefined" );
	assert.deepEqual( tActual, tExpected, "object empty" );
	assert.deepEqual( sActual, sExpected, "mapper params check" );
} );

QUnit.test( "ap()", function test(assert){
	function checkParams({ v, i, arr }) {
		if (
			arr === list &&
			typeof v == "number" && typeof i == "number" && _isArray( arr ) &&
			v === (i + 1) && arr[i] === v
		) {
			return true;
		}
		return false;
	}
	function div2({ v }) { return v / 2; }
	function mul10({ v }) { return v * 10; }

	var list = [1,2];

	var rExpected = [10,20];
	var pExpected = [10,20];
	var qExpected = [10,20,0.5,1];
	var tExpected = [1,2];
	var sExpected = [1,2];
	var uExpected = [];
	var hExpected = [];
	var jExpected = [true,true,true,true];

	var rActual = FPO.ap( {fns: [mul10], arr: list} );
	var pActual = FPO.ap()( {} )( {fns: [mul10]} )()( {arr: list} );
	var qActual = FPO.ap( {fns: [mul10,div2], arr: list} );
	var tActual = FPO.ap( {fns: undefined, arr: list} );
	var sActual = FPO.ap( {fns: [], arr: list} );
	var uActual = FPO.ap( {fns: [mul10], arr: undefined} );
	var hActual = FPO.ap( {fns: [mul10], arr: []} );
	var jActual = FPO.ap( {fns: [checkParams,checkParams], arr: list} );

	assert.expect( 8 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "two functions" );
	assert.deepEqual( tActual, tExpected, "undefined functions" );
	assert.deepEqual( sActual, sExpected, "empty functions" );
	assert.deepEqual( uActual, uExpected, "array undefined" );
	assert.deepEqual( hActual, hExpected, "array empty" );
	assert.deepEqual( jActual, jExpected, "functions params check" );
} );

QUnit.test( "std.ap()", function test(assert){
	function checkParams(v,i,arr) {
		if (
			arr === list &&
			typeof v == "number" && typeof i == "number" && _isArray( arr ) &&
			v === (i + 1) && arr[i] === v
		) {
			return true;
		}
		return false;
	}
	function div2(v) { return v / 2; }
	function mul10(v) { return v * 10; }

	var list = [1,2];

	var rExpected = [10,20];
	var pExpected = [10,20];
	var qExpected = [10,20,0.5,1];
	var tExpected = [1,2];
	var sExpected = [1,2];
	var uExpected = [];
	var hExpected = [];
	var jExpected = [true,true,true,true];

	var rActual = FPO.std.ap( [mul10], list );
	var pActual = FPO.std.ap()( [mul10] )()( list );
	var qActual = FPO.std.ap( [mul10,div2], list );
	var tActual = FPO.std.ap( undefined, list );
	var sActual = FPO.std.ap( [], list );
	var uActual = FPO.std.ap( [mul10], undefined );
	var hActual = FPO.std.ap( [mul10], [] );
	var jActual = FPO.std.ap( [checkParams,checkParams], list );

	assert.expect( 8 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "two functions" );
	assert.deepEqual( tActual, tExpected, "undefined functions" );
	assert.deepEqual( sActual, sExpected, "empty functions" );
	assert.deepEqual( uActual, uExpected, "array undefined" );
	assert.deepEqual( hActual, hExpected, "array empty" );
	assert.deepEqual( jActual, jExpected, "functions params check" );
} );

QUnit.test( "reduce()", function test(assert){
	function checkParams({ acc, v, i, arr }) {
		if (
			arr === list &&
			typeof acc == "string" && typeof v == "string" &&
			typeof i == "number" && _isArray( arr ) &&
			Number( v ) === (i + 1) && arr[i] === v
		) {
			return acc + v;
		}
		return NaN;
	}
	function concat({ acc, v }) { return acc + v; }

	var list = ["1","2","3","4","5"];

	var rExpected = "12345";
	var pExpected = "12345";
	var qExpected = "012345";
	var tExpected = undefined;
	var sExpected = "0";
	var uExpected = "12345";

	var rActual = FPO.reduce( {fn: concat, arr: list} );
	var pActual = FPO.reduce()( {} )( {fn: concat} )()( {arr: list} );
	var qActual = FPO.reduce( {fn: concat, arr: list, v: "0"} );
	var tActual = FPO.reduce( {fn: concat, arr: undefined} );
	var sActual = FPO.reduce( {fn: concat, arr: [], v: "0"} );
	var uActual = FPO.reduce( {fn: checkParams, arr: list} );

	assert.expect( 6 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "initial value" );
	assert.strictEqual( tActual, tExpected, "array undefined" );
	assert.strictEqual( sActual, sExpected, "array empty, initial value" );
	assert.strictEqual( uActual, uExpected, "reducer params check" );
} );

QUnit.test( "std.reduce()", function test(assert){
	function checkParams(acc,v,i,arr) {
		if (
			arr === list &&
			typeof acc == "string" && typeof v == "string" &&
			typeof i == "number" && _isArray( arr ) &&
			Number( v ) === (i + 1) && arr[i] === v
		) {
			return acc + v;
		}
		return NaN;
	}
	function concat(acc,v) { return acc + v; }

	var list = ["1","2","3","4","5"];

	var rExpected = "12345";
	var pExpected = "12345";
	var qExpected = "012345";
	var tExpected = undefined;
	var sExpected = "0";
	var uExpected = "12345";

	var rActual = FPO.std.reduce( concat, undefined, list );
	var pActual = FPO.std.reduce()( concat )()( undefined )()( list );
	var qActual = FPO.std.reduce( concat, "0", list );
	var tActual = FPO.std.reduce( concat, undefined, undefined );
	var sActual = FPO.std.reduce( concat, "0", [] );
	var uActual = FPO.std.reduce( checkParams, undefined, list );

	assert.expect( 6 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "initial value" );
	assert.strictEqual( tActual, tExpected, "array undefined" );
	assert.strictEqual( sActual, sExpected, "array empty, initial value" );
	assert.strictEqual( uActual, uExpected, "reducer params check" );
} );

QUnit.test( "reduceObj()", function test(assert){
	function checkParams({ acc, v, i, o }) {
		if (
			o === obj &&
			typeof acc == "string" && typeof v == "string" &&
			typeof i == "string" && _isObject( o ) &&
			o[i] === v
		) {
			return acc + v;
		}
		return NaN;
	}
	function concat({ acc, v }) { return acc + v; }

	var obj = {a: "1", b: "2", c: "3", d: "4", e: "5"};

	var rExpected = "12345";
	var pExpected = "12345";
	var qExpected = "012345";
	var tExpected = undefined;
	var sExpected = "0";
	var uExpected = "12345";

	var rActual = FPO.reduceObj( {fn: concat, o: obj} );
	var pActual = FPO.reduceObj()( {} )( {fn: concat} )()( {o: obj} );
	var qActual = FPO.reduceObj( {fn: concat, o: obj, v: "0"} );
	var tActual = FPO.reduceObj( {fn: concat, o: undefined} );
	var sActual = FPO.reduceObj( {fn: concat, o: [], v: "0"} );
	var uActual = FPO.reduceObj( {fn: checkParams, o: obj} );

	assert.expect( 6 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "initial value" );
	assert.strictEqual( tActual, tExpected, "array undefined" );
	assert.strictEqual( sActual, sExpected, "array empty, initial value" );
	assert.strictEqual( uActual, uExpected, "reducer params check" );
} );

QUnit.test( "std.reduceObj()", function test(assert){
	function checkParams(acc,v,i,o) {
		if (
			o === obj &&
			typeof acc == "string" && typeof v == "string" &&
			typeof i == "string" && _isObject( o ) &&
			o[i] === v
		) {
			return acc + v;
		}
		return NaN;
	}
	function concat(acc, v) { return acc + v; }

	var obj = {a: "1", b: "2", c: "3", d: "4", e: "5"};

	var rExpected = "12345";
	var pExpected = "12345";
	var qExpected = "012345";
	var tExpected = undefined;
	var sExpected = "0";
	var uExpected = "12345";

	var rActual = FPO.std.reduceObj( concat, undefined, obj );
	var pActual = FPO.std.reduceObj()( concat )()( undefined )()( obj );
	var qActual = FPO.std.reduceObj( concat, "0", obj );
	var tActual = FPO.std.reduceObj( concat, undefined, undefined );
	var sActual = FPO.std.reduceObj( concat, "0", {} );
	var uActual = FPO.std.reduceObj( checkParams, undefined, obj );

	assert.expect( 6 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "initial value" );
	assert.strictEqual( tActual, tExpected, "object undefined" );
	assert.strictEqual( sActual, sExpected, "object empty, initial value" );
	assert.strictEqual( uActual, uExpected, "reducer params check" );
} );

QUnit.test( "reduceRight()", function test(assert){
	function checkParams({ acc, v, i, arr }) {
		if (
			arr === list &&
			typeof acc == "string" && typeof v == "string" &&
			typeof i == "number" && _isArray( arr ) &&
			Number( v ) === (i + 1) && arr[i] === v
		) {
			return acc + v;
		}
		return NaN;
	}
	function concat({ acc, v }) { return acc + v; }

	var list = ["1","2","3","4","5"];

	var rExpected = "54321";
	var pExpected = "54321";
	var qExpected = "654321";
	var tExpected = undefined;
	var sExpected = "6";
	var uExpected = "54321";

	var rActual = FPO.reduceRight( {fn: concat, arr: list} );
	var pActual = FPO.reduceRight()( {} )( {fn: concat} )()( {arr: list} );
	var qActual = FPO.reduceRight( {fn: concat, arr: list, v: "6"} );
	var tActual = FPO.reduceRight( {fn: concat, arr: undefined} );
	var sActual = FPO.reduceRight( {fn: concat, arr: [], v: "6"} );
	var uActual = FPO.reduceRight( {fn: checkParams, arr: list} );

	assert.expect( 6 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "initial value" );
	assert.strictEqual( tActual, tExpected, "array undefined" );
	assert.strictEqual( sActual, sExpected, "array empty, initial value" );
	assert.strictEqual( uActual, uExpected, "reducer params check" );
} );

QUnit.test( "std.reduceRight()", function test(assert){
	function checkParams(acc,v,i,arr) {
		if (
			arr === list &&
			typeof acc == "string" && typeof v == "string" &&
			typeof i == "number" && _isArray( arr ) &&
			Number( v ) === (i + 1) && arr[i] === v
		) {
			return acc + v;
		}
		return NaN;
	}
	function concat(acc,v) { return acc + v; }

	var list = ["1","2","3","4","5"];

	var rExpected = "54321";
	var pExpected = "54321";
	var qExpected = "654321";
	var tExpected = undefined;
	var sExpected = "6";
	var uExpected = "54321";

	var rActual = FPO.std.reduceRight( concat, undefined, list );
	var pActual = FPO.std.reduceRight()( concat )()( undefined )()( list );
	var qActual = FPO.std.reduceRight( concat, "6", list );
	var tActual = FPO.std.reduceRight( concat, undefined, undefined );
	var sActual = FPO.std.reduceRight( concat, "6", [] );
	var uActual = FPO.std.reduceRight( checkParams, undefined, list );

	assert.expect( 6 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "initial value" );
	assert.strictEqual( tActual, tExpected, "array undefined" );
	assert.strictEqual( sActual, sExpected, "array empty, initial value" );
	assert.strictEqual( uActual, uExpected, "reducer params check" );
} );

QUnit.test( "flatten()", function test(assert){
	var list = [1,2,[3,[4,5]]];

	var rExpected = [1,2,3,4,5];
	var pExpected = [1,2,3,4,5];
	var qExpected = [1,2,3,4,5];
	var tExpected = [1,2,3,4,5];
	var sExpected = [1,2,3,4,5];
	var uExpected = [1,2,3,[4,5]];
	var hExpected = [1,2,[3,[4,5]]];
	var jExpected = [1,2,[3,[4,5]]];
	var kExpected = [];
	var mExpected = [];

	var rActual = FPO.flatten( {v: list} );
	var pActual = FPO.flatten()( {} )( {v: list} );
	var qActual = FPO.flatten( {n: undefined, v: list} );
	var tActual = FPO.flatten( {n: 5, v: list} );
	var sActual = FPO.flatten( {n: 2, v: list} );
	var uActual = FPO.flatten( {n: 1, v: list} );
	var hActual = FPO.flatten( {n: 0, v: list} );
	var jActual = FPO.flatten( {n: "-whatever-", v: list} );
	var kActual = FPO.flatten( {v: undefined} );
	var mActual = FPO.flatten( {v: []} );

	assert.expect( 10 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "depth undefined" );
	assert.deepEqual( tActual, tExpected, "depth larger" );
	assert.deepEqual( sActual, sExpected, "depth equal" );
	assert.deepEqual( uActual, uExpected, "depth less" );
	assert.deepEqual( hActual, hExpected, "depth zero" );
	assert.deepEqual( jActual, jExpected, "depth not-a-number" );
	assert.deepEqual( kActual, kExpected, "array undefined" );
	assert.deepEqual( mActual, mExpected, "array empty" );
} );

QUnit.test( "std.flatten()", function test(assert){
	var list = [1,2,[3,[4,5]]];

	var rExpected = [1,2,3,4,5];
	var pExpected = [1,2,3,4,5];
	var qExpected = [1,2,3,4,5];
	var tExpected = [1,2,3,4,5];
	var sExpected = [1,2,3,4,5];
	var uExpected = [1,2,3,[4,5]];
	var hExpected = [1,2,[3,[4,5]]];
	var jExpected = [1,2,[3,[4,5]]];
	var kExpected = [];
	var mExpected = [];

	var rActual = FPO.std.flatten( list );
	var pActual = FPO.std.flatten()( list );
	var qActual = FPO.std.flatten( list, undefined );
	var tActual = FPO.std.flatten( list, 5 );
	var sActual = FPO.std.flatten( list, 2 );
	var uActual = FPO.std.flatten( list, 1 );
	var hActual = FPO.std.flatten( list, 0 );
	var jActual = FPO.std.flatten( list, "-whatever-" );
	var kActual = FPO.std.flatten( undefined );
	var mActual = FPO.std.flatten( [] );

	assert.expect( 10 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "depth undefined" );
	assert.deepEqual( tActual, tExpected, "depth larger" );
	assert.deepEqual( sActual, sExpected, "depth equal" );
	assert.deepEqual( uActual, uExpected, "depth less" );
	assert.deepEqual( hActual, hExpected, "depth zero" );
	assert.deepEqual( jActual, jExpected, "depth not-a-number" );
	assert.deepEqual( kActual, kExpected, "array undefined" );
	assert.deepEqual( mActual, mExpected, "array empty" );
} );

QUnit.test( "zip()", function test(assert){
	var list1 = [1,4,7];
	var list2 = [2,5,8];
	var list3 = [3,6];

	var rExpected = [[1,2],[4,5],[7,8]];
	var pExpected = [[1,2],[4,5],[7,8]];
	var qExpected = [[1,3],[4,6]];
	var tExpected = [[3,1],[6,4]];
	var sExpected = [];
	var uExpected = [];
	var hExpected = [];

	var rActual = FPO.zip( {arr1: list1, arr2: list2} );
	var pActual = FPO.zip()( {} )( {arr1: list1} )()( {} )( {arr2: list2} );
	var qActual = FPO.zip( {arr1: list1, arr2: list3} );
	var tActual = FPO.zip( {arr1: list3, arr2: list1} );
	var sActual = FPO.zip( {arr1: list1, arr2: undefined} );
	var uActual = FPO.zip( {arr1: undefined, arr2: undefined} );
	var hActual = FPO.zip( {arr1: [], arr2: []} );

	assert.expect( 7 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "longer list, shorter list" );
	assert.deepEqual( tActual, tExpected, "shorter list, longer list" );
	assert.deepEqual( sActual, sExpected, "one list undefined" );
	assert.deepEqual( uActual, uExpected, "both lists undefined" );
	assert.deepEqual( hActual, hExpected, "both lists empty" );
} );

QUnit.test( "std.zip()", function test(assert){
	var list1 = [1,4,7];
	var list2 = [2,5,8];
	var list3 = [3,6];

	var rExpected = [[1,2],[4,5],[7,8]];
	var pExpected = [[1,2],[4,5],[7,8]];
	var qExpected = [[1,3],[4,6]];
	var tExpected = [[3,1],[6,4]];
	var sExpected = [];
	var uExpected = [];
	var hExpected = [];

	var rActual = FPO.std.zip( list1, list2 );
	var pActual = FPO.std.zip()( list1 )()( list2 );
	var qActual = FPO.std.zip( list1, list3 );
	var tActual = FPO.std.zip( list3, list1 );
	var sActual = FPO.std.zip( list1, undefined );
	var uActual = FPO.std.zip( undefined, undefined );
	var hActual = FPO.std.zip( [], [] );

	assert.expect( 7 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "longer list, shorter list" );
	assert.deepEqual( tActual, tExpected, "shorter list, longer list" );
	assert.deepEqual( sActual, sExpected, "one list undefined" );
	assert.deepEqual( uActual, uExpected, "both lists undefined" );
	assert.deepEqual( hActual, hExpected, "both lists empty" );
} );

QUnit.test( "trampoline()", function test(assert){
	function sum(total,x) {
		if (x <= 1) return total + x;
		return () => sum( total + x, x - 1 );
	}

	var args = [0,5];

	var rExpected = 15;
	var pExpected = 15;

	var rActual = FPO.trampoline( {fn: sum} )( ...args );
	var pActual = FPO.trampoline()( {} )( {fn: sum} )( ...args );

	assert.expect( 2 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "std.trampoline()", function test(assert){
	function sum(total,x) {
		if (x <= 1) return total + x;
		return () => sum( total + x, x - 1 );
	}

	var args = [0,5];

	var rExpected = 15;
	var pExpected = 15;

	var rActual = FPO.std.trampoline( sum )( ...args );
	var pActual = FPO.std.trampoline()( sum )( ...args );

	assert.expect( 2 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "transducers.map()", function test(assert){
	function decrement({v: num}) { return num - 1; }
	function sum({acc: total, v: num}) { return total + num; }

	var args = {acc: 3, v: 8};

	var rExpected = 10;
	var pExpected = 10;

	var rActual = FPO.transducers.map( {fn: decrement} )( {v: sum} )( args );
	var pActual = FPO.transducers.map()( {} )( {fn: decrement} )( {v: sum} )( args );

	assert.expect( 2 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "std.transducers.map()", function test(assert){
	function decrement(num) { return num - 1; }
	function sum(total,num) { return total + num; }

	var args = [3,8];

	var rExpected = 10;
	var pExpected = 10;

	var rActual = FPO.std.transducers.map( decrement )( sum )( ...args );
	var pActual = FPO.std.transducers.map()( decrement )( sum )( ...args );

	assert.expect( 2 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "transducers.filter()", function test(assert){
	function isSmallEnough({v: num}) { return num <= 10; }
	function passThru({v}) { return v; }
	function alwaysFalse() { return false; }

	var args = { v: 4 };

	var rExpected = 4;
	var pExpected = 4;
	var qExpected = undefined;
	var tExpected = undefined;

	var rActual = FPO.transducers.filter( {fn: isSmallEnough} )( {v: passThru} )( args );
	var pActual = FPO.transducers.filter()( {} )( {fn: isSmallEnough} )( {v: passThru} )( args );
	var qActual = FPO.transducers.filter( {fn: alwaysFalse} )( {v: passThru} )( args );
	var tActual = FPO.transducers.filter( {fn: passThru} )( {v: passThru} )( undefined );

	assert.expect( 4 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "with failing predicate" );
	assert.strictEqual( tActual, tExpected, "no args" );
} );

QUnit.test( "std.transducers.filter()", function test(assert){
	function isSmallEnough(num) { return num <= 10; }
	function passThru(acc,v) { return v; }
	function alwaysFalse() { return false; }

	var args = [undefined,4];

	var rExpected = 4;
	var pExpected = 4;
	var qExpected = undefined;

	var rActual = FPO.std.transducers.filter( isSmallEnough )( passThru )( ...args );
	var pActual = FPO.std.transducers.filter()( isSmallEnough )( passThru )( ...args );
	var qActual = FPO.std.transducers.filter( alwaysFalse )( passThru )( ...args );

	assert.expect( 3 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "with failing predicate" );
} );

QUnit.test( "transducers.string", function test(assert){
	var str1 = "hello";
	var str2 = "world";

	var rExpected = "helloworld";
	var pExpected = "helloworld";

	var rActual = FPO.transducers.string( {acc: str1, v: str2} );
	var pActual = FPO.transducers.string()( {} )( {acc: str1} )( {v: str2} );

	assert.expect( 2 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "std.transducers.string", function test(assert){
	var str1 = "hello";
	var str2 = "world";

	var rExpected = "helloworld";
	var pExpected = "helloworld";

	var rActual = FPO.std.transducers.string( str1, str2 );
	var pActual = FPO.std.transducers.string()( str1 )( str2 );

	assert.expect( 2 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "transducers.array", function test(assert){
	var arr1 = [];
	var arr2 = [];
	var str = "hello";

	var rExpected = ["hello"];
	var pExpected = ["hello"];

	var rActual = FPO.transducers.array( {acc: arr1, v: str} );
	var pActual = FPO.transducers.array()( {} )( {acc: arr2} )( {v: str} );

	assert.expect( 2 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "std.transducers.array", function test(assert){
	var arr1 = [];
	var arr2 = [];
	var str = "hello";

	var rExpected = ["hello"];
	var pExpected = ["hello"];

	var rActual = FPO.std.transducers.array( arr1, str );
	var pActual = FPO.std.transducers.array()( arr2 )( str );

	assert.expect( 2 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "transducers.number", function test(assert){
	var num1 = 4;
	var num2 = 3;

	var rExpected = 7;
	var pExpected = 7;

	var rActual = FPO.transducers.number( {acc: num1, v: num2} );
	var pActual = FPO.transducers.number()( {} )( {acc: num1} )( {v: num2} );

	assert.expect( 2 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "std.transducers.number", function test(assert){
	var num1 = 4;
	var num2 = 3;

	var rExpected = 7;
	var pExpected = 7;

	var rActual = FPO.std.transducers.number( num1, num2 );
	var pActual = FPO.std.transducers.number()( num1 )( num2 );

	assert.expect( 2 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "transducers.booleanAnd", function test(assert){
	var bool1 = true;
	var bool2 = true;
	var bool3 = false;

	var rExpected = true;
	var pExpected = true;
	var qExpected = false;
	var tExpected = false;

	var rActual = FPO.transducers.booleanAnd( {acc: bool1, v: bool2} );
	var pActual = FPO.transducers.booleanAnd()( {} )( {acc: bool1} )( {v: bool2} );
	var qActual = FPO.transducers.booleanAnd( {acc: bool1, v: bool3} );
	var tActual = FPO.transducers.booleanAnd( {acc: bool3, v: bool3} );

	assert.expect( 4 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "mixed parity" );
	assert.strictEqual( tActual, tExpected, "both false" );
} );

QUnit.test( "std.transducers.booleanAnd", function test(assert){
	var bool1 = true;
	var bool2 = true;
	var bool3 = false;

	var rExpected = true;
	var pExpected = true;
	var qExpected = false;
	var tExpected = false;

	var rActual = FPO.std.transducers.booleanAnd( bool1, bool2 );
	var pActual = FPO.std.transducers.booleanAnd()( bool1 )( bool2 );
	var qActual = FPO.std.transducers.booleanAnd( bool1, bool3 );
	var tActual = FPO.std.transducers.booleanAnd( bool3, bool3 );

	assert.expect( 4 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "mixed parity" );
	assert.strictEqual( tActual, tExpected, "both false" );
} );

QUnit.test( "transducers.booleanOr", function test(assert){
	var bool1 = true;
	var bool2 = true;
	var bool3 = false;

	var rExpected = true;
	var pExpected = true;
	var qExpected = true;
	var tExpected = false;

	var rActual = FPO.transducers.booleanOr( {acc: bool1, v: bool2} );
	var pActual = FPO.transducers.booleanOr()( {} )( {acc: bool1} )( {v: bool2} );
	var qActual = FPO.transducers.booleanOr( {acc: bool1, v: bool3} );
	var tActual = FPO.transducers.booleanOr( {acc: bool3, v: bool3} );

	assert.expect( 4 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "mixed parity" );
	assert.strictEqual( tActual, tExpected, "both false" );
} );

QUnit.test( "std.transducers.booleanOr", function test(assert){
	var bool1 = true;
	var bool2 = true;
	var bool3 = false;

	var rExpected = true;
	var pExpected = true;
	var qExpected = true;
	var tExpected = false;

	var rActual = FPO.std.transducers.booleanOr( bool1, bool2 );
	var pActual = FPO.std.transducers.booleanOr()( bool1 )( bool2 );
	var qActual = FPO.std.transducers.booleanOr( bool1, bool3 );
	var tActual = FPO.std.transducers.booleanOr( bool3, bool3 );

	assert.expect( 4 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "mixed parity" );
	assert.strictEqual( tActual, tExpected, "both false" );
} );

QUnit.test( "transducers.default", function test(assert){
	var arr = [1,2];

	var rExpected = [1,2];
	var pExpected = [1,2];

	var rActual = FPO.transducers.default( {acc: arr} );
	var pActual = FPO.transducers.default()( {} )( {acc: arr} );

	assert.expect( 2 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "std.transducers.default", function test(assert){
	var arr = [1,2];

	var rExpected = [1,2];
	var pExpected = [1,2];

	var rActual = FPO.std.transducers.default( arr );
	var pActual = FPO.std.transducers.default()( arr );

	assert.expect( 2 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "transducers.transduce()", function test(assert){
	function isSmallEnough({v: num}) { return num <= 10; }
	function isBigEnough({v: num}) { return num >= 5; }
	function decrement({v: num}) { return num - 1; }
	function mult({acc: product, v: num}) { return product * num; }
	function passThruReducer({ acc, v}) { acc.push( v ); return acc; }

	var nums = [3,7,2,5,11,10,4,6];
	var mapTransducer = FPO.transducers.map( {fn: decrement} );
	var composedTransducer = FPO.compose( {fns: [
		FPO.transducers.filter( {fn: isSmallEnough} ),
		FPO.transducers.filter( {fn: isBigEnough} ),
		mapTransducer
	]} );

	var rExpected = 1080;
	var pExpected = 1080;
	var qExpected = [6,4,9,5];
	var tExpected = [2,6,1,4,10,9,3,5];
	var sExpected = 1;

	var rActual = FPO.transducers.transduce( {fn: composedTransducer, co: mult, v: 1, arr: nums} );
	var pActual = FPO.transducers.transduce()( {} )( {fn: composedTransducer, co: mult} )( {v: 1, arr: nums} );
	var qActual = FPO.transducers.transduce( {fn: composedTransducer, co: passThruReducer, v: [], arr: nums} );
	var tActual = FPO.transducers.transduce( {fn: mapTransducer, co: passThruReducer, v: [], arr: nums} );
	var sActual = FPO.transducers.transduce( {fn: composedTransducer, co: mult, v: 1, arr: undefined} );

	assert.expect( 5 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried call" );
	assert.deepEqual( qActual, qExpected, "pass-thru reducer" );
	assert.deepEqual( tActual, tExpected, "non-composed transducer" );
	assert.deepEqual( sActual, sExpected, "no list" );
} );

QUnit.test( "std.transducers.transduce()", function test(assert){
	function isSmallEnough(num) { return num <= 10; }
	function isBigEnough(num) { return num >= 5; }
	function decrement(num) { return num - 1; }
	function mult(product,num) { return product * num; }
	function passThruReducer(acc,v) { acc.push( v ); return acc; }

	var nums = [3,7,2,5,11,10,4,6];
	var mapTransducer = FPO.std.transducers.map( decrement );
	var composedTransducer = FPO.std.compose( [
		FPO.std.transducers.filter( isSmallEnough ),
		FPO.std.transducers.filter( isBigEnough ),
		mapTransducer
	] );

	var rExpected = 1080;
	var pExpected = 1080;
	var qExpected = [6,4,9,5];
	var tExpected = [2,6,1,4,10,9,3,5];
	var sExpected = 1;

	var rActual = FPO.std.transducers.transduce( composedTransducer, mult, 1, nums );
	var pActual = FPO.std.transducers.transduce()( composedTransducer, mult )( 1, nums );
	var qActual = FPO.std.transducers.transduce( composedTransducer, passThruReducer, [], nums );
	var tActual = FPO.std.transducers.transduce( mapTransducer, passThruReducer, [], nums );
	var sActual = FPO.std.transducers.transduce( composedTransducer, mult, 1, undefined );

	assert.expect( 5 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried call" );
	assert.deepEqual( qActual, qExpected, "pass-thru reducer" );
	assert.deepEqual( tActual, tExpected, "non-composed transducer" );
	assert.deepEqual( sActual, sExpected, "no list" );
} );

QUnit.test( "transducers.into()", function test(assert){
	function isSmallEnough({v: num}) { return num <= 10; }
	function isBigEnough({v: num}) { return num >= 5; }
	function decrement({v: num}) { return num - 1; }

	var nums = [3,7,2,5,11,10,4,6];
	var bools = [true,true,true,true];
	var mapTransducer = FPO.transducers.map( {fn: decrement} );
	var composedTransducer = FPO.compose( {fns: [
		FPO.transducers.filter( {fn: isSmallEnough} ),
		FPO.transducers.filter( {fn: isBigEnough} ),
		mapTransducer
	]} );

	var rExpected = "6495";
	var pExpected = "6495";
	var qExpected = [6,4,9,5];
	var tExpected = 24;
	var sExpected = true;
	var uExpected = false;
	var hExpected = [2,6,1,4,10,9,3,5];
	var jExpected = {};
	var kExpected = 1;

	var rActual = FPO.transducers.into( {fn: composedTransducer, v: "", arr: nums} );
	var pActual = FPO.transducers.into()( {} )( {fn: composedTransducer} )({ v: "", arr: nums} );
	var qActual = FPO.transducers.into( {fn: composedTransducer, v: [], arr: nums} );
	var tActual = FPO.transducers.into( {fn: composedTransducer, v: 0, arr: nums} );
	var sActual = FPO.transducers.into( {fn: composedTransducer, v: true, arr: bools} );
	var uActual = FPO.transducers.into( {fn: composedTransducer, v: false, arr: bools} );
	var hActual = FPO.transducers.into( {fn: mapTransducer, v: [], arr: nums} );
	var jActual = FPO.transducers.into( {fn: mapTransducer, v: {}, arr: nums} );
	var kActual = FPO.transducers.into( {fn: mapTransducer, v: 1, arr: undefined} );

	assert.expect( 9 );
	assert.strictEqual( rActual, rExpected, "regular call, string" );
	assert.strictEqual( pActual, pExpected, "curried, string" );
	assert.deepEqual( qActual, qExpected, "array" );
	assert.strictEqual( tActual, tExpected, "number" );
	assert.strictEqual( sActual, sExpected, "boolean true" );
	assert.strictEqual( uActual, uExpected, "boolean false" );
	assert.deepEqual( hActual, hExpected, "non-composed transducer" );
	assert.deepEqual( jActual, jExpected, "default transducer" );
	assert.strictEqual( kActual, kExpected, "no list" );
} );

QUnit.test( "std.transducers.into()", function test(assert){
	function isSmallEnough(num) { return num <= 10; }
	function isBigEnough(num) { return num >= 5; }
	function decrement(num) { return num - 1; }

	var nums = [3,7,2,5,11,10,4,6];
	var bools = [true,true,true,true];
	var mapTransducer = FPO.std.transducers.map( decrement );
	var composedTransducer = FPO.std.compose( [
		FPO.std.transducers.filter( isSmallEnough ),
		FPO.std.transducers.filter( isBigEnough ),
		mapTransducer
	] );

	var rExpected = "6495";
	var pExpected = "6495";
	var qExpected = [6,4,9,5];
	var tExpected = 24;
	var sExpected = true;
	var uExpected = false;
	var hExpected = [2,6,1,4,10,9,3,5];
	var jExpected = {};
	var kExpected = 1;

	var rActual = FPO.std.transducers.into( composedTransducer, "", nums );
	var pActual = FPO.std.transducers.into()( composedTransducer )( "", nums );
	var qActual = FPO.std.transducers.into( composedTransducer, [], nums );
	var tActual = FPO.std.transducers.into( composedTransducer, 0, nums );
	var sActual = FPO.std.transducers.into( composedTransducer, true, bools );
	var uActual = FPO.std.transducers.into( composedTransducer, false, bools );
	var hActual = FPO.std.transducers.into( mapTransducer, [], nums );
	var jActual = FPO.std.transducers.into( mapTransducer, {}, nums );
	var kActual = FPO.std.transducers.into( mapTransducer, 1, undefined );

	assert.expect( 9 );
	assert.strictEqual( rActual, rExpected, "regular call, string" );
	assert.strictEqual( pActual, pExpected, "curried, string" );
	assert.deepEqual( qActual, qExpected, "array" );
	assert.strictEqual( tActual, tExpected, "number" );
	assert.strictEqual( sActual, sExpected, "boolean true" );
	assert.strictEqual( uActual, uExpected, "boolean false" );
	assert.deepEqual( hActual, hExpected, "non-composed transducer" );
	assert.deepEqual( jActual, jExpected, "default transducer" );
	assert.strictEqual( kActual, kExpected, "no list" );
} );

QUnit.test( "std.flip()", function test(assert){
	function foo(...args) { return args; }

	var args = [1,2,3,4];

	var rExpected = [2,1,3,4];
	var pExpected = [2,1,3,4];

	var rActual = FPO.std.flip( foo )( ...args );
	var pActual = FPO.std.flip()( foo )( ...args );

	assert.expect( 2 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "std.reverseArgs()", function test(assert){
	function foo(...args) { return args; }

	var args = [1,2,3,4];

	var rExpected = [4,3,2,1];
	var pExpected = [4,3,2,1];

	var rActual = FPO.std.reverseArgs( foo )( ...args );
	var pActual = FPO.std.reverseArgs()( foo )( ...args );

	assert.expect( 2 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
} );

QUnit.test( "head()", function test(assert){
	var arr = [1,2,3,4];
	var str = "abc";
	var obj = { 0: 5 };

	var rExpected = 1;
	var pExpected = 1;
	var qExpected = undefined;
	var tExpected = "a";
	var sExpected = 5;
	var uExpected = null;
	var hExpected = undefined;

	var rActual = FPO.head( {v: arr} );
	var pActual = FPO.head()( {} )( {v: arr} );
	var qActual = FPO.head( {v: []} );
	var tActual = FPO.head( {v: str} );
	var sActual = FPO.head( {v: obj} );
	var uActual = FPO.head( {v: null} );
	var hActual = FPO.head( {v: undefined} );

	assert.expect( 7 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "empty array" );
	assert.strictEqual( tActual, tExpected, "string" );
	assert.strictEqual( sActual, sExpected, "object" );
	assert.strictEqual( uActual, uExpected, "null" );
	assert.strictEqual( hActual, hExpected, "undefined" );
} );

QUnit.test( "std.head()", function test(assert){
	var arr = [1,2,3,4];
	var str = "abc";
	var obj = { 0: 5 };

	var rExpected = 1;
	var pExpected = 1;
	var qExpected = undefined;
	var tExpected = "a";
	var sExpected = 5;
	var uExpected = null;

	var rActual = FPO.std.head( arr );
	var pActual = FPO.std.head()( arr );
	var qActual = FPO.std.head( [] );
	var tActual = FPO.std.head( str );
	var sActual = FPO.std.head( obj );
	var uActual = FPO.std.head( null );

	assert.expect( 6 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "curried" );
	assert.strictEqual( qActual, qExpected, "empty array" );
	assert.strictEqual( tActual, tExpected, "string" );
	assert.strictEqual( sActual, sExpected, "object" );
	assert.strictEqual( uActual, uExpected, "null" );
} );

QUnit.test( "tail()", function test(assert){
	var arr = [1,2,3,4];
	var str = "abc";
	var obj = {0: 5, 1: 6};

	var rExpected = [2,3,4];
	var pExpected = [2,3,4];
	var qExpected = [];
	var tExpected = "bc";
	var sExpected = {1: 6};
	var uExpected = null;
	var hExpected = [];

	var rActual = FPO.tail( {v: arr} );
	var pActual = FPO.tail()( {} )( {v: arr} );
	var qActual = FPO.tail( {v: []} );
	var tActual = FPO.tail( {v: str} );
	var sActual = FPO.tail( {v: obj} );
	var uActual = FPO.tail( {v: null} );
	var hActual = FPO.tail( {v: undefined} );

	assert.expect( 7 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "empty array" );
	assert.strictEqual( tActual, tExpected, "string" );
	assert.deepEqual( sActual, sExpected, "object" );
	assert.strictEqual( uActual, uExpected, "null" );
	assert.deepEqual( hActual, hExpected, "undefined" );
} );

QUnit.test( "std.tail()", function test(assert){
	var arr = [1,2,3,4];
	var str = "abc";
	var obj = {0: 5, 1: 6};

	var rExpected = [2,3,4];
	var pExpected = [2,3,4];
	var qExpected = [];
	var tExpected = "bc";
	var sExpected = {1: 6};
	var uExpected = null;

	var rActual = FPO.std.tail( arr );
	var pActual = FPO.std.tail()( arr );
	var qActual = FPO.std.tail( [] );
	var tActual = FPO.std.tail( str );
	var sActual = FPO.std.tail( obj );
	var uActual = FPO.std.tail( null );

	assert.expect( 6 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "empty array" );
	assert.strictEqual( tActual, tExpected, "string" );
	assert.deepEqual( sActual, sExpected, "object" );
	assert.strictEqual( uActual, uExpected, "null" );
} );

QUnit.test( "take()", function test(assert){
	var arr = [1,2,3,4];
	var str = "abc";

	var rExpected = [1,2];
	var pExpected = [1,2];
	var qExpected = [1];
	var tExpected = [];
	var sExpected = "ab";
	var uExpected = [];
	var hExpected = [];

	var rActual = FPO.take( {v: arr, n: 2} );
	var pActual = FPO.take()( {} )( {v: arr, n: 2} );
	var qActual = FPO.take( {v: arr} );
	var tActual = FPO.take( {v: [], n: 2} );
	var sActual = FPO.take( {v: str, n: 2} );
	var uActual = FPO.take( {v: null} );
	var hActual = FPO.take( {v: undefined} );

	assert.expect( 7 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "default n" );
	assert.deepEqual( tActual, tExpected, "empty array" );
	assert.strictEqual( sActual, sExpected, "string" );
	assert.deepEqual( uActual, uExpected, "null" );
	assert.deepEqual( hActual, hExpected, "undefined" );
} );

QUnit.test( "std.take()", function test(assert){
	var arr = [1,2,3,4];
	var str = "abc";

	var rExpected = [1,2];
	var pExpected = [1,2];
	var qExpected = [1];
	var tExpected = [];
	var sExpected = "ab";
	var uExpected = [];

	var rActual = FPO.std.take( arr, 2 );
	var pActual = FPO.std.take()( arr, 2 );
	var qActual = FPO.std.take( arr );
	var tActual = FPO.std.take( [], undefined );
	var sActual = FPO.std.take( str, 2 );
	var uActual = FPO.std.take( null );

	assert.expect( 6 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "default n" );
	assert.deepEqual( tActual, tExpected, "empty array" );
	assert.strictEqual( sActual, sExpected, "string" );
	assert.deepEqual( uActual, uExpected, "null" );
} );

QUnit.test( "memoize()", function test(assert){
	function increment(x) { counter++; return x + 1; }
	function mult(x,y) { counter++; return x * y; }
	function add({ x, y }) { counter++; return x + y; }

	var counter = 0;
	var fn1 = FPO.memoize( {fn: increment} );
	var fn2 = FPO.memoize()( {} )( {fn: mult} );
	var fn3 = FPO.memoize( {fn: mult, n: 1} );
	var fn4 = FPO.memoize( {fn: add} );

	var rExpected = 3;
	var pExpected = 3;
	var qExpected = 4;
	var tExpected = 4;
	var sExpected = NaN;
	var uExpected = NaN;
	var hExpected = 6;
	var jExpected = 6;
	var kExpected = 5;
	var mExpected = 5;
	var gExpected = 5;

	var rActual = fn1( 2 );
	var pActual = fn1( 2 );
	var qActual = fn2( 2, 2 );
	var tActual = fn2( 2, 2 );
	var sActual = fn2( 2 );
	var uActual = fn2( 2 );
	var hActual = fn3( 2, 3 );
	var jActual = fn3( 2, 4 );
	var kActual = fn4( {x: 2, y: 3} );
	var mActual = fn4( {x: 2, y: 3} );
	var gActual = counter;

	assert.expect( 11 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "regular call, repeated" );
	assert.strictEqual( qActual, qExpected, "curried" );
	assert.strictEqual( tActual, tExpected, "curried, repeated" );
	assert.ok( Object.is( sActual, sExpected ), "single primitive arg for binary function");
	assert.ok( Object.is( uActual, uExpected ), "single primitive arg for binary function, repeated");
	assert.strictEqual( hActual, hExpected, "only one arg memoized" );
	assert.strictEqual( jActual, jExpected, "only one arg memoized, repeated" );
	assert.strictEqual( kActual, kExpected, "object" );
	assert.strictEqual( mActual, mExpected, "object, repeated" );
	assert.strictEqual( gActual, gExpected, "counter" );
} );

QUnit.test( "std.memoize()", function test(assert){
	function increment(x) { counter++; return x + 1; }
	function mult(x,y) { counter++; return x * y; }
	function add({ x, y }) { counter++; return x + y; }

	var counter = 0;
	var fn1 = FPO.std.memoize( increment );
	var fn2 = FPO.std.memoize()( mult );
	var fn3 = FPO.std.memoize( mult, 1 );
	var fn4 = FPO.std.memoize( add );

	var rExpected = 3;
	var pExpected = 3;
	var qExpected = 4;
	var tExpected = 4;
	var sExpected = 6;
	var uExpected = 6;
	var hExpected = 5;
	var jExpected = 5;
	var kExpected = 4;

	var rActual = fn1( 2 );
	var pActual = fn1( 2 );
	var qActual = fn2( 2, 2 );
	var tActual = fn2( 2, 2 );
	var sActual = fn3( 2, 3 );
	var uActual = fn3( 2, 4 );
	var hActual = fn4( {x: 2, y: 3} );
	var jActual = fn4( {x: 2, y: 3} );
	var kActual = counter;

	assert.expect( 9 );
	assert.strictEqual( rActual, rExpected, "regular call" );
	assert.strictEqual( pActual, pExpected, "regular call, repeated" );
	assert.strictEqual( qActual, qExpected, "curried" );
	assert.strictEqual( tActual, tExpected, "curried, repeated" );
	assert.strictEqual( sActual, sExpected, "only one arg memoized" );
	assert.strictEqual( uActual, uExpected, "only one arg memoized, repeated" );
	assert.strictEqual( hActual, hExpected, "object" );
	assert.strictEqual( jActual, jExpected, "object, repeated" );
	assert.strictEqual( kActual, kExpected, "counter" );
} );

QUnit.test( "remap()", function test(assert){
	function foo(argsObj) { return argsObj; }

	var args = { a: 1, b: 2, c: 3 };
	var argsRemap = { B: "b", C: "c" };

	var rExpected = { a: 1, B: 2, C: 3 };
	var pExpected = { a: 1, B: 2, C: 3 };
	var qExpected = { a: 1, b: 2, c: 3 };
	var tExpected = { a: 1, b: 2, c: 3 };
	var sExpected = { a: 1, b: 2, c: 3 };

	var rActual = FPO.remap( {fn: foo, args: argsRemap} )( args );
	var pActual = FPO.remap()( {} )( {fn: foo} )()( {args: argsRemap} )( args );
	var qActual = FPO.remap( {fn: foo, args: {x: "y"}} )( args );
	var tActual = FPO.remap( {fn: foo, args: undefined} )( args );
	var sActual = FPO.remap( {fn: foo, args: {}} )( args );

	assert.expect( 6 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "props not present on source object" );
	assert.deepEqual( tActual, tExpected, "props undefined" );
	assert.deepEqual( sActual, sExpected, "props empty" );
	assert.notStrictEqual( args, qExpected, "object is cloned, not mutated" );
} );

QUnit.test( "std.remap()", function test(assert){
	function foo(argsObj) { return argsObj; }

	var args = { a: 1, b: 2, c: 3 };
	var argsRemap = { B: "b", C: "c" };

	var rExpected = { a: 1, B: 2, C: 3 };
	var pExpected = { a: 1, B: 2, C: 3 };
	var qExpected = { a: 1, b: 2, c: 3 };
	var tExpected = { a: 1, b: 2, c: 3 };
	var sExpected = { a: 1, b: 2, c: 3 };

	var rActual = FPO.std.remap( foo, argsRemap )( args );
	var pActual = FPO.std.remap()( foo )()( argsRemap )( args );
	var qActual = FPO.std.remap( foo, {x: "y"} )( args );
	var tActual = FPO.std.remap( foo, undefined )( args );
	var sActual = FPO.std.remap( foo, {} )( args );

	assert.expect( 6 );
	assert.deepEqual( rActual, rExpected, "regular call" );
	assert.deepEqual( pActual, pExpected, "curried" );
	assert.deepEqual( qActual, qExpected, "props not present on source object" );
	assert.deepEqual( tActual, tExpected, "props undefined" );
	assert.deepEqual( sActual, sExpected, "props empty" );
	assert.notStrictEqual( args, qExpected, "object is cloned, not mutated" );
} );






function _hasProp(obj,prop) {
	return Object.hasOwnProperty.call( obj, prop );
}

function _isFunction(v) {
	return typeof v == "function";
}

function _isObject(v) {
	return v && typeof v == "object" && !_isArray( v );
}

function _isArray(v) {
	return Array.isArray( v );
}
