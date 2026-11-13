"use client"

import { useEffect, useRef, useState } from "react"
import { Images } from "lucide-react"
import {
  type GalleryPhoto,
  getDriveViewImageUrl,
  getFullResolutionUrl,
} from "@/lib/gallery-data"
import { cn } from "@/lib/utils"

interface StackedCardGalleryProps {
  photos: GalleryPhoto[]
  onPhotoClick: (index: number) => void
  /** Compact preview stack for homepage sections */
  variant?: "default" | "preview"
  hint?: string | false
}

export function StackedCardGallery({
  photos,
  onPhotoClick,
  variant = "default",
  hint,
}: StackedCardGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scrollRoot = container.closest(".app-main-scroll")
    const slides = container.querySelectorAll("[data-stack-slide]")

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIndex = -1
        let bestRatio = 0

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = Number((entry.target as HTMLElement).dataset.stackIndex)
          if (Number.isNaN(idx)) return
          if (entry.intersectionRatio >= bestRatio) {
            bestRatio = entry.intersectionRatio
            bestIndex = idx
          }
        })

        if (bestIndex >= 0) {
          setActiveIndex(bestIndex)
        }
      },
      {
        root: scrollRoot,
        threshold: [0.15, 0.35, 0.55, 0.75],
        rootMargin: "-12% 0px -28% 0px",
      },
    )

    slides.forEach((slide) => observer.observe(slide))
    return () => observer.disconnect()
  }, [photos.length])

  const hintText =
    hint === false
      ? null
      : hint ??
        (variant === "preview"
          ? "Scroll to explore — cards stack as you browse the preview"
          : "Scroll to explore — cards stack as you move through the album")

  return (
    <div
      ref={containerRef}
      className={cn(
        "stacked-gallery",
        variant === "preview" && "stacked-gallery--preview",
      )}
    >
      {hintText && (
        <p className="stacked-gallery__hint mb-4 text-center text-xs text-muted-foreground sm:text-sm">
          {hintText}
        </p>
      )}

      <div className="stacked-gallery__stage">
        {photos.map((photo, index) => (
          <StackedCard
            key={photo.photoId}
            photo={photo}
            index={index}
            total={photos.length}
            depth={Math.max(0, activeIndex - index)}
            isActive={index === activeIndex}
            onClick={() => onPhotoClick(index)}
          />
        ))}
      </div>

      <div className="stacked-gallery__end-spacer" aria-hidden />
    </div>
  )
}

interface StackedCardProps {
  photo: GalleryPhoto
  index: number
  total: number
  depth: number
  isActive: boolean
  onClick: () => void
}

function StackedCard({
  photo,
  index,
  total,
  depth,
  isActive,
  onClick,
}: StackedCardProps) {
  const [src, setSrc] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSrc(null)
    setLoaded(false)
    setFailed(false)

    const el = cardRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting) return
        setSrc(getFullResolutionUrl(photo.driveId))
        observer.disconnect()
      },
      { root: null, rootMargin: "400px", threshold: 0.01 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [photo.driveId])

  const handleError = () => {
    if (src?.includes("thumbnail")) {
      setSrc(getDriveViewImageUrl(photo.driveId))
      setLoaded(false)
    } else {
      setFailed(true)
    }
  }

  const displayTitle = photo.title ?? photo.caption
  const scale = Math.max(0.88, 1 - depth * 0.04)
  const translateY = depth * -10

  return (
    <article
      data-stack-slide
      data-stack-index={index}
      className="stacked-gallery__slide"
      style={{ zIndex: index + 1 }}
    >
      <div
        ref={cardRef}
        className={cn(
          "stacked-gallery__card-wrap",
          isActive && "stacked-gallery__card-wrap--active",
        )}
        style={{
          transform: `translateY(${translateY}px) scale(${scale})`,
        }}
      >
        <button
          type="button"
          onClick={onClick}
          className={cn(
            "stacked-gallery__card group w-full text-left",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          )}
          aria-label={`View photo ${index + 1} of ${total}: ${displayTitle}`}
        >
          <div className="stacked-gallery__media relative overflow-hidden">
            {!loaded && !failed && (
              <div
                className="absolute inset-0 animate-pulse bg-muted"
                aria-hidden
              />
            )}

            {failed && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
                <Images className="h-8 w-8 opacity-60" aria-hidden />
                <span className="text-xs">Unable to load photo</span>
              </div>
            )}

            {src && (
              <img
                src={src}
                alt={displayTitle}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onLoad={() => setLoaded(true)}
                onError={handleError}
                className={cn(
                  "h-full w-full object-cover transition-opacity duration-500",
                  loaded && !failed ? "opacity-100" : "opacity-0",
                )}
              />
            )}

            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent"
              aria-hidden
            />
          </div>

          <div className="stacked-gallery__meta">
            <span className="stacked-gallery__index">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <h3 className="stacked-gallery__title">{displayTitle}</h3>
            <p className="stacked-gallery__caption">{photo.caption}</p>
          </div>
        </button>
      </div>
    </article>
  )
}
