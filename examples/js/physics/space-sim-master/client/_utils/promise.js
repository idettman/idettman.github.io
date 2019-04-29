/**
 * An easy way to create promises in reducers (using redux-loop)
 * API optimized for making XHR calls
 *
 * promise('POST', '/api/endpoint')
 * promise('POST', '/api/endpoint', {headers: {Authentication: 'password'}})
 * promise({method: 'POST', url: '/api/endpoint', headers: {Authentication: 'password'}})
 * promise((state, {payload}) => xr.post('/api/endpoint', payload))
 * promise('POST', '/api/endpoint', (state) => ({counter: state.counter + 1, ...state}))
 */

import xr from 'xr'
import {loop} from '_utils/redux-plus'

const generateRequest = (config) =>
  typeof config === 'function' ? config :
    (state, {payload}) =>
      xr({[config.method === 'GET' ? 'params' : 'data']: payload, ...config})

const _promise = (requestConfig, updateConfig = s => _.get(s, '0', s)) => (state, action) => {
  const effect = () =>
    generateRequest(requestConfig)(state, action).then(
      response => ({type: `${action.type}_SUCCESS`, payload: response.data, meta: {response}}),
      error => ({type: `${action.type}_FAILURE`, payload: error}))
  return loop(updateConfig(state, action), effect)
}

const promise = (...args) =>
  typeof args[0] === 'string' && typeof args[1] === 'string' ?
    typeof args[2] !== 'function' ?
      _promise({method: args[0], url: args[1], ...args[2]}, args[3]) :
      _promise({method: args[0], url: args[1]}, args[2]) :
    _promise(...args)

export default promise
export const api = promise
