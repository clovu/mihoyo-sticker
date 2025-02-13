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
  const searchValue = React.useRef('')

  function filterSticker(value?: string) {
    if (hasText(value)) {
      const stickers = list
        .map(group => {
          const list = group.list.filter(it => it.name.indexOf(trim(value)) > -1)
          return { ...group, list }
        })
        .filter(it => it.list.length > 0)
      setRecords(stickers)
      return
    }
    setRecords(list)
  }

  React.useEffect(() => {
    filterSticker(searchValue.current)
  }, [list])

  return <>
    <StickerCard className="w-full" records={records} />
    <SearchInput
      onSearch={() => filterSticker(searchValue.current)}
      onChange={v => searchValue.current = v}
    />
  </>
}

function SearchInput({
  onSearch,
  onChange,
}: Readonly<{
  onSearch: () => void
  onChange: (value: string) => void
}>) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch()
  }

  return <>
    <form className="flex gap-2 mx-auto" onSubmit={handleSubmit}>
      <Input placeholder="search your like sticker" onInput={(e) => onChange(e.currentTarget.value)} />
      <Button variant="outline" type="submit">Search</Button>
    </form>
  </>
}
