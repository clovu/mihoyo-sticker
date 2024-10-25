import { describe, test, expect } from "vitest"
import { blankText } from "./strings"

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
})
