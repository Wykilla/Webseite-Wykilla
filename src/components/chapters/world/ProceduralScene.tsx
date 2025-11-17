'use client'

import { useRef } from 'react'
import { Mesh } from 'three'

export default function ProceduralScene() {
  return (
    <group>
      {/* Central Sphere - Cyan glow */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#4CC9F0"
          emissive="#4CC9F0"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Orbiting Torus - Magenta */}
      <mesh position={[2.5, 0, 0]} rotation={[Math.PI / 4, 0, Math.PI / 4]}>
        <torusGeometry args={[0.8, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#FF3AC0"
          emissive="#FF3AC0"
          emissiveIntensity={0.4}
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Floating Boxes - Gold */}
      <mesh position={[-2, 1.5, -1]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color="#FFD580"
          emissive="#FFD580"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh position={[-2.5, -1, 0.5]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial
          color="#FFD580"
          emissive="#FFD580"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Cone - Bordeaux */}
      <mesh position={[1.5, -1.5, -2]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.5, 1.5, 32]} />
        <meshStandardMaterial
          color="#6C002A"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Icosahedron - Cyan */}
      <mesh position={[0, 2, -3]}>
        <icosahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial
          color="#4CC9F0"
          wireframe
        />
      </mesh>
    </group>
  )
}
