'use client'

import React from 'react'
import { toast } from 'sonner'
import { BellIcon, CountdownTimerIcon } from '@radix-ui/react-icons'
import { useLocalStorageValue } from '@react-hookz/web'

import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area'
import { StickerClassifyBar } from '~/components/classify-bar'

import { Separator } from './ui/separator'
import { Toaster } from './ui/sonner'
import { Button } from './ui/button'


import { HistoryStickerRecord, Sticker, StickerGroup } from '~/types'

import * as clipboard from '~/lib/clipboard'
import { imgToConvas } from '~/lib/convas'
import { cn } from '~/lib/utils'
import { findDefaultStickerClassify, handleHistorySticker } from '~/lib/sticker'

import { MenuType, StickerImg, StickerImgEvents } from './sticker-img'

interface StickerCardProps {
  className?: string
  records?: StickerGroup[]
}

const DEFAULT_MIME = 'image/png'

export function StickerCard({ className, records = [] }: StickerCardProps) {
  const defaultActiveId = findDefaultStickerClassify(records)?.id ?? 0
  const groupRecord = useLocalStorageValue<number>('active-parant-id', {
    initializeWithValue: false, defaultValue: defaultActiveId,
  })
  const setActive = groupRecord.set
  let active = groupRecord.value

  // check if not exists the group, use the first group
  if (active !== 0) {
    const hasActiveId = records.some(it => it.id === active)
    if (!hasActiveId) active = records.at(0)?.id ?? 0
  }

  const { value: historyStickerRecords, set: setHistory } = useLocalStorageValue<HistoryStickerRecord>('sticker-history', {})

  function addHistory(s: Sticker) {
    if (!historyStickerRecords)
      setHistory({})

    const records = { ...historyStickerRecords }
    records[s.id] = [new Date().getTime(), s]

    setHistory(records)
  }

  function handleError(e: unknown) {
    const errMsg = e instanceof Error ? e.message : 'Unknown Error'
    toast.error('Error', { description: errMsg, richColors: true, position: 'top-right' })
  }

  function isImageErrorComplete(image: HTMLImageElement) {
    return image.complete && image.naturalWidth === 0
  }

  function isStickerImageValid(img: HTMLImageElement, name: string) {
    if (!img.complete) {
      toast.warning(`Sticker 「${name}」 is loading...`, {
        position: 'top-right',
        richColors: true,
        icon: <BellIcon />,
      })
      return false
    }
    if (isImageErrorComplete(img)) {
      toast.error(`Sticker 「${name}」 failed to load.`, {
        position: 'top-right',
        richColors: true,
        icon: <BellIcon />,
      })
      return false
    }
    return true
  }

  function guessMimeType(url: string) {
    if (url.endsWith('.png')) return DEFAULT_MIME
    if (url.endsWith('.jpg') || url.endsWith('.jpeg')) return 'image/jpeg'
    if (url.endsWith('.gif')) return 'image/gif'
    return DEFAULT_MIME
  }

  function isGIF(img: HTMLImageElement) {
    return img.src.endsWith('.gif')
  }

  function clipboardItemCreator(img: HTMLImageElement) {
    // The browser does not support GIF copy to clipboard by defalt.
    // So, if it is a GIF image, it needs to be converted to canvas to take the first frame of the image.
    if (isGIF(img))
      return createGIFClipboardItem(img)

    const blobPromise = fetch(img.src, { cache: 'force-cache' })
      .then(r => r.blob())

    // Using Promise-in-ClipboardItem to solve the Safari transient-activation issue
    return new ClipboardItem(
      { [guessMimeType(img.src)]: blobPromise },
      { presentationStyle: 'attachment' },
    )
  }

  async function onCopy(event: React.MouseEvent<HTMLImageElement>, sticker: Sticker) {
    const img = event.currentTarget
    if (!isStickerImageValid(img, sticker.name)) return

    try {
      const clipboardItem = clipboardItemCreator(img)
      if (!clipboardItem) return
      await navigator.clipboard.write([clipboardItem])

      toast(`You copied 「${sticker.name}」`, {
        position: 'top-right',
        icon: <BellIcon />,
      })

      addHistory(sticker)
    } catch (e) {
      handleError(e)
    }
  }

  function createGIFClipboardItem(img: HTMLImageElement) {
    const canvas = imgToConvas(img)
    if (!canvas) return

    const blobPromise = new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob)
        else reject('GIF to png conversion process encountered an unexpected exception.')
      })
    })
    return new ClipboardItem(
      { [DEFAULT_MIME]: blobPromise },
      { presentationStyle: 'attachment' },
    )
  }

  /**
   * download the sticker to local
   */
  async function downloadSticker(s: Sticker) {
    try {
      const resp = await fetch(s.icon)
      const blob = await resp.blob()

      const objURL = URL.createObjectURL(blob)

      const anchor = document.createElement('a')
      anchor.href = objURL
      anchor.download = s.name

      const clickEvent = new MouseEvent('click')

      anchor.dispatchEvent(clickEvent)

      URL.revokeObjectURL(objURL)
    } catch (e) {
      handleError(e)
    }
  }

  async function copeStickerURL(s: Sticker) {
    try {
      await clipboard.writeText(s.icon)

      toast(`The URL of 「${s.name}」 has been copied to your clipboard`, {
        position: 'top-right',
        icon: <BellIcon />,
        description: s.icon,
      })
    } catch (e) {
      handleError(e)
    }
  }

  const MENU_HANDLER_RECORD = {
    [MenuType.DOWNLOAD]: downloadSticker,
    [MenuType.COPY_URL]: copeStickerURL,
  }

  function handleMenuClick(i: MenuType, s: Sticker) {
    const handler = MENU_HANDLER_RECORD[i]
    handler(s)
  }

  // handle history sticker and sort
  const historyStickers = handleHistorySticker(historyStickerRecords || {})
  const historyClassify = { id: 0, name: 'History', list: historyStickers }

  // find the current selected classify
  const stickers = [historyClassify, ...records].find(({ id }) => id === active)
  const stickerList = stickers?.list ?? []

  function classifyBarRenderer(el?: React.ReactNode) {
    return <>
      <Button
        variant="outline"
        className={cn('w-[40px] h-[40px]', active === 0 ? 'bg-muted' : '')}
        onClick={() => {
          setActive(0)
        }}
      >
        <CountdownTimerIcon />
      </Button>
      {el}</>
  }

  return (
    <Card className={className}>
      <Toaster />
      <CardContent className="overflow-hidden p-4 pb-0 pr-2">
        <ScrollArea className="max-h-[300px] h-52 pr-2">
          <div className="grid sm:grid-cols-10 grid-cols-4 gap-1">
            <StickerRenderer stickers={stickerList} onMenuClick={handleMenuClick} onClick={onCopy} />
          </div>
        </ScrollArea>
      </CardContent>
      <Separator />
      <CardFooter className="overflow-hidden py-0 px-4">
        <ScrollArea className="w-full py-4">
          <StickerClassifyBar
            data={records}
            activeId={active}
            onClick={setActive}
            renderer={classifyBarRenderer}
          />
          <ScrollBar orientation="horizontal" className="absolute !bottom-[3px]" />
        </ScrollArea>
      </CardFooter>
    </Card>
  )
}

interface StickerRenderer extends StickerImgEvents {
  stickers: Sticker[]
}

function StickerRenderer({ stickers, onClick, onMenuClick }: StickerRenderer) {
  return stickers.map((it) => (
    <StickerImg it={it} onClick={onClick} key={it.id} onMenuClick={onMenuClick} />
  ))
}
