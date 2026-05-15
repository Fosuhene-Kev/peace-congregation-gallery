import { Suspense } from "react"
import { GalleryClient } from "./gallery-client"

function GalleryFallback() {
  return (
    <main className="flex h-dvh items-center justify-center bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="mt-4 text-muted-foreground text-sm">Loading gallery…</p>
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<GalleryFallback />}>
      <GalleryClient />
    </Suspense>
  )
}
