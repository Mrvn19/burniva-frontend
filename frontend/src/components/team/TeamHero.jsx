import { Brain, Bot, LineChart, GraduationCap } from 'lucide-react'

function TeamHero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 bg-[#006D5B] overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full px-4 md:px-16 lg:px-24 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Tim Pengembang <br className="hidden md:block" /> Project <span className="text-[#00FFA2]">Burniva</span>
          </h1>
          <p className="text-base md:text-xl text-[#F6FAF9]/90 leading-relaxed max-w-3xl mx-auto mb-16">
            Burniva dikembangkan oleh tim multidisiplin yang terdiri dari Full Stack Developer, Data Scientist, dan AI Engineer untuk membantu mahasiswa memahami kondisi mental, mendeteksi burnout sejak dini, serta membangun kebiasaan hidup yang lebih sehat melalui teknologi dan kecerdasan buatan.
          </p>

          {/* Info Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-[24px] p-8 md:p-10 border border-white/10 shadow-lg text-left flex flex-col md:flex-row gap-10 md:gap-16 items-center">

            {/* Kiri */}
            <div className="flex-1">
              <h3 className="text-2xl md:text-[26px] font-bold text-white mb-8 leading-snug">
                Sistem Monitoring dan Deteksi Dini Risiko Burnout pada Mahasiswa Berbasis Data Harian
              </h3>

              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-white/50 text-[11px] font-bold uppercase tracking-wider mb-2">Capstone ID</p>
                  <div className="bg-black/20 text-white/90 text-sm font-medium px-4 py-2 rounded-[8px] inline-block shadow-inner">
                    CC26-PSU199
                  </div>
                </div>
                <div>
                  <p className="text-white/50 text-[11px] font-bold uppercase tracking-wider mb-2">Theme</p>
                  <div className="bg-white/10 text-white/90 text-sm font-medium px-4 py-2 rounded-[8px] inline-block">
                    Healthy Lives & Well-being
                  </div>
                </div>
              </div>
            </div>

            {/* Kanan */}
            <div className="w-full md:w-[55%] grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-2xl flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#4A729A] flex items-center justify-center text-white/90 shadow-sm">
                  <Brain size={20} />
                </div>
                <span className="text-white/90 font-medium text-[15px]">Mental Health</span>
              </div>

              <div className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-2xl flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#26A67C] flex items-center justify-center text-white/90 shadow-sm">
                  <Bot size={20} />
                </div>
                <span className="text-white/90 font-medium text-[15px]">AI Powered</span>
              </div>

              <div className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-2xl flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#3488A6] flex items-center justify-center text-white/90 shadow-sm">
                  <LineChart size={20} />
                </div>
                <span className="text-white/90 font-medium text-[15px]">Data Analytics</span>
              </div>

              <div className="bg-white/5 hover:bg-white/10 transition-colors p-4 rounded-2xl flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#6B6197] flex items-center justify-center text-white/90 shadow-sm">
                  <GraduationCap size={20} />
                </div>
                <span className="text-white/90 font-medium text-[15px]">Student Focus</span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamHero
