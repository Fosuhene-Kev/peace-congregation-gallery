"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/gallery/header"
import { EventSelector } from "@/components/gallery/event-selector"
import { PhotoGrid } from "@/components/gallery/photo-grid"
import { Lightbox } from "@/components/gallery/lightbox"
import { churchGalleryData } from "@/lib/gallery-data"

export function GalleryClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const sortedEvents = useMemo(() => {
    return [...churchGalleryData.events].sort(
      (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
    )
  }, [])

  const getInitialEvent = useCallback(() => {
    const urlEventId = searchParams.get("event")
    if (urlEventId) {
      const foundEvent = sortedEvents.find((e) => e.eventId === urlEventId)
      if (foundEvent) return foundEvent
    }
    return sortedEvents[0]
  }, [searchParams, sortedEvents])

  const [activeEvent, setActiveEvent] = useState(getInitialEvent)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const activePhotos = useMemo(() => {
    return churchGalleryData.photos.filter(
      (photo) => photo.eventId === activeEvent?.eventId
    )
  }, [activeEvent])

  const handleEventSelect = useCallback(
    (eventId: string) => {
      const event = sortedEvents.find((e) => e.eventId === eventId)
      if (event) {
        setActiveEvent(event)
        router.push(`?event=${eventId}`, { scroll: false })
      }
    },
    [sortedEvents, router]
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

  return (
    <main className="min-h-screen bg-background">
      <Header activeEvent={activeEvent} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <EventSelector
          events={sortedEvents}
          activeEventId={activeEvent?.eventId || ""}
          onEventSelect={handleEventSelect}
        />

        {activeEvent && (
          <div className="mt-6 mb-8">
            <p className="text-muted-foreground text-center max-w-2xl mx-auto text-pretty">
              {activeEvent.description}
            </p>
          </div>
        )}

        <PhotoGrid photos={activePhotos} onPhotoClick={handlePhotoClick} />

        {activePhotos.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <svg
                className="w-8 h-8 text-muted-foreground"
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
            <p className="text-muted-foreground">
              No photos available for this event yet.
            </p>
          </div>
        )}
      </div>

      {lightboxOpen && activePhotos.length > 0 && (
        <Lightbox
          photos={activePhotos}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={handleLightboxNext}
          onPrev={handleLightboxPrev}
        />
      )}

      <footer className="border-t border-border bg-card mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Presbyterian Church of Ghana, Peace Congregation — Bronkong-Afrancho
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              © {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
