"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface TeacherLayoutProps {
  children: React.ReactNode
}

export default function TeacherLayout({ children }: TeacherLayoutProps) {
  const [userName, setUserName] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in and is a teacher
    const role = localStorage.getItem("userRole")
    const name = localStorage.getItem("userName")

    if (role !== "teacher" || !name) {
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

  // Clone children with props
  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child)
      ? React.cloneElement(child, { userName, onLogout: handleLogout })
      : child
  )

  return <>{childrenWithProps}</>
}