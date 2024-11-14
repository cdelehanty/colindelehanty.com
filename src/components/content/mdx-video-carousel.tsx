import { useState, useEffect, useRef } from 'react'
import {
	Carousel,
	CarouselMainContainer,
	SliderMainItem,
	CarouselThumbsContainer,
	CarouselIndicator,
	CarouselPrevious,
	CarouselNext
} from '@/components/ui/carousel'
import Player from '@vimeo/player'

interface MediaData {
	src: string
	alt: string
	description?: string
}

interface MDXCarouselProps {
	isFirstChild: boolean
	media: MediaData[]
}

const MDXCarousel: React.FC<MDXCarouselProps> = ({ isFirstChild, media }) => {
	const [players, setPlayers] = useState<Player[]>([])
	const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([])
	const [activeIndex, setActiveIndex] = useState<number>(0)

	// Helper function to get Vimeo embed URL with all necessary parameters
	const getVimeoEmbedUrl = (videoId: string) => {
		const baseUrl = `https://player.vimeo.com/video/${videoId}`
		const params = new URLSearchParams({
			dnt: '1',
			sharing: '0',
			title: '0',
			byline: '0',
			portrait: '0',
			sidedock: '0',
			controls: '1',
			like: '0',
			embed: '0',
			watchlater: '0'
		})
		return `${baseUrl}?${params.toString()}`
	}

	useEffect(() => {
		const newPlayers: Player[] = []

		iframeRefs.current.forEach((iframe, index) => {
			if (iframe) {
				const player = new Player(iframe)
				newPlayers[index] = player

				player.on('play', () => {
					newPlayers.forEach((otherPlayer, otherIndex) => {
						if (otherIndex !== index) {
							otherPlayer?.pause().catch(console.error)
						}
					})
				})

				player.on('error', (error) => {
					console.error('Vimeo player error:', error)
				})
			}
		})

		setPlayers(newPlayers)

		return () => {
			newPlayers.forEach((player) => {
				player?.destroy().catch(console.error)
			})
		}
	}, [])

	const handleSlideChange = async (index: number) => {
		setActiveIndex(index)
		players.forEach((player) => {
			player?.pause().catch(console.error)
		})
	}

	const NavigationButtons = () => (
		<div
			className={`container mb-6 flex items-center justify-center text-primary max-2xl:section-padding ${isFirstChild ? 'mb-0 mt-6' : ''}`}
		>
			<CarouselPrevious />
			<CarouselNext />
		</div>
	)

	return (
		<Carousel
			carouselOptions={{ align: 'center', loop: true, startIndex: 1 }}
			orientation="horizontal"
			className={`mt-24 select-none overflow-hidden ${isFirstChild ? 'my-0' : ''}`}
		>
			{!isFirstChild && <NavigationButtons />}

			<CarouselMainContainer className="container">
				{media.map((item, index) => (
					<SliderMainItem
						key={item.src}
						className={`container flex max-w-full basis-4/5 cursor-grab flex-col px-1 pb-24 2xl:basis-full ${index === 0 ? '' : ''}`}
						onClick={() => handleSlideChange(index)}
					>
						<div className="relative w-full rounded-lg">
							<iframe
								ref={(el) => (iframeRefs.current[index] = el)}
								className="aspect-video h-auto w-full 2xl:rounded-md"
								src={getVimeoEmbedUrl(item.src)}
								loading="lazy"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								title={item.alt}
								allowFullScreen
							/>
						</div>
						{item.description && (
							<p className="mx-3 mt-3 text-sm text-tertiary md:mx-4 md:mt-4">{item.description}</p>
						)}
					</SliderMainItem>
				))}
			</CarouselMainContainer>

			{isFirstChild && <NavigationButtons />}

			<CarouselThumbsContainer className="hidden">
				{media.map((item, index) => (
					<CarouselIndicator key={item.src} index={index} />
				))}
			</CarouselThumbsContainer>
		</Carousel>
	)
}

export default MDXCarousel
