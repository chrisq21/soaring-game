import React from 'react'

function GliderBody({gliderRef, nodes, materials}) {
  return (
    <group name="glider" position={[0, 3000, 0]} rotation={[-Math.PI, 0.45, -Math.PI]} scale={1.03} ref={gliderRef}>
      <mesh
        name="main part"
        geometry={nodes['main part'].geometry}
        material={materials.red}
        castShadow
        receiveShadow
        position={[7.59, 152.35, 128.09]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={[0.97, 0.98, 0.97]}
      />
      <mesh
        name="Cube 3"
        geometry={nodes['Cube 3'].geometry}
        material={materials['red 2']}
        castShadow
        receiveShadow
        position={[-0.48, 1.14, -16.72]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[1.29, 1.29, 1.25]}
      />
      <mesh
        name="Cylinder 9"
        geometry={nodes['Cylinder 9'].geometry}
        material={materials['red 2']}
        castShadow
        receiveShadow
        position={[-0.57, -100.93, -100.71]}
        rotation={[-Math.PI, 0, -Math.PI / 2]}
        scale={[1.29, 0.71, 1.29]}
      />
      <mesh
        name="Cylinder"
        geometry={nodes.Cylinder.geometry}
        material={materials['red 2']}
        castShadow
        receiveShadow
        position={[-0.57, -100.93, 74.38]}
        rotation={[-Math.PI, 0, -Math.PI / 2]}
        scale={[1.29, 0.71, 1.29]}
      />
      <mesh
        name="Cube 6"
        geometry={nodes['Cube 6'].geometry}
        material={materials.red}
        castShadow
        receiveShadow
        position={[-128.28, 46.09, -112.11]}
        rotation={[-Math.PI, -0.94, Math.PI]}
        scale={[-1.28, 1.28, 1.28]}
      />
      <mesh
        name="Cube 5"
        geometry={nodes['Cube 5'].geometry}
        material={materials.red}
        castShadow
        receiveShadow
        position={[120.94, 46.66, -123.48]}
        rotation={[-Math.PI, 0.8, Math.PI]}
        scale={[-1.28, 1.28, 1.28]}
      />
      <mesh
        name="Cube 13"
        geometry={nodes['Cube 13'].geometry}
        material={materials.yellow}
        castShadow
        receiveShadow
        position={[-2.69, 77.74, -72.3]}
        rotation={[3.14, -0.01, -3.13]}
        scale={1}
      />
      <mesh
        name="Sphere 4"
        geometry={nodes['Sphere 4'].geometry}
        material={materials.beige}
        castShadow
        receiveShadow
        position={[75.58, -73.28, 166.65]}
        rotation={[0.11, -0.01, 0]}
        scale={0.82}
      />
      <mesh
        name="Sphere 3"
        geometry={nodes['Sphere 3'].geometry}
        material={materials.beige}
        castShadow
        receiveShadow
        position={[-76.73, -73.31, 165.8]}
        rotation={[0.11, -0.01, 0]}
        scale={0.82}
      />
      <mesh
        name="Sphere 2"
        geometry={nodes['Sphere 2'].geometry}
        material={materials.beige}
        castShadow
        receiveShadow
        position={[71.26, -42.07, -187.33]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={0.93}
      />
      <mesh
        name="Sphere"
        geometry={nodes.Sphere.geometry}
        material={materials.beige}
        castShadow
        receiveShadow
        position={[-68.43, -43.26, -187.33]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={0.93}
      />
      <mesh
        name="Cube 16"
        geometry={nodes['Cube 16'].geometry}
        material={materials.yellow}
        castShadow
        receiveShadow
        position={[-52.3, -88.05, 159.2]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={1}
      />
      <mesh
        name="Cube 31"
        geometry={nodes['Cube 31'].geometry}
        material={materials.yellow}
        castShadow
        receiveShadow
        position={[-52.3, -85.48, -192.3]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={1}
      />
      <mesh
        name="Cube 9"
        geometry={nodes['Cube 9'].geometry}
        material={materials.yellow}
        castShadow
        receiveShadow
        position={[107.92, -59.98, -161.9]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={1}
      />
      <mesh
        name="Cube 8"
        geometry={nodes['Cube 8'].geometry}
        material={materials.yellow}
        castShadow
        receiveShadow
        position={[-107.53, -59.98, -161.9]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        scale={1}
      />
      <mesh
        name="Cube 7"
        geometry={nodes['Cube 7'].geometry}
        material={materials.yellow}
        castShadow
        receiveShadow
        position={[-68.61, -59.98, -186.99]}
        rotation={[-Math.PI, 0, Math.PI / 2]}
        scale={1}
      />
      <mesh
        name="Cube 61"
        geometry={nodes['Cube 61'].geometry}
        material={materials.yellow}
        castShadow
        receiveShadow
        position={[67.07, -59.98, -186.99]}
        rotation={[-Math.PI, 0, Math.PI / 2]}
        scale={1}
      />
      <mesh
        name="Cube 161"
        geometry={nodes['Cube 161'].geometry}
        material={materials.yellow}
        castShadow
        receiveShadow
        position={[52.28, -88.05, 159.2]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={1}
      />
      <mesh
        name="Cube 32"
        geometry={nodes['Cube 32'].geometry}
        material={materials.yellow}
        castShadow
        receiveShadow
        position={[55.88, -85.48, -192.29]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={1}
      />
      <mesh
        name="Cube 51"
        geometry={nodes['Cube 51'].geometry}
        material={materials['red 2']}
        castShadow
        receiveShadow
        position={[-68.76, -46.29, -186.92]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={1}
      />
      <mesh
        name="Cube 18"
        geometry={nodes['Cube 18'].geometry}
        material={materials['red 2']}
        castShadow
        receiveShadow
        position={[76.12, -76.93, 165.88]}
        rotation={[0.11, -0.01, 0]}
        scale={0.88}
      />
      <mesh
        name="Cube 17"
        geometry={nodes['Cube 17'].geometry}
        material={materials['red 2']}
        castShadow
        receiveShadow
        position={[-76.19, -76.96, 165.03]}
        rotation={[0.11, -0.01, 0]}
        scale={0.88}
      />
      <mesh
        name="Cube 4"
        geometry={nodes['Cube 4'].geometry}
        material={materials['red 2']}
        castShadow
        receiveShadow
        position={[70.64, -46.29, -186.92]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={1}
      />
      <mesh
        name="Cube 33"
        geometry={nodes['Cube 33'].geometry}
        material={materials['red 2']}
        castShadow
        receiveShadow
        position={[-0.15, -88.36, -11.86]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={1}
      />
      <group name="SPLINE" position={[0.21, -85.59, -197.74]} rotation={[-Math.PI, 0, -Math.PI]} scale={1}>
        <mesh
          name="S"
          geometry={nodes.S.geometry}
          material={materials.yellow}
          castShadow
          receiveShadow
          position={[-23.74, -6.46, -2.26]}
          scale={[0.63, 0.82, 0.91]}
        />
        <mesh
          name="P"
          geometry={nodes.P.geometry}
          material={materials.yellow}
          castShadow
          receiveShadow
          position={[-14.97, -6.46, -2.26]}
          scale={[0.63, 0.82, 0.91]}
        />
        <mesh
          name="L"
          geometry={nodes.L.geometry}
          material={materials.yellow}
          castShadow
          receiveShadow
          position={[-5.86, -6.46, -2.26]}
          scale={[0.63, 0.82, 0.91]}
        />
        <mesh
          name="I"
          geometry={nodes.I.geometry}
          material={materials.yellow}
          castShadow
          receiveShadow
          position={[1.66, -6.46, -2.26]}
          scale={[0.63, 0.82, 0.91]}
        />
        <mesh
          name="N"
          geometry={nodes.N.geometry}
          material={materials.yellow}
          castShadow
          receiveShadow
          position={[5.8, -6.46, -2.26]}
          scale={[0.63, 0.82, 0.91]}
        />
        <mesh
          name="E"
          geometry={nodes.E.geometry}
          material={materials.yellow}
          castShadow
          receiveShadow
          position={[15.59, -6.46, -2.26]}
          scale={[0.63, 0.82, 0.91]}
        />
      </group>
      <mesh
        name="Cube 15"
        geometry={nodes['Cube 15'].geometry}
        material={materials['yellow 2']}
        castShadow
        receiveShadow
        position={[0.45, -85.24, 163.19]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={1}
      />
      <mesh
        name="Cube 34"
        geometry={nodes['Cube 34'].geometry}
        material={materials['yellow 2']}
        castShadow
        receiveShadow
        position={[0.44, -85.24, -195.29]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={1}
      />
      <mesh
        name="Cube 35"
        geometry={nodes['Cube 35'].geometry}
        material={materials.beige}
        castShadow
        receiveShadow
        position={[1.27, -48.1, -199.64]}
        rotation={[-Math.PI, 0, -Math.PI]}
        scale={1}
      />
      <group name="Group 10" position={[80.92, -100.61, 74.64]} rotation={[0, 0, 0]} scale={1.73}>
        <mesh
          name="Cylinder 2"
          geometry={nodes['Cylinder 2'].geometry}
          material={materials['Cylinder 2 Material']}
          castShadow
          receiveShadow
          position={[2.62, 0.59, -0.14]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1}
        />
        <mesh
          name="Cylinder1"
          geometry={nodes.Cylinder1.geometry}
          material={materials.black}
          castShadow
          receiveShadow
          position={[-2.3, 0, 0]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[1.03, 1, 1]}
        />
      </group>

      <group name="Group 9" position={[33.78, 1.25, 183.24]} rotation={[-0.06, -Math.PI / 2, 0]} scale={1.41}>
        <mesh
          name="Cylinder 22"
          geometry={nodes['Cylinder 22'].geometry}
          material={materials['Cylinder 22 Material']}
          castShadow
          receiveShadow
          position={[2.62, 0.59, -0.14]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1}
        />
        <mesh
          name="Cylinder3"
          geometry={nodes.Cylinder3.geometry}
          material={materials.black}
          castShadow
          receiveShadow
          position={[-2.3, 0, 0]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[1.03, 1, 1]}
        />
      </group>
      <group name="Group 101" position={[-89.71, -100.61, 74.64]} rotation={[-Math.PI, 0, -Math.PI]} scale={1.73}>
        <mesh
          name="Cylinder 23"
          geometry={nodes['Cylinder 23'].geometry}
          material={materials['Cylinder 23 Material']}
          castShadow
          receiveShadow
          position={[2.62, 0.59, -0.14]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1}
        />
        <mesh
          name="Cylinder4"
          geometry={nodes.Cylinder4.geometry}
          material={materials.black}
          castShadow
          receiveShadow
          position={[-2.3, 0, 0]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[1.03, 1, 1]}
        />
      </group>
      <group name="Group 41" position={[-92.03, -100.61, -95.31]} rotation={[-Math.PI, 0, -Math.PI]} scale={1.73}>
        <mesh
          name="Cylinder 24"
          geometry={nodes['Cylinder 24'].geometry}
          material={materials['Cylinder 24 Material']}
          castShadow
          receiveShadow
          position={[1.28, 0.59, 2.67]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={1}
        />
        <mesh
          name="Cylinder5"
          geometry={nodes.Cylinder5.geometry}
          material={materials.black}
          castShadow
          receiveShadow
          position={[-3.65, 0, 2.8]}
          rotation={[Math.PI / 2, 0, -Math.PI / 2]}
          scale={[1.03, 1, 1]}
        />
      </group>
    </group>
  )
}

export default GliderBody
