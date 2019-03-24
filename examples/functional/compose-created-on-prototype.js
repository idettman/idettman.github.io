Function.prototype.compose = function(prevFunc, target) {
  var nextFunc = this;
  return function() {
    return nextFunc.call(this, prevFunc.apply(target, arguments));
  };
};
var d = (new Date);
//var alertMonth = alert.compose(d.getMonth, d);            // both variants do work.
var alertMonth = alert.compose(Date.prototype.getMonth, d); //
alertMonth(d);


// Second Iteration


(function (function_prototype) {
  var
    isFunction = (function (TYPEOF_FUNCTION_TYPE) {
      return function (type) {
        return (
             (typeof type == TYPEOF_FUNCTION_TYPE)
          && (typeof type.call == TYPEOF_FUNCTION_TYPE)
          && (typeof type.apply == TYPEOF_FUNCTION_TYPE)
        );
      }
    }(typeof function_prototype)),

    getSanitizedTarget = function (target) {
      return (target == null) ? null : target;
    }
  ;
  function_prototype.compose = function (previous, target) { // compose
    var
      previousTarget = getSanitizedTarget(target),
      proceed = this
    ;
    return (isFunction(previous) && isFunction(proceed) && function () {

      return proceed.call(this, previous.apply(previousTarget, arguments));

    }) || proceed;
  };
}(Function.prototype));


var d = (new Date);
var alertMonth = alert.compose(d.getMonth, d);                // both variants do work.
//var alertMonth = alert.compose(Date.prototype.getMonth, d); //
alertMonth(d);