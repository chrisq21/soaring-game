import React, {useEffect, useRef} from 'react'
import Body from './Body'
import useBaseControls from './hooks/useBaseControls'
import {useForwardMovement, useMouseControlXY, useMouseControlXZ} from './hooks'
import {ControlTypes} from '@/app/types/controls'
import {useFrame} from '@react-three/fiber'
import * as THREE from 'three'

type GliderProps = {
  gliderRef: any
  isInLift: boolean
  controlsType: ControlTypes
}

function Glider({gliderRef, isInLift, controlsType = ControlTypes.BASE}: GliderProps) {
  if (controlsType === ControlTypes.BASE) {
    useBaseControls(gliderRef, isInLift)
  }

  if (controlsType === ControlTypes.BACK) {
    useMouseControlXY(gliderRef)
  }

  return <Body gliderRef={gliderRef} />
}

export default Glider
