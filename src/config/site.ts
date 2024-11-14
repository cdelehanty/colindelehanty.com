import type { SidebarNavItem, SiteConfig } from '@/types'
import { capitalizer } from '@/lib/utils'
import { getCollection } from 'astro:content'

export const siteConfig: SiteConfig = {
	name: 'Colin Delehanty',
	icon: 'CD',
	description: '',
	url: 'https://colindelehanty.com',
	ogImage: '/public/og.jpg',
	links: {
		twitter: 'https://twitter.com/cdelehanty',
		github: 'https://github.com/cdelehanty'
	}
}

async function getCategoryLinks() {
	const projects = (await getCollection('work')) as { data: { category: string } }[]
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
	// {
	// 	title: 'Archives',
	// 	items: [
	// 		{ title: '2013-2015', href: '#' },
	// 		{ title: '2016-2018', href: '#' },
	// 		{ title: '2019-2021', href: '#' }
	// 	]
	// },
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
			// { title: 'Twitter', href: 'https://x.com/cdelehanty' },
			{ title: 'Github', href: 'https://github.com/cdelehanty' },
			// { title: 'Artstation', href: 'https://www.artstation.com/cdelehanty' },
			{ title: 'Vimeo', href: 'https://vimeo.com/cdelehanty' }
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
