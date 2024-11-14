import {
	Carousel,
	CarouselMainContainer,
	SliderMainItem,
	CarouselPrevious,
	CarouselNext,
	CarouselThumbsContainer,
	CarouselIndicator
} from '@/components/ui/carousel'

import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage } from '@cloudinary/react'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { lazyload } from '@cloudinary/react'

interface ImageData {
	src: string
	alt: string
	title?: string
	description?: string
}

interface MDXCarouselProps {
	title?: string
	images: ImageData[]
}

const MDXCarousel: React.FC<MDXCarouselProps> = ({ images }) => {
	const cld = new Cloudinary({
		cloud: {
			cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME
		}
	})

	return (
		<Carousel
			carouselOptions={{ align: 'center', loop: true, startIndex: 1 }}
			orientation="horizontal"
			className="my-32 select-none overflow-hidden"
		>
			<div className="container mb-6 flex items-center justify-center text-primary max-2xl:section-padding">
				<CarouselPrevious />
				<CarouselNext />
			</div>
			<CarouselMainContainer className="container">
				{images.map((image, index) => (
					<SliderMainItem
						key={index}
						className="flex-start flex max-w-full basis-4/5 px-1 lg:basis-auto 2xl:pr-1"
					>
						<div className="relative w-full cursor-grab">
							<AdvancedImage
								cldImg={cld.image(image.src).resize(fill()).quality('auto').format('auto')}
								plugins={[lazyload()]}
								className="aspect-auto h-[448px] w-auto object-cover object-center md:h-[640px] 2xl:h-[800px] 2xl:rounded-lg"
								alt={image.description || image.alt}
							/>
						</div>
					</SliderMainItem>
				))}
			</CarouselMainContainer>
			<CarouselThumbsContainer className="hidden">
				{images.map((item, index) => (
					<CarouselIndicator key={item.src} index={index} />
				))}
			</CarouselThumbsContainer>
		</Carousel>
	)
}

export default MDXCarousel
