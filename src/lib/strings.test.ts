import { describe, test, expect } from 'vitest'
import { handleHistorySticker } from './strings'

describe('string utils', () => {
  test('handle history sticker and sort', () => {
    const data = { 1: [2, { id: 1 }], 2: [1, { id: 2 }], 3: [3, { id: 3 }] }
    const result = handleHistorySticker(data as any)
    expect(result).toStrictEqual([{ id: 3 }, { id: 1 }, { id: 2 }])
  })
})
