import type { VercelConfig } from '@vercel/config/v1'

export const config: VercelConfig = {
  buildCommand: 'pnpm build',
  installCommand: 'pnpm install',
  framework: 'nextjs',
}
