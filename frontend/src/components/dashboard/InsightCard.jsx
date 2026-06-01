import { Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'

function InsightCard({ 
  insight = 'Tingkat stresmu sedang menanjak tajam. Sangat disarankan untuk segera menyelesaikan tugas prioritas dan mengambil jeda yang cukup malam ini.',
  hasTodayData = false
}) {
  const navigate = useNavigate()

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 border-[0.67px] border-primary-100 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)] relative overflow-hidden">

      {/* Decorative Blur Top Right */}
      <div className="absolute top-[-30px] right-[-30px] w-32 h-32 bg-primary-100/60 rounded-full blur-2xl z-0" />

      <div className="relative z-10 flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-primary-500 shadow-sm flex items-center justify-center text-white">
          <Sparkles size={18} />
        </div>
        <span className="text-lg font-semibold text-primary-500">
          {hasTodayData ? 'Insight AI Hari Ini' : 'Belum Ada Insight'}
        </span>
      </div>

      <p className="relative z-10 text-sm text-gray-700 leading-relaxed mb-6">
        {hasTodayData 
          ? insight 
          : 'Burniva belum bisa memberikan insight hari ini. Selesaikan Cek Harian terlebih dahulu agar AI kami dapat menganalisis kondisimu.'}
      </p>

      {hasTodayData ? (
        <button
          onClick={() => navigate(ROUTES.RESULT)}
          className="relative z-10 text-sm text-primary-500 font-medium bg-white border border-primary-200 rounded-xl px-4 py-3 hover:bg-primary-50 transition-colors w-full text-center shadow-sm"
        >
          Lihat Rekomendasi Detail
        </button>
      ) : (
        <button
          onClick={() => navigate(ROUTES.INPUT)}
          className="relative z-10 text-sm text-white font-medium bg-primary-500 rounded-xl px-4 py-3 hover:bg-primary-600 transition-colors w-full text-center shadow-sm"
        >
          Mulai Cek Harian
        </button>
      )}
    </div>
  )
}

export default InsightCard