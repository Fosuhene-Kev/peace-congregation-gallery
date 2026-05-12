"use client"

import { GalleryEvent } from "@/lib/gallery-data"
import { cn } from "@/lib/utils"

interface EventSelectorProps {
  events: GalleryEvent[]
  activeEventId: string
  onEventSelect: (eventId: string) => void
}

export function EventSelector({ events, activeEventId, onEventSelect }: EventSelectorProps) {
  const formatShortDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }

  return (
    <div className="w-full">
      <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 text-center">
        Select Event
      </h2>
      
      {/* Horizontal scrollable badge list for all screen sizes */}
      <div className="relative">
        {/* Fade edges for scroll indication */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex gap-3 overflow-x-auto pb-2 px-4 -mx-4 scrollbar-hide snap-x snap-mandatory">
          {events.map((event) => {
            const isActive = event.eventId === activeEventId
            return (
              <button
                key={event.eventId}
                onClick={() => onEventSelect(event.eventId)}
                className={cn(
                  "flex-shrink-0 snap-start px-4 py-3 rounded-xl border-2 transition-all duration-200",
                  "min-w-[180px] sm:min-w-[220px]",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]"
                    : "bg-card text-card-foreground border-border hover:border-primary/50 hover:shadow-md"
                )}
              >
                <div className="text-left">
                  <p className={cn(
                    "font-semibold text-sm line-clamp-2",
                    isActive ? "text-primary-foreground" : "text-foreground"
                  )}>
                    {event.eventName}
                  </p>
                  <p className={cn(
                    "text-xs mt-1",
                    isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {formatShortDate(event.eventDate)}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Mobile dropdown for easier selection */}
      <div className="mt-4 sm:hidden">
        <select
          value={activeEventId}
          onChange={(e) => onEventSelect(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-medium"
        >
          {events.map((event) => (
            <option key={event.eventId} value={event.eventId}>
              {event.eventName} — {formatShortDate(event.eventDate)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
