import {
  AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts'

const tooltipStyle = {
  contentStyle: { borderRadius: '10px', border: '1px solid #E5E7EB', fontSize: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
  cursor: { stroke: '#E5E7EB' },
}

function ChartSection({ trendData = [] }) {
  // Mapping trendData dari API ke format Recharts (M-1, M-2 dst sesuai instruksi)
  const burnoutData = trendData.length > 0 
    ? trendData.map((item, index) => ({
        day: `M-${index + 1}`,
        score: item.score
      }))
    : [
        { day: 'M-4', score: 48 }, { day: 'M-3', score: 58 }, { day: 'M-2', score: 68 },
        { day: 'M-1', score: 75 }, { day: 'Skrg', score: 82 },
      ]; // Fallback dummy

  // Mapping stressData dinamis dari trendData jika ada
  const stressData = trendData.length > 0
    ? trendData.slice(-7).map(item => ({
        day: new Date(item.date).toLocaleDateString('id-ID', { weekday: 'short' }),
        value: item.stress || 0
      }))
    : [
        { day: 'Sen', value: 3 }, { day: 'Sel', value: 3.5 }, { day: 'Rab', value: 2.8 },
        { day: 'Kam', value: 4 }, { day: 'Jum', value: 6 }, { day: 'Sab', value: 7.5 }, { day: 'Min', value: 7 },
      ];

  const avg = (stressData.reduce((s, d) => s + d.value, 0) / stressData.length).toFixed(1);

  let diff = 0;
  let diffPct = 0;
  
  if (burnoutData.length >= 2) {
    const latestValue = burnoutData[burnoutData.length - 1].score;
    const prevValue = burnoutData[burnoutData.length - 2].score;
    diff = latestValue - prevValue;
    diffPct = prevValue > 0 ? Math.round((diff / prevValue) * 100) : 0;
  } else if (burnoutData.length === 1) {
    diff = burnoutData[0].score;
    diffPct = 100;
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Tren Tingkat Stres */}
      <div className="bg-white rounded-2xl p-6 border-[0.67px] border-gray-100 shadow-[0px_1px_3px_0px_rgba(0,0,0,0.10)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Tren Tingkat Stres</h3>
            <p className="text-sm text-gray-500">Pantauan 7 hari terakhir</p>
          </div>
          <div className="bg-gray-50 border-[0.67px] border-gray-100 rounded-lg px-3 py-1.5 self-start sm:self-auto">
            <span className="text-sm text-gray-600 font-medium">Rata-rata: {avg}</span>
          </div>
        </div>

        <div className="h-64 w-full relative">
          {trendData.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-[1.5px] z-10 text-center p-4">
              <span className="text-sm font-semibold text-slate-500 italic">Menampilkan data simulasi</span>
              <span className="text-xs text-slate-400">Silakan isi data asesmen harian Anda hari ini!</span>
            </div>
          )}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stressData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#006D5B" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#006D5B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 12, fill: '#9CA3AF' }} axisLine={false} tickLine={false} ticks={[0, 3, 6, 10]} />
              <Tooltip {...tooltipStyle} formatter={v => [`${v}`, 'Stres']} />
              <Area type="monotone" dataKey="value" stroke="#006D5B" strokeWidth={3} fill="url(#stressGrad)" dot={false} activeDot={{ r: 5, fill: '#006D5B' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}

export default ChartSection