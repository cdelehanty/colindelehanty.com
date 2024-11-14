import { cn } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { buttonVariants } from '@/components/ui/button'
import { CarouselMainContainer, SliderMainItem, useCarousel } from '@/components/ui/carousel'
import { useVideoControls } from '@/features/projects/components/carousel/hooks/use-video-controls'
import { useHeroCarousel } from '@/features/projects/components/carousel/hooks/use-hero-carousel'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage, lazyload } from '@cloudinary/react'
import { fill } from '@cloudinary/url-gen/actions/resize'

import {
	Dialog,
	DialogContent,
	DialogOverlay,
	DialogTrigger,
	DialogPortal,
	DialogTitle,
	DialogDescription
} from '@/components/ui/dialog'

interface DataItem {
	data: {
		category?: string
		title: string
		description: string
		cover: string
		video: string
	}
	slug: string
}

interface HeroCarouselContainerProps {
	data: DataItem[]
	videoControls: ReturnType<typeof useVideoControls>
}

const cld = new Cloudinary({
	cloud: {
		cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME
	}
})

const HeroCarouselContainer: React.FC<HeroCarouselContainerProps> = ({ data, videoControls }) => {
	const carousel = useCarousel()
	const { videoRefs, setCurrentIndex, currentIndex, handleVideoPlayback } = videoControls
	const [initialLoadComplete, setInitialLoadComplete] = useState(false)

	useEffect(() => {
		const timer = setTimeout(() => {
			setInitialLoadComplete(true)
		}, 5000)

		return () => clearTimeout(timer)
	}, [])

	useHeroCarousel({
		carouselApi: carousel.emblaMainApi,
		onSelect: setCurrentIndex
	})

	return (
		<CarouselMainContainer className="relative">
			{data.map((dataItem, index) => (
				<SliderMainItem key={dataItem.slug} className="relative flex basis-full items-end">
					<article
						title={dataItem.data.title}
						className="section-padding relative flex h-[85vh] max-h-[1080px] min-h-[540px] w-full pb-[44px] md:h-[768px] md:pb-[200px] md:pt-[56px] 2xl:h-[1080px]"
					>
						<HeroCarouselCard
							currentIndex={currentIndex}
							index={index}
							dataItem={dataItem}
							slug={dataItem.slug}
						/>
						<BackgroundVideo
							cover={dataItem.data.cover}
							videoRefs={videoRefs}
							index={index}
							videoSrc={dataItem.data.video}
							slug={dataItem.slug}
							initialLoadComplete={initialLoadComplete}
							currentIndex={currentIndex}
							handleVideoPlayback={handleVideoPlayback} // Pass the function
						/>
					</article>
				</SliderMainItem>
			))}
		</CarouselMainContainer>
	)
}

const HeroCarouselCard: React.FC<{
	index: number
	currentIndex: number
	dataItem: DataItem
	slug: string
}> = ({ dataItem, index, currentIndex, slug }) => {
	const { title, category, description } = dataItem.data
	const [isSmallScreen, setIsSmallScreen] = useState(false)

	useEffect(() => {
		// Function to check screen size
		const checkScreenSize = () => {
			setIsSmallScreen(window.matchMedia('(max-width: 768px)').matches)
		}

		// Initial check
		checkScreenSize()

		// Add event listener for window resize
		window.addEventListener('resize', checkScreenSize)

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener('resize', checkScreenSize)
		}
	}, [])

	// Only render the card if the index matches the currentIndex or if it's a small screen
	if (!isSmallScreen && index !== currentIndex) {
		return null
	}

	return (
		<div className="container pointer-events-auto relative z-30 flex select-none items-end focus:outline-none md:items-center">
			{index > 0 && (
				<a
					href={`/work/${slug}/`}
					className="absolute inset-0 top-0 flex w-full max-md:mb-[44px] max-md:mt-14 max-md:h-[calc(90vh-100px)]"
				></a>
			)}

			<div className="absolute flex flex-col text-center md:max-w-3xl md:text-left">
				{index !== 0 && <Label className="animate-revealHero1 reveal capitalize">{category}</Label>}
				<h1 className="animate-revealHero1 reveal mb-1 w-full text-display-md font-semibold text-primary md:mb-5 md:text-display-2xl">
					{title}
				</h1>
				<p className="animate-revealHero2 reveal text-base font-normal text-secondary max-md:line-clamp-2 md:text-xl">
					{description}
				</p>
				<div className="animate-revealHero3 reveal my-2 flex gap-2 max-md:flex-col md:mb-6 md:mt-10">
					{index === 0 && (
						<a
							href="/work"
							className={cn(
								buttonVariants({
									variant: 'secondary',
									size: 'md',
									rounded: 'full'
								}),
								'pointer-events-auto max-md:rounded-md'
							)}
						>
							<span>See all work</span>
						</a>
					)}
					<div className="flex items-center justify-center">
						{index === 0 && (
							<Dialog>
								<DialogTrigger>
									<div
										className={cn(
											buttonVariants({
												variant: 'link',
												size: 'md',
												rounded: 'full'
											}),
											'pointer-events-auto max-md:rounded-md'
										)}
									>
										<span>Play Showreel</span>
									</div>
								</DialogTrigger>
								<DialogPortal>
									<DialogOverlay className="z-50 bg-black" />
									<DialogContent className="container section-padding left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%]">
										<DialogTitle className="sr-only">Main Navigation</DialogTitle>
										<DialogDescription className="sr-only">
											This is the main navigation menu.
										</DialogDescription>
										<div className="aspect-video w-full">
											<iframe
												className="h-full w-full rounded-md"
												src="https://player.vimeo.com/video/1029126288?title=0&byline=0&portrait=0&fullscreen=1"
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
												allowFullScreen
											/>
										</div>
									</DialogContent>
								</DialogPortal>
							</Dialog>
						)}
					</div>
					{index > 0 && (
						<a
							href={`/work/${slug}/`}
							className={cn(
								buttonVariants({
									variant: 'secondary',
									size: 'md',
									rounded: 'full'
								}),
								'pointer-events-auto max-md:rounded-md'
							)}
						>
							<span>View project</span>
						</a>
					)}
				</div>
			</div>
		</div>
	)
}

interface BackgroundVideoProps {
	videoRefs: React.MutableRefObject<(HTMLVideoElement | null)[]>
	index: number
	videoSrc: string
	slug: string
	cover: string
	initialLoadComplete: boolean
	currentIndex: number
	handleVideoPlayback: (index: number, initialLoadComplete: boolean) => void
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
	videoRefs,
	index,
	videoSrc,
	cover,
	initialLoadComplete,
	currentIndex,
	handleVideoPlayback
}) => {
	const [videoUrl, setVideoUrl] = useState<string | null>(null)

	useEffect(() => {
		const url = cld.video(videoSrc).quality('auto').format('auto').toURL()
		setVideoUrl(url)
	}, [videoSrc])

	useEffect(() => {
		handleVideoPlayback(index, initialLoadComplete)
	}, [initialLoadComplete, index, currentIndex, handleVideoPlayback])

	if (!videoUrl) {
		return null
	}

	return (
		<div className="animate-fade fade absolute inset-0 bottom-0 left-0 right-0 top-0 w-full select-none after:absolute after:bottom-0 after:left-0 after:z-50 after:h-full after:w-full after:bg-gradient-to-t after:from-black after:to-transparent">
			<AdvancedImage
				cldImg={cld
					.image(cover)
					.resize(fill().width(1920).height(1080))
					.quality('auto')
					.format('auto')}
				alt="Cover Image"
				className="absolute h-full w-full object-cover"
			/>
			{/* <video
				ref={(el) => {
					if (el && videoRefs.current) {
						videoRefs.current[index] = el
					}
				}}
				preload="auto"
				playsInline
				muted={true}
				className="absolute h-full w-full object-cover opacity-0"
			>
				<source src={videoSrc} type="video/mp4" />
				Your browser does not support the video tag.
			</video> */}
		</div>
	)
}

export default HeroCarouselContainer
