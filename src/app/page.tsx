import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import { StickerPanel } from '~/components/panel'
import TimeAgoComponent from '~/components/timeago'

import { StickerGroup } from '~/types'

const SERVER_URL = 'https://bbs-api-static.miyoushe.com/misc/api/emoticon_set'

async function getStickerRecords() {
  const resp = await fetch(SERVER_URL)
  const respJson = await resp.json()
  return respJson.data.list as StickerGroup[]
}

export default async function Home() {
  const groups = await getStickerRecords()
  const today = new Date()
  const dateString = today.toUTCString()

  sortGroup(groups)

  function sortGroup(list: StickerGroup[]) {
    return list.sort((a, b) => a.sort_order - b.sort_order)
  }

  return (
    <div className="grid sm:justify-items-center min-h-screen pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="h-screen w-screen flex justify-center items-center sm:h-auto sm:w-auto sm:pt-20">
        <img
          src="/qv_furina.png"
          width={150}
          className="dark:brightness-[.3] dark:opacity-80 opacity-50 select-none"
          draggable="false" />
      </div>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center w-screen sm:w-[750px] p-8 box-border">
        <StickerPanel list={groups} />
      </main>
      <footer className="flex direction-alternate flex-col gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-muted-foreground/50 hover:text-muted-foreground/100"
          href="https://github.com/clovu/mihoyo-sticker"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubLogoIcon />
          GitHub
        </a>

        <span className="text-muted-foreground/50 text-sm" suppressHydrationWarning>
          Data update time: <TimeAgoComponent date={dateString} />
        </span>

        <span className="text-muted-foreground/50 text-sm">
          © 2024-PRESENT
          <Link href="https://github.com/clovu" className="ml-2" target="_blank">Clover You</Link>
        </span>
      </footer>
    </div>
  )
}
