"use client"

import { ArrowLeft } from "lucide-react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import SystemReports from "@/components/admin/system-reports"

export default function AnalyticsPage() {
  return (
    <SidebarProvider>
      <AppSidebar userRole="admin" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-sidebar-border" />
            <a
              href="/admin"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </a>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <SystemReports />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
