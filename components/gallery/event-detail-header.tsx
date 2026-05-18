"use client"

import { ArrowLeft } from "lucide-react"
import type { GalleryEvent } from "@/lib/gallery-data"

function formatDetailDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

interface EventDetailHeaderProps {
  event: GalleryEvent
  onBack: () => void
}

export function EventDetailHeader({ event, onBack }: EventDetailHeaderProps) {
  return (
    <header className="mb-6 sm:mb-8">
      <button
        type="button"
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        All events
      </button>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm sm:text-base">
          <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
            {event.eventName}
          </h1>
          <span className="text-muted-foreground/60" aria-hidden>
            ›
          </span>
          <time
            dateTime={event.eventDate}
            className="font-medium text-muted-foreground"
          >
            {formatDetailDate(event.eventDate)}
          </time>
          <span className="text-muted-foreground/60" aria-hidden>
            ›
          </span>
        </div>

        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[0.9375rem] sm:leading-7">
          {event.description}
        </p>
      </div>
    </header>
  )
}
