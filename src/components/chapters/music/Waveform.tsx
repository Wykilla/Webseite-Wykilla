'use client'

import { useEffect, useRef } from 'react'

interface WaveformProps {
  isPlaying: boolean
  currentTime: number
  duration: number
}

export default function Waveform({ isPlaying, currentTime, duration }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const barCount = 100
    const barWidth = width / barCount
    const progress = currentTime / duration

    ctx.clearRect(0, 0, width, height)

    // Draw bars
    for (let i = 0; i < barCount; i++) {
      const barHeight = Math.random() * height * 0.8
      const isPassed = i / barCount < progress

      ctx.fillStyle = isPassed
        ? 'rgba(255, 58, 192, 0.8)' // magenta
        : 'rgba(255, 255, 255, 0.2)'

      ctx.fillRect(
        i * barWidth,
        height / 2 - barHeight / 2,
        barWidth - 2,
        barHeight
      )
    }
  }, [currentTime, duration])

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={100}
      className="w-full h-24 rounded-lg"
    />
  )
}
