import { Sparkles } from 'lucide-react'
import logoImg from '../../assets/icons/Logo.svg'

function WhyBuiltSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-slate-50 border-y border-slate-100">
      <div className="w-full px-4 md:px-16 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center max-w-6xl mx-auto">

          {/* Kiri: Logo Card */}
          <div className="order-2 lg:order-1 w-full flex justify-center lg:justify-end">
            <div className="bg-white rounded-[32px] p-12 md:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100/50 flex items-center justify-center w-full max-w-md aspect-[4/3]">
              <img src={logoImg} alt="Burniva Logo" className="w-40 md:w-52 h-auto" />
            </div>
          </div>

          {/* Kanan: Teks */}
          <div className="order-1 lg:order-2 flex flex-col items-start text-left max-w-lg mx-auto lg:mx-0">
            <div className="flex items-center gap-2 text-[#006D5B] text-xs font-bold tracking-wider uppercase mb-3">
              <Sparkles size={16} />
              ACADEMIC INNOVATION
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#006D5B] mb-4">
              Mengapa Kami Membangun Burniva
            </h2>

            <div className="w-16 h-1 bg-[#006D5B] mb-8 rounded-full"></div>

            <p className="text-base text-slate-500 leading-relaxed">
              Burniva hadir sebagai bentuk kepedulian terhadap meningkatnya tingkat burnout pada mahasiswa akibat tekanan akademik, sosial, maupun personal. Kami percaya bahwa kolaborasi multidisiplin antara rekayasa perangkat lunak, sains data, dan kecerdasan buatan dapat menciptakan solusi preventif yang berdampak nyata.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default WhyBuiltSection
