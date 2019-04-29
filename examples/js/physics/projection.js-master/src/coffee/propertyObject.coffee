"use strict";

class PropertyObject
  @property: (propertyName, descriptor) ->
    Object.defineProperty(@prototype,
      propertyName,
      descriptor
    )
