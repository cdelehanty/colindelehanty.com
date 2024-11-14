import React from 'react'
import type { ClientItem, FilmItem, MiscItem } from '@/features/info/schemas/info'

import { ExternalLink } from '@/components/icons'

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
					<a href={client.link} className="text-sm font-medium text-primary">
						{client.name}
					</a>
				</div>
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
