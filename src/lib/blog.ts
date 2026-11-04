import { getCollection } from 'astro:content';

// Drafts are visible in `astro dev` and excluded from production builds,
// so the index, post routes and RSS feed always agree on what is published.
export function getPublishedPosts() {
	return getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
}
