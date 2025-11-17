'use client'

import { useEffect, useState, useRef } from 'react'
import { useLenis } from '@/hooks/useLenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { chapters } from '@/config/chapters'
import gsap from 'gsap'
import Image from 'next/image'

/**
 * Navigation Component
 *
 * Sticky navigation that appears after scrolling past the Hub section.
 * Features smooth scroll navigation to all chapters with glassmorphism styling.
 */

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeChapter, setActiveChapter] = useState<string>('intro')
  const navRef = useRef<HTMLElement>(null)
  const { scrollTo } = useLenis()
  const prefersReducedMotion = useReducedMotion()

  // Show navigation after Hub section (after ~100vh)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const shouldShow = scrollY > window.innerHeight * 0.8

      if (shouldShow !== isVisible) {
        setIsVisible(shouldShow)

        if (!prefersReducedMotion && navRef.current) {
          gsap.to(navRef.current, {
            y: shouldShow ? 0 : -100,
            opacity: shouldShow ? 1 : 0,
            duration: 0.4,
            ease: 'power2.out',
          })
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isVisible, prefersReducedMotion])

  // Track active chapter based on scroll position
  useEffect(() => {
    const handleScrollPosition = () => {
      const sections = chapters.map((ch) => ({
        id: ch.id,
        element: document.getElementById(ch.id),
      }))

      const scrollY = window.scrollY + window.innerHeight / 3

      for (const section of sections) {
        if (section.element) {
          const top = section.element.offsetTop
          const bottom = top + section.element.offsetHeight

          if (scrollY >= top && scrollY < bottom) {
            setActiveChapter(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScrollPosition, { passive: true })
    return () => window.removeEventListener('scroll', handleScrollPosition)
  }, [])

  const handleNavClick = (chapterId: string) => {
    scrollTo(`#${chapterId}`, { offset: -80 })
  }

  // Filter out intro and hub from navigation (they're pre-nav sections)
  const navChapters = chapters.filter(
    (ch) => !['intro', 'hub'].includes(ch.id)
  )

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
      style={{
        transform: prefersReducedMotion && !isVisible ? 'translateY(-100%)' : undefined,
        opacity: prefersReducedMotion && !isVisible ? 0 : undefined,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl px-6 py-3 shadow-lg shadow-black/20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo/placeholder-logo.svg"
              alt="WYKILLA"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="font-display font-bold text-xl bg-gradient-to-r from-cyan to-magenta bg-clip-text text-transparent">
              WYKILLA
            </span>
          </div>

          {/* Chapter Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navChapters.map((chapter) => {
              const isActive = activeChapter === chapter.id

              return (
                <button
                  key={chapter.id}
                  onClick={() => handleNavClick(chapter.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                  style={{
                    color: isActive ? chapter.color : undefined,
                  }}
                >
                  {chapter.name}
                </button>
              )
            })}
          </div>

          {/* Mobile Menu Button (for future implementation) */}
          <button
            className="md:hidden p-2 text-cyan hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
