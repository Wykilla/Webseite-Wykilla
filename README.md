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

## Development Phases

This project is being developed in phases using the BMAD methodology:

- **Epic 0:** Foundation Setup (Current)
- **Epic 1:** Intro/Hero Chapter
- **Epic 2:** Hub/Overview Chapter
- **Epic 3:** Music Chapter
- **Epic 4:** 3D World Chapter
- **Epic 5:** Tools Chapter (Frontend)
- **Epic 6:** Lore Chapter
- **Epic 7:** Merch/Community Chapter
- **Epic 8:** Outro Chapter
- **Epic 9:** Backend/Auth/Payment
- **Epic 10:** Integration & Polish

## Brand Colors

- **Cyan:** `#4CC9F0`
- **Magenta:** `#FF3AC0`
- **Gold:** `#FFD580`
- **Bordeaux:** `#6C002A`
- **Deep Ink:** `#0A0A0F`

## License

Private - All Rights Reserved © WYKILLA
