'use client'

import { useEffect, useState } from 'react'
import { useGrades, type Grade } from '@/lib/hooks'
import { Card } from '@/components/ui/card'

interface GradesTableProps {
  studentId?: string
  courseId?: string
  refreshTrigger?: number
}

export default function GradesTable({ studentId, courseId, refreshTrigger }: GradesTableProps) {
  const { getGrades, loading, error } = useGrades()
  const [grades, setGrades] = useState<Grade[]>([])

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const data = await getGrades(studentId, courseId)
        setGrades(data)
      } catch (err) {
        console.error('Failed to fetch grades:', err)
      }
    }

    fetchGrades()
  }, [studentId, courseId, refreshTrigger, getGrades])

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-green-400'
      case 'B':
        return 'text-blue-400'
      case 'C':
        return 'text-yellow-400'
      case 'D':
        return 'text-orange-400'
      case 'F':
        return 'text-red-400'
      default:
        return 'text-slate-400'
    }
  }

  if (loading) {
    return (
      <Card className="p-6 bg-slate-800 border-slate-700">
        <div className="text-center text-slate-400">Loading grades...</div>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-6 bg-slate-800 border-slate-700">
        <div className="text-red-400">Error: {error}</div>
      </Card>
    )
  }

  if (grades.length === 0) {
    return (
      <Card className="p-6 bg-slate-800 border-slate-700">
        <div className="text-center text-slate-400">No grades found</div>
      </Card>
    )
  }

  const averagePercentage = (grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length).toFixed(2)

  return (
    <Card className="p-6 bg-slate-800 border-slate-700">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Grades</h3>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <div className="text-sm text-slate-400">Average Percentage</div>
              <div className="text-2xl font-bold text-white">{averagePercentage}%</div>
            </div>
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <div className="text-sm text-slate-400">Total Subjects</div>
              <div className="text-2xl font-bold text-white">{grades.length}</div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="px-4 py-2 text-left text-slate-400 font-medium">Course ID</th>
                  <th className="px-4 py-2 text-left text-slate-400 font-medium">Marks</th>
                  <th className="px-4 py-2 text-left text-slate-400 font-medium">Percentage</th>
                  <th className="px-4 py-2 text-left text-slate-400 font-medium">Grade</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade) => (
                  <tr key={grade.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                    <td className="px-4 py-2 text-white">{grade.course_id.slice(0, 8)}</td>
                    <td className="px-4 py-2 text-white">
                      {grade.marks} / {grade.total_marks}
                    </td>
                    <td className="px-4 py-2 text-white">{grade.percentage.toFixed(2)}%</td>
                    <td className={`px-4 py-2 font-bold text-lg ${getGradeColor(grade.grade)}`}>{grade.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Card>
  )
}
