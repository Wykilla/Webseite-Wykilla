'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { assets } from '@/config/assets'
import LogoAnimation from './LogoAnimation'
import ParticleBackground from './ParticleBackground'

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="intro" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-ink">
        <ParticleBackground />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.01 : 1.2,
          ease: 'easeOut',
        }}
        className="relative z-10 text-center"
      >
        {/* Logo */}
        <LogoAnimation
          src={assets.hero.logo}
          alt="WYKILLA"
          width={200}
          height={200}
          className="mx-auto mb-8"
        />

        {/* Title */}
        <h1 className="font-display text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-cyan to-magenta bg-clip-text text-transparent">
          WYKILLA
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-white/80">
          Melodic Techno • 3D Art • AI Tools
        </p>

        {/* Scroll indicator */}
        <motion.div
          animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <svg
            className="w-6 h-10 text-cyan"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
