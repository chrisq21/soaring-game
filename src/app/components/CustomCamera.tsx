import React from 'react'
import {useFrame, useThree} from '@react-three/fiber'
import {PerspectiveCamera, OrbitControls, OrthographicCamera} from '@react-three/drei'

function CameraFollow({gliderRef, camera}) {
  useFrame(() => {
    if (gliderRef.current) {
      const gliderPosition = gliderRef.current.position

      // Set the camera position to follow the glider with an offset
      camera.position.set(gliderPosition.x, gliderPosition.y + 1800, gliderPosition.z + 2900)

      camera.lookAt(gliderPosition)
    }
  })

  return null
}

function CustomCamera({gliderRef, camera}) {
  const {viewport} = useThree()
  const {width, height} = viewport

  return (
    <>
      {/* <OrbitControls /> */}

      {/* Base Controls Camera */}
      <PerspectiveCamera fov={75} aspect={width / height} near={0.1} far={100000} position={[1975.09, 2452.52, 5007.95]} name="Camera" makeDefault={true} />
      <CameraFollow gliderRef={gliderRef} camera={camera} />

      {/* Behind Controls Camera */}
      {/* <PerspectiveCamera fov={75} aspect={width / height} near={0.1} far={100000} position={[1975.09, 2452.52, 5007.95]} name="Camera" makeDefault={true} />
      <CameraFollow gliderRef={gliderRef} camera={camera} /> */}

      {/* <OrthographicCamera
        name="Camera"
        makeDefault={true}
        zoom={0.15}
        far={100000}
        near={-100000}
        position={[1975.09, 1252.52, 147.95]}
        rotation={[-0.79, 0.5, 0.45]}
        id={undefined}
        modelViewMatrix={undefined}
        normalMatrix={undefined}
        customDepthMaterial={undefined}
        customDistanceMaterial={undefined}
      /> */}
    </>
  )
}

export default CustomCamera
