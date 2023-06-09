import useSpline from '@splinetool/r3f-spline'
import * as THREE from 'three'
import {useThree, useFrame} from '@react-three/fiber'
import React, {useRef, useState} from 'react'

import CustomCamera from '../components/Camera'
import Glider from './Glider'
import Ground from '../components/Ground'
import Lights from '../components/Lights'
import Thermals from '../components/Thermals'
import {ControlTypes} from '../types/controls'

export default function Scene({...props}) {
  const {nodes, materials} = useSpline('https://prod.spline.design/zbNFDumFMuwLUsXd/scene.splinecode')

  const {camera} = useThree()
  const gliderRef = useRef(null)

  /* Detect thermals | TODO move this somewhere else */
  const raycasterRef = useRef(new THREE.Raycaster())

  const [isInLift, setIsInLift] = useState(false)
  const thermalMeshesArrayRef = useRef([])

  const controlsType = ControlTypes.BASE

  // Detect glider intersection with thermals
  useFrame(() => {
    if (!gliderRef.current || !raycasterRef.current || !thermalMeshesArrayRef.current) return

    const raycaster = raycasterRef.current
    const gliderMesh = gliderRef.current
    const boundingBox = new THREE.Box3().setFromObject(gliderMesh)
    const center = new THREE.Vector3()
    center.addVectors(boundingBox.min, boundingBox.max).multiplyScalar(0.5)

    // Update the position of the raycaster to match the glider's position
    raycaster.set(center, new THREE.Vector3(0, -1, 0))

    // Perform raycasting
    const intersects = raycaster.intersectObjects(thermalMeshesArrayRef.current)

    // // Process the raycasting results
    if (intersects.length > 0) {
      if (!isInLift) {
        setIsInLift(true)
      }
    } else {
      if (isInLift) {
        setIsInLift(false)
      }
    }
  })

  /* 
  

  Speed control

  * I need the speed to not be snappy
  * Pitching forwarrd (moving mouse forward) should result in a slow acceleration
  * Pitching back should result in slow deceleration



  ----
    # Speed to altitude conversion



    For transferring speed to lift, 
    - if your bank angle decreases, your altitude += your previous speed (divided by something)
    - if your bank angle increases, your altitude -= your current speed

    - Simplified
    * Going from low speed to high speed:
      * Altitude decreases at constant rate
    * Going from high speed to low speed
      * Altitude increases for a brief amount of time
      * 
    
    Caveat: The glider won't increase alttitude if the pitch angle is never above the horizon, which you can't do in this game

  */

  return (
    <>
      {/* <color attach="background" args={['#fbf1d6']} /> */}
      <color attach="background" args={['#d2ebf4']} />
      {/* <fog attach="fog" args={['#d2ebf4', 2500, 4227]} /> */}
      <CustomCamera controlsType={controlsType} gliderRef={gliderRef} camera={camera} />
      <group {...props} dispose={null}>
        <group name="scene" position={[0, 0, 0]}>
          <Glider gliderRef={gliderRef} isInLift={isInLift} controlsType={controlsType} />
          <Ground nodes={nodes} materials={materials} isInLift={isInLift} />
          <Lights gliderRef={gliderRef} />
          <Thermals thermalMeshesArrayRef={thermalMeshesArrayRef} nodes={nodes} materials={materials} />
        </group>
      </group>
    </>
  )
}
