/**
 * <p>
 * 剪切板工具
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2024-10-25 14:39
 */

/**
 * Write blob to clipboard
 */
export function writeBlob(blob: Blob, type: string = blob.type) {
  const data = [new ClipboardItem({ [type]: blob })]
  return navigator.clipboard.write(data)
}
