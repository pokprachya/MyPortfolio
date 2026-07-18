import { useEffect, useState } from 'react'
import { parseCsv } from '../utils/parseCsv'

export const PROJECTS_SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1ri9xvuCiVOWDcsqKKb7gIM4LuK6j1Iy5MD9THYs-cZg/export?format=csv&gid=0'

export interface Project {
  id: number
  title: string
  description: string
  detail: string
  image: string
  inlineImages: string[]
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(PROJECTS_SHEET_URL)
        const text = await res.text()
        const rows = parseCsv(text)

        const parsed = rows
          .filter((row) => row[0]?.trim())
          .map((row, idx) => {
            const imagePath = row[3] || ''
            const inlineImageFields = [row[4], row[5]]

            const normalizeImage = (value: string | undefined) => {
              let path = value?.trim() || ''
              if (path && !path.startsWith('http') && !path.startsWith('/')) {
                path = new URL(`../img/${path}`, import.meta.url).href
              }
              return path
            }

            return {
              id: idx,
              title: row[0] || '',
              description: row[1] || '',
              detail: row[2] || '',
              image: normalizeImage(imagePath),
              inlineImages: inlineImageFields
                .map(normalizeImage)
                .filter((src) => src),
            }
          })

        setProjects(parsed)
      } catch {
        setError('Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  return { projects, loading, error }
}
