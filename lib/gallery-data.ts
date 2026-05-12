export interface GalleryEvent {
  eventId: string
  eventName: string
  eventDate: string
  description: string
}

export interface GalleryPhoto {
  photoId: string
  eventId: string
  driveId: string
  caption: string
}

export interface ChurchGalleryData {
  events: GalleryEvent[]
  photos: GalleryPhoto[]
}

/**
 * Church Gallery Data Structure
 * 
 * To add new events and photos:
 * 1. Add a new event object to the "events" array
 * 2. Add photo objects to the "photos" array with matching eventId
 * 3. Get the driveId from the Google Drive share link:
 *    https://drive.google.com/file/d/[DRIVE_ID]/view
 * 4. Each file must be shared so "Anyone with the link" can view, or thumbnails will not load.
 */
export const churchGalleryData: ChurchGalleryData = {
  events: [
    {
      eventId: "2026-mothers-day",
      eventName: "Mother's Day Grand Finale",
      eventDate: "2026-05-10",
      description: "Celebrating the grace, beauty, and impact of our mothers at Peace Congregation. A day filled with joy, appreciation, and thanksgiving for the pillars of our homes."
    }
  ],
  photos: [
    // Mother's Day Photos (2026 — Google Drive)
    { photoId: "m1", eventId: "2026-mothers-day", driveId: "14Q1lWHvmfrcP-fjZCaDxoUwHVh5A1LhS", caption: "Mother's Day Celebration" },
    { photoId: "m2", eventId: "2026-mothers-day", driveId: "1Z0OZiAhm3wpfjg5Aaq8Hr-GSFPecZNq2", caption: "Honoring Our Mothers" },
    { photoId: "m3", eventId: "2026-mothers-day", driveId: "1cj3ub5cNEAASidd_wqqk8UXMeamsD7Bp", caption: "Congregation in Worship" },
    { photoId: "m4", eventId: "2026-mothers-day", driveId: "1-FIk9PBvIlFe0LCVBFonMUT_YWK_DXDU", caption: "Special Recognition" },
    { photoId: "m5", eventId: "2026-mothers-day", driveId: "1-z-AvTjGDXZP47ond7UdSxnAqH7pXIMx", caption: "Choir Ministration" },
    { photoId: "m6", eventId: "2026-mothers-day", driveId: "10F5l6IQkgAmK-NiXW0VFZwFStFmj15Jm", caption: "A Moment of Thanksgiving" },
    { photoId: "m7", eventId: "2026-mothers-day", driveId: "15Amh8ov5uPX-8aeyM-LHyLwX_gOC6rg4", caption: "The Mothers of Peace Congregation" },
    { photoId: "m8", eventId: "2026-mothers-day", driveId: "17tp_zyG7bIzb98C1W_ynM7oAdwPtj6-w", caption: "Family and Friends" },
    { photoId: "m9", eventId: "2026-mothers-day", driveId: "1Pm5qq16OjTcIaM_K-ds3E4Ow7kXuiCUt", caption: "Joy in the House" },
    { photoId: "m10", eventId: "2026-mothers-day", driveId: "1TD1Wb87kr0p7DwIOMlgsXFSuzxmhCm76", caption: "Celebrating Her Legacy" },
    { photoId: "m11", eventId: "2026-mothers-day", driveId: "1aR4A6NBNP8J0doVfFTFsykIgseCSTu95", caption: "Words of Appreciation" },
    { photoId: "m12", eventId: "2026-mothers-day", driveId: "1bjAA53dgKeipcYT4D9E-J4r2uNzWKxxz", caption: "Fellowship After Service" },
    { photoId: "m13", eventId: "2026-mothers-day", driveId: "1jcSd88IJLSop57M3HPn2gdNAKyCoPP_B", caption: "Hearts Full of Gratitude" },
    { photoId: "m14", eventId: "2026-mothers-day", driveId: "1m65RenU4aiqcmrUFXPJH5yHO0RjtSia5", caption: "Service Highlights" },
    { photoId: "m15", eventId: "2026-mothers-day", driveId: "1mSD7cbcpmcOgfoLwQh-RVScuKvpf4NtF", caption: "United in Praise" },
    { photoId: "m16", eventId: "2026-mothers-day", driveId: "1oS4_kgJ1Yjas5KRPIg6ulcnDxibb3inF", caption: "Mother's Day Celebration" },
    { photoId: "m17", eventId: "2026-mothers-day", driveId: "1tEvXdIcube6mlm9Hw6_Tais2_VtaKgQZ", caption: "Honoring Our Mothers" },
    { photoId: "m18", eventId: "2026-mothers-day", driveId: "1yuXioaRdvJCAjsBhL2cPe1n6IAXAfFWs", caption: "Congregation in Worship" },
    { photoId: "m19", eventId: "2026-mothers-day", driveId: "1-dTjFLhyWzT5s6wX1q6Bz0WkDBH5_CxD", caption: "Special Recognition" },
    { photoId: "m20", eventId: "2026-mothers-day", driveId: "1-zORlCUVjnG7KYsczmT6d4KWfOPVnarx", caption: "Choir Ministration" },
    { photoId: "m21", eventId: "2026-mothers-day", driveId: "11kWs6-8NJrIK03PiTh3iUfP7Wtamc279", caption: "A Moment of Thanksgiving" },
    { photoId: "m22", eventId: "2026-mothers-day", driveId: "13REFKsFdd1y5Dp6iNeI99A__5SQeoKGw", caption: "The Mothers of Peace Congregation" },
    { photoId: "m23", eventId: "2026-mothers-day", driveId: "14lyblbetJ-lXbGcE-VrFIHEsMRNDnn3s", caption: "Family and Friends" },
    { photoId: "m24", eventId: "2026-mothers-day", driveId: "16Fy_87r3oFhIDJHnuYvRpMX8kortNyaY", caption: "Joy in the House" },
    { photoId: "m25", eventId: "2026-mothers-day", driveId: "16_c8wPgAXmqKUqIcFOPwXU0A_V8X7k6L", caption: "Celebrating Her Legacy" },
    { photoId: "m26", eventId: "2026-mothers-day", driveId: "175zqhW9VYN8jFuEEZr52L3RDuxnTiufp", caption: "Words of Appreciation" },
    { photoId: "m27", eventId: "2026-mothers-day", driveId: "17gXbK4KVdQCT0cWDZdNy_oNQIyVhXM-P", caption: "Fellowship After Service" },
    { photoId: "m28", eventId: "2026-mothers-day", driveId: "19-oxP7tefuve-wjnr-lzEop4Rj_E_Ye2", caption: "Hearts Full of Gratitude" },
    { photoId: "m29", eventId: "2026-mothers-day", driveId: "19BBaAvATY7ujtZVMn7r4Okv2MepFVKRb", caption: "Service Highlights" },
    { photoId: "m30", eventId: "2026-mothers-day", driveId: "1ANckdcpPxMnBdI75iEV_rdQ95a_t1gwl", caption: "United in Praise" },
    { photoId: "m31", eventId: "2026-mothers-day", driveId: "1AYZ4KWYv4I9theN4yZnOli9dGj4BtQvD", caption: "Mother's Day Celebration" },
    { photoId: "m32", eventId: "2026-mothers-day", driveId: "1BjC29UHXLuPnMgeHanFQhmrzvlhWYRun", caption: "Honoring Our Mothers" },
    { photoId: "m33", eventId: "2026-mothers-day", driveId: "1CQ4e06ue0l3v3TMjYPvDoOF5M9GohU2-", caption: "Congregation in Worship" },
    { photoId: "m34", eventId: "2026-mothers-day", driveId: "1CSxble95N-JSjHdm1_WnOTb-GF_nPyX8", caption: "Special Recognition" },
    { photoId: "m35", eventId: "2026-mothers-day", driveId: "1Cn-flj6D8yYDjiEb6Nv0biZtcuNqdA8h", caption: "Choir Ministration" },
    { photoId: "m36", eventId: "2026-mothers-day", driveId: "1DmfpCP02ThWmRVkugGlu8hv0tIFewbjQ", caption: "A Moment of Thanksgiving" },
    { photoId: "m37", eventId: "2026-mothers-day", driveId: "1F5vm4s0Tr3dqf_NrvazU3S_KN3nVZVUR", caption: "The Mothers of Peace Congregation" },
    { photoId: "m38", eventId: "2026-mothers-day", driveId: "1FgsopTIKf6BF0VDMCFsJWdTLFteuibZD", caption: "Family and Friends" },
    { photoId: "m39", eventId: "2026-mothers-day", driveId: "1GTf6I09YPIxDGRB_wtTP2HeL6Gu2NVX2", caption: "Joy in the House" },
    { photoId: "m40", eventId: "2026-mothers-day", driveId: "1HUi3238nLEwmQkfdtKmw3PLObyMlA-CO", caption: "Celebrating Her Legacy" },
    { photoId: "m41", eventId: "2026-mothers-day", driveId: "1IFP9FW_8W-GZilU9sLOlY5VLaw950MaC", caption: "Words of Appreciation" },
    { photoId: "m42", eventId: "2026-mothers-day", driveId: "1IqRZobXs_i7CToFBtfhxT6VEVprN1vco", caption: "Fellowship After Service" },
    { photoId: "m43", eventId: "2026-mothers-day", driveId: "1JFnyXVTyNqQGCxWAXPJvs1KT-9YiPbx9", caption: "Hearts Full of Gratitude" },
    { photoId: "m44", eventId: "2026-mothers-day", driveId: "1JZr914EYVD7umxqpOtq5S60JzaY5EkNj", caption: "Service Highlights" },
    { photoId: "m45", eventId: "2026-mothers-day", driveId: "1Js8lmJ2cCzdVqPsR6ihh3kTRFwUEuVC9", caption: "United in Praise" },
    { photoId: "m46", eventId: "2026-mothers-day", driveId: "1JySRWftPDKUBUwUujccZkbOGDljp_imp", caption: "Mother's Day Celebration" },
    { photoId: "m47", eventId: "2026-mothers-day", driveId: "1KxhRsqsky8c3zk5fnphNU27ewQLZjJme", caption: "Honoring Our Mothers" },
    { photoId: "m48", eventId: "2026-mothers-day", driveId: "1N6pkRTogZ-Ad8IhpXXohXWOem3M8pD9F", caption: "Congregation in Worship" },
    { photoId: "m49", eventId: "2026-mothers-day", driveId: "1O0nOBcoAv13CfLypY7WRpmPJaYCGh_6F", caption: "Special Recognition" },
    { photoId: "m50", eventId: "2026-mothers-day", driveId: "1O9_yfE5CbAU5QHUmF39jxni4sPr1DBzC", caption: "Choir Ministration" },
    { photoId: "m51", eventId: "2026-mothers-day", driveId: "1QbG1Uyx5KgK7T2NTs-3j7DcOf73261wo", caption: "A Moment of Thanksgiving" },
    { photoId: "m52", eventId: "2026-mothers-day", driveId: "1RpbciW_GpxNba60_HDEi2NM9x34Lxmo4", caption: "The Mothers of Peace Congregation" },
    { photoId: "m53", eventId: "2026-mothers-day", driveId: "1S-9Y6slqV6ToDGQ_r3u1fUsxu6yEEy5Q", caption: "Family and Friends" },
    { photoId: "m54", eventId: "2026-mothers-day", driveId: "1VUh3ICQBVTXw-iBPTve5VcRfzaIjBuAN", caption: "Joy in the House" },
    { photoId: "m55", eventId: "2026-mothers-day", driveId: "1XSvmUsgXK6ZLDfrWQBpg3PYZf2H48n91", caption: "Celebrating Her Legacy" },
    { photoId: "m56", eventId: "2026-mothers-day", driveId: "1X_DW8D_C7WpzQmzSA4oD9DgXvfWWZ8dW", caption: "Words of Appreciation" },
    { photoId: "m57", eventId: "2026-mothers-day", driveId: "1Xt95urnEn0GnXqICvRWairPg2RajpcNk", caption: "Fellowship After Service" },
    { photoId: "m58", eventId: "2026-mothers-day", driveId: "1YJqLIZHkd0jMuHsnEjnGlLMbfRZWHgoZ", caption: "Hearts Full of Gratitude" },
    { photoId: "m59", eventId: "2026-mothers-day", driveId: "1Z2Lp7Awg9YsyjflgJtFVowtTKn6kqxJu", caption: "Service Highlights" },
    { photoId: "m60", eventId: "2026-mothers-day", driveId: "1ZdwKGX8QIIbtbawFzKUWVNuC_hSyl2-a", caption: "United in Praise" },
    { photoId: "m61", eventId: "2026-mothers-day", driveId: "1Zuvc9Ymgy0JXABXNjTFGWSEOA-bNNqbj", caption: "Mother's Day Celebration" },
    { photoId: "m62", eventId: "2026-mothers-day", driveId: "1bwRnTV0PbJV6mPzpEGjt9PWF2xP2_TuR", caption: "Honoring Our Mothers" },
    { photoId: "m63", eventId: "2026-mothers-day", driveId: "1dyNIGkpPEpxaY-Z2Glxp1c9wjzqh2pF6", caption: "Congregation in Worship" },
    { photoId: "m64", eventId: "2026-mothers-day", driveId: "1eDUd778S-RHRiqqNxNGyixY7BShXFZb8", caption: "Special Recognition" },
    { photoId: "m65", eventId: "2026-mothers-day", driveId: "1eiyhRVKdH6yn70HssSdI8QDeCnw6taNa", caption: "Choir Ministration" },
    { photoId: "m66", eventId: "2026-mothers-day", driveId: "1gBb4ybuFHXBBScEjfqQs0udw_VaX4Iob", caption: "A Moment of Thanksgiving" },
    { photoId: "m67", eventId: "2026-mothers-day", driveId: "1h8eWS9_d2142SxcRqb9dLHF_-lKp9WQ_", caption: "The Mothers of Peace Congregation" },
    { photoId: "m68", eventId: "2026-mothers-day", driveId: "1iHQiYekXnBQpWVaNrDpK4DQyBLTaSJ15", caption: "Family and Friends" },
    { photoId: "m69", eventId: "2026-mothers-day", driveId: "1jvjU4UAd2l__-_Bq5b8EnZ5Wzagq9sRs", caption: "Joy in the House" },
    { photoId: "m70", eventId: "2026-mothers-day", driveId: "1k3oONKAncAmN1_wY0adWmcXexHhuTWMM", caption: "Celebrating Her Legacy" },
    { photoId: "m71", eventId: "2026-mothers-day", driveId: "1kr0qEZsWjCrKGojRdY-r8MVAEcpJx-AE", caption: "Words of Appreciation" },
    { photoId: "m72", eventId: "2026-mothers-day", driveId: "1lNeHyYXV5Hd7gqQL9TtQRQ4-Z6uwLu_D", caption: "Fellowship After Service" },
    { photoId: "m73", eventId: "2026-mothers-day", driveId: "1nGnDYOc9EV2g-rMfv7k0sJ92wQqEa1p3", caption: "Hearts Full of Gratitude" },
    { photoId: "m74", eventId: "2026-mothers-day", driveId: "1oIqr5IHKPcXZh8C7gDfLcIoi2whPDaDP", caption: "Service Highlights" },
    { photoId: "m75", eventId: "2026-mothers-day", driveId: "1pmrRXMwm6BtnWPr8sD6qo1GlcS5BgPot", caption: "United in Praise" },
    { photoId: "m76", eventId: "2026-mothers-day", driveId: "1qO5T_i99UskMC7QsQ5g9rC_NZvyYy3nU", caption: "Mother's Day Celebration" },
    { photoId: "m77", eventId: "2026-mothers-day", driveId: "1sB2zAs-g1ax8kudGMLdWNP9KgnK9IU9r", caption: "Honoring Our Mothers" },
    { photoId: "m78", eventId: "2026-mothers-day", driveId: "1v-dB3HFCi7TS5peOEQlZxyppSv1VPGoq", caption: "Congregation in Worship" },
    { photoId: "m79", eventId: "2026-mothers-day", driveId: "1y9ccVU8mpVWvLTqOKzDM9eOH_veW_jpR", caption: "Special Recognition" },
    { photoId: "m80", eventId: "2026-mothers-day", driveId: "1yvRI5n3HmbFQdvW39Hnz68FoukB8DoNG", caption: "Choir Ministration" },
    { photoId: "m81", eventId: "2026-mothers-day", driveId: "1z3TruNRuToDTyRCvKdBnrfvHvpDGcgx2", caption: "A Moment of Thanksgiving" },
    { photoId: "m82", eventId: "2026-mothers-day", driveId: "1zfQ1Fm7VlMhlpkh4iWkCn0NeJbffCMvy", caption: "The Mothers of Peace Congregation" }
  ]
}

/**
 * Thumbnail / preview URLs for <img src>.
 * Drive file IDs do not reliably work with lh3.googleusercontent.com; the official
 * thumbnail endpoint works for files shared as "Anyone with the link".
 */
export function getThumbnailUrl(driveId: string): string {
  const id = encodeURIComponent(driveId)
  // Keep thumbnails small: faster loads + less Drive throttling.
  return `https://drive.google.com/thumbnail?id=${id}&sz=w300`
}

/** Larger preview for the lightbox (still served as an image, no API key). */
export function getFullResolutionUrl(driveId: string): string {
  const id = encodeURIComponent(driveId)
  return `https://drive.google.com/thumbnail?id=${id}&sz=w1600`
}

/** Fallback when thumbnail fails (e.g. certain sharing settings). */
export function getDriveViewImageUrl(driveId: string): string {
  const id = encodeURIComponent(driveId)
  return `https://drive.google.com/uc?export=view&id=${id}`
}

/**
 * Helper function to get direct download URL
 */
export function getDownloadUrl(driveId: string): string {
  return `https://drive.google.com/uc?export=download&id=${driveId}`
}
