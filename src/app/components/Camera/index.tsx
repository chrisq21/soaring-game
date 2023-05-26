import React, {useEffect} from 'react'
import {Camera, useFrame, useThree} from '@react-three/fiber'
import {PerspectiveCamera, OrbitControls, OrthographicCamera} from '@react-three/drei'
import CameraFollow from './CameraFollow'
import {ControlTypes} from '@/app/types/controls'

type BaseCameraProps = {
  gliderRef: any
  camera: Camera
}

type BackCameraProps = {
  gliderRef: any
  camera: Camera
}

type OrbitCameraProps = {
  gliderRef: any
  camera: Camera
}

type CustomCameraProps = {
  gliderRef: any
  camera: Camera
  controlsType: ControlTypes
}

/* Base Camera (keyboard controls, diaganol view from above) */
function BaseCamera({gliderRef, camera}: BaseCameraProps) {
  const {viewport} = useThree()
  const {width, height} = viewport
  const offsets = {x: 0, y: 500, z: 1000}

  useEffect(() => {
    // Start near glider
    if (gliderRef.current) {
      const {y, z} = offsets
      const gliderPosition = gliderRef.current.position
      camera.position.set(gliderPosition.x, gliderPosition.y + y, gliderPosition.z + z)
      camera.lookAt(gliderPosition)
    }
  }, [])

  return (
    <>
      <PerspectiveCamera fov={75} aspect={width / height} near={0.1} far={100000} name="Camera" makeDefault={true} />
      <CameraFollow gliderRef={gliderRef} camera={camera} offsets={offsets} />
    </>
  )
}

/* BackView camera */
function BackCamera({gliderRef, camera}: BackCameraProps) {
  const {viewport} = useThree()
  const {width, height} = viewport
  const offsets = {x: 0, y: 100, z: 400}

  useEffect(() => {
    // Start near glider
    if (gliderRef.current) {
      const {y, z} = offsets
      const gliderPosition = gliderRef.current.position
      camera.position.set(gliderPosition.x, gliderPosition.y + y, gliderPosition.z + z)
      camera.lookAt(gliderPosition)
    }
  }, [])

  return (
    <>
      <PerspectiveCamera fov={75} aspect={width / height} near={0.1} far={100000} name="Camera" makeDefault={true} />
      <CameraFollow gliderRef={gliderRef} camera={camera} offsets={offsets} />
    </>
  )
}

/* Orbit camera */
function OrbitCamera({gliderRef, camera}: OrbitCameraProps) {
  const {viewport} = useThree()
  const {width, height} = viewport

  useEffect(() => {
    if (gliderRef.current) {
      // set glider to the ground, for orbit's sake
      gliderRef.current.position.set(0, 100, 0)
    }
  }, [])

  return (
    <>
      <PerspectiveCamera position={[1975.09, 2452.52, 5007.95]} fov={75} aspect={width / height} near={0.1} far={100000} name="Camera" makeDefault={true} />
      <OrbitControls />
    </>
  )
}

/* Determine camera by controls prop */
function CustomCamera({gliderRef, camera, controlsType}: CustomCameraProps) {
  return (
    <>
      {controlsType === ControlTypes.BASE && <BaseCamera gliderRef={gliderRef} camera={camera} />}
      {controlsType === ControlTypes.BACK && <BackCamera gliderRef={gliderRef} camera={camera} />}
      {controlsType === ControlTypes.ORBIT && <OrbitCamera gliderRef={gliderRef} camera={camera} />}
    </>
  )
}

export default CustomCamera
