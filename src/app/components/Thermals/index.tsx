import React from 'react'
import Thermal from './Thermal'

function Thermals({thermalMeshesArrayRef}) {
  const getAllThermals = () => {
    const thermalComponents = []

    const pushThermalMeshRef = (thermalMeshRef) => {
      if (!thermalMeshesArrayRef.current || !thermalMeshRef) {
        return
      }
      thermalMeshesArrayRef.current.push(thermalMeshRef)
    }

    thermalComponents.push(<Thermal key={0} pushThermalMeshRef={pushThermalMeshRef} />)
    thermalComponents.push(<Thermal key={1} pushThermalMeshRef={pushThermalMeshRef} />)
    thermalComponents.push(<Thermal key={2} pushThermalMeshRef={pushThermalMeshRef} />)

    return thermalComponents
  }

  return <>{getAllThermals()}</>
}

export default Thermals
