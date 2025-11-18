'use client'

import { useRef, useEffect } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Image from 'next/image'

interface LogoAnimationProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export default function LogoAnimation({
  src,
  alt,
  width = 200,
  height = 200,
  className = '',
}: LogoAnimationProps) {
  const logoRef = useRef<HTMLDivElement>(null)
  const { gsap } = useGSAP()
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !logoRef.current || !gsap) return

    // Enhanced multi-layer animation
    const timeline = gsap.timeline({ repeat: -1 })
    
    // Glow pulse animation (stärker und auffälliger)
    timeline.to(logoRef.current, {
      filter: 'drop-shadow(0 0 30px rgba(76, 201, 240, 1)) drop-shadow(0 0 60px rgba(76, 201, 240, 0.6))',
      duration: 2,
      ease: 'sine.inOut',
    })
    .to(logoRef.current, {
      filter: 'drop-shadow(0 0 15px rgba(76, 201, 240, 0.6)) drop-shadow(0 0 30px rgba(76, 201, 240, 0.3))',
      duration: 2,
      ease: 'sine.inOut',
    })
    
    // Subtile Scale Animation für mehr Dynamik
    gsap.to(logoRef.current, {
      scale: 1.05,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    return () => {
      timeline.kill()
      gsap.killTweensOf(logoRef.current)
    }
  }, [gsap, prefersReducedMotion])

  return (
    <div
      ref={logoRef}
      className={`glow-cyan transition-transform duration-300 ${className}`}
      style={{
        filter: prefersReducedMotion
          ? 'drop-shadow(0 0 15px rgba(76, 201, 240, 0.6)) drop-shadow(0 0 30px rgba(76, 201, 240, 0.3))'
          : 'drop-shadow(0 0 20px rgba(76, 201, 240, 0.8)) drop-shadow(0 0 40px rgba(76, 201, 240, 0.4))',
        transformOrigin: 'center center',
      }}
    >
      <Image 
        src={src} 
        alt={alt} 
        width={width} 
        height={height} 
        priority
        className="drop-shadow-lg"
        style={{
          filter: 'brightness(1.1) contrast(1.05)',
        }}
      />
    </div>
  )
}
