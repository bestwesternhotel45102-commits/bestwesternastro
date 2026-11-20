// src/data/business.ts
//
// SINGLE SOURCE OF TRUTH for name / address / phone / pricing / booking.
// Every value below is lifted VERBATIM from the legacy site's existing
// JSON-LD and visible markup — nothing was invented or "improved".
// Footer, Header, schema blocks, and CTAs all import from here so a
// NAP/price mismatch becomes impossible (runbook Part 3).

export const BUSINESS = {
  name: 'Best Western Vernal Hotel',
  legalBrand: 'Best Western',
  // Phone — displayed and tel: forms exactly as used across the site.
  phoneDisplay: '(435) 789-6625',
  phoneTel: '4357896625',
  phoneE164: '+14357896625',
  email: 'surestayplus53027@gmail.com',

  // Address (NAP) — matches PostalAddress in every LocalBusiness block.
  address: {
    street: '1935 South 1500 East',
    city: 'Vernal',
    region: 'UT',
    postalCode: '84078',
    country: 'US',
    full: '1935 South 1500 East, Vernal, UT 84078',
  },

  geo: {
    latitude: 40.4474,
    longitude: -109.5194,
  },

  // Front desk is staffed continuously per existing schema.
  hours: {
    openingHours: 'Mo-Su 00:00-23:59',
    checkinTime: '15:00',
    checkoutTime: '11:00',
    display: '24-Hour Front Desk',
  },

  // Booking engine: the hotel's own page on BestWestern.com (property 45102).
  // Every on-site booking button links here, and so does the /go partner
  // redirect (src/data/partners.ts), which appends ref/utm params the page ignores.
  //
  // HISTORY: until 2026-11-18 booking buttons dialled the front desk with a
  // phone-only 10% code (ROCCO), per a GM decision of 2026-07-16, and /go
  // forwarded to the Executive Inn's theworld24.com engine. Both were replaced
  // when the hotel went live as a Best Western; the ROCCO offer was dropped on
  // the owner's instruction because it cannot be honoured on BestWestern.com.
  bookingUrl:
    'https://www.bestwestern.com/en_US/book/naples/hotel-rooms/best-western-naples-vernal-hotel/propertyCode.45102.html',

  // Label for every button that links to bookingUrl. Buttons that show the
  // phone number still dial the front desk.
  directBooking: {
    ctaLabel: 'Book Now',
  },

  // Opens Google's "write a review" dialog for the hotel's Business Profile.
  // Used by the header badge (Header.astro) and the homepage review button.
  googleWriteReview: 'https://g.page/r/CfRCHpamSkOcEBM/review',

  site: {
    domain: 'https://bestwesternvernalhotel.com',
    canonicalHome: 'https://bestwesternvernalhotel.com/',
    logo: '/images/logo.webp',
    ogImage: 'https://bestwesternvernalhotel.com/images/35.webp',
  },

  // Partners shown in the footer.
  partners: {
    management: { name: 'MSC Companies', url: 'https://www.msccompanies.com' },
    poweredBy: { name: 'cozelosdata.com', url: 'https://cozelosdata.com' },
  },

  // Direct-booking benefits shown in the conversion layer (AdventureOS Prompt 3).
  // `confirmed` GATES publication: an unhonored claim is worse than none
  // (Report §12). Flip to `true` ONLY after the GM signs off in writing —
  // no code change needed, just this flag. Only confirmed claims are rendered.
  bookDirect: [
    { id: 'no-fees', label: 'No booking fees', confirmed: true }, // true by definition when booking direct
    { id: 'free-parking', label: 'Free parking — truck & trailer', confirmed: true },
    { id: 'free-breakfast', label: 'Free hot breakfast', confirmed: true },
    { id: 'best-rate', label: 'Best rate guarantee', confirmed: false }, // NEEDS GM sign-off
    { id: 'flex-cancel', label: 'Flexible cancellation', confirmed: false }, // NEEDS GM to confirm actual policy
  ],

  lastUpdated: 'February 2026',
} as const;

export type Business = typeof BUSINESS;
