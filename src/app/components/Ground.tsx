import React from 'react'
import {MeshBasicMaterial, BoxGeometry} from 'three'
function Ground({nodes, materials, isIntersecting}) {
  return (
    <>
      <group name="grass" position={[-605.09, -347.11, -23.08]}>
        <mesh
          name="ground"
          geometry={nodes.ground.geometry}
          material={materials.Ground}
          castShadow
          receiveShadow
          position={[0, 0, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={1}
        />
        <mesh
          name="grass1"
          geometry={nodes.grass1.geometry}
          material={materials.green}
          castShadow
          receiveShadow
          position={[1675.17, 50, -2693.73]}
          rotation={[-Math.PI / 2, 0, 0.08]}
          scale={1}
        />
        <mesh
          name="grass2"
          geometry={nodes.grass2.geometry}
          material={materials['grass2 Material']}
          castShadow
          receiveShadow
          position={[1710.49, 1952.91, -2053.18]}
          rotation={[-1.17, 50, 0.12]}
          scale={1}
        />
        {/* <mesh
          name="grass 4"
          ref={thermalMesh}
          geometry={new BoxGeometry(2000, 2000)}
          material={isIntersecting ? new MeshBasicMaterial({color: 'blue'}) : new MeshBasicMaterial({color: 'red'})}
          castShadow
          receiveShadow
          position={[1964.87, 50, 208.8]}
          rotation={[-Math.PI / 2, 0, 0]}
          // scale={0.1}
        /> */}
        <mesh
          name="grass3"
          geometry={nodes.grass3.geometry}
          material={materials.green}
          castShadow
          receiveShadow
          position={[1051.67, 50, -1440.49]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <mesh
          name="grass 7"
          geometry={nodes['grass 7'].geometry}
          material={materials.green}
          castShadow
          receiveShadow
          position={[169.94, 50, -1047.05]}
          rotation={[-Math.PI / 2, 0, 2.56]}
          scale={2}
        />
        <mesh
          name="grass 6"
          geometry={nodes['grass 6'].geometry}
          material={materials.green}
          castShadow
          receiveShadow
          position={[-945.19, 50, -1725.2]}
          rotation={[-Math.PI / 2, 0, -2.18]}
          scale={2}
        />
        <mesh
          name="grass 8"
          geometry={nodes['grass 8'].geometry}
          material={materials.green}
          castShadow
          receiveShadow
          position={[-2401.03, 50, 159.94]}
          rotation={[-Math.PI / 2, 0, -1.07]}
          scale={2}
        />
        <mesh
          name="grass 11"
          geometry={nodes['grass 11'].geometry}
          material={materials.green}
          castShadow
          receiveShadow
          position={[1407.35, 50, 608.57]}
          rotation={[-Math.PI / 2, 0, 0.81]}
          scale={2}
        />
        <mesh
          name="grass 5"
          geometry={nodes['grass 5'].geometry}
          material={materials.green}
          castShadow
          receiveShadow
          position={[-339.57, 50, 801.7]}
          rotation={[-Math.PI / 2, 0, -0.64]}
          scale={2}
        />
        <mesh
          name="grass4"
          geometry={nodes.grass4.geometry}
          material={materials.green}
          castShadow
          receiveShadow
          position={[-2342.55, 50, 246.2]}
          rotation={[-Math.PI / 2, 0, 0.34]}
          scale={2}
        />
        <mesh
          name="grass 9"
          geometry={nodes['grass 9'].geometry}
          material={materials.green}
          castShadow
          receiveShadow
          position={[-1502.46, 50, 1380.53]}
          rotation={[-Math.PI / 2, 0, -1.24]}
          scale={2}
        />
        <mesh
          name="grass 2"
          geometry={nodes['grass 2'].geometry}
          material={materials.green}
          castShadow
          receiveShadow
          position={[-618.23, 50, -1876.28]}
          rotation={[-Math.PI / 2, 0, -1.24]}
          scale={2}
        />
        <mesh
          name="grass5"
          geometry={nodes.grass5.geometry}
          material={materials.green}
          castShadow
          receiveShadow
          position={[-2254.74, 50, -328.9]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2}
        />
        <mesh
          name="grass 10"
          geometry={nodes['grass 10'].geometry}
          material={materials.white}
          castShadow
          receiveShadow
          position={[-829.37, 75, 114.65]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2}
        />
        <mesh
          name="grass 3"
          geometry={nodes['grass 3'].geometry}
          material={materials['grass 3 Material']}
          castShadow
          receiveShadow
          position={[-829.37, 50, 114.65]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2}
        />
        <mesh
          name="grass6"
          geometry={nodes.grass6.geometry}
          material={materials.green}
          castShadow
          receiveShadow
          position={[-1460.81, 50, -1419.08]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={2}
        />
      </group>
    </>
  )
}

export default Ground
