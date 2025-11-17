import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { checkUsageLimits, trackUsage } from '@/lib/usage'
import { logger } from '@/lib/logger'
import { UsageLimitError, AuthenticationError } from '@/lib/errors'
import OpenAI from 'openai'
import type { LyricGeneratorRequest, LyricGeneratorResponse } from '@/types/api'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  try {
    // 1. Check authentication
    const session = await auth()
    if (!session?.user) {
      throw new AuthenticationError()
    }

    // 2. Check usage limits
    const limits = await checkUsageLimits(session.user.id, 'lyric_generator')
    if (!limits.allowed) {
      throw new UsageLimitError('Usage limit reached. Please upgrade your plan.')
    }

    // 3. Parse request
    const { emotion, theme, keywords }: LyricGeneratorRequest = await req.json()

    logger.info('Generating lyrics', {
      userId: session.user.id,
      emotion,
      theme,
      keywordCount: keywords?.length || 0,
    })

    // 4. Call OpenAI API
    const prompt = `Generate professional song lyrics with the following parameters:
- Emotion: ${emotion || 'Any'}
- Theme: ${theme || 'General'}
- Keywords: ${keywords?.join(', ') || 'None'}

Format: 2 verses and 1 chorus. Be creative and poetic.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.9,
      max_tokens: 500,
    })

    const lyrics = completion.choices[0].message.content || ''
    const tokensUsed = completion.usage?.total_tokens || 0

    // 5. Track usage
    await trackUsage(
      session.user.id,
      'lyric_generator',
      tokensUsed,
      0.002 * tokensUsed, // Approx cost: $0.002 per token
      true
    )

    logger.info('Lyrics generated successfully', {
      userId: session.user.id,
      tokensUsed,
      remaining: limits.remaining - 1,
    })

    // 6. Return response
    const response: LyricGeneratorResponse = {
      lyrics,
      tokensUsed,
      usageRemaining: limits.remaining - 1,
    }

    return NextResponse.json(response)
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    if (error instanceof UsageLimitError) {
      return NextResponse.json({ error: error.message }, { status: 429 })
    }

    logger.error('Lyric generator error', error as Error, {
      path: '/api/tools/lyric-generator',
    })

    return NextResponse.json(
      { error: 'Failed to generate lyrics. Please try again.' },
      { status: 500 }
    )
  }
}
