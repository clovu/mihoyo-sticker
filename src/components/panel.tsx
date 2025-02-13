'use client'

import React from 'react'
import { hasText, trim } from '@naiftools/string'

import type { StickerClassify } from '~/types'

import { StickerCard } from './sticker-card'
import { Input } from './ui/input'
import { Button } from './ui/button'

export function StickerPanel({
  list = [],
}: Readonly<{ list: StickerClassify[] }>) {
  const [records, setRecords] = React.useState(list)

  function filterSticker(value?: string) {
    if (hasText(value)) {
      const stickers = list.map(group => {
        const list = group.list.filter(it => it.name.indexOf(trim(value)) > -1)
        return { ...group, list }
      })
      setRecords(stickers)
      return
    }
    setRecords(list)
  }

  return <>
    <StickerCard className="w-full" records={records} />
    <SearchInput onClick={filterSticker} />
  </>
}

function SearchInput({
  onClick,
}: Readonly<{ onClick: (value?: string) => void }>) {
  const [value, setValue] = React.useState<string>()

  return <>
    <div className="flex gap-2 mx-auto">
      <Input placeholder="search your like sticker" onInput={(e) => setValue(e.currentTarget.value)} />
      <Button variant="outline" onClick={() => onClick(value)}>Search</Button>
    </div>
  </>
}
