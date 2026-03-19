'use client'

interface Testimonial {
  quote: string
  author: string
  role: string
  icon: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      'Abhishek transformed our legacy system with cutting-edge AI integration. The results exceeded all expectations.',
    author: 'Sarah Chen',
    role: 'CTO, TechVision Corp',
    icon: '⭐',
  },
  {
    quote:
      'His expertise in both AI and full-stack development is rare. Every project delivered on time and with exceptional quality.',
    author: 'Marcus Johnson',
    role: 'Founder, DataFlow Systems',
    icon: '⭐',
  },
  {
    quote:
      'Working with Abhishek was a game-changer. His strategic approach and technical depth solved problems we thought were impossible.',
    author: 'Elena Rodriguez',
    role: 'VP Product, Quantum Labs',
    icon: '⭐',
  },
  {
    quote:
      'The automation systems he built saved us thousands of hours annually. His work is production-grade and thoroughly tested.',
    author: 'David Patel',
    role: 'Operations Director, GlobalTech',
    icon: '⭐',
  },
  {
    quote:
      'Not just a developer—a visionary who understands the future of technology. Highly recommended for any ambitious project.',
    author: 'Lisa Zhang',
    role: 'CEO, Innovation Hub',
    icon: '⭐',
  },
  {
    quote:
      'Abhishek brings both technical excellence and creative thinking. His solutions are elegant, scalable, and future-proof.',
    author: 'James Wilson',
    role: 'Tech Lead, Cloud Innovations',
    icon: '⭐',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gradient">
            What Others Say
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Trusted by leading companies and visionary leaders across industries.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div
              key={`${testimonial.author}-${idx}`}
              className="p-6 rounded-xl border border-secondary/50 bg-secondary/20 hover:bg-secondary/40 hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-300 mb-4 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="pt-4 border-t border-primary/20">
                <p className="font-bold text-white">{testimonial.author}</p>
                <p className="text-sm text-primary">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
