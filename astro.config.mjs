// @ts-check

import mdx from '@astrojs/mdx';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { rehypeFigure } from './src/plugins/rehype-figure.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	adapter: netlify(),
	integrations: [mdx(), sitemap()],
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
