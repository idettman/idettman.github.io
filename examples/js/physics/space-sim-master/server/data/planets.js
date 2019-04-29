/**
 * data from:
 * http://ssd.jpl.nasa.gov/?planet_phys_par
 * http://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html
 * http://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html
 *
 * units:
 * radius (km)
 * mass (kg)
 * density (kg/km^3)
 * dayLength (Earth days)
 * yearLength (Earth years)
 * magnitude (V(1,0))
 * albedo (visual geometric)
 * surfaceGravity (m/s^2)
 * escapeVelocity (km/s)
 */

export default {
  sun: {
    radius: 695700, mass: 1988500e24, density: 1.408, dayLength: 25.44945, yearLength: null,
    magnitude: -26.74, albedo: null, surfaceGravity: 274, escapeVelocity: 617.6},
  mercury: {
    radius: 2439.7, mass: 0.330104e24, density: 5.427, dayLength: 58.6462, yearLength: 0.2408467,
    magnitude: -0.60, albedo: 0.106, surfaceGravity: 3.70, escapeVelocity: 4.25},
  venus: {
    radius: 6051.8, mass: 4.86732e24, density: 5.243, dayLength: -243.018, yearLength: 0.61519726,
    magnitude: -4.47, albedo: 0.65, surfaceGravity: 8.87, escapeVelocity: 10.36},
  earth: {
    radius: 6371.00, mass: 5.97219e24, density: 5.5134, dayLength: 0.99726968, yearLength: 1.0000174,
    magnitude: -3.86, albedo: 0.367, surfaceGravity: 9.80, escapeVelocity: 11.19},
  moon: {
    radius: 1737.4, mass: 0.07346e24, density: 3.344, dayLength: 27.39677, yearLength: 0.0808474,
    magnitude: 0.21, albedo: 0.12, surfaceGravity: 1.62, escapeVelocity: 2.38},
  mars: {
    radius: 3389.50, mass: 0.641693e24, density: 3.9340, dayLength: 1.02595676, yearLength: 1.8808476,
    magnitude: -1.52, albedo: 0.150, surfaceGravity: 3.71, escapeVelocity: 5.03},
  jupiter: {
    radius: 69911, mass: 1898.13e24, density: 1.3262, dayLength: 0.41354, yearLength: 11.862615,
    magnitude: -9.40, albedo: 0.52, surfaceGravity: 24.79, escapeVelocity: 60.20},
  saturn: {
    radius: 58232, mass: 568.319e24, density: 0.6871, dayLength: 0.44401, yearLength: 29.447498,
    magnitude: -8.88, albedo: 0.47, surfaceGravity: 10.44, escapeVelocity: 36.09},
  uranus: {
    radius: 25362, mass: 86.8103e24, density: 1.270, dayLength: -0.71833, yearLength: 84.016846,
    magnitude: -7.19, albedo: 0.51, surfaceGravity: 8.87, escapeVelocity: 21.38},
  neptune: {
    radius: 24622, mass: 102.410e24, density: 1.638, dayLength: 0.67125, yearLength: 164.79132,
    magnitude: -6.87, albedo: 0.41, surfaceGravity: 11.15, escapeVelocity: 23.56},
  pluto: {
    radius: 1151, mass: 0.01309e24, density: 2.05, dayLength: -6.3872, yearLength: 247.92065,
    magnitude: -1.0, albedo: 0.3, surfaceGravity: 0.66, escapeVelocity: 1.23},
}
