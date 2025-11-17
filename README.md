# WYKILLA Website

Cinematic scroll-driven website showcasing WYKILLA's music, 3D art, and AI creative tools.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** GSAP + ScrollTrigger, Lenis
- **3D:** React Three Fiber (R3F)
- **Audio:** Howler.js
- **Auth:** NextAuth.js v5
- **Database:** Supabase (PostgreSQL)
- **Payment:** Stripe
- **Email:** Resend
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your environment variables in .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run type-check

# Linting
npm run lint
```

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage (all chapters)
│   ├── globals.css        # Global styles
│   └── api/               # API routes (Epic 9)
├── components/
│   ├── chapters/          # Chapter components (Epics 1-8)
│   ├── ui/                # Reusable UI components
│   ├── audio/             # Audio player components
│   ├── 3d/                # R3F components
│   ├── navigation/        # Navigation components
│   └── effects/           # Visual effects
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── config/                # Configuration files
│   ├── assets.ts          # Asset paths (central management)
│   ├── chapters.ts        # Chapter metadata
│   └── site.ts            # Site-wide config
├── types/                 # TypeScript type definitions
└── content/               # Content files (markdown, etc.)
```

## Project Status

✅ **Production Ready** - All 65 stories across 9 epics completed!

Developed using the BMAD (Building Multi-Agent Development) methodology with 4 parallel agents:

- ✅ **Epic 0:** Foundation Setup (Next.js 15, TypeScript, Tailwind, GSAP)
- ✅ **Epic 1:** Intro/Hero Chapter (Animated hero, particle background)
- ✅ **Epic 2:** Hub/Overview Chapter (Interactive thumbnails, navigation)
- ✅ **Epic 3:** Music Chapter (Howler.js audio player, waveforms)
- ✅ **Epic 4:** 3D World Chapter (React Three Fiber, procedural scenes)
- ✅ **Epic 5:** Tools Chapter (AI Lyric Generator, Audio FX Generator)
- ✅ **Epic 6:** Lore Chapter (Timeline, modal cards, parallax)
- ✅ **Epic 7:** Merch/Community Chapter (Product gallery, newsletter)
- ✅ **Epic 8:** Outro Chapter (CTA, social links, footer)
- ✅ **Epic 9:** Backend Infrastructure (NextAuth, Supabase, Stripe, OpenAI)

**Stats:** 65 stories, 36+ components, 8 chapters, full backend

## Documentation

### Deployment
- **[READY-FOR-DEPLOYMENT.md](READY-FOR-DEPLOYMENT.md)** - Complete deployment guide with step-by-step instructions
- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** - Detailed Vercel deployment process
- **[docs/POST-DEPLOYMENT-CHECKLIST.md](docs/POST-DEPLOYMENT-CHECKLIST.md)** - 23-point validation checklist

### Testing & Integration
- **[docs/TESTING-STRATEGY.md](docs/TESTING-STRATEGY.md)** - Testing approach and tools
- **[docs/INTEGRATION-CHECKLIST.md](docs/INTEGRATION-CHECKLIST.md)** - 20-point integration validation

### Development
- **[docs/MULTI-AGENT-MERGE-STRATEGY.md](docs/MULTI-AGENT-MERGE-STRATEGY.md)** - How the multi-agent development worked
- **[docs/agent-briefings/](docs/agent-briefings/)** - Agent briefings for parallel development

### Assets
- **[public/PLACEHOLDER_ASSETS.md](public/PLACEHOLDER_ASSETS.md)** - All placeholder assets tracked

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Fill in all required environment variables:
   - **Supabase** - Database (PostgreSQL)
   - **NextAuth** - Authentication
   - **Stripe** - Payments (create 3 products: Free, Pro, Premium)
   - **OpenAI** - AI Tools
   - **Resend** (optional) - Email service

See `.env.example` for detailed instructions with links to dashboards.

## Deployment

### Quick Start

**Production branch:** `claude/production-ready-01GQQ1spTTif3Q6qPRYMD4sg`

**Option 1: Vercel Dashboard**
1. Settings → Git → Set production branch
2. Add all environment variables
3. Deploy automatically

**Option 2: Pull Request**
1. Merge production branch to main via GitHub PR
2. Vercel auto-deploys from main

See **[READY-FOR-DEPLOYMENT.md](READY-FOR-DEPLOYMENT.md)** for complete guide.

## Brand Colors

- **Cyan:** `#4CC9F0`
- **Magenta:** `#FF3AC0`
- **Gold:** `#FFD580`
- **Bordeaux:** `#6C002A`
- **Deep Ink:** `#0A0A0F`

## Key Features

- 🎨 **Cinematic Scroll Experience** - Lenis smooth scrolling + GSAP animations
- 🎵 **Music Player** - Howler.js with waveform visualizations
- 🌍 **3D World** - Interactive React Three Fiber scenes
- 🤖 **AI Tools** - Lyric Generator & Audio FX Generator (OpenAI)
- 🔐 **Authentication** - NextAuth.js v5 (Email + Google OAuth)
- 💳 **Subscriptions** - Stripe integration (Free, Pro, Premium tiers)
- 📊 **Usage Tracking** - Track AI tool usage per user
- 📧 **Newsletter** - Supabase-powered signup
- 🛍️ **Merch Shop** - Product gallery with external links

## Architecture

- **Frontend:** Next.js 15 App Router, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, NextAuth.js, Supabase
- **Database:** PostgreSQL via Supabase
- **Payments:** Stripe Checkout + Webhooks
- **AI:** OpenAI GPT-4 for lyric generation and audio FX
- **Storage:** Vercel + Supabase Storage (future)
- **Email:** Resend (optional)

## Performance Targets

- Lighthouse Score: > 90
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Bundle Size: < 500KB

## License

Private - All Rights Reserved © WYKILLA
