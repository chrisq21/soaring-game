import {useFrame} from '@react-three/fiber'
import React, {useRef} from 'react'

function Lights({gliderRef}) {
  const lightRef = useRef(null)

  useFrame(() => {
    if (lightRef.current && gliderRef.current) {
      const gliderPosition = gliderRef.current.position.clone()
      gliderPosition.y += 10 // Adjust the height of the light above the glider

      lightRef.current.position.copy(gliderPosition)
    }
  })

  return (
    <>
      <directionalLight
        ref={lightRef}
        name="Directional Light"
        castShadow
        intensity={0.7}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={-10000}
        shadow-camera-far={100000}
        shadow-camera-left={-5000}
        shadow-camera-right={5000}
        shadow-camera-top={5000}
        shadow-camera-bottom={-5000}
        color="#f2f0eb"
        position={[-933.05, 2013.36, 1463.42]} // default position
        target={gliderRef?.current}
        rotation={[-Math.PI / 2, 0, 0]} // Rotate the light to point straight down
      />
      {/* Hemisphere Light */}
      <hemisphereLight name="Default Ambient Light" intensity={0.75} color="#dbdbdb" />
    </>
  )
}
export default Lights

// position={
//   gliderRef?.current
//     ? gliderRef.current.position
//     : [-933.05, 2013.36, 1463.42]
// }
