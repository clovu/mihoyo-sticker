'use client'

import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Image from 'next/image'

import { Button, buttonVariants } from '~/components/ui/button'
import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area'

import records from '~/../data'
import { cn } from '~/lib/utils'
import { MouseEvent, useState } from 'react'

export default function Home() {
  const [active, setActive] = useState<number>()

  const classify = records.map(({ icon, name, id, status }) => {
    if (status === 'draft') return <></>
    return (
      <Image
        key={id}
        src={icon}
        alt={name}
        width={40}
        height={40}
        onClick={() => setActive(id)}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'p-1 hover:bg-muted transition-colors',
          active === id ? 'bg-muted' : undefined,
        )}
      />
    )
  })

  async function onCopy(event: MouseEvent<HTMLImageElement>) {
    const img = event.currentTarget

    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight

    const ctx = canvas.getContext('2d')
    ctx?.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

    canvas.toBlob((blob) => {
      if (!blob) return

      // Write blob to  clipboard
      const data = [new ClipboardItem({ [blob.type]: blob })]
      navigator.clipboard.write(data)
    }, 'image/png')

  }

  const stickers = records.find(({ id }) => id === active)
  const stickerNodes = stickers?.list.map(({ icon, id, name }) => (
    <img src={icon} key={id} alt={name}
      onClick={onCopy}
      crossOrigin="anonymous"
      className={cn(
        buttonVariants({ variant: 'outline' }),
        'p-1 hover:bg-muted transition-colors border-none h-[55px] cursor-pointer',
      )} />
  ))

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card className="w-[600px]">
          <CardContent className="overflow-hidden pb-0">
            <ScrollArea className="w-full max-h-[300px] h-52">
              <div className="grid grid-cols-10 pr-4">{stickerNodes}</div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="overflow-hidden p-4 pb-0">
            <ScrollArea className="w-full">
              <div className="flex w-max space-x-2 mb-4">
                {classify}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </CardFooter>
        </Card>

        <div className="flex gap-2 mx-auto">
          <Input placeholder="search your like sticker" />
          <Button variant="outline">Search</Button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-muted-foreground/50 hover:text-muted-foreground/100"
          href="https://github.com/Clover-You/mihoyo-sticker"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubLogoIcon />
          GitHub
        </a>
      </footer>
    </div>
  )
}
