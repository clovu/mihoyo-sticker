/**
 * <p>
 * 剪切板工具
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2024-10-25 14:39
 */
export function writeText(text: string) {
  return navigator.clipboard.writeText(text)
}
