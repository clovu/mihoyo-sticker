import { describe, test, expect } from 'vitest'
import { blankText, handleHistorySticker } from './strings'

describe('string utils', () => {
  test('should return true when string is undefined', () => {
    expect(blankText(undefined)).toBeTruthy()
  })

  test('should return true when string is blank', () => {
    expect(blankText('')).toBeTruthy()
    expect(blankText(' ')).toBeTruthy()
  })

  test('should return false when string is not blank', () => {
    expect(blankText('Ms. Furina')).toBeFalsy()
  })

  test('handle history sticker and sort', () => {
    const data = { 1: [2, { id: 1 }], 2: [1, { id: 2 }], 3: [3, { id: 3 }] }
    const result = handleHistorySticker(data as any)
    expect(result).toStrictEqual([{ id: 3 }, { id: 1 }, { id: 2 }])
  })
})
