import React, { useState } from 'react'
import Masonry from 'react-masonry-css'
import { useMediaQuery } from '../hooks/use-media-querey'
import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage } from '@cloudinary/react'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { lazyload } from '@cloudinary/react'

interface MasonryGridProps {
	items: string[]
}

const cld = new Cloudinary({
	cloud: {
		cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME
	}
})

const MasonryGrid: React.FC<MasonryGridProps> = ({ items }) => {
	const [startIndex, setstartIndex] = useState<number>(0)
	const [open, setOpen] = useState(false)
	const isDesktop = useMediaQuery('(min-width: 768px)')

	const handleOpenLightbox = (index: number) => {
		setstartIndex(index)
		setOpen(true)
	}

	return (
		<div className="container">
			<div className="overflow-hidden">
				<Masonry
					breakpointCols={{
						default: 3,
						1280: 2,
						768: 1
					}}
					className="flex w-auto gap-1"
				>
					{items.map((url, index) => {
						const cldImg = cld.image(url).resize(fill().width(480)).format('auto').quality('auto')

						const srcSet = [
							`${cld.image(url).resize(fill().width(480)).format('auto').quality('auto').toURL()} 480w`, // 1/3 width at desktop
							`${cld.image(url).resize(fill().width(640)).format('auto').quality('auto').toURL()} 640w`, // 1/2 width at tablet
							`${cld.image(url).resize(fill().width(768)).format('auto').quality('auto').toURL()} 768w` // Full width at mobile
						].join(', ')

						const sizes = '(max-width: 768px) 768px, (max-width: 1280px) 640px, 480px'

						return (
							<AdvancedImage
								key={index}
								cldImg={cldImg}
								plugins={[lazyload()]}
								className="mb-1 h-auto w-full"
								srcSet={srcSet}
								sizes={sizes}
							/>
						)
					})}
				</Masonry>
			</div>
			{/* {isDesktop ? (
        <Lightbox open={open} setOpen={setOpen} startIndex={startIndex} />
      ) : (
        <LightboxMobile open={open} setOpen={setOpen} startIndex={startIndex} />
      )} */}
		</div>
	)
}

export default MasonryGrid
