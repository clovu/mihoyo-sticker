'use client'

import { MouseEvent } from 'react'

import { buttonVariants } from './ui/button'

import { Sticker } from '~/types'
import { cn } from '~/lib/utils'

interface StickerImgProps {
  it: Sticker
  onClick: (e: MouseEvent<HTMLImageElement>, s: Sticker) => void
}

export function StickerImg({ it, onClick }: StickerImgProps) {
  return (
    <div
      className={cn(
        buttonVariants({ variant: 'outline' }),
        'p-1 hover:bg-muted transition-colors border-none h-[55px] w-[55px] cursor-pointer',
      )}
    >
      <img src={it.icon} alt={it.name}
        onClick={(e) => onClick?.(e, it)}
        crossOrigin="anonymous"
        className="dark:brightness-50"
      />
    </div>
  )
}
