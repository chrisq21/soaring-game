import React from 'react'
import {MeshBasicMaterial, BoxGeometry} from 'three'
function Ground({nodes, materials, isInLift}) {
  return (
    <>
      <group name="grass" position={[0, 0, 0]}>
        {/* <fog attach="fog" args={['#d2ebf4', 2500, 4227]} /> */}
        {/* <mesh
          name="Ocean"
          geometry={nodes.Ocean.geometry}
          castShadow
          receiveShadow
          material={materials.Water}
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={100}
        /> */}
        {/* <mesh
          name="Cloud"
          geometry={nodes.Cloud.geometry}
          material={materials['Clouds B']}
          castShadow
          receiveShadow
          position={[100, 100, 100]}
          rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
          scale={1}
        />
        <mesh
          name="Cloud1"
          geometry={nodes.Cloud1.geometry}
          material={materials['Clouds B']}
          castShadow
          receiveShadow
          position={[200, 200, 200]}
          rotation={[-Math.PI / 2, 0, -1.74]}
          scale={1}
        />
        <mesh
          name="Cloud2"
          geometry={nodes.Cloud2.geometry}
          material={materials['Clouds A']}
          castShadow
          receiveShadow
          position={[300, 300, 300]}
          rotation={[0.38, 0.31, -0.12]}
          scale={1}
        />
        <mesh name="Cloud3" geometry={nodes.Cloud3.geometry} material={materials['Clouds A']} castShadow receiveShadow position={[400, 400, 400]} />
        <mesh name="Cloud4" geometry={nodes.Cloud4.geometry} material={materials['Clouds A']} castShadow receiveShadow position={[500, 500, 500]} /> */}
      </group>
    </>
  )
}

export default Ground
