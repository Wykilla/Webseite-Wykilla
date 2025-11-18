'use client'

import { useState } from 'react'
import { Input, Button } from '@/components/ui'

interface AudioFXResponse {
  description: string
  tokensUsed: number
  usageRemaining: number
}

export default function AudioFXGenerator() {
  const [description, setDescription] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [usageRemaining, setUsageRemaining] = useState<number | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/tools/audio-fx', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Generation failed')
      }

      const data: AudioFXResponse = await response.json()
      setResult(data.description)
      setUsageRemaining(data.usageRemaining)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to generate audio FX. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
        <h3 className="font-display text-2xl font-bold mb-6">
          <span className="bg-gradient-to-r from-gold to-cyan bg-clip-text text-transparent">
            Audio FX Generator
          </span>
        </h3>

        <div className="space-y-6">
          <Input
            label="Sound Description"
            placeholder="e.g., Epic cinematic impact, Vintage analog warmth, Futuristic glitch effect"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            disabled={loading || !description.trim()}
          >
            {loading ? 'Generating...' : 'Generate Audio FX'}
          </Button>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
          <h4 className="font-display text-xl font-bold mb-4">Generated Audio FX:</h4>
          <p className="text-white/80 leading-relaxed mb-6">{result}</p>

          <div className="bg-gold/10 border border-gold/20 rounded-lg p-6 mb-6">
            <p className="text-gold text-sm font-semibold mb-2">💡 Coming Soon:</p>
            <p className="text-white/70 text-sm">
              Audio file generation and download will be available in a future update.
              Currently showing AI-generated sound design descriptions.
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(result)
              }}
            >
              Copy Description
            </Button>
            <Button
              variant="outline"
              onClick={() => setResult('')}
            >
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
