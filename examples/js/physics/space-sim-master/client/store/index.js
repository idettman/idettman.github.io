import {createStore, applyMiddleware, compose} from '_utils/redux-plus'
import {install} from 'redux-loop'
import reducer from './_reducer'

const enhanceDispatch = next => (r, state) => {
  const s = next(r, state)
  const _dispatch = s.dispatch
  s.dispatch = (action, payload = null) => {
    const newAction = typeof action === 'string' ? {type: action, payload} : action
    return _dispatch(newAction)
  }
  return s
}

const ignoreNull = () => next => action => {
  if (action !== null) next(action)
  return action
}

const store = createStore(reducer, compose(
  enhanceDispatch,
  install(),
  applyMiddleware(ignoreNull),
  window.devToolsExtension ? window.devToolsExtension({actionsBlacklist: ['TICK']}) : f => f,
))

window.SS.store = store
window.SS.dispatch = store.dispatch
window.SS.subscribe = store.subscribe
window.SS.getState = store.getState

export default store
export const {dispatch, subscribe, getState} = store
