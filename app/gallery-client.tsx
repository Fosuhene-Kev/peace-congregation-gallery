"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AppShell } from "@/components/gallery/app-shell"
import { EventSelector } from "@/components/gallery/event-selector"
import { PhotoGrid } from "@/components/gallery/photo-grid"
import { Lightbox } from "@/components/gallery/lightbox"
import { SermonsPlaceholder } from "@/components/gallery/sermons-placeholder"
import { NotificationsPanel } from "@/components/gallery/notifications-panel"
import { churchGalleryData, type GalleryEvent } from "@/lib/gallery-data"
import { isAppView, type AppView } from "@/lib/navigation"

function formatEventDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function GalleryStrip({ event }: { event: GalleryEvent }) {
  return (
    <div className="mb-4 flex flex-col gap-1 border-b border-border pb-4 sm:mb-6">
      <h1 className="text-lg font-semibold text-foreground sm:text-xl">
        {event.eventName}
      </h1>
      <p className="text-sm text-muted-foreground">
        {formatEventDate(event.eventDate)}
      </p>
      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {event.description}
      </p>
    </div>
  )
}

function EmptyGallery() {
  return (
    <div className="py-16 text-center">
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <svg
          className="h-8 w-8 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
      <p className="text-muted-foreground">No photos available for this event yet.</p>
    </div>
  )
}

export function GalleryClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const sortedEvents = useMemo(() => {
    return [...churchGalleryData.events].sort(
      (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
    )
  }, [])

  const activeView: AppView = useMemo(() => {
    const view = searchParams.get("view")
    return isAppView(view) ? view : "home"
  }, [searchParams])

  const getInitialEvent = useCallback(() => {
    const urlEventId = searchParams.get("event")
    if (urlEventId) {
      const foundEvent = sortedEvents.find((e) => e.eventId === urlEventId)
      if (foundEvent) return foundEvent
    }
    return sortedEvents[0]
  }, [searchParams, sortedEvents])

  const [activeEvent, setActiveEvent] = useState<GalleryEvent | undefined>(
    getInitialEvent
  )
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    setActiveEvent(getInitialEvent())
  }, [getInitialEvent])

  const activePhotos = useMemo(() => {
    return churchGalleryData.photos.filter(
      (photo) => photo.eventId === activeEvent?.eventId
    )
  }, [activeEvent])

  const updateUrl = useCallback(
    (view: AppView, eventId?: string) => {
      const params = new URLSearchParams()
      if (view !== "home") params.set("view", view)
      if (eventId) params.set("event", eventId)
      const query = params.toString()
      router.push(query ? `?${query}` : "/", { scroll: false })
    },
    [router]
  )

  const handleViewChange = useCallback(
    (view: AppView) => {
      updateUrl(view, activeEvent?.eventId)
    },
    [updateUrl, activeEvent?.eventId]
  )

  const handleEventSelect = useCallback(
    (eventId: string) => {
      const event = sortedEvents.find((e) => e.eventId === eventId)
      if (event) {
        setActiveEvent(event)
        updateUrl(activeView === "home" ? "home" : "events", eventId)
      }
    },
    [sortedEvents, updateUrl, activeView]
  )

  const handlePhotoClick = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const handleLightboxNext = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % activePhotos.length)
  }, [activePhotos.length])

  const handleLightboxPrev = useCallback(() => {
    setLightboxIndex(
      (prev) => (prev - 1 + activePhotos.length) % activePhotos.length
    )
  }, [activePhotos.length])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === "Escape") setLightboxOpen(false)
      if (e.key === "ArrowRight") handleLightboxNext()
      if (e.key === "ArrowLeft") handleLightboxPrev()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, handleLightboxNext, handleLightboxPrev])

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [lightboxOpen])

  const showGallery = activeView === "home" || activeView === "events"

  return (
    <AppShell activeView={activeView} onViewChange={handleViewChange}>
      {activeView === "events" && (
        <div className="mx-auto mb-6 max-w-3xl">
          <h2 className="mb-1 text-lg font-semibold text-foreground">Events</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Choose a program to browse its photo album.
          </p>
          <EventSelector
            events={sortedEvents}
            activeEventId={activeEvent?.eventId || ""}
            onEventSelect={handleEventSelect}
          />
        </div>
      )}

      {activeView === "sermons" && <SermonsPlaceholder />}

      {activeView === "notifications" && <NotificationsPanel />}

      {showGallery && activeEvent && (
        <div className="mx-auto w-full max-w-7xl">
          {activeView === "home" ? (
            <div className="mb-3 flex items-baseline justify-between gap-2 border-b border-border/60 pb-3">
              <h1 className="text-base font-semibold text-foreground sm:text-lg">
                {activeEvent.eventName}
              </h1>
              <p className="shrink-0 text-xs text-muted-foreground">
                {new Date(activeEvent.eventDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          ) : (
            <GalleryStrip event={activeEvent} />
          )}

          {activePhotos.length > 0 ? (
            <PhotoGrid photos={activePhotos} onPhotoClick={handlePhotoClick} />
          ) : (
            <EmptyGallery />
          )}
        </div>
      )}

      {lightboxOpen && activePhotos.length > 0 && (
        <Lightbox
          photos={activePhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={handleLightboxNext}
          onPrev={handleLightboxPrev}
        />
      )}
    </AppShell>
  )
}
