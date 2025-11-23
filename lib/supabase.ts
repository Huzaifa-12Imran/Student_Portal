import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId
  email: string
  password: string
  full_name: string
  role: 'student' | 'teacher' | 'admin'
  department?: string
  created_at: Date
  updated_at: Date
}

export interface Course {
  _id?: ObjectId
  code: string
  name: string
  description?: string
  teacher_id: string
  semester: number
  created_at: Date
}

export interface Attendance {
  _id?: ObjectId
  student_id: string
  course_id: string
  date: string
  status: 'present' | 'absent' | 'late'
  created_at: Date
}

export interface Grade {
  _id?: ObjectId
  student_id: string
  course_id: string
  marks: number
  total_marks: number
  percentage: number
  grade: string
  created_at: Date
  updated_at: Date
}

export interface Enrollment {
  _id?: ObjectId
  student_id: string
  course_id: string
  created_at: Date
}

export type Database = {
  users: User
  courses: Course
  attendance: Attendance
  grades: Grade
  enrollments: Enrollment
}
