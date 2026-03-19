'use client'

const currentYear = new Date().getFullYear()

export default function Footer() {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    { icon: '💻', label: 'GitHub', href: 'https://github.com/abhishekmadhur' },
    { icon: '🔗', label: 'LinkedIn', href: 'https://linkedin.com/in/abhishekmadhur' },
    { icon: '📱', label: 'Telegram', href: 'https://t.me/abhishekmadhur' },
    { icon: '✉️', label: 'Email', href: 'mailto:contact@abhishek.dev' },
  ]

  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-dark border-t border-primary/10">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-3">AM.</h3>
            <p className="text-gray-400 text-sm">
              Building intelligent systems and pushing the boundaries of what's possible with AI.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold mb-4 text-white">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>AI & ML Solutions</li>
              <li>Full-Stack Development</li>
              <li>Cloud Architecture</li>
              <li>Automation & Optimization</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary/50 hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-all text-lg"
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary/10 py-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>
            © {currentYear} Abhishek Madhur. All rights reserved. Building towards Quantum AI 2030.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

        {/* Made with */}
        <div className="mt-8 text-center text-xs text-gray-500">
          Built with Next.js 14 • Tailwind CSS • TypeScript • Deployed on the edge
        </div>
      </div>
    </footer>
  )
}
