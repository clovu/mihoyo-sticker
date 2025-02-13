/**
 * filter sticker history data and sort
 */
export function handleHistorySticker<T>(historyRecords: Record<number, [number, T]>) {
  return Object.values(historyRecords || {})
    .sort(([a], [b]) => b - a)
    .map(([, sticker]) => sticker)
}
