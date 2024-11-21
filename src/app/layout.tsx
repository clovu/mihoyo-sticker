import type { Metadata } from 'next'
import localFont from 'next/font/local'

import './globals.css'

import { ThemeProvider } from '~/lib/provider/theme-provider'

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
  title: 'MiHoYo Sticker',
  description: 'A simple tool to copy, download, and manage MiYuShe stickers, making sharing and usage effortless across platforms.',
  keywords: ['MiHoYo', 'mhy', '米哈游', '表情包', 'sticker', '米游社', 'furina', '芙宁娜'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
