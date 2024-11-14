interface PostProps {
	data: {
		title: string
		subtitle?: string
		cover: string
		category: string
		dark?: boolean
	}
	slug: string
}

const PostCard: React.FC<PostProps> = ({ data, slug }) => {
	return (
		<article title={data.title} className="h-auto max-w-full">
			<a
				href={`/blog/${slug}/`}
				className={`relative h-full w-full space-y-2 ${data.dark ? 'text-black' : 'text-white'}`}
			>
				<div className="relative aspect-[3/4] w-full rounded-md">
					<img
						loading="eager"
						className="h-full w-full object-cover object-center"
						width={720}
						height={960}
						src={data.cover}
						alt="descriptive text"
					/>
				</div>

				<div
					className={`absolute inset-0 flex flex-col justify-between p-4 ${data.dark ? 'text-[#fafafa]' : 'text-[#18181b]'}`}
				>
					<span className="text-step--1 font-normal capitalize">{data.category}</span>
					<div className="text-step-0 xl:text-step-0 font-semibold">
						{data.title}
						<br />
						{data.subtitle}
					</div>
				</div>
			</a>
		</article>
	)
}

export default PostCard
