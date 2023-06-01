import React, {useEffect, useRef} from 'react'
import Body from '../components/Glider/Body'
import {useGravity, useLift, useMouseControlXY, useMouseControlXZ} from '../components/Glider/hooks/'
import {ControlTypes} from '@/app/types/controls'
import {useFrame} from '@react-three/fiber'
import * as THREE from 'three'

type GliderProps = {
  gliderRef: any
  isInLift: boolean
  controlsType: ControlTypes
}

function Glider({gliderRef, isInLift, controlsType = ControlTypes.BASE}: GliderProps) {
  useMouseControlXY(gliderRef)

  return <Body gliderRef={gliderRef} />
}

export default Glider
