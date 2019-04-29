"use strict";
Function.prototype.property = function(propertyName, descriptor) {
  return Object.defineProperty(this.prototype, propertyName, descriptor);
};
