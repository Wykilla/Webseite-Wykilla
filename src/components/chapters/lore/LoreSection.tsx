'use client'

import { GlassmorphCard } from '@/components/ui'
import { assets } from '@/config/assets'

export default function LoreSection() {
  return (
    <section
      id="lore"
      className="relative min-h-screen py-20"
      style={{
        backgroundImage: `url(${assets.lore.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-bordeaux/60" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-bordeaux to-magenta bg-clip-text text-transparent">
            The Story
          </span>
        </h2>

        {/* Lore entries grid - will be populated in Story 6.2 */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Lore cards will be added in Story 6.2 */}
        </div>
      </div>
    </section>
  )
}
