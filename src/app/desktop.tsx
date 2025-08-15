import { StickerPanel } from '~/components/panel'
import { StickerGroup } from '~/types'

export default function DesktopPage({
  list = [],
}: Readonly<{ list: StickerGroup[] }>) {
  return <StickerPanel style="command" list={list} />
}
