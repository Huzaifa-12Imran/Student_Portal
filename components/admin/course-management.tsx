"use client"

import { useState } from "react"
import { Plus, Trash2, Edit2 } from "lucide-react"

interface Course {
  id: string
  code: string
  name: string
  instructor: string
  students: number
  section: string
  status: "active" | "archived"
}

export default function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      code: "CS101",
      name: "Database Systems",
      instructor: "Dr. Fatima Khan",
      students: 45,
      section: "A",
      status: "active",
    },
    {
      id: "2",
      code: "CS201",
      name: "Web Development",
      instructor: "Dr. Ahmed Ali",
      students: 38,
      section: "B",
      status: "active",
    },
    {
      id: "3",
      code: "CS301",
      name: "Data Structures",
      instructor: "Dr. Fatima Khan",
      students: 42,
      section: "A",
      status: "active",
    },
  ])

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newCourse, setNewCourse] = useState({ code: "", name: "", instructor: "", section: "A", students: 0 })

  const handleAddCourse = () => {
    if (!newCourse.code || !newCourse.name) {
      alert("Please enter course code and name")
      return
    }
    if (editingId) {
      setCourses((c) => c.map((x) => x.id === editingId ? { ...x, code: newCourse.code, name: newCourse.name, instructor: newCourse.instructor || "TBA", students: Number(newCourse.students) || 0, section: newCourse.section || "A" } : x))
      setEditingId(null)
    } else {
      const next: Course = {
        id: String(courses.length + 1),
        code: newCourse.code,
        name: newCourse.name,
        instructor: newCourse.instructor || "TBA",
        students: Number(newCourse.students) || 0,
        section: newCourse.section || "A",
        status: "active",
      }
      setCourses((c) => [next, ...c])
      try {
        localStorage.setItem("courses", JSON.stringify([next, ...courses]))
      } catch {}
    }
    setNewCourse({ code: "", name: "", instructor: "", section: "A", students: 0 })
    setShowForm(false)
  }

  const handleEditCourse = (course: Course) => {
    setNewCourse({ code: course.code, name: course.name, instructor: course.instructor, section: course.section, students: course.students })
    setEditingId(course.id)
    setShowForm(true)
  }

  const handleDeleteCourse = (id: string) => {
    if (!confirm("Delete this course?")) return
    setCourses((c) => c.filter((x) => x.id !== id))
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 mb-2">
        <h2 className="text-2xl font-bold text-white mb-1">Course Management</h2>
        <p className="text-slate-400 text-sm">Manage all courses and their information</p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setShowForm(!showForm)
            if (!showForm) {
              setEditingId(null)
              setNewCourse({ code: "", name: "", instructor: "", section: "A", students: 0 })
            }
          }}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Course
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6 mb-4">
          <h3 className="font-semibold text-white mb-4">{editingId ? "Edit Course" : "Add New Course"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Course Code (e.g. CS101)"
              value={newCourse.code}
              onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
              className="px-4 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Course Name"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              className="px-4 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Instructor"
              value={newCourse.instructor}
              onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
              className="px-4 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="number"
              placeholder="Students"
              value={String(newCourse.students)}
              onChange={(e) => setNewCourse({ ...newCourse, students: Number(e.target.value) })}
              className="px-4 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddCourse} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-medium transition-all">
              {editingId ? "Update Course" : "Save Course"}
            </button>
            <button onClick={() => { setShowForm(false); setEditingId(null); setNewCourse({ code: "", name: "", instructor: "", section: "A", students: 0 }) }} className="px-4 py-2 bg-slate-700/30 border border-slate-600/30 text-slate-300 rounded-lg font-medium hover:bg-slate-700/50 transition-all">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/30">
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Code</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Instructor</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Section</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Students</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-3 text-sm font-semibold text-blue-400">{course.code}</td>
                <td className="px-6 py-3 text-sm text-white">{course.name}</td>
                <td className="px-6 py-3 text-sm text-slate-400">{course.instructor}</td>
                <td className="px-6 py-3 text-sm text-slate-300">{course.section}</td>
                <td className="px-6 py-3 text-sm text-white font-medium">{course.students}</td>
                <td className="px-6 py-3 text-sm">
                  <span className="px-3 py-1 rounded text-xs font-medium bg-green-500/20 border border-green-500/30 text-green-400">Active</span>
                </td>
                <td className="px-6 py-3 text-sm flex gap-2">
                  <button onClick={() => handleEditCourse(course)} className="p-1 text-slate-400 hover:text-blue-400 transition-colors" aria-label={`Edit ${course.code}`}>
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteCourse(course.id)} className="p-1 text-slate-400 hover:text-red-400 transition-colors" aria-label={`Delete ${course.code}`}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
