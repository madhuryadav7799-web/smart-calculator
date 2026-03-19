'use client'

import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Services from '@/components/Services'
import Timeline from '@/components/Timeline'
import Testimonials from '@/components/Testimonials'
import BlogPreview from '@/components/BlogPreview'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { useState } from 'react'

export default function Home() {
  const [isDark, setIsDark] = useState(true)

  return (
    <main className="min-h-screen bg-dark overflow-x-hidden">
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <Hero />
      <Projects />
      <Skills />
      <Services />
      <Timeline />
      <Testimonials />
      <BlogPreview />
      <Contact />
      <Footer />
    </main>
  )
}
