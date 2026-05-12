"use client"

import { useEffect, useRef, useState } from "react"
import { GalleryPhoto, getDriveViewImageUrl, getThumbnailUrl } from "@/lib/gallery-data"
import { cn } from "@/lib/utils"

interface PhotoGridProps {
  photos: GalleryPhoto[]
  onPhotoClick: (index: number) => void
}

export function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo.photoId}
          photo={photo}
          onClick={() => onPhotoClick(index)}
        />
      ))}
    </div>
  )
}

interface PhotoCardProps {
  photo: GalleryPhoto
  onClick: () => void
}

function PhotoCard({ photo, onClick }: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const rootRef = useRef<HTMLButtonElement | null>(null)

  // Only start loading when the tile is near the viewport.
  useEffect(() => {
    setIsLoaded(false)
    setHasError(false)
    setImageSrc(null)

    const el = rootRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return
        setImageSrc(getThumbnailUrl(photo.driveId))
        observer.disconnect()
      },
      { root: null, rootMargin: "250px", threshold: 0.01 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [photo.driveId])

  const handleImageError = () => {
    if (imageSrc && imageSrc.includes("thumbnail")) {
      setImageSrc(getDriveViewImageUrl(photo.driveId))
      setIsLoaded(false)
    } else {
      setHasError(true)
    }
  }

  return (
    <button
      ref={rootRef}
      onClick={onClick}
      className="group relative aspect-square overflow-hidden rounded-lg bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
    >
      {/* Skeleton shimmer loader */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-muted animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground p-4">
          <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xs text-center">Unable to load</span>
        </div>
      )}

      {/* Actual image */}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={photo.caption}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          onError={handleImageError}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            isLoaded && !hasError ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      {/* Hover overlay with caption */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200">
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white text-xs sm:text-sm font-medium line-clamp-2">
            {photo.caption}
          </p>
        </div>
      </div>

      {/* Focus indicator */}
      <div className="absolute inset-0 ring-2 ring-primary ring-inset opacity-0 group-focus:opacity-100 rounded-lg pointer-events-none" />
    </button>
  )
}
