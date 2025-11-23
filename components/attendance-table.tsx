'use client'

import { useEffect, useState } from 'react'
import { useAttendance, type AttendanceRecord } from '@/lib/hooks'
import { Card } from '@/components/ui/card'

interface AttendanceTableProps {
  studentId?: string
  courseId?: string
  refreshTrigger?: number
}

export default function AttendanceTable({ studentId, courseId, refreshTrigger }: AttendanceTableProps) {
  const { getAttendance, loading, error } = useAttendance()
  const [records, setRecords] = useState<AttendanceRecord[]>([])

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const data = await getAttendance(studentId, courseId)
        setRecords(data)
      } catch (err) {
        console.error('Failed to fetch attendance:', err)
      }
    }

    fetchAttendance()
  }, [studentId, courseId, refreshTrigger, getAttendance])

  if (loading) {
    return (
      <Card className="p-6 bg-slate-800 border-slate-700">
        <div className="text-center text-slate-400">Loading attendance records...</div>
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

  if (records.length === 0) {
    return (
      <Card className="p-6 bg-slate-800 border-slate-700">
        <div className="text-center text-slate-400">No attendance records found</div>
      </Card>
    )
  }

  const presentCount = records.filter((r) => r.status === 'present').length
  const absentCount = records.filter((r) => r.status === 'absent').length
  const lateCount = records.filter((r) => r.status === 'late').length
  const percentage = records.length > 0 ? ((presentCount + lateCount * 0.5) / records.length) * 100 : 0

  return (
    <Card className="p-6 bg-slate-800 border-slate-700">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Attendance Records</h3>

          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-700 rounded-lg p-4 border border-slate-600">
              <div className="text-sm text-slate-400">Total Classes</div>
              <div className="text-2xl font-bold text-white">{records.length}</div>
            </div>
            <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/50">
              <div className="text-sm text-green-400">Present</div>
              <div className="text-2xl font-bold text-green-400">{presentCount}</div>
            </div>
            <div className="bg-red-900/20 rounded-lg p-4 border border-red-500/50">
              <div className="text-sm text-red-400">Absent</div>
              <div className="text-2xl font-bold text-red-400">{absentCount}</div>
            </div>
            <div className="bg-yellow-900/20 rounded-lg p-4 border border-yellow-500/50">
              <div className="text-sm text-yellow-400">Late</div>
              <div className="text-2xl font-bold text-yellow-400">{lateCount}</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-400">Attendance Percentage</span>
              <span className="text-sm font-semibold text-white">{percentage.toFixed(2)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              ></div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="px-4 py-2 text-left text-slate-400 font-medium">Date</th>
                  <th className="px-4 py-2 text-left text-slate-400 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                    <td className="px-4 py-2 text-white">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          record.status === 'present'
                            ? 'bg-green-900/30 text-green-400 border border-green-500/50'
                            : record.status === 'absent'
                              ? 'bg-red-900/30 text-red-400 border border-red-500/50'
                              : 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/50'
                        }`}
                      >
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
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
