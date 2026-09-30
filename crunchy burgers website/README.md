# MOB — smash burgers, Tbilisi

A one-page site for MOB at 138 Mikheili Tsinamdzghvrishvili St. Built with Vite, React, TypeScript, Tailwind CSS v4 and the shadcn project layout.

## Run it

Install [Node.js LTS](https://nodejs.org) first (includes npm), then from this folder:

```bash
npm install
npm run dev
```

Open http://localhost:5173. `npm run build` outputs a static site to `dist/`, which you can host anywhere (Vercel, Netlify, Cloudflare Pages, GitHub Pages). `npm run typecheck` runs the TypeScript checker.

## What's on the page

- **Live open/closed status.** Computed in Tbilisi time whatever the visitor's time zone, with a countdown to closing or opening.
- **Night shift.** From 22:00 until closing the site flips to maroon-on-dark, the logo's colours reversed. There's a manual toggle, and the choice is remembered.
- **Georgian / English.** Full translation, switched with the ქა / EN button. It follows the browser language on the first visit and remembers the choice after that.
- **Menu with a tray.** Tap + to add items. The tray keeps the order, splits the bill between N people, copies the order as text, and dials the restaurant.
- **Feed the mob.** Enter how many people and how many veggies, plus drinks. It builds a full round (burgers, fries, sauces, drinks) with a per-person price and adds it to the tray in one tap.
- **Copy address for taxi.** Copies the Georgian street address to paste into a taxi app.
- The smash animation on the headline plays on load. Tap the headline to replay it. It's switched off when the visitor has reduced motion turned on.

## Where to change things

| What | File |
| --- | --- |
| Hours, phone, address, Instagram link, rating | `src/data/site.ts` |
| Menu items, prices, descriptions | `src/data/menu.ts` |
| Menu photos, one per item, named by its `id` | `public/menu/<id>.jpg` |
| Reviews | `src/data/reviews.ts` |
| All interface text (EN + KA) | `src/lib/dictionary.ts` |
| Colours and fonts | `src/index.css` (`--paper`, `--ink`, `--cheese`) |

## Menu photos

The photos in `public/menu/` were cut from screenshots of the ordering app, so they're only about 170 px wide. The "+" button that covered each corner was painted out. For sharper images, drop the original product photos in with the same file names, e.g. `mob-smash.jpg`. Use white backgrounds: the menu multiplies each photo onto the cream page so the food appears to sit directly on it.

## Components

The two supplied components live in `src/components/ui/`, which is the shadcn default (`components.json` maps `@/components/ui`):

- `interactive-hover-button.tsx`. Changed `bg-background` to `bg-transparent`.
- `liquid-metal-button.tsx`. Made transparent: the black inner pill is gone and the metal shader is masked to a thin ring. Text uses the current colour so it works in both themes. Cleanup calls `dispose()`, the current `@paper-design/shaders` API; the original called `destroy()`, which no longer exists, and that leaked WebGL canvases.

Keeping them in `components/ui` matters because the shadcn CLI (`npx shadcn@latest add …`) installs into that folder and imports from it through the `@/components/ui` alias. Putting them anywhere else breaks those imports and splits UI primitives from page sections (`src/components/site/`).

To set up the same structure from scratch: `npm create vite@latest` (React + TypeScript), add Tailwind with `npm i tailwindcss @tailwindcss/vite`, add the `@/*` path alias to `tsconfig` and `vite.config.ts`, then run `npx shadcn@latest init`.
