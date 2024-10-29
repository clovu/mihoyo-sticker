/**
 * <p>
 * Convas utils
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2024-10-29 15:05
 */

/**
 * canvas to blob
 * @param canvas canvas
 */
export function toBlob(canvas: HTMLCanvasElement) {
  const dataURL = canvas.toDataURL()

  const byteString = atob(dataURL.split(',')[1])
  const mimeString = dataURL.match(/^data:([^;]+);base64,/)?.[1]

  const buffer = new ArrayBuffer(byteString.length)
  const intArray = new Uint8Array(buffer)

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i)
  }

  return new Blob([intArray.buffer], { type: mimeString })
}

/**
 * Image to canvas
 * @param img image element
 */
export function imgToConvas(img: HTMLImageElement) {
  if (!document) return

  const canvas = document.createElement('canvas')
  canvas.width = img.naturalWidth
  canvas.height = img.naturalHeight

  const ctx = canvas.getContext('2d')
  ctx?.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

  return canvas
}
