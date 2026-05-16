"use client"

import Image from "next/image"
import {
  Bell,
  CalendarDays,
  Home,
  Mic2,
} from "lucide-react"
import type { AppView } from "@/lib/navigation"
import { NAV_ITEMS } from "@/lib/navigation"
import { cn } from "@/lib/utils"

const NAV_ICONS = {
  home: Home,
  events: CalendarDays,
  sermons: Mic2,
  notifications: Bell,
} as const

interface AppShellProps {
  activeView: AppView
  onViewChange: (view: AppView) => void
  children: React.ReactNode
}

export function AppShell({ activeView, onViewChange, children }: AppShellProps) {
  return (
    <div className="app-viewport flex w-full overflow-hidden bg-background">
      <DesktopSidebar activeView={activeView} onViewChange={onViewChange} />
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col md:pl-[var(--app-sidebar-width)]">
        <MobileTopBar />
        <main className="app-main-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-4 pt-4 pb-[calc(var(--app-mobile-nav-total)+1rem+env(safe-area-inset-bottom,0px))] sm:px-6 md:pb-6 md:pt-6">
          {children}
        </main>
        <MobileBottomNav activeView={activeView} onViewChange={onViewChange} />
      </div>
    </div>
  )
}

function ChurchLogo({
  size = "md",
  className,
}: {
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const dims = { sm: 36, md: 44, lg: 52 }[size]
  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-primary/5 ring-2 ring-[oklch(0.75_0.15_85)]/50",
        className
      )}
    >
      <Image
        src="/church-logo.png"
        alt="PCG Peace Congregation logo"
        width={dims}
        height={dims}
        className="object-contain p-0.5"
        style={{ width: dims, height: dims }}
      />
    </div>
  )
}

function DesktopSidebar({
  activeView,
  onViewChange,
}: {
  activeView: AppView
  onViewChange: (view: AppView) => void
}) {
  return (
    <aside className="app-sidebar fixed inset-y-0 left-0 z-40 hidden w-[var(--app-sidebar-width)] flex-col border-r border-border/60 bg-card md:flex">
      <div className="px-6 pb-2 pt-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <ChurchLogo size="lg" />
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Media App
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2 px-4 py-6" aria-label="Main">
        {NAV_ITEMS.map((item) => {
          const Icon = NAV_ICONS[item.id]
          const isActive = activeView === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onViewChange(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-left text-sm font-medium transition-all duration-300 ease-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                  isActive
                    ? "bg-primary-foreground/15"
                    : "bg-muted/80 group-hover:bg-muted"
                )}
              >
                <Icon
                  className={cn("h-5 w-5", isActive && "stroke-[2.25]")}
                  aria-hidden
                />
              </span>
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <span
                  className="h-2 w-2 shrink-0 rounded-full bg-[oklch(0.75_0.15_85)] shadow-sm"
                  aria-hidden
                />
              )}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-border/60 px-6 py-5">
        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          Photo gallery &amp; media archive
        </p>
      </div>
    </aside>
  )
}

function MobileTopBar() {
  return (
    <header className="z-30 flex shrink-0 items-center justify-between border-b border-border/70 bg-card/95 px-5 py-3 backdrop-blur-md md:hidden">
      <ChurchLogo size="sm" />
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Media App
      </p>
    </header>
  )
}

function MobileBottomNav({
  activeView,
  onViewChange,
}: {
  activeView: AppView
  onViewChange: (view: AppView) => void
}) {
  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.id === activeView)
  )

  return (
    <nav
      className="mobile-curved-nav md:hidden"
      style={{ "--nav-active-index": activeIndex } as React.CSSProperties}
      aria-label="Main"
    >
      <div className="mobile-curved-nav__shell">
        <div className="mobile-curved-nav__notch" aria-hidden />
        <ul className="mobile-curved-nav__list">
          {NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.id]
            const isActive = activeView === item.id
            return (
              <li key={item.id} className="mobile-curved-nav__item">
                <button
                  type="button"
                  onClick={() => onViewChange(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  aria-label={item.label}
                  className={cn(
                    "mobile-curved-nav__button",
                    isActive && "mobile-curved-nav__button--active"
                  )}
                >
                  {isActive ? (
                    <>
                      <span className="mobile-curved-nav__fab">
                        <Icon
                          className="h-[22px] w-[22px] text-primary-foreground"
                          strokeWidth={2.25}
                          aria-hidden
                        />
                      </span>
                      <span className="mobile-curved-nav__dot" aria-hidden />
                    </>
                  ) : (
                    <Icon
                      className="h-[22px] w-[22px] text-muted-foreground/80"
                      strokeWidth={1.75}
                      aria-hidden
                    />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
