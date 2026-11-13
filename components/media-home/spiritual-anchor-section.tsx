"use client"

import { motion } from "framer-motion"
import { MEDIA_SPRING } from "@/lib/media-home-data"

export function SpiritualAnchorSection() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={MEDIA_SPRING}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 px-6 py-16 text-center shadow-2xl backdrop-blur-md sm:px-12 sm:py-20"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[oklch(0.75_0.15_85)]/10 via-transparent to-primary/10"
          aria-hidden
        />

        <blockquote className="relative">
          <p className="text-balance font-serif text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            IF GOD BE FOR US WHO CAN BE AGAINST US
          </p>
          <footer className="mt-6 text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground sm:text-base">
            Romans 8:31
          </footer>
        </blockquote>
      </motion.div>
    </section>
  )
}
