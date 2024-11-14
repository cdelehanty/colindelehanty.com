import { cn } from '@/lib/utils'

import { Pause, Play } from 'lucide-react'
import { CarouselThumbsContainer, CarouselIndicator } from '@/components/ui/carousel'

import React, { useState, useEffect } from 'react'

interface VideoControlsProps {
	togglePause: () => void
	isPaused: boolean
	slidesCount: number
	currentIndex: number
	className?: string
}

const VideoControls: React.FC<VideoControlsProps> = ({
	togglePause,
	isPaused,
	slidesCount,
	currentIndex,
	className
}) => {
	const indicators = Array.from({ length: slidesCount }).map((_, index) => (
		<CarouselIndicator key={index} index={index} />
	))

	return (
		<div
			className={cn(
				// grid-cols-[1fr_auto_1fr]
				'reveal animate-revealContent pointer-events-none absolute inset-0 bottom-0 left-0 top-auto z-20 grid h-[44px] w-full items-center justify-center gap-2',
				className
			)}
		>
			<div
				// md:bg-utility-gray-300/50
				className="mg:backdrop-blur-lg pointer-events-auto col-span-1 col-start-2 grid p-1.5 md:rounded-2xl"
			>
				<CarouselThumbsContainer>{indicators}</CarouselThumbsContainer>
			</div>

			{/* <button
				onClick={togglePause}
				className="pointer-events-auto hidden w-min rounded-full bg-utility-gray-300/50 p-[8px] backdrop-blur-sm md:block"
				aria-label={isPaused ? 'Play' : 'Pause'}
			>
				{isPaused ? <Play size={16} /> : <Pause size={16} />}
			</button> */}
		</div>
	)
}

export default VideoControls
