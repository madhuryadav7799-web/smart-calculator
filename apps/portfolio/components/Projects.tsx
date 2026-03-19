'use client'

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  icon: string
  link: string
  stats: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Clieo 2.0',
    description: 'Next-generation AI assistant powered by advanced language models. Clieo 2.0 serves as both a technical advisor and trusted friend, capable of handling complex AI workflows, autonomous decision-making, and multi-layered reasoning tasks.',
    tags: ['AI', 'LLM', 'Automation', 'Assistant'],
    icon: '🤖',
    link: 'https://github.com/abhishekmadhur',
    stats: 'Production Ready',
  },
  {
    id: 2,
    title: 'YouTube Automation Suite',
    description: 'Intelligent automation framework for content creators. Handles video processing, metadata optimization, scheduling, analytics aggregation, and multi-platform distribution. Reduces content management time by 80%.',
    tags: ['Python', 'API', 'Automation', 'Content Management'],
    icon: '📹',
    link: 'https://github.com/abhishekmadhur',
    stats: '200+ Videos Automated',
  },
  {
    id: 3,
    title: 'Smart Calculator Pro',
    description: 'Advanced computational tool with AI-powered natural language processing. Solves complex mathematical equations, symbolic computations, and provides step-by-step explanations for educational purposes.',
    tags: ['React', 'TypeScript', 'Math.js', 'NLP'],
    icon: '🧮',
    link: 'https://github.com/abhishekmadhur',
    stats: '10K+ Daily Users',
  },
  {
    id: 4,
    title: 'Quantum AI Research Lab',
    description: 'Experimental platform for quantum computing research and AI integration. Exploring quantum algorithms, machine learning on quantum circuits, and hybrid classical-quantum systems.',
    tags: ['Quantum', 'ML', 'Research', 'Innovation'],
    icon: '⚛️',
    link: 'https://github.com/abhishekmadhur',
    stats: 'Ongoing Research',
  },
  {
    id: 5,
    title: 'Data Pipeline Architecture',
    description: 'Enterprise-scale ETL system with real-time processing capabilities. Handles petabytes of data, implements advanced caching, monitoring, and auto-scaling features.',
    tags: ['BigData', 'Python', 'Kafka', 'Cloud'],
    icon: '📊',
    link: 'https://github.com/abhishekmadhur',
    stats: '99.99% Uptime',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-dark">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gradient">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A collection of innovative solutions that demonstrate expertise in AI, automation, and full-stack development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-full p-6 rounded-xl border border-secondary/50 hover:border-primary/50 bg-secondary/20 hover:bg-secondary/40 transition-all duration-300 overflow-hidden">
                {/* Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-5xl mb-4">{project.icon}</div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="mb-4 text-xs font-mono text-primary/80">
                    {project.stats}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono hover:bg-primary/20 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="mt-4 inline-block text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-2">
                    →
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
