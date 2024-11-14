import { useEffect } from 'react'
import type { UseEmblaCarouselType } from 'embla-carousel-react'

interface useHeroCarouselProps {
	carouselApi: UseEmblaCarouselType[1] | undefined
	onSelect: (index: number) => void
}

export const useHeroCarousel = ({ carouselApi, onSelect }: useHeroCarouselProps) => {
	useEffect(() => {
		if (!carouselApi) return

		const handleSelect = () => {
			onSelect(carouselApi.selectedScrollSnap())
		}

		carouselApi.on('select', handleSelect)
		return () => {
			carouselApi.off('select', handleSelect)
		}
	}, [carouselApi, onSelect])
}
