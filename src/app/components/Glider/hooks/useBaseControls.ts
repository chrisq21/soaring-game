import {useGravity, useLift, useMouseControlXZ} from '.'

export default (gliderRef: any, isInLift: boolean) => {
  // useMouseControlXZ(gliderRef, modelRef)
  useGravity(gliderRef)
  useLift(gliderRef, isInLift)
}
