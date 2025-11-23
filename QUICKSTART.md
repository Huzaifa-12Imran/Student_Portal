# Quick Start Guide

Get the Student Attendance Portal running in 5 minutes!

## Prerequisites

- Node.js 18.x or higher
- Supabase account (free tier available)

## 5-Minute Setup

### Step 1: Clone & Install (1 min)

```bash
git clone https://github.com/Huzaifa-12Imran/Student_Portal.git
cd student-attendance-portal
pnpm install  # or npm install
```

### Step 2: Create Supabase Project (2 min)

1. Go to [supabase.com](https://supabase.com)
2. Sign up/login
3. Create new project
4. Wait for it to initialize

### Step 3: Set Environment Variables (1 min)

1. Get your keys from Supabase Dashboard → Settings → API
2. Create `.env.local`:

```bash
cp .env.local.example .env.local
```

3. Fill in your credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Step 4: Setup Database (1 min)

1. Go to Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Copy all SQL from `SUPABASE_SETUP.md`
4. Run it

### Step 5: Run the App (30 sec)

```bash
pnpm dev
```

Open `http://localhost:3000` - Done! ✅

---

## Quick Test

### Create Test Account

1. Sign up: `test@example.com` / `Password123`
2. Choose role: `Student`
3. Click "Sign Up"

### Try Features

- **Login**: Use your test credentials
- **Dashboard**: See your profile and attendance
- **Attendance**: View mock attendance data
- **Grades**: View mock grade records

---

## Troubleshooting Quick Fixes

### Error: "Missing Supabase environment variables"
- Check `.env.local` has no typos
- Verify keys are copied correctly from Supabase

### Error: "Database connection failed"
- Verify Supabase project is active
- Check Internet connection
- Wait a few minutes if project just created

### Error: "Authentication failed"
- Make sure database tables are created
- Check RLS policies are enabled
- Clear browser cache/cookies

### Port 3000 already in use
```bash
pnpm dev -p 3001  # Use different port
```

---

## What's Working

✅ User authentication (sign up/sign in/sign out)
✅ Role-based access (student, teacher, admin)
✅ Attendance tracking and viewing
✅ Grade management
✅ Course creation
✅ User profiles
✅ Responsive design

---

## Next Steps

After initial setup:

1. **Customize**: Edit dashboard components in `components/`
2. **Add Features**: Check `BACKEND_SETUP.md` for architecture
3. **Deploy**: Follow deployment guide for Vercel/production
4. **Database**: Add more courses/students via Supabase Dashboard

---

## Key Files

| File | Purpose |
|------|---------|
| `.env.local` | Environment variables |
| `lib/supabase.ts` | Supabase client config |
| `lib/auth-context.tsx` | Auth provider |
| `app/api/` | API routes |
| `components/` | React components |
| `INSTALLATION.md` | Full installation guide |
| `API_DOCUMENTATION.md` | API reference |
| `BACKEND_SETUP.md` | Backend architecture |

---

## Common Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Build for production
pnpm start      # Run production build
pnpm lint       # Run linter
```

---

## Architecture Overview

```
Browser
   ↓
Next.js (Frontend + API Routes)
   ↓
Supabase (Auth + Database)
   ↓
PostgreSQL (Data Storage)
```

- Frontend: React with Tailwind CSS
- API: Next.js Route Handlers
- Database: PostgreSQL (via Supabase)
- Auth: Supabase Auth

---

## Features by Role

### Student
- View attendance records
- Check grades
- View enrolled courses
- Monitor attendance percentage

### Teacher
- Create courses
- Mark attendance
- Enter grades
- View class statistics
- Generate reports

### Admin
- System-wide analytics
- Manage users
- Monitor all attendance
- System configuration

---

## Database Schema Quick Reference

```
users (id, email, full_name, role, department)
courses (id, code, name, teacher_id, semester)
enrollments (id, student_id, course_id)
attendance (id, student_id, course_id, date, status)
grades (id, student_id, course_id, marks, percentage, grade)
```

---

## API Endpoints Quick Reference

```
POST   /api/auth/signin           Sign in user
POST   /api/auth/signup           Create account
POST   /api/auth/signout          Sign out

GET    /api/attendance            Get attendance records
POST   /api/attendance            Record attendance
PATCH  /api/attendance            Update attendance

GET    /api/grades                Get grades
POST   /api/grades                Record grade
PATCH  /api/grades                Update grade

GET    /api/courses               Get courses
POST   /api/courses               Create course

GET    /api/users/profile         Get user profile
PATCH  /api/users/profile         Update profile
```

---

## Debugging

Enable browser DevTools to see:
- API requests/responses (Network tab)
- Console errors (Console tab)
- Local storage (Application tab)

---

## Support

- 📖 [Full Documentation](./INSTALLATION.md)
- 🔧 [Backend Setup](./BACKEND_SETUP.md)
- 📝 [API Documentation](./API_DOCUMENTATION.md)
- 🐛 [GitHub Issues](https://github.com/Huzaifa-12Imran/Student_Portal/issues)

---

## Next: Full Setup

For production deployment and advanced features, see:
- `INSTALLATION.md` - Detailed setup
- `SUPABASE_SETUP.md` - Database setup with RLS
- `BACKEND_SETUP.md` - Architecture documentation

Enjoy building! 🚀
