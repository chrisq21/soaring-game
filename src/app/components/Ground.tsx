import React from 'react'
import {MeshBasicMaterial, BoxGeometry} from 'three'
function Ground({nodes, materials, isIntersecting}) {
  return (
    <>
      <group name="grass" position={[0, 0, 0]}>
        <mesh
          name="ground"
          geometry={new BoxGeometry(9000, 20000)}
          material={materials.Ground}
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={6}
        />
      </group>
    </>
  )
}

export default Ground
