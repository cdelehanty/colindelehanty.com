import type { InfoConfig, ClientItem, FilmItem, MiscItem } from './info'

export const infoConfig: InfoConfig = {
	clientData: [
		{
			name: 'Mountain Hardware'
		},
		{
			name: 'Apple',
			logo: 'about/Apple_Logo',
			projects: [
				{
					title: 'Apple Park',
					cover: 'work/ApplePark/ApplePark_Cover',
					slug: 'rainbow-stage'
				}
			]
		},
		{
			name: 'Gensler',
			logo: 'about/Gensler_Logo',
			projects: [
				{ cover: 'work/FogCity_Cover', title: '88 Kearny', slug: '88-kearny' }
			]
		},
		{
			name: 'Obscura Digital',
			logo: 'about/Obscura_Logo',
			projects: [
				{
					cover: 'work/ArtOnTheMart_Cover',
					title: 'Art on The Mart',
					slug: 'art-on-the-mart'
				},
				{
					cover: 'work/MGMCotai_Cover',
					title: 'MGM Cotai',
					slug: 'mgm-cotai'
				}
			]
		},
		{
			name: 'MGM Resorts'
		},
		{
			name: 'American Express'
		},
		{
			name: 'BorrowLenses'
		},
		{
			name: 'MSG Sphere'
		},
		{
			name: 'Time'
		},
		{
			name: 'Matador Network'
		},
		{
			name: 'Vimeo'
		},
		{
			name: 'Planet Granite'
		},
		{
			name: 'Salesforce'
		},
		{
			name: 'Airbnb',
			logo: 'about/Airbnb_Logo',
			project: {
				cover: 'work/GTC_Cover',
				title: 'Airbnb Experiences',
				slug: '/work/airbnb-experiences'
			}
		},
		{ name: 'Lululemon', logo: 'about/Lululemon_Logo' },
		{ name: 'Nike', logo: 'about/Nike_Logo' },
		{ name: 'Vice Media', logo: 'about/Vice_Logo' },
		{ name: 'Red Bull', logo: 'about/RedBull_Logo' },
		{ name: 'Colorado Tourism', logo: 'about/Colorado_Logo' },
		{ name: 'Discovery Channel', logo: 'about/Discovery_Logo' },
		{ name: 'Onewheel', logo: 'about/OneWheel_Logo' },
		{ name: 'Built Robotics', logo: 'about/BuildRobotics_Logo' },
		{ name: 'Juniper Networks', logo: 'about/JuniperNetworks_Logo' },
		{ name: 'Monster Cable', logo: 'about/Monster_Logo' }
	] as ClientItem[],
	filmData: [
		{
			title: 'The Dawn Wall',
			poster: 'about/TheDawnWall_Poster',
			category: 'Documentary',
			role: 'Additional Camera',
			year: 2017,
			link: 'https://www.imdb.com/title/tt7286916/'
		},
		{
			title: 'Woman',
			poster: 'about/Woman_Poster',
			category: 'Short',
			role: 'Director of Photography',
			year: 2017,
			link: 'https://www.imdb.com/title/tt6893174/'
		},
		{
			title: 'Into Twin Galaxies',
			poster: 'work/IntoTwinGalaxies_Cover',
			category: 'Documentary',
			role: 'Assistant Camera',
			year: 2016,
			link: 'https://www.imdb.com/title/tt6409580/'
		},
		{
			title: 'No Legs. All Heart',
			poster: 'about/NoLegsAllHeart_Poster',
			category: 'Documentary',
			role: 'Additional Camera',
			year: 2016,
			link: 'https://www.imdb.com/title/tt26937219/'
		},
		{
			title: 'The Fairy',
			poster: 'about/TheFairy_Poster',
			category: 'Short',
			role: 'Director of Photography',
			year: 2016,
			link: 'https://www.imdb.com/title/tt5449466/'
		},
		{
			title: 'Wild Horse Resolution',
			poster: 'about/FinAndFurFilms_Logo',
			category: 'Documentary Short',
			role: 'Additional Camera',
			year: 2016,
			link: 'https://vimeo.com/167879439'
		},
		{
			title: 'Texas Last Frontier',
			poster: 'about/FinAndFurFilms_Logo',
			category: 'Documentary Short',
			role: 'Additional Camera',
			year: 2015,
			link: 'https://vimeo.com/210499579'
		},
		{
			title: 'Valley Uprising',
			poster: 'work/ValleyUprising_Cover',
			category: 'Documentary',
			role: 'Additional Camera',
			year: 2014,
			link: 'https://www.imdb.com/title/tt3784160/'
		},
		{
			title: 'Reel Rock 7 | Honnold 3.0',
			poster: 'work/Honnold3.0_Cover',
			category: 'Documentary Short',
			role: 'Additional Camera',
			year: 2012,
			link: 'https://www.imdb.com/title/tt2826922/'
		},
		{
			title: 'Project Yosemite',
			poster: 'about/ProjectYosemite_Poster',
			category: 'Short Film',
			role: 'Co-Creator',
			year: 2012,
			link: undefined
		}
	] as FilmItem[],
	miscData: [
		{
			title: 'Capturing Change Timelapse Workshop',
			publication: 'Creative Live',
			type: 'Workshop',
			year: 2019,
			link: 'https://www.creativelive.com/class/capturing-change-timelapse-workshop-colin-delehanty-wildist'
		},
		{
			title: 'Capturing The Magic Of Mountains',
			publication: 'Do Lectures USA',
			type: 'Talk',
			year: 2014,
			link: 'https://thedolectures.com/talks/capturing-the-magic-of-mountains/'
		},
		{
			title: 'Stunning Time-Lapse Video Shows Rare Views of Yosemite',
			publication: 'National Geographic',
			type: 'Article',
			year: 2014,
			link: 'https://www.nationalgeographic.com/adventure/article/140309-yosemite-national-park-time-lapse-video'
		},
		{
			title:
				'Over 200 Miles of Yosemite Backpacking in One Incredible Time-lapse',
			publication: 'io9',
			type: 'Article',
			year: 2014,
			link: 'https://io9.gizmodo.com/over-200-miles-of-yosemite-backpacking-in-one-incredibl-1533575187'
		},
		{
			title:
				'This Glorious Yosemite Time-Lapse Makes Us Want to Head to California Right Now',
			publication: 'Petapixel',
			type: 'Article',
			year: 2014,
			link: 'http://petapixel.com/2014/03/04/glorious-yosemite-time-lapse-makes-us-want-head-straight-california/'
		},
		{
			title:
				"Incredibly Beautiful Yosemite Time-Lapse Video Reminds Us What We're Protecting",
			publication: 'The Huffington Post',
			type: 'Article',
			year: 2014,
			link: 'http://www.huffingtonpost.com/2014/03/03/yosemite-time-lapse-video_n_4892441'
		},
		{
			title:
				"Here's 'Yosemite HD II': The Stunning Sequel to a Viral Time-Lapse Vid",
			publication: 'Vox',
			type: 'Article',
			year: 2014,
			link: 'https://www.vox.com/2014/2/28/11624046/heres-yosemite-hd-ii-the-stunning-sequel-to-a-viral-time-lapse-vid'
		},
		{
			title: "Time-lapse images' moving Yosemite views",
			publication: 'San Francisco Chronicle',
			type: 'Article',
			year: 2012,
			link: 'https://www.sfgate.com/art/article/Time-lapse-images-moving-Yosemite-views-3968311.php'
		},
		{
			title:
				"Yosemite's Most Spectacular Vistas in Photographs and Time-Lapse Video",
			publication: 'The Atlantic',
			type: 'Article',
			year: 2012,
			link: 'https://www.theatlantic.com/video/archive/2012/01/yosemites-most-spectacular-vistas-in-photographs-and-time-lapse-video/468525/'
		},
		{
			title:
				'Stunning time-lapsed video of Yosemite shows the beauty of the California national park',
			publication: 'Daily mail',
			type: 'Article',
			year: 2012,
			link: 'http://www.dailymail.co.uk/news/article-2089874/Stunning-time-lapsed-video-Yosemite-shows-beauty-California-national-park'
		}
	] as MiscItem[]
}
