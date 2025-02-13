import { StickerClassify } from '~/types'
import { isBlank } from '@naiftools/string'

export function isEmpty(sticker: { icon: string }) {
  return isBlank(sticker.icon)
}

/**
 * Find a sticker classify that can be the default, usually the first
 */
export function findDefaultStickerClassify(records: StickerClassify[]) {
  return records.find((sticker) => !isEmpty(sticker))
}
