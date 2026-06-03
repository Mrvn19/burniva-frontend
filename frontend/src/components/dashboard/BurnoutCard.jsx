import { useNavigate } from 'react-router-dom'
import { Calendar, ArrowRight, Brain, HeartPulse } from 'lucide-react'
import { ROUTES } from '../../utils/constants'
import { getTodayString } from '../../utils/helpers'
import { getBurnoutColor, getMentalColor, formatBurnout, formatMental } from '../../utils/format';

function BurnoutCard({ 
  burnoutScore,
  burnoutPrediction,
  mentalHealthPrediction,
  insight = 'Silakan lakukan check-in harian untuk mendapatkan analisis kondisi mentalmu hari ini dan rekomendasi terbaik dari Burniva.', 
  userName = '',
  hasTodayData = false
}) {
  const navigate = useNavigate()
  const today = getTodayString()



  const burnoutUI = getBurnoutColor(burnoutPrediction);
  const mentalUI = getMentalColor(mentalHealthPrediction);

  return (
    <div className="relative w-full bg-primary-500 rounded-3xl overflow-hidden shadow-[0px_10px_15px_-3px_rgba(28,57,142,0.10)] p-8 md:p-10 text-white">

      {/* Dekorasi Background Blur */}
      <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-20%] left-[-5%] w-56 h-56 bg-primary-400/20 rounded-full blur-2xl z-0" />

      <div className="relative z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">

        {/* Teks Kiri */}
        <div className="flex flex-col gap-4 max-w-lg">
          <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
            <Calendar size={14} />
            <span>Hari Ini, {today}</span>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Halo, {userName || 'User'}!
            </h2>
            <p className="text-white/80 text-base font-medium flex items-center gap-2 mt-1">
              <Brain size={16} /> Insight Burniva Hari Ini
            </p>
          </div>
          <p className="text-white/90 text-[15px] leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-sm">
            {insight}
          </p>
        </div>

        {/* Widget Kanan */}
        <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full xl:w-auto">
          
          {hasTodayData ? (
            <>
              {/* Card Indeks & Prediksi Burnout */}
              <div className="flex flex-col justify-center bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-md shadow-xl flex-1 min-w-[160px]">
                <div className="flex flex-col gap-3">
                  {/* Indeks Risiko */}
                  <div>
                    <span className="text-white/80 text-[10px] font-semibold uppercase tracking-wider block mb-1">Indeks Risiko</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white leading-none">{burnoutScore ?? '-'}</span>
                      <span className="text-xs font-medium text-white/60">/100</span>
                    </div>
                  </div>

                  {/* Kategori AI */}
                  <div>
                    <span className="text-white/80 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1 mb-1">
                      <Brain size={12} /> Kategori AI
                    </span>
                    <div className={`px-3 py-1.5 rounded-lg border flex items-center gap-2 w-fit ${burnoutUI.bg} ${burnoutUI.border}`}>
                      <div className={`w-2 h-2 rounded-full ${burnoutUI.dot} shadow-[0_0_8px_rgba(255,255,255,0.3)] animate-pulse`} />
                      <span className={`${burnoutUI.text} text-xs font-bold tracking-wide`}>{formatBurnout(burnoutPrediction)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Mental Health */}
              <div className="flex flex-col justify-center bg-white/10 p-5 rounded-2xl border border-white/20 backdrop-blur-md shadow-xl flex-1 min-w-[160px]">
                <span className="text-white/80 text-xs font-semibold uppercase tracking-wide mb-3 flex items-center gap-1.5">
                  <HeartPulse size={14} /> Mental Health
                </span>
                <div className={`px-4 py-2.5 rounded-xl border flex items-center gap-2.5 w-fit ${mentalUI.bg} ${mentalUI.border}`}>
                  <div className={`w-2.5 h-2.5 rounded-full ${mentalUI.dot} shadow-[0_0_8px_rgba(255,255,255,0.3)] animate-pulse`} />
                  <span className={`${mentalUI.text} text-sm font-bold tracking-wide`}>{formatMental(mentalHealthPrediction)}</span>
                </div>
              </div>

              {/* Tombol Hasil */}
              <button
                onClick={() => navigate(ROUTES.RESULT)}
                className="group w-full sm:w-auto bg-white text-primary-600 hover:bg-primary-50 text-sm font-bold px-6 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-primary-100"
              >
                Lihat Analisis 
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </>
          ) : (
            <div className="flex flex-col justify-center bg-white/10 p-6 rounded-2xl border border-white/20 backdrop-blur-md shadow-xl w-full">
              <button
                onClick={() => navigate(ROUTES.INPUT)}
                className="group w-full sm:w-auto bg-white text-primary-600 hover:bg-primary-50 text-sm font-bold px-8 py-4 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Mulai Cek Harian 
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default BurnoutCard