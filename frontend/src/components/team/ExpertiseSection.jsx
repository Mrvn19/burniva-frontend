import { Code2, Brain, LineChart } from 'lucide-react'

function ExpertiseSection() {
  const expertises = [
    {
      title: 'Front End & Back End Development',
      description: 'Responsible for frontend, backend, REST API, authentication, database integration, deployment, and full system development.',
      team: ['Mohammad Hafiz Naufal', 'Al Farizie'],
      icon: Code2
    },
    {
      title: 'Artificial Intelligence',
      description: 'Responsible for machine learning model development, burnout prediction system, inference, TensorFlow implementation, and AI integration.',
      team: ['Hafizh Umar Haq', 'Khalisah Hasna Naila Shifa'],
      icon: Brain
    },
    {
      title: 'Data Science & Analytics',
      description: 'Responsible for data collection, wrangling, EDA, feature engineering, and analytical insights.',
      team: ['Rieftian Havil Syawalludy', 'Rezha Dwi Cahya Ardinata'],
      icon: LineChart
    }
  ]

  return (
    <section id="expertise" className="py-20 md:py-32 bg-[#006D5B]">
      <div className="w-full px-4 md:px-16 lg:px-24">

        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Keahlian Kami
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto">
            Sinergi tiga pilar keilmuan utama yang membangun ekosistem cerdas Burniva.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {expertises.map((exp, index) => (
            <div
              key={index}
              className="bg-white/5 rounded-[32px] p-8 hover:-translate-y-2 hover:bg-white/10 transition-all duration-300 flex flex-col"
            >
              <div className="w-14 h-14 bg-black/20 rounded-2xl flex items-center justify-center text-[#34d399] mb-8 shadow-sm">
                <exp.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 leading-snug">
                {exp.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-10 flex-1">
                {exp.description}
              </p>

              <div className="mt-auto">
                <p className="text-[#34d399] text-[11px] font-bold uppercase tracking-wider mb-4">
                  TEAM MEMBERS
                </p>
                <ul className="space-y-3">
                  {exp.team.map((member, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-white/80 font-medium">
                      <span className="w-1 h-1 rounded-full bg-[#34d399] mt-[8px] shrink-0 opacity-80"></span>
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ExpertiseSection
