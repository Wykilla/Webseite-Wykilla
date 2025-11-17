'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function ParticleField() {
  const ref = useRef<THREE.Points>(null)

  // Generate random particle positions
  const particles = useMemo(() => {
    const count = 1000
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20 // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 // z
    }

    return positions
  }, [])

  // Animate particles
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
      ref.current.rotation.x = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <Points ref={ref} positions={particles} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4CC9F0"
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}
