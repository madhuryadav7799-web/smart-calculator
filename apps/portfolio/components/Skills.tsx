'use client'

interface Skill {
  category: string
  items: string[]
}

const skillsData: Skill[] = [
  {
    category: 'AI & Machine Learning',
    items: ['TensorFlow', 'PyTorch', 'Transformers', 'LLMs', 'NLP', 'Computer Vision'],
  },
  {
    category: 'Backend Development',
    items: ['Python', 'Node.js', 'TypeScript', 'FastAPI', 'Django', 'PostgreSQL'],
  },
  {
    category: 'Frontend Development',
    items: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript', 'Framer Motion', 'Web3'],
  },
  {
    category: 'DevOps & Cloud',
    items: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD', 'Terraform'],
  },
  {
    category: 'Data & Analytics',
    items: ['BigQuery', 'Pandas', 'Apache Spark', 'Data Engineering', 'ETL', 'Analytics'],
  },
  {
    category: 'Tools & Technologies',
    items: ['Git', 'REST APIs', 'GraphQL', 'Redis', 'Kafka', 'Message Queues'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gradient">
            Technical Skills
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive toolkit of technologies and expertise built over years of hands-on development.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skillGroup, idx) => (
            <div
              key={skillGroup.category}
              className="p-6 rounded-xl border border-primary/20 bg-secondary/30 hover:bg-secondary/50 hover:border-primary/50 transition-all duration-300 group cursor-pointer"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Category Title */}
              <h3 className="text-lg font-bold mb-4 text-primary group-hover:text-white transition-colors flex items-center gap-2">
                <span className="text-2xl">
                  {skillGroup.category === 'AI & Machine Learning' && '🧠'}
                  {skillGroup.category === 'Backend Development' && '⚙️'}
                  {skillGroup.category === 'Frontend Development' && '🎨'}
                  {skillGroup.category === 'DevOps & Cloud' && '☁️'}
                  {skillGroup.category === 'Data & Analytics' && '📊'}
                  {skillGroup.category === 'Tools & Technologies' && '🛠️'}
                </span>
                {skillGroup.category}
              </h3>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-mono hover:bg-primary/20 hover:text-cyan-300 transition-all transform hover:scale-105"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Experience Summary */}
        <div className="mt-16 p-8 rounded-xl border border-primary/20 bg-secondary/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <p className="text-gray-400">Years Experience</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <p className="text-gray-400">Projects Completed</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <p className="text-gray-400">Clients & Teams</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500K+</div>
              <p className="text-gray-400">Users Impacted</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
