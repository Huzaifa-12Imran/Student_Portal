"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Sparkles, ArrowLeft, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"

export default function ModernLogin() {
  const { signIn, signUp } = useAuth()
  const router = useRouter()
  
  const [mode, setMode] = useState<"roleSelect" | "signup" | "signin">("roleSelect")
  const [selectedRole, setSelectedRole] = useState<"admin" | "teacher" | "student" | null>(null)
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [department, setDepartment] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (!selectedRole) {
        setError("Please select a role")
        setIsLoading(false)
        return
      }
      await signUp(email, password, fullName, selectedRole, department)
      setMode("signin")
      setPassword("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await signIn(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed")
    } finally {
      setIsLoading(false)
    }
  }

  const roleCards = [
    { role: "student" as const, title: "Student", desc: "View attendance & grades" },
    { role: "teacher" as const, title: "Educator", desc: "Mark attendance & upload marks" },
    { role: "admin" as const, title: "Administrator", desc: "System management & analytics" },
  ]

  if (mode === "roleSelect") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/25 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/25 rounded-full blur-3xl animate-pulse animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse animation-delay-4000" />
        </div>

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
          <div className="w-full max-w-4xl">
            <div className="text-center mb-20">
              <div className="flex items-center justify-center gap-3 mb-8 animate-fade-up">
                <div className="w-14 h-14 rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-xl shadow-primary/30 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-all duration-300" />
                  <Sparkles className="w-7 h-7 text-white relative z-10" />
                </div>
                <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-orange-300 bg-clip-text">AcademiX</h1>
              </div>
              <p className="text-xl text-foreground font-semibold mb-3">Student Attendance & Results Portal</p>
              <p className="text-muted-foreground text-base max-w-md mx-auto">Welcome to your academic hub. Select your role to get started.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {roleCards.map(({ role, title, desc }, index) => (
                <button
                  key={role}
                  onClick={() => {
                    setSelectedRole(role)
                    setMode("signup")
                  }}
                  className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-primary/50 animate-fade-up`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/8 to-transparent" />
                  {index === 0 && <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-transparent" />}
                  {index === 1 && <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-transparent" />}
                  {index === 2 && <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-transparent" />}
                  
                  <div className={`absolute inset-0 border rounded-2xl transition-all duration-300 ${
                    index === 0 ? 'border-blue-500/30 group-hover:border-blue-500/60' :
                    index === 1 ? 'border-purple-500/30 group-hover:border-purple-500/60' :
                    'border-orange-500/30 group-hover:border-orange-500/60'
                  }`} />

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl">
                    <div className={`absolute inset-0 ${
                      index === 0 ? 'bg-blue-500/10' :
                      index === 1 ? 'bg-purple-500/10' :
                      'bg-orange-500/10'
                    }`} />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                      {index === 0 && (
                        <svg className="w-16 h-16 text-blue-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M2 5.5V3.25A2.25 2.25 0 014.25 1h15.5A2.25 2.25 0 0122 3.25v15.5A2.25 2.25 0 0119.75 21H4.25A2.25 2.25 0 012 18.75V5.5zm10 0V3.5H4.25a.75.75 0 00-.75.75v1.5h8.5zm0 0h8.5V5a.75.75 0 00-.75-.75H12v1.25zm-8.5 2V18a.75.75 0 00.75.75h6.75V7.5H3.5zm9 0v11.25H19a.75.75 0 00.75-.75V7.5h-6.25z" />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg className="w-16 h-16 text-purple-400 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3m0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22" />
                        </svg>
                      )}
                      {index === 2 && (
                        <svg className="w-16 h-16 text-orange-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2 text-left">{title}</h3>
                    <p className="text-muted-foreground text-sm text-left mb-6">{desc}</p>
                    <div className={`flex items-center gap-2 group-hover:gap-3 transition-all font-semibold ${
                      index === 0 ? 'text-blue-400 group-hover:text-blue-300' :
                      index === 1 ? 'text-purple-400 group-hover:text-purple-300' :
                      'text-orange-400 group-hover:text-orange-300'
                    }`}>
                      <span>Continue</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="text-center">
              <p className="text-muted-foreground text-sm">Secure platform • Institutional access • End-to-end protected</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const getRoleDisplay = () => {
    switch (selectedRole) {
      case "student":
        return "Student"
      case "teacher":
        return "Educator"
      case "admin":
        return "Administrator"
    }
  }

  const RoleIcon = () => {
    switch (selectedRole) {
      case "student":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 5.5V3.25A2.25 2.25 0 014.25 1h15.5A2.25 2.25 0 0122 3.25v15.5A2.25 2.25 0 0119.75 21H4.25A2.25 2.25 0 012 18.75V5.5zm10 0V3.5H4.25a.75.75 0 00-.75.75v1.5h8.5zm0 0h8.5V5a.75.75 0 00-.75-.75H12v1.25zm-8.5 2V18a.75.75 0 00.75.75h6.75V7.5H3.5zm9 0v11.25H19a.75.75 0 00.75-.75V7.5h-6.25z" />
          </svg>
        )
      case "teacher":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3m0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22" />
          </svg>
        )
      case "admin":
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-up">
        <div className="rounded-3xl p-8 bg-gradient-to-b from-white/8 to-white/5 border border-primary/30 shadow-2xl">
          <button
            onClick={() => {
              setMode("roleSelect")
              setEmail("")
              setPassword("")
              setFullName("")
              setError("")
            }}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-semibold mb-8 transition-colors hover:gap-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to roles
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <RoleIcon />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-foreground">{mode === "signup" ? "Create Account" : "Sign In"}</h2>
                <p className="text-muted-foreground text-sm">{getRoleDisplay()}</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={mode === "signup" ? handleSignUp : handleSignIn} className="space-y-5 mb-8">
            {mode === "signup" && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Full Name</label>
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-white/8 border border-white/15 rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:bg-white/12 transition-all duration-200"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">Department (Optional)</label>
                  <Input
                    type="text"
                    placeholder="e.g., Computer Science"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="bg-white/8 border border-white/15 rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:bg-white/12 transition-all duration-200"
                    disabled={isLoading}
                  />
                </div>
              </>
            )}
            
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Email Address</label>
              <Input
                type="email"
                placeholder="your.email@institution.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/8 border border-white/15 rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:bg-white/12 transition-all duration-200"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Password</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/8 border border-white/15 rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:bg-white/12 transition-all duration-200"
                required
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary via-secondary to-primary hover:shadow-xl hover:shadow-primary/40 rounded-xl py-3 font-semibold text-base transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 relative z-10">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {mode === "signup" ? "Creating account..." : "Signing in..."}
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 relative z-10">
                  <span>{mode === "signup" ? "Create Account" : "Sign In"}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              {mode === "signup" ? "Already have an account? " : "Don't have an account? "}
              <button
                onClick={() => {
                  setMode(mode === "signup" ? "signin" : "signup")
                  setEmail("")
                  setPassword("")
                  setError("")
                }}
                className="text-primary hover:text-primary/80 font-semibold"
              >
                {mode === "signup" ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>

          <div className="mt-8 p-4 rounded-xl bg-primary/15 border border-primary/30">
            <div className="flex gap-3 items-start">
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">Your data is encrypted and secure. Log in only with your official institution credentials.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
