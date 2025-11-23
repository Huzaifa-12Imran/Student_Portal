import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Merriweather } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["300","400","600","700","800"], variable: "--font-sans" })
const merriweather = Merriweather({ subsets: ["latin"], weight: ["300","400","700"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Academix",
  description: "Integrated platform for attendance management, result monitoring, and stakeholder communication",
  generator: "AcademiX",
  icons: {
    icon: [
      {
        url: "/academix-logo.svg",
        type: "image/svg+xml",
      },
      {
        url: "/academix-logo.svg",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${merriweather.variable} dark`} suppressHydrationWarning>
      <body className={`antialiased bg-background text-foreground`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
