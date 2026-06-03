import React from 'react';
import Slider from '../ui/Slider';

function AcademicStep({ formData, setFormData }) {
  // --- LOGIKA KONVERSI WAKTU ---
  // Mengubah data desimal (misal: 6.5) menjadi jam (6) dan menit (30)
  const hours = Math.floor(formData.study_hours || 0);
  const minutes = Math.round(((formData.study_hours || 0) - hours) * 60);

  const handleTimeChange = (newHours, newMinutes) => {
    let h = isNaN(newHours) ? 0 : newHours;
    let m = isNaN(newMinutes) ? 0 : newMinutes;

    // Logika perhitungan rollover (jika menit lebih dari 60 atau kurang dari 0)
    if (m >= 60) {
      h += Math.floor(m / 60);
      m = m % 60;
    } else if (m < 0) {
      if (h > 0) {
        h -= 1;
        m = 60 + m; // Misal m = -15, maka menjadi 45 menit
      } else {
        m = 0; // Batasi agar tidak minus
      }
    }

    let decimalValue = h + (m / 60);
    
    // Batas maksimal individu
    const MAX_STUDY = 16;
    if (decimalValue > MAX_STUDY) decimalValue = MAX_STUDY;

    // Batas maksimal total 24 jam
    const currentSleep = formData.sleep_hours || 0;
    const currentActivity = formData.activity_hours || 0;
    const maxAllowed = 24 - currentSleep - currentActivity;

    if (decimalValue > maxAllowed) decimalValue = maxAllowed;
    if (decimalValue < 0) decimalValue = 0;

    setFormData({ ...formData, study_hours: Number(decimalValue.toFixed(2)) });
  };

  // Format teks untuk kotak nilai biru di kanan atas
  const formatDisplay = (h, m) => {
    if (h > 0 && m > 0) return `${h} jam ${m} mnt`;
    if (h > 0) return `${h} jam`;
    if (m > 0) return `${m} menit`;
    return '0 jam';
  };

  return (
    <div className="flex flex-col gap-5 md:gap-7 w-full">

      {/* Header Step Akademik */}
      <div className="flex flex-col gap-1 w-full">
        <h2 className="text-lg md:text-xl font-medium text-neutral-950 leading-7">
          Akademik
        </h2>
        <p className="text-sm font-normal text-gray-500 leading-5">
          Ceritakan tentang aktivitas belajar kamu.
        </p>
      </div>

      {/* Area Form */}
      <div className="flex flex-col gap-4 md:gap-5 w-full">

        {/* 1. Tekanan Akademik (Tetap menggunakan Slider) */}
        <Slider
          label="Seberapa besar tekanan akademik?"
          value={formData.academic_pressure}
          onChange={v => setFormData({ ...formData, academic_pressure: v })}
          min={1}
          max={10}
          minLabel="Rendah"
          maxLabel="Tinggi"
        />

        {/* 2. Jam Belajar (Custom Time Input persis seperti Figma) */}
        <div className="w-full bg-white rounded-2xl p-4 md:p-5 border-[0.67px] border-gray-200 flex flex-col gap-4 md:gap-5">

          {/* Header Label & Value Box Biru */}
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm md:text-base font-medium text-gray-900">
                Berapa jam kamu belajar hari ini?
              </h3>
            </div>

            <div className="px-2 md:px-3 min-w-[4rem] h-9 md:h-10 bg-primary-50 rounded-[10px] border-[0.67px] border-primary-200 flex items-center justify-center flex-shrink-0">
              <span className="text-sm md:text-lg font-medium text-primary-500 whitespace-nowrap">
                {formatDisplay(hours, minutes)}
              </span>
            </div>
          </div>

          {/* Area Kontrol Input (Jam & Menit) */}
          <div className="grid grid-cols-2 items-center gap-3 md:gap-6 pt-1">

            {/* --- Kontrol JAM --- */}
            <div className="flex items-center gap-1 md:gap-3 w-full">
              <button
                onClick={() => handleTimeChange(hours - 1, minutes)}
                className="text-gray-500 hover:text-gray-900 text-xl md:text-2xl w-5 md:w-6 flex-shrink-0 text-center focus:outline-none"
              >
                -
              </button>
              <div className="flex-1 flex items-stretch border border-gray-200 rounded-md overflow-hidden h-10 md:h-12 w-full min-w-0">
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => handleTimeChange(parseInt(e.target.value), minutes)}
                  className="w-full text-center text-neutral-950 text-sm md:text-base outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none min-w-0"
                  min="0"
                  max="24"
                />
                <div className="bg-slate-100 px-2 md:px-4 flex items-center justify-center border-l border-gray-200 shrink-0">
                  <span className="text-gray-500 text-[10px] md:text-xs font-medium">Jam</span>
                </div>
              </div>
              <button
                onClick={() => handleTimeChange(hours + 1, minutes)}
                className="text-gray-500 hover:text-gray-900 text-xl md:text-2xl w-5 md:w-6 flex-shrink-0 text-center focus:outline-none"
              >
                +
              </button>
            </div>

            {/* --- Kontrol MENIT --- */}
            <div className="flex items-center gap-1 md:gap-3 w-full">
              <button
                onClick={() => handleTimeChange(hours, minutes - 15)}
                className="text-gray-500 hover:text-gray-900 text-xl md:text-2xl w-5 md:w-6 flex-shrink-0 text-center focus:outline-none"
              >
                -
              </button>
              <div className="flex-1 flex items-stretch border border-gray-200 rounded-md overflow-hidden h-10 md:h-12 w-full min-w-0">
                <input
                  type="number"
                  value={minutes}
                  onChange={(e) => handleTimeChange(hours, parseInt(e.target.value))}
                  className="w-full text-center text-neutral-950 text-sm md:text-base outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none min-w-0"
                  min="0"
                  step="15"
                />
                <div className="bg-slate-100 px-2 md:px-3 flex items-center justify-center border-l border-gray-200 shrink-0">
                  <span className="text-gray-500 text-[10px] md:text-xs font-medium">Menit</span>
                </div>
              </div>
              <button
                onClick={() => handleTimeChange(hours, minutes + 15)}
                className="text-gray-500 hover:text-gray-900 text-xl md:text-2xl w-5 md:w-6 flex-shrink-0 text-center focus:outline-none"
              >
                +
              </button>
            </div>

          </div>
        </div>
        
        {/* Helper Text untuk Batas Waktu */}
        <div className="px-2">
          {formData.study_hours >= 16 ? (
            <p className="text-[11px] md:text-xs text-orange-500 font-medium">Batas maksimal jam belajar adalah 16 jam.</p>
          ) : (formData.study_hours + (formData.sleep_hours || 0) + (formData.activity_hours || 0) >= 24) ? (
            <p className="text-[11px] md:text-xs text-orange-500 font-medium">Total seluruh waktu aktivitasmu hari ini telah mencapai batas 24 jam.</p>
          ) : null}
        </div>

      </div>
    </div>
  );
}

export default AcademicStep;