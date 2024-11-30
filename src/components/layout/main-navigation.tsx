'use client'
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu'
import { navMenuConfig } from '@/config/nav-menu'

const pages = navMenuConfig.pagesNav

export function MainNavigation() {
	return (
		<NavigationMenu className="pointer-events-auto hidden w-full md:block">
			<NavigationMenuList className="">
				{pages.map((page) => (
					<NavigationMenuItem key={page.title}>
						<NavigationMenuLink
							href={page.href}
							className={navigationMenuTriggerStyle()}
						>
							{page.title}
						</NavigationMenuLink>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
