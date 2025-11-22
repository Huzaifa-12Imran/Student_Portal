"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Submission {
  id: string
  student: string
  course: string
  marks: number
  status: "pending" | "approved" | "changes_requested"
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

  return (
    <div className="rounded-2xl p-8 bg-gradient-to-b from-white/8 to-white/5 border border-white/15">
      <h3 className="text-lg font-bold text-foreground mb-4">Verify Results</h3>
      <p className="text-muted-foreground mb-6">Review submitted marks and approve or request changes.</p>

      <div className="space-y-4">
        {submissions.map((sub) => (
          <div key={sub.id} className="flex items-center justify-between p-4 rounded-lg bg-white/3">
            <div>
              <div className="font-semibold text-foreground">{sub.student}</div>
              <div className="text-sm text-muted-foreground">{sub.course} — <span className="font-medium">{sub.marks}%</span></div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-sm">
                {sub.status === "pending" && <span className="px-2 py-1 rounded-md bg-yellow-500/20 text-yellow-400">Pending</span>}
                {sub.status === "approved" && <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-400">Approved</span>}
                {sub.status === "changes_requested" && <span className="px-2 py-1 rounded-md bg-red-500/10 text-red-400">Changes Requested</span>}
              </div>

              <div className="flex items-center gap-2">
                <Button size="sm" onClick={() => updateStatus(sub.id, "approved")} className="rounded-md">
                  Approve
                </Button>
                <Button size="sm" variant="outline" onClick={() => updateStatus(sub.id, "changes_requested") } className="rounded-md">
                  Request Changes
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
