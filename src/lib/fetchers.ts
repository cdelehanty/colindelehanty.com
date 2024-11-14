import { getCollection } from 'astro:content'

export async function getCategories() {
	const projects = await getCollection('work')
	const categories = [...new Set(projects.map((project) => project.data.category).flat())]

	return categories
}

export async function getProjects() {
	const projects = (await getCollection('work'))
		.filter((project) => !project.data.excluded)
		.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

	return projects
}

export async function getFeaturedProjects() {
	const projects = (await getCollection('work'))
		.filter((project) => project.data.featured)
		.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

	return projects
}

export async function getProjectsByCategory(category: string) {
	const projects = (await getCollection('work'))
		.filter((project) => project.data.category.includes(category) && !project.data.excluded)
		.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())

	return projects
}
