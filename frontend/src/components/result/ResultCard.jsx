import React from 'react';
import { Brain } from 'lucide-react';

function GaugeCircle({ score, colorHex, textColorClass = "text-blue-800" }) {
  const [animatedScore, setAnimatedScore] = React.useState(0);

  React.useEffect(() => {
    // Trigger animasi dari 0 ke skor akhir setelah komponen di-mount
    const timer = setTimeout(() => setAnimatedScore(score), 100);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeLength = (animatedScore / 100) * circumference;

  return (
    <div className="relative w-32 h-32 md:w-36 md:h-36 flex-shrink-0 flex items-center justify-center">
      <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#F1F5F9" strokeWidth="12" />
        <circle cx="60" cy="60" r={radius} fill="none" stroke={colorHex} strokeWidth="12"
          strokeDasharray={`${strokeLength} ${circumference}`}
          strokeDashoffset="0" strokeLinecap="round" className="transition-all duration-1000 ease-out" />
      </svg>
      <div className="flex flex-col items-center justify-center z-10 pt-1">
        <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Indeks Risiko</span>
        <div className="flex items-baseline gap-0.5">
          <span className={`text-3xl md:text-4xl font-bold ${textColorClass} leading-none`}>{score}</span>
          <span className="text-xs text-gray-400 font-medium">/100</span>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ burnoutLevel, burnoutScore }) {
  const levelStr = (burnoutLevel || 'Tinggi').toLowerCase();
  
  const isHigh = levelStr === 'high' || levelStr === 'tinggi';
  const isMedium = levelStr === 'medium' || levelStr === 'sedang';
  
  const borderColor = isHigh ? 'border-red-500' : isMedium ? 'border-orange-400' : 'border-emerald-500';
  const badgeBg = isHigh ? 'bg-red-50 border-red-100' : isMedium ? 'bg-orange-50 border-orange-100' : 'bg-emerald-50 border-emerald-100';
  const badgeText = isHigh ? 'text-red-700' : isMedium ? 'text-orange-700' : 'text-emerald-700';
  const textColorClass = isHigh ? 'text-red-600' : isMedium ? 'text-orange-600' : 'text-emerald-600';
  const hexColor = isHigh ? '#ef4444' : isMedium ? '#f97316' : '#10b981';

  const levelLabel = isHigh ? 'Tinggi' : isMedium ? 'Sedang' : 'Rendah';

  return (
    <div className={`w-full bg-white rounded-2xl border-r-[0.67px] border-t-[0.67px] border-b-[0.67px] border-gray-200 border-l-4 ${borderColor} p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 shadow-sm`}>
      
      {/* Teks Kiri */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 flex-1">
        <div className={`px-4 py-1.5 rounded-full border-[0.67px] mb-2 ${badgeBg} flex items-center gap-1.5`}>
          <Brain size={14} className={badgeText} />
          <span className={`text-xs md:text-sm font-semibold tracking-wide ${badgeText}`}>Kategori AI Burniva</span>
        </div>
        <p className="text-sm text-gray-500 font-semibold uppercase tracking-wider mt-1">Status Saat Ini</p>
        <h2 className={`text-4xl md:text-5xl font-bold ${textColorClass} mb-2`}>{levelLabel}</h2>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-xl">
          {isHigh 
            ? "Berdasarkan data hari ini, kamu menunjukkan tanda-tanda kelelahan mental yang signifikan. Mari ambil langkah nyata untuk mulai pemulihan."
            : isMedium 
            ? "Kondisi burnout kamu berada di level peringatan. Jangan lupa mengatur ritme aktivitasmu sebelum semakin lelah."
            : "Kondisimu terpantau aman dari risiko burnout. Pertahankan keseimbangan aktivitas dan waktu istirahatmu."}
        </p>
        
        {/* Disclaimer */}
        <p className="text-[11px] md:text-xs text-gray-400 mt-4 max-w-xl italic">
          *Kategori burnout ditentukan oleh model AI. Indeks Risiko digunakan sebagai indikator visual untuk membantu memantau perubahan kondisi dari waktu ke waktu.
        </p>
      </div>

      {/* Indeks Kanan */}
      <GaugeCircle score={burnoutScore ?? 0} colorHex={hexColor} textColorClass={textColorClass} />
      
    </div>
  );
}

export default ResultCard;