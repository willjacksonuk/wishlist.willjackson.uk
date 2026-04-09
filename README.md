# Wishlist — wishlist.willjackson.uk

A personal wishlist app built to practise working with Astro, Tailwind CSS and Starwind.

## Features

- Wishlist items with title, brand, description, price, and priority level
- Colour-coded priority badges (high / medium / low)
- Discount codes displayed per item, if applicable
- Responsive grid layout with a contemporary dark style
- Sticky header showing total item count and transparency effect
- Footer with auto-updating last-modified date
- Wishlist data oraganised in a separate Typescript file for easy updating

## Tech Stack

- [Astro](https://astro.build/) — static site framework (zero JS to client by default)
- [Tailwind CSS v4](https://tailwindcss.com/) — utility-first styling
- [Starwind](https://starwind.dev/) — Tailwind component library
- TypeScript throughout

## Getting Started

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # production build to ./dist/
```

## Project Structure

```
src/
├── components/   # Reusable Astro components
├── data/         # Wishlist items (TypeScript)
├── layouts/      # Page layout
└── pages/        # Astro pages
```
