import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Social preview (og:image), 1200x630 PNG/JPG; falls back to heroImage.
			ogImage: z.optional(image()),
			draft: z.boolean().default(false),
		}),
});

const work = defineCollection({
	loader: glob({ base: './src/content/work', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			heroImage: z.optional(image()),
			stack: z.array(z.string()),
			githubUrl: z.string().url().optional(),
		}),
});

const build = defineCollection({
	loader: glob({ base: './src/content/build', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		heroImage: z.string().optional(),
		heroTitle: z.string().optional(),
		subtitle: z.string().optional(),
		status: z.enum(['ongoing', 'completed']),
	}),
});

const travel = defineCollection({
	loader: glob({ base: './src/content/travel', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			subtitle: z.string().optional(),
			pubDate: z.coerce.date(),
			heroImage: z.string().optional(),
			heroTitle: z.string().optional(),
			country: z.string(),
			distance: z.number().optional(),
			gallery: z.array(image()).optional(),
		}),
});

export const collections = { blog, work, build, travel };
