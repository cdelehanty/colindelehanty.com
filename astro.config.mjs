import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
	site: 'https://colindelehanty.com',
	integrations: [
		mdx({
			syntaxHighlight: 'shiki',
			shikiConfig: {
				theme: 'github-dark-dimmed'
			},
			gfm: true
		}),
		sitemap(),
		react(),
		tailwind()
	],

	output: 'hybrid',
	adapter: vercel({
		analytics: true
	})
})
