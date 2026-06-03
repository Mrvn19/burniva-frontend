import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'
import { ArrowRight } from 'lucide-react'

function TeamClosing() {
  return (
    <section className="py-24 md:py-32 bg-[#F2FBF8] text-center border-t border-emerald-50">
      <div className="w-full px-4 md:px-12 lg:px-16 relative z-10">

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#006D5B] mb-6 leading-snug">
            Bersama Membangun Kesehatan<br className="hidden sm:block" /> Mental Mahasiswa yang Lebih Baik
          </h2>

          <p className="text-[15px] md:text-base text-slate-500 leading-relaxed mb-10 max-w-3xl mx-auto">
            "Burniva bukan sekadar platform digital, tetapi sebuah langkah nyata untuk membantu mahasiswa memahami kondisi mental mereka, mencegah burnout sejak dini, dan menjaga keseimbangan hidup akademik."
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5">
            <Link
              to={ROUTES.LOGIN}
              className="bg-[#006D5B] hover:bg-[#005a4a] text-white px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Explore Burniva
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>

            <Link
              to={ROUTES.HOME}
              className="bg-white hover:bg-slate-50 text-[#006D5B] px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              Back to Home
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}

export default TeamClosing
