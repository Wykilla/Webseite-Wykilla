import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get subscription
    const { data: subscription, error } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('user_id', session.user.id)
      .single()

    if (error || !subscription) {
      return NextResponse.json({ subscription: null })
    }

    return NextResponse.json({
      subscription: {
        plan: subscription.plan,
        status: subscription.status,
        currentPeriodEnd: subscription.current_period_end,
      },
    })
  } catch (error) {
    console.error('Get subscription status error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
