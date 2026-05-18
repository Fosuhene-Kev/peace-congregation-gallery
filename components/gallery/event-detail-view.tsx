"use client"

import type { GalleryEvent, GalleryPhoto } from "@/lib/gallery-data"
import { EventDetailHeader } from "@/components/gallery/event-detail-header"
import { PhotoGrid } from "@/components/gallery/photo-grid"

interface EventDetailViewProps {
  event: GalleryEvent
  photos: GalleryPhoto[]
  onBack: () => void
  onPhotoClick: (index: number) => void
}

export function EventDetailView({
  event,
  photos,
  onBack,
  onPhotoClick,
}: EventDetailViewProps) {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <EventDetailHeader event={event} onBack={onBack} />

      {photos.length > 0 ? (
        <PhotoGrid photos={photos} onPhotoClick={onPhotoClick} />
      ) : (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">
            No photos available for this event yet.
          </p>
        </div>
      )}
    </div>
  )
}
