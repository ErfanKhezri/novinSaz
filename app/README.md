# نوین ساز — Novin Saz

Website for Novin Saz: rental of furniture and equipment for exhibition booths,
showrooms and meeting rooms. Persian, right-to-left, mobile-first.

Vite + React + TypeScript + Tailwind CSS v3 + React Router. No backend.

## Run

```bash
npm install
npm run dev
npm run build
```

## Structure

```
src/
  components/ui/        Button, Card, Badge, Input, Textarea, Container, SectionTitle
  components/layout/    Header, Footer, MobileMenu, Layout
  components/product/   ProductCard, ProductGrid, PriceTable, CategoryFilter
  pages/                Home, Products, ProductDetail, About, Contact, NotFound
  data/products.ts      products and categories
  data/site.ts          phone, WhatsApp, address, Instagram, working hours
  types/product.ts      Product type
  utils/                formatPrice (Persian digits, Toman), whatsapp link
```

Design tokens (colours, font sizes, radius, spacing, motion) live in `tailwind.config.ts`.

## Editing content

- Products: `src/data/products.ts` (replace the placehold.co `image` URLs with real photos).
- Contact details: `src/data/site.ts`.
