// components/LightboxMobile.tsx
import React from 'react'
import { cn } from '@/lib/utils'
import * as Icons from 'lucide-react'
import { buttonVariants } from '../../../components/ui/button'
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerDescription,
	DrawerClose,
	DrawerOverlay,
	DrawerTitle,
	DrawerFooter,
	DrawerPortal
} from '@/_trash/drawer'
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

interface LightboxMobileProps {
	open: boolean
	setOpen: (open: boolean) => void
	startIndex: number
}

const LightboxMobile: React.FC<LightboxMobileProps> = ({
	open,
	setOpen,
	startIndex
}) => {
	return (
		<Drawer open={open} direction="bottom" onOpenChange={setOpen}>
			<DrawerContent className="h-full">
				<div className="flex w-full items-center justify-between px-3 py-2">
					<DrawerClose>
						<div
							className={cn(
								buttonVariants({
									variant: 'secondary',
									size: 'md',
									rounded: 'md'
								}),
								'pointer-events-auto flex px-0'
							)}
						>
							<Icons.ChevronDown className="size-6" />
						</div>
					</DrawerClose>
				</div>
				<Carousel
					carouselOptions={{
						duration: 0,
						startIndex: startIndex,
						align: 'center',
						watchDrag: (emblaApi, event) => {
							if (event instanceof TouchEvent) {
								return true
							}
							return false
						}
					}}
					orientation="horizontal"
					className="h-full min-w-0 grid-rows-[1fr_auto] px-3"
				>
					<CarouselMainContainer className="h-full">
						{galleryData.map((item, index) => (
							<SliderMainItem
								key={index}
								className="max-w-auto relative flex max-h-full max-w-full basis-full items-center justify-center rounded-md"
							>
								<DrawerHeader className="pointer-events-none absolute inset-0 top-0 -mt-[56px] flex h-[56px] w-full items-center justify-center">
									{item.title}
								</DrawerHeader>
								<img
									width={1920}
									height={1920}
									src={item.cover}
									alt="descriptive text"
									className="absolute max-h-full w-auto max-w-full rounded-md object-contain shadow-xl md:shadow-[0px_16px_32px_8px_rgba(0,0,0,0.25)]"
								/>
							</SliderMainItem>
						))}
					</CarouselMainContainer>
					<div className="flex items-center justify-center p-0 py-3">
						<CarouselThumbsContainer className="md:max-w-screen-sm">
							{galleryData.map((item, index) => (
								<SliderThumbItem
									key={index}
									index={index}
									className="max-h-[56px] max-w-[56px] md:max-h-none md:max-w-none md:basis-1/7"
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
					</div>
				</Carousel>
			</DrawerContent>
		</Drawer>
	)
}

export default LightboxMobile
