'use client'

import React from 'react'
import { hasText, trim } from '@naiftools/string'
import { isNotEmpty } from '@naiftools/array'

import type { StickerGroup } from '~/types'

import { StickerCard } from './sticker-card'
import { Input } from './ui/input'
import { Button } from './ui/button'

export function StickerPanel({
  list = [],
  style: panelStyle,
}: Readonly<{ list: StickerGroup[], style?: 'command' }>) {
  const [groups, setGroups] = React.useState(list)
  const searchValue = React.useRef('')

  function filterSticker(value?: string) {
    if (hasText(value)) {
      const groups = list
        .map(group => {
          const list = group.list.filter(it => it.name.indexOf(trim(value)) > -1)
          return { ...group, list }
        })
        .filter(it => isNotEmpty(it.list))
      setGroups(groups)
      return
    }
    setGroups(list)
  }

  React.useEffect(() => {
    filterSticker(searchValue.current)
  }, [list])

  if (panelStyle === 'command')
    return <CommandStickerPanel list={groups} filter={filterSticker} />

  return <>
    <StickerCard className="w-full" groups={groups} />
    <SearchInput
      onSearch={() => filterSticker(searchValue.current)}
      onChange={v => searchValue.current = v}
    />
  </>
}

function CommandStickerPanel({
  list,
  filter,
}: Readonly<{ list: StickerGroup[], filter: (s?: string) => void }>) {
  const searchValue = React.useRef('')
  return <>
    <StickerCard
      className="w-screen overflow-hidden border-none"
      scrollAreaClassName="h-screen"
      groups={list}
      header={
        <div className="p-4 pb-0">
          <SearchInput
            onSearch={() => filter(searchValue.current)}
            onChange={v => searchValue.current = v}
            hideBtn
          />
        </div>
      }
    />
  </>
}

function SearchInput({
  onSearch,
  onChange,
  hideBtn,
}: Readonly<{
  onSearch: () => void
  onChange: (value: string) => void
  hideBtn?: boolean
}>) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onSearch()
  }

  return <>
    <form className="flex gap-2 mx-auto" onSubmit={handleSubmit}>
      <Input placeholder="search your like sticker" onInput={(e) => onChange(e.currentTarget.value)} />
      {!hideBtn && <Button variant="outline" type="submit">Search</Button>}
    </form>
  </>
}
