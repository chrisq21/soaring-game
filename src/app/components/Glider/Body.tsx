import React from 'react'
import {useLoader} from '@react-three/fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'

const gliderStartingHeight = 5000

type GliderBody = {
  gliderRef: any
  modelRef: any
}

function GliderBody({gliderRef, modelRef}: GliderBody) {
  const gltf = useLoader(GLTFLoader, '/scene.gltf')

  return (
    <group name="glider" position={[0, gliderStartingHeight, 0]} rotation={[-Math.PI, -Math.PI, -Math.PI]} scale={1.03} ref={gliderRef}>
      <primitive ref={modelRef} name="glider model" object={gltf.scene} scale={50} rotation={[0, 0, 0]} castShadow receiveShadow />
    </group>
  )
}

export default GliderBody
