"use client"

import Image from "next/image"
import {
  Bell,
  CalendarDays,
  Home,
  Mic2,
} from "lucide-react"
import type { AppView } from "@/lib/navigation"
import { NAV_ITEMS, SITE_TITLE } from "@/lib/navigation"
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
        <main className="app-main-scroll min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-4 pt-4 pb-[calc(var(--app-mobile-nav-height)+1rem+env(safe-area-inset-bottom,0px))] sm:px-6 md:pb-6 md:pt-6">
          {children}
        </main>
        <MobileBottomNav activeView={activeView} onViewChange={onViewChange} />
      </div>
    </div>
  )
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn("flex items-center gap-3", compact && "gap-2")}>
      <div className="relative shrink-0 overflow-hidden rounded-full bg-primary/10 ring-2 ring-[oklch(0.75_0.15_85)]/40">
        <Image
          src="/church-logo.png"
          alt="PCG Peace Congregation logo"
          width={compact ? 32 : 40}
          height={compact ? 32 : 40}
          className={cn("object-contain", compact ? "h-8 w-8 p-0.5" : "h-10 w-10 p-1")}
        />
      </div>
      <div className="min-w-0 text-left">
        <p
          className={cn(
            "font-bold leading-snug tracking-tight text-foreground",
            compact
              ? "line-clamp-2 text-[11px] sm:text-xs"
              : "text-sm leading-snug"
          )}
        >
          {SITE_TITLE}
        </p>
      </div>
    </div>
  )
}

function NavButton({
  view,
  activeView,
  onViewChange,
  layout,
}: {
  view: (typeof NAV_ITEMS)[number]
  activeView: AppView
  onViewChange: (view: AppView) => void
  layout: "sidebar" | "bottom"
}) {
  const Icon = NAV_ICONS[view.id]
  const isActive = activeView === view.id

  return (
    <button
      type="button"
      onClick={() => onViewChange(view.id)}
      className={cn(
        "flex items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        layout === "sidebar"
          ? cn(
              "w-full gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )
          : cn(
              "min-w-0 flex-1 flex-col gap-1 rounded-lg px-1 py-2 text-[10px] font-medium sm:text-xs",
              isActive ? "text-primary" : "text-muted-foreground"
            )
      )}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon
        className={cn(
          "shrink-0",
          layout === "sidebar" ? "h-5 w-5" : "h-5 w-5 mx-auto",
          layout === "bottom" && isActive && "stroke-[2.5]"
        )}
        aria-hidden
      />
      <span className={layout === "bottom" ? "truncate" : ""}>
        {layout === "bottom" ? view.shortLabel : view.label}
      </span>
    </button>
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
    <aside className="app-sidebar fixed inset-y-0 left-0 z-40 hidden w-[var(--app-sidebar-width)] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
      <div className="border-b border-sidebar-border px-5 py-6">
        <BrandMark />
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4" aria-label="Main">
        {NAV_ITEMS.map((item) => (
          <NavButton
            key={item.id}
            view={item}
            activeView={activeView}
            onViewChange={onViewChange}
            layout="sidebar"
          />
        ))}
      </nav>
      <div className="border-t border-sidebar-border px-5 py-4">
        <p className="text-xs text-muted-foreground leading-relaxed">
          Photo gallery & media archive
        </p>
      </div>
    </aside>
  )
}

function MobileTopBar() {
  return (
    <header className="z-30 flex shrink-0 items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md md:hidden">
      <BrandMark compact />
      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
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
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-md md:hidden"
      aria-label="Main"
    >
      <div className="flex items-stretch justify-around gap-1">
        {NAV_ITEMS.map((item) => (
          <NavButton
            key={item.id}
            view={item}
            activeView={activeView}
            onViewChange={onViewChange}
            layout="bottom"
          />
        ))}
      </div>
    </nav>
  )
}
