import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per project in src/content/projects/. The filename is the
// URL: chordially.md is /projects/chordially. URLs are permanent, so renaming a
// file needs a redirect (docs/03-system-design.md §3).
//
// Text still to be written starts with "TODO:", and a date not known yet is
// written as TODO. Pages show both as placeholders, so building main fails
// until they're replaced (docs/placeholders.md).
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    // Strict, so a misspelled field fails the build instead of being dropped.
    z.strictObject({
      title: z.string().min(1),
      summary: z.string().min(1),
      date: z.union([z.literal('TODO'), z.coerce.date()]),
      tech: z.array(z.string().min(1)).min(1),
      repo: z.url(),
      demo: z.url().optional(),
      featured: z.boolean(),
      // An image beside the Markdown file: cover: { src: ./screenshot.png, alt: "..." }
      cover: z.strictObject({ src: image(), alt: z.string().min(1) }).optional(),
    }),
});

export const collections = { projects };
