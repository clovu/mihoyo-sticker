import { describe, test, expect } from "vitest"
import { findDefaultStickerClassify } from "./sticker"

describe('sticker utils', () => {
  test('find a sticker classify that can be the default', () => {
    const sticker = findDefaultStickerClassify(
      [{ icon: "", id: 1 }, { icon: "https://xxx", id: 2 }, { icon: "https://xxx", id: 3 }] as any[]
    )
    expect(sticker?.id).toBe(2)
  })
})
