import React from 'react'

export default () => (
  <group>
    <pointLight
      color={0x666666}
      position={new THREE.Vector3(0, 0, 0)}
    />
    <pointLight
      color={0x333333}
      position={new THREE.Vector3(-200, 200, 300)}
    />
    <pointLight
      color={0x333333}
      position={new THREE.Vector3(100, 500, 100)}
    />
    <ambientLight
      color={0xaaaaaa}
    />
  </group>
)
