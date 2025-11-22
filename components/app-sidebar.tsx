"use client"

import * as React from "react"
import {
  Home,
  Calendar,
  BookOpen,
  TrendingUp,
  Users,
  BarChart3,
  Settings,
  User,
  CheckSquare,
  FileText,
  GraduationCap,
  UserCheck,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

type UserRole = "student" | "teacher" | "admin"

interface AppSidebarProps {
  userRole: UserRole
  userName?: string
  onLogout?: () => void
}

const navigationItems = {
  student: [
    {
      title: "Dashboard",
      url: "/student",
      icon: Home,
    },
    {
      title: "Attendance",
      url: "/student/attendance",
      icon: CheckSquare,
    },
    {
      title: "Grades",
      url: "/student/grades",
      icon: TrendingUp,
    },
    {
      title: "Courses",
      url: "/student/courses",
      icon: BookOpen,
    },
    {
      title: "Schedule",
      url: "/student/schedule",
      icon: Calendar,
    },
  ],
  teacher: [
    {
      title: "Dashboard",
      url: "/teacher",
      icon: Home,
    },
    {
      title: "Mark Attendance",
      url: "/teacher/attendance",
      icon: UserCheck,
    },
    {
      title: "Upload Marks",
      url: "/teacher/marks",
      icon: TrendingUp,
    },
    {
      title: "View Performance",
      url: "/teacher/performance",
      icon: Users,
    },
    {
      title: "Verify Results",
      url: "/teacher/results",
      icon: FileText,
    },
  ],
  admin: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: Home,
    },
    {
      title: "Students",
      url: "/admin/students",
      icon: GraduationCap,
    },
    {
      title: "Teachers",
      url: "/admin/teachers",
      icon: Users,
    },
    {
      title: "Courses",
      url: "/admin/courses",
      icon: BookOpen,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: BarChart3,
    },
  ],
}

export function AppSidebar({ userRole, userName, onLogout }: AppSidebarProps) {
  const items = navigationItems[userRole]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">AcademiX</span>
            <span className="truncate text-xs capitalize">{userRole} Portal</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {userName && (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="#">
                  <User />
                  <span>{userName}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          {onLogout && (
            <SidebarMenuItem>
              <SidebarMenuButton onClick={onLogout}>
                <LogOut />
                <span>Sign Out</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}