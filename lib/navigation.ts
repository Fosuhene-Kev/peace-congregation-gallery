export const SITE_TITLE = "PCG Peace Congregation Bronkong-Afrancho"

export type AppView = "home" | "events" | "sermons" | "notifications"

export const APP_VIEWS: AppView[] = ["home", "events", "sermons", "notifications"]

export function isAppView(value: string | null): value is AppView {
  return value !== null && APP_VIEWS.includes(value as AppView)
}

export const NAV_ITEMS: {
  id: AppView
  label: string
  shortLabel: string
}[] = [
  { id: "home", label: "Home", shortLabel: "Home" },
  { id: "events", label: "Events", shortLabel: "Events" },
  { id: "sermons", label: "Sermons", shortLabel: "Sermons" },
  { id: "notifications", label: "Notifications", shortLabel: "Alerts" },
]

export const NOTIFICATION_MESSAGES = [
  {
    id: "ascension-upload",
    title: "Ascension Day photos coming soon",
    body: "The next picture upload will be after the Ascension Day service. Check back here for the announcement.",
    time: "Upcoming",
  },
  {
    id: "mothers-day-live",
    title: "Mother's Day gallery is live",
    body: "Browse and download photos from the Mother's Day Grand Finale celebration.",
    time: "Now live",
  },
  {
    id: "sermons-soon",
    title: "Sermons section in progress",
    body: "Audio and video sermons will be available on the Sermons page soon.",
    time: "Coming soon",
  },
] as const
