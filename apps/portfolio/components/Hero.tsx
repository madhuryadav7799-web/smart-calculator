'use client'

export default function Hero() {
  return (
    <section id="home" className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-gradient-dark relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-mono animate-fade-in">
          🚀 Building the Future of AI
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
          <span className="text-gradient">Abhishek Madhur</span>
          <br />
          <span className="text-gray-300">AI Developer & Visionary</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Engineering super intelligent quantum AI by 2030. Specializing in full-stack AI solutions, automation, and innovative technologies that push the boundaries of what's possible.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <a
            href="#projects"
            className="px-8 py-4 rounded-lg bg-primary text-dark font-bold text-lg hover:bg-gradient-cyan hover:shadow-lg hover:glow-cyan transition-all duration-300 transform hover:scale-105"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-lg border-2 border-primary text-primary font-bold text-lg hover:bg-primary/10 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-lg bg-secondary/50 hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-all text-xl"
            title="GitHub"
          >
            💻
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-lg bg-secondary/50 hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-all text-xl"
            title="LinkedIn"
          >
            🔗
          </a>
          <a
            href="mailto:contact@abhishek.dev"
            className="w-12 h-12 rounded-lg bg-secondary/50 hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-all text-xl"
            title="Email"
          >
            ✉️
          </a>
          <a
            href="https://t.me/abhishekmadhur"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-lg bg-secondary/50 hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-all text-xl"
            title="Telegram"
          >
            📱
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}
