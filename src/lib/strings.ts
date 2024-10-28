/**
 * the string must not be {@code null} and must contain at least one
 */
export function blankText(str?: string) {
  const size = str?.trim().length ?? 0
  return size === 0
}

/**
 * filter sticker history data and sort
 */
export function handleHistorySticker<T>(historyRecords: Record<number, [number, T]>) {
  return Object.values(historyRecords || {})
    .sort(([a], [b]) => b - a)
    .map(([, sticker]) => sticker)
}
