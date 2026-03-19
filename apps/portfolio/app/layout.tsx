import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Abhishek Madhur - AI Developer & Quantum AI Visionary',
  description: 'Premium portfolio of Abhishek Madhur. AI developer building super intelligent quantum AI by 2030. Specializing in machine learning, automation, and innovative solutions.',
  keywords: ['AI', 'Developer', 'Quantum AI', 'Machine Learning', 'Full Stack', 'Next.js'],
  authors: [{ name: 'Abhishek Madhur' }],
  creator: 'Abhishek Madhur',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abhishek.dev',
    siteName: 'Abhishek Madhur Portfolio',
    title: 'Abhishek Madhur - AI Developer',
    description: 'Building super intelligent quantum AI by 2030',
    images: [{
      url: 'https://abhishek.dev/og-image.jpg',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhishek Madhur - AI Developer',
    description: 'Quantum AI 2030 Mission',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-dark text-white font-inter selection:bg-primary selection:text-dark">
        {children}
      </body>
    </html>
  )
}
