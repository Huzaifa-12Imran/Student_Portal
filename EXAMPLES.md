# Usage Examples

This document provides practical examples of how to use the API and hooks in your components.

---

## Authentication Examples

### Sign Up Example

```typescript
'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

export default function SignUpPage() {
  const { signUp } = useAuth()
  const router = useRouter()
  const [error, setError] = useState('')

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    try {
      await signUp(
        formData.get('email') as string,
        formData.get('password') as string,
        formData.get('fullName') as string,
        formData.get('role') as string,
        formData.get('department') as string
      )
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    }
  }

  return (
    <form onSubmit={handleSignUp}>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      <input name="fullName" type="text" placeholder="Full Name" required />
      <select name="role" required>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>
      <input name="department" type="text" placeholder="Department" />
      <button type="submit">Sign Up</button>
      {error && <p>{error}</p>}
    </form>
  )
}
```

### Sign In Example

```typescript
'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const { signIn } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signIn(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
    }
  }

  return (
    <form onSubmit={handleSignIn}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign In</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
```

### Protected Component Example

```typescript
'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedPage() {
  const { userProfile, isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, loading, router])

  if (loading) return <div>Loading...</div>
  if (!isAuthenticated) return null

  return (
    <div>
      <h1>Welcome, {userProfile?.full_name}</h1>
      <p>Role: {userProfile?.role}</p>
    </div>
  )
}
```

---

## Attendance Examples

### Fetch and Display Attendance

```typescript
'use client'

import { useEffect, useState } from 'react'
import { useAttendance, type AttendanceRecord } from '@/lib/hooks'
import { useAuth } from '@/lib/auth-context'

export default function AttendancePage() {
  const { userProfile } = useAuth()
  const { getAttendance, loading, error } = useAttendance()
  const [records, setRecords] = useState<AttendanceRecord[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (userProfile?.id) {
        try {
          const data = await getAttendance(userProfile.id)
          setRecords(data)
        } catch (err) {
          console.error('Failed to fetch attendance:', err)
        }
      }
    }

    fetchData()
  }, [userProfile, getAttendance])

  if (loading) return <div>Loading attendance...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record) => (
          <tr key={record.id}>
            <td>{new Date(record.date).toLocaleDateString()}</td>
            <td>{record.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
```

### Mark Attendance (Teacher)

```typescript
'use client'

import { useState } from 'react'
import { useAttendance } from '@/lib/hooks'

interface MarkAttendanceProps {
  studentId: string
  courseId: string
}

export default function MarkAttendance({ studentId, courseId }: MarkAttendanceProps) {
  const { recordAttendance, loading } = useAttendance()
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [status, setStatus] = useState<'present' | 'absent' | 'late'>('present')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await recordAttendance(studentId, courseId, date, status)
      alert('Attendance recorded successfully')
    } catch (err) {
      alert('Failed to record attendance')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
        <option value="present">Present</option>
        <option value="absent">Absent</option>
        <option value="late">Late</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? 'Recording...' : 'Record Attendance'}
      </button>
    </form>
  )
}
```

---

## Grade Examples

### Fetch and Display Grades

```typescript
'use client'

import { useEffect, useState } from 'react'
import { useGrades, type Grade } from '@/lib/hooks'
import { useAuth } from '@/lib/auth-context'

export default function GradesPage() {
  const { userProfile } = useAuth()
  const { getGrades, loading, error } = useGrades()
  const [grades, setGrades] = useState<Grade[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (userProfile?.id) {
        try {
          const data = await getGrades(userProfile.id)
          setGrades(data)
        } catch (err) {
          console.error('Failed to fetch grades:', err)
        }
      }
    }

    fetchData()
  }, [userProfile, getGrades])

  if (loading) return <div>Loading grades...</div>
  if (error) return <div>Error: {error}</div>

  const average = grades.length > 0
    ? (grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length).toFixed(2)
    : 0

  return (
    <div>
      <h2>Your Grades</h2>
      <p>Average: {average}%</p>

      <table>
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Marks</th>
            <th>Percentage</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.id}>
              <td>{grade.course_id}</td>
              <td>{grade.marks}/{grade.total_marks}</td>
              <td>{grade.percentage.toFixed(2)}%</td>
              <td><strong>{grade.grade}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

### Record Grades (Teacher)

```typescript
'use client'

import { useState } from 'react'
import { useGrades } from '@/lib/hooks'

interface RecordGradeProps {
  studentId: string
  courseId: string
}

export default function RecordGrade({ studentId, courseId }: RecordGradeProps) {
  const { recordGrade, loading, error } = useGrades()
  const [marks, setMarks] = useState('')
  const [totalMarks, setTotalMarks] = useState('100')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const marksNum = parseFloat(marks)
    const totalNum = parseFloat(totalMarks)

    if (marksNum < 0 || marksNum > totalNum) {
      alert('Invalid marks')
      return
    }

    try {
      await recordGrade(studentId, courseId, marksNum, totalNum)
      alert('Grade recorded successfully')
      setMarks('')
      setTotalMarks('100')
    } catch (err) {
      alert('Failed to record grade')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Marks"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Total Marks"
        value={totalMarks}
        onChange={(e) => setTotalMarks(e.target.value)}
        required
      />
      {marks && totalMarks && (
        <p>Percentage: {((parseFloat(marks) / parseFloat(totalMarks)) * 100).toFixed(2)}%</p>
      )}
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Record Grade'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
```

---

## Course Examples

### List Courses

```typescript
'use client'

import { useEffect, useState } from 'react'
import { useCourses, type Course } from '@/lib/hooks'

export default function CoursesPage() {
  const { getCourses, loading, error } = useCourses()
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCourses()
        setCourses(data)
      } catch (err) {
        console.error('Failed to fetch courses:', err)
      }
    }

    fetchData()
  }, [getCourses])

  if (loading) return <div>Loading courses...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h2>Available Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <h3>{course.name} ({course.code})</h3>
            <p>{course.description}</p>
            <p>Semester: {course.semester}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

### Create Course (Teacher)

```typescript
'use client'

import { useState } from 'react'
import { useCourses } from '@/lib/hooks'
import { useAuth } from '@/lib/auth-context'

export default function CreateCoursePage() {
  const { userProfile } = useAuth()
  const { createCourse, loading, error } = useCourses()
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [semester, setSemester] = useState('1')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!userProfile) {
      alert('User profile not loaded')
      return
    }

    try {
      await createCourse(
        code,
        name,
        userProfile.id,
        parseInt(semester),
        description
      )
      alert('Course created successfully')
      setCode('')
      setName('')
      setDescription('')
      setSemester('1')
    } catch (err) {
      alert('Failed to create course')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Course Code (e.g., CS101)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Course Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select value={semester} onChange={(e) => setSemester(e.target.value)}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
          <option key={s} value={s}>
            Semester {s}
          </option>
        ))}
      </select>
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create Course'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}
```

---

## API Client Direct Usage

### Direct API Calls

```typescript
import { apiClient } from '@/lib/api-client'

// Sign in
const signInResult = await apiClient.auth.signin('user@example.com', 'password')
console.log(signInResult.userProfile)

// Get courses
const coursesResult = await apiClient.courses.list()
console.log(coursesResult.data)

// Record attendance
const attendanceResult = await apiClient.attendance.record(
  'student-id',
  'course-id',
  '2024-01-15',
  'present'
)
console.log(attendanceResult.data)

// Get grades for a student
const gradesResult = await apiClient.grades.list('student-id')
console.log(gradesResult.data)

// Update grade
const updateResult = await apiClient.grades.update('grade-id', 95, 100)
console.log(updateResult.data)
```

---

## Error Handling Patterns

### Try-Catch Pattern

```typescript
try {
  const grades = await getGrades(studentId)
  setGrades(grades)
} catch (error) {
  const message = error instanceof Error ? error.message : 'An error occurred'
  setError(message)
  console.error('Error fetching grades:', error)
}
```

### With Loading and Error States

```typescript
const MyComponent = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError('')
      try {
        const result = await apiClient.attendance.list()
        setData(result.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>No data</div>

  return <div>{/* Render data */}</div>
}
```

---

## Real-time Updates Example (Future)

```typescript
import { supabase } from '@/lib/supabase'

// Subscribe to attendance changes
const subscription = supabase
  .from('attendance')
  .on('*', (payload) => {
    console.log('Attendance changed:', payload)
    // Update UI with new data
  })
  .subscribe()

// Cleanup subscription
subscription.unsubscribe()
```

---

## Type Safety Examples

### Using TypeScript Types

```typescript
import { AttendanceRecord, Grade, Course } from '@/lib/hooks'

const processAttendance = (records: AttendanceRecord[]) => {
  return records.filter((r) => r.status === 'present').length
}

const calculateGPA = (grades: Grade[]) => {
  return (grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length).toFixed(2)
}

const displayCourse = (course: Course) => {
  return `${course.code}: ${course.name} (Semester ${course.semester})`
}
```

---

## Testing Examples

### Testing Authentication

```typescript
const testSignUp = async () => {
  try {
    await apiClient.auth.signup(
      'test@example.com',
      'Test@123456',
      'Test User',
      'student',
      'Computer Science'
    )
    console.log('✓ Sign up successful')
  } catch (error) {
    console.error('✗ Sign up failed:', error)
  }
}

const testSignIn = async () => {
  try {
    const result = await apiClient.auth.signin('test@example.com', 'Test@123456')
    console.log('✓ Sign in successful')
    console.log('User:', result.userProfile)
  } catch (error) {
    console.error('✗ Sign in failed:', error)
  }
}

testSignUp()
testSignIn()
```

---

## More Examples

See individual component files for more detailed examples:
- `components/attendance-form.tsx` - Mark attendance
- `components/grade-form.tsx` - Enter grades
- `components/course-form.tsx` - Create courses
- `components/attendance-table.tsx` - Display attendance
- `components/grades-table.tsx` - Display grades

---

## Common Patterns

### List and Filter
```typescript
const allRecords = await getAttendance()
const filtered = allRecords.filter(r => r.date >= '2024-01-01')
```

### Batch Operations
```typescript
const results = await Promise.all([
  getAttendance(studentId),
  getGrades(studentId),
  getCourses()
])
```

### Conditional Rendering
```typescript
{isLoading ? (
  <LoadingSpinner />
) : isError ? (
  <ErrorMessage error={error} />
) : data?.length > 0 ? (
  <DataTable data={data} />
) : (
  <EmptyState />
)}
```
