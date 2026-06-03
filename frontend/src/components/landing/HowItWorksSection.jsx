import { ClipboardList, Cpu, Lightbulb, ListChecks } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Isi Check Harian',
    description: 'Jawab beberapa pertanyaan sederhana mengenai kondisi mental, aktivitas akademik, dan gaya hidupmu hari ini.',
    icon: ClipboardList
  },
  {
    number: '02',
    title: 'AI Menganalisis Kondisi',
    description: 'AI Burniva memproses data harianmu untuk mendeteksi tingkat burnout dan memahami pola mentalmu.',
    icon: Cpu
  },
  {
    number: '03',
    title: 'Dapatkan Insight Personal',
    description: 'Burniva memberikan hasil analisis yang mudah dipahami mengenai kondisi burnout dan kesehatan mentalmu.',
    icon: Lightbulb
  },
  {
    number: '04',
    title: 'Terima Recovery To-Do AI',
    description: 'Gemini AI menghasilkan rekomendasi aktivitas harian yang dipersonalisasi untuk membantu pemulihan mental.',
    icon: ListChecks
  },
]

function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="py-14 md:py-24 bg-[#FAFAFA] relative overflow-hidden">
      <div className="w-full px-4 md:px-16 lg:px-24">

        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <p className="inline-block bg-primary-100 text-primary-600 text-xs md:text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Cara Kerja
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">
            Cara Kerja Burniva
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Hanya butuh beberapa langkah sederhana untuk memahami kondisi mentalmu setiap hari.
          </p>
        </div>

        {/* Grid Steps */}
        <div className="relative">
          
          {/* Connecting Line (Desktop Only) */}
          <div className="hidden lg:block absolute top-1/4 left-[12%] right-[12%] h-[1px] bg-slate-200 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
            {steps.map(({ number, title, description, icon: Icon }, index) => (
              <div 
                key={number} 
                className="bg-white p-6 md:p-8 rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] hover:-translate-y-2 transition-all duration-500 group flex flex-col"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Top: Icon & Number */}
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 bg-primary-700 text-white rounded-[20px] flex items-center justify-center shadow-[0_8px_16px_rgba(20,83,45,0.3)] group-hover:shadow-[0_12px_24px_rgba(20,83,45,0.5)] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                    <Icon size={24} />
                  </div>
                  <span className="text-4xl font-bold text-slate-100 group-hover:text-primary-100 transition-colors duration-300">
                    {number}
                  </span>
                </div>
                
                {/* Bottom: Text */}
                <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-primary-700 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}

export default HowItWorksSection