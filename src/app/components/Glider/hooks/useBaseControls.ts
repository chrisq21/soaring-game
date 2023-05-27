import {useKeyboardControls, useGravity, useLift, useForwardMovement, useMouseControlXZ} from '.'

export default (gliderRef: any, isInLift: boolean) => {
  useMouseControlXZ(gliderRef)
  useGravity(gliderRef)
  useLift(gliderRef, isInLift)
}
