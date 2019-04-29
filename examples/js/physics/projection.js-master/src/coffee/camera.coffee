"use strict"

class PROJECTION.Camera extends PropertyObject

  _dirtyModel: null
  _dirtyView: null

  _fieldOfView: null
  @property 'fieldOfView', {
    get: () ->
      return this._fieldOfView
    set: (value) ->
      this._fieldOfView = value
      this._dirtyView = true
  }

  _aspectRatio: null
  @property 'aspectRatio', {
    get: () ->
      return this._aspectRatio
    set: (value) ->
      this._aspectRatio = value
      this._dirtyView = true
  }

  _zNear: null
  @property 'zNear', {
    get: () ->
      return this._zNear
    set: (value) ->
      this._zNear = value
      this._dirtyView = true
  }

  _zFar: null
  @property 'zFar', {
    get: () ->
      return this._zFar
    set: (value) ->
      this._zFar = value
      this._dirtyView = true
  }

  _position: null
  @property 'position', {
    get: () ->
      return this._position
    set: (value) ->
      this._position = value
      this._dirtyModel = true
  }

  _lookAt: null
  _lookAtNode: null
  @property 'lookAt', {
    get: () ->
      return this._lookAt
    set: (value) ->
      if value instanceof Node
        this._lookAtNode = value
        this._lookAt = this._lookAtNode.position
      else
        this._lookAtNode = null
        this._lookAt = value

      this._dirtyModel = true
  }

  _up: null
  @property 'up', {
    get: () ->
      return this._up
    set: (value) ->
      this._up = value
      this._dirtyModel = true
  }

  projectionMatrix: null
  viewMatrix: null


  constructor: () ->
    this.fieldOfView = 45
    this.aspectRatio = 8/5
    this.zNear = 1
    this.zFar = 100
    this.position = [0, 0, 1]
    this.lookAt = [0, 0, 0]
    this.up = [0, 1, 0]
    this.projectionMatrix = mat4.create();
    this.viewMatrix = mat4.create()

    this._dirtyModel = true
    this._dirtyView = true


  _updateView: () ->
    mat4.perspective(this.projectionMatrix, this.fieldOfView, this.aspectRatio, this.zNear, this.zFar)


  _updateModel: () ->
    mat4.lookAt(this.viewMatrix, this.position, this._lookAt, this.up)


  transform: (vec, modelMatrix) ->
    if this._dirtyModel
      this._updateModel()
      this._dirtyModel = false

    if this._dirtyView
      this._updateView()

      if this._lookAtNode == null
        this._dirtyView = false

    outVec = vec3.create()
    vec3.transformMat4(outVec, vec, modelMatrix)
    vec3.transformMat4(outVec, outVec, this.viewMatrix)
    vec3.transformMat4(outVec, outVec, this.projectionMatrix)

    return outVec



