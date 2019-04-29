/**
 * All imports from various redux libaries in one place
 */

export {createStore, applyMiddleware, compose} from 'redux'
export {combineReducers, getModel} from 'redux-loop'
export {handleActions as createReducer} from 'redux-actions'
export {connect, Provider} from 'react-redux'

import {loop as _loop, Effects} from 'redux-loop'

export const loop = (state, ...effects) =>
  _loop(state, Effects.batch(effects.map(e =>
    typeof e === 'function' ?
      Effects.promise(() => Promise.resolve(e())) :
    e ?
      Effects.constant(e) :
      Effects.none()
  )))
