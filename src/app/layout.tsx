import type { Metadata } from 'next'
import './globals.css'
import { MainLayout } from '@/components/layout'
import { SessionProvider } from '@/components/providers/SessionProvider'

// Note: Google Fonts temporarily disabled due to build issues
// Using system fonts as fallback
// TODO: Re-enable when network connectivity is available or switch to self-hosted fonts

export const metadata: Metadata = {
  title: 'WYKILLA — Futuristic Music & Creative AI Tools',
  description: 'Melodic Techno producer, 3D artist, and AI tool creator. Experience cinematic sound design and cutting-edge creative technology.',
  keywords: ['WYKILLA', 'Melodic Techno', 'Music Producer', 'AI Tools', '3D Art', 'Electronic Music'],
  authors: [{ name: 'WYKILLA' }],
  openGraph: {
    title: 'WYKILLA — Futuristic Music & Creative AI Tools',
    description: 'Melodic Techno producer, 3D artist, and AI tool creator.',
    url: 'https://wykilla.com',
    siteName: 'WYKILLA',
    images: [
      {
        url: '/og_image.jpg',
        width: 1200,
        height: 630,
        alt: 'WYKILLA',
      },
    ],
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WYKILLA — Futuristic Music & Creative AI Tools',
    description: 'Melodic Techno producer, 3D artist, and AI tool creator.',
    images: ['/og_image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="font-sans antialiased">
        <SessionProvider>
          <MainLayout>{children}</MainLayout>
        </SessionProvider>
      </body>
    </html>
  )
}
