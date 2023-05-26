import {useEffect} from 'react'
import {useFrame} from '@react-three/fiber'
import * as THREE from 'three'
import React from 'react'
import useSpline from '@splinetool/r3f-spline'
import Body from './Body'
import useBaseControls from './hooks/useBaseControls'

enum ControlTypes {
  BASE = 'base',
}

type GliderProps = {
  gliderRef: any
  isInLift: boolean
  controls: ControlTypes
}

function Glider({gliderRef, isInLift, controls = ControlTypes.BASE}: GliderProps) {
  const {nodes, materials} = useSpline('https://prod.spline.design/vnJ4BLS7Ojq1Qocw/scene.splinecode')

  if ((controls = ControlTypes.BASE)) {
    useBaseControls(gliderRef, isInLift)
  }

  return <Body gliderRef={gliderRef} nodes={nodes} materials={materials} />
}

export default Glider
