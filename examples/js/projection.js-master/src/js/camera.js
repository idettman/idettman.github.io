"use strict";
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

PROJECTION.Camera = (function(_super) {
  __extends(Camera, _super);

  Camera.prototype._dirtyModel = null;

  Camera.prototype._dirtyView = null;

  Camera.prototype._fieldOfView = null;

  Camera.property('fieldOfView', {
    get: function() {
      return this._fieldOfView;
    },
    set: function(value) {
      this._fieldOfView = value;
      return this._dirtyView = true;
    }
  });

  Camera.prototype._aspectRatio = null;

  Camera.property('aspectRatio', {
    get: function() {
      return this._aspectRatio;
    },
    set: function(value) {
      this._aspectRatio = value;
      return this._dirtyView = true;
    }
  });

  Camera.prototype._zNear = null;

  Camera.property('zNear', {
    get: function() {
      return this._zNear;
    },
    set: function(value) {
      this._zNear = value;
      return this._dirtyView = true;
    }
  });

  Camera.prototype._zFar = null;

  Camera.property('zFar', {
    get: function() {
      return this._zFar;
    },
    set: function(value) {
      this._zFar = value;
      return this._dirtyView = true;
    }
  });

  Camera.prototype._position = null;

  Camera.property('position', {
    get: function() {
      return this._position;
    },
    set: function(value) {
      this._position = value;
      return this._dirtyModel = true;
    }
  });

  Camera.prototype._lookAt = null;

  Camera.prototype._lookAtNode = null;

  Camera.property('lookAt', {
    get: function() {
      return this._lookAt;
    },
    set: function(value) {
      if (value instanceof Node) {
        this._lookAtNode = value;
        this._lookAt = this._lookAtNode.position;
      } else {
        this._lookAtNode = null;
        this._lookAt = value;
      }
      return this._dirtyModel = true;
    }
  });

  Camera.prototype._up = null;

  Camera.property('up', {
    get: function() {
      return this._up;
    },
    set: function(value) {
      this._up = value;
      return this._dirtyModel = true;
    }
  });

  Camera.prototype.projectionMatrix = null;

  Camera.prototype.viewMatrix = null;

  function Camera() {
    this.fieldOfView = 45;
    this.aspectRatio = 8 / 5;
    this.zNear = 1;
    this.zFar = 100;
    this.position = [0, 0, 1];
    this.lookAt = [0, 0, 0];
    this.up = [0, 1, 0];
    this.projectionMatrix = mat4.create();
    this.viewMatrix = mat4.create();
    this._dirtyModel = true;
    this._dirtyView = true;
  }

  Camera.prototype._updateView = function() {
    return mat4.perspective(this.projectionMatrix, this.fieldOfView, this.aspectRatio, this.zNear, this.zFar);
  };

  Camera.prototype._updateModel = function() {
    return mat4.lookAt(this.viewMatrix, this.position, this._lookAt, this.up);
  };

  Camera.prototype.transform = function(vec, modelMatrix) {
    var outVec;
    if (this._dirtyModel) {
      this._updateModel();
      this._dirtyModel = false;
    }
    if (this._dirtyView) {
      this._updateView();
      if (this._lookAtNode === null) {
        this._dirtyView = false;
      }
    }
    outVec = vec3.create();
    vec3.transformMat4(outVec, vec, modelMatrix);
    vec3.transformMat4(outVec, outVec, this.viewMatrix);
    vec3.transformMat4(outVec, outVec, this.projectionMatrix);
    return outVec;
  };

  return Camera;

})(PropertyObject);
