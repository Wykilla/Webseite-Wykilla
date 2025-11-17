import { supabaseAdmin } from './supabase'
import { pricingTiers } from '@/config/pricing'
import type { SubscriptionPlan, ToolType } from '@/types/user'

export async function trackUsage(
  userId: string,
  tool: ToolType,
  tokensUsed: number,
  costUsd: number,
  success: boolean = true
) {
  await supabaseAdmin.from('api_usage').insert({
    user_id: userId,
    tool,
    tokens_used: tokensUsed,
    cost_usd: costUsd,
    success,
  })
}

export async function checkUsageLimits(
  userId: string,
  tool: ToolType
): Promise<{ allowed: boolean; remaining: number }> {
  // Get user's subscription plan
  const { data: subscription } = await supabaseAdmin
    .from('subscriptions')
    .select('plan, status')
    .eq('user_id', userId)
    .single()

  if (!subscription || subscription.status !== 'active') {
    return { allowed: false, remaining: 0 }
  }

  const plan = pricingTiers.find((p) => p.id === subscription.plan)
  if (!plan) {
    return { allowed: false, remaining: 0 }
  }

  // Get usage this month
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { data: usage } = await supabaseAdmin
    .from('api_usage')
    .select('*')
    .eq('user_id', userId)
    .eq('tool', tool)
    .eq('success', true)
    .gte('created_at', startOfMonth.toISOString())

  const usedCount = usage?.length || 0

  const limit =
    tool === 'lyric_generator'
      ? plan.limits.lyricGenerations
      : plan.limits.audioFXGenerations

  const remaining = limit === -1 ? 999999 : Math.max(0, limit - usedCount)

  return {
    allowed: limit === -1 || usedCount < limit,
    remaining,
  }
}

export async function getMonthlyUsage(userId: string) {
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const { data: usage } = await supabaseAdmin
    .from('api_usage')
    .select('*')
    .eq('user_id', userId)
    .eq('success', true)
    .gte('created_at', startOfMonth.toISOString())

  const lyricCount = usage?.filter((u) => u.tool === 'lyric_generator').length || 0
  const audioFXCount = usage?.filter((u) => u.tool === 'audio_fx').length || 0

  return {
    lyricGenerator: lyricCount,
    audioFX: audioFXCount,
  }
}
