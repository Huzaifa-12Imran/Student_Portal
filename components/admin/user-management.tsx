"use client"

import { useState } from "react"
import { Plus, Trash2, Edit2 } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "teacher" | "admin"
  department: string
  status: "active" | "inactive"
}

interface UserManagementProps {
  userType?: "students" | "teachers"
}

export default function UserManagement({ userType = "students" }: UserManagementProps) {
  const defaultUsers: User[] = userType === "students"
    ? [
      { id: "001", name: "Ahmed Ali", email: "ahmed@school.edu", role: "student", department: "CS", status: "active" },
      { id: "002", name: "Zainab Khan", email: "zainab@school.edu", role: "student", department: "CS", status: "active" },
      { id: "003", name: "Hassan Malik", email: "hassan@school.edu", role: "student", department: "ENG", status: "active" },
    ]
    : [
      {
        id: "001",
        name: "Dr. Fatima Khan",
        email: "fatima@school.edu",
        role: "teacher",
        department: "CS",
        status: "active",
      },
      {
        id: "002",
        name: "Prof. Ahmed Ali",
        email: "prof.ahmed@school.edu",
        role: "teacher",
        department: "ENG",
        status: "active",
      },
      {
        id: "003",
        name: "Dr. Sara Williams",
        email: "sara@school.edu",
        role: "teacher",
        department: "MATH",
        status: "active",
      },
    ]

  const [users, setUsers] = useState<User[]>(defaultUsers)

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "student" as const, department: "" })

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      if (editingId) {
        setUsers(users.map(u => u.id === editingId ? { ...u, ...newUser } : u))
        setEditingId(null)
      } else {
        setUsers([
          ...users,
          {
            id: String(users.length + 1),
            ...newUser,
            status: "active",
          },
        ])
      }
      setNewUser({ name: "", email: "", role: "student", department: "" })
      setShowForm(false)
    }
  }

  const handleEditUser = (user: User) => {
    setNewUser({ name: user.name, email: user.email, role: user.role, department: user.department })
    setEditingId(user.id)
    setShowForm(true)
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((u) => u.id !== id))
  }

  return (
    <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700/50 mb-2">
        <h2 className="text-2xl font-bold text-white mb-1">{userType === "students" ? "Student Management" : "Teacher Management"}</h2>
        <p className="text-slate-400 text-sm">{userType === "students" ? "Manage student accounts and information" : "Manage teacher accounts and information"}</p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => {
            setShowForm(!showForm)
            if (!showForm) {
              setEditingId(null)
              setNewUser({ name: "", email: "", role: userType === "students" ? "student" : "teacher", department: "" })
            }
          }}
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-medium transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New {userType === "students" ? "Student" : "Teacher"}
        </button>
      </div>

      {showForm && (
        <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg p-6">
          <h3 className="font-semibold text-white mb-4">{editingId ? `Edit ${userType === "students" ? "Student" : "Teacher"}` : `Add New ${userType === "students" ? "Student" : "Teacher"}`}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="px-4 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="px-4 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {userType === "teachers" ? (
              <>
                <input
                  type="text"
                  placeholder="Department"
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                  className="px-4 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div></div>
              </>
            ) : (
              <input
                type="text"
                placeholder="Department"
                value={newUser.department}
                onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                className="px-4 py-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-medium transition-all"
            >
              {editingId ? "Update" : "Save"}
            </button>
            <button
              onClick={() => { setShowForm(false); setEditingId(null); setNewUser({ name: "", email: "", role: userType === "students" ? "student" : "teacher", department: "" }) }}
              className="px-4 py-2 bg-slate-700/30 border border-slate-600/30 text-slate-300 rounded-lg font-medium hover:bg-slate-700/50 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-slate-800/50 border border-slate-700/30 rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700/30">
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Department</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-700/30 hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-3 text-sm text-slate-400">{user.id}</td>
                <td className="px-6 py-3 text-sm text-white">{user.name}</td>
                <td className="px-6 py-3 text-sm text-slate-400">{user.email}</td>
                <td className="px-6 py-3 text-sm text-slate-300">{user.department}</td>
                <td className="px-6 py-3 text-sm">
                  <span className="px-3 py-1 rounded text-xs font-medium bg-green-500/20 border border-green-500/30 text-green-400">
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm flex gap-2">
                  <button onClick={() => handleEditUser(user)} className="p-1 text-slate-400 hover:text-blue-400 transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                  >
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
