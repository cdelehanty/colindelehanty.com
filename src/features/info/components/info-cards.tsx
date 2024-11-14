import React from 'react'
import type { ClientItem, FilmItem, MiscItem } from '@/features/info/schemas/info'

import { ExternalLink } from 'lucide-react'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage, lazyload } from '@cloudinary/react'
import { fill } from '@cloudinary/url-gen/actions/resize'

const cld = new Cloudinary({
	cloud: {
		cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME
	}
})

export const ClientItemCard: React.FC<{ client: ClientItem }> = ({ client }) => {
	return (
		<div
			key={client.name}
			className="group flex h-[72px] cursor-default select-none items-center rounded-sm bg-secondary hover:bg-secondary--hover"
			role="group"
			aria-labelledby={`client-${client.name}`}
		>
			<div className="grid w-full grid-cols-[1fr_auto] items-center gap-3">
				<div className="flex w-full items-center justify-center gap-3 p-4 px-6">
					{/* <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
						{client.logo && (
							<AdvancedImage
								cldImg={cld.image(client.logo).resize(fill().width(40).height(40))}
								alt={client.name}
								className="h-full w-full object-cover"
								plugins={[lazyload()]}
							/>
							<img
								height={40}
								width={40}
								src={client.logo.includes('png') ? `${client.logo}.png` : `${client.logo}.jpg`}
								alt={client.name}
								className="h-full w-full object-cover"
							/>
						)}
					</div> */}
					<a href={client.link} className="text-sm font-medium text-primary">
						{client.name}
					</a>
				</div>

				{/* <div className="flex h-full w-full items-center justify-center -space-x-6 p-4 hover:-space-x-2 max-sm:-space-x-5">
					{client.projects &&
						client.projects.map((project, index) => (
							<a
								href={`/work/${project.slug}`}
								key={index}
								className="relative z-10 flex size-6 shrink-0 overflow-hidden rounded-full ring-2 ring-utility-gray-50 group-hover:ring-utility-gray-100"
							>
								{project.cover && (
									<AdvancedImage
										cldImg={cld.image(project.cover).resize(fill().width(32).height(32))}
										alt={`Project cover for ${project.title}`}
										className="aspect-square h-full w-full object-cover"
										plugins={[lazyload()]}
									/>
									<img
										src={
											project.cover.includes('png')
												? `${project.cover}.png`
												: `${project.cover}.jpg`
										}
										alt={`Project cover for ${project.title}`}
										className="aspect-square h-full w-full object-cover"
									/>
								)}
							</a>
						))}
				</div> */}
			</div>
		</div>
	)
}

export const FilmItemCard: React.FC<{ film: FilmItem }> = ({ film }) => {
	return (
		<div
			key={film.title}
			className="group h-[72px] cursor-default select-none items-center rounded-sm bg-secondary hover:bg-secondary--hover"
			role="group"
			aria-labelledby={`film-${film.title}`}
		>
			<div className="grid w-full grid-cols-[1fr_auto_auto] items-center sm:grid-cols-[minmax(280px,1fr)_1fr_auto_auto]">
				<div className="flex h-full w-full items-center gap-3 px-6 py-4">
					{/* {film.poster && (
						<AdvancedImage
							cldImg={cld.image(film.poster).resize(fill().width(40).height(40))}
							alt={`${film.title} Poster`}
							className="aspect-square h-10 w-10 rounded-md object-cover"
							plugins={[lazyload()]}
						/>
						<img
							src={film.poster.includes('png') ? `${film.poster}.png` : `${film.poster}.jpg`}
							alt={`${film.title} Poster`}
							className="aspect-square h-10 w-10 rounded-md object-cover"
						/>
					)} */}
					<div className="flex flex-col">
						<div className="text-sm font-medium text-primary">{film.title}</div>
						<span className="font-regular text-sm text-tertiary">Documentary</span>
					</div>
				</div>
				<div className="hidden h-full w-full items-center px-6 py-4 text-sm font-medium capitalize text-secondary sm:flex">
					<span>{film.role}</span>
				</div>
				<div className="hidden h-full w-full items-center justify-center px-6 py-4 text-sm font-medium text-secondary xs:flex">
					{film.year}
				</div>
				<a
					href={film.link}
					target="_blank"
					className="flex h-full w-full items-center justify-center p-4"
				>
					<ExternalLink className="h-4 w-4 text-foreground-tertiary sm:opacity-0 sm:group-hover:opacity-100" />
				</a>
			</div>
		</div>
	)
}
export const MiscItemCard: React.FC<{ misc: MiscItem }> = ({ misc }) => {
	return (
		<div
			key={misc.title}
			className="group flex h-[72px] cursor-default select-none items-center rounded-sm bg-secondary hover:bg-secondary--hover"
			role="group"
			aria-labelledby={`press-${misc.title}`}
		>
			<div className="grid w-full grid-cols-[1fr_auto_auto] items-center sm:grid-cols-[minmax(280px,1fr)_1fr_auto_auto]">
				<div className="flex h-full w-full max-w-sm flex-col justify-center px-6 py-4">
					<div className="line-clamp-1 text-sm font-medium text-primary">{misc.title}</div>
					<span className="font-regular text-sm text-tertiary">{misc.publication}</span>
				</div>
				<div className="hidden h-full w-full items-center px-6 py-4 text-sm sm:flex">
					<span className="font-medium capitalize text-secondary">{misc.type}</span>
				</div>
				<div className="flex h-full w-full items-center justify-center px-6 py-4 text-sm font-medium text-secondary">
					{misc.year}
				</div>
				<a
					href={misc.link}
					target="_blank"
					className="flex h-full w-full items-center justify-center p-4"
				>
					<ExternalLink className="h-4 w-4 text-foreground-tertiary sm:opacity-0 sm:group-hover:opacity-100" />
				</a>
			</div>
		</div>
	)
}
