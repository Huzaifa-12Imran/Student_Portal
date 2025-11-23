'use client'

import { useState, useCallback } from 'react'
import { apiClient } from '@/lib/api-client'

export interface Grade {
  id: string
  student_id: string
  course_id: string
  marks: number
  total_marks: number
  percentage: number
  grade: string
  created_at: string
  updated_at: string
}

export function useGrades() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getGrades = useCallback(
    async (studentId?: string, courseId?: string): Promise<Grade[]> => {
      setLoading(true)
      setError(null)
      try {
        const response = await apiClient.grades.list(studentId, courseId)
        return response.data || []
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch grades'
        setError(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const recordGrade = useCallback(
    async (studentId: string, courseId: string, marks: number, totalMarks: number): Promise<Grade> => {
      setLoading(true)
      setError(null)
      try {
        const response = await apiClient.grades.record(studentId, courseId, marks, totalMarks)
        return response.data[0]
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to record grade'
        setError(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const updateGrade = useCallback(
    async (id: string, marks?: number, totalMarks?: number): Promise<Grade> => {
      setLoading(true)
      setError(null)
      try {
        const response = await apiClient.grades.update(id, marks, totalMarks)
        return response.data[0]
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update grade'
        setError(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { getGrades, recordGrade, updateGrade, loading, error }
}
