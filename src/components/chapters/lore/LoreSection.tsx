'use client'

import { assets } from '@/config/assets'
import { loreEntries } from '@/config/lore'
import LoreCard from './LoreCard'

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

        {/* Lore entries grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {loreEntries.map((entry) => (
            <LoreCard
              key={entry.id}
              title={entry.title}
              text={entry.text}
              image={entry.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
