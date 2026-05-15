"use client"

import { Mic2 } from "lucide-react"

export function SermonsPlaceholder() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Mic2 className="h-8 w-8" aria-hidden />
      </div>
      <h2 className="text-xl font-semibold text-foreground">Sermons</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Sermon audio and video will be available here soon. We are preparing a
        dedicated space for Sunday messages and special services.
      </p>
      <p className="mt-6 rounded-full bg-muted px-4 py-2 text-xs font-medium text-muted-foreground">
        Coming soon
      </p>
    </div>
  )
}
