import {useKeyboardControls, useGravity, useLift, useForwardMovement} from '.'

export default (gliderRef: any, isInLift: boolean) => {
  useKeyboardControls(gliderRef)
  useGravity(gliderRef)
  useLift(gliderRef, isInLift)
  useForwardMovement(gliderRef)
}
