import {useEffect} from 'react'
import {useFrame} from '@react-three/fiber'
import * as THREE from 'three'
import React from 'react'
import useSpline from '@splinetool/r3f-spline'
import Body from './Body'

/* Constants */
// const forwardVelocity = 0;
const forwardStrength = 2000
const turnStrength = 3
const gravityStrength = 220
const liftStrength = 400

let isTurningLeft = false
let isTurningRight = false

function Glider({gliderRef, isIntersecting}) {
  const {nodes, materials} = useSpline('https://prod.spline.design/vnJ4BLS7Ojq1Qocw/scene.splinecode')

  const groundGliderHeight = 180 // TODO calculate from object

  // Keyboard listeners
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.key === 'ArrowLeft' || event.key === 'a') && !isTurningLeft) {
        // Start turning left
        isTurningLeft = true
      } else if ((event.key === 'ArrowRight' || event.key === 'd') && !isTurningRight) {
        // Start turning right
        isTurningRight = true
      }
    }

    const handleKeyUp = (event) => {
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

  const handleCarRotation = (key, delta) => {
    const turnVelocity = turnStrength * delta
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
      handleCarRotation('ArrowLeft', delta)
    } else if (isTurningRight) {
      handleCarRotation('ArrowRight', delta)
    }

    // Forward motion
    const moveForward = () => {
      if (gliderRef.current.position.y <= groundGliderHeight) {
        // Stop moving forward if the glider has hit the ground
        return
      }
      const forwardVelocity = forwardStrength * delta
      const forwardForce = new THREE.Vector3(0, 0, -forwardVelocity)
      const quaternion = new THREE.Quaternion()
      gliderRef.current.getWorldQuaternion(quaternion)
      forwardForce.applyQuaternion(quaternion)
      gliderRef.current.position.add(forwardForce)
    }

    moveForward()

    // Apply Gravity & Lift
    const leftVelocity = liftStrength * delta
    const liftForce = new THREE.Vector3(0, leftVelocity, 0)

    const gravityVelocity = gravityStrength * delta
    const gravityForce = new THREE.Vector3(0, -gravityVelocity, 0)
    if (gliderRef.current) {
      // Are we over a thermal?
      if (isIntersecting) {
        gliderRef.current.position.add(liftForce)
      } else {
        gliderRef.current.position.add(gravityForce)
      }

      // Check if the glider has hit the ground
      if (gliderRef.current.position.y <= groundGliderHeight) {
        gliderRef.current.position.y = groundGliderHeight
      }
    }
  })

  return <Body gliderRef={gliderRef} nodes={nodes} materials={materials} />
}

export default Glider
