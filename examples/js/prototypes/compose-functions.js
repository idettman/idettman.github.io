
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
  const funcs = arguments
  return function() {
    let args = arguments
    for (let i = funcs.length; i --> 0;) {
            args = [funcs[i].apply(this, args)];
        }
        return args[0];
    };
};

// Argument Types (http://scott.sauyet.com/Javascript/Talk/Compose/2013-05-22/#slide-18)

// Our examples have used functions that returned the same type they accepted. 
// This is not important. 
// The essential feature is that each function accept the same type its predecessor generated:
const f = compose(negate, square, mult2, add1)
console.log(f(2));

const after = function(chr) {
  return function(str) {  // String ==> String
    const index = str.indexOf(chr)
    return (index < 0) ? "" : str.substring(index + 1);
  };
}

const splitOn = function(chr) {
  return function(str) {  // String ==> [String]
    return str.split(chr);
  };
}

const makeObj = function(desc) {  // [String] ==> Object
  return desc.reduce(function(obj, str) {
    const parts = str.split("=")
    obj[parts[0]] = parts[1];
    return obj;
  }, {});
}

const url = "http://example.com/fetch?product=widget&color=red&size=6"

const getConfig = compose(makeObj, splitOn("&"), after("?"))

console.log(getConfig(url));

