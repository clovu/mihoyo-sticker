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
import { ReactNode } from 'react'
import Image from 'next/image'
import { isBlank } from '@naiftools/string'

import { Sticker, StickerClassify } from '~/types'
import { cn } from '~/lib/utils'

import { buttonVariants } from './ui/button'

type Classify = Omit<StickerClassify, 'list'> & { list?: Sticker[] }

interface StickerClassifyBarProps {
  data?: Classify[]
  activeId?: number
  onClick?: (id: number) => void
  renderer?: (e?: ReactNode) => ReactNode
}

export function StickerClassifyBar({ data = [], activeId, onClick, renderer }: StickerClassifyBarProps) {
  const classifyList = data.map(({ icon, name, id }) => {
    if (isBlank(icon)) return

    return (
      <div
        key={id}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'p-1 hover:bg-muted transition-colors w-[40px] h-[40px]',
          activeId === id ? 'bg-muted' : undefined,
        )}
      >
        <Image
          src={icon}
          alt={name}
          width={40}
          height={40}
          onClick={() => onClick?.(id)}
          className="dark:brightness-50"
        />
      </div>
    )
  })

  return (
    <div className="flex w-max space-x-2">
      {renderer ? renderer(classifyList) : classifyList}
    </div>
  )
}
