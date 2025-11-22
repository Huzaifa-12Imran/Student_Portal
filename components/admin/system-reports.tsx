"use client"

import { useState } from "react"
import { Download, BarChart3, PieChart as PieChartIcon, Filter, MoreVertical, Calendar, Building2, FileDown, RefreshCw } from "lucide-react"

export default function SystemReports() {
  const [reportType, setReportType] = useState("attendance")
  const [semester, setSemester] = useState("fall-2024")
  const [department, setDepartment] = useState("all")
  const [showActions, setShowActions] = useState(false)
  const [showSemesterMenu, setShowSemesterMenu] = useState(false)
  const [showDepartmentMenu, setShowDepartmentMenu] = useState(false)

  const semesterOptions = [
    { value: "fall-2024", label: "Fall 2024" },
    { value: "spring-2025", label: "Spring 2025" },
    { value: "summer-2025", label: "Summer 2025" },
  ]

  const departmentOptions = [
    { value: "all", label: "All Departments" },
    { value: "cs", label: "Computer Science" },
    { value: "eng", label: "Engineering" },
    { value: "bus", label: "Business" },
  ]

  const reportStats = {
    attendance: { total: 4250, percentage: 87.5 },
    results: { total: 1240, percentage: 94.2 },
    performance: { total: 865, percentage: 89.3 },
    users: { total: 2150, percentage: 91.8 },
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 mb-2">
        <h2 className="text-2xl font-bold text-white mb-1">System Analytics & Reports</h2>
        <p className="text-slate-400 text-sm">Generate and download system-wide reports and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6">
          <h3 className="font-semibold text-white mb-4">Report Type</h3>
          <div className="space-y-2">
            {[
              { id: "attendance", label: "Attendance Report", icon: BarChart3 },
              { id: "results", label: "Results Report", icon: BarChart3 },
              { id: "performance", label: "Performance Analytics", icon: PieChartIcon },
              { id: "users", label: "User Statistics", icon: BarChart3 },
            ].map((type) => {
              const IconComponent = type.icon
              return (
                <label
                  key={type.id}
                  className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                    reportType === type.id
                      ? "bg-blue-500/20 border-blue-500/50"
                      : "bg-slate-700/20 border-slate-700/30 hover:border-slate-700/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="reportType"
                    value={type.id}
                    checked={reportType === type.id}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-4 h-4"
                  />
                  <IconComponent className="w-4 h-4 text-blue-400" />
                  <span className="text-slate-300 font-medium">{type.label}</span>
                </label>
              )
            })}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-400" />
              Filters & Actions
            </h3>
            <div className="relative">
              <button
                onClick={() => setShowActions(!showActions)}
                className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
              {showActions && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-700 border border-slate-600/50 rounded-lg shadow-lg z-50">
                  <button onClick={() => alert("Report settings opened")} className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600/50 hover:text-white transition-colors first:rounded-t-lg flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Refresh Data
                  </button>
                  <button onClick={() => alert("Exporting to Excel...")} className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600/50 hover:text-white transition-colors flex items-center gap-2">
                    <FileDown className="w-4 h-4" />
                    Export as CSV
                  </button>
                  <button onClick={() => alert("Schedule settings opened")} className="w-full text-left px-4 py-3 text-slate-300 hover:bg-slate-600/50 hover:text-white transition-colors last:rounded-b-lg flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule Report
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-400 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  Semester
                </label>
                <button
                  onClick={() => {
                    setShowSemesterMenu(!showSemesterMenu)
                    setShowDepartmentMenu(false)
                  }}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-500/30 hover:border-blue-500/50 rounded-lg text-white text-sm font-medium transition-all flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-600/30 hover:to-blue-700/30"
                >
                  <span>{semesterOptions.find(o => o.value === semester)?.label}</span>
                  <svg className={`w-4 h-4 transition-transform ${showSemesterMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {showSemesterMenu && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-blue-500/30 rounded-lg shadow-lg z-50 overflow-hidden">
                    {semesterOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSemester(option.value)
                          setShowSemesterMenu(false)
                        }}
                        className={`w-full text-left px-4 py-2.5 transition-all border-b border-slate-700/50 last:border-b-0 ${
                          semester === option.value
                            ? "bg-blue-600/30 text-blue-300 font-semibold"
                            : "text-slate-300 hover:bg-slate-700/50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-xs font-semibold text-slate-400 mb-2 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-400" />
                  Department
                </label>
                <button
                  onClick={() => {
                    setShowDepartmentMenu(!showDepartmentMenu)
                    setShowSemesterMenu(false)
                  }}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600/20 to-purple-700/20 border border-purple-500/30 hover:border-purple-500/50 rounded-lg text-white text-sm font-medium transition-all flex items-center justify-between hover:bg-gradient-to-r hover:from-purple-600/30 hover:to-purple-700/30"
                >
                  <span>{departmentOptions.find(o => o.value === department)?.label}</span>
                  <svg className={`w-4 h-4 transition-transform ${showDepartmentMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {showDepartmentMenu && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-purple-500/30 rounded-lg shadow-lg z-50 overflow-hidden">
                    {departmentOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setDepartment(option.value)
                          setShowDepartmentMenu(false)
                        }}
                        className={`w-full text-left px-4 py-2.5 transition-all border-b border-slate-700/50 last:border-b-0 ${
                          department === option.value
                            ? "bg-purple-600/30 text-purple-300 font-semibold"
                            : "text-slate-300 hover:bg-slate-700/50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => alert(`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated for ${semester} • ${department}...`)}
              className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/20"
            >
              <Download className="w-4 h-4" />
              Generate PDF Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Records", value: reportStats[reportType as keyof typeof reportStats].total.toLocaleString(), color: "blue" },
          { label: "Completion Rate", value: reportStats[reportType as keyof typeof reportStats].percentage + "%", color: "green" },
          { label: "Active Users", value: "1,240", color: "purple" },
          { label: "Last Updated", value: "Today", color: "orange" },
        ].map((stat, idx) => (
          <div key={idx} className={`bg-gradient-to-br from-slate-700 to-slate-750 border border-slate-600/30 rounded-lg p-4`}>
            <p className="text-slate-400 text-sm mb-2">{stat.label}</p>
            <p className={`text-2xl font-bold ${
              stat.color === "blue" ? "text-blue-400" :
              stat.color === "green" ? "text-green-400" :
              stat.color === "purple" ? "text-purple-400" :
              "text-orange-400"
            }`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6">
        <h3 className="font-semibold text-white mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {[
            { name: "Attendance Summary - Fall 2024", date: "2024-10-15", type: "PDF", size: "2.4 MB" },
            { name: "Grade Distribution Report", date: "2024-10-12", type: "PDF", size: "1.8 MB" },
            { name: "System Performance Analysis", date: "2024-10-10", type: "PDF", size: "3.2 MB" },
          ].map((report, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 bg-slate-700/20 border border-slate-700/30 rounded-lg hover:border-slate-700/50 transition-all"
            >
              <div>
                <p className="font-medium text-white">{report.name}</p>
                <p className="text-xs text-slate-400">
                  {report.date} • {report.type} • {report.size}
                </p>
              </div>
              <button onClick={() => alert(`Downloading ${report.name}...`)} className="p-2 text-slate-400 hover:text-blue-400 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
