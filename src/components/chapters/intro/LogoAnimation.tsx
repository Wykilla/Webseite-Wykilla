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

    // Glow pulse animation
    const animation = gsap.to(logoRef.current, {
      filter: 'drop-shadow(0 0 20px rgba(76, 201, 240, 0.8))',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })

    return () => {
      animation.kill()
    }
  }, [gsap, prefersReducedMotion])

  return (
    <div
      ref={logoRef}
      className={`glow-cyan transition-transform duration-300 ${className}`}
      style={{
        filter: prefersReducedMotion
          ? 'drop-shadow(0 0 10px rgba(76, 201, 240, 0.4))'
          : undefined,
      }}
    >
      <Image src={src} alt={alt} width={width} height={height} priority />
    </div>
  )
}
