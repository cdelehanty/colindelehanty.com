import { infoConfig } from '@/features/clients/schemas/data'

export function ClientSection() {
	const { clientData = [] } = infoConfig

	return (
		<div className="container mdx-padding mt-32 flex w-full flex-col gap-14">
			<div className="grid w-full grid-cols-2 gap-2.5 md:grid-cols-4 lg:grid-cols-5">
				{clientData.slice(0, 4).map((list, listIndex) => (
					<div
						key={`list-${listIndex}`}
						className="relative flex aspect-[3/2] flex-col items-center justify-center lg:aspect-square"
					>
						{list.clients.map((client, clientIndex) => (
							<div
								key={`client-${clientIndex}-${client.logo}`}
								className={`animate-translateY-${clientIndex + 1} absolute bottom-0 left-0 right-0 top-0 mx-auto flex h-full w-full max-w-[7.5rem] items-center justify-center lg:max-w-[8.5rem]`}
								style={{
									animationDelay: `${listIndex * 120}ms`
								}}
							>
								<div
									className="flex aspect-square h-auto w-full items-center justify-center bg-utility-gray-900 grayscale"
									style={{
										maskImage: `url("${client.logo}")`,
										maskRepeat: 'no-repeat',
										maskPosition: 'center center',
										maskSize: 'contain'
									}}
								/>
							</div>
						))}
					</div>
				))}
				{clientData.slice(-1).map((list, listIndex) => (
					<div
						key={`list-last-${listIndex}`}
						className="relative hidden aspect-[3/2] flex-col items-center justify-center lg:flex lg:aspect-square"
					>
						{list.clients.map((client, clientIndex) => (
							<div
								key={`client-last-${clientIndex}-${client.logo}`}
								className={`animate-translateY-${clientIndex + 1} absolute bottom-0 left-0 right-0 top-0 mx-auto flex h-full w-full max-w-[7.5rem] items-center justify-center lg:max-w-[8.5rem]`}
								style={{
									animationDelay: `${(clientData.length - 1) * 120}ms`
								}}
							>
								<div
									className="flex aspect-square h-auto w-full items-center justify-center bg-utility-gray-900 grayscale"
									style={{
										maskImage: `url("${client.logo}")`,
										maskRepeat: 'no-repeat',
										maskPosition: 'center center',
										maskSize: 'contain'
									}}
								/>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}
