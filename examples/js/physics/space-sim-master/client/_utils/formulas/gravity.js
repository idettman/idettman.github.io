export const G = 6.673848e-11
const {PI, abs} = Math

export const gravity = (mass, distance) =>
  (G * mass) / abs(distance ** 2)

// For visualization. Handles values both inside/outside bodies
// http://physics.stackexchange.com/questions/245861/how-to-visualize-gravity-fields
export const gravityIntegral = (density, radius, distance) =>
  radius <= distance ?
    - (4 * PI * density * G * radius ** 3) / (3 * distance) :
    ((2 / 3) * PI * density * G * distance ** 2) - (2 * PI * density * G * radius ** 2)

export default gravity
