import React from 'react'
import {connect} from '_utils/redux-plus'
import Scene from '../Scene'

const prettyPrintCamera = camera => `
camera:
{
  position: [ ${camera.position.map(v => v.toFixed(1)).join(', ')} ],
  rotation: [ ${camera.rotation.map(v => (v * (180 / Math.PI)).toFixed(1)).join(', ')} ],
}
`

const App = connect(state => ({state}))(
({location, state}) => (
  <div>
    <pre>{prettyPrintCamera(state.camera)}</pre>
    <div
      style={{
        padding: '20px 0',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Scene />
    </div>
    <pre>{JSON.stringify(location, null, 2)}</pre>
    <pre>{JSON.stringify(state, null, 2)}</pre>
  </div>
))

export default App
