# Installation & Setup Guide

## Prerequisites

- Node.js 18.x or higher
- npm or pnpm package manager
- Git
- Supabase account (free tier available)

## Step 1: Clone Repository

```bash
git clone https://github.com/Huzaifa-12Imran/Student_Portal.git
cd student-attendance-portal
```

## Step 2: Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

## Step 3: Supabase Setup

### Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
   - Organization: Select or create
   - Project Name: `student-attendance-portal`
   - Database Password: Create a strong password
   - Region: Choose nearest to your users
5. Wait for project initialization (~2-3 minutes)

### Get API Keys

1. Go to **Project Settings** → **API**
2. Under "Project API keys":
   - Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Set Environment Variables

1. Create `.env.local` file in project root:

```bash
cp .env.local.example .env.local
```

2. Fill in your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
```

## Step 4: Database Setup

### Method 1: Using SQL Editor (Easiest)

1. Go to Supabase Dashboard
2. Click **SQL Editor** in left sidebar
3. Click **New Query**
4. Copy and paste the SQL from `SUPABASE_SETUP.md` in sections
5. Click **Run** for each section

The order is important:
1. Create `users` table first
2. Create `courses` table
3. Create `enrollments` table
4. Create `attendance` table
5. Create `grades` table
6. Enable RLS and create policies

### Method 2: Using Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

## Step 5: Configure Authentication

1. Go to **Authentication** → **Providers** in Supabase Dashboard
2. Email/Password should be enabled by default
3. Go to **Authentication** → **URL Configuration**
4. Set Redirect URLs:
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/dashboard`

## Step 6: Run Development Server

```bash
pnpm dev
```

Application will be available at `http://localhost:3000`

## Step 7: Create Test Users

### Option 1: Via Application UI
1. Go to `http://localhost:3000`
2. Click "Sign Up"
3. Fill in details:
   - Email: `student@test.com`
   - Password: `Test@123456`
   - Full Name: `Test Student`
   - Role: `Student`
   - Department: `Computer Science`
4. Click "Sign Up"

### Option 2: Via Supabase Dashboard
1. Go to **Authentication** → **Users**
2. Click **Add User**
3. Enter email and password
4. Click **Create User**

## Step 8: Verify Setup

1. Sign in with created user
2. You should see the dashboard
3. Check browser console for any errors
4. Try recording attendance or grades

## Common Issues

### Error: Missing Supabase Credentials
**Solution**: Ensure `.env.local` has correct URL and key. No typos or extra spaces.

### Error: 401 Unauthorized
**Solution**: 
- Check API key is valid
- Verify RLS policies are created correctly
- Check user session in browser DevTools

### Error: CORS Error
**Solution**:
- This shouldn't happen with Supabase's CORS configuration
- Check that Supabase project is active
- Verify request headers are correct

### Database Tables Not Found
**Solution**:
- Run SQL scripts from SUPABASE_SETUP.md again
- Verify all CREATE TABLE statements executed successfully
- Check table names match exactly (case-sensitive)

### RLS Policy Errors
**Solution**:
- Verify auth.uid() returns a valid user ID
- Check policy conditions match your use case
- Test policies in Supabase Dashboard

## Production Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Click Deploy

### Configure Supabase for Production

1. Update Redirect URLs in Supabase:
   - Site URL: `https://your-domain.com`
   - Redirect URLs: `https://your-domain.com/dashboard`

2. Enable HTTPS
3. Set up custom domain (optional)
4. Configure backups and monitoring

## Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Project Structure

```
student-attendance-portal/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Login/home page
├── components/            # React components
│   ├── attendance-*.tsx   # Attendance components
│   ├── grade-*.tsx        # Grade components
│   ├── auth-*.tsx         # Auth components
│   └── ui/                # UI components (Radix UI)
├── lib/                   # Utility functions
│   ├── supabase.ts        # Supabase client
│   ├── auth-context.tsx   # Auth context provider
│   ├── api-client.ts      # API client
│   └── hooks/             # Custom hooks
├── public/                # Static assets
├── .env.local.example     # Environment variables template
└── SUPABASE_SETUP.md      # Supabase setup guide
```

## Support & Documentation

- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Radix UI Docs](https://www.radix-ui.com/docs/primitives/overview/introduction)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## License

This project is open source under the MIT License.
