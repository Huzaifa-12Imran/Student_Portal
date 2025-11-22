"use client"

import { useState } from "react"
import { Download } from "lucide-react"

export default function SystemReports() {
  const [reportType, setReportType] = useState("attendance")

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Generate Reports</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Report Type</label>
            <div className="space-y-2">
              {[
                { id: "attendance", label: "Attendance Report" },
                { id: "results", label: "Results Report" },
                { id: "performance", label: "Performance Analytics" },
                { id: "users", label: "User Statistics" },
              ].map((type) => (
                <label
                  key={type.id}
                  className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-background/50 transition-colors"
                >
                  <input
                    type="radio"
                    name="reportType"
                    value={type.id}
                    checked={reportType === type.id}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-foreground">{type.label}</span>
                </label>
              ))}
            </div>
          </div>

          {}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Filters</label>
            <div className="space-y-3">
              <select className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary">
                <option>Select Semester</option>
                <option>Fall 2024</option>
                <option>Spring 2025</option>
              </select>
              <select className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary">
                <option>Select Department</option>
                <option>Computer Science</option>
                <option>Engineering</option>
                <option>Business</option>
              </select>
              <button onClick={() => alert(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated and downloading...`)} className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Generate PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {[
            { name: "Attendance Summary - Fall 2024", date: "2024-10-15", type: "PDF" },
            { name: "Grade Distribution Report", date: "2024-10-12", type: "PDF" },
            { name: "System Performance Analysis", date: "2024-10-10", type: "PDF" },
          ].map((report, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-background/50 transition-colors"
            >
              <div>
                <p className="font-medium text-foreground">{report.name}</p>
                <p className="text-xs text-muted-foreground">
                  {report.date} • {report.type}
                </p>
              </div>
              <button onClick={() => alert(`Downloading ${report.name}...`)} className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
