'use client'

import { useState } from 'react'
import { assets } from '@/config/assets'
import type { AudioTrack } from '@/types/audio'

export default function MusicSection() {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null)

  return (
    <section
      id="music"
      className="relative min-h-screen py-20 bg-gradient-to-b from-ink via-magenta/10 to-ink"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-magenta to-cyan bg-clip-text text-transparent">
            Music
          </span>
        </h2>

        <p className="text-xl text-white/80 text-center mb-16 max-w-3xl mx-auto">
          Cinematic soundscapes crafted to take you on an emotional journey.
          Each track tells a story.
        </p>

        {/* Track grid will be added in Story 3.2 */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* TrackCard components */}
        </div>

        {/* Audio player will be added in Story 3.3 */}
        {currentTrack && (
          <div className="sticky bottom-8">
            {/* AudioPlayer component */}
          </div>
        )}
      </div>
    </section>
  )
}
