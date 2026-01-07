import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'

import { ThemeProvider } from '~/lib/provider/theme-provider'
import { SEO } from '~/components/seo'

import { description, keywords } from '~/seo'
import { cn } from '~/lib/utils'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'MiHoYo Sticker Archive – HoYoverse Stickers & Emojis',
  description,
  keywords,
  verification: {
    other: {
      'baidu-site-verification': 'codeva-H7naUSFHbH',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(`${geistSans.variable} ${geistMono.variable} antialiased`,
          process.env.NEXT_PUBLIC_PLATFORM === 'desktop' ? 'overflow-hidden h-screen' : '',
        )}
      >
        <SEO />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
