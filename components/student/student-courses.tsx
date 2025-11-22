"use client"

import { useRouter } from "next/navigation"
import { BookOpen, Users, Clock, Star } from "lucide-react"

interface Course {
  code: string
  name: string
  instructor: string
  semester: string
  credits: number
  students: number
  rating: number
}

export default function StudentCourses() {
  const router = useRouter()
  const courses: Course[] = [
    {
      code: "CS101",
      name: "Database Systems",
      instructor: "Prof. Johnson",
      semester: "Sem 2",
      credits: 3,
      students: 45,
      rating: 4.5,
    },
    {
      code: "CS201",
      name: "Web Development",
      instructor: "Prof. Smith",
      semester: "Sem 2",
      credits: 4,
      students: 38,
      rating: 4.7,
    },
    {
      code: "CS301",
      name: "Data Structures",
      instructor: "Prof. Williams",
      semester: "Sem 2",
      credits: 3,
      students: 42,
      rating: 4.3,
    },
  ]

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50">
        <h2 className="text-2xl font-bold text-white mb-1">My Courses</h2>
        <p className="text-slate-400 text-sm">View all your enrolled courses and their details</p>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
          <p className="text-blue-400 text-sm font-medium">Total Enrolled: {courses.length} courses • Total Credits: {courses.reduce((a, b) => a + b.credits, 0)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.code}
            className="bg-gradient-to-br from-slate-800 to-slate-800/50 border border-slate-700/30 rounded-lg p-6 hover:border-slate-700/50 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-blue-400">{course.code}</h3>
                  <p className="text-xs text-slate-400">Course Code</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium text-white">{course.rating}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-lg font-semibold text-white mb-1">{course.name}</h4>
              <p className="text-slate-400 text-sm">Instructor: {course.instructor}</p>
            </div>

            <div className="space-y-3 mb-4 pb-4 border-b border-slate-700/30">
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-orange-400" />
                <span className="text-sm">{course.semester}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-sm">{course.students} students enrolled</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-sm">{course.credits} credits</span>
              </div>
            </div>

            <button
              onClick={() => router.push(`/student/courses/${course.code}`)}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-medium transition-all text-sm"
            >
              View Course
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6">
        <h3 className="font-semibold text-white mb-4">Course Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-slate-700 to-slate-750 border border-slate-600/30 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-2">Total Courses</p>
            <p className="text-3xl font-bold text-blue-400">{courses.length}</p>
          </div>
          <div className="bg-gradient-to-br from-slate-700 to-slate-750 border border-slate-600/30 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-2">Total Credits</p>
            <p className="text-3xl font-bold text-green-400">{courses.reduce((a, b) => a + b.credits, 0)}</p>
          </div>
          <div className="bg-gradient-to-br from-slate-700 to-slate-750 border border-slate-600/30 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-2">Average Rating</p>
            <p className="text-3xl font-bold text-yellow-400">{(courses.reduce((a, b) => a + b.rating, 0) / courses.length).toFixed(1)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
