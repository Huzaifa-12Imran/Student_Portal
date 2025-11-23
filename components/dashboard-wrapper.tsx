'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ModernStudentDashboard from './modern-student-dashboard'
import ModernTeacherDashboard from './modern-teacher-dashboard'
import ModernAdminDashboard from './modern-admin-dashboard'

export default function DashboardWrapper() {
  const { userProfile, isAuthenticated, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !userProfile) {
    return null
  }

  const role = userProfile.role

  return (
    <main className="min-h-screen bg-background">
      {role === 'admin' ? (
        <ModernAdminDashboard userName={userProfile.full_name} onLogout={signOut} />
      ) : role === 'teacher' ? (
        <ModernTeacherDashboard userName={userProfile.full_name} onLogout={signOut} />
      ) : (
        <ModernStudentDashboard userName={userProfile.full_name} onLogout={signOut} />
      )}
    </main>
  )
}
