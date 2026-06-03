import { Check } from 'lucide-react'

function WhatWeBuilt() {
  const features = [
    'REST API',
    'JWT Authentication',
    'AI Burnout Prediction',
    'Mental Health Monitoring',
    'Daily Assessment',
    'Generative AI Recommendation',
    'Cloud Deployment',
    'Analytics Dashboard',
    'Responsive Design'
  ]

  return (
    <section id="skills" className="pt-10 pb-20 md:pt-16 md:pb-32 bg-slate-50">
      <div className="w-full px-4 md:px-16 lg:px-24">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#006D5B] mb-4">
            Apa yang Kami Bangun
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto">
            Ekosistem lengkap yang siap memberikan dampak.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {features.map(feature => (
            <div
              key={feature}
              className="bg-white border border-slate-100 p-5 rounded-[16px] flex items-center gap-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgb(0,0,0,0.06)] hover:border-emerald-100 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 group-hover:bg-emerald-100 transition-colors">
                <Check size={18} strokeWidth={2.5} />
              </div>
              <span className="text-slate-700 font-semibold text-[15px] leading-tight">{feature}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhatWeBuilt
