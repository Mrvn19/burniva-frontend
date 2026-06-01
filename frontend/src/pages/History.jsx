import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Calendar } from 'lucide-react'
import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  Dot
} from 'recharts'
import { ROUTES } from '../utils/constants'
import { classNames } from '../utils/helpers'
import { getHistory } from '../services/historyService'
import LoadingScreen from '../components/common/LoadingScreen'

const levelConfig = {
  Tinggi: { color: 'text-red-500', bg: 'bg-red-50' },
  Sedang: { color: 'text-yellow-600', bg: 'bg-yellow-50' },
  Rendah: { color: 'text-green-600', bg: 'bg-green-50' },
}

const CustomDot = (props) => {
  const { cx, cy, value } = props
  const color = value >= 70 ? '#ef4444' : value >= 40 ? '#f59e0b' : '#22c55e'
  return <Dot cx={cx} cy={cy} r={5} fill={color} stroke="white" strokeWidth={2} />
}

function History() {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      setLoading(true)
      const data = await getHistory()
      setHistory(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Mapping Burnout
  const getBurnoutUI = (level) => {
    const l = (level || '').toLowerCase();
    if (l === 'low' || l === 'rendah') return { label: 'Rendah', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    if (l === 'medium' || l === 'sedang') return { label: 'Sedang', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' };
    if (l === 'high' || l === 'tinggi') return { label: 'Tinggi', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' };
    return { label: 'Belum ada', color: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200' };
  };

  // Mapping Mental Health
  const getMentalHealthUI = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'baik') return { label: 'Stabil', color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' };
    if (s === 'buruk') return { label: 'Perlu Perhatian', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' };
    return { label: 'Belum ada', color: 'text-slate-700', bg: 'bg-slate-50', border: 'border-slate-200' };
  };

  if (loading) {
    return <LoadingScreen text="Memuat riwayat..." />
  }

  return (
    <div className="p-4 pb-24 md:p-6 md:pb-6 max-w-3xl mx-auto">
      
      {/* Riwayat Harian */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_12px_rgb(0,0,0,0.03)] p-5 md:p-6">
        <h3 className="text-lg font-bold text-slate-800 mb-1">Riwayat Harian</h3>
        <p className="text-sm text-slate-500 mb-6">Catatan kondisi mental dan analisis dari waktu ke waktu</p>
        
        <div className="flex flex-col gap-4">
              {history.map((item) => {
                const burnoutUI = getBurnoutUI(item.Prediction?.burnout_prediction || item.burnout_level);
                const mentalUI = getMentalHealthUI(item.Prediction?.mental_health_prediction);

                return (
                  <div
                    key={item.id}
                    onClick={() => navigate(ROUTES.HISTORY_DETAIL.replace(':id', item.id))}
                    className="flex flex-col p-5 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl cursor-pointer transition-all hover:shadow-md gap-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5 text-sm font-bold text-slate-800">
                        <Calendar size={16} className="text-slate-400" />
                        {new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 w-24">Prediksi Burnout:</span>
                        <span className={classNames('text-xs font-bold px-2.5 py-1 rounded-lg border', burnoutUI.color, burnoutUI.bg, burnoutUI.border)}>
                          {burnoutUI.label}
                        </span>
                      </div>
                      
                      <div className="hidden sm:block w-px h-4 bg-slate-200" />
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500 w-24 sm:w-auto">Mental Health:</span>
                        <span className={classNames('text-xs font-bold px-2.5 py-1 rounded-lg border', mentalUI.color, mentalUI.bg, mentalUI.border)}>
                          {mentalUI.label}
                        </span>
                      </div>
                    </div>

                    <div className="mt-1 bg-white p-3 rounded-xl border border-slate-100">
                      <p className="text-[13px] text-slate-600 leading-relaxed italic">
                        "{item.Prediction?.daily_insight || 'Belum ada insight harian untuk tanggal ini.'}"
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {history.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar size={32} className="text-slate-300 mb-3" />
                <p className="text-sm font-medium text-slate-500 mb-1">Belum ada riwayat</p>
                <p className="text-xs text-slate-400 mb-4">Mulai cek harian untuk melihat perkembangan kamu</p>
                <button
                  onClick={() => navigate(ROUTES.INPUT)}
                  className="h-10 px-6 bg-primary-600 text-white text-sm font-semibold rounded-xl hover:bg-primary-700 transition-all shadow-md"
                >
                  Cek Sekarang
                </button>
              </div>
            )}
      </div>

    </div>
  )
}

export default History