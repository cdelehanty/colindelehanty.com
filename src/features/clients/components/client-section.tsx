import { infoConfig } from '@/features/clients/schemas/data'

export function ClientSection() {
	const { clientData = [] } = infoConfig

	return (
		<div
			style={{ backgroundColor: '#111111' }}
			className="b mt-32 flex w-full flex-col p-10 pb-48 2xl:container 2xl:rounded-sm"
		>
			<div className="max-w-md pb-16 pt-30 text-5xl font-semibold text-primary md:text-display-2xl">
				Clients
			</div>
			<div className="grid w-full grid-cols-2 gap-2.5 md:grid-cols-4 2xl:rounded-sm">
				{clientData.slice(0, 4).map((list, listIndex) => (
					<div
						key={`list-${listIndex}`}
						className="relative flex aspect-square flex-col items-center justify-center bg-black hover:scale-[101%] hover:bg-active"
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
									className="flex aspect-square h-auto w-full items-center justify-center bg-utility-gray-300 grayscale hover:bg-white"
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
				{/* {clientData.slice(-1).map((list, listIndex) => (
					<div
						key={`list-last-${listIndex}`}
						className="group relative hidden aspect-square flex-col items-center justify-center bg-black hover:scale-[103%] lg:flex"
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
									className="flex aspect-square h-auto w-full items-center justify-center bg-utility-gray-300 grayscale hover:bg-utility-gray-500"
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
				))} */}
			</div>
		</div>
	)
}
