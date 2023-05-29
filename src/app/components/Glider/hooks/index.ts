import {useFrame, useThree} from '@react-three/fiber'
import {Ref, useEffect, useRef} from 'react'
import * as THREE from 'three'

const forwardStrength = 2000
const turnStrength = 3
const defaultGravityStrength = 220
const defaultLiftStrength = 700

let isTurningLeft = false
let isTurningRight = false

const groundGliderHeight = 180 // TODO calculate from object

export const useKeyboardControls = (gliderRef: any) => {
  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.key === 'ArrowLeft' || event.key === 'a') && !isTurningLeft) {
        // Start turning left
        isTurningLeft = true
      } else if ((event.key === 'ArrowRight' || event.key === 'd') && !isTurningRight) {
        // Start turning right
        isTurningRight = true
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      if ((event.key === 'ArrowLeft' || event.key === 'a') && isTurningLeft) {
        // Stop turning left
        isTurningLeft = false
      } else if ((event.key === 'ArrowRight' || event.key === 'd') && isTurningRight) {
        // Stop turning right
        isTurningRight = false
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  const handleGliderRotation = (key: string, delta: number) => {
    // const turnVelocity = turnStrength * delta
    const turnVelocity = turnStrength / 100
    if (key === 'ArrowLeft' || key === 'a') {
      // Turn left
      gliderRef.current.rotateY(turnVelocity)
    } else if (key === 'ArrowRight' || key === 'd') {
      // Turn right
      gliderRef.current.rotateY(-turnVelocity)
    }
  }

  useFrame((_, delta) => {
    if (!gliderRef.current) {
      return
    }
    // Control turning
    if (isTurningLeft) {
      handleGliderRotation('ArrowLeft', delta)
    } else if (isTurningRight) {
      handleGliderRotation('ArrowRight', delta)
    }
  })
}

export const useForwardMovement = (gliderRef: any) => {
  useFrame((_, delta) => {
    if (gliderRef.current.position.y <= groundGliderHeight) {
      // Stop moving forward if the glider has hit the ground
      return
    }
    const forwardVelocity = forwardStrength / 100
    // const forwardVelocity = forwardStrength * delta
    const forwardForce = new THREE.Vector3(0, 0, forwardVelocity)
    const quaternion = new THREE.Quaternion()
    gliderRef.current.getWorldQuaternion(quaternion)
    forwardForce.applyQuaternion(quaternion)
    gliderRef.current.position.add(forwardForce)
  })
}

export const useLift = (gliderRef: any, inLift: boolean = false, liftStrength: number = defaultLiftStrength) => {
  useFrame((_, delta) => {
    // TODO do we need * delta here?
    // const liftVelocity = liftStrength * delta
    const liftVelocity = liftStrength / 100
    const liftForce = new THREE.Vector3(0, liftVelocity, 0)
    if (gliderRef.current) {
      if (inLift) {
        gliderRef.current.position.add(liftForce)
      }
    }
  })
}

export const useGravity = (gliderRef: any, gravityStrength: number = defaultGravityStrength) => {
  useFrame((_, delta) => {
    if (!gliderRef.current) {
      return
    }
    // TODO do we need * delta here?
    // const gravityVelocity = gravityStrength * delta
    const gravityVelocity = gravityStrength / 100
    const gravityForce = new THREE.Vector3(0, -gravityVelocity, 0)
    if (gliderRef.current) {
      // add gravity
      gliderRef.current.position.add(gravityForce)
      // Check if the glider has hit the ground
      if (gliderRef.current.position.y <= groundGliderHeight) {
        gliderRef.current.position.y = groundGliderHeight
      }
    }
  })
}

// back view
export const useMouseControlXY = (gliderRef: any) => {
  const mouseX = useRef(0)
  const mouseY = useRef(0)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.current = ((event.clientX / window.innerWidth) * 2 - 1) * 100
      mouseY.current = ((1 - event.clientY / window.innerHeight) * 2 - 1) * 100
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useFrame(() => {
    if (gliderRef.current) {
      const mousePositionVector = new THREE.Vector3(mouseX.current, mouseY.current, 0)
      gliderRef.current.position.add(mousePositionVector)
    }
  })
}

// mouse move xz plane with damping
export const useMouseControlXZ = (gliderRef: any) => {
  const mouseX = useRef(0)
  const mouseY = useRef(0)

  const windowHalfX = window.innerWidth / 2
  const windowHalfY = window.innerHeight / 2
  const mouseDistanceForMaxSpeed = Math.min(windowHalfX, windowHalfY) - 25

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.current = event.clientX - windowHalfX
      mouseY.current = event.clientY - windowHalfY
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const maxSpeed = 100
  const minSpeed = 40

  useFrame(() => {
    if (gliderRef.current) {
      // rotate
      const direction = new THREE.Vector3(mouseX.current, 0, mouseY.current)
      gliderRef.current.lookAt(gliderRef.current.position.clone().add(direction))

      // speed
      let speed = minSpeed
      // Calculate distance between mouse values and glider's position
      const mouseDistanceFromCenter = Math.abs(mouseX.current) + Math.abs(mouseY.current)

      // Only increase speed if glider is far away enough from mouse
      const distanceThresholdForSpeedIncrease = 150
      if (mouseDistanceFromCenter > distanceThresholdForSpeedIncrease) {
        // Calculate speed based on the distance
        const percentageToMaxSpeed = Math.min((mouseDistanceFromCenter - distanceThresholdForSpeedIncrease) / mouseDistanceForMaxSpeed, 1)
        speed = THREE.MathUtils.lerp(minSpeed, maxSpeed, percentageToMaxSpeed)
      }

      // move
      direction.normalize().multiplyScalar(speed)
      gliderRef.current.position.add(direction)
    }
  })
}
