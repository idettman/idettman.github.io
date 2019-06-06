function maybe (fn) {
  return function(argument) {
    if (argument != null) {
      return fn.call(this,  argument)
    }
  }
}
function getItemByProp (item, prop) {
  return item[prop];
}