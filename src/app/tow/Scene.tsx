import useSpline from '@splinetool/r3f-spline'
import {useThree} from '@react-three/fiber'
import React, {useRef} from 'react'

import CustomCamera from '../components/Camera'
import Glider from '../components/Glider'
import Ground from '../components/Ground'
import Lights from '../components/Lights'
import {ControlTypes} from '../types/controls'

export default function Scene({...props}) {
  const {nodes, materials} = useSpline('https://prod.spline.design/vnJ4BLS7Ojq1Qocw/scene.splinecode')

  const {camera} = useThree()
  const gliderRef = useRef(null)

  const controlsType = ControlTypes.BACK

  return (
    <>
      <color attach="background" args={['#fbf1d6']} />
      <CustomCamera controlsType={controlsType} gliderRef={gliderRef} camera={camera} />
      <group {...props} dispose={null}>
        <group name="scene" position={[0, 0, 0]}>
          <Glider gliderRef={gliderRef} isInLift={false} controlsType={controlsType} />
          <Ground nodes={nodes} materials={materials} isInLift={false} />
          <Lights gliderRef={gliderRef} />
        </group>
      </group>
    </>
  )
}
