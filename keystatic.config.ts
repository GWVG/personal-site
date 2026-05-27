import { collection, config, fields } from '@keystatic/core';

export default config({
	storage: {
		kind: 'local',
	},
	collections: {
		blog: collection({
			label: 'Blog',
			slugField: 'title',
			path: 'src/content/blog/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				description: fields.text({ label: 'Description', multiline: true }),
				pubDate: fields.date({ label: 'Published' }),
				updatedDate: fields.date({ label: 'Updated', validation: { isRequired: false } }),
				heroImage: fields.image({
					label: 'Hero image',
					directory: 'src/assets/images/blog',
					publicPath: '../../assets/images/blog',
				}),
				content: fields.mdx({ label: 'Content' }),
			},
		}),

		work: collection({
			label: 'Work',
			slugField: 'title',
			path: 'src/content/work/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				description: fields.text({ label: 'Description', multiline: true }),
				pubDate: fields.date({ label: 'Published' }),
				heroImage: fields.image({
					label: 'Hero image',
					directory: 'src/assets/images/work',
					publicPath: '../../assets/images/work',
				}),
				stack: fields.array(fields.text({ label: 'Technology' }), {
					label: 'Stack',
					itemLabel: (props) => props.fields.value.value ?? 'Technology',
				}),
				githubUrl: fields.url({ label: 'GitHub URL', validation: { isRequired: false } }),
				content: fields.mdx({ label: 'Content' }),
			},
		}),

		build: collection({
			label: 'Build',
			slugField: 'title',
			path: 'src/content/build/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				description: fields.text({ label: 'Description', multiline: true }),
				pubDate: fields.date({ label: 'Published' }),
				heroImage: fields.image({
					label: 'Hero image',
					directory: 'src/assets/images/build',
					publicPath: '../../assets/images/build',
				}),
				status: fields.select({
					label: 'Status',
					options: [
						{ label: 'Ongoing', value: 'ongoing' },
						{ label: 'Completed', value: 'completed' },
					],
					defaultValue: 'ongoing',
				}),
				content: fields.mdx({ label: 'Content' }),
			},
		}),

		travel: collection({
			label: 'Travel',
			slugField: 'title',
			path: 'src/content/travel/*',
			format: { contentField: 'content' },
			schema: {
				title: fields.slug({ name: { label: 'Title' } }),
				description: fields.text({ label: 'Description', multiline: true }),
				pubDate: fields.date({ label: 'Published' }),
				heroImage: fields.image({
					label: 'Hero image',
					directory: 'src/assets/images/travel',
					publicPath: '../../assets/images/travel',
				}),
				heroTitle: fields.text({ label: 'Hero title', description: 'Override text shown on the hero image. Falls back to title.' }),
				country: fields.text({ label: 'Country' }),
				distance: fields.number({
					label: 'Distance (km)',
					validation: { isRequired: false },
				}),
				gallery: fields.array(
					fields.image({
						label: 'Photo',
						directory: 'src/assets/images/travel',
						publicPath: '../../assets/images/travel',
					}),
					{ label: 'Gallery' },
				),
				content: fields.mdx({ label: 'Content' }),
			},
		}),
	},
});
