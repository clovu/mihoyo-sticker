
/**
 * the string must not be {@code null} and must contain at least one
 */
export function blankText(str?: string) {
  const size = str?.trim().length ?? 0
  return size === 0
}
