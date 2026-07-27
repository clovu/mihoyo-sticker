import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  reactCompiler: true,
  reactStrictMode: false,
  images: { unoptimized: true },
}

export default nextConfig
