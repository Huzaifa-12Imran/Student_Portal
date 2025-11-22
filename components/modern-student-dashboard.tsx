"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ArrowUp, TrendingUp, Award, AlertCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

const attendanceData = [
  { week: "W1", percentage: 95 },
  { week: "W2", percentage: 92 },
  { week: "W3", percentage: 88 },
  { week: "W4", percentage: 85 },
  { week: "W5", percentage: 82 },
  { week: "W6", percentage: 78 },
]

const assessmentThreshold = 70

const gradeData = [
  { name: "Quiz", value: 85, fill: 85 >= assessmentThreshold ? "oklch(0.5 0.28 225)" : "oklch(0.55 0.25 15)" },
  { name: "Assignment", value: 90, fill: 90 >= assessmentThreshold ? "oklch(0.46 0.26 180)" : "oklch(0.52 0.23 15)" },
  { name: "Midterm", value: 88, fill: 88 >= assessmentThreshold ? "oklch(10 0.63 15)" : "oklch(0.60 0.25 15)" },
]

interface StudentDashboardProps {
  userName: string
  onLogout: () => void
}

export default function ModernStudentDashboard({ userName, onLogout }: StudentDashboardProps) {
  const attendancePercentage = 72
  const attendanceThreshold = 75
  const isAboveThreshold = attendancePercentage >= attendanceThreshold

  const gpa = 3.72
  const gpaThreshold = 3.0
  const isGpaAboveThreshold = gpa >= gpaThreshold

  const courseThreshold = 70
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 px-6 py-12 border-b border-border">
          <div className="max-w-7xl mx-auto flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Welcome back, {userName}</h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Your learning journey continues
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout} className="rounded-lg bg-transparent">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {}
        <div className="grid md:grid-cols-3 gap-6">
          <div className={`rounded-2xl p-6 relative overflow-hidden group bg-gradient-to-b from-white/8 to-white/5 ${isAboveThreshold ? 'border border-green-500/30 hover:border-green-500/60' : 'border border-red-500/30 hover:border-red-500/60'} transition-all duration-300`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${isAboveThreshold ? 'from-green-500/15' : 'from-red-500/15'} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-sm font-semibold">Attendance</p>
                <div className={`w-10 h-10 rounded-lg ${isAboveThreshold ? 'bg-green-500/20' : 'bg-red-500/20'} flex items-center justify-center`}>
                  <TrendingUp className={`w-5 h-5 ${isAboveThreshold ? 'text-green-400' : 'text-red-400'}`} />
                </div>
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">{attendancePercentage}%</div>
              <p className={`text-sm ${isAboveThreshold ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
                {isAboveThreshold ? <ArrowUp className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {isAboveThreshold ? 'Above' : 'Below'} {attendanceThreshold}% threshold
              </p>
            </div>
          </div>

          <div className={`rounded-2xl p-6 relative overflow-hidden group bg-gradient-to-b from-white/8 to-white/5 ${isGpaAboveThreshold ? 'border border-green-500/30 hover:border-green-500/60' : 'border border-red-500/30 hover:border-red-500/60'} transition-all duration-300`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${isGpaAboveThreshold ? 'from-green-500/15' : 'from-red-500/15'} via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-sm font-semibold">Overall GPA</p>
                <div className={`w-10 h-10 rounded-lg ${isGpaAboveThreshold ? 'bg-green-500/20' : 'bg-red-500/20'} flex items-center justify-center`}>
                  <Award className={`w-5 h-5 ${isGpaAboveThreshold ? 'text-green-400' : 'text-red-400'}`} />
                </div>
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">{gpa}</div>
              <p className={`text-sm ${isGpaAboveThreshold ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
                {isGpaAboveThreshold ? <ArrowUp className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                {isGpaAboveThreshold ? '+0.15 this semester' : 'Below 3.0 threshold'}
              </p>
            </div>
          </div>

          <div className="rounded-2xl p-6 relative overflow-hidden group bg-gradient-to-b from-white/8 to-white/5 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-sm font-semibold">Active Courses</p>
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-400">📚</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">6</div>
              <p className="text-sm text-muted-foreground">All enrolled and active</p>
            </div>
          </div>
        </div>

        {}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-8 bg-gradient-to-b from-white/8 to-white/5 border border-white/15">
            <h3 className="text-lg font-bold text-foreground mb-6">Attendance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(20,20,40,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
                  cursor={{ stroke: "rgba(255,255,255,0.2)" }}
                />
                <Line
                  type="monotone"
                  dataKey="percentage"
                  stroke="oklch(0.65 0.28 290)"
                  strokeWidth={3}
                  dot={{ fill: "oklch(0.65 0.28 290)" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl p-8 bg-gradient-to-b from-white/8 to-white/5 border border-white/15">
            <h3 className="text-lg font-bold text-foreground mb-6">Assessment Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                >
                  {gradeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(20,20,40,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {gradeData.map((assessment, index) => {
                const isAboveThreshold = assessment.value >= assessmentThreshold
                return (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{assessment.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-semibold ${isAboveThreshold ? 'text-green-400' : 'text-red-400'}`}>
                        {assessment.value}%
                      </span>
                      {isAboveThreshold ? (
                        <ArrowUp className="w-4 h-4 text-green-400" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {}
        <div className="rounded-2xl p-8 bg-gradient-to-b from-white/8 to-white/5 border border-white/15">
          <h3 className="text-lg font-bold text-foreground mb-6">Your Courses</h3>
          <div className="space-y-4">
            {["Data Structures", "Web Development", "Database Systems", "Software Engineering"].map((course, i) => {
              const courseGrade = 85 + i * 2
              const isCourseAboveThreshold = courseGrade >= courseThreshold
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors ${isCourseAboveThreshold ? 'border-l-4 border-l-green-500' : 'border-l-4 border-l-red-500'}`}
                >
                  <div>
                    <p className="font-semibold text-foreground">{course}</p>
                    <p className="text-sm text-muted-foreground">Prof. Johnson • Sem 2</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${isCourseAboveThreshold ? 'text-green-400' : 'text-red-400'}`}>{courseGrade}%</p>
                    <p className={`text-xs ${isCourseAboveThreshold ? 'text-green-400' : 'text-red-400'}`}>Grade: {String.fromCharCode(65 + i)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
