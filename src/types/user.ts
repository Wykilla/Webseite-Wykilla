/**
 * User Types
 * Type definitions for user authentication, subscriptions, and usage
 */

export interface User {
  id: string
  email: string
  name?: string
  emailVerified?: Date
  image?: string
  createdAt: Date
  updatedAt: Date
}

export type SubscriptionPlan = 'starter' | 'pro' | 'studio'

export type SubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'past_due'
  | 'trialing'
  | 'incomplete'

export interface Subscription {
  id: string
  userId: string
  stripeCustomerId: string
  stripeSubscriptionId: string
  stripePriceId: string
  plan: SubscriptionPlan
  status: SubscriptionStatus
  trialEndsAt?: Date
  currentPeriodStart: Date
  currentPeriodEnd: Date
  cancelAtPeriodEnd: boolean
  createdAt: Date
  updatedAt: Date
}

export interface SubscriptionLimits {
  lyricGenerations: number
  audioFxProcessing: number
  apiRequests?: number
  teamSeats: number
}

export type ToolType = 'lyric_generator' | 'audio_fx'

export interface ApiUsage {
  id: string
  userId: string
  subscriptionId: string
  tool: ToolType
  inputData?: Record<string, any>
  outputData?: Record<string, any>
  tokensUsed?: number
  costUsd: number
  success: boolean
  errorMessage?: string
  timestamp: Date
}

export interface UsageSummary {
  userId: string
  subscriptionId: string
  month: Date
  tool: ToolType
  totalCalls: number
  totalCostUsd: number
  updatedAt: Date
}
