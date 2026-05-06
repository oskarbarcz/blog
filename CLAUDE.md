# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev          # start Astro dev server (http://localhost:4321)
npm run build        # static build to ./dist
npm run preview      # preview the built site
npm run format       # prettier --write
npm run format:check # prettier --check (run by CI)
npm run astro check  # type-check Astro + content collections (run by CI)
npm run typecheck    # tsc --noEmit (TS-only check, not run by CI)
```

There is no test suite. CI (`.github/workflows/integrate.yml`) runs `format:check`, `astro check`, and `build` on every PR — match those locally before pushing.

## Release / deploy

- Push to `main` runs `.github/workflows/deploy.yml`, which builds, deploys to GitHub Pages (`blog.barcz.me`), and creates a git tag + GitHub release named after `package.json`'s `version` field.
- Therefore **bump `package.json` `version` whenever a PR should produce a new release tag**. The PR check `.github/bin/check_version_is_free` fails CI if the version already exists as a tag.
- The deploy workflow also accepts a `repository_dispatch` event of type `deploy-blog` so an external content repository can trigger a rebuild.

## Architecture

Astro 5 static-site blog (Polish-language, `lang="pl"`) with React 19 islands, Tailwind v4 (via `@tailwindcss/vite`), and Flowbite React. Output is fully static — there is no server runtime in production.

### Content collections (`src/content/config.ts`)

Two collections drive nearly all pages. Their zod schemas are the source of truth for what frontmatter is valid; update the schema when you add a field.

- **`articles`** — Markdown posts in `src/content/articles/`, filenames `YYYY-MM-DD-slug.md`. The filename slug becomes the URL: `/articles/<slug>`. Required: `title`, `excerpt`, `date`, `readTime`, `tags`. Optional: `keywords`, `coverUrl`, `reactionaryContext`. Special tag behavior in `src/pages/articles/[slug].astro`: `archive` shows the `ArchiveContext` banner, `reactionary` (with `reactionaryContext`) shows `ReactionaryContext`.
- **`events`** — Markdown in `src/content/events/`. Includes `role` enum (`guest|speaker|panelist|participant|organizer`), `organizer`, `photos`, and `links` (article/youtube/linkedin/facebook/other). Photos paths typically point at `/photos/events/<slug>/N.jpg` under `public/`.

Pages are thin: `src/pages/index.astro`, `articles.astro`, `events.astro`, and `articles/[slug].astro` all just `getCollection(...)`, sort by date, and pass plain objects into React island components (`client:load`).

### Per-article OG image generation

`src/pages/articles/[slug]/thumbnail.png.ts` is a static API route that uses **Satori** (JSX → SVG) + **@resvg/resvg-js** (SVG → PNG) to render a 1200×630 thumbnail per article at build time. It reads `src/assets/fonts/RobotoSlab-{Regular,Bold}.ttf` from disk and pulls `coverUrl` + the author photo over HTTP. `src/components/shared/Meta.astro` wires `image={/articles/<slug>/thumbnail.png}` into og:/twitter: tags. If a build fails fetching a remote image, the route still emits a thumbnail without it.

### `llms.txt`

`src/pages/llms.txt.ts` generates `/llms.txt` from the articles collection + values in `src/constants/index.ts`. Keep that file in sync when adding new top-level pages or social links.

### Constants (`src/constants/index.ts`)

Single source of truth for site copy (Polish), `SITE_ORIGIN`, `BRAND_COLOR` (`#40bf7e`), `AUTHOR_*`, `SOCIAL_LINKS`, `HOMEPAGE_LATEST_COUNT`, `ARTICLES_PER_PAGE`. Pages, the OG image, `Meta.astro`, and `llms.txt` all import from here — change copy here, not inline.

### React islands + PhotoSwipe

Interactive UI is React under `src/components/{home,articles,events,shared}/`, mounted from `.astro` with `client:load`. The lightbox is global: `PhotoSwipeInit` (mounted on article and events pages) wraps every `<img>` inside any `.pswp-gallery` ancestor with an anchor and (re)initializes PhotoSwipe whenever the DOM mutates. To make images zoomable in a new context, give the wrapper element class `pswp-gallery` — no per-image wiring needed. The article `<article>` element already has it.

### Styling

Tailwind v4 via `@tailwindcss/vite` (no `tailwind.config.js`). Global styles in `src/styles/global.css`; markdown article styling lives in `src/styles/article.css` and applies via `.article-content` on the rendered `<Content />`. Dark mode is driven by Flowbite's `ThemeModeScript` / `ThemeInit` in `src/layouts/Layout.astro`. Prettier runs `prettier-plugin-astro` and `prettier-plugin-tailwindcss` (class sorting); `tailwindFunctions` is set to `["twMerge", "createTheme"]`.

### Flowbite React

Integrated via the Astro plugin; managed config lives in `.flowbite-react/` (auto-generated — do not hand-edit `class-list.json` / `init.tsx`). `Layout.astro` imports `ThemeInit` from `../../.flowbite-react/init`.

## Content authorship — hard rule

**Never write, rewrite, edit, translate, summarize, or "improve" the body of any article in `src/content/articles/` or any event description in `src/content/events/`.** All published content is authored by a human and must stay that way; AI-generated prose is not acceptable here under any circumstances. This applies even when the user asks for a "small fix," "polish," or "rewording" of post body text — decline and ask the human to make the edit themselves.

Mechanical, non-prose changes are fine: fixing frontmatter shape to match the zod schema, repairing broken Markdown syntax, updating image paths, renaming files to match the `YYYY-MM-DD-` convention. If in doubt, ask before touching anything inside an article or event Markdown file.

## Conventions worth knowing

- All user-facing copy is **Polish**; dates render with `toLocaleDateString("pl-PL", …)`. Don't introduce English UI strings.
- Article filenames must start with `YYYY-MM-DD-` — the date in the frontmatter is independent, but the filename slug is what becomes the URL.
- Event photos go in `public/photos/events/<event-slug>/` and are referenced as `/photos/events/<event-slug>/N.jpg` from frontmatter.
- The site URL is hard-coded to `https://blog.barcz.me` in `astro.config.mjs` and `SITE_ORIGIN`; canonical/OG URLs use it even on PR previews.
