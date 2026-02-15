import { Projects } from '@/constants/projects'

export const useProjects = () => {
    const getAll = () => Projects
    const getBySlug = (slug: string) =>
        Projects.find(p => p.slug === slug)
    return { getAll, getBySlug }
}