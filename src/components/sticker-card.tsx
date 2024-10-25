'use client'
import { MouseEvent, useState } from 'react'

import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area'
import { StickerClassifyBar } from '~/components/classify-bar'

import { Sticker, StickerClassify } from '~/types'

import records from '~/../data'

import * as clipboard from '~/lib/clipboard'
import { findDefaultStickerClassify } from '~/lib/sticker'

import { StickerImg } from './sticker-img'
import { Separator } from './ui/separator'
import { Toaster } from './ui/sonner'
import { toast } from 'sonner'
import { BellIcon } from '@radix-ui/react-icons'

interface StickerCardProps {
  className?: string
}

export function StickerCard({ className }: StickerCardProps) {
  const [active, setActive] = useState<number>(findDefaultStickerClassify(records as StickerClassify[])?.id ?? 0)

  async function onCopy(event: MouseEvent<HTMLImageElement>, sticker: Sticker) {
    const img = event.currentTarget

    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight

    const ctx = canvas.getContext('2d')
    ctx?.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

    canvas.toBlob(async (blob) => {
      if (!blob) return
      await clipboard.writeBlob(blob)

      toast(`You copied 「${sticker.name}」`, {
        position: 'top-right',
        icon: <BellIcon />,
      })
    }, 'image/png')

  }

  const stickers = records.find(({ id }) => id === active)
  const stickerNodes = stickers?.list.map((it) => (
    <StickerImg it={it as Sticker} onClick={onCopy} key={it.id} />
  ))

  return (
    <Card className={className}>
      <Toaster />
      <CardContent className="overflow-hidden pb-0">
        <ScrollArea className="max-h-[300px] h-52 py-2">
          <div className="grid grid-cols-10 gap-1">{stickerNodes}</div>
        </ScrollArea>
      </CardContent>
      <Separator />
      <CardFooter className="overflow-hidden p-4">
        <ScrollArea className="w-full">
          <StickerClassifyBar data={records as StickerClassify[]} activeId={active} onClick={setActive} />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardFooter>
    </Card>
  )
}

