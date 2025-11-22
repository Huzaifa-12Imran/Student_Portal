"use client"

import { useState } from "react"
import { Download } from "lucide-react"

interface CourseResult {
  code: string
  name: string
  quiz: number
  assignment: number
  midterm: number
  final: number
  total: number
  percentage: number
  grade: string
}

export default function ResultsView() {
  const [selectedCourse, setSelectedCourse] = useState<string>("CS101")

  const results: CourseResult[] = [
    {
      code: "CS101",
      name: "Database Systems",
      quiz: 18,
      assignment: 38,
      midterm: 42,
      final: 88,
      total: 186,
      percentage: 93,
      grade: "A",
    },
    {
      code: "CS201",
      name: "Web Development",
      quiz: 17,
      assignment: 36,
      midterm: 40,
      final: 82,
      total: 175,
      percentage: 87.5,
      grade: "B+",
    },
    {
      code: "CS301",
      name: "Data Structures",
      quiz: 19,
      assignment: 39,
      midterm: 44,
      final: 86,
      total: 188,
      percentage: 94,
      grade: "A",
    },
  ]

  const selected = results.find((r) => r.code === selectedCourse)

  const getGradeColor = (grade: string) => {
    if (grade === "A") return "from-emerald-500/20 to-emerald-500/10 border-emerald-500/30 text-emerald-400"
    if (grade.startsWith("B")) return "from-blue-500/20 to-blue-500/10 border-blue-500/30 text-blue-400"
    if (grade.startsWith("C")) return "from-yellow-500/20 to-yellow-500/10 border-yellow-500/30 text-yellow-400"
    return "from-red-500/20 to-red-500/10 border-red-500/30 text-red-400"
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-2xl font-bold text-white mb-1">Your Grades</h2>
        <p className="text-slate-400 text-sm">View your course results and performance</p>
      </div>

      <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6">
        <h3 className="font-semibold text-white mb-4">Course Results</h3>
        <div className="space-y-3">
          {results.map((result) => (
            <button
              key={result.code}
              onClick={() => setSelectedCourse(result.code)}
              className={`w-full p-4 rounded-lg border transition-all text-left ${
                selectedCourse === result.code
                  ? "bg-blue-500/20 border-blue-500/50"
                  : "bg-slate-700/30 border-slate-700/30 hover:border-slate-700/50"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-medium text-white">{result.name}</p>
                  <p className="text-sm text-slate-400">{result.code}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold px-3 py-1 rounded bg-gradient-to-br ${getGradeColor(result.grade)}`}>
                    {result.grade}
                  </p>
                  <p className="text-sm text-blue-400 font-semibold mt-1">{result.percentage.toFixed(1)}%</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-semibold text-white">{selected.name}</h3>
              <p className="text-slate-400 text-sm">{selected.code}</p>
            </div>
            <button
              onClick={() => {
                const payload = {
                  course: selected.code,
                  name: selected.name,
                  grade: selected.grade,
                  percentage: selected.percentage,
                  breakdown: {
                    quiz: selected.quiz,
                    assignment: selected.assignment,
                    midterm: selected.midterm,
                    final: selected.final,
                    total: selected.total,
                  },
                }
                const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = `${selected.code}_result.json`
                document.body.appendChild(a)
                a.click()
                a.remove()
                URL.revokeObjectURL(url)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-medium transition-all"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-slate-700 to-slate-750 border border-slate-600/30 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Quiz</p>
              <p className="text-2xl font-bold text-blue-400">{selected.quiz}/20</p>
              <p className="text-xs text-slate-400 mt-1">{((selected.quiz / 20) * 100).toFixed(0)}%</p>
            </div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-750 border border-slate-600/30 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Assignment</p>
              <p className="text-2xl font-bold text-green-400">{selected.assignment}/40</p>
              <p className="text-xs text-slate-400 mt-1">{((selected.assignment / 40) * 100).toFixed(0)}%</p>
            </div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-750 border border-slate-600/30 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Midterm</p>
              <p className="text-2xl font-bold text-orange-400">{selected.midterm}/50</p>
              <p className="text-xs text-slate-400 mt-1">{((selected.midterm / 50) * 100).toFixed(0)}%</p>
            </div>
            <div className="bg-gradient-to-br from-slate-700 to-slate-750 border border-slate-600/30 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-2">Final</p>
              <p className="text-2xl font-bold text-red-400">{selected.final}/100</p>
              <p className="text-xs text-slate-400 mt-1">{((selected.final / 100) * 100).toFixed(0)}%</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-500/20 to-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Total Marks</p>
              <p className="text-3xl font-bold text-blue-400">{selected.total}/200</p>
            </div>
            <div className="bg-gradient-to-br from-orange-500/20 to-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-slate-400 text-sm mb-1">Percentage</p>
              <p className="text-3xl font-bold text-orange-400">{selected.percentage.toFixed(1)}%</p>
            </div>
            <div className={`rounded-lg p-4 border bg-gradient-to-br ${getGradeColor(selected.grade)}`}>
              <p className="text-slate-400 text-sm mb-1">Final Grade</p>
              <p className="text-3xl font-bold">{selected.grade}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
