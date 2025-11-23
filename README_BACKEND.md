# Student Attendance Portal - Backend Documentation

A modern, full-featured student attendance management system with **Supabase backend integration**, built with Next.js 16, React 19, and TypeScript.

## ✨ Key Features

### Implemented ✅
- **Secure Authentication**: Email/password signup and signin with Supabase Auth
- **Role-Based Access Control**: Student, Teacher, and Admin roles
- **Attendance Tracking**: Record, view, and manage attendance records
- **Grade Management**: Enter, update, and view academic grades with auto-calculated percentages
- **Course Management**: Create and manage courses
- **User Profiles**: Manage user information and departments
- **Real-time Database**: PostgreSQL database with RLS policies
- **Type-Safe API**: TypeScript throughout the stack
- **Beautiful UI**: Dark-themed Tailwind CSS components

### Database Features
- 5 PostgreSQL tables with proper relationships
- Row Level Security (RLS) policies for data protection
- Indexed queries for performance
- Automatic timestamps and calculations

## 📁 Project Structure

```
student-attendance-portal/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── signin/route.ts          # Sign in endpoint
│   │   │   ├── signup/route.ts          # Register endpoint
│   │   │   └── signout/route.ts         # Logout endpoint
│   │   ├── attendance/route.ts          # Attendance CRUD
│   │   ├── courses/route.ts             # Course CRUD
│   │   ├── grades/route.ts              # Grade CRUD
│   │   └── users/profile/route.ts       # Profile management
│   ├── dashboard/page.tsx               # Protected dashboard
│   ├── layout.tsx                       # Root layout with AuthProvider
│   └── page.tsx                         # Login/home page
│
├── components/
│   ├── auth-login.tsx                   # Auth form (signin/signup)
│   ├── attendance-form.tsx              # Mark attendance form
│   ├── attendance-table.tsx             # Display attendance
│   ├── grade-form.tsx                   # Enter grades form
│   ├── grades-table.tsx                 # Display grades
│   ├── course-form.tsx                  # Create course form
│   ├── dashboard-wrapper.tsx            # Dashboard router
│   └── ui/                              # Radix UI components
│
├── lib/
│   ├── supabase.ts                      # Supabase client config
│   ├── auth-context.tsx                 # Auth provider & hook
│   ├── api-client.ts                    # Centralized API client
│   └── hooks/
│       ├── use-attendance.ts            # Attendance hook
│       ├── use-grades.ts                # Grades hook
│       ├── use-courses.ts               # Courses hook
│       └── index.ts                     # Hook exports
│
├── public/                              # Static assets
├── styles/                              # Global styles
│
├── .env.local.example                   # Environment template
├── QUICKSTART.md                        # Quick setup guide
├── INSTALLATION.md                      # Detailed setup
├── BACKEND_SETUP.md                     # Architecture docs
├── API_DOCUMENTATION.md                 # API reference
├── SUPABASE_SETUP.md                    # Database setup
├── EXAMPLES.md                          # Code examples
├── CHANGES_SUMMARY.md                   # What was added
└── package.json                         # Dependencies
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account (free tier available)

### 5-Minute Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Create .env.local with Supabase credentials
cp .env.local.example .env.local

# 3. Add your Supabase keys
# Edit .env.local with your project URL and anon key

# 4. Set up database (run SQL from SUPABASE_SETUP.md)

# 5. Start development server
pnpm dev
```

Visit `http://localhost:3000` and start using the app!

## 🔑 Environment Setup

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Get these values from Supabase Dashboard → Settings → API

## 📊 Database Schema

### Users
```sql
id (UUID) | email (TEXT) | full_name (TEXT) | role (VARCHAR) | department (TEXT)
```
Stores user profiles with authentication reference.

### Courses
```sql
id (UUID) | code (VARCHAR) | name (TEXT) | teacher_id (UUID) | semester (INT)
```
Stores course information and teacher assignments.

### Enrollments
```sql
id (UUID) | student_id (UUID) | course_id (UUID)
```
Links students to courses (many-to-many).

### Attendance
```sql
id (UUID) | student_id (UUID) | course_id (UUID) | date (DATE) | status (VARCHAR)
```
Daily attendance records (present/absent/late).

### Grades
```sql
id (UUID) | student_id (UUID) | course_id (UUID) | marks (NUMERIC) | 
total_marks (NUMERIC) | percentage (NUMERIC) | grade (VARCHAR)
```
Academic grades with auto-calculated percentage.

## 🔐 Security

### Authentication
- Supabase Auth handles password security
- Session-based authentication
- Automatic token refresh

### Authorization
- Row Level Security (RLS) policies
- Role-based access control
- User can only access own data
- Teachers can modify their courses
- Admins have system-wide access

### Data Protection
- Input validation on client and server
- Parameterized queries (no SQL injection)
- HTTPS in production
- Environment variables for secrets

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/signup           Register new user
POST   /api/auth/signin           Sign in user
POST   /api/auth/signout          Sign out user
```

### Attendance
```
GET    /api/attendance            Get records
POST   /api/attendance            Record attendance
PATCH  /api/attendance            Update record
```

### Grades
```
GET    /api/grades                Get grades
POST   /api/grades                Record grade
PATCH  /api/grades                Update grade
```

### Courses
```
GET    /api/courses               Get courses
POST   /api/courses               Create course
```

### Users
```
GET    /api/users/profile         Get profile
PATCH  /api/users/profile         Update profile
```

See `API_DOCUMENTATION.md` for complete endpoint details.

## 🪝 Custom Hooks

### useAuth()
```typescript
const { user, userProfile, isAuthenticated, signIn, signUp, signOut } = useAuth()
```

### useAttendance()
```typescript
const { getAttendance, recordAttendance, updateAttendance, loading, error } = useAttendance()
```

### useGrades()
```typescript
const { getGrades, recordGrade, updateGrade, loading, error } = useGrades()
```

### useCourses()
```typescript
const { getCourses, createCourse, loading, error } = useCourses()
```

## 💻 Usage Examples

### Sign In
```typescript
import { useAuth } from '@/lib/auth-context'

const { signIn } = useAuth()
await signIn('user@example.com', 'password')
```

### Get Attendance
```typescript
import { useAttendance } from '@/lib/hooks'

const { getAttendance } = useAttendance()
const records = await getAttendance(studentId, courseId)
```

### Record Grade
```typescript
import { useGrades } from '@/lib/hooks'

const { recordGrade } = useGrades()
await recordGrade(studentId, courseId, 85, 100)
// Auto-calculates: percentage (85%), grade (A)
```

See `EXAMPLES.md` for more detailed examples.

## 🛠️ Technology Stack

### Frontend
- **Next.js 16.0.3** - React framework
- **React 19.2.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4.1.9** - Styling
- **Radix UI** - Accessible components
- **React Hook Form** - Form handling
- **Zod** - Validation

### Backend
- **Next.js API Routes** - Backend handlers
- **Supabase** - Backend as a Service
- **PostgreSQL** - Database
- **Row Level Security** - Data protection

### DevTools
- **ESLint** - Code quality
- **TypeScript** - Type checking

## 📚 Documentation

- **QUICKSTART.md** - 5-minute setup guide
- **INSTALLATION.md** - Detailed installation
- **BACKEND_SETUP.md** - Architecture documentation
- **API_DOCUMENTATION.md** - Complete API reference
- **SUPABASE_SETUP.md** - Database SQL scripts
- **EXAMPLES.md** - Code examples
- **CHANGES_SUMMARY.md** - What was added

## 🧪 Testing

### Test User Registration
1. Navigate to http://localhost:3000
2. Click "Sign Up"
3. Fill in credentials
4. Account created in Supabase Auth

### Test API
```bash
curl -X POST http://localhost:3000/api/attendance \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": "uuid",
    "courseId": "uuid",
    "date": "2024-01-15",
    "status": "present"
  }'
```

### Test Database
1. Supabase Dashboard → Table Editor
2. View data in real-time
3. Check RLS policies working

## 🚀 Deployment

### Deploy to Vercel

```bash
# Push to GitHub
git push origin main

# Go to vercel.com
# Import repository
# Add environment variables
# Deploy
```

### Production Checklist

- [ ] Set environment variables
- [ ] Configure Supabase Auth redirect URLs
- [ ] Enable HTTPS
- [ ] Set up custom domain
- [ ] Configure backups
- [ ] Test all features
- [ ] Monitor errors
- [ ] Set up logging

See `INSTALLATION.md` for detailed deployment guide.

## 🔄 Features Overview

### Student Features
- ✅ View attendance records
- ✅ Check grades
- ✅ View enrolled courses
- ✅ Monitor attendance percentage
- ✅ Manage profile

### Teacher Features
- ✅ Create courses
- ✅ Mark attendance
- ✅ Enter and update grades
- ✅ View class statistics
- ✅ Generate attendance reports

### Admin Features
- ✅ System-wide analytics
- ✅ Manage users
- ✅ Monitor all attendance
- ✅ View all grades
- ✅ System configuration

## 🐛 Troubleshooting

### "Missing Supabase credentials"
- Check `.env.local` has no typos
- Verify keys from Supabase Dashboard

### "Database tables not found"
- Run SQL scripts from `SUPABASE_SETUP.md`
- Verify all CREATE TABLE statements executed

### "Authentication failed"
- Clear browser cookies
- Check RLS policies enabled
- Verify user exists in Supabase Auth

### "API connection error"
- Check Supabase project is active
- Verify network connection
- Check CORS configuration

See `INSTALLATION.md` for more troubleshooting.

## 📈 Performance

### Optimizations Implemented
- Database indexes on frequently queried columns
- Frontend data caching in React state
- Lazy loading of components
- Optimized images
- CSS minification (Tailwind)

### Future Optimizations
- API response caching
- Request deduplication
- Database query optimization
- Image optimization
- Code splitting

## 🔐 Security Best Practices

✅ **Authentication**: Supabase Auth with secure password hashing
✅ **Authorization**: Row Level Security policies
✅ **Validation**: Server-side input validation
✅ **Encryption**: HTTPS only in production
✅ **Secrets**: Environment variables for credentials
✅ **SQL Injection**: Parameterized queries
✅ **CORS**: Properly configured

## 📞 Support & Resources

### Documentation
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

### Community
- [Supabase Discord](https://discord.supabase.io)
- [Next.js Discord](https://discord.gg/bUG2bvbtHy)
- [GitHub Issues](https://github.com/Huzaifa-12Imran/Student_Portal/issues)

## 📝 API Client

Use the centralized `apiClient` for all API calls:

```typescript
import { apiClient } from '@/lib/api-client'

// Sign in
await apiClient.auth.signin(email, password)

// Get attendance
await apiClient.attendance.list(studentId)

// Record attendance
await apiClient.attendance.record(studentId, courseId, date, status)

// Get grades
await apiClient.grades.list(studentId)

// Record grade
await apiClient.grades.record(studentId, courseId, marks, totalMarks)
```

## 🎯 Next Steps

1. **Follow QUICKSTART.md** for initial setup
2. **Create test user account** to explore features
3. **Review API_DOCUMENTATION.md** for all endpoints
4. **Check EXAMPLES.md** for code patterns
5. **Read BACKEND_SETUP.md** for architecture details
6. **Deploy to production** using INSTALLATION.md

## 📊 Project Statistics

- **Total Files**: 50+
- **API Endpoints**: 13
- **Database Tables**: 5
- **Custom Hooks**: 3
- **React Components**: 15+
- **TypeScript Files**: 20+
- **Lines of Code**: 3000+

## 🎓 Learning Resources

This project demonstrates:
- Modern Next.js 16 with App Router
- React 19 with hooks
- TypeScript for type safety
- PostgreSQL database design
- RESTful API design
- Authentication & Authorization
- Form handling with React Hook Form
- Component composition
- Custom hooks
- Context API for state management

## 📄 License

This project is open source under the MIT License.

---

**Start Building**: Run `pnpm dev` and visit `http://localhost:3000`

**Questions?** Check the documentation files or create an issue on GitHub.

**Happy Coding!** 🚀
