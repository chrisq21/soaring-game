import React from 'react'
import {useLoader} from '@react-three/fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

const gliderStartingHeight = 5000

function GliderBody({gliderRef, nodes, materials}) {
  const gltf = useLoader(GLTFLoader, '/scene.gltf')

  return (
    <group name="glider" position={[0, gliderStartingHeight, 0]} rotation={[-Math.PI, 0, -Math.PI]} scale={1.03} ref={gliderRef}>
      <primitive object={gltf.scene} scale={50} rotation={[-Math.PI, Math.PI / 2, -Math.PI]} />
      {/* <mesh
        name="main part"
        geometry={nodes['main part'].geometry}
        material={materials.red}
        castShadow
        receiveShadow
        position={[7.59, 152.35, 128.09]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.97, 0.98, 0.97]}
      /> */}
    </group>
  )
}

export default GliderBody
