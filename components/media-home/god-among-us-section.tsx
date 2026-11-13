"use client"

import { motion } from "framer-motion"
import { ArrowRight, Images } from "lucide-react"
import { StackedCardGallery } from "@/components/gallery/stacked-card-gallery"
import { Button } from "@/components/ui/button"
import type { GalleryPhoto } from "@/lib/gallery-data"
import { MEDIA_SPRING } from "@/lib/media-home-data"

interface GodAmongUsSectionProps {
  photos: GalleryPhoto[]
  onPhotoClick: (index: number) => void
  onViewAlbum: () => void
}

export function GodAmongUsSection({
  photos,
  onPhotoClick,
  onViewAlbum,
}: GodAmongUsSectionProps) {
  if (photos.length === 0) return null

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={MEDIA_SPRING}
        className="mx-auto max-w-7xl"
      >
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Community
          </p>
          <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
            See What God Is Doing Among Us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            A preview from our Men&apos;s Week Sunday fellowship — scroll through
            the stack the same way you browse photos in the event gallery.
          </p>
        </div>

        <div className="relative mx-auto mt-10 max-w-lg">
          <div
            className="pointer-events-none absolute inset-x-6 top-16 h-48 rounded-full bg-primary/15 blur-3xl"
            aria-hidden
          />
          <StackedCardGallery
            photos={photos}
            onPhotoClick={onPhotoClick}
            variant="preview"
          />
        </div>

        <div className="mt-2 flex justify-center">
          <Button
            variant="outline"
            onClick={onViewAlbum}
            className="rounded-full border-white/10 bg-white/5 px-6 shadow-lg backdrop-blur-md"
          >
            <Images className="h-4 w-4" aria-hidden />
            View full Men&apos;s Week album
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </motion.div>
    </section>
  )
}
