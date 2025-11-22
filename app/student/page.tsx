"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import ModernStudentDashboard from "@/components/modern-student-dashboard"

export default function StudentDashboard() {
  const [userName, setUserName] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    const name = localStorage.getItem("userName")

    if (role !== "student" || !name) {
      router.push("/")
      return
    }

    setUserName(name)
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    window.location.href = "/"
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return <ModernStudentDashboard userName={userName} onLogout={handleLogout} />
}
