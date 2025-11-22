"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, Users, Clock, Star, FileText } from "lucide-react"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

interface CourseDetailPageProps {
  params: Promise<{
    courseCode: string
  }>
}

const courseDatabase: Record<string, any> = {
  CS101: {
    code: "CS101",
    name: "Database Systems",
    instructor: "Prof. Johnson",
    semester: "Sem 2",
    credits: 3,
    students: 45,
    rating: 4.5,
    description: "Learn the fundamentals of database design, SQL, and database management systems.",
    materials: [
      { id: 1, title: "Introduction to Databases", type: "PDF", date: "2024-11-15" },
      { id: 2, title: "SQL Basics Tutorial", type: "Video", date: "2024-11-14" },
      { id: 3, title: "Database Design Patterns", type: "PDF", date: "2024-11-13" },
    ],
    assignments: [
      { id: 1, title: "Database Schema Design", dueDate: "2024-11-25", status: "pending" },
      { id: 2, title: "SQL Queries Practice", dueDate: "2024-11-20", status: "submitted" },
    ],
  },
  CS201: {
    code: "CS201",
    name: "Web Development",
    instructor: "Prof. Smith",
    semester: "Sem 2",
    credits: 4,
    students: 38,
    rating: 4.7,
    description: "Master modern web development with HTML, CSS, JavaScript, and popular frameworks.",
    materials: [
      { id: 1, title: "HTML & CSS Fundamentals", type: "Video", date: "2024-11-15" },
      { id: 2, title: "JavaScript Advanced Concepts", type: "PDF", date: "2024-11-14" },
      { id: 3, title: "React Framework Guide", type: "Video", date: "2024-11-13" },
    ],
    assignments: [
      { id: 1, title: "Build a Portfolio Website", dueDate: "2024-11-28", status: "pending" },
      { id: 2, title: "React Todo App", dueDate: "2024-11-22", status: "in progress" },
    ],
  },
  CS301: {
    code: "CS301",
    name: "Data Structures",
    instructor: "Prof. Williams",
    semester: "Sem 2",
    credits: 3,
    students: 42,
    rating: 4.3,
    description: "Explore essential data structures including arrays, linked lists, trees, and graphs.",
    materials: [
      { id: 1, title: "Data Structures Overview", type: "PDF", date: "2024-11-15" },
      { id: 2, title: "Tree & Graph Algorithms", type: "Video", date: "2024-11-14" },
      { id: 3, title: "Complexity Analysis", type: "PDF", date: "2024-11-13" },
    ],
    assignments: [
      { id: 1, title: "Implement Linked List", dueDate: "2024-11-26", status: "submitted" },
      { id: 2, title: "Graph Traversal Algorithms", dueDate: "2024-11-30", status: "pending" },
    ],
  },
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  const router = useRouter()
  const resolvedParams = use(params)
  const course = courseDatabase[resolvedParams.courseCode]

  if (!course) {
    return (
      <SidebarProvider>
        <AppSidebar userRole="student" />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <div className="h-4 w-px bg-sidebar-border" />
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="text-center py-12">
              <p className="text-lg text-slate-400">Course not found</p>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar userRole="student" />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="h-4 w-px bg-sidebar-border" />
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500 space-y-6">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{course.name}</h1>
                  <p className="text-slate-400">{course.description}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xl font-semibold text-white">{course.rating}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-2">Course Code</p>
                <p className="text-lg font-semibold text-blue-400">{course.code}</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-2">Instructor</p>
                <p className="text-lg font-semibold text-white">{course.instructor}</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-2">Credits</p>
                <p className="text-lg font-semibold text-green-400">{course.credits}</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-2">Enrolled Students</p>
                <p className="text-lg font-semibold text-orange-400">{course.students}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Course Materials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.materials.map((material: any) => (
                  <div key={material.id} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-4 hover:border-slate-700/50 transition-all">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-400" />
                        <div>
                          <h3 className="font-semibold text-white">{material.title}</h3>
                          <p className="text-xs text-slate-400">{material.type}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">Uploaded: {material.date}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Assignments</h2>
              <div className="space-y-3">
                {course.assignments.map((assignment: any) => (
                  <div key={assignment.id} className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white mb-1">{assignment.title}</h3>
                        <p className="text-sm text-slate-400">Due: {assignment.dueDate}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          assignment.status === "submitted"
                            ? "bg-green-500/20 text-green-400"
                            : assignment.status === "in progress"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-orange-500/20 text-orange-400"
                        }`}
                      >
                        {assignment.status === "in progress" ? "In Progress" : assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
