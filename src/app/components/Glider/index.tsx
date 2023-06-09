import React, {useEffect, useRef} from 'react'
import Body from './Body'
import useBaseControls from './hooks/useBaseControls'
import {useForwardMovement, useGravity, useLift, useMouseControlXY, useMouseControlXZ} from './hooks'
import {ControlTypes} from '@/app/types/controls'
import {useFrame} from '@react-three/fiber'
import * as THREE from 'three'

type GliderProps = {
  gliderRef: any
  isInLift: boolean
  controlsType: ControlTypes
}

function Glider({gliderRef, isInLift, controlsType = ControlTypes.BASE}: GliderProps) {
  const modelRef = useRef()
  return <Body gliderRef={gliderRef} modelRef={modelRef} />
}

export default Glider
