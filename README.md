# نوین ساز — Novin Saz

Website for Novin Saz: rental of furniture and equipment for exhibition booths,
showrooms and meeting rooms. Persian, right-to-left, mobile-first.

Vite + React + TypeScript + Tailwind CSS v3 + React Router + motion. No backend.

## Run

```bash
npm install
npm run dev
npm run build
```

## Structure

```
src/
  components/ui/        Button, Card, Badge, Input, Textarea, Container, SectionTitle, Section, GlassPanel
  components/layout/    Header, Footer, MobileMenu, Layout, BackgroundBlobs
  components/product/   ProductCard, ProductGrid, PriceTable, CategoryFilter
  pages/                Home, Products, ProductDetail, About, Contact, NotFound
  data/products.ts      products and categories
  data/site.ts          phone, WhatsApp, address, Instagram, working hours
  types/product.ts      Product type
  utils/                formatPrice (Persian digits, Toman), whatsapp link, motion variants
```

Design tokens (colours, font sizes, radius, spacing, glass shadows) live in `tailwind.config.ts`.

## Design

Liquid-glass style: frosted panels float over slowly drifting, blurred brand-colour blobs
(`components/layout/BackgroundBlobs.tsx`). Glass is used only on the header, product cards,
price table, filter bar and mobile menu, through `components/ui/GlassPanel.tsx`
(`light` / `strong`). Page sections stay solid or transparent, never glass.

Animations use the `motion` library; shared variants are in `utils/motion.ts`. With
`prefers-reduced-motion`, movement is turned off and only fades remain.

## Features

- Animated hero: an illustrated booth assembles itself and follows the pointer; rotating headline word,
  counting stats, floating price chips, endless product ticker
- Rental list: add products (or whole booth packages) with a quantity, set the number of days, see the
  cheapest total (daily + four-day mix) and send the list to WhatsApp
- Price calculator on every product page
- Event tabs with suggested products, booth packages, four-step process, FAQ
- Products page: search, category filter, sort by price
- Scroll progress bar, floating WhatsApp and back-to-top buttons, 3D tilt on product cards

## Editing content

- Products: `src/data/products.ts` (replace the placehold.co `image` URLs with real photos).
- Contact details: `src/data/site.ts`.
- Event tabs, booth packages, steps and FAQ: `src/data/home.ts`.
