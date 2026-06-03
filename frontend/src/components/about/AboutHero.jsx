import { ShieldCheck } from 'lucide-react'
import mockupImage from '../../assets/illustrations/mockup.svg'

function AboutHero() {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-br from-white to-[#EAF7F3] overflow-hidden relative">
      <div className="w-full px-4 md:px-12 lg:px-16 max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Kiri: Teks */}
          <div className="w-full lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#006D5B]/20 text-[#006D5B] text-sm font-semibold mb-6 shadow-sm">
              <ShieldCheck size={16} />
              TENTANG BURNIVA
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0F172A] leading-[1.15] mb-6">
              Membantu Mahasiswa Mengenali Risiko <span className="text-[#006D5B]">Burnout</span> Sejak Dini
            </h1>

            <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-xl">
              Mengenal lebih dekat platform kesehatan mental berbasis AI yang membantu mahasiswa memantau kondisi diri dan mendeteksi risiko burnout sejak dini.
            </p>
          </div>

          {/* Kanan: Mockup Placeholder */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto lg:mr-0">
              {/* Dekorasi blur di belakang */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#006D5B]/10 blur-[80px] rounded-full z-0"></div>

              {/* Gambar Mockup */}
              <img
                src={mockupImage}
                alt="Mockup Burniva"
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default AboutHero
