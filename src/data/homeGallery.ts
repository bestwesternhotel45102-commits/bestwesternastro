// src/data/homeGallery.ts
//
// SINGLE SOURCE OF TRUTH for the homepage "See It for Yourself" gallery.
//
// WHY THIS FILE EXISTS: the gallery used to be two hand-kept lists in
// index.astro — fourteen `<div class="gi" onclick="ola(N)">` tiles, and a
// separate 22-entry `imgs` array the lightbox indexed with that same N. They
// had drifted completely out of step. Tile 3 showed images/40.webp (a "Standard
// King" render) and `ola(3)` opened `imgs[3]`, images/41.webp — a different
// room. Every room tile in the grid opened the wrong photograph, and had done
// since the two lists were last edited independently.
//
// The grid and the lightbox are now rendered from the one array below, so an
// index cannot disagree with a picture: there is only one list to get right.
//
// ─────────────────────────────────────────────────────────────────────────────
// THE ROOM TILES CARRY A PRICE BAKED INTO THE PIXELS.
//
// These are the owner's own labelled exports — the room name and the nightly
// rate are part of the photograph, not markup over it. That is what the hotel
// asked for here, and on a gallery tile it reads as a rate card rather than as
// a caption.
//
// It also breaks the rule the rest of the site runs on. rates.ts exists because
// a price hardcoded in twenty places drifted, and its header is explicit: edit
// the number there and every page follows. A number burned into a WebP cannot
// follow anything. If a rate moves, these files are stale until the owner
// re-exports them, and a stale one contradicts the rate table further down the
// same page — which is precisely the "guest quoting a price the front desk
// won't honor" failure rates.ts was built to end.
//
// So each room tile records the price its picture has burned into it, and
// assertPricesMatchRateCard() below refuses the build when that stops matching
// RATES.nightly. The drift is still possible; it can just no longer ship
// silently. Change a rate and the build tells you which photograph to re-export.
// ─────────────────────────────────────────────────────────────────────────────

import { RATES } from './rates.ts';

export type GalleryTile = {
  /** Path from the site root, without the leading slash (matches legacy markup). */
  src: string;
  /** Overlay label on the tile, and the lightbox caption. */
  label: string;
  alt: string;
  /** Spans two grid columns. Two of these, opening and mid-way. */
  wide?: boolean;
  /**
   * Set on the room tiles only: the RATES.nightly key whose value is printed
   * into this photograph. Guarded at build time — see the note above.
   */
  rateKey?: keyof typeof RATES.nightly;
};

// The room tiles are in rate order, cheapest first, matching the rate table and
// the nav dropdown. The labels are OUR room names, not the wording burned into
// the pictures: the owner's exports say "King Suite Room", "King Handicap
// Suite" and "Standard Double Queen Room", which are not the names the rate
// card, the room pages or the nav use. A guest should read one name per room.
export const HOME_GALLERY: GalleryTile[] = [
  {
    src: 'images/61.webp',
    label: 'Hotel Exterior',
    alt: 'Best Western Vernal Hotel exterior lit at night — Vernal, Utah',
    wide: true,
  },
  {
    src: 'images/35.webp',
    label: 'Under the Stars',
    alt: 'Best Western Vernal Hotel under a night sky — Vernal, Utah',
  },

  // ── The rooms ──────────────────────────────────────────────────────────────
  // 2026-11-18: these tiles used the owner's labelled exports, which have the
  // nightly rate printed into the picture ($95, $108, $120, $120, $135, $149,
  // $155). Every rate changed that day, so all seven pictures became wrong at
  // once. They now use the clean frames the hero reel uses, with no price in
  // the pixels and no rateKey. To bring priced tiles back, re-export them at
  // the new rates, name them "…-$<price>.webp" and set rateKey again — the
  // guard below still works. The old labelled files are still in public/images.
  {
    src: 'images/Queen-Studio/Queen-Suite.webp',
    label: 'Studio Queen',
    alt: 'Studio Queen with a queen bed and a two-seat sofa under the window — Best Western Vernal Hotel, Vernal Utah',
  },
  {
    src: 'images/King-Studio/King-Studio5.webp',
    label: 'Studio King',
    alt: 'Studio King bedroom with platform bed and reading lights — Best Western Vernal Hotel, Vernal Utah',
  },
  {
    src: 'images/Handicaped-Studio/Handicapped-studio4.webp',
    label: 'Accessible Studio King',
    alt: 'Accessible Studio King bedroom with wide turning space — Best Western Vernal Hotel, Vernal Utah',
  },
  {
    src: 'images/Double-Queen-Studio/Double-Queen5.webp',
    label: 'Studio Two Queen',
    alt: 'Studio Two Queen bedroom with two queen beds — Best Western Vernal Hotel, Vernal Utah',
  },
  {
    src: 'images/Pet-Friendly-King-Suite/Pet-Friendly-King-Suite3.webp',
    label: 'Pet-Friendly Room',
    alt: 'Pet-friendly king room with desk, dining table and wood-style floors — Best Western Vernal Hotel, Vernal Utah',
  },
  {
    src: 'images/Pet-Friendly-Double-Queen/Pet-Friendly-Double-Queen-Room2.webp',
    label: 'Pet-Friendly Studio Two Queen',
    alt: 'Pet-friendly Studio Two Queen bedroom with wood-style floors — Best Western Vernal Hotel, Vernal Utah',
  },
  {
    src: 'images/Jacuzzi-Studio/Jacuzzi-Suite1.webp',
    label: 'Studio Jacuzzi King',
    alt: 'Studio Jacuzzi King with a corner jacuzzi in the room beside the desk and wall-mounted TV — Best Western Vernal Hotel, Vernal Utah',
  },

  // ── Breakfast ──────────────────────────────────────────────────────────────
  {
    src: 'images/Breakfast-Room-and-Foyer.webp',
    label: 'Breakfast Room & Foyer',
    alt: 'Breakfast room looking through to the foyer and entrance — Best Western Vernal Hotel, Vernal Utah',
    wide: true,
  },
  {
    src: 'images/Breakfast-Room7.webp',
    label: 'Hot Breakfast, Included',
    alt: 'Breakfast service counter with coffee machines, fresh fruit and hot food — Best Western Vernal Hotel, Vernal Utah',
  },
  {
    // Room1 rather than Room4: both are the dining room, but this one has the
    // lounge sofas in frame, so the four breakfast tiles show four things
    // rather than the same tables from four angles.
    src: 'images/Breakfast-Room1.webp',
    label: 'Breakfast Dining Room',
    alt: 'Breakfast dining room with marble-topped tables and a lounge seating area beyond — Best Western Vernal Hotel, Vernal Utah',
  },
  {
    src: 'images/Breakfast-Room6.webp',
    label: 'Coffee & Fresh Fruit',
    alt: 'Coffee machines and a fruit basket beside the breakfast seating — Best Western Vernal Hotel, Vernal Utah',
  },
];

/**
 * Refuses the build when a rate moves out from under a photograph that has the
 * old number printed on it. Runs at module load, so `astro build` fails rather
 * than publishing a gallery that contradicts the rate table below it.
 */
function assertPricesMatchRateCard(): void {
  const stale = HOME_GALLERY.filter((t) => t.rateKey !== undefined).flatMap((t) => {
    const key = t.rateKey as keyof typeof RATES.nightly;
    const current = RATES.nightly[key];
    // The price is read back out of the filename, which is where the owner's
    // export puts it, so there is no third copy of the number to keep in step.
    const printed = Number(/-\$(\d+)\.webp$/.exec(t.src)?.[1]);
    if (!Number.isFinite(printed)) {
      return [`${t.src} — no "-$<price>" in the filename, so its baked price cannot be checked`];
    }
    if (current === null) {
      return [`${t.label}: the picture prints $${printed}, but RATES.nightly.${key} is null (unpublished)`];
    }
    return current === printed
      ? []
      : [`${t.label}: the picture prints $${printed}, but RATES.nightly.${key} is now $${current}`];
  });

  if (stale.length) {
    throw new Error(
      'Homepage gallery: a nightly rate no longer matches the price printed into its photograph.\n' +
        stale.map((s) => `  - ${s}`).join('\n') +
        '\nRe-export the labelled image at the new price, then update the filename here.\n' +
        'See the note at the top of src/data/homeGallery.ts.'
    );
  }
}

assertPricesMatchRateCard();
