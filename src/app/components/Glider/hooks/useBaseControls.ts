import {useGravity, useLift, useMouseControlXZ} from '.'

export default (gliderRef: any, isInLift: boolean) => {
  useMouseControlXZ(gliderRef)
  useGravity(gliderRef)
  useLift(gliderRef, isInLift)
}
