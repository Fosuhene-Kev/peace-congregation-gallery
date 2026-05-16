"use client"

import {
  Bell,
  CalendarDays,
  Home,
  Mic2,
  type LucideIcon,
} from "lucide-react"
import type { AppView } from "@/lib/navigation"
import { NAV_ITEMS } from "@/lib/navigation"

const TAB_COUNT = NAV_ITEMS.length

const ICONS: Record<AppView, LucideIcon> = {
  home: Home,
  events: CalendarDays,
  sermons: Mic2,
  notifications: Bell,
}

interface MobileBottomNavProps {
  activeView: AppView
  onViewChange: (view: AppView) => void
}

export function MobileBottomNav({
  activeView,
  onViewChange,
}: MobileBottomNavProps) {
  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === activeView)
  )
  const activeItem = NAV_ITEMS[activeIndex]
  const ActiveIcon = ICONS[activeItem.id]

  const activeCenter = `${((activeIndex + 0.5) / TAB_COUNT) * 100}%`

  return (
    <nav className="mobile-nav md:hidden" aria-label="Main navigation">
      <div className="mobile-nav__frame">
        <div className="mobile-nav__pill">
          <div className="mobile-nav__tabs">
            {NAV_ITEMS.map((item) => {
              const Icon = ICONS[item.id]
              const isActive = activeView === item.id

              return (
                <div key={item.id} className="mobile-nav__tab">
                  {isActive ? (
                    <span className="mobile-nav__tab-spacer" aria-hidden />
                  ) : (
                    <button
                      type="button"
                      className="mobile-nav__tab-btn"
                      onClick={() => onViewChange(item.id)}
                      aria-label={item.label}
                    >
                      <Icon
                        className="size-5 text-muted-foreground"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <button
          type="button"
          className="mobile-nav__fab"
          style={{ left: activeCenter }}
          onClick={() => onViewChange(activeItem.id)}
          aria-current="page"
          aria-label={activeItem.label}
        >
          <ActiveIcon
            className="size-5 text-primary-foreground"
            strokeWidth={2}
            aria-hidden
          />
        </button>

        <span className="mobile-nav__dot" style={{ left: activeCenter }} aria-hidden />
      </div>
    </nav>
  )
}
