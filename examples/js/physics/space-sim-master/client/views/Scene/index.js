import React from 'react'
import React3 from 'react-three-renderer'
import THREE from 'three'
import {connect} from '_utils/redux-plus'
import store from 'store'
import Camera from './Camera'
import Lights from './Lights'
import Planets from './Planets'

const Scene = connect(
  state => ({planets: state.celestialObjects.planets, camera: state.camera})
)(
({planets, camera}) => {
  const width = window.outerWidth - 100
  const height = window.outerHeight - 125
  const fog = new THREE.Fog(0x00000, 1, 1000)

  return (
    <div
      id={'scene'}
      onClick={() => store.dispatch('FOCUS_SCENE')}
    >
      <React3
        mainCamera="camera"
        width={width}
        height={height}
        alpha
        clearAlpha={1}
        onAnimate={() => store.dispatch('TICK')}
      >
        <scene
          fog={fog}
        >
          <Camera aspect={width / height} {...camera} />
          <Lights />
          <Planets planets={planets} />
        </scene>
      </React3>
    </div>
  )
})

export default Scene
