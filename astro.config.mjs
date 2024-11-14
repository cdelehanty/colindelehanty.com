import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import { analytics } from '@astrojs/vercel/analytics'
import vercel from '@astrojs/vercel/serverless'

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
		tailwind(),
		analytics()
	],
	output: 'hybrid',
	adapter: vercel({
		webAnalytics: {
			enabled: true
		},
		speedInsights: {
			enabled: true
		}
	})
})
