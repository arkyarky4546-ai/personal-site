// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  // URLs never end in a slash: /about, not /about/. Must match
  // assets.html_handling in wrangler.jsonc. See docs/03-system-design.md §3.
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
});
