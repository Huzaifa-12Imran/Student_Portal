"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ModernLogin from "@/components/modern-login"
import ModernStudentDashboard from "@/components/modern-student-dashboard"
import ModernTeacherDashboard from "@/components/modern-teacher-dashboard"
import ModernAdminDashboard from "@/components/modern-admin-dashboard"

type UserRole = "student" | "teacher" | "admin" | null

export default function Home() {
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [userName, setUserName] = useState<string>("")
  const router = useRouter()

  const handleLogout = () => {
    setUserRole(null)
    setUserName("")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
  }

  const handleLogin = (role: UserRole, name: string) => {
    setUserRole(role)
    setUserName(name)
    // Store in localStorage for persistence across page navigations
    localStorage.setItem("userRole", role || "")
    localStorage.setItem("userName", name)
  }

  useEffect(() => {
    // Always start at login screen on app load
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    setUserRole(null)
    setUserName("")
  }, [])

  useEffect(() => {
    if (userRole === "teacher") {
      router.push("/teacher")
    }
  }, [userRole, router])

  return (
    <main className="min-h-screen bg-background">
      {!userRole ? (
        <ModernLogin onLogin={handleLogin} />
      ) : userRole === "admin" ? (
        <ModernAdminDashboard userName={userName} onLogout={handleLogout} />
      ) : userRole === "teacher" ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Redirecting to teacher dashboard...</p>
          </div>
        </div>
      ) : (
        <ModernStudentDashboard userName={userName} onLogout={handleLogout} />
      )}
    </main>
  )
}
