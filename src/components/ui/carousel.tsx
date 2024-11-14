'use client'

import React, { forwardRef, useCallback, useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronRightIcon } from '@/components/icons'
import { ChevronLeftIcon } from '@/components/icons'
import { cn } from '@/lib/utils'
import { createContext } from 'react'

type CarouselContextProps = {
	carouselOptions?: EmblaOptionsType
	orientation?: 'vertical' | 'horizontal'
	plugins?: Parameters<typeof useEmblaCarousel>[1]
}

type DirectionOption = 'ltr' | 'rtl' | undefined

type CarouselContextType = {
	emblaMainApi: ReturnType<typeof useEmblaCarousel>[1]
	mainRef: ReturnType<typeof useEmblaCarousel>[0]
	thumbsRef: ReturnType<typeof useEmblaCarousel>[0]
	scrollNext: () => void
	scrollPrev: () => void
	canScrollNext: boolean
	canScrollPrev: boolean
	activeIndex: number
	onThumbClick: (index: number) => void
	handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void
	orientation: 'vertical' | 'horizontal'
	direction: DirectionOption
} & CarouselContextProps

const useCarousel = () => {
	const context = useContext(CarouselContext)
	if (!context) {
		throw new Error('useCarousel must be used within a CarouselProvider')
	}
	return context
}

const CarouselContext = createContext<CarouselContextType | null>(null)

/**
 * Carousel Docs: {@link: https://shadcn-extension.vercel.app/docs/carousel}
 */

const Carousel = forwardRef<
	HTMLDivElement,
	CarouselContextProps & React.HTMLAttributes<HTMLDivElement>
>(
	(
		{ carouselOptions, orientation = 'horizontal', dir, plugins, children, className, ...props },
		ref
	) => {
		const [emblaMainRef, emblaMainApi] = useEmblaCarousel(
			{
				...carouselOptions,
				axis: orientation === 'vertical' ? 'y' : 'x',
				direction: carouselOptions?.direction ?? (dir as DirectionOption)
			},
			plugins
		)

		const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel(
			{
				...carouselOptions,
				axis: orientation === 'vertical' ? 'y' : 'x',
				direction: carouselOptions?.direction ?? (dir as DirectionOption),
				containScroll: 'keepSnaps',
				dragFree: false,
				watchDrag: false
			},
			plugins
		)

		const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false)
		const [canScrollNext, setCanScrollNext] = useState<boolean>(false)
		const [activeIndex, setActiveIndex] = useState<number>(0)

		const ScrollNext = useCallback(() => {
			if (!emblaMainApi) return
			emblaMainApi.scrollNext()
		}, [emblaMainApi])

		const ScrollPrev = useCallback(() => {
			if (!emblaMainApi) return
			emblaMainApi.scrollPrev()
		}, [emblaMainApi])

		const direction = carouselOptions?.direction ?? (dir as DirectionOption)

		const handleKeyDown = useCallback(
			(event: React.KeyboardEvent<HTMLDivElement>) => {
				if (!emblaMainApi) return
				switch (event.key) {
					case 'ArrowLeft':
						event.preventDefault()
						if (orientation === 'horizontal') {
							if (direction === 'rtl') {
								ScrollNext()
								return
							}
							ScrollPrev()
						}
						break
					case 'ArrowRight':
						event.preventDefault()
						if (orientation === 'horizontal') {
							if (direction === 'rtl') {
								ScrollPrev()
								return
							}
							ScrollNext()
						}
						break
					case 'ArrowUp':
						event.preventDefault()
						if (orientation === 'vertical') {
							ScrollPrev()
						}
						break
					case 'ArrowDown':
						event.preventDefault()
						if (orientation === 'vertical') {
							ScrollNext()
						}
						break
				}
			},
			// eslint-disable-next-line react-hooks/exhaustive-deps
			[emblaMainApi, orientation, direction]
		)

		const onThumbClick = useCallback(
			(index: number) => {
				if (!emblaMainApi || !emblaThumbsApi) return
				emblaMainApi.scrollTo(index)
			},
			[emblaMainApi, emblaThumbsApi]
		)

		const onSelect = useCallback(() => {
			if (!emblaMainApi || !emblaThumbsApi) return
			const selected = emblaMainApi.selectedScrollSnap()
			setActiveIndex(selected)
			emblaThumbsApi.scrollTo(selected)
			setCanScrollPrev(emblaMainApi.canScrollPrev())
			setCanScrollNext(emblaMainApi.canScrollNext())
		}, [emblaMainApi, emblaThumbsApi])

		useEffect(() => {
			if (!emblaMainApi) return
			onSelect()
			emblaMainApi.on('select', onSelect)
			emblaMainApi.on('reInit', onSelect)
			return () => {
				emblaMainApi.off('select', onSelect)
			}
		}, [emblaMainApi, onSelect])

		return (
			<CarouselContext.Provider
				value={{
					emblaMainApi,
					mainRef: emblaMainRef,
					thumbsRef: emblaThumbsRef,
					scrollNext: ScrollNext,
					scrollPrev: ScrollPrev,
					canScrollNext,
					canScrollPrev,
					activeIndex,
					onThumbClick,
					handleKeyDown,
					carouselOptions,
					direction,
					orientation: orientation || (carouselOptions?.axis === 'y' ? 'vertical' : 'horizontal')
				}}
			>
				<div
					{...props}
					tabIndex={0}
					ref={ref}
					onKeyDownCapture={handleKeyDown}
					className={cn('relative grid w-full focus:outline-none', className)}
					dir={direction}
				>
					{children}
				</div>
			</CarouselContext.Provider>
		)
	}
)

Carousel.displayName = 'Carousel'

const CarouselMainContainer = forwardRef<HTMLDivElement, {} & React.HTMLAttributes<HTMLDivElement>>(
	({ className, dir, children, ...props }, ref) => {
		const { mainRef, orientation, direction } = useCarousel()

		return (
			<div {...props} ref={mainRef} className="overflow-hidden" dir={direction}>
				<div
					ref={ref}
					className={cn('flex', `${orientation === 'vertical' ? 'flex-col' : ''}`, className)}
				>
					{children}
				</div>
			</div>
		)
	}
)

CarouselMainContainer.displayName = 'CarouselMainContainer'

const CarouselThumbsContainer = forwardRef<
	HTMLDivElement,
	{} & React.HTMLAttributes<HTMLDivElement>
>(({ className, dir, children, ...props }, ref) => {
	const { thumbsRef, orientation, direction } = useCarousel()

	return (
		<div {...props} ref={thumbsRef} className="overflow-hidden" dir={direction}>
			<div
				ref={ref}
				className={cn('flex gap-0', `${orientation === 'vertical' ? 'flex-col' : ''}`, className)}
			>
				{children}
			</div>
		</div>
	)
})

CarouselThumbsContainer.displayName = 'CarouselThumbsContainer'

const SliderMainItem = forwardRef<HTMLDivElement, {} & React.HTMLAttributes<HTMLDivElement>>(
	({ className, children, ...props }, ref) => {
		const { orientation } = useCarousel()
		return (
			<div
				{...props}
				ref={ref}
				className={cn(
					`min-w-0 shrink-0 grow-0 basis-full ${orientation === 'vertical' ? 'pb-0' : 'pr-0'}`,
					className
				)}
			>
				{children}
			</div>
		)
	}
)

SliderMainItem.displayName = 'SliderMainItem'

const SliderThumbItem = forwardRef<
	HTMLDivElement,
	{
		index: number
	} & React.HTMLAttributes<HTMLDivElement>
>(({ className, index, children, ...props }, ref) => {
	const { activeIndex, onThumbClick, orientation } = useCarousel()
	const isSlideActive = activeIndex === index
	return (
		<div
			{...props}
			ref={ref}
			onClick={() => onThumbClick(index)}
			className={cn(
				'flex size-10 min-w-0 shrink-0 grow-0 gap-2 p-2',
				`${orientation === 'vertical' ? 'pb-1' : 'pr-1'}`,
				className
			)}
		>
			<div
				className={`relative aspect-square w-full rounded-none opacity-50 transition-opacity ${
					isSlideActive ? '!opacity-100' : ''
				}`}
			>
				{children}
			</div>
		</div>
	)
})

SliderThumbItem.displayName = 'SliderThumbItem'

const CarouselIndicator = forwardRef<
	HTMLButtonElement,
	{ index: number } & React.ComponentProps<typeof Button>
>(({ className, index, children, ...props }, ref) => {
	const { activeIndex, onThumbClick } = useCarousel()
	const isSlideActive = activeIndex === index

	return (
		<Button
			ref={ref}
			size="icon"
			rounded="none"
			className={cn('item-center flex h-5 w-5 justify-center p-0', className)}
			data-active={isSlideActive}
			onClick={() => onThumbClick(index)}
			{...props}
		>
			<div className={cn('size-2 rounded-full', isSlideActive ? 'bg-white' : 'bg-white/50')}></div>
			<span className="sr-only">slide {index + 1}</span>
		</Button>
	)
})

CarouselIndicator.displayName = 'CarouselIndicator'

const CarouselPrevious = forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
	({ className, dir, variant = 'secondary', size = 'icon', rounded = 'none', ...props }, ref) => {
		const { canScrollNext, canScrollPrev, scrollNext, scrollPrev, orientation, direction } =
			useCarousel()

		const scroll = direction === 'rtl' ? scrollNext : scrollPrev
		const canScroll = direction === 'rtl' ? canScrollNext : canScrollPrev
		return (
			<Button
				ref={ref}
				variant={variant}
				size={size}
				rounded={rounded}
				className={cn('z-10 h-10 w-10', className)}
				onClick={scroll}
				disabled={!canScroll}
				{...props}
			>
				<ChevronLeftIcon className="h-5 w-5 text-primary" />
				<span className="sr-only">Previous slide</span>
			</Button>
		)
	}
)
CarouselPrevious.displayName = 'CarouselPrevious'

const CarouselNext = forwardRef<HTMLButtonElement, React.ComponentProps<typeof Button>>(
	({ className, dir, variant = 'secondary', size = 'icon', rounded = 'none', ...props }, ref) => {
		const { canScrollNext, canScrollPrev, scrollNext, scrollPrev, orientation, direction } =
			useCarousel()
		const scroll = direction === 'rtl' ? scrollPrev : scrollNext
		const canScroll = direction === 'rtl' ? canScrollPrev : canScrollNext
		return (
			<Button
				ref={ref}
				variant={variant}
				size={size}
				rounded={rounded}
				className={cn('z-10 h-10 w-10', className)}
				onClick={scroll}
				disabled={!canScroll}
				{...props}
			>
				<ChevronRightIcon className="h-5 w-5 text-primary" />
				<span className="sr-only">Next slide</span>
			</Button>
		)
	}
)

CarouselNext.displayName = 'CarouselNext'

export {
	Carousel,
	CarouselMainContainer,
	CarouselThumbsContainer,
	SliderMainItem,
	SliderThumbItem,
	CarouselIndicator,
	CarouselPrevious,
	CarouselNext,
	useCarousel
}
