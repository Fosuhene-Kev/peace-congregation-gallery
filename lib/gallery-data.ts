export interface GalleryEvent {
  eventId: string
  eventName: string
  eventDate: string
  description: string
  /** Google Drive file ID for the carousel cover (same sharing rules as gallery photos) */
  coverDriveId?: string | null
  /** Gallery presentation — defaults to masonry grid when omitted */
  galleryLayout?: "grid" | "stacked"
}

export interface GalleryPhoto {
  photoId: string
  eventId: string
  driveId: string
  /** Short heading shown on stacked cards and lightbox */
  title?: string
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
 * 1. Add a new event object to the "events" array (optional coverDriveId for carousel cover)
 * 2. Add photo objects to the "photos" array with matching eventId
 * 3. Get the driveId from the Google Drive share link:
 *    https://drive.google.com/file/d/[DRIVE_ID]/view
 * 4. Each file must be shared so "Anyone with the link" can view, or thumbnails will not load.
 */
export const churchGalleryData: ChurchGalleryData = {
  events: [
    {
      eventId: "2026-mens-week-sunday",
      eventName: "Men's Week Sunday Service",
      eventDate: "2026-06-15",
      description:
        "The culminating Sunday worship of Men's Week at Peace Congregation — observed as Red Sunday in prayerful solidarity against illegal mining (galamsey). The service also honored the faithful life and enduring legacy of the late retired Catechist George Asare.",
      coverDriveId: null,
      galleryLayout: "stacked",
    },
    {
      eventId: "2026-mothers-day",
      eventName: "Mother's Day Grand Finale",
      eventDate: "2026-05-10",
      description:
        "Celebrating the grace, beauty, and impact of our mothers at Peace Congregation. A day filled with joy, appreciation, and thanksgiving for the pillars of our homes.",
      coverDriveId: "1rA0YdEWABCQELllEpwj7InemRPQYVlrM",
    },
  ],
  photos: [
    // Men's Week Sunday — Red Sunday & tribute to Catechist George Asare (2026)
    {
      photoId: "men-sunday-01",
      eventId: "2026-mens-week-sunday",
      driveId: "1A6G3lHaeh-uRrkBU2q1IzTXFF28KCO0",
      title: "Men's Week Sunday Worship",
      caption:
        "The congregation gathers for the culminating Sunday service of Men's Week — a joyful opening of worship, fellowship, and thanksgiving at Peace Congregation.",
    },
    {
      photoId: "men-sunday-02",
      eventId: "2026-mens-week-sunday",
      driveId: "19TAXTK8J4f-mU4A51Mmz_tAG2DPzcsWm",
      title: "Red Sunday — Standing Against Galamsey",
      caption:
        "Observed as Red Sunday, members wore red in prayerful solidarity against illegal mining (galamsey) and for the faithful stewardship of Ghana's land and waters.",
    },
    {
      photoId: "men-sunday-03",
      eventId: "2026-mens-week-sunday",
      driveId: "1u5g9nAzNNtYMB3GnD0Ku-cod42gmTqH8",
      title: "In Memory of Catechist George Asare",
      caption:
        "A reverent moment honoring the late retired Catechist George Asare — remembered for his faithful teaching, gentle counsel, and years of devoted service.",
    },
    {
      photoId: "men-sunday-04",
      eventId: "2026-mens-week-sunday",
      driveId: "1P-SR6yDjP5bkolDiNNi1-iqCP3wVf05d",
      title: "Men's Fellowship in Praise",
      caption:
        "Brothers of the congregation united in vibrant worship during Men's Week, reflecting the strength, humility, and devotion of godly manhood in the church.",
    },
    {
      photoId: "men-sunday-05",
      eventId: "2026-mens-week-sunday",
      driveId: "13VfyNWHaU9z8zeOI0lbYxea3H1gnXer6",
      title: "Prayer Against Illegal Mining",
      caption:
        "The church lifted fervent intercession against galamsey — praying that Ghana's communities, rivers, and farmlands would be protected from destruction and greed.",
    },
    {
      photoId: "men-sunday-06",
      eventId: "2026-mens-week-sunday",
      driveId: "1wtYmvAF7lyJdjRoOTzNBhQs_rE0Vrdog",
      title: "Remembering a Faithful Catechist",
      caption:
        "Congregants reflected on the enduring legacy of Catechist George Asare, whose patient instruction and shepherd's heart shaped generations at Peace Congregation.",
    },
    {
      photoId: "men-sunday-07",
      eventId: "2026-mens-week-sunday",
      driveId: "1kFZ3PBAZlybquUh5k3mC0C47UbhWUILn",
      title: "Celebrating Men's Week",
      caption:
        "Men's Week reached its joyful climax as the church celebrated godly leadership, brotherhood, and the shared calling of men to serve Christ and community.",
    },
    {
      photoId: "men-sunday-08",
      eventId: "2026-mens-week-sunday",
      driveId: "1WVIlNwIMmpfhkU9KpUZooxTrkzU6pOxt",
      title: "Red Sunday Congregational Witness",
      caption:
        "A sea of red throughout the sanctuary marked the congregation's collective stance — a visible witness against galamsey and for the care of creation.",
    },
    {
      photoId: "men-sunday-09",
      eventId: "2026-mens-week-sunday",
      driveId: "1COAxZU2kv8ZaM3QA8Y-nO7gp2zqmDdn_",
      title: "Tribute to Catechist George Asare",
      caption:
        "Leaders and members paused to give thanks for the life of the late retired Catechist George Asare, whose faithfulness remains a light in this congregation.",
    },
    {
      photoId: "men-sunday-10",
      eventId: "2026-mens-week-sunday",
      driveId: "1Td2yi0CukDy_qF-BSar3E6h4zuzQZXsL",
      title: "Men Leading in Worship",
      caption:
        "Men of Peace Congregation took active roles in scripture, prayer, and praise — embodying the spirit of Men's Week through willing service at the altar.",
    },
    {
      photoId: "men-sunday-11",
      eventId: "2026-mens-week-sunday",
      driveId: "1zYbDufobMHup6G_k418C4d965FOxKLfl",
      title: "Intercession for the Environment",
      caption:
        "Red Sunday brought a united cry to heaven — that illegal mining would cease, that justice would prevail, and that Ghana's natural heritage would be preserved.",
    },
    {
      photoId: "men-sunday-12",
      eventId: "2026-mens-week-sunday",
      driveId: "1dUPniPcPoQQIy7Loy86K3ZsejTD1k6u0",
      title: "A Life Well Lived in Service",
      caption:
        "Remembrance for Catechist George Asare filled the service — a servant who taught the Word with clarity, loved the flock with patience, and finished his course with grace.",
    },
    {
      photoId: "men-sunday-13",
      eventId: "2026-mens-week-sunday",
      driveId: "1iWi1Plz_nX21qicw-A7rS_wTxg8ZhRRy",
      title: "Men's Week Fellowship",
      caption:
        "Warm fellowship among the men of the church marked this special Sunday — bonds of faith strengthened through shared worship and mutual encouragement.",
    },
    {
      photoId: "men-sunday-14",
      eventId: "2026-mens-week-sunday",
      driveId: "18T8QyqVAA27naTekS3n9nlFY_XOWW241",
      title: "Red Sunday — A Church That Cares",
      caption:
        "Peace Congregation stood together on Red Sunday, declaring that the fight against galamsey is also a fight for the wellbeing of every community and child.",
    },
    {
      photoId: "men-sunday-15",
      eventId: "2026-mens-week-sunday",
      driveId: "12I7yAdPy-0LM2V1beE7y6Wj11jh-qavx",
      title: "Honoring Retired Catechist George Asare",
      caption:
        "The congregation held the memory of Catechist George Asare with deep gratitude — his voice in Sunday school and catechism classes still echoes in many hearts.",
    },
    {
      photoId: "men-sunday-16",
      eventId: "2026-mens-week-sunday",
      driveId: "12C4dAEuCxVUB7RIqFShH21Zw2K1KiQT1",
      title: "Men's Ministration in Song",
      caption:
        "Men led the congregation in song and praise, offering their gifts joyfully as Men's Week drew toward its closing moments of worship.",
    },
    {
      photoId: "men-sunday-17",
      eventId: "2026-mens-week-sunday",
      driveId: "1aHDBe7bgFGi57Xl9V5Y7Y0zrs4l3WuSQ",
      title: "Solidarity Against Galamsey",
      caption:
        "Red Sunday reminded every worshipper that the church must speak and pray with one voice against practices that destroy land, water, and future generations.",
    },
    {
      photoId: "men-sunday-18",
      eventId: "2026-mens-week-sunday",
      driveId: "1VnkutFjEYOYMwEsmjEZxzb-q_ztt6VQt",
      title: "In Loving Memory",
      caption:
        "A final act of remembrance for the late Catechist George Asare — faithful unto death, and held forever in the affection of Peace Congregation, Bronkong-Afrancho.",
    },
    {
      photoId: "men-sunday-19",
      eventId: "2026-mens-week-sunday",
      driveId: "1XsEnPNsV3DiTn9dF-3aNFVHEgI2WZItc",
      title: "Men's Week Sunday — Benediction",
      caption:
        "The service closed under God's blessing — Men's Week fulfilled, Red Sunday observed, galamsey resisted in prayer, and the memory of Catechist George Asare cherished with thanksgiving.",
    },

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

/** Larger thumbnail for event carousel cover cards */
export function getEventCoverUrl(driveId: string): string {
  const id = encodeURIComponent(driveId)
  return `https://drive.google.com/thumbnail?id=${id}&sz=w800`
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

export function getSortedEvents(): GalleryEvent[] {
  return [...churchGalleryData.events].sort(
    (a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime()
  )
}

export function getEventById(eventId: string): GalleryEvent | undefined {
  return churchGalleryData.events.find((e) => e.eventId === eventId)
}

export function getPhotosForEvent(eventId: string): GalleryPhoto[] {
  return churchGalleryData.photos.filter((p) => p.eventId === eventId)
}

export function getPhotoCountForEvent(eventId: string): number {
  return getPhotosForEvent(eventId).length
}
