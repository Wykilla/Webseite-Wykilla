'use client'

import { useState } from 'react'
import { assets } from '@/config/assets'
import TrackCard from './TrackCard'
import AudioPlayer from './AudioPlayer'
import StreamingLinks from './StreamingLinks'

export default function MusicSection() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const tracks = assets.music.tracks

  const handlePlayTrack = (index: number) => {
    if (currentTrackIndex === index) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentTrackIndex(index)
      setIsPlaying(true)
    }
  }

  const handleTrackEnded = () => {
    const nextIndex = currentTrackIndex !== null ? (currentTrackIndex + 1) % tracks.length : 0
    setCurrentTrackIndex(nextIndex)
    setIsPlaying(true)
  }

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

        {/* Track grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {tracks.map((track, index) => (
            <TrackCard
              key={track.id}
              track={track}
              isPlaying={currentTrackIndex === index && isPlaying}
              onPlay={() => handlePlayTrack(index)}
            />
          ))}
        </div>

        {/* Streaming Links */}
        <StreamingLinks />

        {/* Audio player */}
        {currentTrackIndex !== null && (
          <div className="sticky bottom-8">
            <AudioPlayer
              track={tracks[currentTrackIndex]}
              onEnded={handleTrackEnded}
            />
          </div>
        )}
      </div>
    </section>
  )
}
