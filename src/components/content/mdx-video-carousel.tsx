import { useRef } from 'react'
import {
	Carousel,
	CarouselMainContainer,
	SliderMainItem,
	CarouselThumbsContainer,
	CarouselIndicator,
	CarouselPrevious,
	CarouselNext
} from '@/components/ui/carousel'

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
	const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([])

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
			className={`my-32 select-none overflow-hidden ${isFirstChild ? 'my-0' : ''}`}
		>
			{!isFirstChild && <NavigationButtons />}

			<CarouselMainContainer className="container">
				{media.map((item, index) => (
					<SliderMainItem
						key={item.src}
						className="container flex max-w-full basis-4/5 cursor-grab flex-col px-1 2xl:basis-full"
					>
						<div className="relative w-full rounded-lg">
							<iframe
								ref={(el) => (iframeRefs.current[index] = el)}
								className="aspect-video h-auto w-full 2xl:rounded-md"
								src={`https://player.vimeo.com/video/${item.src}?dnt=1&sharing=0&title=0&byline=0&portrait=0&sidedock=0&controls=1&like=0&embed=0&watchlater=0`}
								loading="lazy"
								allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerPolicy="strict-origin-when-cross-origin"
								title={item.alt}
								allowFullScreen
							/>
						</div>
						{item.description && (
							<p className="mx-3 mt-3 text-sm text-tertiary md:mx-4 md:mt-4">
								{item.description}
							</p>
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
