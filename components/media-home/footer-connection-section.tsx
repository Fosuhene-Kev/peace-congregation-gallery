"use client"

import { motion } from "framer-motion"
import { Clock, Facebook, Instagram, MapPin, Youtube } from "lucide-react"
import {
  CHURCH_MAP_EMBED,
  MEDIA_SPRING,
  SERVICE_SCHEDULE,
  SOCIAL_LINKS,
} from "@/lib/media-home-data"

const SOCIAL_ICONS = {
  youtube: Youtube,
  facebook: Facebook,
  instagram: Instagram,
} as const

export function FooterConnectionSection() {
  return (
    <footer className="border-t border-border/60 bg-card/50 px-4 py-16 sm:px-6 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={MEDIA_SPRING}
        className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-3 lg:gap-12"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
          <div className="mb-5 flex items-center gap-2 text-foreground">
            <Clock className="h-5 w-5 text-primary" aria-hidden />
            <h2 className="text-lg font-semibold">Service Times</h2>
          </div>
          <ul className="space-y-5">
            {SERVICE_SCHEDULE.map((block) => (
              <li key={block.label}>
                <p className="text-sm font-semibold text-foreground">{block.label}</p>
                <ul className="mt-2 space-y-1">
                  {block.times.map((time) => (
                    <li key={time} className="text-sm text-muted-foreground">
                      {time}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
          <h2 className="text-lg font-semibold text-foreground">Stay Connected</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Follow Peace Congregation online for sermons, event updates, and
            community announcements.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((link) => {
              const Icon = SOCIAL_ICONS[link.icon]
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-foreground shadow-lg backdrop-blur-md transition hover:bg-white/10"
                >
                  <Icon className="h-4 w-4 text-primary" aria-hidden />
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md">
          <div className="mb-4 flex items-center gap-2 text-foreground">
            <MapPin className="h-5 w-5 text-primary" aria-hidden />
            <h2 className="text-lg font-semibold">Find Us</h2>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            PCG Peace Congregation, Bronkong-Afrancho, Ashanti Region, Ghana
          </p>
          <div className="overflow-hidden rounded-xl border border-white/10 shadow-inner">
            <iframe
              title="Peace Congregation location map"
              src={CHURCH_MAP_EMBED}
              className="aspect-[4/3] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </motion.div>

      <p className="mx-auto mt-12 max-w-7xl text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} PCG Peace Congregation, Bronkong-Afrancho.
        Media Hub.
      </p>
    </footer>
  )
}
