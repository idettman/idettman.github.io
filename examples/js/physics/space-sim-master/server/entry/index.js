/**
 * Tiny router, sends traffic to correct service & does load balancing.
 * NGINX would be more appropiate for production
 */

import http from 'http'
import httpProxy from 'http-proxy'
import morgan from 'morgan'
import _services from '../_config/services'

const {PORT} = process.env

const randInt = (min, max) => Math.floor(min + Math.random() * max)
const services = _.toPairs(_services)
  .map(([name, {port, instances = 1}]) => ({name, port, instances}))

const proxy = httpProxy.createProxyServer()
const logger = morgan('dev')

http.createServer((req, res) => {
  logger(req, res, () => {})
  const service = services
    .find(s => _.get(req.url.match(/^\/api\/([\w-]+)/), '1') === s.name) ||
    _.find(services, {name: 'static'})
  const port = service.port + randInt(0, service.instances)
  proxy.web(req, res, {target: `http://localhost:${port}`})
})
  .listen(
    PORT, 'localhost',
    err => console.log(err || `Listening at http://localhost:${PORT}`))
