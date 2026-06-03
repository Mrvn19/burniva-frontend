import { Code2, Server, Database, Cpu, Globe } from 'lucide-react'

function TechnologyBehind() {
  const technologies = [
    {
      category: 'Frontend',
      icon: Code2,
      stack: ['React', 'Vite', 'Tailwind CSS']
    },
    {
      category: 'Backend',
      icon: Server,
      stack: ['Node.js', 'Express.js', 'JWT Authentication']
    },
    {
      category: 'Database',
      icon: Database,
      stack: ['PostgreSQL', 'Neon DB']
    },
    {
      category: 'AI & Data',
      icon: Cpu,
      stack: ['Machine Learning', 'Gemini AI', 'Python']
    },
    {
      category: 'Deployment',
      icon: Globe,
      stack: ['Vercel', 'Railway']
    }
  ]

  return (
    <section className="py-20 md:py-32 bg-[#006D5B]">
      <div className="w-full px-4 md:px-12 lg:px-16 max-w-[1400px] mx-auto">

        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Teknologi di Balik Burniva
          </h2>
          <p className="text-base text-emerald-100/80 max-w-2xl mx-auto">
            Stack teknologi modern yang menopang sistem kami.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="bg-white/5 rounded-[24px] p-6 lg:p-8 flex flex-col items-start text-left hover:bg-white/10 transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-300 mb-8">
                <tech.icon size={20} strokeWidth={2.5} />
              </div>
              <h4 className="text-white font-bold text-[17px] mb-5">{tech.category}</h4>
              <ul className="flex flex-col gap-3.5 w-full">
                {tech.stack.map(item => (
                  <li key={item} className="text-emerald-50/80 text-[13px] flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default TechnologyBehind
