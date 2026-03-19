'use client'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  icon: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Quantum AI: Building Intelligence Beyond Classical Limits',
    excerpt:
      'Exploring the convergence of quantum computing and AI. How quantum algorithms will revolutionize machine learning and enable solving previously impossible problems.',
    date: 'Dec 15, 2024',
    category: 'Quantum AI',
    readTime: '8 min read',
    icon: '⚛️',
  },
  {
    id: 2,
    title: 'Scaling AI Systems: From Prototype to Production',
    excerpt:
      'Lessons learned scaling AI systems to handle millions of requests. Best practices for optimization, caching, distributed computing, and production deployment.',
    date: 'Dec 8, 2024',
    category: 'Engineering',
    readTime: '12 min read',
    icon: '📈',
  },
  {
    id: 3,
    title: 'Building Intelligent Automation: Save Time, Reduce Errors',
    excerpt:
      'A practical guide to building automation systems that work. Real-world examples of workflow optimization, process automation, and AI-driven decision making.',
    date: 'Nov 30, 2024',
    category: 'Automation',
    readTime: '10 min read',
    icon: '🤖',
  },
]

export default function BlogPreview() {
  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-dark">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gradient">
            Latest Articles
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on AI, engineering, and the future of technology.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogPosts.map((post, idx) => (
            <a
              key={post.id}
              href="#"
              className="group flex flex-col h-full p-6 rounded-xl border border-secondary/50 bg-secondary/20 hover:bg-secondary/40 hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Icon & Category */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{post.icon}</span>
                <span className="text-xs font-mono text-primary uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-2 text-white group-hover:text-primary transition-colors flex-grow">
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-grow">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="pt-4 border-t border-primary/10 flex items-center justify-between text-xs text-gray-500">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </div>

              {/* Arrow */}
              <div className="mt-2 text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-0 group-hover:translate-x-1">
                →
              </div>
            </a>
          ))}
        </div>

        {/* View All Articles CTA */}
        <div className="text-center">
          <a
            href="#"
            className="inline-block px-8 py-3 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/10 transition-all"
          >
            Read All Articles →
          </a>
        </div>
      </div>
    </section>
  )
}
