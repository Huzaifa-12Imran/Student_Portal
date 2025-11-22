"use client"
import { BookOpen, ChevronRight, LogOut } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface SidebarItem {
  id: string
  label: string
  icon: LucideIcon
}

interface SidebarProps {
  role: string
  userName: string
  items: SidebarItem[]
  activeTab: string
  onTabChange: (tab: string) => void
  onLogout: () => void
}

export default function Sidebar({ role, userName, items, activeTab, onTabChange, onLogout }: SidebarProps) {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      {}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-sidebar-foreground">Academic Portal</h2>
            <p className="text-xs text-sidebar-foreground/60">{role}</p>
          </div>
        </div>
      </div>

      {}
      <div className="px-6 py-4 border-b border-sidebar-border">
        <div className="text-sm">
          <p className="text-sidebar-foreground/60 text-xs">Logged in as</p>
          <p className="font-semibold text-sidebar-foreground truncate">{userName}</p>
        </div>
      </div>

      {}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-between group ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </div>
              {isActive && <ChevronRight className="w-4 h-4" />}
            </button>
          )
        })}
      </nav>

      {}
      <div className="p-6 border-t border-sidebar-border space-y-3">
        <button
          onClick={onLogout}
          className="w-full px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 flex items-center gap-3 text-sidebar-foreground hover:bg-sidebar-accent/20"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
        <p className="text-xs text-sidebar-foreground/60 text-center">v1.0 • Student Portal</p>
      </div>
    </aside>
  )
}
