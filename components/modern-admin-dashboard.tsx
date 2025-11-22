"use client"

import React, { useState } from "react"
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
import { Users, Zap, TrendingUp, AlertTriangle, Settings } from "lucide-react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import UserManagement from "./admin/user-management"
import CourseManagement from "./admin/course-management"
import SystemReports from "./admin/system-reports"

const systemMetrics = [
  { month: "Jan", users: 250, activeUsers: 200 },
  { month: "Feb", users: 290, activeUsers: 240 },
  { month: "Mar", users: 340, activeUsers: 300 },
  { month: "Apr", users: 420, activeUsers: 380 },
  { month: "May", users: 510, activeUsers: 470 },
  { month: "Jun", users: 580, activeUsers: 540 },
]

const userDistribution = [
  { name: "Students", value: 450, fill: "oklch(0.65 0.28 290)" },
  { name: "Teachers", value: 80, fill: "oklch(0.62 0.26 180)" },
  { name: "Admins", value: 5, fill: "oklch(0.70 0.28 50)" },
]

interface AdminDashboardProps {
  userName: string
  onLogout: () => void
}

export default function ModernAdminDashboard({ userName, onLogout }: AdminDashboardProps) {
  const [modal, setModal] = useState<string | null>(null)

  const openModal = (m: string) => setModal(m)
  const closeModal = () => setModal(null)

  return (
    <SidebarProvider>
      <AppSidebar userRole="admin" userName={userName} onLogout={onLogout} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-sidebar-border" />
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse animation-delay-2000" />
              </div>

              <div className="relative z-10 px-6 py-12 border-b border-border">
                <div className="max-w-7xl mx-auto">
                  <div>
                    <h1 className="text-4xl font-bold gradient-text mb-2">System Administration</h1>
                    <p className="text-muted-foreground">Monitor and manage the entire platform</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="rounded-2xl p-6 relative overflow-hidden group bg-gradient-to-b from-white/8 to-white/5 border border-blue-500/30 hover:border-blue-500/60 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-sm font-semibold">Total Users</p>
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-4xl font-bold text-foreground">535</p>
              <p className="text-xs text-green-400 mt-2">+45 this month</p>
            </div>
          </div>

          <div className="rounded-2xl p-6 relative overflow-hidden group bg-gradient-to-b from-white/8 to-white/5 border border-green-500/30 hover:border-green-500/60 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-sm font-semibold">System Uptime</p>
                <Zap className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-4xl font-bold text-foreground">99.8%</p>
              <p className="text-xs text-green-400 mt-2">All systems operational</p>
            </div>
          </div>

          <div className="rounded-2xl p-6 relative overflow-hidden group bg-gradient-to-b from-white/8 to-white/5 border border-purple-500/30 hover:border-purple-500/60 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-sm font-semibold">Active Sessions</p>
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-4xl font-bold text-foreground">287</p>
              <p className="text-xs text-green-400 mt-2">Current active users</p>
            </div>
          </div>

          <div className="rounded-2xl p-6 relative overflow-hidden group bg-gradient-to-b from-white/8 to-white/5 border border-red-500/30 hover:border-red-500/60 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-sm font-semibold">Alerts</p>
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-4xl font-bold text-red-500">3</p>
              <p className="text-xs text-red-400 mt-2">Requires attention</p>
            </div>
          </div>
        </div>

        {}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-8 bg-gradient-to-b from-white/8 to-white/5 border border-white/15">
            <h3 className="text-lg font-bold text-foreground mb-6">User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={systemMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis stroke="rgba(255,255,255,0.5)" dataKey="month" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(20,20,40,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
                <Line type="monotone" dataKey="users" stroke="oklch(0.65 0.28 290)" strokeWidth={3} />
                <Line
                  type="monotone"
                  dataKey="activeUsers"
                  stroke="oklch(0.62 0.26 180)"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-2xl p-8 bg-gradient-to-b from-white/8 to-white/5 border border-white/15">
            <h3 className="text-lg font-bold text-foreground mb-6">User Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                >
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: "rgba(20,20,40,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-8 bg-gradient-to-b from-white/8 to-white/5 border border-white/15">
            <h3 className="text-lg font-bold text-foreground mb-6">Quick Management</h3>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => openModal("courses")} className="relative overflow-hidden group rounded-xl p-4 bg-gradient-to-b from-white/8 to-white/5 border border-blue-500/30 hover:border-blue-500/60 transition-all hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <svg className="w-8 h-8 text-blue-400 mb-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <p className="text-sm font-semibold text-foreground group-hover:text-blue-400 transition-colors text-center">New Course</p>
                </div>
              </button>
              <button onClick={() => openModal("users")} className="relative overflow-hidden group rounded-xl p-4 bg-gradient-to-b from-white/8 to-white/5 border border-purple-500/30 hover:border-purple-500/60 transition-all hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <svg className="w-8 h-8 text-purple-400 mb-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm font-semibold text-foreground group-hover:text-purple-400 transition-colors text-center">Manage Users</p>
                </div>
              </button>
              <button onClick={() => openModal("settings")} className="relative overflow-hidden group rounded-xl p-4 bg-gradient-to-b from-white/8 to-white/5 border border-orange-500/30 hover:border-orange-500/60 transition-all hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <svg className="w-8 h-8 text-orange-400 mb-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm font-semibold text-foreground group-hover:text-orange-400 transition-colors text-center">Settings</p>
                </div>
              </button>
              <button onClick={() => openModal("reports")} className="relative overflow-hidden group rounded-xl p-4 bg-gradient-to-b from-white/8 to-white/5 border border-cyan-500/30 hover:border-cyan-500/60 transition-all hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <svg className="w-8 h-8 text-cyan-400 mb-3 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-sm font-semibold text-foreground group-hover:text-cyan-400 transition-colors text-center">Reports</p>
                </div>
              </button>
            </div>
          </div>

          <div className="rounded-2xl p-8 bg-gradient-to-b from-white/8 to-white/5 border border-white/15">
            <h3 className="text-lg font-bold text-foreground mb-6">Recent Activities</h3>
            <div className="space-y-3 text-sm">
              {[
                { action: "New user registration", time: "2 mins ago", icon: "UserPlus" },
                { action: "Course created", time: "15 mins ago", icon: "BookOpen" },
                { action: "System backup completed", time: "1 hour ago", icon: "HardDrive" },
                { action: "Grade submission verified", time: "3 hours ago", icon: "CheckCircle" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    {activity.icon === "UserPlus" && <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>}
                    {activity.icon === "BookOpen" && <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C6.5 6.253 2 10.998 2 16.5S6.5 26.747 12 26.747s10-4.745 10-10.247S17.5 6.253 12 6.253z" /></svg>}
                    {activity.icon === "HardDrive" && <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
                    {activity.icon === "CheckCircle" && <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    <p className="text-foreground">{activity.action}</p>
                  </div>
                  <p className="text-muted-foreground text-xs">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-8">
          <div className="absolute inset-0 bg-black/70 z-40" onClick={closeModal} />
          <div className="relative w-full max-w-4xl surface-bg border border-white/15 rounded-2xl p-6 z-50 overflow-auto max-h-[80vh]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-foreground">{modal === "users" ? "User Management" : modal === "courses" ? "Course Management" : modal === "reports" ? "System Reports" : "Settings"}</h3>
              <button onClick={closeModal} className="text-sm text-muted-foreground">Close</button>
            </div>
            <div>
              {modal === "users" && <UserManagement />}
              {modal === "courses" && <CourseManagement />}
              {modal === "reports" && <SystemReports />}
              {modal === "settings" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <p className="text-sm text-foreground">⚙️ System Configuration</p>
                    <p className="text-xs text-muted-foreground mt-1">Admin settings are stored locally in your browser for this demo.</p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-foreground">Notifications</h4>
                    <div className="space-y-3 pl-4 border-l border-primary/30">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                          <label className="text-sm font-medium text-foreground">Email Notifications</label>
                        </div>
                        <button onClick={() => { try { const v = localStorage.getItem('admin_email_notifications') === 'true'; localStorage.setItem('admin_email_notifications', (!v).toString()); alert('Email Notifications ' + (v ? 'Disabled' : 'Enabled')); } catch {} }} className="px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary text-xs font-medium rounded transition-all">Toggle</button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                          <label className="text-sm font-medium text-foreground">Real-time Alerts</label>
                        </div>
                        <button onClick={() => { try { const v = localStorage.getItem('admin_realtime_alerts') === 'true'; localStorage.setItem('admin_realtime_alerts', (!v).toString()); alert('Real-time Alerts ' + (v ? 'Disabled' : 'Enabled')); } catch {} }} className="px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary text-xs font-medium rounded transition-all">Toggle</button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-foreground">System</h4>
                    <div className="space-y-3 pl-4 border-l border-primary/30">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                          <label className="text-sm font-medium text-foreground">Auto Backup</label>
                        </div>
                        <button onClick={() => { try { const v = localStorage.getItem('admin_auto_backup') === 'true'; localStorage.setItem('admin_auto_backup', (!v).toString()); alert('Auto Backup ' + (v ? 'Disabled' : 'Enabled')); } catch {} }} className="px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary text-xs font-medium rounded transition-all">Toggle</button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                          <label className="text-sm font-medium text-foreground">Security Mode</label>
                        </div>
                        <button onClick={() => { try { const v = localStorage.getItem('admin_security_mode') === 'true'; localStorage.setItem('admin_security_mode', (!v).toString()); alert('Security Mode ' + (v ? 'Disabled' : 'Enabled')); } catch {} }} className="px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary text-xs font-medium rounded transition-all">Toggle</button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <button onClick={() => { if (confirm('Are you sure? This will clear all local data.')) { localStorage.clear(); alert('All data cleared'); } }} className="w-full px-4 py-2 bg-red-500/10 border border-red-500/30 hover:border-red-500/60 text-red-400 rounded-lg text-sm font-medium transition-all hover:bg-red-500/20">
                      Clear All Data
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
