"use client"

import { motion } from "framer-motion"
import { ExternalLink, Play } from "lucide-react"
import { LATEST_SERMONS, MEDIA_SPRING } from "@/lib/media-home-data"

export function LatestSermonsSection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={MEDIA_SPRING}
        className="mx-auto max-w-7xl"
      >
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Watch & Listen
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Latest Sermons
            </h2>
          </div>
        </div>

        <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-4 [scrollbar-width:thin] snap-x snap-mandatory">
          {LATEST_SERMONS.map((sermon, index) => (
            <motion.a
              key={sermon.id}
              href={sermon.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ ...MEDIA_SPRING, delay: index * 0.08 }}
              className="group relative aspect-video w-[min(85vw,28rem)] shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md"
            >
              <img
                src={sermon.thumbnail}
                alt={sermon.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/10" />

              <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md">
                <ExternalLink className="h-3 w-3" aria-hidden />
                YouTube
              </span>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-2xl backdrop-blur-md">
                  <Play className="h-6 w-6 fill-current" aria-hidden />
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="text-[10px] font-medium uppercase tracking-wider text-white/70">
                  {sermon.date}
                </p>
                <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-snug text-white">
                  {sermon.title}
                </h3>
                <p className="mt-1 text-xs text-white/75">{sermon.preacher}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
