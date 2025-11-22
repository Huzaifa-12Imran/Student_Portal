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
    <div className="space-y-6">
      {}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setShowForm(!showForm)
            if (!showForm) {
              setEditingId(null)
              setNewCourse({ code: "", name: "", instructor: "", section: "A", students: 0 })
            }
          }}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Course
        </button>
      </div>

      {}
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6 mb-4">
          <h3 className="font-semibold text-foreground mb-4">{editingId ? "Edit Course" : "Add New Course"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Course Code (e.g. CS101)"
              value={newCourse.code}
              onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
              className="px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="Course Name"
              value={newCourse.name}
              onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
              className="px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="Instructor"
              value={newCourse.instructor}
              onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
              className="px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary"
            />
            <input
              type="number"
              placeholder="Students"
              value={String(newCourse.students)}
              onChange={(e) => setNewCourse({ ...newCourse, students: Number(e.target.value) })}
              className="px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddCourse} className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors">
              {editingId ? "Update Course" : "Save Course"}
            </button>
            <button onClick={() => { setShowForm(false); setEditingId(null); setNewCourse({ code: "", name: "", instructor: "", section: "A", students: 0 }) }} className="px-4 py-2 bg-input border border-border text-foreground rounded-lg font-medium hover:bg-border transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Code</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Course Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Instructor</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Section</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Students</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-b border-border hover:bg-background/50">
                <td className="px-6 py-3 text-sm font-semibold text-foreground">{course.code}</td>
                <td className="px-6 py-3 text-sm text-foreground">{course.name}</td>
                <td className="px-6 py-3 text-sm text-muted-foreground">{course.instructor}</td>
                <td className="px-6 py-3 text-sm text-foreground">{course.section}</td>
                <td className="px-6 py-3 text-sm text-foreground font-medium">{course.students}</td>
                <td className="px-6 py-3 text-sm">
                  <span className="px-3 py-1 rounded text-xs font-medium bg-accent/10 text-accent">Active</span>
                </td>
                <td className="px-6 py-3 text-sm flex gap-2">
                  <button onClick={() => handleEditCourse(course)} className="p-1 text-muted-foreground hover:text-primary transition-colors" aria-label={`Edit ${course.code}`}>
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeleteCourse(course.id)} className="p-1 text-muted-foreground hover:text-destructive transition-colors" aria-label={`Delete ${course.code}`}>
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
