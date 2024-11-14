import { getCollection } from 'astro:content'

interface Project {
	slug: string
	data: {
		excluded?: boolean
		date: Date
		category?: string[]
		featured?: boolean
	}
}

export async function getCategories() {
	const projects: Project[] = (await getCollection('work')) as Project[]
	const categories = [
		...new Set(projects.map((project: Project) => project.data.category ?? []).flat())
	]
	categories.sort()
	return categories
}

export async function getProjects() {
	const projects = ((await getCollection('work')) as Project[])
		.filter((project: Project) => !project.data.excluded)
		.sort((a: Project, b: Project) => b.data.date.valueOf() - a.data.date.valueOf())
	return projects
}

export async function getProjectsByCategory(category: string) {
	const projects = ((await getCollection('work')) as Project[])
		.filter(
			(project: Project) => project.data.category?.includes(category) && !project.data.excluded
		)
		.sort((a: Project, b: Project) => b.data.date.valueOf() - a.data.date.valueOf())
	return projects
}

// export async function getProjectsByClient(client: string) {
// 	const projects = (await getCollection('work') as Project[])
// 		.filter((project) => project.data.client === client)
// 		.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
// 	return projects
// }

export async function getFeaturedProjects() {
	const projects = ((await getCollection('work')) as Project[])
		.filter((project: Project) => project.data.featured)
		.sort((a: Project, b: Project) => b.data.date.valueOf() - a.data.date.valueOf())
	return projects
}
