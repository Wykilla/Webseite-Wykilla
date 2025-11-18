/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static Export für HostEurope (Shared Hosting)
  // Kann später entfernt werden, wenn Backend hinzugefügt wird
  ...(process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true' && {
    output: 'export',
  }),
  
  images: {
    unoptimized: process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true', // Wichtig für Static Export
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    })
    return config
  },

  // Headers funktionieren nicht bei Static Export
  // Werden später über .htaccess auf HostEurope konfiguriert
  ...(process.env.NEXT_PUBLIC_STATIC_EXPORT !== 'true' && {
    async headers() {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-DNS-Prefetch-Control',
              value: 'on'
            },
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=63072000; includeSubDomains; preload'
            },
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN'
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            },
          ],
        },
      ]
    },
  }),
}

export default nextConfig
