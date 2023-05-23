import React from 'react'
import Thermal from './Thermal'

function Thermals({thermalMeshesArrayRef}) {
  const getAllThermals = () => {
    const pushThermalMeshRef = (thermalMeshRef) => {
      if (!thermalMeshesArrayRef.current || !thermalMeshRef) {
        return
      }
      thermalMeshesArrayRef.current.push(thermalMeshRef)
    }

    const thermalComponents = new Array(10).fill(1).map((_, index) => <Thermal key={index} pushThermalMeshRef={pushThermalMeshRef} />)

    return thermalComponents
  }

  return <>{getAllThermals()}</>
}

export default Thermals
