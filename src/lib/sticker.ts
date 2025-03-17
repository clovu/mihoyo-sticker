import { StickerGroup } from '~/types'
import { isBlank } from '@naiftools/string'

export function isEmpty(sticker: { icon: string }) {
  return isBlank(sticker.icon)
}

/**
 * Find a sticker classify that can be the default, usually the first
 */
export function findDefaultStickerClassify(records: StickerGroup[]) {
  return records.find((sticker) => !isEmpty(sticker))
}

/**
 * filter sticker history data and sort
 */
export function handleHistorySticker<T>(historyRecords: Record<number, [number, T]>) {
  return Object.values(historyRecords || {})
    .sort(([a], [b]) => b - a)
    .map(([, sticker]) => sticker)
}
