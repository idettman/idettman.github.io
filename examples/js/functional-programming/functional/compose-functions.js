
// http://scott.sauyet.com/Javascript/Talk/Compose/2013-05-22/#slide-14

// Simpliest, but only allows one argument to be passed and looses track of the 'this' context
var compose = function(f, g) {
    return function(x) {
        return f(g(x));
    };
};

// This version fixes the two issues mentioned from the version above
var compose = function(f, g) {
    return function() {
        return f.call(this, g.apply(this, arguments));
    };
};

// Extended to handle multiple functions (http://scott.sauyet.com/Javascript/Talk/Compose/2013-05-22/#slide-17)
// This is very similar to Underscore's code
var compose = function() {
    var funcs = arguments;
    return function() {
        var args = arguments;
        for (var i = funcs.length; i --> 0;) {
            args = [funcs[i].apply(this, args)];
        }
        return args[0];
    };
};

// Argument Types (http://scott.sauyet.com/Javascript/Talk/Compose/2013-05-22/#slide-18)

// Our examples have used functions that returned the same type they accepted. 
// This is not important. 
// The essential feature is that each function accept the same type its predecessor generated:
var f = compose(negate, square, mult2, add1);
console.log(f(2));

var after = function(chr) {
    return function(str) {  // String ==> String
        var index = str.indexOf(chr);
        return (index < 0) ? "" : str.substring(index + 1);
    };
};

var splitOn = function(chr) {
    return function(str) {  // String ==> [String]
        return str.split(chr);
    };
};

var makeObj = function(desc) {  // [String] ==> Object
    return desc.reduce(function(obj, str) {
        var parts = str.split("=");
        obj[parts[0]] = parts[1];
        return obj;
    }, {});
};

var url = "http://example.com/fetch?product=widget&color=red&size=6";

var getConfig = compose(makeObj, splitOn("&"), after("?"));

console.log(getConfig(url));

