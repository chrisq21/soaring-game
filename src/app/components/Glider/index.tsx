import {useEffect} from 'react'
import {useFrame} from '@react-three/fiber'
import * as THREE from 'three'
import React from 'react'
import useSpline from '@splinetool/r3f-spline'
import Body from './Body'
import useBaseControls from './hooks/useBaseControls'
import {useForwardMovement} from './hooks'

enum ControlTypes {
  BASE = 'base',
  BACK = 'back',
}

type GliderProps = {
  gliderRef: any
  isInLift: boolean
  controls: ControlTypes
}

function Glider({gliderRef, isInLift, controls = ControlTypes.BACK}: GliderProps) {
  console.log('controls', controls)
  const {nodes, materials} = useSpline('https://prod.spline.design/vnJ4BLS7Ojq1Qocw/scene.splinecode')

  if (controls === ControlTypes.BASE) {
    useBaseControls(gliderRef, isInLift)
  }

  if (controls === ControlTypes.BACK) {
    useForwardMovement(gliderRef)
  }

  return <Body gliderRef={gliderRef} nodes={nodes} materials={materials} />
}

export default Glider
