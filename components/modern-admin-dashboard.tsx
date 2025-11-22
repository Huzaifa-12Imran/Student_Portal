"use client"

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
import { Users, Zap, TrendingUp, AlertTriangle, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/15 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        </div>

        <div className="relative z-10 px-6 py-12 border-b border-border">
          <div className="max-w-7xl mx-auto flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">System Administration</h1>
              <p className="text-muted-foreground">Monitor and manage the entire platform</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-lg bg-transparent" onClick={() => openModal("settings")}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline" size="sm" onClick={onLogout} className="rounded-lg bg-transparent">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-8">
        {}
        <div className="grid md:grid-cols-4 gap-6">
          <div className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-primary/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-sm font-semibold">Total Users</p>
                <Users className="w-5 h-5 text-primary" />
              </div>
              <p className="text-4xl font-bold text-foreground">535</p>
              <p className="text-xs text-green-400 mt-2">+45 this month</p>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-secondary/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-sm font-semibold">System Uptime</p>
                <Zap className="w-5 h-5 text-secondary" />
              </div>
              <p className="text-4xl font-bold text-foreground">99.8%</p>
              <p className="text-xs text-green-400 mt-2">All systems operational</p>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-accent/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground text-sm font-semibold">Active Sessions</p>
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <p className="text-4xl font-bold text-foreground">287</p>
              <p className="text-xs text-green-400 mt-2">Current active users</p>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 relative overflow-hidden group hover:border-red-500/50 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
          <div className="glass rounded-2xl p-8">
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

          <div className="glass rounded-2xl p-8">
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
          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-bold text-foreground mb-6">Quick Management</h3>
            <div className="space-y-3">
              <button onClick={() => openModal("courses")} className="w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 hover:border-primary/30 border border-white/5 transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Create New Course</p>
              </button>
              <button onClick={() => openModal("users")} className="w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 hover:border-primary/30 border border-white/5 transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Manage Users</p>
              </button>
              <button onClick={() => openModal("settings")} className="w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 hover:border-primary/30 border border-white/5 transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">System Settings</p>
              </button>
              <button onClick={() => openModal("reports")} className="w-full text-left px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 hover:border-primary/30 border border-white/5 transition-all group">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Generate Reports</p>
              </button>
            </div>
          </div>

          <div className="glass rounded-2xl p-8">
            <h3 className="text-lg font-bold text-foreground mb-6">Recent Activities</h3>
            <div className="space-y-3 text-sm">
              {[
                { action: "New user registration", time: "2 mins ago", icon: "✓" },
                { action: "Course created", time: "15 mins ago", icon: "📚" },
                { action: "System backup completed", time: "1 hour ago", icon: "💾" },
                { action: "Grade submission verified", time: "3 hours ago", icon: "✓" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                  <div className="flex items-center gap-3">
                    <span>{activity.icon}</span>
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
          <div className="absolute inset-0 bg-black/40" onClick={closeModal} />
          <div className="relative w-full max-w-4xl bg-card border border-border rounded-2xl p-6 z-10 overflow-auto max-h-[80vh]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-foreground">{modal === "users" ? "User Management" : modal === "courses" ? "Course Management" : modal === "reports" ? "System Reports" : "Settings"}</h3>
              <button onClick={closeModal} className="text-sm text-muted-foreground">Close</button>
            </div>
            <div>
              {modal === "users" && <UserManagement />}
              {modal === "courses" && <CourseManagement />}
              {modal === "reports" && <SystemReports />}
              {modal === "settings" && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Admin settings for the demo are stored locally in your browser.</p>
                  <div className="flex items-center gap-3">
                    <label className="font-medium">Email Notifications</label>
                    <button onClick={() => { try { const v = localStorage.getItem('admin_email_notifications') === 'true'; localStorage.setItem('admin_email_notifications', (!v).toString()); alert('Toggled Email Notifications (stored locally)'); } catch {} }} className="px-3 py-1 bg-input rounded">Toggle</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
