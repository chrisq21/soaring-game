import {useEffect} from 'react'
import {useFrame} from '@react-three/fiber'
import * as THREE from 'three'
import React from 'react'
import useSpline from '@splinetool/r3f-spline'
import Body from './Body'

/* Constants */
// const forwardVelocity = 0;
const forwardVelocity = 25
const turnVelocity = 0.05
const gravityStrength = 3
const liftStrength = 5

const gravityForce = new THREE.Vector3(0, -gravityStrength, 0)
const liftForce = new THREE.Vector3(0, liftStrength, 0)

function Car({carRef, isIntersecting}) {
  const {nodes, materials} = useSpline('https://prod.spline.design/vnJ4BLS7Ojq1Qocw/scene.splinecode')

  const groundCarHeight = -150 // TODO calculate from object

  // Gravity & Lift;
  useFrame(() => {
    if (carRef.current) {
      // Are we over a thermal?
      if (isIntersecting) {
        carRef.current.position.add(liftForce)
      } else {
        carRef.current.position.add(gravityForce)
      }

      // Check if the car has hit the ground
      if (carRef.current.position.y <= groundCarHeight) {
        carRef.current.position.y = groundCarHeight
      }
    }
  })

  useEffect(() => {
    let isTurningLeft = false
    let isTurningRight = false

    const moveForward = () => {
      if (carRef.current.position.y <= groundCarHeight) {
        // Stop moving forward if the car has hit the ground
        return
      }

      const forwardForce = new THREE.Vector3(0, 0, -forwardVelocity)
      const quaternion = new THREE.Quaternion()
      carRef.current.getWorldQuaternion(quaternion)
      forwardForce.applyQuaternion(quaternion)
      carRef.current.position.add(forwardForce)

      requestAnimationFrame(moveForward)
    }

    const turnLeft = () => {
      if (isTurningLeft) {
        carRef.current.rotateY(turnVelocity)
        requestAnimationFrame(turnLeft)
      }
    }

    const turnRight = () => {
      if (isTurningRight) {
        carRef.current.rotateY(-turnVelocity)
        requestAnimationFrame(turnRight)
      }
    }

    const startMovingForward = () => {
      moveForward()
    }

    const handleKeyDown = (event) => {
      if ((event.key === 'ArrowLeft' || event.key === 'a') && !isTurningLeft) {
        // Start turning left
        isTurningLeft = true
        turnLeft()
      } else if ((event.key === 'ArrowRight' || event.key === 'd') && !isTurningRight) {
        // Start turning right
        isTurningRight = true
        turnRight()
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

    // Start moving forward immediately
    startMovingForward()

    // Attach keyboard event listeners on component mount
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return <Body carRef={carRef} nodes={nodes} materials={materials} />
}

export default Car
