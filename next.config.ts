import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // basePath: '/ihthisham.github.io', // Uncomment for GitHub Pages subdirectory
}

export default nextConfig
