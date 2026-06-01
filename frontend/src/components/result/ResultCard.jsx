import React from 'react';
import { Brain } from 'lucide-react';

function ResultCard({ burnoutLevel }) {
  const levelStr = (burnoutLevel || 'Tinggi').toLowerCase();
  
  const isHigh = levelStr === 'high' || levelStr === 'tinggi';
  const isMedium = levelStr === 'medium' || levelStr === 'sedang';
  
  const borderColor = isHigh ? 'border-red-500' : isMedium ? 'border-orange-400' : 'border-emerald-500';
  const badgeBg = isHigh ? 'bg-red-50 border-red-100' : isMedium ? 'bg-orange-50 border-orange-100' : 'bg-emerald-50 border-emerald-100';
  const badgeText = isHigh ? 'text-red-700' : isMedium ? 'text-orange-700' : 'text-emerald-700';
  const textColorClass = isHigh ? 'text-red-600' : isMedium ? 'text-orange-600' : 'text-emerald-600';
  const iconColorClass = isHigh ? 'text-red-500' : isMedium ? 'text-orange-500' : 'text-emerald-500';

  const levelLabel = isHigh ? 'Tinggi' : isMedium ? 'Sedang' : 'Rendah';

  return (
    <div className={`w-full bg-white rounded-2xl border-r-[0.67px] border-t-[0.67px] border-b-[0.67px] border-gray-200 border-l-4 ${borderColor} p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-sm`}>
      
      {/* Teks Kiri */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 flex-1">
        <div className={`px-4 py-1.5 rounded-full border-[0.67px] mb-2 ${badgeBg}`}>
          <span className={`text-xs md:text-sm font-semibold tracking-wide ${badgeText}`}>Hasil Analisis AI Burniva</span>
        </div>
        <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mt-1">Prediksi Risiko Burnout</p>
        <h2 className={`text-4xl md:text-5xl font-bold ${textColorClass} mb-2`}>{levelLabel}</h2>
        <p className="text-base text-gray-600 leading-relaxed max-w-xl">
          {isHigh 
            ? "Berdasarkan data hari ini, kamu menunjukkan tanda-tanda kelelahan mental yang signifikan. Mari ambil langkah nyata untuk mulai pemulihan."
            : isMedium 
            ? "Kondisi burnout kamu berada di level peringatan. Jangan lupa mengatur ritme aktivitasmu sebelum semakin lelah."
            : "Kondisimu terpantau aman dari risiko burnout. Pertahankan keseimbangan aktivitas dan waktu istirahatmu."}
        </p>
      </div>

      {/* Ikon Kanan */}
      <div className="flex-shrink-0 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-full w-32 h-32 md:w-40 md:h-40">
        <Brain className={`w-16 h-16 md:w-20 md:h-20 ${iconColorClass}`} />
      </div>
      
    </div>
  );
}

export default ResultCard;