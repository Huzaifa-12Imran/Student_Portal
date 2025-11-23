'use client'

import { useState, useCallback } from 'react'
import { apiClient } from '@/lib/api-client'

export interface Course {
  id: string
  code: string
  name: string
  description?: string
  teacher_id: string
  semester: number
  created_at: string
}

export function useCourses() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getCourses = useCallback(async (teacherId?: string): Promise<Course[]> => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiClient.courses.list(teacherId)
      return response.data || []
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch courses'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const createCourse = useCallback(
    async (code: string, name: string, teacherId: string, semester: number, description?: string): Promise<Course> => {
      setLoading(true)
      setError(null)
      try {
        const response = await apiClient.courses.create(code, name, teacherId, semester, description)
        return response.data[0]
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create course'
        setError(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { getCourses, createCourse, loading, error }
}
