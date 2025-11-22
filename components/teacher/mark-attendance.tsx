"use client"

import { useState } from "react"
import { Plus, Trash2, Save, Check, X, Clock } from "lucide-react"

interface AttendanceRecord {
  studentId: string
  name: string
  status: "present" | "absent" | "late"
}

const INITIAL_RECORDS: AttendanceRecord[] = [
  { studentId: "001", name: "Ahmed Ali", status: "present" },
  { studentId: "002", name: "Fatima Khan", status: "present" },
  { studentId: "003", name: "Muhammad Hassan", status: "absent" },
  { studentId: "004", name: "Zainab Omar", status: "late" },
  { studentId: "005", name: "Ibrahim Ahmed", status: "present" },
]

export default function MarkAttendance() {
  const [courseId, setCourseId] = useState("CS101")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [records, setRecords] = useState<AttendanceRecord[]>(INITIAL_RECORDS)

  const handleStatusChange = (studentId: string, newStatus: AttendanceRecord["status"]) => {
    setRecords(records.map((r) => (r.studentId === studentId ? { ...r, status: newStatus } : r)))
  }

  const handleSave = () => {
    localStorage.setItem(`attendance_${courseId}_${date}`, JSON.stringify(records))
    alert("Attendance saved successfully!")
  }

  const handleLoadStudents = () => {
    const key = `attendance_${courseId}_${date}`
    const stored = localStorage.getItem(key)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AttendanceRecord[]
        setRecords(parsed)
        alert("Loaded saved attendance for this course/date.")
        return
      } catch (e) {
        console.error("Failed to parse stored attendance", e)
      }
    }

    // No saved attendance: reset to class list (initial) and notify
    setRecords(INITIAL_RECORDS)
    alert("No saved attendance found — loaded default class list.")
  }

  const handleDelete = (studentId: string) => {
    if (!confirm("Delete this student from today's list?")) return
    setRecords((r) => r.filter((rec) => rec.studentId !== studentId))
  }

  const handleCancel = () => {
    if (!confirm("Discard changes and reset to last saved/default roster?")) return
    const key = `attendance_${courseId}_${date}`
    const stored = localStorage.getItem(key)
    if (stored) {
      try {
        setRecords(JSON.parse(stored))
        return
      } catch {}
    }
    setRecords(INITIAL_RECORDS)
  }

  const presentCount = records.filter((r) => r.status === "present").length
  const absentCount = records.filter((r) => r.status === "absent").length
  const lateCount = records.filter((r) => r.status === "late").length

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-2xl font-bold text-white mb-1">Mark Attendance</h2>
        <p className="text-slate-400 text-sm">Record attendance for your class</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Course</label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value="CS101">CS101 - Database Systems</option>
            <option value="CS201">CS201 - Web Development</option>
            <option value="CS301">CS301 - Data Structures</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="flex items-end">
          <button
            onClick={handleLoadStudents}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Load Students
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-400">Present</p>
            <Check className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-green-400">{presentCount}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-400">Absent</p>
            <X className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-3xl font-bold text-red-400">{absentCount}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-400">Late</p>
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-yellow-400">{lateCount}</p>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/30 bg-gradient-to-r from-slate-800 to-slate-750">
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300">Student ID</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300">Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.studentId} className="border-b border-slate-700/20 hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-400">{record.studentId}</td>
                <td className="px-6 py-4 text-sm text-white font-medium">{record.name}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                      {(["present", "absent", "late"] as const).map((status) => {
                        const isActive = record.status === status
                        const common = `inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2`
                        const attrs = {
                          onClick: () => handleStatusChange(record.studentId, status),
                          'aria-pressed': isActive,
                          title: status.charAt(0).toUpperCase() + status.slice(1),
                        }

                        if (status === "present") {
                          return (
                            <button
                              key={status}
                              {...attrs}
                              className={
                                common +
                                (isActive
                                  ? " bg-green-500/20 border border-green-400 text-green-400"
                                  : " bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20")
                              }
                            >
                              <Check className="w-3 h-3" />
                              Present
                            </button>
                          )
                        }

                        if (status === "absent") {
                          return (
                            <button
                              key={status}
                              {...attrs}
                              className={
                                common +
                                (isActive
                                  ? " bg-red-500/20 border border-red-400 text-red-400"
                                  : " bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20")
                              }
                            >
                              <X className="w-3 h-3" />
                              Absent
                            </button>
                          )
                        }

                        return (
                          <button
                            key={status}
                            {...attrs}
                            className={
                              common +
                              (isActive
                                ? " bg-yellow-500/20 border border-yellow-400 text-yellow-400"
                                : " bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/20")
                            }
                          >
                            <Clock className="w-3 h-3" />
                            Late
                          </button>
                        )
                      })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(record.studentId)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors rounded hover:bg-red-500/10"
                    aria-label={`Delete ${record.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-lg font-medium transition-all flex items-center gap-2 shadow-lg"
        >
          <Save className="w-4 h-4" />
          Save Attendance
        </button>
        <button
          onClick={handleCancel}
          className="px-6 py-3 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg font-medium hover:bg-slate-700/50 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
