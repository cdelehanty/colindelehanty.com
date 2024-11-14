import React from 'react'
import { Carousel } from '@/components/ui/carousel'
import { useVideoControls } from '@/features/projects/components/carousel/hooks/use-video-controls'
import HeroCarouselContainer from '@/features/projects/components/carousel/hero-carousel-container'
import VideoControls from '@/features/projects/components/carousel/video-controls'

interface HeroCarouselProps {
	data: any[]
	className?: string
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ data }) => {
	const videoControls = useVideoControls()
	const { isPaused, togglePause, currentIndex } = videoControls

	const slidesCount = data.length

	return (
		<Carousel
			carouselOptions={{
				duration: 0
			}}
			orientation="horizontal"
			className="relative overflow-hidden"
		>
			<HeroCarouselContainer data={data} videoControls={videoControls} />
			<VideoControls
				currentIndex={currentIndex}
				slidesCount={slidesCount}
				togglePause={togglePause}
				isPaused={isPaused}
				className="md:bottom-[200px]"
			/>
		</Carousel>
	)
}

export default HeroCarousel
