import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@wykilla.com'

export async function sendWelcomeEmail(to: string, name: string) {
  try {
    await resend.emails.send({
      from: fromEmail,
      to,
      subject: 'Welcome to WYKILLA',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4CC9F0;">Welcome to WYKILLA, ${name}!</h1>
          <p>Thank you for signing up. We're excited to have you on board.</p>
          <p>Get started by exploring our AI tools for songwriters and producers:</p>
          <ul>
            <li>Lyric Generator - Create professional lyrics with AI</li>
            <li>Audio FX Generator - Generate unique sound effects</li>
          </ul>
          <p>
            <a href="${process.env.NEXTAUTH_URL}/dashboard" style="background: #4CC9F0; color: #0A0A0F; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Go to Dashboard
            </a>
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send welcome email:', error)
  }
}

export async function sendSubscriptionConfirmationEmail(
  to: string,
  name: string,
  plan: string
) {
  try {
    await resend.emails.send({
      from: fromEmail,
      to,
      subject: `Your ${plan} Subscription is Active`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4CC9F0;">Subscription Confirmed!</h1>
          <p>Hi ${name},</p>
          <p>Your <strong>${plan}</strong> subscription is now active.</p>
          <p>You can now access all features included in your plan:</p>
          <p>
            <a href="${process.env.NEXTAUTH_URL}/dashboard" style="background: #4CC9F0; color: #0A0A0F; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Go to Dashboard
            </a>
          </p>
          <p style="color: #666; font-size: 12px; margin-top: 40px;">
            You can manage your subscription at any time from your dashboard.
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send subscription confirmation email:', error)
  }
}

export async function sendUsageLimitWarningEmail(
  to: string,
  name: string,
  tool: string,
  remaining: number
) {
  try {
    await resend.emails.send({
      from: fromEmail,
      to,
      subject: 'Usage Limit Warning',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #FF3AC0;">Usage Limit Warning</h1>
          <p>Hi ${name},</p>
          <p>You have <strong>${remaining}</strong> ${tool} generations remaining this month.</p>
          <p>Consider upgrading your plan to get more usage:</p>
          <p>
            <a href="${process.env.NEXTAUTH_URL}/pricing" style="background: #FF3AC0; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Upgrade Plan
            </a>
          </p>
        </div>
      `,
    })
  } catch (error) {
    console.error('Failed to send usage warning email:', error)
  }
}
