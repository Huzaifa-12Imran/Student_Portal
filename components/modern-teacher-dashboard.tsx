"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"
import { useState } from "react"
import { Users, BookOpen, TrendingUp, CheckCircle2, LogOut, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import MarkAttendance from "@/components/teacher/mark-attendance"
import UploadMarks from "@/components/teacher/upload-marks"
import ClassPerformance from "@/components/teacher/class-performance"
import VerifyResults from "@/components/teacher/verify-results"

const classPerformance = [
  { class: "CS-101", students: 45, avgGrade: 78 },
  { class: "CS-102", students: 42, avgGrade: 82 },
  { class: "CS-201", students: 38, avgGrade: 75 },
  { class: "CS-202", students: 40, avgGrade: 88 },
]

const attendanceVsGrade = [
  { attendance: 95, grade: 92 },
  { attendance: 88, grade: 85 },
  { attendance: 78, grade: 72 },
  { attendance: 92, grade: 89 },
  { attendance: 85, grade: 81 },
  { attendance: 75, grade: 68 },
]

interface TeacherDashboardProps {
  userName: string
  onLogout: () => void
}

export default function ModernTeacherDashboard({ userName, onLogout }: TeacherDashboardProps) {
  const [panel, setPanel] = useState<"cards" | "attendance" | "marks" | "performance" | "verify">("cards")

  const openPanelForLabel = (label: string) => {
    if (label === "Mark Attendance") setPanel("attendance")
    else if (label === "Upload Marks") setPanel("marks")
    else if (label === "View Performance") setPanel("performance")
    else if (label === "Verify Results") setPanel("verify")
    else setPanel("cards")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-secondary/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 px-6 py-12 border-b border-border">
          <div className="max-w-7xl mx-auto flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Welcome, {userName}</h1>
              <p className="text-muted-foreground">Manage your classes and track student progress</p>
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
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: "Mark Attendance", color: "from-primary to-secondary", bg: "from-blue-500/20 to-purple-500/10", border: "border-blue-500", text: "text-blue-500" },
            { icon: BookOpen, label: "Upload Marks", color: "from-secondary to-accent", bg: "from-purple-500/20 to-orange-500/10", border: "border-purple-500", text: "text-purple-500" },
            { icon: TrendingUp, label: "View Performance", color: "from-accent to-primary", bg: "from-orange-500/20 to-blue-500/10", border: "border-orange-500", text: "text-orange-500" },
            { icon: CheckCircle2, label: "Verify Results", color: "from-green-600 to-green-500", bg: "from-green-500/20 to-green-600/10", border: "border-green-500", text: "text-green-500" },
          ].map(({ icon: Icon, label, color, bg, border, text }, i) => (
            <button key={i} onClick={() => openPanelForLabel(label)} className={`rounded-xl p-6 group hover:border-white/20 transition-all bg-gradient-to-b ${bg} border ${border}`}>
              <div
                className={
                  label === "Verify Results"
                    ? "w-12 h-12 flex items-center justify-center mb-3"
                    : `w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`
                }
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className={`text-sm font-semibold ${text} group-hover:text-primary transition-colors`}>
                {label}
              </p>
            </button>
          ))}
        </div>

        {panel !== "cards" && (
          <div className="mt-6">
            <button onClick={() => setPanel("cards")} className="text-sm text-primary flex items-center gap-2 mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to overview
            </button>
          </div>
        )}

        {panel === "attendance" && <MarkAttendance />}
        {panel === "marks" && <UploadMarks />}
        {panel === "performance" && <ClassPerformance />}
        {panel === "verify" && <VerifyResults />}

        {}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl p-6 bg-gradient-to-b from-white/8 to-white/5 border border-cyan-500/30 hover:border-cyan-500/60 transition-all">
            <p className="text-muted-foreground text-sm font-semibold mb-2">Total Students</p>
            <div className="text-4xl font-bold text-foreground">165</div>
            <p className="text-sm text-cyan-400 mt-2">Across 4 courses</p>
          </div>
          <div className="rounded-2xl p-6 bg-gradient-to-b from-white/8 to-white/5 border border-green-500/30 hover:border-green-500/60 transition-all">
            <p className="text-muted-foreground text-sm font-semibold mb-2">Attendance Mark</p>
            <div className="text-4xl font-bold text-foreground">87%</div>
            <p className="text-sm text-green-400 mt-2">+5% from last week</p>
          </div>
          <div className="rounded-2xl p-6 bg-gradient-to-b from-white/8 to-white/5 border border-orange-500/30 hover:border-orange-500/60 transition-all">
            <p className="text-muted-foreground text-sm font-semibold mb-2">Pending Reviews</p>
            <div className="text-4xl font-bold text-foreground">12</div>
            <p className="text-sm text-orange-400 mt-2">Grade submissions awaiting review</p>
          </div>
        </div>

        {}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-8 bg-gradient-to-b from-white/8 to-white/5 border border-white/15">
            <h3 className="text-lg font-bold text-foreground mb-6">Class Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={classPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis stroke="rgba(255,255,255,0.5)" dataKey="class" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(20,20,40,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <Bar dataKey="avgGrade" fill="oklch(0.62 0.26 180)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl p-8 bg-gradient-to-b from-white/8 to-white/5 border border-white/15">
            <h3 className="text-lg font-bold text-foreground mb-6">Attendance vs Grade Correlation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="attendance"
                  stroke="rgba(255,255,255,0.5)"
                  label={{ value: "Attendance %", position: "insideBottomRight", offset: -5 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.5)"
                  label={{ value: "Grade %", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(20,20,40,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <Scatter name="Students" data={attendanceVsGrade} fill="oklch(0.70 0.28 50)" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="rounded-2xl p-8 bg-gradient-to-b from-white/8 to-white/5 border border-white/15">
          <h3 className="text-lg font-bold text-foreground mb-6">Your Classes</h3>
          <div className="space-y-4">
            {classPerformance.map((cls) => (
              <div
                key={cls.class}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
              >
                <div>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cls.class}
                  </p>
                  <p className="text-sm text-muted-foreground">{cls.students} students enrolled</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{cls.avgGrade}%</p>
                  <p className="text-xs text-muted-foreground">Class average</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
