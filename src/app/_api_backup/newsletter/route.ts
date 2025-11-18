import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { z } from 'zod'

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
})

export async function POST(req: NextRequest) {
  try {
    // Validate input
    const body = await req.json()
    const validated = newsletterSchema.parse(body)

    // Check if already subscribed
    const { data: existing } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', validated.email)
      .single()

    if (existing) {
      if (existing.status === 'active') {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 400 }
        )
      } else {
        // Resubscribe if previously unsubscribed
        await supabaseAdmin
          .from('newsletter_subscribers')
          .update({ status: 'active', subscribed_at: new Date().toISOString() })
          .eq('id', existing.id)

        return NextResponse.json({
          success: true,
          message: 'Successfully resubscribed!',
        })
      }
    }

    // Add new subscriber
    const { error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .insert({
        email: validated.email,
      })

    if (error) {
      console.error('Newsletter subscription error:', error)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Newsletter API error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}

// Unsubscribe endpoint
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    await supabaseAdmin
      .from('newsletter_subscribers')
      .update({ status: 'unsubscribed' })
      .eq('email', email)

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed',
    })
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
