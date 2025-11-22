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
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Mark Attendance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Course</label>
            <select
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="CS101">CS101 - Database Systems</option>
              <option value="CS201">CS201 - Web Development</option>
              <option value="CS301">CS301 - Data Structures</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleLoadStudents}
              className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Load Students
            </button>
          </div>
        </div>
      </div>

      {}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Present</p>
          <p className="text-2xl font-bold text-accent">{presentCount}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Absent</p>
          <p className="text-2xl font-bold text-destructive">{absentCount}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-1">Late</p>
          <p className="text-2xl font-bold text-chart-3">{lateCount}</p>
        </div>
      </div>

      {}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Student ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.studentId} className="border-b border-border hover:bg-background/50 transition-colors">
                <td className="px-6 py-3 text-sm text-muted-foreground">{record.studentId}</td>
                <td className="px-6 py-3 text-sm text-foreground">{record.name}</td>
                <td className="px-6 py-3">
                  <div className="flex gap-2">
                      {(["present", "absent", "late"] as const).map((status) => {
                        const isActive = record.status === status
                        const common = `inline-flex items-center gap-2 px-3 py-1 rounded text-xs font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2`
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
                                  ? " bg-green-950/30 border border-white text-white"
                                  : " bg-green-950/30 border border-green-700/50 text-green-400 hover:bg-green-950/50")
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
                                  ? " bg-red-950/30 border border-white text-white"
                                  : " bg-red-950/30 border border-red-700/50 text-red-400 hover:bg-red-950/50")
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
                                ? " bg-yellow-950/30 border border-white text-white"
                                : " bg-yellow-950/30 border border-yellow-700/50 text-yellow-400 hover:bg-yellow-950/50")
                            }
                          >
                            <Clock className="w-3 h-3" />
                            Late
                          </button>
                        )
                      })}
                  </div>
                </td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        record.status === "present"
                          ? "bg-green-600/10 text-green-600"
                          : record.status === "absent"
                          ? "bg-red-600/10 text-red-600"
                          : "bg-yellow-500/10 text-yellow-600"
                      }`}
                    >
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </span>
                  </td>
                <td className="px-6 py-3">
                  <button
                    onClick={() => handleDelete(record.studentId)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
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

      {}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Attendance
        </button>
        <button
          onClick={handleCancel}
          className="px-6 py-2.5 bg-input border border-border text-foreground rounded-lg font-medium hover:bg-border transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
