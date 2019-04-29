import 'services/evtResponse/index'
import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'
import store from 'store'

import Root from './views/Root'

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)

store.dispatch('GET_DATA')
browserHistory.push('/example-location')

// dev indicator
console.log(`session: ${Math.random().toString(36).slice(2)}`)
