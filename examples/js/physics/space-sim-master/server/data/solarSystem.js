import request from 'request'
import planetData from './planets'

// Shift position from earth-moon barycenter to earth geocenter
const fixEarthPosition = (earth, moon) => {
  const barycenterPercentage = 1 - moon.mass / earth.mass
  earth.position = earth.position.map((v, i) => v - (moon.position[i] * barycenterPercentage))
  earth.velocity = earth.velocity.map((v, i) => v - (moon.velocity[i] * barycenterPercentage))
  return earth
}
// Shift position from earth-geocentric to solar-barycentric
const fixMoonPosition = (moon, earth) => {
  moon.position = moon.position.map((v, i) => v + earth.position[i])
  moon.velocity = moon.velocity.map((v, i) => v + earth.velocity[i])
  return moon
}

/**
 * position/velocity from:
 * de406 ephemeris data (http://ssd.jpl.nasa.gov/?planet_eph_export)
 * via astro-phys.com/api
 *
 * velocity is in KM/day
 * position is KM
 */
export default (req, res) => {
  const date = moment(req.query.date).format('YYYY-MM-DD')
  request(
    {
      uri: 'http://www.astro-phys.com/api/de406/states',
      qs: {
        bodies: 'sun, mercury, venus, earth, moon, earthmoon, geomoon, mars, jupiter, uranus, neptune, pluto',
        date,
      },
    },
    (e, r) => {
      if (e) return res.status(500).send({errors: ['request to astro-phys.com failed']})
      const body = JSON.parse(r.body)
      let planets = _.chain(body.results)
        .mapKeys((v, k) => ({earthmoon: 'earth', geomoon: 'moon'})[k] || k)
        .mapValues(([position, velocity]) => ({position, velocity}))
        .mapValues((v, k) => ({name: k, ...planetData[k], ...v}))
        .value()
      planets.earth = fixEarthPosition(planets.earth, planets.moon)
      planets.moon = fixMoonPosition(planets.moon, planets.earth)
      planets = _.values(planets)
      return res.send({data: {planets, date: body.date}})
    }
  )
}
