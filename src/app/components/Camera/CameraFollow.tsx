import {Camera, useFrame} from '@react-three/fiber'

type CameraFollow = {
  gliderRef: any
  camera: Camera
  offsets?: {
    x?: number
    y?: number
    z?: number
  }
}

function CameraFollow({gliderRef, camera, offsets = {}}: CameraFollow) {
  useFrame(() => {
    if (gliderRef.current) {
      const gliderPosition = gliderRef.current.position
      const {x = 0, y = 500, z = 1000} = offsets
      camera.position.set(gliderPosition.x + x, gliderPosition.y + y, gliderPosition.z + z)
      camera.lookAt(gliderPosition)
    }
  })

  return null
}

export default CameraFollow
