"use client"

import { Bell } from "lucide-react"
import { NOTIFICATION_MESSAGES } from "@/lib/navigation"
import { cn } from "@/lib/utils"

export function NotificationsPanel() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Bell className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
          <p className="text-sm text-muted-foreground">
            Updates from Peace Congregation media
          </p>
        </div>
      </div>

      <ul className="flex flex-col gap-3">
        {NOTIFICATION_MESSAGES.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              "rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md",
              index === 0 && "border-primary/30 ring-1 ring-primary/10"
            )}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="text-xs font-medium uppercase tracking-wide text-primary">
                {item.time}
              </span>
            </div>
            <h3 className="font-semibold text-foreground">{item.title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {item.body}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
