import React from 'react'
import {useLoader} from '@react-three/fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

const gliderStartingHeight = 5000

type GliderBody = {
  gliderRef: any
}

function GliderBody({gliderRef}: GliderBody) {
  const gltf = useLoader(GLTFLoader, '/scene.gltf')

  return (
    <group name="glider" position={[0, gliderStartingHeight, 0]} rotation={[-Math.PI, 0, -Math.PI]} scale={1.03} ref={gliderRef}>
      <primitive name="glider model" object={gltf.scene} scale={50} rotation={[-Math.PI, Math.PI / 2, -Math.PI]} castShadow receiveShadow />
    </group>
  )
}

export default GliderBody
