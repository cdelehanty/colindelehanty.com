import { cn } from '@/lib/utils'
import { useState } from 'react'
import {
	Dialog,
	DialogContent,
	DialogTrigger,
	DialogTitle,
	DialogDescription
} from '@/components/ui/dialog'
import { buttonVariants } from '../ui/button'
import { Mail } from '@/components/icons'
import { navMenuConfig } from '@/config/nav-menu'

const pages = navMenuConfig.pagesNav

export function MobileNavigation() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Dialog onOpenChange={(open) => setIsOpen(open)}>
			<a
				href="mailto:colin.delehanty@gmail.com"
				target="_blank"
				className={cn(
					buttonVariants({
						variant: 'primary',
						size: 'icon',
						rounded: 'full'
					}),
					'pointer-events-auto flex items-center md:hidden',
					{ hidden: isOpen }
				)}
			>
				<Mail className="size-5" />
			</a>

			<DialogTrigger className="z-40 md:hidden" asChild>
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="pointer-events-auto z-40 flex size-10 flex-col items-center justify-center gap-[0.1875rem]"
					aria-controls="main-menu"
					aria-label="Toggle Menu"
				>
					<div
						className={`h-[0.125rem] w-[0.9375rem] rounded-full bg-white transition-transform duration-300 ${
							isOpen ? 'translate-y-[0.3125rem] rotate-45' : ''
						}`}
					></div>
					<div
						className={`h-[0.125rem] w-[0.9375rem] rounded-full bg-white transition-opacity duration-300 ${
							isOpen ? 'opacity-0' : ''
						}`}
					></div>
					<div
						className={`h-[0.125rem] w-[0.9375rem] rounded-full bg-utility-gray-900 transition-transform duration-300 ${
							isOpen ? '-translate-y-[0.3125rem] -rotate-45' : ''
						}`}
					></div>
				</button>
			</DialogTrigger>

			<DialogContent
				title="main-nav"
				className="section-padding flex h-dvh min-h-[540px] w-full flex-col justify-between pb-8 pt-20"
			>
				<DialogTitle className="sr-only">Main Navigation</DialogTitle>
				<DialogDescription className="sr-only">This is the main navigation menu.</DialogDescription>

				<ul className="flex h-full w-full flex-col text-display-sm font-normal text-primary">
					{pages.map((page) => (
						<li className="w-full py-3" key={page.title}>
							<a href={page.href}>{page.title}</a>
						</li>
					))}
				</ul>
				<a
					href="mailto:colin.delehanty@gmail.com"
					target="_blank"
					className={cn(
						buttonVariants({
							variant: 'secondary',
							size: '2xl',
							rounded: 'md'
						}),
						'pointer-events-auto flex items-center'
					)}
				>
					<span>Get in touch</span>
				</a>
			</DialogContent>
		</Dialog>
	)
}
