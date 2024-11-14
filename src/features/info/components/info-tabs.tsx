import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { infoConfig } from '@/features/info/schemas/data'

import { ClientItemCard, FilmItemCard, MiscItemCard } from './info-cards'

export function InfoTabs() {
	const { clientData = [], filmData = [], miscData = [] } = infoConfig

	return (
		<Tabs defaultValue="clients" className="fade animate-fadeSm z-30 w-full">
			<TabsList className="w-full overflow-auto">
				<TabsTrigger value="clients">Clients</TabsTrigger>
				<TabsTrigger value="films">Films</TabsTrigger>
				<TabsTrigger value="more">More</TabsTrigger>
			</TabsList>

			<TabsContent value="clients">
				<div className="grid w-full gap-2 sm:grid-cols-2 lg:grid-cols-4">
					{clientData.map((client) => (
						<ClientItemCard key={client.name} client={client} />
					))}
				</div>
			</TabsContent>

			<TabsContent value="films">
				<div className="grid w-full grid-cols-1 gap-2">
					{filmData.map((film) => (
						<FilmItemCard key={film.title} film={film} />
					))}
				</div>
			</TabsContent>

			<TabsContent value="more">
				<div className="grid w-full grid-cols-1 gap-2">
					{miscData.map((misc) => (
						<MiscItemCard key={misc.title} misc={misc} />
					))}
				</div>
			</TabsContent>
		</Tabs>
	)
}
