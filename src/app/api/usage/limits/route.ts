import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { checkUsageLimits, getMonthlyUsage } from '@/lib/usage'
import { z } from 'zod'

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get tool from query params
    const { searchParams } = new URL(req.url)
    const tool = searchParams.get('tool')

    if (tool) {
      // Check limits for specific tool
      const toolType = z.enum(['lyric_generator', 'audio_fx']).parse(tool)
      const limits = await checkUsageLimits(session.user.id, toolType)

      return NextResponse.json({
        tool: toolType,
        allowed: limits.allowed,
        remaining: limits.remaining,
      })
    } else {
      // Get all usage stats
      const usage = await getMonthlyUsage(session.user.id)

      return NextResponse.json({
        lyricGenerator: usage.lyricGenerator,
        audioFX: usage.audioFX,
      })
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid tool type' },
        { status: 400 }
      )
    }

    console.error('Get usage limits error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
