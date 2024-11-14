import { defineCollection, z } from 'astro:content'

const work = defineCollection({
	schema: ({ image }) =>
		z.object({
			category: z.string().optional(),
			title: z.string().regex(/^[a-zA-Z0-9\s?.']+$/),
			description: z.string(),
			client: z.string().optional(),
			date: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			role: z.string().optional(),
			cover: z.string(),
			video: z.string().optional(),
			link: z
				.object({
					href: z.string(),
					text: z.string()
				})
				.optional(),
			featured: z.boolean().optional(),
			excluded: z.boolean().optional()
		})
})

export const collections = { work }
