import { describe, test, expect } from 'vitest'
import { findDefaultGroup, handleHistorySticker } from './sticker'

describe('sticker utils', () => {
  test('find a sticker group that can be the default', () => {
    const sticker = findDefaultGroup(
      [{ icon: '', id: 1 }, { icon: 'https://xxx', id: 2 }, { icon: 'https://xxx', id: 3 }] as any[],
    )
    expect(sticker?.id).toBe(2)
  })

  test('handle history sticker and sort', () => {
    const data = { 1: [2, { id: 1 }], 2: [1, { id: 2 }], 3: [3, { id: 3 }] }
    const result = handleHistorySticker(data as any)
    expect(result).toStrictEqual([{ id: 3 }, { id: 1 }, { id: 2 }])
  })
})
