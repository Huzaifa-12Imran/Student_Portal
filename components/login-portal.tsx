"use client"

import type React from "react"
import { useState } from "react"
import { BookOpen, Lock, User } from "lucide-react"

interface LoginPortalProps {
  onLogin: (role: "student" | "teacher" | "admin", name: string) => void
}

export default function LoginPortal({ onLogin }: LoginPortalProps) {
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | "admin" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    if (!selectedRole) {
      setError("Please select a user role")
      return
    }

    
    const name = email.split("@")[0]
    onLogin(selectedRole, name)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center ribbon-wrapper">
        {/* background (plain) */}
        {/* Left: Branding / Illustration */}
        <div className="hidden md:flex flex-col items-start gap-6 p-8 bg-transparent rounded-2xl z-20">
          <div className="flex items-center gap-3">
            <div className="p-3 logo-halo rounded-lg">
              <BookOpen className="w-7 h-7" style={{ color: 'var(--color-warm)' }} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-foreground">Welcome to Academic Portal</h2>
              <p className="text-sm text-muted">Attendance, results and classroom management — simplified.</p>
            </div>
          </div>

          <div className="mt-4 text-sm text-muted">
            <p className="mb-2">Choose your role on the right, then sign in with your credentials.</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Secure single-sign on for staff and students</li>
              <li>Quick access to attendance and reports</li>
            </ul>
          </div>
        </div>

        {/* Right: Card */}
        <div className="bg-white rounded-2xl p-8 shadow-md theme-shadow border border-gray-100 relative z-30 ribbon-container">
        {}
          <div className="text-center mb-6 animate-fade-up" style={{ animationDelay: '60ms' }}>
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white rounded-lg border border-gray-100">
                <BookOpen className="w-8 h-8" style={{ color: 'var(--color-warm)' }} />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Sign in to Academic Portal</h1>
            <p className="text-sm text-muted">Select your role and sign in to continue</p>
          </div>

        {}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-3">Select Your Role</label>
            <div className="flex gap-4 justify-center">
              <div className="w-60 animate-fade-up" style={{ animationDelay: '100ms' }}>
                <RoleCard
                  title="Student"
                  desc="View attendance & grades"
                  icon="🎓"
                  selected={selectedRole === 'student'}
                  onClick={() => setSelectedRole('student')}
                />
              </div>
              <div className="w-60 animate-fade-up" style={{ animationDelay: '160ms' }}>
                <RoleCard
                  title="Teacher"
                  desc="Mark attendance & upload marks"
                  icon="🧑‍🏫"
                  selected={selectedRole === 'teacher'}
                  onClick={() => setSelectedRole('teacher')}
                />
              </div>
              <div className="w-60 animate-fade-up" style={{ animationDelay: '220ms' }}>
                <RoleCard
                  title="Administrator"
                  desc="System management"
                  icon="⚙️"
                  selected={selectedRole === 'admin'}
                  onClick={() => setSelectedRole('admin')}
                />
              </div>
            </div>
          </div>

        {}
        <form onSubmit={handleLogin} className="space-y-4">
          {}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="email"
                type="email"
                placeholder={`Enter ${selectedRole || "your"} email`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {}
          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}

          {}
          <button
            type="submit"
            className="w-full py-2.5 bg-warm-600 hover:bg-warm-800 text-white font-semibold rounded-lg transition-transform duration-200 transform hover:scale-102 active:scale-97 flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Sign In
          </button>
        </form>

        {}
          <div className="mt-6 p-4 bg-gray-50 border border-gray-100 rounded-lg text-sm text-muted">
            <p className="font-semibold mb-2">Demo Credentials</p>
            <div className="space-y-1">
              <p>• Email: demo@school.edu</p>
              <p>• Password: demo123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RoleButton({ label, roleKey, selected, onClick, icon }: { label: string; roleKey: string; selected: boolean; onClick: () => void; icon: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-150 ${
        selected ? 'bg-warm-600 text-white ring-2 ring-warm-600' : 'bg-white text-foreground border border-gray-200 hover:shadow-sm'
      }`}
    >
      <div className="text-2xl">{icon}</div>
      <div className="text-sm font-medium">{label}</div>
    </button>
  )
}

function RoleCard({ title, desc, icon, selected, onClick }: { title: string; desc: string; icon: string; selected: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} className={`card-hover p-4 rounded-xl bg-white border ${selected ? 'ring-2 ring-warm-600' : 'border-gray-100'} cursor-pointer` }>
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-md bg-gray-50 flex items-center justify-center text-2xl">{icon}</div>
        <div>
          <div className="text-base font-semibold text-foreground">{title}</div>
          <div className="text-sm text-muted mt-1">{desc}</div>
        </div>
      </div>
      <div className="mt-4 text-right">
        <span className="text-sm text-cool-600">Select →</span>
      </div>
    </div>
  )
}
