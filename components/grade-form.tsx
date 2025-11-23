'use client'

import { useState } from 'react'
import { useGrades } from '@/lib/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface GradeFormProps {
  studentId: string
  courseId: string
  onSuccess?: () => void
}

export default function GradeForm({ studentId, courseId, onSuccess }: GradeFormProps) {
  const { recordGrade, loading, error } = useGrades()
  const [marks, setMarks] = useState('')
  const [totalMarks, setTotalMarks] = useState('100')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!marks || !totalMarks) {
      setMessage('Please fill in all fields')
      return
    }

    const marksNum = parseFloat(marks)
    const totalMarksNum = parseFloat(totalMarks)

    if (marksNum < 0 || marksNum > totalMarksNum) {
      setMessage('Invalid marks. Marks cannot be greater than total marks.')
      return
    }

    try {
      await recordGrade(studentId, courseId, marksNum, totalMarksNum)
      setMessage('Grade recorded successfully')
      setMarks('')
      setTotalMarks('100')
      setTimeout(() => setMessage(''), 3000)
      onSuccess?.()
    } catch (err) {
      console.error('Failed to record grade:', err)
    }
  }

  return (
    <Card className="p-6 bg-slate-800 border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Enter Grade</h3>

      {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-sm">{error}</div>}
      {message && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded text-green-400 text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Marks Obtained</label>
            <Input
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Total Marks</label>
            <Input
              type="number"
              min="1"
              step="0.01"
              placeholder="100"
              value={totalMarks}
              onChange={(e) => setTotalMarks(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
          </div>
        </div>

        {marks && totalMarks && (
          <div className="p-3 bg-slate-700 border border-slate-600 rounded text-slate-300 text-sm">
            <p>
              Percentage: <span className="font-semibold">{((parseFloat(marks) / parseFloat(totalMarks)) * 100).toFixed(2)}%</span>
            </p>
          </div>
        )}

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? 'Saving...' : 'Record Grade'}
        </Button>
      </form>
    </Card>
  )
}
