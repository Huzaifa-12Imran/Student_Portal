# Student Attendance Portal

A modern, full-featured student attendance management system built with Next.js and React. The portal provides separate dashboards for students, teachers, and administrators with real-time attendance tracking, grade management, and comprehensive analytics.

## Features

### Student Dashboard
- View personal attendance records
- Track academic grades and performance
- Access class schedules
- Monitor attendance percentage

### Teacher Dashboard
- Mark student attendance
- Upload and manage grades
- View class performance analytics
- Generate attendance reports
- Track class statistics

### Admin Dashboard
- System-wide analytics and reporting
- Student and teacher management
- Attendance monitoring across all classes
- Performance metrics and insights
- System configuration and settings

## Tech Stack

- **Frontend Framework**: Next.js 16.0.3
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Type Safety**: TypeScript

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Huzaifa-12Imran/Student_Portal.git
   cd Student_Portal
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```
   Or if using npm:
   ```bash
   npm install
   ```

## Getting Started

### Development Server

Start the development server:
```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

Build for production:
```bash
pnpm build
```

Start the production server:
```bash
pnpm start
```

## Project Structure

```
student-attendance-portal/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main entry point
│   └── globals.css         # Global styles
├── components/
│   ├── admin/              # Admin-specific components
│   ├── student/            # Student-specific components
│   ├── teacher/            # Teacher-specific components
│   ├── ui/                 # Reusable UI components
│   ├── modern-login.tsx    # Login portal
│   └── *-dashboard.tsx     # Dashboard components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── public/                 # Static assets
├── styles/                 # Global styles and design tokens
└── next.config.mjs         # Next.js configuration
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |
| `pnpm remove-comments` | Remove comments from source code |

## Usage

### Login
The portal features a modern login system with role-based access:
1. Open the application
2. Select your role (Student, Teacher, or Admin)
3. Enter your name and email
4. Click login to access your dashboard

### Student Portal
- View your attendance record
- Check your grades
- See class schedules
- Monitor your performance metrics

### Teacher Portal
- Mark attendance for classes
- Upload and manage student grades
- View class performance statistics
- Generate attendance reports

### Admin Portal
- Access system-wide analytics
- Manage student and teacher accounts
- Monitor overall attendance trends
- View performance metrics across all classes

## Configuration

### Environment Variables
Create a `.env.local` file if needed for any environment-specific configurations.

### Styling
The project uses Tailwind CSS with custom design tokens. Modify styles in:
- `styles/globals.css` - Global styles
- `styles/design-tokens.css` - Design tokens and theme variables

## License

This project is private. For licensing information, please contact the project maintainer.

## Support

For issues or questions, please open an issue on the GitHub repository.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ by Ibrahim Asif, Muhammad Ahmad, Huzaifa Imran.
