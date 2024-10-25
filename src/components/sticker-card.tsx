'use client'
import { MouseEvent, useState } from 'react'

import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area'
import { StickerClassifyBar } from '~/components/classify-bar'
import { Sticker, StickerClassify } from '~/types'

import records from '~/../data'

import * as clipboard from '~/lib/clipboard'
import { StickerImg } from './sticker-img'

interface StickerCardProps {
  className?: string
}

export function StickerCard({ className }: StickerCardProps) {
  const [active, setActive] = useState<number>()

  async function onCopy(event: MouseEvent<HTMLImageElement>) {
    const img = event.currentTarget

    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight

    const ctx = canvas.getContext('2d')
    ctx?.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

    canvas.toBlob((blob) => {
      if (!blob) return
      clipboard.writeBlob(blob)
    }, 'image/png')

  }

  const stickers = records.find(({ id }) => id === active)
  const stickerNodes = stickers?.list.map((it) => (
    <StickerImg it={it as Sticker} onClick={onCopy} key={it.id} />
  ))

  return (
    <Card className={className}>
      <CardContent className="overflow-hidden pb-0">
        <ScrollArea className="w-full max-h-[300px] h-52">
          <div className="grid grid-cols-10 pr-4">{stickerNodes}</div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="overflow-hidden p-4 pb-0">
        <ScrollArea className="w-full">
          <StickerClassifyBar data={records as StickerClassify[]} activeId={active} onClick={setActive} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardFooter>
    </Card>
  )
}

