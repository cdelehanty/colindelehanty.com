import { cn } from '@/lib/utils'
import {
	Carousel,
	CarouselNext,
	SliderMainItem,
	CarouselMainContainer,
	CarouselPrevious,
	CarouselIndicator,
	CarouselThumbsContainer
} from '@/components/ui/carousel'

import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage, lazyload } from '@cloudinary/react'
import { fill } from '@cloudinary/url-gen/actions/resize'

interface DataItem {
	data: {
		cover: string
		title: string
		subtitle?: string
		video?: string
		category?: string
		description?: string
	}
	slug?: string
}

interface SliderCarouselProps {
	data: DataItem[]
	className?: string
	title: string
	description?: string
	href?: string
	lazy?: boolean
}

const cld = new Cloudinary({
	cloud: {
		cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME
	}
})

const SliderCarousel: React.FC<SliderCarouselProps> = ({
	data,
	className,
	title,
	description,
	href,
	lazy = true
}) => {
	return (
		<section className={cn('section-padding pt-6 md:pt-24', className)}>
			<Carousel
				carouselOptions={{
					duration: 20,
					align: 'start'
				}}
				orientation="horizontal"
				className="flex select-none flex-col items-center"
			>
				<div className="container flex items-center justify-between py-3 text-primary">
					<header className="flex h-10 w-full flex-col justify-center">
						<a href={`/work/${href}`}>
							<h2 className="text-lg font-semibold capitalize text-brand-secondary md:text-xl">
								{title}
							</h2>
						</a>
						<p className="text-base font-normal text-tertiary md:text-lg">{description}</p>
					</header>
					{data.length > 2 && (
						<>
							<CarouselPrevious className="" />
							<CarouselNext className="" />
						</>
					)}
				</div>

				<CarouselMainContainer className="container">
					{data.map((dataItem, index) => {
						const largeImage = cld
							.image(dataItem.data.cover)
							.resize(fill().width(468).height(624))
							.quality('auto')
							.format('auto')

						const smallImage = cld
							.image(dataItem.data.cover)
							.resize(fill().width(600).height(800))
							.quality('auto')
							.format('auto')
						return (
							<SliderMainItem
								key={index}
								className="relative flex max-w-full basis-4/5 flex-col pr-3 md:basis-1/2 lg:basis-1/3 2xl:pr-3"
							>
								<a
									href={`/work/${dataItem.slug}/`}
									className="relative w-full overflow-hidden rounded-sm after:absolute after:bottom-0 after:left-0 after:h-full after:w-full after:bg-gradient-to-b after:from-transparent after:via-transparent after:via-65% after:to-black/25 after:transition-colors after:duration-300 after:hover:bg-black/25"
								>
									{/* Commented out AdvancedImage for development */}
									<AdvancedImage
										plugins={lazy ? [lazyload()] : []}
										cldImg={largeImage}
										alt={dataItem.data?.title}
										className="relative aspect-3/4 rounded-sm object-cover object-center after:absolute after:bottom-0 after:left-0 after:h-full after:w-full after:bg-gradient-to-t after:from-black after:to-transparent"
										sizes="(max-width: 767px) 600px, (min-width: 768px) 468px"
										srcSet={`${smallImage.toURL()} 600w, ${largeImage.toURL()} 468w`}
									/>
									{/* <img
										src={`${dataItem.data.cover.includes('png') ? `${dataItem.data.cover}.png` : dataItem.data.cover}.jpg`}
										alt={dataItem.data?.title}
										className="relative aspect-3/4 rounded-sm object-cover object-center after:absolute after:bottom-0 after:left-0 after:h-full after:w-full after:bg-gradient-to-t after:from-black after:to-transparent"
									/> */}
									{/* <div className="pointer-events-auto absolute inset-0 bottom-0 left-0 right-0 top-0 z-40 bg-black opacity-0 transition-opacity duration-300 hover:opacity-50"></div> */}
								</a>
								<div className="pointer-events-none absolute inset-0 z-50 flex flex-col justify-end p-4 md:p-[18px]">
									{/* <span className="text-xs font-normal capitalize">{dataItem.data.category}</span> */}
									<div className="mt-6 flex flex-col">
										<div className="truncate text-lg font-normal text-primary">
											{dataItem.data?.title}
										</div>
										{dataItem.data?.subtitle && (
											<span className="truncate text-lg font-normal text-primary">
												{dataItem.data.subtitle}
											</span>
										)}
									</div>
								</div>
							</SliderMainItem>
						)
					})}
				</CarouselMainContainer>
				<CarouselThumbsContainer className="hidden">
					{data.map((_, index) => (
						<CarouselIndicator key={index} index={index}></CarouselIndicator>
					))}
				</CarouselThumbsContainer>
			</Carousel>
		</section>
	)
}

export default SliderCarousel
