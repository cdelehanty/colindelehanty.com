import type { SidebarNavItem, SiteConfig } from '@/types'
import { capitalizer } from '@/lib/utils'
import { getCollection } from 'astro:content'

export const siteConfig: SiteConfig = {
	name: 'Colin Delehanty',
	icon: 'CD',
	description:
		'Colin works creatively and technically, specializing in time-lapse photography with expertise in motion-controlled and remote camera systems.',
	url: 'https://colindelehanty.com',
	ogImage: '/public/og.jpg',
	links: {
		twitter: 'https://twitter.com/cdelehanty',
		github: 'https://github.com/cdelehanty'
	}
}

async function getCategoryLinks() {
	const projects = (await getCollection('work')) as {
		data: { category: string }
	}[]
	const uniqueCategories = [...new Set(projects.map((project) => project.data.category).flat())]

	const sortedCategories = uniqueCategories.sort((a, b) => a.localeCompare(b))

	return sortedCategories.map((category) => ({
		title: capitalizer(category),
		href: `/work/${category}`
	}))
}

export const footerLinks: SidebarNavItem[] = [
	{
		title: 'Work',
		href: '/work',
		items: await getCategoryLinks()
	},
	{
		title: 'Archives',
		items: [{ title: '2013-2014', href: '#' }]
	},
	{
		title: 'About',
		href: '/about',
		items: [
			{
				title: 'View resume',
				href: 'https://res.cloudinary.com/dzsswr2ti/image/upload/ColinDelehanty_Resume.pdf'
			}
		]
	},
	{
		title: 'Links',
		items: [
			{ title: 'LinkedIn', href: 'https://www.linkedin.com/in/cdelehanty/' },
			{ title: 'Instagram', href: 'https://www.instagram.com/cdelehanty/' },
			{ title: 'Tumblr', href: 'https://www.tumblr.com/cdelehanty' },
			// { title: 'Artstation', href: 'https://www.artstation.com/cdelehanty' },
			{ title: 'IMDb', href: 'https://www.imdb.com/name/nm7277459' },
			{ title: 'Vimeo', href: 'https://vimeo.com/cdelehanty' },
			{ title: 'Github', href: 'https://github.com/cdelehanty' }
		]
	}
	// {
	// 	title: 'Legal & Compliance',
	// 	items: [
	// 		{ title: 'Terms of Service', href: '#' },
	// 		{ title: 'Privacy', href: '#' }
	// 	]
	// }
]
