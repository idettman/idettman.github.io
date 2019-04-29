"use strict";
var PropertyObject;

PropertyObject = (function() {
  function PropertyObject() {}

  PropertyObject.property = function(propertyName, descriptor) {
    return Object.defineProperty(this.prototype, propertyName, descriptor);
  };

  return PropertyObject;

})();
