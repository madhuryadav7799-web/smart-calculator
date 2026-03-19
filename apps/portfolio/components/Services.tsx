'use client'

interface Service {
  icon: string
  title: string
  description: string
  features: string[]
}

const services: Service[] = [
  {
    icon: '🤖',
    title: 'AI & ML Solutions',
    description: 'Custom AI implementations powered by cutting-edge machine learning. From training models to deployment, I build intelligent systems that solve real-world problems.',
    features: ['Custom Model Training', 'LLM Integration', 'AI Automation', 'Real-time Processing'],
  },
  {
    icon: '🚀',
    title: 'Full-Stack Development',
    description: 'End-to-end web and mobile applications built with modern technologies. Scalable, performant, and user-focused solutions from concept to production.',
    features: ['Backend Architecture', 'Frontend UI/UX', 'Database Design', 'API Development'],
  },
  {
    icon: '⚡',
    title: 'Automation & Optimization',
    description: 'Streamline workflows and eliminate manual tasks. I create automation systems that save time, reduce errors, and improve operational efficiency.',
    features: ['Workflow Automation', 'Performance Tuning', 'Process Optimization', 'Integration'],
  },
  {
    icon: '☁️',
    title: 'Cloud & DevOps',
    description: 'Robust cloud infrastructure with CI/CD pipelines. Deploy with confidence using AWS, containerization, and modern deployment strategies.',
    features: ['AWS Architecture', 'Docker & K8s', 'CI/CD Pipelines', 'Monitoring & Logging'],
  },
  {
    icon: '📊',
    title: 'Data Engineering',
    description: 'Large-scale data pipelines and analytics platforms. Transform raw data into actionable insights with efficient ETL processes and data warehousing.',
    features: ['Pipeline Design', 'Data Warehousing', 'Analytics', 'Real-time Streaming'],
  },
  {
    icon: '🔧',
    title: 'Consulting & Advisory',
    description: 'Strategic technology guidance for your projects. I help teams choose the right tech stack, architecture, and best practices.',
    features: ['Tech Strategy', 'Code Review', 'Architecture Design', 'Best Practices'],
  },
]

export default function Services() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gradient">
            Services & Expertise
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Comprehensive solutions tailored to your needs. From AI to cloud infrastructure, I deliver excellence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={service.title}
              className="group p-6 rounded-xl border border-secondary/50 bg-secondary/20 hover:bg-secondary/40 hover:border-primary/50 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Icon */}
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4">
                {service.description}
              </p>

              {/* Features */}
              <div className="space-y-2">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-primary mt-1">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl -z-10"></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 sm:p-12 rounded-xl border border-primary/20 bg-gradient-to-br from-secondary/30 to-secondary/10 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold mb-4">Ready to bring your vision to life?</h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Whether you need AI integration, a complete application, or optimization of existing systems, I'm here to help.
          </p>
          <a
            href="#contact"
            className="inline-block px-8 py-3 rounded-lg bg-primary text-dark font-bold hover:bg-gradient-cyan hover:shadow-lg transition-all"
          >
            Start a Project
          </a>
        </div>
      </div>
    </section>
  )
}
