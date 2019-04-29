"use strict";
PROJECTION.Node = (function() {
  Node.prototype.position = null;

  Node.prototype.scale = 0;

  Node.prototype.rotation = null;

  Node.prototype.parent = null;

  Node.prototype.children = null;

  Node.prototype.matrix = null;

  Node.prototype._identity = null;

  Node.prototype._tmpMatrix = null;

  function Node(parent) {
    if (parent == null) {
      parent = null;
    }
    this.parent = parent;
    this.children = [];
    if (parent) {
      this.parent.children.push(this);
    }
    this.matrix = mat4.create();
    this.position = vec3.create();
    this.rotation = [0, 0, 0];
    this._identity = mat4.create();
    this._tmpMatrix = mat4.create();
  }

  Node.prototype.update = function() {
    var child, index, _i, _len, _ref;
    mat4.translate(this._tmpMatrix, this._parentMatrix(), this.position);
    mat4.rotateX(this.matrix, this._tmpMatrix, this.rotation[0]);
    mat4.rotateY(this._tmpMatrix, this.matrix, this.rotation[1]);
    mat4.rotateZ(this.matrix, this._tmpMatrix, this.rotation[2]);
    _ref = this.children;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      child = _ref[index];
      if (child.parent === this) {
        child.update();
      } else {
        this.children[index] = null;
      }
    }
    return this.children = this.children.filter(function(child) {
      return child !== null;
    });
  };

  Node.prototype._parentMatrix = function() {
    if (this.parent !== null) {
      return this.parent.matrix;
    } else {
      return this._identity;
    }
  };

  Node.prototype.getData2d = function(camera) {
    var out, vec;
    out = {
      position: null,
      scale: null
    };
    vec = camera.transform(this.position, this._parentMatrix());
    if (vec[2] === 0) {
      out.position = [0, 0];
      out.scale = 0;
    } else {
      out.scale = 1 / vec[2];
      out.position = [vec[0] * out.scale, vec[1] * out.scale];
    }
    return out;
  };

  return Node;

})();
