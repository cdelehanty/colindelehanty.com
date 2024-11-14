import * as React from 'react'
import MDXVideo from '@/components/content/mdx-video.astro'
import MDXImage from '@/components/content/mdx-image.astro'
import MDXGrid from '@/components/content/mdx-grid.astro'
import MDXContainer from '@/components/content/mdx-container.astro'
import MDXInfo from '@/components/content/mdx-info.astro'
import MDXList from '@/components/content/mdx-list.astro'

import { cn } from '@/lib/utils'
import { Image } from 'astro:assets'

type Props = {
	className?: string
}

const contentWidth = 'max-w-screen-md'

export const MdxComponents = {
	h1: ({ className, ...props }: Props) => (
		<h1
			className={cn('mt-2 scroll-m-20 text-4xl font-bold tracking-tight', contentWidth, className)}
			{...props}
		/>
	),
	h2: ({ className, ...props }: Props) => (
		<h2
			className={cn('mb-1 mt-12 text-3xl font-normal text-brand-primary', contentWidth, className)}
			{...props}
		/>
	),
	h3: ({ className, ...props }: Props) => (
		<h3
			className={cn(
				'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight',
				contentWidth,
				className
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }: Props) => (
		<h4
			className={cn(
				'mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
				contentWidth,
				className
			)}
			{...props}
		/>
	),
	h5: ({ className, ...props }: Props) => (
		<h5
			className={cn(
				'mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
				contentWidth,
				className
			)}
			{...props}
		/>
	),
	h6: ({ className, ...props }: Props) => (
		<h6
			className={cn(
				'mt-8 scroll-m-20 text-base font-semibold tracking-tight',
				contentWidth,
				className
			)}
			{...props}
		/>
	),
	a: ({ className, ...props }: Props) => (
		<a
			className={cn(
				'font-normal text-primary underline underline-offset-4',
				contentWidth,
				className
			)}
			target="_blank"
			rel="noopener noreferrer"
			{...props}
		/>
	),
	p: ({ className, ...props }: Props) => (
		<p
			className={cn(
				'text-lg font-normal text-primary [&:not(:first-child):not(:last-child)]:my-6',
				contentWidth,
				className
			)}
			{...props}
		/>
	),
	ul: ({ className, ...props }: Props) => (
		<ul className={cn('my-6 ml-6 list-disc', contentWidth, className)} {...props} />
	),
	ol: ({ className, ...props }: Props) => (
		<ol className={cn('my-6 ml-6 list-decimal', contentWidth, className)} {...props} />
	),
	li: ({ className, ...props }: Props) => (
		<li className={cn('mt-2 text-primary', contentWidth, className)} {...props} />
	),
	blockquote: ({ className, ...props }: Props) => (
		<blockquote
			className={cn(
				'[&>*]:text-muted-foreground mt-6 border-l-2 pl-6 italic',
				contentWidth,
				className
			)}
			{...props}
		/>
	),
	img: ({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
		<img className={cn('rounded-md border', contentWidth, className)} alt={alt} {...props} />
	),
	hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className={cn('my-6 w-full overflow-y-auto', contentWidth, className)}>
			<table className="w-full" {...props} />
		</div>
	),
	tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr className={cn('even:bg-muted m-0 border-t p-0', contentWidth, className)} {...props} />
	),
	th: ({ className, ...props }: Props) => (
		<th
			className={cn(
				'border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
				contentWidth,
				className
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }: Props) => (
		<td
			className={cn(
				'border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
				contentWidth,
				className
			)}
			{...props}
		/>
	),
	pre: ({ className, ...props }: Props) => (
		<pre
			className={cn(
				'mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4',
				contentWidth,
				className
			)}
			tabIndex={0}
			{...props}
		/>
	),
	strong: ({ className, ...props }: Props) => (
		<strong
			className={cn('font-bold text-white', className)} // Customize the classes as needed
			{...props}
		/>
	),

	Image,
	MDXVideo: MDXVideo,
	MDXImage: MDXImage,
	MDXGrid: MDXGrid,
	MDXList: MDXList,
	MDXInfo: MDXInfo,
	MDXContainer: MDXContainer
}
