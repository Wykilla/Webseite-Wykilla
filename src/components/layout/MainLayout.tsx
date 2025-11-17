'use client'

import { ReactNode } from 'react'
import ScrollContainer from './ScrollContainer'

/**
 * MainLayout Component
 *
 * Primary layout wrapper for the WYKILLA website.
 * Includes smooth scrolling container and future navigation components.
 */

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <ScrollContainer>
      <div className="relative min-h-screen bg-ink text-white overflow-hidden">
        {/* Navigation will be added in Story 0.8 */}

        {/* Main Content */}
        <main className="relative z-10">
          {children}
        </main>

        {/* Background gradient overlay */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-bordeaux/10 to-ink" />
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-cyan/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-magenta/5 blur-[120px] rounded-full" />
        </div>
      </div>
    </ScrollContainer>
  )
}
