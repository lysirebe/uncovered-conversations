import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Allow next/image to serve Sanity CDN images
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
}

export default nextConfig
