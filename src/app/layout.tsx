import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

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
    <html lang="de" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans antialiased bg-ink text-white">
        {children}
      </body>
    </html>
  )
}
