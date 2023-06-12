import React from 'react'
import Thermal from './Thermal'

type ThermalsProps = {
  thermalMeshesArrayRef: any
  nodes: any
  materials: any
}

function Thermals({thermalMeshesArrayRef, nodes, materials}: ThermalsProps) {
  const getAllThermals = () => {
    const pushThermalMeshRef = (thermalMeshRef: any) => {
      if (!thermalMeshesArrayRef.current || !thermalMeshRef) {
        return
      }
      thermalMeshesArrayRef.current.push(thermalMeshRef)
    }

    const thermalComponents = new Array(10)
      .fill(1)
      .map((_, index) => <Thermal key={index} pushThermalMeshRef={pushThermalMeshRef} materials={materials} nodes={nodes} />)

    return thermalComponents
  }

  return <>{getAllThermals()}</>
}

export default Thermals
