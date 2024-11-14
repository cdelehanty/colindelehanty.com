export interface ClientItem {
	name: string
	logo?: string
	link?: string
	projects?: {
		cover: string
		title: string
		slug: string
	}[]
}

export interface FilmItem {
	title: string
	poster?: string
	category: string
	role: string
	year: number
	link?: string | undefined
}

export interface MiscItem {
	title: string
	publication: string
	type: string
	year: number
	link?: string | undefined
}

export interface TalkItem {
	title: string
	event: string
	description: string
	year: number
	link?: string | undefined
}
export interface WorkshopItem {
	title: string
	publication: string
	description: string
	year: number
	link?: string | undefined
}

export interface InfoConfig {
	clientData: ClientItem[]
	filmData: FilmItem[]
	miscData: MiscItem[]
}
