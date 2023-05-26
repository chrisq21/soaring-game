import useSpline from '@splinetool/r3f-spline'
import * as THREE from 'three'
import {useThree, useFrame} from '@react-three/fiber'
import React, {useRef, useState} from 'react'

import CustomCamera from './Camera'
import Glider from './Glider'
import Ground from './Ground'
import Lights from './Lights'
import Thermals from './Thermals'
import {ControlTypes} from '../types/controls'

export default function Scene({...props}) {
  const {nodes, materials} = useSpline('https://prod.spline.design/vnJ4BLS7Ojq1Qocw/scene.splinecode')

  const {camera} = useThree()
  const gliderRef = useRef(null)

  /* Detect thermals | TODO move this somewhere else */
  const raycasterRef = useRef(new THREE.Raycaster())

  const [isInLift, setIsInLift] = useState(false)
  const thermalMeshesArrayRef = useRef([])

  const controlsType = ControlTypes.BACK

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

  return (
    <>
      <color attach="background" args={['#fbf1d6']} />
      <CustomCamera controlsType={controlsType} gliderRef={gliderRef} camera={camera} />
      <group {...props} dispose={null}>
        <group name="scene" position={[0, 0, 0]}>
          <Glider gliderRef={gliderRef} isInLift={isInLift} controlsType={controlsType} />
          <Ground nodes={nodes} materials={materials} isInLift={isInLift} />
          <Lights gliderRef={gliderRef} />
          <Thermals thermalMeshesArrayRef={thermalMeshesArrayRef} />
        </group>
      </group>
    </>
  )
}
