'use client'

import { Card } from '@/components/ui'
import type { AudioTrack } from '@/types/audio'
import Image from 'next/image'

interface TrackCardProps {
  track: AudioTrack
  isPlaying: boolean
  onPlay: () => void
}

export default function TrackCard({ track, isPlaying, onPlay }: TrackCardProps) {
  return (
    <Card
      hover
      className="group cursor-pointer relative overflow-hidden track-card"
      onClick={onPlay}
    >
      {/* Artwork */}
      <div className="relative h-48 bg-gradient-to-br from-magenta/20 to-cyan/20 mb-4 rounded-lg overflow-hidden">
        {track.artwork ? (
          <Image
            src={track.artwork}
            alt={track.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">🎵</span>
          </div>
        )}

        {/* Play button overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-magenta flex items-center justify-center glow-magenta">
            {isPlaying ? (
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                <rect x="14" y="4" width="4" height="16" fill="currentColor" />
              </svg>
            ) : (
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Track info */}
      <h3 className="font-display text-xl font-bold mb-1">{track.title}</h3>
      <p className="text-white/60 text-sm">{track.artist}</p>
      <p className="text-white/40 text-xs mt-2">
        {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
      </p>
    </Card>
  )
}
