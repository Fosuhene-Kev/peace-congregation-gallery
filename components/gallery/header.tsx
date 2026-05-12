"use client"

import { GalleryEvent } from "@/lib/gallery-data"

interface HeaderProps {
  activeEvent: GalleryEvent | null
}

export function Header({ activeEvent }: HeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <header className="bg-primary text-primary-foreground">
      {/* Decorative top accent bar */}
      <div className="h-1.5 bg-gradient-to-r from-[oklch(0.55_0.2_25)] via-[oklch(0.75_0.15_85)] to-[oklch(0.55_0.15_145)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center text-center">
          {/* Church logo */}
          <div className="mb-4">
            <div className="w-20 h-20 rounded-full bg-primary-foreground/10 flex items-center justify-center ring-2 ring-[oklch(0.75_0.15_85)] ring-offset-2 ring-offset-primary">
              <img
                src="/church-logo.png"
                alt="Presbyterian Church of Ghana logo"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>

          {/* Church name */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-balance">
            Presbyterian Church of Ghana
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-[oklch(0.75_0.15_85)] mt-1">
            Peace Congregation — Bronkong-Afrancho
          </p>
          <p className="text-sm text-primary-foreground/70 mt-2 uppercase tracking-widest">
            Photo Gallery & Media Archive
          </p>

          {/* Active event display */}
          {activeEvent && (
            <div className="mt-6 px-6 py-3 bg-primary-foreground/5 rounded-xl border border-primary-foreground/10 backdrop-blur-sm">
              <p className="text-[oklch(0.55_0.2_25)] font-semibold text-lg">
                {activeEvent.eventName}
              </p>
              <p className="text-primary-foreground/70 text-sm mt-0.5">
                {formatDate(activeEvent.eventDate)}
              </p>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
