'use client'

import { ReactNode } from 'react'
import { toast } from 'sonner'
import { BellIcon, CountdownTimerIcon } from '@radix-ui/react-icons'
import { useLocalStorageValue } from '@react-hookz/web'

import { Card, CardContent, CardFooter } from '~/components/ui/card'
import { ScrollArea, ScrollBar } from '~/components/ui/scroll-area'
import { StickerClassifyBar } from '~/components/classify-bar'

import { Separator } from './ui/separator'
import { Toaster } from './ui/sonner'
import { Button } from './ui/button'


import { HistoryStickerRecord, Sticker, StickerClassify } from '~/types'

import * as clipboard from '~/lib/clipboard'
import { toBlob, imgToConvas } from '~/lib/convas'
import { cn } from '~/lib/utils'
import { findDefaultStickerClassify, handleHistorySticker } from '~/lib/sticker'

import { MenuType, StickerImg, StickerImgEvents } from './sticker-img'

interface StickerCardProps {
  className?: string
  records?: StickerClassify[]
}

export function StickerCard({ className, records = [] }: StickerCardProps) {
  const defaultActiveId = findDefaultStickerClassify(records)?.id ?? 0
  const { value: active, set: setActive } = useLocalStorageValue<number>('active-parant-id', {
    initializeWithValue: false, defaultValue: defaultActiveId,
  })

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

  async function onCopy(event: React.MouseEvent<HTMLImageElement>, sticker: Sticker) {
    const img = event.currentTarget

    try {
      const canvas = imgToConvas(img)
      if (!canvas) return

      const blob = toBlob(canvas)
      if (!blob) return

      const clipboardItem = [new ClipboardItem({ [blob.type]: blob })]
      // it must be invoked within a user-triggered event (e.g., click event).
      // see: https://webkit.org/blog/10247/new-webkit-features-in-safari-13-1/
      await navigator.clipboard.write(clipboardItem)

      toast(`You copied 「${sticker.name}」`, {
        position: 'top-right',
        icon: <BellIcon />,
      })

      addHistory(sticker)
    } catch (e) {
      handleError(e)
    }
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

  function classifyBarRenderer(el?: ReactNode) {
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
      <CardContent className="overflow-hidden pb-0">
        <ScrollArea className="max-h-[300px] h-52 py-2">
          <div className="grid sm:grid-cols-10 grid-cols-4 gap-1">
            <StickerRenderer stickers={stickerList} onMenuClick={handleMenuClick} onClick={onCopy} />
          </div>
        </ScrollArea>
      </CardContent>
      <Separator />
      <CardFooter className="overflow-hidden p-4">
        <ScrollArea className="w-full">
          <StickerClassifyBar
            data={records}
            activeId={active}
            onClick={setActive}
            renderer={classifyBarRenderer}
          />
          <ScrollBar orientation="horizontal" />
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
