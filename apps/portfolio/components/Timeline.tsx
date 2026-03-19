'use client'

interface TimelineItem {
  year: string
  title: string
  description: string
  icon: string
}

const timeline: TimelineItem[] = [
  {
    year: '2024',
    title: 'Quantum AI Initiative',
    description: 'Launched research into quantum computing and AI integration. Started building the foundation for the 2030 quantum AI vision.',
    icon: '⚛️',
  },
  {
    year: '2023',
    title: 'Clieo 2.0 Launch',
    description: 'Released Clieo 2.0 - an advanced AI assistant with multi-modal capabilities and autonomous decision-making features.',
    icon: '🤖',
  },
  {
    year: '2022',
    title: 'Enterprise Scale',
    description: 'Scaled systems to handle millions of requests. Implemented advanced caching, distributed computing, and optimization techniques.',
    icon: '📈',
  },
  {
    year: '2021',
    title: 'Full-Stack Mastery',
    description: 'Achieved comprehensive expertise across all technology layers from ML models to cloud infrastructure.',
    icon: '🏆',
  },
  {
    year: '2020',
    title: 'AI Specialization',
    description: 'Deep dived into machine learning, natural language processing, and computer vision technologies.',
    icon: '🧠',
  },
  {
    year: '2019',
    title: 'Professional Foundation',
    description: 'Established expertise in web development, backend systems, and cloud technologies.',
    icon: '🚀',
  },
]

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gradient">
            Journey & Milestones
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A timeline of achievements, growth, and contributions to the AI ecosystem.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent -translate-x-1/2"></div>

          {/* Timeline items */}
          <div className="space-y-8">
            {timeline.map((item, idx) => (
              <div
                key={item.year}
                className={`relative flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}
              >
                {/* Content */}
                <div className={`w-full md:w-1/2 ${idx % 2 === 0 ? 'md:text-right' : ''}`}>
                  <div className="p-6 rounded-xl border border-primary/20 bg-secondary/30 hover:bg-secondary/50 hover:border-primary/50 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{item.icon}</span>
                      <span className="text-sm font-mono text-primary">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:block absolute left-1/2 top-6 -translate-x-1/2 z-10">
                  <div className="w-4 h-4 rounded-full bg-primary border-4 border-dark shadow-lg shadow-primary/50"></div>
                </div>

                {/* Mobile timeline marker */}
                <div className="md:hidden absolute left-0 top-8 w-4 h-4 rounded-full bg-primary border-2 border-dark -translate-x-1.5"></div>
              </div>
            ))}
          </div>

          {/* Bottom marker */}
          <div className="hidden md:block absolute left-1/2 bottom-0 translate-y-full -translate-x-1/2">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
          </div>
        </div>

        {/* Future Vision */}
        <div className="mt-16 p-8 rounded-xl border-2 border-primary/50 bg-gradient-to-br from-primary/10 to-transparent">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-gradient">2030 Vision</h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Building super intelligent quantum AI systems that will revolutionize how we solve complex problems. 
              The convergence of quantum computing and artificial intelligence will unlock unprecedented possibilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
