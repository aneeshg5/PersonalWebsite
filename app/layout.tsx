import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Space_Mono } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Aneesh Ganti · Software Engineer",
  description: "CS & Math student at UIUC building full-stack systems, ML pipelines, and embedded security research. Open to Summer 2027 SWE and ML internships.",
  keywords: ["Aneesh Ganti", "software engineer", "UIUC", "full-stack developer", "machine learning", "AI", "portfolio", "internship"],
  metadataBase: new URL("https://www.aneeshganti.dev"),
  alternates: {
    canonical: "https://www.aneeshganti.dev",
  },
  openGraph: {
    title: "Aneesh Ganti · Software Engineer",
    description: "CS & Math @ UIUC. Building full-stack systems, ML pipelines, and embedded security research.",
    url: "https://www.aneeshganti.dev",
    siteName: "Aneesh Ganti",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Aneesh Ganti · Software Engineer",
    description: "CS & Math @ UIUC. Building full-stack systems, ML pipelines, and embedded security research.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
          rel="stylesheet"
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${spaceMono.variable} font-display`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
