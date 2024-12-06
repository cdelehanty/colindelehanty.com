import React from 'react'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'
import { buttonVariants } from '../../../components/ui/button'

import { Dialog, DialogContent, DialogClose, DialogHeader } from '@/components/ui/dialog'

import {
	Carousel,
	CarouselPrevious,
	CarouselNext,
	CarouselMainContainer,
	SliderMainItem,
	CarouselThumbsContainer,
	SliderThumbItem
} from '@/components/ui/carousel'

import { galleryData } from '@/_trash/gallery'
import { DialogTitle } from '@radix-ui/react-dialog'

interface LightboxProps {
	open: boolean
	setOpen: (open: boolean) => void
	startIndex: number
}

const Lightbox: React.FC<LightboxProps> = ({ open, setOpen, startIndex }) => {
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="px-[22px]">
				<DialogHeader className="flex w-full items-center justify-between py-5">
					<div className="flex items-center">
						<a
							className="relative flex h-[54px] w-full items-center overflow-hidden pl-1.5 text-lg font-medium tracking-wide text-primary"
							href="/"
							tabIndex={0}
						>
							Colin Delehanty
						</a>
					</div>

					<DialogClose>
						<div
							tabIndex={1}
							className={cn(
								buttonVariants({
									variant: 'secondary',
									size: 'md',
									rounded: 'md'
								}),
								'pointer-events-auto flex'
							)}
						>
							<Icons.X className="size-6" />
						</div>
					</DialogClose>
				</DialogHeader>
				<Carousel
					carouselOptions={{
						duration: 0,
						startIndex: startIndex,
						watchDrag: (emblaApi, event) => {
							if (event instanceof TouchEvent) {
								return true
							}
							return false
						}
					}}
					orientation="horizontal"
					className="flex-1 grid-rows-[1fr_auto]"
				>
					<CarouselMainContainer className="h-full">
						{galleryData.map((item, index) => (
							<SliderMainItem
								key={index}
								className="relative flex basis-full items-center justify-center rounded-md"
							>
								<DialogTitle className="pointer-events-none absolute inset-0 top-0 -mt-[94px] flex h-[94px] w-full items-center justify-center py-5">
									{item.title}
								</DialogTitle>

								<img
									width={1920}
									height={1920}
									src={item.cover}
									alt="descriptive text"
									className="absolute h-auto max-h-full w-auto max-w-full rounded-md bg-transparent shadow-xl md:shadow-[0px_16px_32px_8px_rgba(0,0,0,0.25)]"
								/>
							</SliderMainItem>
						))}
					</CarouselMainContainer>
					<div className="flex items-center justify-center gap-2 py-12">
						<CarouselPrevious />
						<CarouselThumbsContainer className="md:max-w-screen-sm">
							{galleryData.map((item, index) => (
								<SliderThumbItem
									key={index}
									index={index}
									className="max-h-16 max-w-16 md:max-h-none md:max-w-none md:basis-1/7"
								>
									<span className="cursor-pointer">
										<img
											width={720}
											height={360}
											src={item.cover}
											alt="descriptive text"
											className="h-full w-full rounded-md object-cover"
										/>
									</span>
								</SliderThumbItem>
							))}
						</CarouselThumbsContainer>
						<CarouselNext />
					</div>
				</Carousel>
			</DialogContent>
		</Dialog>
	)
}

export default Lightbox
