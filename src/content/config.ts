import { defineCollection, z } from 'astro:content'
import { cldAssetsLoader } from 'astro-cloudinary/loaders'

const work = defineCollection({
	schema: ({ image }) =>
		z.object({
			category: z.string(),
			title: z.string().regex(/^[a-zA-Z0-9\s?.'-]+$/),
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
			featured: z.boolean(),
			excluded: z.boolean()
		})
})

const archives = defineCollection({
	loader: cldAssetsLoader({
		folder: 'archives'
	})
})

export const collections = { work, archives }
