"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HERO_IMAGE, MEDIA_SPRING } from "@/lib/media-home-data"

interface HeroSectionProps {
  onExplore: () => void
}

export function HeroSection({ onExplore }: HeroSectionProps) {
  return (
    <section className="relative h-[80vh] min-h-[28rem] w-full overflow-hidden md:h-[80vh] md:min-h-[32rem]">
      <img
        src={HERO_IMAGE}
        alt="Peace Congregation church building"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-slate-950"
        aria-hidden
      />

      <div className="relative flex h-full flex-col items-center justify-center px-6 py-16 text-center sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...MEDIA_SPRING, delay: 0.1 }}
          className="max-w-4xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md sm:p-12"
        >
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/80 sm:text-xs">
            PCG Peace Congregation · Bronkong-Afrancho
          </p>
          <h1 className="text-balance text-2xl font-bold leading-[1.15] tracking-tight text-white drop-shadow-sm sm:text-4xl md:text-5xl">
            WELCOME TO THE MEDIA HUB OF PEACE CONGREGATION
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
            Stream sermons, explore event galleries, and stay connected with the
            life and witness of our church family.
          </p>
          <Button
            size="lg"
            onClick={onExplore}
            className="mt-8 h-12 rounded-full border border-white/20 bg-white/10 px-8 text-sm font-semibold text-white shadow-2xl backdrop-blur-md transition hover:bg-white/20 hover:text-white"
          >
            Explore the Media Hub
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
