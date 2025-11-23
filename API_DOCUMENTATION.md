# API Documentation

## Base URL

```
http://localhost:3000/api
```

For production, replace with your deployed domain.

## Authentication Endpoints

### Sign Up

**Endpoint**: `POST /api/auth/signup`

**Description**: Create a new user account

**Request Body**:
```json
{
  "email": "student@example.com",
  "password": "SecurePassword123",
  "fullName": "John Doe",
  "role": "student",
  "department": "Computer Science"
}
```

**Response** (201):
```json
{
  "message": "Signup successful",
  "user": {
    "id": "uuid",
    "email": "student@example.com",
    "user_metadata": {
      "full_name": "John Doe",
      "role": "student"
    }
  }
}
```

**Error** (400):
```json
{
  "error": "Error message"
}
```

---

### Sign In

**Endpoint**: `POST /api/auth/signin`

**Description**: Authenticate user with email and password

**Request Body**:
```json
{
  "email": "student@example.com",
  "password": "SecurePassword123"
}
```

**Response** (200):
```json
{
  "message": "Signin successful",
  "user": {
    "id": "uuid",
    "email": "student@example.com"
  },
  "userProfile": {
    "id": "uuid",
    "email": "student@example.com",
    "full_name": "John Doe",
    "role": "student",
    "department": "Computer Science",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "session": {
    "access_token": "token",
    "refresh_token": "token",
    "expires_in": 3600
  }
}
```

**Error** (401):
```json
{
  "error": "Invalid login credentials"
}
```

---

### Sign Out

**Endpoint**: `POST /api/auth/signout`

**Description**: Sign out current user

**Request Body**: Empty

**Response** (200):
```json
{
  "message": "Signout successful"
}
```

---

## User Endpoints

### Get User Profile

**Endpoint**: `GET /api/users/profile?userId={userId}`

**Description**: Retrieve user profile information

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| userId | string | Yes | User ID (UUID) |

**Response** (200):
```json
{
  "data": {
    "id": "uuid",
    "email": "student@example.com",
    "full_name": "John Doe",
    "role": "student",
    "department": "Computer Science",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

**Error** (400):
```json
{
  "error": "User not found"
}
```

---

### Update User Profile

**Endpoint**: `PATCH /api/users/profile`

**Description**: Update user profile information

**Request Body**:
```json
{
  "userId": "uuid",
  "fullName": "Jane Doe",
  "department": "Software Engineering"
}
```

**Response** (200):
```json
{
  "message": "Profile updated",
  "data": [
    {
      "id": "uuid",
      "full_name": "Jane Doe",
      "department": "Software Engineering",
      "updated_at": "2024-01-15T11:45:00Z"
    }
  ]
}
```

---

## Course Endpoints

### List Courses

**Endpoint**: `GET /api/courses?teacherId={teacherId}`

**Description**: Get courses (optionally filtered by teacher)

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| teacherId | string | No | Filter by teacher ID |

**Response** (200):
```json
{
  "data": [
    {
      "id": "uuid",
      "code": "CS101",
      "name": "Introduction to Programming",
      "description": "Basic programming concepts",
      "teacher_id": "uuid",
      "semester": 1,
      "created_at": "2024-01-10T08:00:00Z"
    }
  ]
}
```

---

### Create Course

**Endpoint**: `POST /api/courses`

**Description**: Create a new course (Teacher only)

**Request Body**:
```json
{
  "code": "CS101",
  "name": "Introduction to Programming",
  "description": "Basic programming concepts",
  "teacherId": "uuid",
  "semester": 1
}
```

**Response** (201):
```json
{
  "message": "Course created",
  "data": [
    {
      "id": "uuid",
      "code": "CS101",
      "name": "Introduction to Programming",
      "description": "Basic programming concepts",
      "teacher_id": "uuid",
      "semester": 1,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Error** (400):
```json
{
  "error": "Course code already exists"
}
```

---

## Attendance Endpoints

### Get Attendance Records

**Endpoint**: `GET /api/attendance?studentId={studentId}&courseId={courseId}`

**Description**: Retrieve attendance records

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| studentId | string | No | Filter by student ID |
| courseId | string | No | Filter by course ID |

**Response** (200):
```json
{
  "data": [
    {
      "id": "uuid",
      "student_id": "uuid",
      "course_id": "uuid",
      "date": "2024-01-15",
      "status": "present",
      "created_at": "2024-01-15T08:30:00Z"
    },
    {
      "id": "uuid",
      "student_id": "uuid",
      "course_id": "uuid",
      "date": "2024-01-16",
      "status": "absent",
      "created_at": "2024-01-16T08:30:00Z"
    }
  ]
}
```

---

### Record Attendance

**Endpoint**: `POST /api/attendance`

**Description**: Record attendance for a student in a course

**Request Body**:
```json
{
  "studentId": "uuid",
  "courseId": "uuid",
  "date": "2024-01-15",
  "status": "present"
}
```

**Status Values**: `present`, `absent`, `late`

**Response** (201):
```json
{
  "message": "Attendance recorded",
  "data": [
    {
      "id": "uuid",
      "student_id": "uuid",
      "course_id": "uuid",
      "date": "2024-01-15",
      "status": "present",
      "created_at": "2024-01-15T08:30:00Z"
    }
  ]
}
```

---

### Update Attendance

**Endpoint**: `PATCH /api/attendance`

**Description**: Update an attendance record

**Request Body**:
```json
{
  "id": "uuid",
  "status": "absent"
}
```

**Response** (200):
```json
{
  "message": "Attendance updated",
  "data": [
    {
      "id": "uuid",
      "student_id": "uuid",
      "course_id": "uuid",
      "date": "2024-01-15",
      "status": "absent",
      "created_at": "2024-01-15T08:30:00Z"
    }
  ]
}
```

---

## Grade Endpoints

### Get Grades

**Endpoint**: `GET /api/grades?studentId={studentId}&courseId={courseId}`

**Description**: Retrieve grade records

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| studentId | string | No | Filter by student ID |
| courseId | string | No | Filter by course ID |

**Response** (200):
```json
{
  "data": [
    {
      "id": "uuid",
      "student_id": "uuid",
      "course_id": "uuid",
      "marks": 85,
      "total_marks": 100,
      "percentage": 85.00,
      "grade": "A",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### Record Grade

**Endpoint**: `POST /api/grades`

**Description**: Record a grade for a student in a course

**Request Body**:
```json
{
  "studentId": "uuid",
  "courseId": "uuid",
  "marks": 85,
  "totalMarks": 100
}
```

**Response** (201):
```json
{
  "message": "Grade recorded",
  "data": [
    {
      "id": "uuid",
      "student_id": "uuid",
      "course_id": "uuid",
      "marks": 85,
      "total_marks": 100,
      "percentage": 85.00,
      "grade": "A",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

**Grading Scale**:
| Percentage | Grade |
|-----------|-------|
| 90-100 | A+ |
| 80-89 | A |
| 70-79 | B |
| 60-69 | C |
| 50-59 | D |
| 0-49 | F |

---

### Update Grade

**Endpoint**: `PATCH /api/grades`

**Description**: Update a grade record

**Request Body**:
```json
{
  "id": "uuid",
  "marks": 90,
  "totalMarks": 100
}
```

**Response** (200):
```json
{
  "message": "Grade updated",
  "data": [
    {
      "id": "uuid",
      "student_id": "uuid",
      "course_id": "uuid",
      "marks": 90,
      "total_marks": 100,
      "percentage": 90.00,
      "grade": "A+",
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T11:45:00Z"
    }
  ]
}
```

---

## Error Handling

### Common Error Responses

**400 Bad Request**:
```json
{
  "error": "Missing required fields"
}
```

**401 Unauthorized**:
```json
{
  "error": "Invalid login credentials"
}
```

**404 Not Found**:
```json
{
  "error": "Resource not found"
}
```

**500 Internal Server Error**:
```json
{
  "error": "An error occurred during [operation]"
}
```

---

## Rate Limiting

No rate limiting is enforced on the API currently. In production, consider implementing:
- 100 requests per minute per IP
- 1000 requests per hour per user
- Use a service like Redis for rate limiting

---

## Authentication

All endpoints (except signup and signin) require authentication via Supabase Auth. 

To authenticate requests:
1. Sign in using `/api/auth/signin`
2. Store the session token
3. Pass the token in the Authorization header for subsequent requests

Example:
```bash
curl -H "Authorization: Bearer {token}" \
  https://your-domain.com/api/courses
```

---

## Using with Frontend

Use the provided `apiClient` from `lib/api-client.ts`:

```typescript
import { apiClient } from '@/lib/api-client'

// Sign in
const result = await apiClient.auth.signin('user@example.com', 'password')

// Get courses
const courses = await apiClient.courses.list(teacherId)

// Record attendance
const attendance = await apiClient.attendance.record(
  studentId,
  courseId,
  '2024-01-15',
  'present'
)
```

---

## Webhooks

Webhooks can be configured in Supabase to trigger events on database changes. Future versions will support:
- Attendance recorded
- Grade updated
- Course created
- User enrolled

Configure webhooks in Supabase Dashboard → Database → Webhooks
