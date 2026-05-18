"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AppShell } from "@/components/gallery/app-shell"
import { EventsCarousel } from "@/components/gallery/events-carousel"
import { EventDetailView } from "@/components/gallery/event-detail-view"
import { PhotoGrid } from "@/components/gallery/photo-grid"
import { Lightbox } from "@/components/gallery/lightbox"
import { SermonsPlaceholder } from "@/components/gallery/sermons-placeholder"
import { NotificationsPanel } from "@/components/gallery/notifications-panel"
import {
  getEventById,
  getPhotosForEvent,
  getSortedEvents,
} from "@/lib/gallery-data"
import { isAppView, type AppView } from "@/lib/navigation"

function EmptyGallery() {
  return (
    <div className="py-16 text-center">
      <p className="text-muted-foreground">No photos available for this event yet.</p>
    </div>
  )
}

export function GalleryClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const sortedEvents = useMemo(() => getSortedEvents(), [])

  const activeView: AppView = useMemo(() => {
    const view = searchParams.get("view")
    return isAppView(view) ? view : "home"
  }, [searchParams])

  const urlEventId = searchParams.get("event")

  const isEventsCarousel = activeView === "events" && !urlEventId
  const isEventDetail = activeView === "events" && !!urlEventId
  const isHomeGallery = activeView === "home"

  const detailEvent = useMemo(() => {
    if (!urlEventId) return undefined
    return getEventById(urlEventId)
  }, [urlEventId])

  const homeEvent = useMemo(() => {
    if (urlEventId) {
      const fromUrl = getEventById(urlEventId)
      if (fromUrl) return fromUrl
    }
    return sortedEvents[0]
  }, [urlEventId, sortedEvents])

  const galleryEvent = isEventDetail ? detailEvent : isHomeGallery ? homeEvent : undefined

  const activePhotos = useMemo(() => {
    if (!galleryEvent) return []
    return getPhotosForEvent(galleryEvent.eventId)
  }, [galleryEvent])

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const updateUrl = useCallback(
    (view: AppView, eventId?: string | null) => {
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
      if (view === "events") {
        updateUrl("events")
        return
      }
      if (view === "home") {
        updateUrl("home", sortedEvents[0]?.eventId)
        return
      }
      updateUrl(view)
    },
    [updateUrl, sortedEvents]
  )

  const handleEventOpen = useCallback(
    (eventId: string) => {
      updateUrl("events", eventId)
    },
    [updateUrl]
  )

  const handleEventsBack = useCallback(() => {
    updateUrl("events")
  }, [updateUrl])

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
    const root = document.documentElement
    if (lightboxOpen) {
      root.classList.add("lightbox-open")
    } else {
      root.classList.remove("lightbox-open")
    }
    return () => root.classList.remove("lightbox-open")
  }, [lightboxOpen])

  useEffect(() => {
    if (isEventDetail && urlEventId && !detailEvent) {
      updateUrl("events")
    }
  }, [isEventDetail, urlEventId, detailEvent, updateUrl])

  return (
    <AppShell activeView={activeView} onViewChange={handleViewChange}>
      {isEventsCarousel && (
        <EventsCarousel events={sortedEvents} onEventOpen={handleEventOpen} />
      )}

      {isEventDetail && detailEvent && (
        <EventDetailView
          event={detailEvent}
          photos={activePhotos}
          onBack={handleEventsBack}
          onPhotoClick={handlePhotoClick}
        />
      )}

      {activeView === "sermons" && <SermonsPlaceholder />}

      {activeView === "notifications" && <NotificationsPanel />}

      {isHomeGallery && galleryEvent && (
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-3 flex items-baseline justify-between gap-2 border-b border-border/60 pb-3">
            <h1 className="text-base font-semibold text-foreground sm:text-lg">
              {galleryEvent.eventName}
            </h1>
            <p className="shrink-0 text-xs text-muted-foreground">
              {new Date(galleryEvent.eventDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

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
