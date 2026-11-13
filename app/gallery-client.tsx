"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { AppShell } from "@/components/gallery/app-shell"
import { MediaHomepage } from "@/components/media-home/media-homepage"
import { EventsCarousel } from "@/components/gallery/events-carousel"
import { EventDetailView } from "@/components/gallery/event-detail-view"
import { Lightbox } from "@/components/gallery/lightbox"
import { SermonsPlaceholder } from "@/components/gallery/sermons-placeholder"
import { NotificationsPanel } from "@/components/gallery/notifications-panel"
import {
  getEventById,
  getPhotosForEvent,
  getSortedEvents,
} from "@/lib/gallery-data"
import { LAST_EVENT_ID } from "@/lib/media-home-data"
import { isAppView, type AppView } from "@/lib/navigation"

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

  const homePhotos = useMemo(
    () => getPhotosForEvent(LAST_EVENT_ID),
    [],
  )

  const activePhotos = useMemo(() => {
    if (isEventDetail && detailEvent) {
      return getPhotosForEvent(detailEvent.eventId)
    }
    if (isHomeGallery) {
      return homePhotos
    }
    return []
  }, [isEventDetail, detailEvent, isHomeGallery, homePhotos])

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
        updateUrl("home")
        return
      }
      updateUrl(view)
    },
    [updateUrl]
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

      {isHomeGallery && (
        <MediaHomepage
          onExploreEvents={() => updateUrl("events")}
          onOpenLastEvent={() => updateUrl("events", LAST_EVENT_ID)}
          onPhotoClick={handlePhotoClick}
        />
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
