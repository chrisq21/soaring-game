import useSpline from '@splinetool/r3f-spline'
import * as THREE from 'three'
import {useThree, useFrame} from '@react-three/fiber'
import React, {Ref, useEffect, useRef, useState} from 'react'

import CustomCamera from './CustomCamera'
import Glider from './Glider'
import Ground from './Ground'
import Lights from './Lights'
import Thermals from './Thermals'

export default function Scene({...props}) {
  const {nodes, materials} = useSpline('https://prod.spline.design/vnJ4BLS7Ojq1Qocw/scene.splinecode')

  const {camera} = useThree()
  const gliderRef = useRef(null)
  const raycasterRef = useRef(new THREE.Raycaster())

  const [isIntersecting, setIsIntersecting] = useState(false)
  const thermalMeshesArrayRef = useRef([])

  // Detect glider intersection with thermal
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
      if (!isIntersecting) {
        setIsIntersecting(true)
      }
    } else {
      if (isIntersecting) {
        setIsIntersecting(false)
      }
    }
  })

  return (
    <>
      <color attach="background" args={['#fbf1d6']} />
      <CustomCamera gliderRef={gliderRef} camera={camera} />
      <group {...props} dispose={null}>
        <group name="scene" position={[400.52, 348.03, -151.01]}>
          <Glider gliderRef={gliderRef} isIntersecting={isIntersecting} />
          <Ground nodes={nodes} materials={materials} isIntersecting={isIntersecting} />
          <Lights gliderRef={gliderRef} />
          <Thermals thermalMeshesArrayRef={thermalMeshesArrayRef} />
        </group>
      </group>
    </>
  )
}
