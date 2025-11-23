# Backend Setup Guide - Supabase Integration

## Overview

This document explains the complete backend architecture for the Student Attendance Portal using Supabase as the backend service.

## Architecture

```
┌─────────────────────────┐
│   Next.js Frontend      │
│  (React Components)     │
└────────────┬────────────┘
             │
    ┌────────▼────────┐
    │  API Routes     │
    │  (/api/*)       │
    └────────┬────────┘
             │
    ┌────────▼────────────────┐
    │   API Client             │
    │  (lib/api-client.ts)     │
    └────────┬────────────────┘
             │
┌────────────▼──────────────────┐
│   Supabase Services            │
├────────────────────────────────┤
│ • Authentication (Auth)         │
│ • Database (PostgreSQL)         │
│ • Real-time Subscriptions      │
│ • Row Level Security (RLS)      │
│ • Vector Storage (pgvector)     │
└────────────┬───────────────────┘
             │
    ┌────────▼────────┐
    │  PostgreSQL DB  │
    │  Tables:        │
    │  • users        │
    │  • courses      │
    │  • attendance   │
    │  • grades       │
    │  • enrollments  │
    └─────────────────┘
```

## Technology Stack

### Frontend
- **Framework**: Next.js 16.0.3
- **UI Library**: React 19.2.0
- **Styling**: Tailwind CSS 4.1.9
- **Components**: Radix UI
- **Forms**: React Hook Form + Zod validation

### Backend
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **API**: Next.js API Routes
- **Type Safety**: TypeScript 5

### DevTools
- **Linting**: ESLint
- **Type Checking**: TypeScript

## Database Schema

### Users Table
Stores user account information with role-based access.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role VARCHAR(20) NOT NULL,
  department TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Indexes
CREATE INDEX users_role_idx ON users(role);
CREATE INDEX users_email_idx ON users(email);
```

**Fields**:
- `id`: User ID (references auth.users)
- `email`: User email address
- `full_name`: Full name of the user
- `role`: User role (student, teacher, admin)
- `department`: Department/faculty (optional)
- `created_at`: Account creation timestamp
- `updated_at`: Last profile update timestamp

### Courses Table
Stores course information and teacher associations.

```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(10) UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  teacher_id UUID NOT NULL REFERENCES users(id),
  semester INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX courses_teacher_id_idx ON courses(teacher_id);
CREATE INDEX courses_semester_idx ON courses(semester);
```

**Fields**:
- `id`: Unique course ID
- `code`: Course code (e.g., CS101)
- `name`: Course name
- `description`: Course description
- `teacher_id`: ID of the teacher teaching this course
- `semester`: Semester number (1-8)
- `created_at`: Course creation timestamp

### Enrollments Table
Tracks which students are enrolled in which courses.

```sql
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id),
  course_id UUID NOT NULL REFERENCES courses(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, course_id)
);

-- Indexes
CREATE INDEX enrollments_student_id_idx ON enrollments(student_id);
CREATE INDEX enrollments_course_id_idx ON enrollments(course_id);
```

**Fields**:
- `id`: Unique enrollment ID
- `student_id`: ID of enrolled student
- `course_id`: ID of course
- `created_at`: Enrollment timestamp

### Attendance Table
Records daily attendance for each student in each course.

```sql
CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id),
  course_id UUID NOT NULL REFERENCES courses(id),
  date DATE NOT NULL,
  status VARCHAR(10) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, course_id, date)
);

-- Indexes
CREATE INDEX attendance_student_id_idx ON attendance(student_id);
CREATE INDEX attendance_course_id_idx ON attendance(course_id);
CREATE INDEX attendance_date_idx ON attendance(date);
```

**Fields**:
- `id`: Unique attendance record ID
- `student_id`: ID of the student
- `course_id`: ID of the course
- `date`: Attendance date
- `status`: Attendance status (present, absent, late)
- `created_at`: Record creation timestamp

**Status Values**:
- `present`: Student was present
- `absent`: Student was absent
- `late`: Student was late

### Grades Table
Stores academic grades and marks for each student in each course.

```sql
CREATE TABLE grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL REFERENCES users(id),
  course_id UUID NOT NULL REFERENCES courses(id),
  marks NUMERIC(5,2) NOT NULL,
  total_marks NUMERIC(5,2) NOT NULL,
  percentage NUMERIC(5,2) NOT NULL,
  grade VARCHAR(2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, course_id)
);

-- Indexes
CREATE INDEX grades_student_id_idx ON grades(student_id);
CREATE INDEX grades_course_id_idx ON grades(course_id);
```

**Fields**:
- `id`: Unique grade record ID
- `student_id`: ID of the student
- `course_id`: ID of the course
- `marks`: Marks obtained by student
- `total_marks`: Total marks possible
- `percentage`: Calculated percentage
- `grade`: Letter grade (A+, A, B, C, D, F)
- `created_at`: Record creation timestamp
- `updated_at`: Last update timestamp

## API Routes

### Authentication Routes

**`POST /api/auth/signup`**
- Register new user account
- Creates user in auth.users and inserts profile in users table

**`POST /api/auth/signin`**
- Authenticate user with email/password
- Returns session token and user profile

**`POST /api/auth/signout`**
- Clear user session
- Signs out from Supabase auth

### User Routes

**`GET /api/users/profile`**
- Retrieve user profile
- Query params: `userId`

**`PATCH /api/users/profile`**
- Update user profile information
- Body: `userId`, `fullName`, `department`

### Course Routes

**`GET /api/courses`**
- List all courses or filter by teacher
- Query params: `teacherId` (optional)

**`POST /api/courses`**
- Create new course (teacher only)
- Body: `code`, `name`, `teacherId`, `semester`, `description`

### Attendance Routes

**`GET /api/attendance`**
- Get attendance records
- Query params: `studentId`, `courseId` (optional)

**`POST /api/attendance`**
- Record attendance for a student
- Body: `studentId`, `courseId`, `date`, `status`

**`PATCH /api/attendance`**
- Update attendance record
- Body: `id`, `status`

### Grade Routes

**`GET /api/grades`**
- Get grade records
- Query params: `studentId`, `courseId` (optional)

**`POST /api/grades`**
- Record grade for a student
- Body: `studentId`, `courseId`, `marks`, `totalMarks`

**`PATCH /api/grades`**
- Update grade record
- Body: `id`, `marks`, `totalMarks`

## Authentication Flow

```
1. User submits credentials
   ↓
2. POST /api/auth/signin
   ↓
3. Supabase Auth validates credentials
   ↓
4. If valid, create session & fetch user profile
   ↓
5. Return user data + session token
   ↓
6. AuthContext stores user in React state
   ↓
7. Redirect to /dashboard
```

## Security Implementation

### Row Level Security (RLS)

RLS policies enforce data access at the database level:

```sql
-- Users can view their own profile
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

-- Teachers can view their courses
CREATE POLICY "Teachers can view their courses" ON courses
  FOR SELECT USING (auth.uid() = teacher_id);

-- Students can view their attendance
CREATE POLICY "Students can view their attendance" ON attendance
  FOR SELECT USING (auth.uid() = student_id);

-- Teachers can modify attendance for their courses
CREATE POLICY "Teachers can modify course attendance" ON attendance
  FOR UPDATE USING (
    course_id IN (SELECT id FROM courses WHERE teacher_id = auth.uid())
  );
```

### Data Validation

All inputs are validated before reaching the database:

```typescript
// API routes validate request data
if (!email || !password || !fullName) {
  return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
}

// Frontend uses Zod schemas for form validation
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})
```

## Error Handling

### API Error Responses

All errors are caught and returned with appropriate status codes:

```typescript
try {
  // Operation
} catch (error) {
  return NextResponse.json(
    { error: error.message },
    { status: 400 }
  )
}
```

**Status Codes**:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Server Error

## Real-time Features (Future)

Supabase supports real-time subscriptions for live updates:

```typescript
// Subscribe to attendance changes
supabase
  .from('attendance')
  .on('*', (payload) => {
    console.log('Attendance updated:', payload)
  })
  .subscribe()
```

## Hooks for Data Fetching

Custom hooks handle data fetching and state management:

```typescript
const { getAttendance, recordAttendance, loading, error } = useAttendance()

// Get attendance
const records = await getAttendance(studentId, courseId)

// Record new attendance
await recordAttendance(studentId, courseId, '2024-01-15', 'present')
```

Available hooks:
- `useAttendance()` - Attendance operations
- `useGrades()` - Grade operations
- `useCourses()` - Course operations
- `useAuth()` - Authentication state

## Environment Variables

Required environment variables in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxxxxxxx
```

**Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never store secrets in them.

## Database Queries

### Common Queries

**Get all students in a course**:
```sql
SELECT u.* FROM users u
INNER JOIN enrollments e ON u.id = e.student_id
WHERE e.course_id = 'course-id'
```

**Get attendance percentage**:
```sql
SELECT 
  student_id,
  COUNT(*) as total_classes,
  SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present_count,
  (SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) * 100.0 / COUNT(*)) as percentage
FROM attendance
WHERE student_id = 'student-id' AND course_id = 'course-id'
GROUP BY student_id
```

**Get student grades summary**:
```sql
SELECT 
  AVG(percentage) as average_percentage,
  COUNT(*) as total_courses
FROM grades
WHERE student_id = 'student-id'
```

## Performance Optimization

### Indexing
Database tables are indexed on frequently queried columns:
- User lookups by ID and email
- Course lookups by teacher_id
- Attendance lookups by student_id, course_id, date
- Grade lookups by student_id, course_id

### Caching
Frontend caches data in React state to minimize API calls.

### Pagination
For large datasets, implement cursor-based pagination:
```typescript
const { data, nextCursor } = await apiClient.attendance.list(
  studentId,
  courseId,
  { cursor: lastCursor }
)
```

## Backup & Recovery

Supabase automatically backs up data:
- Daily backups (free tier: 7-day retention)
- Point-in-time recovery (professional tier)

Configure in Supabase Dashboard → Database → Backups

## Monitoring & Logging

Monitor API performance in Supabase Dashboard:
- Database query logs
- Auth logs
- Real-time subscriptions
- Error tracking

## Deployment Checklist

Before deploying to production:

- [ ] Set environment variables in deployment platform
- [ ] Configure CORS in Supabase
- [ ] Set redirect URLs for authentication
- [ ] Enable HTTPS
- [ ] Test all API endpoints
- [ ] Set up monitoring/logging
- [ ] Configure backups
- [ ] Test error scenarios
- [ ] Load testing
- [ ] Security audit

## Support & Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
