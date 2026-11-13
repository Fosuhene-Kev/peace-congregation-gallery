import {
  type GalleryPhoto,
  getPhotosForEvent,
} from "@/lib/gallery-data"

export const MEDIA_SPRING = {
  type: "spring" as const,
  stiffness: 60,
  damping: 15,
}

export const HERO_IMAGE = "/church-hero.png"

/** Three Men's Week photos for the homepage "See What God Is Doing" preview stack */
export const GOD_AMONG_US_PHOTO_IDS = [
  "men-sunday-01",
  "men-sunday-04",
  "men-sunday-07",
] as const

export const LATEST_SERMONS = [
  {
    id: "sermon-1",
    title: "Men's Week Sunday — Red Sunday Message",
    preacher: "Peace Congregation Pulpit",
    date: "June 15, 2026",
    thumbnail:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1280&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "sermon-2",
    title: "Standing Against Galamsey in Faith",
    preacher: "Session Minister",
    date: "June 8, 2026",
    thumbnail:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1280&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "sermon-3",
    title: "Remembering a Faithful Servant",
    preacher: "Tribute Service",
    date: "June 1, 2026",
    thumbnail:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1280&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    id: "sermon-4",
    title: "If God Be For Us — Romans 8",
    preacher: "Sunday Worship",
    date: "May 25, 2026",
    thumbnail:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1280&q=80",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
] as const

export const SERVICE_SCHEDULE = [
  {
    label: "Sunday Worship",
    times: ["First Service — 7:00 AM", "Second Service — 9:30 AM"],
  },
  {
    label: "Midweek",
    times: ["Wednesday Bible Study — 6:30 PM"],
  },
  {
    label: "Men's & Women's Fellowship",
    times: ["Men's Fellowship — Saturday, 6:00 AM", "Women's Fellowship — Thursday, 5:00 PM"],
  },
] as const

export const SOCIAL_LINKS = [
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com",
    icon: "youtube" as const,
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com",
    icon: "facebook" as const,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com",
    icon: "instagram" as const,
  },
] as const

export const CHURCH_MAP_EMBED =
  "https://maps.google.com/maps?q=Bronkong-Afrancho,+Ashanti+Region,+Ghana&z=14&output=embed"

export const LAST_EVENT_ID = "2026-mens-week-sunday"

export function getGodAmongUsPreviewPhotos(): GalleryPhoto[] {
  const eventPhotos = getPhotosForEvent(LAST_EVENT_ID)
  return GOD_AMONG_US_PHOTO_IDS.map((photoId) =>
    eventPhotos.find((photo) => photo.photoId === photoId),
  ).filter((photo): photo is GalleryPhoto => photo != null)
}
