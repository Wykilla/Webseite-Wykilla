'use client'

import { useState } from 'react'
import { Input, Button } from '@/components/ui'
import type { LyricGeneratorRequest, LyricGeneratorResponse } from '@/types/api'

export default function LyricGenerator() {
  const [emotion, setEmotion] = useState('')
  const [theme, setTheme] = useState('')
  const [keywords, setKeywords] = useState('')
  const [lyrics, setLyrics] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [usageRemaining, setUsageRemaining] = useState<number | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    setError('')

    try {
      const request: LyricGeneratorRequest = {
        emotion,
        theme,
        keywords: keywords.split(',').map((k) => k.trim()).filter(Boolean),
      }

      const response = await fetch('/api/tools/lyric-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Generation failed')
      }

      const data: LyricGeneratorResponse = await response.json()
      setLyrics(data.lyrics)
      setUsageRemaining(data.usageRemaining)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to generate lyrics. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
        <h3 className="font-display text-2xl font-bold mb-6">
          <span className="bg-gradient-to-r from-gold to-magenta bg-clip-text text-transparent">
            Lyric Generator
          </span>
        </h3>

        <div className="space-y-6">
          <Input
            label="Emotion (optional)"
            placeholder="e.g., Hopeful, Melancholic, Energetic"
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            fullWidth
          />

          <Input
            label="Theme (optional)"
            placeholder="e.g., Love, Journey, Freedom"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            fullWidth
          />

          <Input
            label="Keywords (comma-separated, optional)"
            placeholder="e.g., stars, night, dreams"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            fullWidth
          />

          {usageRemaining !== null && (
            <p className="text-sm text-gold">
              {usageRemaining > 999
                ? 'Unlimited generations'
                : `${usageRemaining} generations remaining this month`}
            </p>
          )}

          <Button
            variant="primary"
            size="lg"
            fullWidth
            glow
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Lyrics'}
          </Button>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>

      {lyrics && (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <h4 className="font-display text-xl font-bold mb-4">Generated Lyrics:</h4>
          <pre className="whitespace-pre-wrap text-white/80 leading-relaxed">
            {lyrics}
          </pre>
          <div className="mt-6 flex gap-4">
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(lyrics)
              }}
            >
              Copy to Clipboard
            </Button>
            <Button
              variant="outline"
              onClick={() => setLyrics('')}
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
