import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ROUTES } from '../../utils/constants'

function AboutClosing() {
  const navigate = useNavigate()

  return (
    <section className="py-20 md:py-28 bg-[#006D5B] text-center">
      <div className="w-full px-4 md:px-12 lg:px-16 max-w-5xl mx-auto">
        
        <h2 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
          Bersama Membangun Kesadaran Mental yang Lebih Baik
        </h2>
        
        <p className="text-[15px] md:text-lg text-emerald-50/90 leading-relaxed mb-10 max-w-3xl mx-auto">
          Burniva hadir sebagai langkah kecil untuk membantu mahasiswa mengenali kondisi dirinya lebih awal dan menjaga keseimbangan dalam kehidupan akademik maupun pribadi.
        </p>

        <button 
          onClick={() => navigate(ROUTES.REGISTER)}
          className="inline-flex items-center justify-center gap-2 bg-white text-[#006D5B] hover:bg-slate-50 px-6 py-3 md:px-8 md:py-3.5 rounded-xl text-[14.5px] font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 mx-auto"
        >
          Mulai Cek Kondisimu Sekarang
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>

      </div>
    </section>
  )
}

export default AboutClosing
