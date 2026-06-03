import React from 'react';
import { Laugh, Smile, Meh, Frown, Annoyed } from 'lucide-react';

// Sub-komponen untuk merender kotak data (Dioptimalkan ukurannya untuk mode 2 kolom mobile)
function ReviewItem({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-[10px] p-3 md:p-4 border-[0.67px] border-gray-200 flex flex-col gap-0.5">
      <p className="text-xs md:text-sm text-gray-500 font-normal leading-tight md:leading-5 truncate">
        {label}
      </p>
      <p className="text-base md:text-lg text-neutral-950 font-semibold md:font-normal leading-snug md:leading-7">
        {value}
      </p>
    </div>
  );
}

function ReviewStep({ formData, setFormData }) {
  // --- REVISI UTAMA: FUNGSI FORMATTER WAKTU (JAM & MENIT) ---
  
  // 1. Mengubah angka Desimal ke format "X jam Y menit" (Untuk Belajar & Tidur)
  const formatDecimalToHoursMinutes = (decimal) => {
    const num = Number(decimal) || 0;
    const h = Math.floor(num);
    const m = Math.round((num - h) * 60);
    
    if (h === 0) return `${m} menit`;
    if (m === 0) return `${h} jam`;
    return `${h} jam ${m} menit`;
  };

  // --- MAPPING DATA KE LABEL ---
  const items = [
    { label: 'Stres',               value: formData.stress },
    { label: 'Kecemasan',           value: formData.anxiety },
    { label: 'Tekanan Emosional',   value: formData.emotional_pressure }, 
    { label: 'Tekanan Akademik',    value: formData.academic_pressure },
    { label: 'Lama Belajar',        value: formatDecimalToHoursMinutes(formData.study_hours) },
    { label: 'Lama Tidur',          value: formatDecimalToHoursMinutes(formData.sleep_hours) },
    { label: 'Tekanan Finansial',   value: formData.financial_pressure },
    { label: 'Ekspektasi Keluarga', value: formData.family_expectation },
    { label: 'Dukungan Sosial',     value: formData.social_support },
    { label: 'Aktivitas Fisik',     value: formatDecimalToHoursMinutes(formData.activity_hours) },
  ];

  // --- MOOD TRACKER DATA ---
  const MOODS = [
    { label: 'Senang', icon: <Laugh size={28} /> },
    { label: 'Tenang', icon: <Smile size={28} /> },
    { label: 'Biasa', icon: <Meh size={28} /> },
    { label: 'Sedih', icon: <Frown size={28} /> },
    { label: 'Overwhelmed', icon: <Annoyed size={28} /> },
  ];

  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full">
      
      {/* 🌟 MOOD TRACKER (PHASE 6) 🌟 */}
      <div className="bg-primary-50 rounded-2xl p-5 border border-primary-100 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-bold text-primary-700">Mood Hari Ini</h3>
          <p className="text-xs md:text-sm text-primary-600/80">Bagaimana perasaanmu saat ini secara keseluruhan?</p>
        </div>
        <div className="grid grid-cols-5 gap-2 md:gap-4">
          {MOODS.map(mood => {
            const isSelected = formData.mood_today === mood.label;
            return (
              <button
                key={mood.label}
                onClick={() => setFormData({ ...formData, mood_today: mood.label })}
                className={`flex flex-col items-center gap-2 p-2 md:p-3 rounded-xl border-2 transition-all ${
                  isSelected 
                    ? 'bg-white border-primary-500 shadow-md transform scale-105' 
                    : 'bg-white/50 border-transparent hover:bg-white hover:border-primary-200'
                }`}
              >
                <div className={`flex items-center justify-center ${isSelected ? 'text-primary-600' : 'text-slate-500'}`}>
                  {mood.icon}
                </div>
                <span className={`text-[10px] md:text-xs font-semibold ${isSelected ? 'text-primary-600' : 'text-slate-500'}`}>
                  {mood.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="w-full h-px bg-slate-200"></div>

      {/* Header Step Tinjau */}
      <div className="flex flex-col gap-1 w-full">
        <h2 className="text-lg md:text-xl font-medium text-neutral-950 leading-7">
          Tinjau Data Kamu
        </h2>
        <p className="text-sm font-normal text-gray-500 leading-5">
          Pastikan semua data sudah benar sebelum dianalisis.
        </p>
      </div>

      {/* Grid 2 Kolom per Baris */}
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {items.map((item, index) => (
          <ReviewItem key={index} label={item.label} value={item.value} />
        ))}
      </div>
      
    </div>
  );
}

export default ReviewStep;