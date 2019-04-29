import vector, * as vec from '_utils/formulas/geometry/vector'

const {cos, sin} = Math
const splitHypotenuse = [
  (hypotenuse, theta) => {
    const x = cos(theta.y) * hypotenuse
    const z = -sin(theta.y) * hypotenuse
    return vector([x, 0, z])
  },
  (hypotenuse, theta) => {
    const y = cos(theta.x) * hypotenuse
    const zxHypotenuse = sin(theta.x) * hypotenuse
    const x = sin(theta.y) * zxHypotenuse
    const z = cos(theta.y) * zxHypotenuse
    return vector([x, y, z])
  },
  (hypotenuse, theta) => {
    const y = -(sin(theta.x) * hypotenuse)
    const zxHypotenuse = cos(theta.x) * hypotenuse
    const x = sin(theta.y) * zxHypotenuse
    const z = cos(theta.y) * zxHypotenuse
    return vector([x, y, z])
  },
]

/**
 * Useful for converting deltas from world co-ordinates (z, x, y) to local
 * co-ordinates (up, down, left, right, forwards, backwards)
 * @param  _ve   [x, y, z] (distance)
 * @param  _euler [x, y, z] (radians)
 * @return        [x, y, z] (distance)
 */
export const translateVectorByEuler = (_ve, _euler) => {
  const rz = _euler[2]
  const ve = [
    (cos(rz) * _ve[0]) + (sin(rz) * _ve[1]),
    (sin(rz) * _ve[0]) - (cos(rz) * _ve[1]),
    _ve[2]]
  const euler = vector(_euler)
  return vec.add(...ve.map((val, i) => splitHypotenuse[i](val, euler)))
}

export default vector
