'use client'

import { useState, useEffect, useRef } from 'react'
import { Howl } from 'howler'
import { GlassmorphCard, Button } from '@/components/ui'
import type { AudioTrack } from '@/types/audio'

interface AudioPlayerProps {
  track: AudioTrack
  onEnded?: () => void
}

export default function AudioPlayer({ track, onEnded }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const soundRef = useRef<Howl | null>(null)
  const animationRef = useRef<number>()

  // Initialize Howler
  useEffect(() => {
    soundRef.current = new Howl({
      src: [track.mp3],
      html5: true,
      volume: volume,
      onend: () => {
        setIsPlaying(false)
        setCurrentTime(0)
        onEnded?.()
      },
    })

    return () => {
      soundRef.current?.unload()
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [track, volume, onEnded])

  // Update current time
  useEffect(() => {
    if (!isPlaying) return

    const updateTime = () => {
      if (soundRef.current) {
        setCurrentTime(soundRef.current.seek() as number)
      }
      animationRef.current = requestAnimationFrame(updateTime)
    }

    animationRef.current = requestAnimationFrame(updateTime)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying])

  const togglePlay = () => {
    if (!soundRef.current) return

    if (isPlaying) {
      soundRef.current.pause()
    } else {
      soundRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!soundRef.current) return

    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    const time = percent * track.duration
    soundRef.current.seek(time)
    setCurrentTime(time)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${String(secs).padStart(2, '0')}`
  }

  return (
    <GlassmorphCard intensity="high" glow className="p-6">
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <Button variant="primary" size="md" glow onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>

        {/* Track Info */}
        <div className="flex-1">
          <p className="font-display font-bold">{track.title}</p>
          <p className="text-sm text-white/60">{track.artist}</p>
        </div>

        {/* Time */}
        <div className="text-sm text-white/80">
          {formatTime(currentTime)} / {formatTime(track.duration)}
        </div>
      </div>

      {/* Progress Bar */}
      <div
        className="mt-4 h-2 bg-white/10 rounded-full cursor-pointer overflow-hidden"
        onClick={handleSeek}
      >
        <div
          className="h-full bg-gradient-to-r from-magenta to-cyan transition-all"
          style={{ width: `${(currentTime / track.duration) * 100}%` }}
        />
      </div>

      {/* Volume Control */}
      <div className="mt-4 flex items-center gap-3">
        <span className="text-sm text-white/60">Volume</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            const vol = parseFloat(e.target.value)
            setVolume(vol)
            soundRef.current?.volume(vol)
          }}
          className="flex-1"
        />
      </div>
    </GlassmorphCard>
  )
}
