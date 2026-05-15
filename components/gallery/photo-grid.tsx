"use client"

import { useEffect, useRef, useState } from "react"
import { GalleryPhoto, getDriveViewImageUrl, getThumbnailUrl } from "@/lib/gallery-data"
import { cn } from "@/lib/utils"

interface PhotoGridProps {
  photos: GalleryPhoto[]
  onPhotoClick: (index: number) => void
}

/** Stable visual variety for masonry tiles without measuring images. */
function getMasonryAspectClass(photoId: string): string {
  const n = photoId.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const variants = [
    "aspect-[3/4]",
    "aspect-[4/5]",
    "aspect-[5/6]",
    "aspect-square",
    "aspect-[4/3]",
  ]
  return variants[n % variants.length]
}

export function PhotoGrid({ photos, onPhotoClick }: PhotoGridProps) {
  return (
    <div className="masonry-grid columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4 xl:columns-4">
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo.photoId}
          photo={photo}
          aspectClass={getMasonryAspectClass(photo.photoId)}
          onClick={() => onPhotoClick(index)}
        />
      ))}
    </div>
  )
}

interface PhotoCardProps {
  photo: GalleryPhoto
  aspectClass: string
  onClick: () => void
}

function PhotoCard({ photo, aspectClass, onClick }: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const rootRef = useRef<HTMLButtonElement | null>(null)

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
      { root: null, rootMargin: "300px", threshold: 0.01 }
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
      type="button"
      onClick={onClick}
      className={cn(
        "group relative mb-3 w-full break-inside-avoid overflow-hidden rounded-xl bg-muted shadow-sm",
        "transition-all duration-200 hover:shadow-md hover:ring-2 hover:ring-primary/20",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        aspectClass
      )}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-muted">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted p-4 text-muted-foreground">
          <svg className="mb-2 h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-center text-xs">Unable to load</span>
        </div>
      )}

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
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
            isLoaded && !hasError ? "opacity-100" : "opacity-0"
          )}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="line-clamp-2 text-xs font-medium text-white sm:text-sm">
            {photo.caption}
          </p>
        </div>
      </div>
    </button>
  )
}
