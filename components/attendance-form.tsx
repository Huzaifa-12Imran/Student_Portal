'use client'

import { useState } from 'react'
import { useAttendance } from '@/lib/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface AttendanceFormProps {
  studentId: string
  courseId: string
  onSuccess?: () => void
}

export default function AttendanceForm({ studentId, courseId, onSuccess }: AttendanceFormProps) {
  const { recordAttendance, loading, error } = useAttendance()
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [status, setStatus] = useState<'present' | 'absent' | 'late'>('present')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await recordAttendance(studentId, courseId, date, status)
      setMessage('Attendance recorded successfully')
      setDate(new Date().toISOString().split('T')[0])
      setStatus('present')
      setTimeout(() => setMessage(''), 3000)
      onSuccess?.()
    } catch (err) {
      console.error('Failed to record attendance:', err)
    }
  }

  return (
    <Card className="p-6 bg-slate-800 border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Mark Attendance</h3>

      {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-sm">{error}</div>}
      {message && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded text-green-400 text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Date</label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white"
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? 'Recording...' : 'Record Attendance'}
        </Button>
      </form>
    </Card>
  )
}
