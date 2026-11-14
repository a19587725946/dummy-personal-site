# Dummy Personal Site

A responsive single-page personal website containing only dummy content. The site uses vanilla HTML, CSS, and JavaScript, with GSAP for ambient geometric motion and Fontshare for General Sans and Gambetta.

## Local preview

From this directory, run any static file server, for example:

```sh
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

## Cloudflare Workers deployment

Generate the Worker from the website source and deploy it with Wrangler:

```sh
node scripts/build-worker.mjs
npx wrangler deploy
```

Wrangler needs access to a Cloudflare account with permission to edit Workers. The included `wrangler.jsonc` enables the public `workers.dev` route.

## Source map

- `index.html`: semantic page structure and dummy content
- `src/styles.css`: responsive editorial design and OKLCH color tokens
- `src/main.js`: scroll-linked background colors, shape animation, and copy interaction
- `scripts/build-worker.mjs`: bundles the site into the Worker source
- `worker.js`: generated Cloudflare Worker; do not edit directly
- `wrangler.jsonc`: Cloudflare deployment configuration

## Third-party resources

- GSAP 3.13.0, loaded from jsDelivr
- General Sans and Gambetta, loaded from Fontshare

No personal data, backend, analytics, database, or real contact form is included.
