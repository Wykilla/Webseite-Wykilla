/**
 * Audio Types
 * Type definitions for audio player and music system
 */

export interface AudioTrack {
  id: string
  title: string
  artist: string
  mp3: string
  ogg?: string
  duration: number // in seconds
  isPlaceholder: boolean
  artwork?: string
}

export interface AudioPlayerState {
  playing: boolean
  volume: number
  seek: number
  duration: number
  currentTrack: number
}

export interface WaveformData {
  data: number[]
  duration: number
}

export interface AudioControls {
  play: () => void
  pause: () => void
  toggle: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  fadeVolume: (target: number, duration: number) => void
  nextTrack: () => void
  prevTrack: () => void
}
