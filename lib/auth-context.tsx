'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface UserProfile {
  _id?: string
  id?: string
  email: string
  full_name: string
  role: 'student' | 'teacher' | 'admin'
  department?: string
  created_at: string
  updated_at: string
}

interface AuthContextType {
  user: UserProfile | null
  userProfile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string, role: string, department?: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const response = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          })

          if (response.ok) {
            const data = await response.json()
            localStorage.setItem('userRole', data.user.role)
            localStorage.setItem('userName', data.user.full_name)
            setUser(data.user)
            setUserProfile(data.user)
          } else {
            localStorage.removeItem('token')
            localStorage.removeItem('userRole')
            localStorage.removeItem('userName')
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signUp = async (email: string, password: string, fullName: string, role: string, department?: string) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName, role, department }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Signup failed')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('userRole', data.user.role)
      localStorage.setItem('userName', data.user.full_name)
      setUser(data.user)
      setUserProfile(data.user)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect to the server. Please ensure the application is running.'
      console.error('Signup error:', errorMessage)
      throw new Error(errorMessage)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Sign in failed')
      }

      const data = await response.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('userRole', data.user.role)
      localStorage.setItem('userName', data.user.full_name)
      setUser(data.user)
      setUserProfile(data.user)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect to the server. Please ensure the application is running.'
      console.error('Signin error:', errorMessage)
      throw new Error(errorMessage)
    }
  }

  const signOut = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error)
      }

      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userName')
      setUser(null)
      setUserProfile(null)
    } catch (error) {
      console.error('Signout error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        signUp,
        signIn,
        signOut,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
