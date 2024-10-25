import { StickerClassify } from '~/types'
import * as strings from './strings'

export function isEmpty(sticker: { icon: string }) {
  return strings.blankText(sticker.icon)
}

/**
 * Find a sticker classify that can be the default, usually the first
 */
export function findDefaultStickerClassify(records: StickerClassify[]) {
  return records.find((sticker) => !isEmpty(sticker))
}
