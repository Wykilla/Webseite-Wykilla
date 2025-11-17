/**
 * API Types
 * Type definitions for API requests and responses
 */

// Generic API Response
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Lyric Generator
export interface LyricGeneratorRequest {
  emotion?: string
  theme?: string
  keywords?: string[]
  style?: string
  midiData?: string // Base64 encoded MIDI file
}

export interface LyricGeneratorResponse {
  lyrics: string
  tokensUsed: number
  usageRemaining: number
}

// Audio FX Tool
export interface AudioFxRequest {
  audioData: string // Base64 encoded audio file
  effect: 'reverb' | 'delay' | 'eq' | 'mastering' | 'custom'
  parameters?: Record<string, number>
}

export interface AudioFxResponse {
  processedAudio: string // Base64 encoded
  tokensUsed: number
  usageRemaining: number
}

// Subscription Management
export interface CheckoutRequest {
  priceId: string
  successUrl?: string
  cancelUrl?: string
}

export interface CheckoutResponse {
  sessionId: string
  url: string
}

export interface SubscriptionStatusResponse {
  subscription: {
    plan: string
    status: string
    currentPeriodEnd: Date
    cancelAtPeriodEnd: boolean
  }
  usage: {
    lyricGenerations: {
      used: number
      limit: number
      remaining: number
    }
    audioFxProcessing: {
      used: number
      limit: number
      remaining: number
    }
  }
}

// Newsletter
export interface NewsletterSubscribeRequest {
  email: string
  name?: string
  source?: string
}

export interface NewsletterSubscribeResponse {
  success: boolean
  message: string
}

// Waitlist
export interface WaitlistRequest {
  email: string
  tool: 'lyric_generator' | 'audio_fx'
}

export interface WaitlistResponse {
  success: boolean
  message: string
}
