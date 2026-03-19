'use client'

import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate form submission
      // In production, this would send to a backend or email service
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setLoading(false)
    }
  }

  const contactMethods = [
    {
      icon: '✉️',
      label: 'Email',
      value: 'contact@abhishek.dev',
      href: 'mailto:contact@abhishek.dev',
    },
    {
      icon: '📱',
      label: 'Telegram',
      value: '@abhishekmadhur',
      href: 'https://t.me/abhishekmadhur',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'in/abhishekmadhur',
      href: 'https://linkedin.com/in/abhishekmadhur',
    },
    {
      icon: '💻',
      label: 'GitHub',
      value: '@abhishekmadhur',
      href: 'https://github.com/abhishekmadhur',
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gradient">
            Let's Connect
          </h2>
          <p className="text-gray-400 text-lg">
            Have a project in mind? Let's discuss how I can help bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="space-y-4">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl border border-secondary/50 bg-secondary/20 hover:bg-secondary/40 hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <p className="text-sm text-gray-500 group-hover:text-primary transition-colors">
                      {method.label}
                    </p>
                    <p className="font-mono text-primary group-hover:text-cyan-300 text-sm">
                      {method.value}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
            {/* Success Message */}
            {submitted && (
              <div className="p-4 rounded-lg bg-primary/20 border border-primary/50 text-primary text-center animate-fade-in">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-secondary/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all text-white placeholder-gray-500"
                placeholder="John Doe"
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-secondary/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all text-white placeholder-gray-500"
                placeholder="john@example.com"
              />
            </div>

            {/* Subject Input */}
            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-secondary/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all text-white placeholder-gray-500"
                placeholder="Project inquiry"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-secondary/30 border border-secondary/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all text-white placeholder-gray-500 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 rounded-lg bg-primary text-dark font-bold hover:bg-gradient-cyan hover:shadow-lg hover:glow-cyan transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-16 p-8 rounded-xl border border-primary/20 bg-secondary/30 text-center">
          <h3 className="text-xl font-bold mb-3">Response Time</h3>
          <p className="text-gray-400">
            I typically respond to inquiries within 24 hours. For urgent matters, reach out via Telegram or LinkedIn.
          </p>
        </div>
      </div>
    </section>
  )
}
