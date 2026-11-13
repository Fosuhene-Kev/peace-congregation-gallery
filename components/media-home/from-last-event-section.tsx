"use client"

import { useCallback, useState } from "react"
import {
  AnimatePresence,
  motion,
  type PanInfo,
  useMotionValue,
  useTransform,
} from "framer-motion"
import { ChevronLeft, ChevronRight, Images } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  type GalleryPhoto,
  getDriveViewImageUrl,
  getEventCoverUrl,
} from "@/lib/gallery-data"
import { MEDIA_SPRING } from "@/lib/media-home-data"
import { cn } from "@/lib/utils"

const SWIPE_THRESHOLD = 80

interface FromLastEventSectionProps {
  photos: GalleryPhoto[]
  eventName: string
  onViewAll: () => void
  onPhotoClick: (index: number) => void
}

export function FromLastEventSection({
  photos,
  eventName,
  onViewAll,
  onPhotoClick,
}: FromLastEventSectionProps) {
  const [topIndex, setTopIndex] = useState(0)
  const dragX = useMotionValue(0)
  const dragOpacity = useTransform(dragX, [-120, 0, 120], [0.85, 1, 0.85])

  const visibleIndices = [0, 1, 2].map(
    (offset) => (topIndex + offset) % photos.length,
  )

  const advance = useCallback(() => {
    setTopIndex((prev) => (prev + 1) % photos.length)
  }, [photos.length])

  const rewind = useCallback(() => {
    setTopIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }, [photos.length])

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD || info.velocity.x < -400) {
      advance()
      return
    }
    if (info.offset.x > SWIPE_THRESHOLD || info.velocity.x > 400) {
      rewind()
    }
  }

  if (photos.length === 0) return null

  const topPhoto = photos[visibleIndices[0]]

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={MEDIA_SPRING}
        className="mx-auto max-w-7xl"
      >
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Recent Gallery
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              From Last Event
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{eventName}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full border-white/10 bg-white/5 shadow-lg backdrop-blur-md"
              onClick={rewind}
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full border-white/10 bg-white/5 shadow-lg backdrop-blur-md"
              onClick={advance}
              aria-label="Next photo"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>

        <div className="relative mx-auto flex min-h-[26rem] max-w-lg items-center justify-center sm:min-h-[30rem]">
          <div
            className="pointer-events-none absolute inset-x-8 top-1/2 h-56 -translate-y-1/2 rounded-full bg-[oklch(0.55_0.2_25)]/15 blur-3xl"
            aria-hidden
          />

          {[2, 1].map((stackOffset) => {
            const photo = photos[visibleIndices[stackOffset]]

            return (
              <motion.div
                key={`${stackOffset}-${photo.photoId}`}
                className="pointer-events-none absolute w-[min(20rem,88vw)] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md"
                style={{ zIndex: 10 + stackOffset }}
                animate={{
                  y: stackOffset * 14,
                  scale: 1 - stackOffset * 0.04,
                  rotate: stackOffset === 2 ? -3 : 2,
                  opacity: 1 - stackOffset * 0.12,
                }}
                transition={MEDIA_SPRING}
              >
                <EventStackCardImage photo={photo} />
              </motion.div>
            )
          })}

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.button
              key={`${topPhoto.photoId}-${topIndex}`}
              type="button"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              style={{ x: dragX, opacity: dragOpacity }}
              onDragEnd={handleDragEnd}
              initial={{ opacity: 0, y: 40, scale: 0.94, rotate: 2 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: -1 }}
              exit={{ opacity: 0, x: -180, rotate: -8, scale: 0.92 }}
              transition={MEDIA_SPRING}
              onClick={() => onPhotoClick(visibleIndices[0])}
              className="absolute z-30 w-[min(20rem,88vw)] cursor-grab overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md active:cursor-grabbing"
              aria-label={`View photo: ${topPhoto.title ?? topPhoto.caption}`}
            >
              <EventStackCardImage photo={topPhoto} priority />
            </motion.button>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-xs text-muted-foreground">
            Swipe or use arrows to shuffle through {photos.length} photos
          </p>
          <Button
            variant="outline"
            onClick={onViewAll}
            className="rounded-full border-white/10 bg-white/5 px-6 shadow-lg backdrop-blur-md"
          >
            <Images className="h-4 w-4" aria-hidden />
            View full event album
          </Button>
        </div>
      </motion.div>
    </section>
  )
}

function EventStackCardImage({
  photo,
  priority = false,
}: {
  photo: GalleryPhoto
  priority?: boolean
}) {
  const [src, setSrc] = useState(() => getEventCoverUrl(photo.driveId))
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <div className="relative aspect-[4/5] w-full bg-muted">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden />
        )}
        <img
          src={src}
          alt={photo.title ?? photo.caption}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          onError={() => setSrc(getDriveViewImageUrl(photo.driveId))}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300",
            loaded ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
      <div className="border-t border-white/10 bg-black/40 px-4 py-3 text-left backdrop-blur-md">
        <p className="line-clamp-1 text-sm font-semibold text-white">
          {photo.title ?? photo.caption}
        </p>
        <p className="mt-1 line-clamp-2 text-xs text-white/75">{photo.caption}</p>
      </div>
    </>
  )
}
