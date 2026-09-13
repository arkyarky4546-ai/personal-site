# personal-site

Source for Noah Kitayama's personal site. Astro 7 with static output, served as static assets from Cloudflare Workers on the free plan.

## Commands

Needs Node 22 (see `.nvmrc`) and pnpm.

```bash
pnpm install
pnpm dev          # localhost:4321
pnpm build        # → dist/
pnpm preview      # preview the build
pnpm astro check  # type + template errors
```

## Deploy

Pushing to `main` builds and deploys through Cloudflare Workers Builds. Pull requests get a preview URL. Deploy config is in `wrangler.jsonc`.

The planning specs are in `docs/`.
