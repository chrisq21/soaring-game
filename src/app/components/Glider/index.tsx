import React, {useEffect, useRef} from 'react'
import Body from './Body'
import useBaseControls from './hooks/useBaseControls'
import {useForwardMovement} from './hooks'
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
    const mouseX = useRef(0)
    const mouseY = useRef(0)

    useEffect(() => {
      const handleMouseMove = (event: MouseEvent) => {
        mouseX.current = ((event.clientX / window.innerWidth) * 2 - 1) * 100
        mouseY.current = ((1 - event.clientY / window.innerHeight) * 2 - 1) * 100
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }, [])

    useFrame(() => {
      if (gliderRef.current) {
        const mousePositionVector = new THREE.Vector3(mouseX.current, mouseY.current, 0)
        gliderRef.current.position.add(mousePositionVector)

        console.log(mouseY.current)
      }
    })
  }

  return <Body gliderRef={gliderRef} />
}

export default Glider
