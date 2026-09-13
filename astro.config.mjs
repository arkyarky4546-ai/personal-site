// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://noah-kitayama.arkyarky4546.workers.dev',
  output: 'static',
  // URLs never end in a slash: /about, not /about/. Must match
  // assets.html_handling in wrangler.jsonc. See docs/03-system-design.md §3.
  trailingSlash: 'never',
  build: {
    format: 'file',
    // The stylesheet is ~2.5 KB compressed. Inlining it removes a render-blocking
    // request, which Lighthouse estimated at ~100 ms of mobile LCP.
    inlineStylesheets: 'always',
  },
  // Downloaded at build time and served from this site, never from a font CDN.
  // Two files in total: the budget in docs/03-system-design.md §7.
  fonts: [
    {
      provider: fontProviders.fontshare(),
      name: 'Switzer',
      cssVariable: '--font-switzer',
      weights: [600],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Source Serif 4',
      cssVariable: '--font-source-serif',
      weights: ['400 700'],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['serif'],
    },
  ],
});
