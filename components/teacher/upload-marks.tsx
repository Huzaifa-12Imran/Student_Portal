"use client"

import { useState } from "react"
import { Upload, Calculator as Calculate, Save, BookOpen, Users, TrendingUp, Award, CheckCircle, AlertCircle } from "lucide-react"

interface StudentMarks {
  studentId: string
  name: string
  quiz: number
  assignment: number
  midterm: number
  final: number
  totalMarks: number
  percentage: number
  grade: string
}

const COURSE_DATA: Record<string, StudentMarks[]> = {
  "CS101": [
    {
      studentId: "001",
      name: "Ahmed Ali",
      quiz: 18,
      assignment: 38,
      midterm: 42,
      final: 88,
      totalMarks: 0,
      percentage: 0,
      grade: "",
    },
    {
      studentId: "002",
      name: "Fatima Khan",
      quiz: 20,
      assignment: 40,
      midterm: 45,
      final: 92,
      totalMarks: 0,
      percentage: 0,
      grade: "",
    },
    {
      studentId: "003",
      name: "Muhammad Saad",
      quiz: 16,
      assignment: 35,
      midterm: 38,
      final: 82,
      totalMarks: 0,
      percentage: 0,
      grade: "",
    },
  ],
  "CS201": [
    {
      studentId: "201",
      name: "Sara Ahmed",
      quiz: 19,
      assignment: 42,
      midterm: 48,
      final: 91,
      totalMarks: 0,
      percentage: 0,
      grade: "",
    },
    {
      studentId: "202",
      name: "Ali Hassan",
      quiz: 17,
      assignment: 39,
      midterm: 44,
      final: 85,
      totalMarks: 0,
      percentage: 0,
      grade: "",
    },
  ],
  "CS301": [
    {
      studentId: "301",
      name: "Hina Khan",
      quiz: 20,
      assignment: 45,
      midterm: 50,
      final: 95,
      totalMarks: 0,
      percentage: 0,
      grade: "",
    },
    {
      studentId: "302",
      name: "Bilal Ahmed",
      quiz: 18,
      assignment: 41,
      midterm: 46,
      final: 89,
      totalMarks: 0,
      percentage: 0,
      grade: "",
    },
    {
      studentId: "303",
      name: "Ayesha Malik",
      quiz: 19,
      assignment: 43,
      midterm: 47,
      final: 90,
      totalMarks: 0,
      percentage: 0,
      grade: "",
    },
    {
      studentId: "304",
      name: "Omar Farooq",
      quiz: 15,
      assignment: 37,
      midterm: 40,
      final: 78,
      totalMarks: 0,
      percentage: 0,
      grade: "",
    },
  ],
}

const GRADE_COLORS: Record<string, string> = {
  A: "bg-emerald-900/40 text-emerald-200 border border-emerald-400/60 font-bold",
  B: "bg-blue-900/40 text-blue-200 border border-blue-400/60 font-bold",
  C: "bg-yellow-900/40 text-yellow-200 border border-yellow-400/60 font-bold",
  D: "bg-orange-900/40 text-orange-200 border border-orange-400/60 font-bold",
  F: "bg-red-900/40 text-red-200 border border-red-400/60 font-bold",
}

export default function UploadMarks() {
  const [courseId, setCourseId] = useState("CS101")
  const [marks, setMarks] = useState<StudentMarks[]>(COURSE_DATA["CS101"])

  const handleCourseChange = (newCourseId: string) => {
    setCourseId(newCourseId)
    const savedData = localStorage.getItem(`marks_${newCourseId}`)
    if (savedData) {
      setMarks(JSON.parse(savedData))
    } else {
      setMarks(COURSE_DATA[newCourseId] || [])
    }
  }

  const calculateGrades = () => {
    const updated = marks.map((m) => {
      const total = m.quiz + m.assignment + m.midterm + m.final
      const percentage = (total / 200) * 100
      let grade = "F"

      if (percentage >= 90) grade = "A"
      else if (percentage >= 80) grade = "B"
      else if (percentage >= 70) grade = "C"
      else if (percentage >= 60) grade = "D"

      return { ...m, totalMarks: total, percentage, grade }
    })

    setMarks(updated)
  }

  const handleImportCSV = (file: File | null) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const text = String(reader.result || "")
      const rows = text.split(/\r?\n/).map((r) => r.trim()).filter(Boolean)
      if (rows.length <= 1) {
        alert("CSV appears empty or has no data rows")
        return
      }
      const data = rows.slice(1).map((row) => {
        const cols = row.split(",").map((c) => c.trim())
        return {
          studentId: cols[0] || "",
          name: cols[1] || "",
          quiz: Number(cols[2] || 0),
          assignment: Number(cols[3] || 0),
          midterm: Number(cols[4] || 0),
          final: Number(cols[5] || 0),
          totalMarks: 0,
          percentage: 0,
          grade: "",
        } as StudentMarks
      })
      setMarks(data)
      alert(`Imported ${data.length} records from CSV`)
    }
    reader.readAsText(file)
  }

  const handleCancel = () => {
    if (!confirm("Discard changes and reset to default marks?")) return
    setMarks(COURSE_DATA[courseId] || [])
  }

  const handleMarkChange = (studentId: string, field: string, value: number) => {
    setMarks(marks.map((m) => (m.studentId === studentId ? { ...m, [field]: value } : m)))
  }

  const handleSave = () => {
    localStorage.setItem(`marks_${courseId}`, JSON.stringify(marks))
    alert("Marks saved successfully!")
  }

  const totalStudents = marks.length
  const gradeCalculated = marks.filter((m) => m.grade).length
  const avgPercentage = marks.length > 0 ? (marks.reduce((sum, m) => sum + m.percentage, 0) / marks.length).toFixed(1) : 0
  const passCount = marks.filter((m) => m.percentage >= 60).length

  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl p-8">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-600 p-8 shadow-md">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl border-2 border-blue-400/50 shadow-md">
                <Award className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Upload Student Marks</h1>
                <p className="text-slate-300 font-medium">Manage and calculate grades for your courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Section: Course Selection + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Course Selection */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-blue-400/40 rounded-xl p-6 h-fit shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-400/50 shadow-sm">
                <BookOpen className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-white">Select Course</h3>
                <p className="text-xs text-blue-200/70">Choose a course to edit</p>
              </div>
            </div>
            <select
              value={courseId}
              onChange={(e) => handleCourseChange(e.target.value)}
              className="w-full px-4 py-3 bg-slate-700 border-2 border-blue-400/50 rounded-lg text-white font-semibold focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all appearance-none cursor-pointer hover:border-blue-400 hover:bg-slate-600"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2360a5fa' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                paddingRight: "36px",
              }}
            >
              <option value="CS101" className="bg-slate-800 text-white">CS101 - Database Systems</option>
              <option value="CS201" className="bg-slate-800 text-white">CS201 - Web Development</option>
              <option value="CS301" className="bg-slate-800 text-white">CS301 - Data Structures</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-blue-400/50 rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-blue-300">Total Students</span>
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-blue-100">{totalStudents}</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-emerald-400/50 rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-emerald-300">Grades Set</span>
              <CheckCircle className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-bold text-emerald-100">{gradeCalculated}/{totalStudents}</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-orange-400/50 rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-orange-300">Pass Rate</span>
              <TrendingUp className="w-5 h-5 text-orange-400" />
            </div>
            <p className="text-3xl font-bold text-orange-100">{Math.round((passCount / totalStudents) * 100)}%</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-violet-400/50 rounded-lg p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-violet-300">Avg %</span>
              <Award className="w-5 h-5 text-violet-400" />
            </div>
            <p className="text-3xl font-bold text-violet-100">{avgPercentage}%</p>
          </div>
        </div>
      </div>

      {/* Action Buttons + Grading Scale */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-slate-600 rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-white mb-5">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block group cursor-pointer">
                <input
                  type="file"
                  accept="text/csv"
                  onChange={(e) => handleImportCSV(e.target.files ? e.target.files[0] : null)}
                  className="hidden"
                />
                <div className="p-5 bg-gradient-to-br from-blue-900/40 to-blue-900/20 border-2 border-dashed border-blue-400/60 rounded-lg hover:border-blue-400 hover:bg-blue-900/50 transition-all group-hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors shadow-sm">
                      <Upload className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-blue-200 text-sm">Import CSV</p>
                      <p className="text-xs text-blue-300/70">Upload marks from file</p>
                    </div>
                  </div>
                </div>
              </label>

              <button
                onClick={calculateGrades}
                className="p-5 bg-gradient-to-br from-emerald-900/40 to-emerald-900/20 border-2 border-emerald-400/60 rounded-lg hover:border-emerald-400 hover:bg-emerald-900/50 transition-all group hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-500 rounded-lg group-hover:bg-emerald-600 transition-colors shadow-sm">
                    <Calculate className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-emerald-200 text-sm">Calculate Grades</p>
                    <p className="text-xs text-emerald-300/70">Compute totals & grades</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Grading Scale */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-slate-600 rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-slate-700 rounded-lg border border-slate-600 shadow-sm">
              <TrendingUp className="w-5 h-5 text-slate-300" />
            </div>
            <h3 className="font-bold text-white text-sm">Grading Scale</h3>
          </div>
          <div className="space-y-2">
            {[
              { grade: "A", range: "90-100%", color: "bg-emerald-900/40 text-emerald-200 border border-emerald-400/60" },
              { grade: "B", range: "80-89%", color: "bg-blue-900/40 text-blue-200 border border-blue-400/60" },
              { grade: "C", range: "70-79%", color: "bg-yellow-900/40 text-yellow-200 border border-yellow-400/60" },
              { grade: "D", range: "60-69%", color: "bg-orange-900/40 text-orange-200 border border-orange-400/60" },
            ].map((item) => (
              <div key={item.grade} className={`flex items-center justify-between p-3 rounded-lg font-bold ${item.color}`}>
                <span className="text-base">{item.grade}</span>
                <span className="text-xs">{item.range}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marks Table */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-950 border-2 border-slate-600 rounded-xl overflow-hidden shadow-md">
        <div className="p-6 border-b-2 border-slate-600 bg-gradient-to-r from-slate-800 to-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500 rounded-lg border border-blue-400/60 shadow-sm">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white">Student Marks</h3>
                <p className="text-xs text-slate-400 mt-0.5">Enter or update marks for each component</p>
              </div>
            </div>
            <div className="text-right bg-blue-900/40 px-4 py-2 rounded-lg border border-blue-400/60">
              <p className="font-bold text-blue-200">{gradeCalculated}/{totalStudents}</p>
              <p className="text-xs text-blue-300/70">grades calculated</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-700 to-slate-800 border-b-2 border-slate-600">
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-200 uppercase tracking-wider">Student Name</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-200 uppercase tracking-wider">
                  <div className="flex flex-col items-center">
                    <span>Quiz</span>
                    <span className="font-normal text-slate-400">/20</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-200 uppercase tracking-wider">
                  <div className="flex flex-col items-center">
                    <span>Assignment</span>
                    <span className="font-normal text-slate-400">/40</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-200 uppercase tracking-wider">
                  <div className="flex flex-col items-center">
                    <span>Midterm</span>
                    <span className="font-normal text-slate-400">/50</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-200 uppercase tracking-wider">
                  <div className="flex flex-col items-center">
                    <span>Final</span>
                    <span className="font-normal text-slate-400">/100</span>
                  </div>
                </th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-200 uppercase tracking-wider">Total & %</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-slate-200 uppercase tracking-wider">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {marks.map((m, index) => (
                <tr key={m.studentId} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-semibold text-white">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-white text-sm">{m.name}</div>
                        <div className="text-xs text-slate-400">{m.studentId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      value={m.quiz}
                      onChange={(e) => handleMarkChange(m.studentId, "quiz", Number.parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-2 bg-slate-800 border-2 border-slate-600 rounded-lg text-sm text-center text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all font-semibold hover:border-slate-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min="0"
                      max="40"
                      value={m.assignment}
                      onChange={(e) => handleMarkChange(m.studentId, "assignment", Number.parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-2 bg-slate-800 border-2 border-slate-600 rounded-lg text-sm text-center text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all font-semibold hover:border-slate-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={m.midterm}
                      onChange={(e) => handleMarkChange(m.studentId, "midterm", Number.parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-2 bg-slate-800 border-2 border-slate-600 rounded-lg text-sm text-center text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all font-semibold hover:border-slate-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={m.final}
                      onChange={(e) => handleMarkChange(m.studentId, "final", Number.parseInt(e.target.value) || 0)}
                      className="w-20 px-3 py-2 bg-slate-800 border-2 border-slate-600 rounded-lg text-sm text-center text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all font-semibold hover:border-slate-500"
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-white text-sm">{m.totalMarks}</span>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        m.percentage >= 60 ? "bg-emerald-900/40 text-emerald-200 border border-emerald-400/60" : "bg-red-900/40 text-red-200 border border-red-400/60"
                      }`}>
                        {m.percentage.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-bold ${GRADE_COLORS[m.grade] || "bg-slate-700 text-slate-200 border-2 border-slate-600"}`}>
                      {m.grade || "-"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <button
          onClick={handleCancel}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg font-bold transition-all flex items-center justify-center gap-2 border-2 border-slate-600 hover:border-slate-500"
        >
          <AlertCircle className="w-4 h-4" />
          Reset Changes
        </button>
        <button
          onClick={handleSave}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg border-2 border-blue-500"
        >
          <Save className="w-4 h-4" />
          Save All Marks
        </button>
      </div>
    </div>
  )
}
