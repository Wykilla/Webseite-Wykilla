'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import ProceduralScene from './ProceduralScene'
import ParticleField from './ParticleField'

export default function WorldSection() {
  return (
    <section id="world" className="relative h-screen overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <Canvas>
          {/* Camera */}
          <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />

          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#4CC9F0" />
          <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#FF3AC0" />

          {/* Controls (optional - allows user to rotate camera) */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
          />

          {/* Particle Background */}
          <ParticleField />

          {/* 3D Scene */}
          <ProceduralScene />
        </Canvas>
      </div>

      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h2 className="font-display text-6xl md:text-8xl font-bold text-center">
          <span className="bg-gradient-to-r from-cyan to-magenta bg-clip-text text-transparent">
            3D Universe
          </span>
        </h2>
      </div>
    </section>
  )
}
