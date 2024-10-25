'use client'
/**
 * <p>
 * Classify Bar
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2024-10-25 14:56
 */
import Image from 'next/image'

import { Sticker, StickerClassify } from '~/types'
import { cn } from '~/lib/utils'

import { buttonVariants } from './ui/button'

type Classify = Omit<StickerClassify, 'list'> & { list?: Sticker[] }

interface StickerClassifyBarProps {
  data?: Classify[]
  activeId?: number
  onClick?: (id: number) => void
}

export function StickerClassifyBar({ data = [], activeId, onClick }: StickerClassifyBarProps) {
  const classifyList = data.map(({ icon, name, id }) => {
    if (icon.length === 0) return

    return (
      <Image
        key={id}
        src={icon}
        alt={name}
        width={40}
        height={40}
        onClick={() => onClick?.(id)}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'p-1 hover:bg-muted transition-colors',
          activeId === id ? 'bg-muted' : undefined,
        )}
      />
    )
  })

  return (
    <div className="flex w-max space-x-2">
      {classifyList}
    </div>
  )
}
