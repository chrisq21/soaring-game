import React, {useEffect, useRef, useState} from 'react'
import * as THREE from 'three'

function Thermal({pushThermalMeshRef}) {
  const thermalMeshRef = useRef(null)
  const [xOff, setXOff] = useState(Math.random() * 10000)
  const [zOff, setZOff] = useState(Math.random() * 1000)

  useEffect(() => {
    if (thermalMeshRef.current) {
      pushThermalMeshRef(thermalMeshRef.current)
    }
  }, [])
  return (
    <mesh
      name={`thermal`}
      geometry={new THREE.BoxGeometry(2000, 2000)}
      material={new THREE.MeshBasicMaterial({color: 'blue'})}
      castShadow
      receiveShadow
      position={[1964.87 - xOff, 30, 208.8 - zOff]}
      rotation={[-Math.PI / 2, 0, 0]}
      ref={thermalMeshRef}
      // scale={0.1}
    />
  )
}

export default Thermal
