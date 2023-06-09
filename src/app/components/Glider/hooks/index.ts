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

    function handleTouch(event: TouchEvent) {
      // Prevent the default touch event behavior
      event.preventDefault()

      // Get the first touch object from the touches array
      const touch = event.touches[0]

      // Update the touch position
      mouseX.current = touch.clientX
      mouseY.current = touch.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouch, false)
    window.addEventListener('touchstart', handleTouch, false)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouch)
      window.removeEventListener('touchstart', handleTouch)
    }
  }, [])

  const turbulenceForce = useRef(new THREE.Vector3(0, 0, 0))
  const turbulenceElapsedTime = useRef(0)
  const turbulenceStartTime = useRef(0)
  const turbulenceComplete = useRef(true)

  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const startTurbulence = () => {
    turbulenceComplete.current = false
    const totalTurbTime = getRandomNumber(0.5, 3) // seconds

    turbulenceStartTime.current = performance.now()
    turbulenceForce.current = new THREE.Vector3((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, 0)

    const minTurb = 5
    const maxTurb = 30
    const turbulenceIntensity = getRandomNumber(minTurb, maxTurb)

    const applyTurb = () => {
      turbulenceElapsedTime.current = performance.now()
      const elapsedTime = (turbulenceElapsedTime.current - turbulenceStartTime.current) / 1000

      if (elapsedTime >= totalTurbTime) {
        turbulenceComplete.current = true
        turbulenceForce.current = new THREE.Vector3(0, 0, 0)
        turbulenceElapsedTime.current = 0
        return
      }

      // 0% -> 20% ease in to max turb
      // 10% -> 80% maintain max turb
      // 80% -> 100% ease out to zero turb

      const percentageToCompletion = (elapsedTime / totalTurbTime) * 100

      let adjustedIntensity = turbulenceIntensity

      if (percentageToCompletion < 20) {
        // lerp from 0 to max
        adjustedIntensity = THREE.MathUtils.lerp(0, turbulenceIntensity, percentageToCompletion / 20)
      } else if (percentageToCompletion > 80) {
        // lerp from max to 0
        adjustedIntensity = THREE.MathUtils.lerp(turbulenceIntensity, 0, (percentageToCompletion - 80) / 20)
      } else {
        // maintain max
        adjustedIntensity = turbulenceIntensity
      }

      turbulenceForce.current.normalize()
      if (adjustedIntensity > 0) {
        turbulenceForce.current.multiplyScalar(adjustedIntensity)
      }

      if (!turbulenceComplete.current) {
        requestAnimationFrame(applyTurb)
      }
    }
    applyTurb()
  }

  useFrame(() => {
    // Bounds
    const maxX = 8000
    const maxY = 10000
    const floor = 50
    const damping = 1.3
    const turbFrequency = 0.02

    if (gliderRef.current) {
      const mousePositionVector = new THREE.Vector3(mouseX.current / damping, mouseY.current / damping, 0)

      // Add turbulence
      // TODO Add easing in and out of the turbulence
      const shouldAddRandomTurb = Math.random() < turbFrequency // Adjust the probability of turbulence here
      if (shouldAddRandomTurb && turbulenceComplete.current) {
        startTurbulence()
      }

      // apply turb always, its usually zero
      mousePositionVector.add(turbulenceForce.current)

      gliderRef.current.position.add(mousePositionVector)

      // Restrict glider movement to bounds
      const gliderPosition = gliderRef.current.position

      if (Math.abs(gliderPosition.x) > maxX) {
        gliderPosition.x = maxX * Math.sign(gliderPosition.x)
      }

      if (Math.abs(gliderPosition.y) > maxY || gliderPosition.y < floor) {
        gliderPosition.y = Math.max(floor, Math.min(maxY, gliderPosition.y))
      }
    }
  })
}

export const getMouseControlledSpeed = (
  minSpeed: number = 40,
  maxSpeed: number = 100,
  mouseX: number,
  mouseY: number,
  distanceThresholdForSpeedIncrease: number = 150
) => {
  const windowHalfX = window.innerWidth / 2
  const windowHalfY = window.innerHeight / 2
  const mouseDistanceForMaxSpeed = Math.min(windowHalfX, windowHalfY) - 25
  let speed = minSpeed

  // Calculate distance between mouse values and glider's position
  const mouseDistanceFromCenter = Math.abs(mouseX) + Math.abs(mouseY)

  // Only increase speed if glider is far away enough from mouse
  if (mouseDistanceFromCenter > distanceThresholdForSpeedIncrease) {
    // Calculate speed based on the distance
    const percentageToMaxSpeed = Math.min((mouseDistanceFromCenter - distanceThresholdForSpeedIncrease) / mouseDistanceForMaxSpeed, 1)
    speed = THREE.MathUtils.lerp(minSpeed, maxSpeed, percentageToMaxSpeed)
  }

  return speed
}

// mouse move xz plane with damping
export const useMouseControlXZ = (gliderRef: any, modelRef: any) => {
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const windowHalfX = window.innerWidth / 2
  const windowHalfY = window.innerHeight / 2
  const minSpeed = 20
  const maxSpeed = 80
  const speed = useRef(minSpeed)
  const targetDirection = new THREE.Vector3(1, 1, 1)
  const currentDirection = new THREE.Vector3(1, 1, 1)
  const lerpFactor = 0.03

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.current = event.clientX - windowHalfX
      mouseY.current = event.clientY - windowHalfY

      speed.current = getMouseControlledSpeed(minSpeed, maxSpeed, mouseX.current, mouseY.current)
    }

    function handleTouch(event: TouchEvent) {
      // Prevent the default touch event behavior
      event.preventDefault()

      // Get the first touch object from the touches array
      const touch = event.touches[0]

      // Update the touch position
      mouseX.current = touch.clientX
      mouseY.current = touch.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouch, false)
    window.addEventListener('touchstart', handleTouch, false)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouch)
      window.removeEventListener('touchstart', handleTouch)
    }
  }, [])

  useFrame(() => {
    if (gliderRef.current && modelRef.current) {
      const targetDirection = new THREE.Vector3(mouseX.current, 0, mouseY.current)
      const glider = gliderRef.current

      // Calculate the current direction of the glider
      const currentDirection = glider.getWorldDirection(new THREE.Vector3())

      // Calculate the angle between the current direction and the target direction
      const angleBetween = currentDirection.angleTo(targetDirection)

      // Define the rotation speed (adjust this value as needed)
      const baseRotationSpeed = 0.03
      const maxRotationSpeed = 0.05

      // Check if the glider needs to rotate
      if (angleBetween > 0.01) {
        // determine speed by rotation
        let adjustedSpeed = baseRotationSpeed

        // Allow for faster speed at higher angle
        if (angleBetween > Math.PI / 2) {
          adjustedSpeed = THREE.MathUtils.lerp(baseRotationSpeed, maxRotationSpeed, angleBetween / Math.PI)
        }

        if (angleBetween < 1) {
          // dampen the speed when the angle is small (start and stop of turn)
          adjustedSpeed = baseRotationSpeed * angleBetween
        }
        // Calculate the incremental rotation amount
        const rotationAmount = Math.min(adjustedSpeed, angleBetween)

        // Determine the rotation direction based on cross product
        const crossProduct = new THREE.Vector3()
        crossProduct.crossVectors(currentDirection, targetDirection)
        const rotationDirection = crossProduct.y >= 0 ? 1 : -1

        // Apply the incremental rotation to the glider
        glider.rotation.y -= rotationDirection * rotationAmount

        // bank rotation
        let bankAngle = 0
        if (angleBetween > 0) {
          bankAngle = THREE.MathUtils.lerp(0, Math.PI / 4, angleBetween / Math.PI)
        }

        glider.children.forEach((child: any) => {
          child.rotation.set(0, Math.PI / 2, 0)
          // Apply bank to model
          child.rotateX(glider.quaternion.x + rotationDirection * bankAngle)
        })
      }

      // move
      const moveDirection = currentDirection.clone().normalize().multiplyScalar(speed.current)
      gliderRef.current.position.add(moveDirection)
    }
  })
}
