export const SITE = {
  name: "MOB",
  phone: "+995 599 44 73 60",
  phoneHref: "tel:+995599447360",
  address: {
    en: "138 Mikheili Tsinamdzghvrishvili St",
    ka: "მიხეილ წინამძღვრიშვილის ქ. 138",
  },
  city: { en: "Tbilisi 0102", ka: "თბილისი 0102" },
  /** Copied for taxi drivers, so it's always in Georgian. */
  taxiAddress: "მიხეილ წინამძღვრიშვილის ქუჩა 138, თბილისი",
  plusCode: "PQ8W+98 Tbilisi",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Mob+Burgers%2C+138+Mikheili+Tsinamdzghvrishvili+St%2C+Tbilisi",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Mob+Burgers%2C+138+Mikheili+Tsinamdzghvrishvili+St%2C+Tbilisi",
  /** Leave empty to hide the link. Put the full profile URL here, e.g. https://www.instagram.com/<handle>/ */
  instagram: "" as string,
  rating: 4.9,
  reviewCount: 107,
  pricePerPerson: "20–30 ₾",
  timeZone: "Asia/Tbilisi",
  /** Minutes after midnight, Tbilisi time. Same every day; closing after midnight is fine. */
  hours: { open: 14 * 60, close: 5 * 60 },
  /** Night shift theme runs from this time until closing. */
  nightFrom: 22 * 60,
} as const;
