# نوین ساز — Novin Saz

Website for Novin Saz, a Tehran business renting exhibition-booth furniture
(counters, bar stools, Eames chairs, half-set sofas, TVs, partitions, tables…)
per day or as a four-day package.

React 18 + TypeScript + Vite + Tailwind CSS v4, right-to-left Persian, React Router.

## Run

```bash
pnpm install
pnpm dev       # http://localhost:5173
pnpm build     # type-check + production build into dist/
pnpm lint
```

SPA rewrites for deployment are in `vercel.json` (Vercel) and `public/_redirects` (Netlify).

## Pages

| Route | What it is |
| --- | --- |
| `/` | Home: hero order slip, catalogue by category, featured product, how renting works, booth packages, about letter, FAQ, contact form |
| `/products` | Full catalogue with category filter (`?category=seating`) |
| `/products/:slug` | Product: description, specs, day / four-day price, live rental calculator, related items |
| `/order` | Order slip: chosen items, shared rental duration, total; sends to WhatsApp or email |
| `/about`, `/contact` | About the business; contact channels and form |

## Structure

```
src/
  styles/index.css   design tokens (@theme: colours, five type steps, easing), shaped edges, motion
  data/              all content: products, categories, site info, packages, FAQ (edit these, not components)
  lib/               pricing (cheapest day / 4-day mix), Persian number formatting, order message
  hooks/             useOrder (order slip context), useReveal (entrances), usePageTitle
  components/
    ui/              design-system primitives: Button, Container, Field, Photo, Price, Stepper
    layout/          Header, Footer, Layout
    product/         ProductArt (drawings), ProductPlate, PricePair, SpecList, RentalCalculator
    order/           OrderProvider (persists to localStorage), OrderSlip
    sections/        home-page sections
  pages/             one file per route
```

### Adding a product

Add an entry to `src/data/products.ts`. For a new drawing, add an `ArtId` in
`src/data/types.ts` and its SVG in `components/product/ProductArt.tsx`, or replace the
drawings with real photographs.

## Before launch

- Phone, WhatsApp number, email and address in `src/data/site.ts` are placeholders.
- Prices, stock counts, dimensions and booth packages are sample data to confirm.
- Product images are flat drawings; replace them with real product photography.
- Atmosphere photos are hot-linked from picsum.photos (Unsplash licence, credited in the
  footer); swap them for the business's own booth photos.
