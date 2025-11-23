# Supabase Setup Guide

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier available at https://supabase.com)
- pnpm or npm package manager

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Select your organization and enter a project name
4. Create a secure password
5. Select a region closest to your users
6. Wait for the project to be provisioned

## Step 2: Get Your API Keys

1. Go to Project Settings → API
2. Copy your **Project URL** and **Anon Key**
3. These are your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 3: Set Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Fill in your Supabase credentials in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   ```

## Step 4: Create Database Tables

Go to your Supabase project's SQL Editor and run the following SQL to create all required tables:

```sql
-- Option A: users table as local profile table linked to auth.users by id (no FK to avoid create-order errors)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID UNIQUE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
  department TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- If you truly want to enforce that users.id equals auth.users.id, use Option B instead:
-- CREATE TABLE IF NOT EXISTS public.users (
--   id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
--   email TEXT UNIQUE NOT NULL,
--   full_name TEXT NOT NULL,
--   role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
--   department TEXT,
--   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
--   updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );

CREATE INDEX IF NOT EXISTS users_role_idx ON public.users(role);

---- COURSES
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(10) UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  teacher_id UUID NOT NULL,
  semester INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key constraint for courses
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'courses' AND constraint_name = 'courses_teacher_fk'
  ) THEN
    ALTER TABLE public.courses
      ADD CONSTRAINT courses_teacher_fk FOREIGN KEY (teacher_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS courses_teacher_id_idx ON public.courses(teacher_id);
CREATE INDEX IF NOT EXISTS courses_semester_idx ON public.courses(semester);

---- ENROLLMENTS
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL,
  course_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, course_id)
);

-- Add foreign key constraints for enrollments
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'enrollments' AND constraint_name = 'enrollments_student_fk'
  ) THEN
    ALTER TABLE public.enrollments
      ADD CONSTRAINT enrollments_student_fk FOREIGN KEY (student_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'enrollments' AND constraint_name = 'enrollments_course_fk'
  ) THEN
    ALTER TABLE public.enrollments
      ADD CONSTRAINT enrollments_course_fk FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS enrollments_student_id_idx ON public.enrollments(student_id);
CREATE INDEX IF NOT EXISTS enrollments_course_id_idx ON public.enrollments(course_id);

---- ATTENDANCE
CREATE TABLE IF NOT EXISTS public.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL,
  course_id UUID NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(10) NOT NULL CHECK (status IN ('present', 'absent', 'late')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, course_id, date)
);

-- Add foreign key constraints for attendance
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'attendance' AND constraint_name = 'attendance_student_fk'
  ) THEN
    ALTER TABLE public.attendance
      ADD CONSTRAINT attendance_student_fk FOREIGN KEY (student_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'attendance' AND constraint_name = 'attendance_course_fk'
  ) THEN
    ALTER TABLE public.attendance
      ADD CONSTRAINT attendance_course_fk FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS attendance_student_id_idx ON public.attendance(student_id);
CREATE INDEX IF NOT EXISTS attendance_course_id_idx ON public.attendance(course_id);
CREATE INDEX IF NOT EXISTS attendance_date_idx ON public.attendance(date);

---- GRADES
CREATE TABLE IF NOT EXISTS public.grades (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID NOT NULL,
  course_id UUID NOT NULL,
  marks NUMERIC(5,2) NOT NULL,
  total_marks NUMERIC(5,2) NOT NULL,
  percentage NUMERIC(5,2) GENERATED ALWAYS AS (CASE WHEN total_marks = 0 THEN 0 ELSE (marks / total_marks) * 100 END) STORED,
  grade VARCHAR(2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(student_id, course_id)
);

-- Add foreign key constraints for grades
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'grades' AND constraint_name = 'grades_student_fk'
  ) THEN
    ALTER TABLE public.grades
      ADD CONSTRAINT grades_student_fk FOREIGN KEY (student_id) REFERENCES public.users(id) ON DELETE CASCADE;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE table_name = 'grades' AND constraint_name = 'grades_course_fk'
  ) THEN
    ALTER TABLE public.grades
      ADD CONSTRAINT grades_course_fk FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS grades_student_id_idx ON public.grades(student_id);
CREATE INDEX IF NOT EXISTS grades_course_id_idx ON public.grades(course_id);
```

## Step 5: Set Up Row Level Security (RLS)

Enable RLS on all tables and create policies:

```sql
-- Enable RLS on all tables
ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.grades ENABLE ROW LEVEL SECURITY;

-- ===== USERS TABLE POLICIES =====
CREATE POLICY IF NOT EXISTS users_insert_own ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id OR auth.uid() = auth_user_id);

CREATE POLICY IF NOT EXISTS users_select_own_or_admin ON public.users
  FOR SELECT USING (
    auth.uid() = id
    OR EXISTS (
      SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'
    )
  );

CREATE POLICY IF NOT EXISTS users_update_own ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- ===== COURSES TABLE POLICIES =====
CREATE POLICY IF NOT EXISTS courses_teachers_insert ON public.courses
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'teacher')
    AND auth.uid() = teacher_id
  );

CREATE POLICY IF NOT EXISTS courses_select_authenticated ON public.courses
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY IF NOT EXISTS courses_update_teacher ON public.courses
  FOR UPDATE USING (auth.uid() = teacher_id);

CREATE POLICY IF NOT EXISTS courses_delete_teacher ON public.courses
  FOR DELETE USING (auth.uid() = teacher_id);

-- ===== ENROLLMENTS TABLE POLICIES =====
CREATE POLICY IF NOT EXISTS enrollments_insert_by_staff ON public.enrollments
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role IN ('teacher','admin'))
  );

CREATE POLICY IF NOT EXISTS enrollments_select_role ON public.enrollments
  FOR SELECT USING (
    auth.uid() = student_id
    OR course_id IN (SELECT id FROM public.courses WHERE teacher_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

CREATE POLICY IF NOT EXISTS enrollments_delete_by_staff ON public.enrollments
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role IN ('teacher','admin'))
  );

-- ===== ATTENDANCE TABLE POLICIES =====
CREATE POLICY IF NOT EXISTS attendance_insert_by_teacher ON public.attendance
  FOR INSERT WITH CHECK (
    course_id IN (SELECT id FROM public.courses WHERE teacher_id = auth.uid())
  );

CREATE POLICY IF NOT EXISTS attendance_select_role ON public.attendance
  FOR SELECT USING (
    auth.uid() = student_id
    OR course_id IN (SELECT id FROM public.courses WHERE teacher_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

CREATE POLICY IF NOT EXISTS attendance_update_by_teacher ON public.attendance
  FOR UPDATE USING (
    course_id IN (SELECT id FROM public.courses WHERE teacher_id = auth.uid())
  );

CREATE POLICY IF NOT EXISTS attendance_delete_by_teacher ON public.attendance
  FOR DELETE USING (
    course_id IN (SELECT id FROM public.courses WHERE teacher_id = auth.uid())
  );

-- ===== GRADES TABLE POLICIES =====
CREATE POLICY IF NOT EXISTS grades_insert_by_teacher ON public.grades
  FOR INSERT WITH CHECK (
    course_id IN (SELECT id FROM public.courses WHERE teacher_id = auth.uid())
  );

CREATE POLICY IF NOT EXISTS grades_select_role ON public.grades
  FOR SELECT USING (
    auth.uid() = student_id
    OR course_id IN (SELECT id FROM public.courses WHERE teacher_id = auth.uid())
    OR EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin')
  );

CREATE POLICY IF NOT EXISTS grades_update_by_teacher ON public.grades
  FOR UPDATE USING (
    course_id IN (SELECT id FROM public.courses WHERE teacher_id = auth.uid())
  );

CREATE POLICY IF NOT EXISTS grades_delete_by_teacher ON public.grades
  FOR DELETE USING (
    course_id IN (SELECT id FROM public.courses WHERE teacher_id = auth.uid())
  );

-- ===== HELPER FUNCTIONS & TRIGGERS =====
-- Function to keep updated_at current on UPDATE
CREATE OR REPLACE FUNCTION public.set_timestamp()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Attach trigger to tables that have updated_at
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON c.relnamespace = n.oid WHERE c.relname = 'users' AND n.nspname = 'public') THEN
    CREATE TRIGGER IF NOT EXISTS users_set_timestamp BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.set_timestamp();
  END IF;
  IF EXISTS (SELECT 1 FROM pg_class c JOIN pg_namespace n ON c.relnamespace = n.oid WHERE c.relname = 'grades' AND n.nspname = 'public') THEN
    CREATE TRIGGER IF NOT EXISTS grades_set_timestamp BEFORE UPDATE ON public.grades FOR EACH ROW EXECUTE FUNCTION public.set_timestamp();
  END IF;
END;
$$;
```

## Step 6: Install Dependencies

```bash
pnpm install
```

Or with npm:
```bash
npm install
```

## Step 7: Run Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

## Step 8: Create Test User

You can create users through the authentication UI in your app, or directly in Supabase:

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User"
3. Enter email and password
4. User will be created in the auth.users table

## API Endpoints

The following API endpoints are available:

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - Sign in user
- `POST /api/auth/signout` - Sign out user

### User Management
- `GET /api/users/profile?userId=<id>` - Get user profile
- `PATCH /api/users/profile` - Update user profile

### Courses
- `GET /api/courses?teacherId=<id>` - Get courses
- `POST /api/courses` - Create course

### Attendance
- `GET /api/attendance?studentId=<id>&courseId=<id>` - Get attendance records
- `POST /api/attendance` - Record attendance
- `PATCH /api/attendance` - Update attendance record

### Grades
- `GET /api/grades?studentId=<id>&courseId=<id>` - Get grades
- `POST /api/grades` - Record grade
- `PATCH /api/grades` - Update grade

## Environment Variables

Required environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

These are safe to commit (prefixed with `NEXT_PUBLIC_`), but never commit your service role key.

## Troubleshooting

### Connection Error
- Verify your `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check that your `NEXT_PUBLIC_SUPABASE_ANON_KEY` is valid
- Ensure the Supabase project is active

### Authentication Error
- Check RLS policies are correctly set up
- Verify the user exists in the auth.users table
- Check browser console for detailed error messages

### Database Error
- Ensure all tables are created with the SQL scripts above
- Check that RLS policies are enabled
- Verify foreign key constraints

## Next Steps

1. Update dashboard components to fetch real data from Supabase
2. Implement image uploads for user profiles
3. Add email notifications
4. Set up automated backups
5. Configure SSL/TLS for production
