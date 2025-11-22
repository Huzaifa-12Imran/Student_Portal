"use client"

import { useState } from "react"

export default function AttendanceSummary() {
  const [selectedCourse, setSelectedCourse] = useState("CS101")

  const courseAttendance = [
    {
      code: "CS101",
      name: "Database Systems",
      total: 45,
      attended: 41,
      percentage: 91.1,
      status: "Good",
    },
    {
      code: "CS201",
      name: "Web Development",
      total: 40,
      attended: 34,
      percentage: 85,
      status: "Warning",
    },
    {
      code: "CS301",
      name: "Data Structures",
      total: 42,
      attended: 37,
      percentage: 88.1,
      status: "Good",
    },
  ]

  const selected = courseAttendance.find((c) => c.code === selectedCourse)
  const overallPercentage =
    (courseAttendance.reduce((a, b) => a + b.attended, 0) / courseAttendance.reduce((a, b) => a + b.total, 0)) * 100

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-2xl font-bold text-white mb-1">Attendance Summary</h2>
        <p className="text-slate-400 text-sm">Track your class attendance across all courses</p>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6">
        <h3 className="font-semibold text-white mb-6">Overall Attendance</h3>
        <div className="flex items-center gap-6">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400">Overall Attendance Rate</span>
              <span className="text-3xl font-bold text-blue-400">{overallPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full transition-all"
                style={{ width: `${Math.min(overallPercentage, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-green-400 mt-3 flex items-center gap-2">
              <span>✓</span>
              Above 75% threshold
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6">
        <h3 className="font-semibold text-white mb-4">Attendance by Course</h3>
        <div className="space-y-3">
          {courseAttendance.map((course) => (
            <button
              key={course.code}
              onClick={() => setSelectedCourse(course.code)}
              className={`w-full p-4 rounded-lg border transition-all text-left ${
                selectedCourse === course.code
                  ? "bg-blue-500/20 border-blue-500/50"
                  : "bg-slate-700/30 border-slate-700/30 hover:border-slate-700/50"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-medium text-white">{course.name}</p>
                  <p className="text-sm text-slate-400">{course.code}</p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    course.status === "Good"
                      ? "bg-green-500/20 border border-green-500/30 text-green-400"
                      : "bg-yellow-500/20 border border-yellow-500/30 text-yellow-400"
                  }`}
                >
                  {course.status}
                </span>
              </div>
              <div className="flex justify-between items-center gap-4">
                <div className="flex-1">
                  <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        course.percentage >= 85
                          ? "bg-gradient-to-r from-green-500 to-green-400"
                          : "bg-gradient-to-r from-yellow-500 to-yellow-400"
                      }`}
                      style={{ width: `${course.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <span className="font-semibold text-white min-w-fit">{course.percentage.toFixed(1)}%</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {course.attended} of {course.total} classes attended
              </p>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6">
          <h3 className="font-semibold text-white mb-4">{selected.name} - Course Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-slate-700 to-slate-750 border border-slate-600/30 rounded-lg p-4">
              <p className="text-sm text-slate-400 mb-2">Classes Attended</p>
              <p className="text-2xl font-bold text-green-400">{selected.attended}</p>
            </div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-750 border border-slate-600/30 rounded-lg p-4">
              <p className="text-sm text-slate-400 mb-2">Total Classes</p>
              <p className="text-2xl font-bold text-blue-400">{selected.total}</p>
            </div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-750 border border-slate-600/30 rounded-lg p-4">
              <p className="text-sm text-slate-400 mb-2">Absences</p>
              <p className="text-2xl font-bold text-red-400">{selected.total - selected.attended}</p>
            </div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-750 border border-slate-600/30 rounded-lg p-4">
              <p className="text-sm text-slate-400 mb-2">Percentage</p>
              <p className="text-2xl font-bold text-orange-400">{selected.percentage.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
