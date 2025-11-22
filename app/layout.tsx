import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Merriweather } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["300","400","600","700","800"], variable: "--font-sans" })
const merriweather = Merriweather({ subsets: ["latin"], weight: ["300","400","700"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "Student Attendance & Results Portal",
  description: "Integrated platform for attendance management, result monitoring, and stakeholder communication",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
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
    <html lang="en" className={`${plusJakarta.variable} ${merriweather.variable}`}>
      <body className={`antialiased bg-background text-foreground`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
