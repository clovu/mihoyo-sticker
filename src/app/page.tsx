import { ExclamationTriangleIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { StickerCard } from '~/components/sticker-card'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Alert</AlertTitle>
        <AlertDescription>
          The current website is under urgent development.
        </AlertDescription>
      </Alert>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <StickerCard className="w-[636px]" />
        <div className="flex gap-2 mx-auto">
          <Input placeholder="search your like sticker" />
          <Button variant="outline">Search</Button>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-muted-foreground/50 hover:text-muted-foreground/100"
          href="https://github.com/Clover-You/mihoyo-sticker"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubLogoIcon />
          GitHub
        </a>
      </footer>
    </div>
  )
}
