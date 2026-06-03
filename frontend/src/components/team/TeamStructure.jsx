import { Code2, LineChart, Bot } from 'lucide-react'

function TeamStructure() {
  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="w-full px-4 md:px-16 lg:px-24">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#006D5B] mb-4">
            Struktur Tim
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto">
            Alur kolaborasi multidisiplin kami.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-center gap-6 lg:gap-8 relative max-w-6xl mx-auto">

          {/* Garis Penghubung (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-10 right-10 -translate-y-1/2 h-2 bg-[#006D5B] z-0"></div>

          {/* Kotak 1: Full Stack */}
          <div className="relative z-10 w-full lg:flex-1">
            <div className="bg-white border-2 border-slate-200 rounded-2xl px-6 py-8 shadow-sm flex flex-col items-center text-center h-full">
              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Code2 size={16} />
                <span>Full Stack Web Developer</span>
              </div>
              <p className="text-[#006D5B] font-semibold text-[15px] mb-3">Mohammad Hafiz Naufal</p>
              <p className="text-[#006D5B] font-semibold text-[15px]">Al Farizie</p>
            </div>
          </div>

          {/* Kotak 2: Data Science */}
          <div className="relative z-10 w-full lg:flex-1">
            <div className="bg-white border-2 border-blue-100 rounded-2xl px-6 py-8 shadow-sm flex flex-col items-center text-center h-full">
              <div className="flex items-center justify-center gap-2 text-blue-500 text-xs font-bold uppercase tracking-wider mb-6">
                <LineChart size={16} />
                <span>Data Scientist Team</span>
              </div>
              <p className="text-[#006D5B] font-semibold text-[15px] mb-3">Rieftian Havil Syawalludy</p>
              <p className="text-[#006D5B] font-semibold text-[15px]">Rezha Dwi Cahya Ardinata</p>
            </div>
          </div>

          {/* Kotak 3: AI Engineer */}
          <div className="relative z-10 w-full lg:flex-1">
            <div className="bg-white border-2 border-emerald-100 rounded-2xl px-6 py-8 shadow-sm flex flex-col items-center text-center h-full">
              <div className="flex items-center justify-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-wider mb-6">
                <Bot size={16} />
                <span>AI Engineer Team</span>
              </div>
              <p className="text-[#006D5B] font-semibold text-[15px] mb-3">Hafizh Umar Haq</p>
              <p className="text-[#006D5B] font-semibold text-[15px]">Khalisah Hasna Naila Shifa</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default TeamStructure
