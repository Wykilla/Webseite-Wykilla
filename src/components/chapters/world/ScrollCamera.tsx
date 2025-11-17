'use client'

import { useRef, useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollCamera() {
  const { camera } = useThree()
  const cameraRef = useRef(camera)

  useEffect(() => {
    const section = document.getElementById('world')
    if (!section) return

    gsap.to(cameraRef.current.position, {
      z: 2,
      x: 2,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    gsap.to(cameraRef.current.rotation, {
      y: Math.PI / 4,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return null // This component doesn't render anything
}
