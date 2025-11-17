import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { trackUsage } from '@/lib/usage'
import { z } from 'zod'

const trackUsageSchema = z.object({
  tool: z.enum(['lyric_generator', 'audio_fx']),
  tokensUsed: z.number().int().positive(),
  costUsd: z.number().positive(),
  success: z.boolean().optional(),
})

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Validate input
    const body = await req.json()
    const validated = trackUsageSchema.parse(body)

    // Track usage
    await trackUsage(
      session.user.id!,
      validated.tool,
      validated.tokensUsed,
      validated.costUsd,
      validated.success ?? true
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Track usage error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
