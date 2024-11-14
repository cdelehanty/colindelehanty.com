import * as React from 'react'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
	'flex items-center justify-center text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				primary:
					'bg-btn-primary-bg hover:bg-btn-primary-bg--hover text-btn-primary-fg hover:text-btn-primary-fg--hover',
				secondary:
					'text-btn-secondary-fg bg-btn-secondary-bg hover:text-btn-secondary-fg--hover hover:bg-btn-secondary-bg--hover',
				'secondary-color':
					'text-btn-secondary-color-fg bg-btn-secondary-color-bg hover:text-btn-secondary-color-fg--hover hover:bg-btn-secondary-color-bg',
				tertiary:
					'text-btn-tertiary-fg hover:text-btn-tertiary-fg--hover bg-btn-tertiary-bg hover:bg-btn-tertiary-bg--hover',
				// 'tertiary-color': 'text-btn-tertiary-color-fg bg-btn-tertiary-color-bg md:justify-start ',

				link: 'text-btn-tertiary-fg hover:text-btn-tertiary-fg--hover'
				// 'link-color': 'text-btn-tertiary-color-fg md:justify-start'
			},
			size: {
				icon: 'p-2 size-[40px] bg-transparent hover:bg-transparent',
				// icon-md: 'p-2.5',
				// 'icon-lg': 'p-3',
				// 'icon-xl': 'p-3.5',
				// 'icon-2xl': 'p-4',
				'sm-link': 'gap-2.5 text-sm font-semibold',
				'md-link': 'gap-2.5 text-md font-semibold',

				sm: 'gap-2 px-3 py-2 text-sm font-semibold',
				md: 'gap-2 px-3.5 py-2.5 text-sm font-semibold',
				lg: 'gap-1.5 px-4 py-2.5 text-base font-semibold',
				xl: 'gap-1.5 px-[18px] py-3 text-base font-semibold',
				'2xl': 'gap-2 px-[22px] py-4 text-lg font-semibold'
			},
			rounded: {
				none: 'rounded-none',
				xs: 'rounded-xs',
				sm: 'rounded-sm',
				md: 'rounded-md',
				lg: 'rounded-lg',
				xl: 'rounded-xl',
				full: 'rounded-full'
			}
		},
		defaultVariants: {
			variant: 'secondary',
			size: 'md',
			rounded: 'md'
		}
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, rounded, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, size, rounded, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
