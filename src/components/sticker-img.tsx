'use client'

import { MouseEvent } from 'react'
import { DownloadIcon } from '@radix-ui/react-icons'

import { buttonVariants } from './ui/button'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from './ui/context-menu'

import { Sticker } from '~/types'
import { cn } from '~/lib/utils'

interface StickerImgProps {
  it: Sticker
  onClick: (e: MouseEvent<HTMLImageElement>, s: Sticker) => void
  onMenuClick: (i: MenuType, s: Sticker) => void
}

export enum MenuType {
  DOWNLOAD
}

export function StickerImg({ it, onClick, onMenuClick }: StickerImgProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
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
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => onMenuClick(MenuType.DOWNLOAD, it)}>
          <DownloadIcon className="mr-2" />
          Download
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}
