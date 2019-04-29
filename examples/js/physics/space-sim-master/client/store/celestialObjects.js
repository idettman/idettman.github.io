import {createReducer} from '_utils/redux-plus'
import {api} from '_utils/promise'
import {toJulianDay} from '_utils/formulas/convert'
import vector from '_utils/formulas/geometry/vector'
import gravity from '_utils/formulas/gravity'
import {createCartesianGenerator} from '_utils/formulas/orbits'

const getCentralBody = (orbittingPlanet, _candidates) => {
  const candidates = _candidates.filter(({name}) => name !== orbittingPlanet.name)
  if (!candidates.length) return null
  const centralBody = _.sortBy(
    candidates,
    ({mass, position}) => gravity(mass, vector(position).sub(orbittingPlanet.position).magnitude())
  )[0]
  return [
    centralBody,
    {
      relativePosition: vector(orbittingPlanet.position).sub(centralBody.position),
      relativeVelocity: vector(orbittingPlanet.velocity).sub(centralBody.velocity),
    },
  ]
}

export default createReducer({
  GET_DATA: api('GET', '/api/data/solar-system'),
  GET_DATA_SUCCESS: (state, {payload}) => ({
    ...state,
    planets: payload.data.planets.map(planet => {
      const [centralBody, relativePosition, relativeVelocity] = getCentralBody(planet, payload.data.planets)
      const generator = createCartesianGenerator(
        relativePosition,
        relativeVelocity,
        centralBody.mass,
        payload.data.date
      )
      const newEphmeris = {date: payload.data.date, generator, centralBody: centralBody.name}

      return {
        ...planet,
        ephmeris: [newEphmeris],
      }
    }),
  }),
  TICK: state => ({
    ...state,
    julianDay: state.julianDay + 1,
  }),
}, {planets: [], julianDay: toJulianDay(Date.now())})
