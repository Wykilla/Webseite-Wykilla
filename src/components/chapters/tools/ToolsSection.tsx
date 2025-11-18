'use client'

import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui'
import Link from 'next/link'

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
            {/* Tool cards will be added in Story 5.2 */}
            <div className="text-center text-white/60 col-span-2">
              Tool cards coming soon...
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Link href="/signup">
              <Button variant="primary" size="lg" glow>
                Sign Up to Access Tools
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
