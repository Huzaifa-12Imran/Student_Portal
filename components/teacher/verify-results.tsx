"use client"

import { useState } from "react"
import { CheckCircle, Clock, AlertCircle, MessageSquare } from "lucide-react"

interface Submission {
  id: string
  student: string
  course: string
  marks: number
  status: "pending" | "approved" | "changes_requested"
}

const GRADE_COLORS = {
  A: "from-emerald-500/20 to-emerald-500/10 border-emerald-500/30 text-emerald-400",
  B: "from-blue-500/20 to-blue-500/10 border-blue-500/30 text-blue-400",
  C: "from-yellow-500/20 to-yellow-500/10 border-yellow-500/30 text-yellow-400",
  D: "from-orange-500/20 to-orange-500/10 border-orange-500/30 text-orange-400",
  F: "from-red-500/20 to-red-500/10 border-red-500/30 text-red-400",
}

const getGradeFromMarks = (marks: number): keyof typeof GRADE_COLORS => {
  if (marks >= 90) return "A"
  if (marks >= 80) return "B"
  if (marks >= 70) return "C"
  if (marks >= 60) return "D"
  return "F"
}

export default function VerifyResults() {
  const [submissions, setSubmissions] = useState<Submission[]>([
    { id: "s1", student: "Aisha Khan", course: "CS-101", marks: 85, status: "pending" },
    { id: "s2", student: "Rahim Ali", course: "CS-102", marks: 72, status: "pending" },
    { id: "s3", student: "Sara Noor", course: "CS-201", marks: 91, status: "pending" },
  ])

  const updateStatus = (id: string, status: Submission["status"]) => {
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)))
  }

  const pendingCount = submissions.filter((s) => s.status === "pending").length
  const approvedCount = submissions.filter((s) => s.status === "approved").length
  const changesRequestedCount = submissions.filter((s) => s.status === "changes_requested").length

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-2xl font-bold text-white mb-1">Verify Results</h2>
        <p className="text-slate-400 text-sm">Review submitted marks and approve or request changes</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-400">Pending</p>
            <Clock className="w-5 h-5 text-yellow-400" />
          </div>
          <p className="text-3xl font-bold text-yellow-400">{pendingCount}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-400">Approved</p>
            <CheckCircle className="w-5 h-5 text-green-400" />
          </div>
          <p className="text-3xl font-bold text-green-400">{approvedCount}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800 to-slate-850 border border-slate-700/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-slate-400">Changes</p>
            <AlertCircle className="w-5 h-5 text-red-400" />
          </div>
          <p className="text-3xl font-bold text-red-400">{changesRequestedCount}</p>
        </div>
      </div>

      <div className="space-y-4">
        {submissions.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-sm">No submissions to review</p>
          </div>
        ) : (
          submissions.map((sub) => {
            const grade = getGradeFromMarks(sub.marks)
            const gradeColor = GRADE_COLORS[grade]
            
            return (
              <div
                key={sub.id}
                className={`flex items-center justify-between p-6 rounded-lg border transition-all ${
                  sub.status === "approved"
                    ? "bg-green-500/10 border-green-500/30"
                    : sub.status === "changes_requested"
                    ? "bg-red-500/10 border-red-500/30"
                    : "bg-slate-800/50 border-slate-700/30 hover:border-slate-700/50"
                }`}
              >
                <div className="flex items-center gap-6 flex-1">
                  <div className={`px-4 py-2 rounded-lg border bg-gradient-to-br ${gradeColor}`}>
                    <div className="text-2xl font-bold">{grade}</div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-1">{sub.student}</h4>
                    <p className="text-slate-400 text-sm">
                      {sub.course} <span className="text-slate-300 font-medium">• {sub.marks}%</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-sm">
                    {sub.status === "pending" && (
                      <span className="px-3 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 font-medium text-xs inline-flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        Pending
                      </span>
                    )}
                    {sub.status === "approved" && (
                      <span className="px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 font-medium text-xs inline-flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" />
                        Approved
                      </span>
                    )}
                    {sub.status === "changes_requested" && (
                      <span className="px-3 py-1.5 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 font-medium text-xs inline-flex items-center gap-2">
                        <AlertCircle className="w-3 h-3" />
                        Changes Requested
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    {sub.status !== "approved" && (
                      <button
                        onClick={() => updateStatus(sub.id, "approved")}
                        className="px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white rounded-lg font-medium transition-all text-sm inline-flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                    )}
                    {sub.status !== "changes_requested" && (
                      <button
                        onClick={() => updateStatus(sub.id, "changes_requested")}
                        className="px-4 py-2 bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-300 rounded-lg font-medium transition-all text-sm inline-flex items-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        Changes
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
