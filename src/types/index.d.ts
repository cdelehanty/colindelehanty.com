import { ComponentType } from 'react'

export type NavItem = {
	title: string
	href: string
	disabled?: boolean
	icon?: string
} & (
	| {
			href: string
			items?: never
	  }
	| {
			href?: string
			items: MenuItem[]
	  }
)

export type MenuItem = NavItem & {
	image?: string
	description?: string
	launched?: boolean
	external?: boolean
	forceReload?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
	title: string
	href?: string
	disabled?: boolean
	external?: boolean
} & (
	| {
			href: string
			items?: never
	  }
	| {
			href?: string
			items: MenuItem[]
	  }
)

export type NavMenuConfig = {
	pagesNav: MainNavItem[]
}

export type SiteConfig = {
	name: string
	icon: string
	description: string
	url: string
	ogImage: string
	links: {
		twitter: string
		github: string
	}
}

export interface PageConfig {
	title: string
	description: string
	image?: string
}
