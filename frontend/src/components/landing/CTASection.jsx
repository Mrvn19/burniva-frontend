import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'
import { ArrowRight, Sparkles } from 'lucide-react'

function CTASection() {
  const navigate = useNavigate()

  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="w-full px-4 md:px-16 lg:px-24">
        <div className="relative bg-gradient-to-br from-[#0F4A3F] via-[#115E4C] to-[#1F866C] rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl px-6 md:px-10 py-12 md:py-16 text-center">
          
          {/* Efek Cahaya / Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full bg-white opacity-[0.03] blur-[100px] pointer-events-none"></div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white/90 text-[10px] md:text-xs font-medium mb-6 md:mb-8 backdrop-blur-md">
            <Sparkles size={12} className="opacity-80" />
            Mulai hari ini
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-4xl lg:text-[42px] font-bold text-white mb-4 md:mb-6 leading-tight max-w-3xl mx-auto">
            Jangan Tunggu Burnout Menjadi Lebih Buruk
          </h2>

          {/* Subheading */}
          <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-8 md:mb-10 font-medium">
            Mulai pahami kondisi mentalmu hari ini dan bangun kebiasaan yang lebih sehat bersama Burniva.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 md:mb-8">
            <button
              onClick={() => navigate(ROUTES.REGISTER)}
              className="inline-flex items-center justify-center gap-2 h-11 md:h-12 px-6 md:px-8 bg-white text-primary-800 text-sm font-bold rounded-full hover:bg-slate-50 active:scale-95 transition-all w-full sm:w-auto shadow-[0_8px_20px_rgba(255,255,255,0.2)]"
            >
              Mulai Cek Harian Sekarang <ArrowRight size={16} />
            </button>
            <button
              onClick={() => document.getElementById('cara-kerja')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center h-11 md:h-12 px-6 md:px-8 bg-black/15 text-white text-sm font-semibold rounded-full hover:bg-black/25 active:scale-95 transition-all w-full sm:w-auto"
            >
              Pelajari Lebih Lanjut
            </button>
          </div>

          {/* Guarantee / Footer Notes */}
          <p className="text-[10px] md:text-xs text-white/60 font-medium">
            Gratis &bull; Hanya 2-3 menit per hari &bull; Tanpa kartu kredit
          </p>
          
        </div>
      </div>
    </section>
  )
}

export default CTASection