"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { MEDIA_SPRING } from "@/lib/media-home-data"

export function MemorialBannerSection() {
  return (
    <section className="px-4 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={MEDIA_SPRING}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-primary/90 via-primary to-[oklch(0.35_0.08_250)] px-6 py-10 text-center shadow-2xl sm:px-12 sm:py-14"
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[oklch(0.75_0.15_85)]/20 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-4">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
            <Heart className="h-5 w-5 text-[oklch(0.75_0.15_85)]" aria-hidden />
          </span>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/75">
            In Loving Memory
          </p>
          <h2 className="text-balance text-xl font-semibold leading-snug text-white sm:text-3xl">
            Late Retired Catechist George Asare
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
            We honour a faithful teacher, gentle shepherd, and devoted servant
            whose instruction and example continue to shape Peace Congregation.
            May his soul rest in the Lord&apos;s eternal peace.
          </p>
        </div>
      </motion.div>
    </section>
  )
}
