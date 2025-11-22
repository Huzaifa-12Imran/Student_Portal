"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts"
import {
  TrendingUp,
  Users,
  BookOpen,
  Award,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Target,
  Calendar,
  GraduationCap
} from "lucide-react"

export default function ClassPerformance() {
  const [selectedCourse, setSelectedCourse] = useState("CS101")

  const performanceData = [
    {
      course: "CS101",
      courseName: "Database Systems",
      avgGrade: "B+",
      avgAttendance: 87,
      totalStudents: 45,
      atRisk: 3,
      grade: 3.3,
      trend: "+2.1%"
    },
    {
      course: "CS201",
      courseName: "Web Development",
      avgGrade: "A-",
      avgAttendance: 92,
      totalStudents: 38,
      atRisk: 1,
      grade: 3.7,
      trend: "+5.3%"
    },
    {
      course: "CS301",
      courseName: "Data Structures",
      avgGrade: "B",
      avgAttendance: 85,
      totalStudents: 42,
      atRisk: 5,
      grade: 3.0,
      trend: "-1.2%"
    },
  ]

  const attendanceTrend = [
    { month: "Jan", attendance: 82 },
    { month: "Feb", attendance: 85 },
    { month: "Mar", attendance: 88 },
    { month: "Apr", attendance: 86 },
    { month: "May", attendance: 90 },
    { month: "Jun", attendance: 87 },
  ]

  // Course-specific data
  const getCourseMetrics = (course: typeof performanceData[0]) => [
    { metric: "Average Grade", value: course.avgGrade, change: course.trend, trend: course.trend.startsWith('+') ? "up" : "down" },
    { metric: "Attendance Rate", value: `${course.avgAttendance}%`, change: "+3%", trend: "up" },
    { metric: "Completion Rate", value: "94%", change: "+1%", trend: "up" },
    { metric: "At-Risk Students", value: course.atRisk.toString(), change: "-2", trend: "down" },
  ]

  const getCourseGradeDistribution = (course: typeof performanceData[0]) => {
    // Mock different grade distributions for each course
    const distributions = {
      "CS101": [
        { grade: "A", count: 12, percentage: 26.7, color: "#10b981" },
        { grade: "B", count: 18, percentage: 40, color: "#3b82f6" },
        { grade: "C", count: 10, percentage: 22.2, color: "#f59e0b" },
        { grade: "D", count: 4, percentage: 8.9, color: "#ef4444" },
        { grade: "F", count: 1, percentage: 2.2, color: "#7c3aed" },
      ],
      "CS201": [
        { grade: "A", count: 8, percentage: 40, color: "#10b981" },
        { grade: "B", count: 6, percentage: 30, color: "#3b82f6" },
        { grade: "C", count: 4, percentage: 20, color: "#f59e0b" },
        { grade: "D", count: 1, percentage: 5, color: "#ef4444" },
        { grade: "F", count: 1, percentage: 5, color: "#7c3aed" },
      ],
      "CS301": [
        { grade: "A", count: 10, percentage: 25, color: "#10b981" },
        { grade: "B", count: 15, percentage: 37.5, color: "#3b82f6" },
        { grade: "C", count: 8, percentage: 20, color: "#f59e0b" },
        { grade: "D", count: 5, percentage: 12.5, color: "#ef4444" },
        { grade: "F", count: 2, percentage: 5, color: "#7c3aed" },
      ],
    }
    return distributions[course.course as keyof typeof distributions] || distributions["CS101"]
  }

  const selectedCourseData = performanceData.find(p => p.course === selectedCourse) || performanceData[0]
  const performanceMetrics = getCourseMetrics(selectedCourseData)
  const gradeDistribution = getCourseGradeDistribution(selectedCourseData)

  return (
    <div className="space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/20 rounded-lg">
            <BarChart3 className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Class Performance Analytics</h1>
            <p className="text-slate-400 text-sm mt-1">Comprehensive insights into student performance and course metrics</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-slate-800/50 border border-slate-700/30 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-400" />
              <h3 className="font-semibold text-white">Select Course</h3>
            </div>
            <div className="space-y-2">
              {performanceData.map((course) => (
                <button
                  key={course.course}
                  onClick={() => setSelectedCourse(course.course)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    selectedCourse === course.course
                      ? "bg-blue-500/20 border border-blue-500/50 text-blue-300"
                      : "bg-slate-700/30 hover:bg-slate-700/50 text-slate-300"
                  }`}
                >
                  <div className="font-medium text-sm">{course.course}</div>
                  <div className="text-xs text-slate-400">{course.courseName}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceMetrics.map((metric, index) => (
              <div key={metric.metric} className="bg-slate-800/50 border border-slate-700/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-slate-400">{metric.metric}</span>
                  <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                    metric.trend === "up"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    <TrendingUp className={`w-3 h-3 ${metric.trend === "down" ? "rotate-180" : ""}`} />
                    {metric.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {performanceData.map((data) => (
          <div
            key={data.course}
            className={`border rounded-xl p-6 transition-all ${
              selectedCourse === data.course
                ? "bg-slate-800 border-blue-500/50 shadow-lg shadow-blue-500/20"
                : "bg-slate-800/50 border-slate-700/30 hover:border-slate-700/50"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold text-white text-lg">{data.course}</h4>
                <p className="text-sm text-slate-400">{data.courseName}</p>
              </div>
              <div className="flex items-center gap-2 bg-slate-700/30 px-3 py-1 rounded-lg">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-300">{data.totalStudents}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
                <Award className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-orange-400">{data.avgGrade}</div>
                <div className="text-xs text-slate-400">Avg Grade</div>
              </div>
              <div className="text-center p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <CheckCircle className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <div className="text-lg font-bold text-blue-400">{data.avgAttendance}%</div>
                <div className="text-xs text-slate-400">Attendance</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-slate-400">
                  {data.atRisk} at risk
                </span>
              </div>
              <div className={`text-sm font-medium ${
                data.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {data.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 border border-slate-700/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <PieChartIcon className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Grade Distribution</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [`${value} students`, `Grade ${name}`]}
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '8px',
                    color: '#e2e8f0'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-4">
            {gradeDistribution.map((item) => (
              <div key={item.grade} className="text-center">
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-1"
                  style={{ backgroundColor: item.color }}
                />
                <div className="text-xs font-medium text-white">{item.grade}</div>
                <div className="text-xs text-slate-400">{item.percentage.toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 border border-slate-700/30 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-green-400" />
            <h3 className="font-semibold text-white">Attendance Trend</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100,116,139,0.1)" />
                <XAxis
                  dataKey="month"
                  stroke="rgba(100,116,139,0.5)"
                  fontSize={12}
                  tick={{ fill: 'rgba(148, 163, 184, 0.7)' }}
                />
                <YAxis
                  stroke="rgba(100,116,139,0.5)"
                  fontSize={12}
                  domain={[70, 100]}
                  tick={{ fill: 'rgba(148, 163, 184, 0.7)' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(100, 116, 139, 0.3)',
                    borderRadius: '8px',
                    color: '#e2e8f0'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="attendance"
                  stroke="#60a5fa"
                  fill="url(#attendanceGradient)"
                  strokeWidth={2}
                />
                <defs>
                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/30 border border-slate-700/30 rounded-xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-semibold text-white">Performance Insights</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-700/40 rounded-lg p-4 border border-slate-600/30">
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4 text-orange-400" />
              <span className="font-medium text-white">Top Performers</span>
            </div>
            <p className="text-sm text-slate-400 mb-2">
              40% of students achieved A or B grades this semester
            </p>
            <div className="text-2xl font-bold text-orange-400">18/45</div>
          </div>

          <div className="bg-slate-700/40 rounded-lg p-4 border border-slate-600/30">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="font-medium text-white">Students Needing Support</span>
            </div>
            <p className="text-sm text-slate-400 mb-2">
              Students with attendance below 80% or failing grades
            </p>
            <div className="text-2xl font-bold text-red-400">8</div>
          </div>

          <div className="bg-slate-700/40 rounded-lg p-4 border border-slate-600/30">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="font-medium text-white">Improvement Areas</span>
            </div>
            <p className="text-sm text-slate-400 mb-2">
              Focus on practical assignments and attendance tracking
            </p>
            <div className="text-sm font-medium text-green-400">+15% engagement</div>
          </div>
        </div>
      </div>
    </div>
  )
}
