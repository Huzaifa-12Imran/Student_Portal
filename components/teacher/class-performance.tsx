"use client"

import { useState } from "react"

export default function ClassPerformance() {
  const [selectedCourse] = useState("CS101")

  const performanceData = [
    { course: "CS101", avgGrade: "B+", avgAttendance: "87%", totalStudents: 45, atRisk: 3 },
    { course: "CS201", avgGrade: "A-", avgAttendance: "92%", totalStudents: 38, atRisk: 1 },
    { course: "CS301", avgGrade: "B", avgAttendance: "85%", totalStudents: 42, atRisk: 5 },
  ]

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">Performance Overview</h3>
          <div className="space-y-4">
            {performanceData.map((data) => (
              <div key={data.course} className="p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-foreground">{data.course}</h4>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {data.totalStudents} Students
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Avg Grade</p>
                    <p className="font-semibold text-foreground">{data.avgGrade}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Attendance</p>
                    <p className="font-semibold text-foreground">{data.avgAttendance}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">At Risk</p>
                    <p className="font-semibold text-destructive">{data.atRisk}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">Grade Distribution</h3>
          <div className="space-y-3">
            {[
              { grade: "A", count: 12, percentage: 26.7 },
              { grade: "B", count: 18, percentage: 40 },
              { grade: "C", count: 10, percentage: 22.2 },
              { grade: "D", count: 4, percentage: 8.9 },
              { grade: "F", count: 1, percentage: 2.2 },
            ].map((item) => (
              <div key={item.grade} className="flex items-center gap-3">
                <span className="font-medium text-foreground w-6">{item.grade}</span>
                <div className="flex-1 bg-input rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      item.grade === "A"
                        ? "bg-accent"
                        : item.grade === "B"
                          ? "bg-primary"
                          : item.grade === "C"
                            ? "bg-chart-3"
                            : "bg-destructive"
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {item.count} ({item.percentage.toFixed(1)}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
