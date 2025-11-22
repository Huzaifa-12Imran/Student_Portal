"use client"

import { useState } from "react"
import { BookOpen, Clock, LogOut, BarChart3, Users } from "lucide-react"
import Sidebar from "./sidebar"
import StatCard from "./stat-card"
import MarkAttendance from "./teacher/mark-attendance"
import UploadMarks from "./teacher/upload-marks"
import ClassPerformance from "./teacher/class-performance"

interface TeacherDashboardProps {
  userName: string
  onLogout: () => void
}

export default function TeacherDashboard({ userName, onLogout }: TeacherDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "attendance", label: "Mark Attendance", icon: Clock },
    { id: "marks", label: "Upload Marks", icon: BookOpen },
    { id: "performance", label: "Class Performance", icon: Users },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        role="Teacher"
        userName={userName}
        items={sidebarItems}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
      />

      <main className="flex-1 overflow-auto">
        {}
        <header className="sticky top-0 bg-card border-b border-border px-8 py-4 flex justify-between items-center z-40">
          <h1 className="text-2xl font-bold text-foreground">
            {sidebarItems.find((item) => item.id === activeTab)?.label}
          </h1>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </header>

        {}
        <div className="p-8">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-foreground">Welcome back, {userName}!</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Classes" value="6" change="This semester" icon="📚" />
                <StatCard label="Total Students" value="285" change="Across all classes" icon="👨‍🎓" />
                <StatCard label="Avg Attendance" value="87%" change="+2% from last week" icon="✅" />
                <StatCard label="Pending Marks" value="12" change="Need review" icon="📝" />
              </div>

              {}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setActiveTab("attendance")}
                    className={`rounded-lg p-6 transition-colors text-left group ${
                      activeTab === "attendance"
                        ? "bg-primary/10 border-primary border-2"
                        : "bg-card border border-border hover:border-primary hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                      <h4 className="font-semibold text-foreground">Mark Attendance</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Take attendance for your classes</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("marks")}
                    className={`rounded-lg p-6 transition-colors text-left group ${
                      activeTab === "marks"
                        ? "bg-primary/10 border-primary border-2"
                        : "bg-card border border-border hover:border-primary hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <BookOpen className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                      <h4 className="font-semibold text-foreground">Upload Marks</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Enter and manage student grades</p>
                  </button>

                  <button
                    onClick={() => setActiveTab("performance")}
                    className={`rounded-lg p-6 transition-colors text-left group ${
                      activeTab === "performance"
                        ? "bg-primary/10 border-primary border-2"
                        : "bg-card border border-border hover:border-primary hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                      <h4 className="font-semibold text-foreground">View Performance</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Check class performance analytics</p>
                  </button>
                </div>
              </div>

              {}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">My Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Database Systems", students: 45, section: "A" },
                    { name: "Web Development", students: 38, section: "B" },
                    { name: "Data Structures", students: 42, section: "A" },
                    { name: "Advanced Algorithms", students: 35, section: "C" },
                  ].map((course, idx) => (
                    <div key={idx} className="bg-card border border-border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-foreground">{course.name}</h4>
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          Section {course.section}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{course.students} students enrolled</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setActiveTab("attendance")}
                          className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs rounded transition-colors ${
                            activeTab === "attendance"
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/10 hover:border-primary hover:text-white text-primary"
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          Attendance
                        </button>
                        <button
                          onClick={() => setActiveTab("marks")}
                          className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs rounded transition-colors ${
                            activeTab === "marks"
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/10 hover:border-primary hover:text-white text-primary"
                          }`}
                        >
                          <BookOpen className="w-3 h-3" />
                          Marks
                        </button>
                        <button
                          onClick={() => setActiveTab("performance")}
                          className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 text-xs rounded transition-colors ${
                            activeTab === "performance"
                              ? "bg-primary text-primary-foreground"
                              : "bg-primary/10 hover:border-primary hover:text-white text-primary"
                          }`}
                        >
                          <Users className="w-3 h-3" />
                          Performance
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "attendance" && <MarkAttendance />}
          {activeTab === "marks" && <UploadMarks />}
          {activeTab === "performance" && <ClassPerformance />}
        </div>
      </main>
    </div>
  )
}
