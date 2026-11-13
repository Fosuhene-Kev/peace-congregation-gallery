"use client"

import {
  getEventById,
  getPhotosForEvent,
} from "@/lib/gallery-data"
import { LAST_EVENT_ID, getGodAmongUsPreviewPhotos } from "@/lib/media-home-data"
import { FooterConnectionSection } from "@/components/media-home/footer-connection-section"
import { FromLastEventSection } from "@/components/media-home/from-last-event-section"
import { GodAmongUsSection } from "@/components/media-home/god-among-us-section"
import { HeroSection } from "@/components/media-home/hero-section"
import { LatestSermonsSection } from "@/components/media-home/latest-sermons-section"
import { MemorialBannerSection } from "@/components/media-home/memorial-banner-section"
import { SpiritualAnchorSection } from "@/components/media-home/spiritual-anchor-section"

interface MediaHomepageProps {
  onExploreEvents: () => void
  onOpenLastEvent: () => void
  onPhotoClick: (index: number) => void
}

export function MediaHomepage({
  onExploreEvents,
  onOpenLastEvent,
  onPhotoClick,
}: MediaHomepageProps) {
  const lastEvent = getEventById(LAST_EVENT_ID)
  const lastEventPhotos = getPhotosForEvent(LAST_EVENT_ID)
  const previewPhotos = getGodAmongUsPreviewPhotos()

  const handlePreviewPhotoClick = (previewIndex: number) => {
    const photo = previewPhotos[previewIndex]
    if (!photo) return
    const globalIndex = lastEventPhotos.findIndex(
      (entry) => entry.photoId === photo.photoId,
    )
    onPhotoClick(globalIndex >= 0 ? globalIndex : previewIndex)
  }

  return (
    <div className="-mx-4 w-[calc(100%+2rem)] sm:-mx-6 sm:w-[calc(100%+3rem)]">
      <HeroSection onExplore={onExploreEvents} />
      <LatestSermonsSection />
      <GodAmongUsSection
        photos={previewPhotos}
        onPhotoClick={handlePreviewPhotoClick}
        onViewAlbum={onOpenLastEvent}
      />
      <MemorialBannerSection />
      {lastEvent && lastEventPhotos.length > 0 && (
        <FromLastEventSection
          photos={lastEventPhotos}
          eventName={lastEvent.eventName}
          onViewAll={onOpenLastEvent}
          onPhotoClick={onPhotoClick}
        />
      )}
      <SpiritualAnchorSection />
      <FooterConnectionSection />
    </div>
  )
}
