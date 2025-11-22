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

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    { id: "001", name: "Ahmed Ali", email: "ahmed@school.edu", role: "student", department: "CS", status: "active" },
    {
      id: "002",
      name: "Dr. Fatima Khan",
      email: "fatima@school.edu",
      role: "teacher",
      department: "CS",
      status: "active",
    },
    {
      id: "003",
      name: "Ibrahim Hassan",
      email: "ibrahim@school.edu",
      role: "admin",
      department: "IT",
      status: "active",
    },
  ])

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
    <div className="space-y-6">
      {}
      <div className="flex justify-end">
        <button
          onClick={() => {
            setShowForm(!showForm)
            if (!showForm) {
              setEditingId(null)
              setNewUser({ name: "", email: "", role: "student", department: "" })
            }
          }}
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New User
        </button>
      </div>

      {}
      {showForm && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-4">{editingId ? "Edit User" : "Add New User"}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary"
            />
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value as any })}
              className="px-4 py-2 bg-input border border-border rounded-lg text-foreground focus:ring-2 focus:ring-primary"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="text"
              placeholder="Department"
              value={newUser.department}
              onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
              className="px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors"
            >
              {editingId ? "Update User" : "Save User"}
            </button>
            <button
              onClick={() => { setShowForm(false); setEditingId(null); setNewUser({ name: "", email: "", role: "student", department: "" }) }}
              className="px-4 py-2 bg-input border border-border text-foreground rounded-lg font-medium hover:bg-border transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {}
      <div className="bg-card border border-border rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">ID</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Role</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Department</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Status</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-background/50">
                <td className="px-6 py-3 text-sm text-muted-foreground">{user.id}</td>
                <td className="px-6 py-3 text-sm text-foreground">{user.name}</td>
                <td className="px-6 py-3 text-sm text-muted-foreground">{user.email}</td>
                <td className="px-6 py-3 text-sm">
                  <span
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-destructive/10 text-destructive"
                        : user.role === "teacher"
                          ? "bg-primary/10 text-primary"
                          : "bg-accent/10 text-accent"
                    }`}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm text-foreground">{user.department}</td>
                <td className="px-6 py-3 text-sm">
                  <span className="px-3 py-1 rounded text-xs font-medium bg-accent/10 text-accent">
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-3 text-sm flex gap-2">
                  <button onClick={() => handleEditUser(user)} className="p-1 text-muted-foreground hover:text-primary transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-1 text-muted-foreground hover:text-destructive transition-colors"
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
