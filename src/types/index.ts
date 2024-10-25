type StickerStatus = 'draft' | 'published'

export interface StickerClassify {
  id: number
  name: string
  icon: string
  sort_order: number
  num: number
  status: StickerStatus
  list: Sticker[]
  updated_at: number
  is_available: boolean
}

export interface Sticker {
  id: number
  name: string
  icon: string
  sort_order: number
  static_icon: string
  updated_at: number
  is_available: boolean
  status: StickerStatus
  keywords: string[]
}
