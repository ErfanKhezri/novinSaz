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
  context/              CartContext, FavoritesContext, CompareContext
  utils/                rentalPrice, jalali, storage, formatPrice, cartMessage, planner, motion variants
```

Design tokens (colours, font sizes, radius, spacing, glass shadows) live in `tailwind.config.ts`.

## Design

Liquid-glass style: frosted panels float over slowly drifting, blurred navy and blue blobs
(`components/layout/BackgroundBlobs.tsx`). Glass is used only on the header, product cards,
price table, filter bar and mobile menu, through `components/ui/GlassPanel.tsx`
(`light` / `strong`). Page sections stay solid or transparent, never glass.

Animations use the `motion` library; shared variants are in `utils/motion.ts`. With
`prefers-reduced-motion`, movement is turned off and only fades remain.

## Features

- **Rental cart** (`/cart`): quantities, Jalali start/end dates, cheapest daily + four-day price per item
  with breakdown and saving, WhatsApp request; printable pre-invoice at `/quote` (browser "Save as PDF")
- **Ready-made packages** (`/packages`): bundles with a discount applied in the cart
- **Exhibitions calendar** (`/exhibitions`): upcoming shows, city filter, countdown; one click sets the cart dates
- **Portfolio** (`/portfolio`): masonry gallery, swipeable lightbox, "add this exact layout to the cart"
- **Booth planner** (`/planner`): drag furniture onto a scaled top-down booth (dnd-kit), rotate, remove,
  live estimate, add everything to the cart; layout saved in the browser
- **3D / AR view** on products with a `model` (.glb in `public/models`), lazy-loaded model-viewer
- **Favorites** (`/favorites`) and **compare** up to 3 products (`/compare`)
- Animated hero, event tabs, steps, FAQ, floating WhatsApp, scroll progress

All state (cart, favorites, compare, planner) lives in React context + localStorage; there is no backend.

## Editing content

- Products: `src/data/products.ts` (replace the placehold.co `image` URLs with real photos).
- Contact details: `src/data/site.ts`.
- Event tabs, steps and FAQ: `src/data/home.ts`.
- Packages: `src/data/packages.ts` · Exhibitions (Jalali dates): `src/data/exhibitions.ts` · Portfolio: `src/data/projects.ts`.
- 3D models: put a `.glb` in `public/models` and set `model` on the product. The two included models are
  generated placeholders.
- `public/sitemap.xml` uses `https://novinsaz.ir`; change it if the domain differs.
