import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel/static'

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
	output: 'static',
	adapter: vercel({
		webAnalytics: {
			enabled: true
		}
	}),
	experimental: {
		contentLayer: true
	}
})
