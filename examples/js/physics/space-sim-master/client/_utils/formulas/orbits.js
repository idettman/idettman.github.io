/* eslint camelcase:0 */

import * as vec from '_utils/formulas/geometry/vector'
import newtonsMethod from '_utils/formulas/newtonsMethod'
import {G} from '_utils/formulas/gravity'

const {PI, pow, sin, cos, tan, acos, atan, atan2} = Math

/**
 * From: https://downloads.rene-schwarz.com/download/M001-Keplerian_Orbit_Elements_to_Cartesian_State_Vectors.pdf
 *
 * position/velocity vectors of orbiting body relative to central body
 * massOfCentralBody = mass * G of central body
 */
export const cartesianStateToKeperlianElements = (position, velocity, massOfCentralBody) => {
  const gravity = massOfCentralBody * G
  const orbitalMomentum = vec.multiply(position, velocity)
  const eccentricityVec = vec.multiply(velocity, orbitalMomentum)
  const ascendingNodeVec = [-orbitalMomentum[1], -orbitalMomentum[0], 0]
  const _trueAnomaly = acos(
    vec.product(eccentricityVec, position) /
    (vec.mag(eccentricityVec) * vec.mag(position)))
  const trueAnomaly = vec.product(position, velocity) >= 0 ?
    _trueAnomaly :
    2 * PI - _trueAnomaly

  const inclination = acos(orbitalMomentum[2] / vec.mag(orbitalMomentum))
  const eccentricity = vec.mag(eccentricityVec)
  const eccentricAnomaly = 2 * atan(
    tan(trueAnomaly / 2) /
    ((1 + eccentricity) / (1 - eccentricity)) ** 0.5)
  const _longitudeOfAscendingNode = acos(ascendingNodeVec[0] / vec.mag(ascendingNodeVec))
  const longitudeOfAscendingNode = ascendingNodeVec[1] >= 0 ?
    _longitudeOfAscendingNode :
    2 * PI - _longitudeOfAscendingNode
  const _argumentOfPeriapsis = acos(
    vec.product(ascendingNodeVec, eccentricityVec) /
    vec.mag(ascendingNodeVec) * vec.mag(eccentricityVec))
  const argumentOfPeriapsis = eccentricityVec[2] >= 0 ?
    _argumentOfPeriapsis :
    2 * PI - _argumentOfPeriapsis
  const meanAnomaly = eccentricAnomaly - sin(eccentricAnomaly) * eccentricity
  const semiMajorAxis = 1 / ((2 / vec.mag(position)) - (vec.mag(velocity) ** 2 / gravity))
  return {
    semiMajorAxis, eccentricity, argumentOfPeriapsis,
    longitudeOfAscendingNode, inclination, meanAnomaly,
  }
}

/**
 * From: https://downloads.rene-schwarz.com/download/M001-Keplerian_Orbit_Elements_to_Cartesian_State_Vectors.pdf
 *
 * @param semiMajorAxis a [m]
 * @param eccentricity e [1]
 * @param argumentOfPeriapsis ω [rad]
 * @param longitudeOfAscendingNode (LAN) Ω [rad]
 * @param inclination i [rad]
 * @param meanAnomaly M [rad]
 * @param massOfCentralBody µ [m^3/kg*s^2]
 * @param time0 t0 [JD]
 * @param time t [JD]
 */
export const keperlianElementsToCartesianState = _.curry(
  ({
    semiMajorAxis, eccentricity, argumentOfPeriapsis, // a, e, ω,
    longitudeOfAscendingNode, inclination, meanAnomaly, // Ω, i, M
  }, massOfCentralBody, time0, time) => {
    const gravity = massOfCentralBody * G
    const meanAnomaly_f = () => {
      if (!time) return meanAnomaly
      const deltaTimeSeconds = 86400 * (time0 - time)
      return meanAnomaly + deltaTimeSeconds * pow(gravity / semiMajorAxis ** 3, 0.5)
    }
    const meanAnomaly_t = meanAnomaly_f(time)
    const eccentricAnomaly_t = newtonsMethod(
      meanAnomaly_t,
      val => (
        (val - eccentricity * sin(val) - meanAnomaly_t) /
        (1 - eccentricity * cos(val))
      ))
    const trueAnomaly_t = 2 * atan2(
      pow(1 + eccentricity, 0.5) * sin(eccentricAnomaly_t / 2),
      pow(1 - eccentricity, 0.5) * sin(eccentricAnomaly_t / 2),
    )
    const distanceToCentralBody = semiMajorAxis * (1 - eccentricity * cos(eccentricAnomaly_t))
    // get position/rotation on orbital plane
    const position_o = (
      [cos(trueAnomaly_t), sin(trueAnomaly_t), 0]
        .map(v => v * distanceToCentralBody)
    )
    const rotation_o = [
      -sin(eccentricAnomaly_t),
      pow(1 - eccentricity ** 2, 0.5) * cos(eccentricAnomaly_t),
      0,
    ].map(v =>
      v * pow(gravity * semiMajorAxis, 0.5) / distanceToCentralBody)

    // Rotate vector by Rz(-Ω)Rx(-i)Rz(ω)vector(t)  to convert from
    // orbital frame to bodycentric frame
    const rotateVector = vector => [
      vector[0] * (
        cos(argumentOfPeriapsis) * cos(longitudeOfAscendingNode) -
        sin(argumentOfPeriapsis) * cos(inclination) * sin(longitudeOfAscendingNode)) -
      vector[1] * (
        sin(argumentOfPeriapsis) * cos(longitudeOfAscendingNode) +
        cos(argumentOfPeriapsis) * cos(inclination) * sin(longitudeOfAscendingNode)),

      vector[0] * (
        cos(argumentOfPeriapsis) * sin(longitudeOfAscendingNode) +
        sin(argumentOfPeriapsis) * cos(inclination) * cos(longitudeOfAscendingNode)) +
      vector[1] * (
        cos(argumentOfPeriapsis) * cos(inclination) * cos(longitudeOfAscendingNode) -
        sin(argumentOfPeriapsis) * sin(longitudeOfAscendingNode)),

      vector[0] * (sin(argumentOfPeriapsis) * sin(inclination)) +
      vector[1] * (cos(argumentOfPeriapsis) * sin(inclination)),
    ]
    return {
      position: rotateVector(position_o),
      velocity: rotateVector(rotation_o),
    }
  }, 3
)

/**
 * Small wrapper around cartesianStateToKeperlianElements & keperlianElementsToCartesianState
 */
export const createCartesianGenerator = (position, velocity, massOfCentralBody, time0) => {
  const keperlianElements = cartesianStateToKeperlianElements(position, velocity, massOfCentralBody)
  return time => keperlianElementsToCartesianState(keperlianElements, massOfCentralBody, time0, time)
}
