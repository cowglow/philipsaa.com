# Plan: modernize philipsaa.com

Goal: rebuild the site as plain HTML and CSS, with JavaScript only as optional progressive enhancement. The page must be complete and correct with JS turned off. Rework the portrait so the face stays well framed at every screen size.

## 1. Current state

The site is one page with four Svelte components, a JSON file of job titles and a stylesheet. The build chain is much bigger than the content.

### Build and deploy
- `@sveltejs/kit: "next"` is a pre-1.0 release. `__layout.svelte` and `%svelte.head%` no longer exist in SvelteKit, so a fresh install will most likely fail to build.
- CI uses `actions/checkout@v2` and `JamesIves/github-pages-deploy-action@4.1.7`, both on deprecated Node runtimes.
- About 15 dev dependencies exist to build one static page.

### JavaScript as decoration
- `loader.svelte` covers the page for 2 seconds with a spinning Svelte logo.
- The random job title and its uppercase styling are done in JS (`.toUpperCase()`), so the output depends on JS or on how the page was built.

### HTML and accessibility
- There is no `<title>`.
- The portrait is a CSS `background-image`: it has no alt text, no `srcset`, and the browser can't prioritise it as the main image.
- "Education" and "Links" are `<div class="label">` elements, not headings. The `<h2>` holds the tagline instead.
- The globe icon has `alt="website link"` next to link text. It should be `alt=""`.
- Contrast: `#999` text on a gradient that reaches `#666` is about 2:1. WCAG AA needs 4.5:1.
- The layout uses `100vh` and fixed header heights of 768, 624 and 324 px.

### Assets
- `philipsaa.jpg` is 975 KB at 2289×2288 and is served to every screen size.
- The fonts ship both woff and woff2 (about 320 KB in total).
- `svelte-logo.svg` is only used by the loader.

## 2. Target structure

```
index.html        all content, readable with JS off
styles.css        tokens, layout, light/dark
main.js           ~10 lines, <script type="module">, optional
images/philipsaa-{640,1024,1600}.{avif,jpg}
fonts/            woff2 only (or none: system font stack)
favicon.ico  CNAME  .nojekyll
.github/workflows/pages.yml
```

**Delete:** `package.json`, `yarn.lock`, `svelte.config.js`, `tsconfig.json`, `.eslintrc.cjs`, `.prettierrc` (optional: run Prettier through `npx`), `src/`, `static/images/svelte-logo.svg`.

## 3. Tasks

### 3.1 Markup (`index.html`)
- [ ] Add `<title>`, a meta description and Open Graph tags (`og:title`, `og:description`, `og:image`).
- [ ] Build the page from semantic landmarks: `<main>` and a `<figure>` holding the portrait.
- [ ] Use a heading outline: `h1` for the name, and real headings for "Education" and "Links".
- [ ] Put the tagline in a `<p>`. Uppercase it with CSS `text-transform`.
- [ ] Ship a default title in the HTML (e.g. "Frontend Developer"). Put the other titles in a `<template>` or a visible list.
- [ ] Give the globe icon `alt=""` and `aria-hidden="true"`.
- [ ] Review `target="_blank"` on every link. Keep it only where it's actually wanted.

### 3.2 Styles (`styles.css`)
- [ ] Define colour tokens on `:root` and add a dark and light scheme via `prefers-color-scheme`.
- [ ] Fix contrast so all text is at least 4.5:1 against its background.
- [ ] Replace `100vh` with `100svh`, and the fixed header heights with the aspect-ratio rules in section 4.
- [ ] Lay out with CSS grid: photo column and text column on desktop, stacked on mobile.
- [ ] Merge the duplicated `.label` styles.
- [ ] Fonts: keep woff2 only, or switch to the system font stack.

### 3.3 Script (`main.js`): progressive enhancement
- [ ] Read the titles from the `<template>` and swap a random one into the tagline.
- [ ] Nothing else. No loader, no layout work in JS.

### 3.4 Images
- [ ] Export `philipsaa-640`, `-1024` and `-1600` as AVIF, with a JPG fallback.
- [ ] Use `<picture>` with `srcset`/`sizes`, `width`/`height` attributes, `fetchpriority="high"` and a real `alt`.
- [ ] Target size: about 60–120 KB for the largest variant actually loaded (now 975 KB).

### 3.5 Deploy
- [ ] Replace `deploy.yml` with the official Pages flow: `actions/checkout@v4`, `actions/upload-pages-artifact`, `actions/deploy-pages`. There is no build step.
- [ ] Switch the Pages source in the repo settings from the `gh-pages` branch to "GitHub Actions".
- [ ] Keep `CNAME` and `.nojekyll`.
- [ ] Update the README badge to point at the new workflow.

## 4. Portrait: math and guidelines

### 4.1 Measurements of the current photo
Positions are fractions of the image's width (x) and height (y). The image is square.

| Feature | Position |
|---|---|
| Top of head | y ≈ 0.04 |
| Eye line | y ≈ 0.33 |
| Chin/beard | y ≈ 0.76 |
| Face, horizontal | x ≈ 0.24 – 0.74, centre ≈ 0.49 |

The eyes already sit on the upper third line. The framing is very tight, though: the head fills about 72% of the height.

### 4.2 Anchor on the eyes
Use `<img>` with `object-fit: cover`, and set `object-position` to the focal point's own percentages:

```css
.portrait img {
  --fx: 49%;
  --fy: 33%;
  object-fit: cover;
  object-position: var(--fx) var(--fy);
}
```

**Why it works.** `v` is the fraction of the image that stays visible along the cropped axis, and `p` is the `object-position` percentage. The visible window then starts at `p·(1 − v)`. A focal point at `f` lands at `(f − p(1 − v)) / v` of the container. With `p = f`, that simplifies to exactly `f`. So the eyes stay on the upper third at every container size, without media queries.

### 4.3 Safe aspect range for the photo container
With the eyes anchored at 0.33 and the photo square:

- **Crop from top and bottom (wide container, aspect `a > 1`):** visible height `v = 1/a`. The top of the head stays visible while `0.33·(1 − v) ≤ 0.04`, so `v ≥ 0.88` and `a ≤ ~1.14`.
- **Crop from the sides (tall container):** the face plus about 5% margin needs `a ≥ ~0.6`.
- **Result: keep the photo container between 3:5 and about 8:7.**

```css
/* desktop: photo column never wider than 1.14 × its height */
.layout { grid-template-columns: min(66.66vw, 114svh) 1fr; }
.portrait { height: 100svh; }

/* mobile: fixed, safe ratio instead of pixel heights */
@media (max-width: 940px) {
  .layout { grid-template-columns: 1fr; }
  .portrait { height: auto; aspect-ratio: 4 / 5; }
}
```

On wider screens the text column takes the extra width, and the head never gets cut off.

### 4.4 Guidelines for a new photo
- **Shape and size:** 4:5 or wider, at least 2400 px on the short side.
- **Background:** plain and seamless (the current pale blue-grey works). Set the container's `background-color` to the backdrop colour so any letterboxing blends in.
- **Eye line:** 1/3 from the top.
- **Head size:** about 40–50% of the frame height (now about 72%), with at least 10% space above the head.
- **Horizontal position:** face centre around x ≈ 0.4. Leave empty space on the side facing the text column, and angle the body slightly toward it.
- **Record the focal point** for each photo as `--fx` / `--fy`. Everything in 4.2 and 4.3 derives from it.
- With a looser frame the safe aspect range widens to roughly 0.5–1.8, so the aspect limits in 4.3 can be relaxed.

## 5. Order of work

1. Branch, delete the Svelte toolchain, move the content into `index.html`.
2. Write `styles.css` with the grid layout, tokens and contrast fixes.
3. Resize and encode the portrait. Add `<picture>` with the focal-point CSS.
4. Add `main.js` for the random title.
5. Replace the deploy workflow and switch the Pages source.
6. Check the page with JS off, at 320 / 768 / 1440 / 2560 px widths, and in both colour schemes.
7. Later: swap in the new photo, which only means updating `--fx` / `--fy` and the aspect limits.

**Estimate:** about half a day, most of it on the photo work.
