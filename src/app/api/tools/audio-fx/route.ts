import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { checkUsageLimits, trackUsage } from '@/lib/usage'
import { logger } from '@/lib/logger'
import { UsageLimitError, AuthenticationError } from '@/lib/errors'
import OpenAI from 'openai'

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
    const limits = await checkUsageLimits(session.user.id, 'audio_fx')
    if (!limits.allowed) {
      throw new UsageLimitError('Usage limit reached. Please upgrade your plan.')
    }

    // 3. Parse request
    const { description } = await req.json()

    if (!description || typeof description !== 'string') {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      )
    }

    logger.info('Generating audio FX', {
      userId: session.user.id,
      description: description.substring(0, 100),
    })

    // 4. Call OpenAI API to generate audio FX description
    // Note: In a real implementation, you would use an audio generation API
    // For now, we generate a detailed description that can be used with audio tools
    const prompt = `You are an expert sound designer. Create a detailed technical description for creating this audio effect: "${description}"

Include:
1. Sound synthesis approach (additive, subtractive, FM, etc.)
2. Key frequency ranges and filters
3. Envelope settings (ADSR)
4. Effects chain (reverb, delay, distortion, etc.)
5. Processing tips

Be specific and technical, suitable for implementation in a DAW or synthesizer.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 600,
    })

    const result = completion.choices[0].message.content || ''
    const tokensUsed = completion.usage?.total_tokens || 0

    // 5. Track usage
    await trackUsage(
      session.user.id,
      'audio_fx',
      tokensUsed,
      0.002 * tokensUsed, // Approx cost
      true
    )

    logger.info('Audio FX generated successfully', {
      userId: session.user.id,
      tokensUsed,
      remaining: limits.remaining - 1,
    })

    // 6. Return response
    return NextResponse.json({
      description: result,
      tokensUsed,
      usageRemaining: limits.remaining - 1,
    })
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }

    if (error instanceof UsageLimitError) {
      return NextResponse.json({ error: error.message }, { status: 429 })
    }

    logger.error('Audio FX generator error', error as Error, {
      path: '/api/tools/audio-fx',
    })

    return NextResponse.json(
      { error: 'Failed to generate audio FX. Please try again.' },
      { status: 500 }
    )
  }
}
