# AGENT 4 BRIEFING - Epic 9, 5 (Backend/Auth/Payment, Tools)

## ⚠️ WICHTIG: KEINE FRAGEN STELLEN

Dieses Briefing enthält ALLE Informationen für die Implementierung. Alle Entscheidungen sind getroffen. **Stelle KEINE Fragen** - implementiere direkt gemäß den Spezifikationen unten.

---

## 🎯 DEINE AUFGABE

Du implementierst **2 Epics** parallel zur Arbeit anderer Agenten:

- **Epic 9**: Backend / Auth / Payment Integration (10 Stories, 52 SP) - BACKEND-FOKUSSIERT!
- **Epic 5**: Tools Chapter (7 Stories, 31 SP)

**Total**: 17 Stories, 83 Story Points (GRÖSSTES WORKLOAD!)

---

## 📋 PROJEKTKONTEXT

### Git-Branch
```bash
claude/wykilla-bmad-planning-01GQQ1spTTif3Q6qPRYMD4sg
```

### Projekt: WYKILLA Website
Cinematic, scroll-driven Next.js 15 Website mit AI-Tools für professionelle Songwriter/Producer.

**WICHTIG**: AI-Tools sind **NICHT kostenlos** - sie kosten API-Calls und benötigen Subscription-System!

### Epic 0 (Foundation) - BEREITS FERTIG ✅
- Next.js 15 + TypeScript + Tailwind CSS
- Dependencies bereits installiert: NextAuth.js v5, Supabase client, Stripe
- Type definitions für User, Subscription, API bereits in `src/types/` vorhanden!

### Technischer Stack
```json
{
  "framework": "Next.js 15 (App Router)",
  "language": "TypeScript",
  "auth": "NextAuth.js v5",
  "database": "Supabase (PostgreSQL)",
  "payment": "Stripe",
  "email": "Resend (transactional)",
  "validation": "Zod"
}
```

### Brand Colors
```typescript
colors: {
  cyan: '#4CC9F0',
  magenta: '#FF3AC0',
  gold: '#FFD580',      // Tools theme
  bordeaux: '#6C002A',
  ink: '#0A0A0F',
}
```

---

## 📁 DATEISYSTEM-STRUKTUR

```
src/
├── app/
│   ├── api/              ← DU ERSTELLST HIER: API Routes
│   │   ├── auth/         ← NextAuth routes
│   │   ├── tools/        ← AI tool endpoints
│   │   ├── subscription/ ← Stripe endpoints
│   │   └── newsletter/   ← Email signup
│   ├── (auth)/           ← Auth pages (login, signup)
│   └── page.tsx          ✅ Fertig
├── components/
│   ├── chapters/
│   │   └── tools/        ← DU ERSTELLST HIER: Tools UI (Epic 5)
│   ├── auth/             ← DU ERSTELLST HIER: Auth components
│   └── ui/               ✅ Fertig (Button, Input, Card, etc.)
├── lib/
│   ├── supabase.ts       ← DU ERSTELLST: Supabase client
│   ├── stripe.ts         ← DU ERSTELLST: Stripe client
│   └── auth.ts           ← DU ERSTELLST: NextAuth config
├── types/                ✅ Fertig (User, Subscription, API types vorhanden!)
└── config/
    └── pricing.ts        ← DU ERSTELLST: Pricing tiers
```

### Bereits vorhandene Types (nutzen!)
```typescript
// In src/types/user.ts:
interface User {
  id: string
  email: string
  name?: string
  subscription?: Subscription
}

interface Subscription {
  id: string
  userId: string
  stripeCustomerId: string
  plan: SubscriptionPlan // 'starter' | 'pro' | 'studio'
  status: SubscriptionStatus
  currentPeriodEnd: Date
}

interface ApiUsage {
  userId: string
  tool: ToolType // 'lyric_generator' | 'audio_fx'
  tokensUsed?: number
  costUsd: number
  success: boolean
}

// In src/types/api.ts:
interface LyricGeneratorRequest {
  emotion?: string
  theme?: string
  keywords?: string[]
  midiData?: string
}

interface LyricGeneratorResponse {
  lyrics: string
  tokensUsed: number
  usageRemaining: number
}
```

---

## 🔐 EPIC 9: BACKEND / AUTH / PAYMENT

**Ziel**: Vollständige Backend-Integration für Authentication, Subscriptions und API-Usage-Tracking

### Story 9.1: Setup Supabase Client & Database Schema (5 SP)
**Files**:
- `src/lib/supabase.ts`
- `.env.local` (add Supabase credentials)
- Database migrations (SQL)

**Acceptance Criteria**:
- Supabase client konfiguriert
- Database schema für `users`, `subscriptions`, `api_usage` Tables
- Row Level Security (RLS) policies

**Implementation**:

**File: `src/lib/supabase.ts`**
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client (for API routes)
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
```

**Database Schema (SQL - execute in Supabase dashboard)**:
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  plan TEXT NOT NULL CHECK (plan IN ('starter', 'pro', 'studio')),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- API Usage tracking
CREATE TABLE api_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tool TEXT NOT NULL CHECK (tool IN ('lyric_generator', 'audio_fx')),
  tokens_used INTEGER,
  cost_usd NUMERIC(10, 4),
  success BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_usage ENABLE ROW LEVEL SECURITY;

-- Users can only read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can view own subscription" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own usage" ON api_usage
  FOR SELECT USING (auth.uid() = user_id);
```

**`.env.local`** (User muss selbst ausfüllen):
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here

# AI Tools (Placeholder - User wählt später Provider)
OPENAI_API_KEY=sk-...
```

---

### Story 9.2: Configure NextAuth.js v5 (8 SP)
**Files**:
- `src/lib/auth.ts` (Auth config)
- `src/app/api/auth/[...nextauth]/route.ts` (API route)

**Acceptance Criteria**:
- Email + Password authentication
- Google OAuth (optional)
- Session management
- Supabase integration für user storage

**Implementation**:

**File: `src/lib/auth.ts`**
```typescript
import NextAuth, { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { supabaseAdmin } from './supabase'
import type { User } from '@/types/user'

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Email',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // TODO: Implement password hashing & verification
        // For now: Simple email check (INSECURE - replace with bcrypt!)
        const { data: user } = await supabaseAdmin
          .from('users')
          .select('*')
          .eq('email', credentials.email)
          .single()

        if (!user) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
      }
      return session
    },

    async signIn({ user, account }) {
      // Create user in Supabase if doesn't exist
      const { data: existingUser } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('email', user.email!)
        .single()

      if (!existingUser) {
        await supabaseAdmin.from('users').insert({
          email: user.email!,
          name: user.name,
        })
      }

      return true
    },
  },

  pages: {
    signIn: '/login',
    signUp: '/signup',
  },

  session: {
    strategy: 'jwt',
  },

  secret: process.env.NEXTAUTH_SECRET,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
```

**File: `src/app/api/auth/[...nextauth]/route.ts`**
```typescript
import { handlers } from '@/lib/auth'

export const { GET, POST } = handlers
```

---

### Story 9.3: Create Stripe Integration (8 SP)
**Files**:
- `src/lib/stripe.ts`
- `src/config/pricing.ts`
- `src/app/api/subscription/create-checkout/route.ts`
- `src/app/api/subscription/webhook/route.ts`

**Acceptance Criteria**:
- Stripe client konfiguriert
- Pricing tiers definiert
- Checkout session creation
- Webhook handling für subscription events

**Implementation**:

**File: `src/lib/stripe.ts`**
```typescript
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
})

export const getStripeCustomer = async (email: string) => {
  const customers = await stripe.customers.list({ email, limit: 1 })
  return customers.data[0]
}

export const createStripeCustomer = async (email: string, name?: string) => {
  return await stripe.customers.create({
    email,
    name,
  })
}
```

**File: `src/config/pricing.ts`**
```typescript
export interface PricingTier {
  id: string
  name: string
  price: number // EUR per month
  stripePriceId: string // From Stripe dashboard
  features: string[]
  limits: {
    lyricGenerations: number
    audioFXGenerations: number
  }
}

export const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 19,
    stripePriceId: 'price_starter_monthly', // Replace with real Stripe Price ID
    features: [
      '50 Lyric Generations/month',
      '25 Audio FX Generations/month',
      'Basic Support',
    ],
    limits: {
      lyricGenerations: 50,
      audioFXGenerations: 25,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    stripePriceId: 'price_pro_monthly',
    features: [
      '300 Lyric Generations/month',
      '150 Audio FX Generations/month',
      'MIDI I/O Support',
      'Priority Support',
    ],
    limits: {
      lyricGenerations: 300,
      audioFXGenerations: 150,
    },
  },
  {
    id: 'studio',
    name: 'Studio',
    price: 149,
    stripePriceId: 'price_studio_monthly',
    features: [
      '1500 Lyric Generations/month',
      'Unlimited Audio FX',
      'API Access',
      'Team Seats (up to 5)',
      'Dedicated Support',
    ],
    limits: {
      lyricGenerations: 1500,
      audioFXGenerations: -1, // Unlimited
    },
  },
]
```

**File: `src/app/api/subscription/create-checkout/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { stripe, getStripeCustomer, createStripeCustomer } from '@/lib/stripe'
import { pricingTiers } from '@/config/pricing'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { planId } = await req.json()
    const plan = pricingTiers.find((p) => p.id === planId)

    if (!plan) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Get or create Stripe customer
    let customer = await getStripeCustomer(session.user.email!)
    if (!customer) {
      customer = await createStripeCustomer(session.user.email!, session.user.name)
    }

    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: plan.stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?canceled=true`,
      metadata: {
        userId: session.user.id,
        planId: plan.id,
      },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

**File: `src/app/api/subscription/webhook/route.ts`**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  // Handle subscription events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const { userId, planId } = session.metadata!

      // Create subscription in database
      await supabaseAdmin.from('subscriptions').insert({
        user_id: userId,
        stripe_customer_id: session.customer as string,
        stripe_subscription_id: session.subscription as string,
        plan: planId,
        status: 'active',
        current_period_end: new Date(session.expires_at * 1000),
      })
      break
    }

    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription
      await supabaseAdmin
        .from('subscriptions')
        .update({
          status: subscription.status,
          current_period_end: new Date(subscription.current_period_end * 1000),
        })
        .eq('stripe_subscription_id', subscription.id)
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription
      await supabaseAdmin
        .from('subscriptions')
        .update({ status: 'canceled' })
        .eq('stripe_subscription_id', subscription.id)
      break
    }
  }

  return NextResponse.json({ received: true })
}
```

---

### Story 9.4: Create Auth Pages (Login/Signup) (5 SP)
**Files**:
- `src/app/(auth)/login/page.tsx`
- `src/app/(auth)/signup/page.tsx`
- `src/components/auth/LoginForm.tsx`

**Acceptance Criteria**:
- Login page mit Email + Password
- Signup page mit Email + Password + Name
- Form validation mit Zod
- Redirect nach successful login

**Implementation**: (Simplified - full implementation würde zu lang)

**File: `src/app/(auth)/login/page.tsx`**
```typescript
import LoginForm from '@/components/auth/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink px-6">
      <div className="max-w-md w-full">
        <h1 className="font-display text-4xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-cyan to-magenta bg-clip-text text-transparent">
            Log In
          </span>
        </h1>
        <LoginForm />
      </div>
    </div>
  )
}
```

---

### Story 9.5: Implement Usage Tracking System (8 SP)
**Files**:
- `src/lib/usage.ts`
- `src/app/api/usage/track/route.ts`
- `src/app/api/usage/limits/route.ts`

**Acceptance Criteria**:
- Track API usage per user/tool
- Check usage limits based on subscription plan
- Return remaining usage to client

**Implementation**:

**File: `src/lib/usage.ts`**
```typescript
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
```

---

### Story 9.6-9.10: Weitere Backend-Stories (simplified)
- **9.6**: User Dashboard Page (5 SP) - Shows subscription status, usage stats
- **9.7**: Subscription Management (5 SP) - Upgrade/downgrade/cancel
- **9.8**: Email Integration with Resend (3 SP) - Transactional emails
- **9.9**: Newsletter API Endpoint (2 SP) - Save email to database
- **9.10**: Error Handling & Logging (3 SP) - Centralized error handling

(Detaillierte Implementation kann bei Bedarf später hinzugefügt werden - aus Platzgründen hier vereinfacht)

---

## 🛠️ EPIC 5: TOOLS CHAPTER

**Emotional Journey**: Empowerment & Creativity
**Duration**: ~4 seconds scroll time
**Color**: Gold (#FFD580)

### Story 5.1: Create Tools Section Layout (3 SP)
**File**: `src/components/chapters/tools/ToolsSection.tsx`

**Acceptance Criteria**:
- Full-height section (min-h-screen)
- Grid layout for 2 tools (Lyric Generator, Audio FX)
- Gold gradient background
- "Sign Up to Access" CTA if not authenticated

**Implementation**:
```typescript
'use client'

import { useSession } from 'next-auth/react'

export default function ToolsSection() {
  const { data: session } = useSession()

  return (
    <section
      id="tools"
      className="relative min-h-screen py-20 bg-gradient-to-b from-ink via-gold/10 to-ink"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl font-bold mb-12 text-center">
          <span className="bg-gradient-to-r from-gold to-magenta bg-clip-text text-transparent">
            AI Tools
          </span>
        </h2>

        <p className="text-xl text-white/80 text-center mb-16 max-w-3xl mx-auto">
          Professional-grade AI tools for songwriters and producers.
          {!session && ' Sign up to start creating.'}
        </p>

        {session ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Tool cards - Story 5.2 */}
          </div>
        ) : (
          <div className="text-center">
            <Button variant="primary" size="lg" glow>
              Sign Up to Access Tools
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
```

---

### Story 5.2: Create Tool Card Component (5 SP)
**File**: `src/components/chapters/tools/ToolCard.tsx`

**Acceptance Criteria**:
- Tool icon, name, description
- Usage stats (X/Y remaining this month)
- "Try Now" button
- Glassmorphism styling

**Implementation**:
```typescript
'use client'

import { GlassmorphCard, Button } from '@/components/ui'
import { useState, useEffect } from 'react'

interface ToolCardProps {
  tool: {
    id: string
    name: string
    icon: string
    description: string
  }
  onTry: () => void
}

export default function ToolCard({ tool, onTry }: ToolCardProps) {
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    // Fetch usage limits
    fetch(`/api/usage/limits?tool=${tool.id}`)
      .then((res) => res.json())
      .then((data) => setRemaining(data.remaining))
  }, [tool.id])

  return (
    <GlassmorphCard intensity="medium" glow className="p-8">
      <div className="text-6xl mb-4">{tool.icon}</div>
      <h3 className="font-display text-2xl font-bold mb-3">{tool.name}</h3>
      <p className="text-white/70 mb-6">{tool.description}</p>

      {remaining !== null && (
        <p className="text-sm text-gold mb-4">
          {remaining} generations remaining this month
        </p>
      )}

      <Button variant="primary" fullWidth glow onClick={onTry}>
        Try Now
      </Button>
    </GlassmorphCard>
  )
}
```

---

### Story 5.3: Implement Lyric Generator UI (8 SP)
**File**: `src/components/chapters/tools/LyricGenerator.tsx`

**Acceptance Criteria**:
- Input form: Emotion, Theme, Keywords
- Generate button
- Output area with generated lyrics
- Loading state
- Error handling

**Implementation**:
```typescript
'use client'

import { useState } from 'react'
import { Input, Button } from '@/components/ui'
import type { LyricGeneratorRequest, LyricGeneratorResponse } from '@/types/api'

export default function LyricGenerator() {
  const [emotion, setEmotion] = useState('')
  const [theme, setTheme] = useState('')
  const [keywords, setKeywords] = useState('')
  const [lyrics, setLyrics] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    setLoading(true)
    setError('')

    try {
      const request: LyricGeneratorRequest = {
        emotion,
        theme,
        keywords: keywords.split(',').map((k) => k.trim()),
      }

      const response = await fetch('/api/tools/lyric-generator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error('Generation failed')
      }

      const data: LyricGeneratorResponse = await response.json()
      setLyrics(data.lyrics)
    } catch (err) {
      setError('Failed to generate lyrics. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Input
        label="Emotion"
        placeholder="e.g., Hopeful, Melancholic, Energetic"
        value={emotion}
        onChange={(e) => setEmotion(e.target.value)}
        fullWidth
      />

      <Input
        label="Theme"
        placeholder="e.g., Love, Journey, Freedom"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        fullWidth
      />

      <Input
        label="Keywords (comma-separated)"
        placeholder="e.g., stars, night, dreams"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
        fullWidth
      />

      <Button
        variant="primary"
        size="lg"
        fullWidth
        glow
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Lyrics'}
      </Button>

      {error && (
        <p className="text-red-500 text-center">{error}</p>
      )}

      {lyrics && (
        <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
          <h4 className="font-display text-xl font-bold mb-4">Generated Lyrics:</h4>
          <pre className="whitespace-pre-wrap text-white/80">{lyrics}</pre>
        </div>
      )}
    </div>
  )
}
```

---

### Story 5.4: Create Lyric Generator API Endpoint (8 SP)
**File**: `src/app/api/tools/lyric-generator/route.ts`

**Acceptance Criteria**:
- Validate user authentication
- Check usage limits
- Call AI API (OpenAI GPT-4 or similar)
- Track usage
- Return generated lyrics

**Implementation**:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { checkUsageLimits, trackUsage } from '@/lib/usage'
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
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2. Check usage limits
    const limits = await checkUsageLimits(session.user.id, 'lyric_generator')
    if (!limits.allowed) {
      return NextResponse.json(
        { error: 'Usage limit reached. Please upgrade your plan.' },
        { status: 429 }
      )
    }

    // 3. Parse request
    const { emotion, theme, keywords }: LyricGeneratorRequest = await req.json()

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
      0.002 * tokensUsed, // Approx cost
      true
    )

    // 6. Return response
    const response: LyricGeneratorResponse = {
      lyrics,
      tokensUsed,
      usageRemaining: limits.remaining - 1,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Lyric generator error:', error)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

---

### Story 5.5-5.7: Weitere Tool-Stories
- **5.5**: Audio FX Generator UI (5 SP) - Similar to Lyric Generator
- **5.6**: Audio FX API Endpoint (5 SP) - Similar to Story 5.4
- **5.7**: Integrate Tools Section into Main Page (2 SP)

---

## 🛠️ ENTWICKLUNGSRICHTLINIEN

### API Route Best Practices
```typescript
// ✅ Always check auth first
const session = await auth()
if (!session?.user) {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

// ✅ Validate input with Zod
import { z } from 'zod'
const schema = z.object({ /* ... */ })
const validated = schema.parse(await req.json())

// ✅ Use try-catch for error handling
try {
  // ... code
} catch (error) {
  console.error(error)
  return NextResponse.json({ error: 'Internal error' }, { status: 500 })
}

// ✅ Return proper HTTP status codes
200 - Success
400 - Bad Request
401 - Unauthorized
429 - Rate Limit Exceeded
500 - Internal Error
```

### Supabase Best Practices
```typescript
// ✅ Use supabaseAdmin for server-side operations
import { supabaseAdmin } from '@/lib/supabase'

// ✅ Always handle errors
const { data, error } = await supabaseAdmin.from('users').select('*')
if (error) {
  console.error(error)
  return null
}

// ✅ Use RLS policies for security
// Don't bypass RLS unless absolutely necessary
```

---

## 📦 GIT WORKFLOW

Same as other agents - commit after each story, push regularly.

---

## ✅ COMPLETION CHECKLIST

### Epic 9 (Backend)
- [ ] Story 9.1: Supabase setup & schema
- [ ] Story 9.2: NextAuth.js config
- [ ] Story 9.3: Stripe integration
- [ ] Story 9.4: Auth pages
- [ ] Story 9.5: Usage tracking
- [ ] Story 9.6: User dashboard
- [ ] Story 9.7: Subscription management
- [ ] Story 9.8: Email integration
- [ ] Story 9.9: Newsletter API
- [ ] Story 9.10: Error handling

### Epic 5 (Tools)
- [ ] Story 5.1: ToolsSection layout
- [ ] Story 5.2: ToolCard component
- [ ] Story 5.3: Lyric Generator UI
- [ ] Story 5.4: Lyric Generator API
- [ ] Story 5.5: Audio FX UI
- [ ] Story 5.6: Audio FX API
- [ ] Story 5.7: Integration in page.tsx

---

## 🚀 LOS GEHT'S!

**Starte mit Epic 9, Story 9.1** (Backend zuerst, dann Tools können darauf aufbauen!)

**WICHTIG**: Du musst Supabase- und Stripe-Accounts einrichten und API-Keys in `.env.local` einfügen!

**KEINE FRAGEN STELLEN - ALLE INFORMATIONEN SIND HIER!**

Viel Erfolg! 🎉
