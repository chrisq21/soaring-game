import React, {useEffect, useRef, useState} from 'react'
import * as THREE from 'three'

type ThermalProps = {
  pushThermalMeshRef: any
  nodes: any
  materials: any
}
// 9000, 20000
function Thermal({pushThermalMeshRef, nodes, materials}: ThermalProps) {
  const thermalMeshRef = useRef(null)
  const max = 40000
  const min = -10

  const xMax = 9000 * 2
  const xMin = -9000 * 2
  const [xOff, setXOff] = useState(Math.floor(Math.random() * (xMax - xMin + 1)) + xMin)
  const [zOff, setZOff] = useState(Math.floor(Math.random() * (max - min + 1)) + min)

  useEffect(() => {
    if (thermalMeshRef.current) {
      pushThermalMeshRef(thermalMeshRef.current)
    }
  }, [])
  return (
    <>
      <mesh
        name={`thermal`}
        geometry={new THREE.BoxGeometry(2000, 2000)}
        material={new THREE.MeshBasicMaterial({color: 'blue'})}
        receiveShadow
        position={[xOff, 100, -zOff]}
        rotation={[-Math.PI / 2, 0, 0]}
        ref={thermalMeshRef}
        // scale={0.1}
      />
      <mesh
        name="Cloud"
        geometry={nodes.Cloud.geometry}
        material={materials['Clouds B']}
        castShadow
        receiveShadow
        position={[xOff, 10000, -zOff]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        scale={10}
      />
    </>
  )
}

export default Thermal
