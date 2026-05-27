/**
 * Rehype plugin: wraps standalone paragraph images in <figure> + <figcaption>.
 *
 * A "standalone" image is a <p> whose only child is a single <img>.
 * If the img has a non-empty alt attribute, it becomes the figcaption text.
 * Runs after Astro's image optimization so src URLs are already resolved.
 */
export function rehypeFigure() {
	return (tree) => {
		transform(tree);
	};
}

function transform(node) {
	if (!node.children) return;

	node.children = node.children.map((child) => {
		transform(child);

		if (
			child.type === 'element' &&
			child.tagName === 'p' &&
			child.children?.length === 1 &&
			child.children[0].type === 'element' &&
			child.children[0].tagName === 'img'
		) {
			const img = child.children[0];
			const alt = img.properties?.alt;
			const captionText = typeof alt === 'string' ? alt.trim() : '';

			return {
				type: 'element',
				tagName: 'figure',
				properties: { className: ['prose-figure'] },
				children: captionText
					? [
							img,
							{
								type: 'element',
								tagName: 'figcaption',
								properties: {},
								children: [{ type: 'text', value: captionText }],
							},
						]
					: [img],
			};
		}

		return child;
	});
}
