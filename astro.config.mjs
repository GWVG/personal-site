// @ts-check

import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { rehypeFigure } from './src/plugins/rehype-figure.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	adapter: netlify(),
	integrations: [mdx(), react(), keystatic(), sitemap()],
	markdown: {
		rehypePlugins: [rehypeFigure],
	},
	vite: {
		resolve: {
			alias: {
				'@images': fileURLToPath(new URL('./src/assets/images', import.meta.url)),
			},
		},
	},
});
