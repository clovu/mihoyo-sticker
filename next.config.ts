import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  experimental: {
    reactCompiler: true,
  },
  images: { unoptimized: true },
}

export default nextConfig
