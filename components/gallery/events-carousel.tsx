"use client"

import { useState } from "react"
import { ArrowRight, CalendarDays, Images } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  type GalleryEvent,
  getDriveViewImageUrl,
  getEventCoverUrl,
  getPhotoCountForEvent,
} from "@/lib/gallery-data"
import { cn } from "@/lib/utils"

function EventCoverImage({
  driveId,
  eventName,
}: {
  driveId: string
  eventName: string
}) {
  const [src, setSrc] = useState(() => getEventCoverUrl(driveId))
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const handleError = () => {
    if (src.includes("thumbnail")) {
      setSrc(getDriveViewImageUrl(driveId))
      setLoaded(false)
    } else {
      setFailed(true)
    }
  }

  if (failed) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/15 via-muted to-muted">
        <CalendarDays className="h-10 w-10 text-white/70" aria-hidden />
        <p className="text-center text-xs font-medium text-white/80">
          Cover unavailable
        </p>
      </div>
    )
  }

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden />
      )}
      <img
        src={src}
        alt={eventName}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </>
  )
}

function formatCardDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

interface EventCarouselCardProps {
  event: GalleryEvent
  photoCount: number
  onOpen: () => void
}

function EventCoverPlaceholder({
  eventName,
  accent = "default",
}: {
  eventName: string
  accent?: "default" | "red"
}) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center gap-3 px-6",
        accent === "red"
          ? "bg-gradient-to-br from-[oklch(0.55_0.2_25)]/35 via-primary/15 to-muted"
          : "bg-gradient-to-br from-primary/20 via-muted to-[oklch(0.75_0.15_85)]/25",
      )}
      aria-hidden
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-6 top-8 h-32 animate-pulse rounded-2xl bg-white/10" />
        <div className="absolute inset-x-10 top-44 h-3 animate-pulse rounded-full bg-white/10" />
        <div className="absolute inset-x-14 top-52 h-3 animate-pulse rounded-full bg-white/8" />
      </div>

      <div
        className={cn(
          "relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-black/10 shadow-inner backdrop-blur-sm",
          accent === "red" && "border-[oklch(0.55_0.2_25)]/30 bg-[oklch(0.55_0.2_25)]/15",
        )}
      >
        <CalendarDays
          className={cn(
            "h-8 w-8",
            accent === "red" ? "text-[oklch(0.55_0.2_25)]" : "text-primary/70",
          )}
          aria-hidden
        />
      </div>

      <div className="relative text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
          Cover photo pending
        </p>
        <p className="mt-1 max-w-[14rem] text-xs font-medium leading-snug text-white/90">
          Official event cover coming soon
        </p>
      </div>

      <span className="sr-only">{eventName} — cover image not yet available</span>
    </div>
  )
}

function EventCarouselCard({ event, photoCount, onOpen }: EventCarouselCardProps) {
  const hasCover = event.coverDriveId != null && event.coverDriveId !== ""
  const placeholderAccent =
    event.eventId === "2026-mens-week-sunday" ? "red" : "default"

  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "events-carousel__card group relative mx-auto block overflow-hidden rounded-3xl text-left shadow-lg",
        "transition-shadow duration-300 hover:shadow-xl",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
    >
      {hasCover ? (
        <EventCoverImage driveId={event.coverDriveId!} eventName={event.eventName} />
      ) : (
        <EventCoverPlaceholder
          eventName={event.eventName}
          accent={placeholderAccent}
        />
      )}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black/85 via-black/40 to-transparent"
        aria-hidden
      />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-4 sm:p-5">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-tight text-white sm:text-lg">
          {event.eventName}
        </h3>
        <p className="mt-1 text-xs font-medium leading-snug text-white/90 sm:text-sm">
          {formatCardDate(event.eventDate)}
        </p>
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-white/80">
          <Images className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {photoCount} {photoCount === 1 ? "photo" : "photos"}
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm transition-colors group-hover:bg-white">
          View photos
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </span>
      </div>
    </button>
  )
}

interface EventsCarouselProps {
  events: GalleryEvent[]
  onEventOpen: (eventId: string) => void
}

export function EventsCarousel({ events, onEventOpen }: EventsCarouselProps) {
  const multiple = events.length > 1

  return (
    <section className="events-carousel mx-auto w-full max-w-md px-4 pb-6 pt-2 sm:px-5">
      <header className="mb-5 text-center sm:mb-6 sm:text-left">
        <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Events
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Swipe through programs and open an album to browse photos.
        </p>
      </header>

      <div className="flex justify-center py-2 sm:py-4">
        <Carousel
          opts={{
            align: "center",
            loop: false,
            dragFree: multiple,
            containScroll: "trimSnaps",
          }}
          className="w-full max-w-[min(24rem,85vw)]"
        >
          <CarouselContent className={cn(multiple ? "-ml-4" : "ml-0")}>
            {events.map((event) => {
              const photoCount = getPhotoCountForEvent(event.eventId)

              return (
                <CarouselItem
                  key={event.eventId}
                  className={cn(
                    "flex basis-full justify-center pl-4",
                    multiple && "sm:basis-full"
                  )}
                >
                  <EventCarouselCard
                    event={event}
                    photoCount={photoCount}
                    onOpen={() => onEventOpen(event.eventId)}
                  />
                </CarouselItem>
              )
            })}
          </CarouselContent>

          {multiple && (
            <>
              <CarouselPrevious className="-left-2 border-0 bg-card/95 shadow-md sm:-left-4" />
              <CarouselNext className="-right-2 border-0 bg-card/95 shadow-md sm:-right-4" />
            </>
          )}
        </Carousel>
      </div>
    </section>
  )
}
