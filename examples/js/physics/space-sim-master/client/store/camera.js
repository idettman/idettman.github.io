import {createReducer} from '_utils/redux-plus'
import vector, * as vec from '_utils/formulas/geometry/vector'
import {translateVectorByEuler} from '_utils/formulas/geometry/euler'
import keysDown from 'services/keysDown'

const {sin, cos} = Math
const updatePosition = (position, _rotation, {speed}) => {
  const rotation = vector(_rotation)
  return vec.add(
    position,
    translateVectorByEuler(
    _.toPairs(keysDown)
      .filter(([, v]) => v)
      .map(([k]) =>
        ({w: [0, 0, -1], s: [0, 0, 1],
          a: [-1, 0, 0], d: [1, 0, 0],
          r: [0, -1, 0], f: [0, 1, 0]})[k])
      .filter(v => v)
      .map(v => v.map(vi => vi * speed * (keysDown.shift ? 10 : 1)))
      .reduce((pv, v) => pv.add(v), vector()),
      rotation))
}

const updateRotationTick = ([x, y, z]) =>
  [x, y, z + (keysDown.q ? 0.05 : 0) + (keysDown.e ? -0.05 : 0)]

const updateRotationMouse = ([x, y, z], {deltaX: _dx, deltaY: _dy}) => {
  const pxToRad = v => v / 400
  const dx = (cos(z) * pxToRad(_dy)) - (sin(z) * pxToRad(_dx))
  const dy = (sin(z) * pxToRad(_dy)) + (cos(z) * pxToRad(_dx))
  return [x - dx, y - dy, z]
}

// TODO:
// The camera should be positioned as if affected by gravity -
// unless it's following a pre-determined route.
//
// After moving or jumping to another location the Keperlian
// elements should be set, so as to create a circular orbit
// around the closest (exerts most gravitational influence)
// body (the target).
//
// Inclination should match the closest satelite of the target,
// if unavailable inclination should match the body the target
// is the satelite of.
//
// If within 10% of a patched conic boundary evaluate the
// Keperlian elements for both and mix them linearly.
//
// TODO:
// Figure out how to position camera while tracking an object
// that may accelerate arbitarily (ex: a rocket)
export default createReducer({
  TICK: ({position, rotation, ...state}) => ({
    position: updatePosition(position, rotation, {speed: 0.2}),
    rotation: updateRotationTick(rotation).map(v => v % (2 * Math.PI)),
    ...state,
  }),
  UPDATE_CAMERA_ROTATION: ({rotation, ...state}, {payload}) => ({
    rotation: updateRotationMouse(rotation, payload).map(v => v % (2 * Math.PI)),
    ...state,
  }),
}, {position: [0, 0, 150], rotation: [0, 0, 0]})
