'use client'

import { useState, useCallback } from 'react'
import { apiClient } from '@/lib/api-client'

export interface AttendanceRecord {
  id: string
  student_id: string
  course_id: string
  date: string
  status: 'present' | 'absent' | 'late'
  created_at: string
}

export function useAttendance() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAttendance = useCallback(
    async (studentId?: string, courseId?: string): Promise<AttendanceRecord[]> => {
      setLoading(true)
      setError(null)
      try {
        const response = await apiClient.attendance.list(studentId, courseId)
        return response.data || []
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch attendance'
        setError(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const recordAttendance = useCallback(
    async (
      studentId: string,
      courseId: string,
      date: string,
      status: 'present' | 'absent' | 'late'
    ): Promise<AttendanceRecord> => {
      setLoading(true)
      setError(null)
      try {
        const response = await apiClient.attendance.record(studentId, courseId, date, status)
        return response.data[0]
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to record attendance'
        setError(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const updateAttendance = useCallback(
    async (id: string, status: 'present' | 'absent' | 'late'): Promise<AttendanceRecord> => {
      setLoading(true)
      setError(null)
      try {
        const response = await apiClient.attendance.update(id, status)
        return response.data[0]
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update attendance'
        setError(message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { getAttendance, recordAttendance, updateAttendance, loading, error }
}
