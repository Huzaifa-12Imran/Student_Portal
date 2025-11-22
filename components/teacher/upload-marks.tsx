"use client"

import { useState } from "react"
import { Upload, Calculator as Calculate, Save } from "lucide-react"

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

export default function UploadMarks() {
  const [courseId, setCourseId] = useState("CS101")
  const [marks, setMarks] = useState<StudentMarks[]>([
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
  ])

  const INITIAL_MARKS: StudentMarks[] = [
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
  ]

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
      // naive CSV parser: expect header and rows: id,name,quiz,assignment,midterm,final
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
    setMarks(INITIAL_MARKS)
  }

  const handleMarkChange = (studentId: string, field: string, value: number) => {
    setMarks(marks.map((m) => (m.studentId === studentId ? { ...m, [field]: value } : m)))
  }

  const handleSave = () => {
    localStorage.setItem(`marks_${courseId}`, JSON.stringify(marks))
    alert("Marks saved successfully!")
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      {}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Upload Student Marks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
          <div className="flex items-end gap-2">
            <label className="flex-1">
              <input
                type="file"
                accept="text/csv"
                onChange={(e) => handleImportCSV(e.target.files ? e.target.files[0] : null)}
                className="hidden"
              />
              <div className="w-full px-4 py-2 bg-input border border-border text-foreground rounded-lg font-medium hover:bg-border transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <Upload className="w-4 h-4" />
                Import CSV
              </div>
            </label>
            <button
              onClick={calculateGrades}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Calculate className="w-4 h-4" />
              Calculate
            </button>
          </div>
        </div>
      </div>

      {}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <p className="text-sm text-foreground font-medium mb-2">Grading Scale</p>
        <div className="grid grid-cols-4 gap-2 text-sm">
          <div>A: 90-100%</div>
          <div>B: 80-89%</div>
          <div>C: 70-79%</div>
          <div>D: 60-69%</div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Max Marks: Quiz (20) + Assignment (40) + Midterm (50) + Final (100) = 200
        </p>
      </div>

      {}
      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground">Name</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Quiz (20)</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Assign (40)</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Midterm (50)</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Final (100)</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Total</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">%</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground">Grade</th>
            </tr>
          </thead>
          <tbody>
            {marks.map((m) => (
              <tr key={m.studentId} className="border-b border-border hover:bg-background/50">
                <td className="px-4 py-3 text-sm text-muted-foreground">{m.studentId}</td>
                <td className="px-4 py-3 text-sm text-foreground">{m.name}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    max="20"
                    value={m.quiz}
                    onChange={(e) => handleMarkChange(m.studentId, "quiz", Number.parseInt(e.target.value) || 0)}
                    className="w-12 px-2 py-1 bg-input border border-border rounded text-sm text-center text-foreground focus:ring-1 focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    max="40"
                    value={m.assignment}
                    onChange={(e) => handleMarkChange(m.studentId, "assignment", Number.parseInt(e.target.value) || 0)}
                    className="w-12 px-2 py-1 bg-input border border-border rounded text-sm text-center text-foreground focus:ring-1 focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    max="50"
                    value={m.midterm}
                    onChange={(e) => handleMarkChange(m.studentId, "midterm", Number.parseInt(e.target.value) || 0)}
                    className="w-12 px-2 py-1 bg-input border border-border rounded text-sm text-center text-foreground focus:ring-1 focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    max="100"
                    value={m.final}
                    onChange={(e) => handleMarkChange(m.studentId, "final", Number.parseInt(e.target.value) || 0)}
                    className="w-12 px-2 py-1 bg-input border border-border rounded text-sm text-center text-foreground focus:ring-1 focus:ring-primary"
                  />
                </td>
                <td className="px-4 py-3 text-sm font-medium text-center text-foreground">{m.totalMarks}</td>
                <td className="px-4 py-3 text-sm font-medium text-center text-primary">{m.percentage.toFixed(1)}%</td>
                <td className="px-4 py-3 text-sm font-bold text-center">
                  <span
                    className={`px-2 py-1 rounded ${
                      m.grade === "A"
                        ? "bg-accent/20 text-accent"
                        : m.grade === "B"
                          ? "bg-primary/20 text-primary"
                          : m.grade === "C"
                            ? "bg-chart-3/20 text-chart-3"
                            : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {m.grade}
                  </span>
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
          Save Marks
        </button>
        <button onClick={handleCancel} className="px-6 py-2.5 bg-input border border-border text-foreground rounded-lg font-medium hover:bg-border transition-colors">
          Cancel
        </button>
      </div>
    </div>
  )
}
