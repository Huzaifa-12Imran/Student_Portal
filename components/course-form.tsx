'use client'

import { useState } from 'react'
import { useCourses } from '@/lib/hooks'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface CourseFormProps {
  onSuccess?: () => void
}

export default function CourseForm({ onSuccess }: CourseFormProps) {
  const { userProfile } = useAuth()
  const { createCourse, loading, error } = useCourses()
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [semester, setSemester] = useState('1')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!code || !name || !semester) {
      setMessage('Please fill in required fields')
      return
    }

    if (!userProfile) {
      setMessage('User profile not loaded')
      return
    }

    try {
      await createCourse(code, name, userProfile.id, parseInt(semester), description)
      setMessage('Course created successfully')
      setCode('')
      setName('')
      setDescription('')
      setSemester('1')
      setTimeout(() => setMessage(''), 3000)
      onSuccess?.()
    } catch (err) {
      console.error('Failed to create course:', err)
    }
  }

  return (
    <Card className="p-6 bg-slate-800 border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Create New Course</h3>

      {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded text-red-400 text-sm">{error}</div>}
      {message && (
        <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded text-green-400 text-sm">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Course Code</label>
          <Input
            type="text"
            placeholder="CS101"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Course Name</label>
          <Input
            type="text"
            placeholder="Introduction to Programming"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
          <textarea
            placeholder="Course description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">Semester</label>
          <Input
            type="number"
            min="1"
            max="8"
            placeholder="1"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? 'Creating...' : 'Create Course'}
        </Button>
      </form>
    </Card>
  )
}
