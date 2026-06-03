import React from 'react';
import Slider from '../ui/Slider';

// ==========================================
// KOMPONEN LOKAL: Pemilih Waktu (Time Picker)
// ==========================================
const TimePickerCard = ({ title, hours, minutes, onTimeChange, displayValue }) => {
  const handleTime = (h, m) => {
    let newH = isNaN(h) ? 0 : h;
    let newM = isNaN(m) ? 0 : m;

    // Logika Rollover waktu (60 menit = 1 jam)
    if (newM >= 60) {
      newH += Math.floor(newM / 60);
      newM = newM % 60;
    } else if (newM < 0) {
      if (newH > 0) {
        newH -= 1;
        newM = 60 + newM;
      } else {
        newM = 0;
      }
    }
    if (newH < 0) newH = 0;
    if (newH > 24) newH = 24;

    onTimeChange(newH, newM);
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 md:p-5 border-[0.67px] border-gray-200 flex flex-col gap-4 md:gap-5">
      {/* Header Label & Kotak Biru */}
      <div className="flex justify-between items-start gap-4">
        <h3 className="text-sm md:text-base font-medium text-gray-900 leading-6">{title}</h3>
        <div className="px-2 md:px-3 min-w-[5rem] h-9 md:h-10 bg-primary-50 rounded-[10px] border-[0.67px] border-primary-200 flex items-center justify-center flex-shrink-0">
          <span className="text-sm md:text-lg font-medium text-primary-500 whitespace-nowrap">
            {displayValue}
          </span>
        </div>
      </div>

      {/* Kontrol Input (Jam & Menit) */}
      <div className="grid grid-cols-2 items-center gap-3 md:gap-6 pt-1">

        {/* Kontrol JAM */}
        <div className="flex items-center gap-1 md:gap-3 w-full">
          <button
            onClick={() => handleTime(hours - 1, minutes)}
            className="text-gray-500 hover:text-gray-900 text-xl md:text-2xl w-5 md:w-6 flex-shrink-0 text-center focus:outline-none"
          >
            -
          </button>
          <div className="flex-1 flex items-stretch border border-gray-200 rounded-md overflow-hidden h-10 md:h-12 w-full min-w-0">
            <input
              type="number"
              value={hours}
              onChange={(e) => handleTime(parseInt(e.target.value), minutes)}
              className="w-full text-center text-neutral-950 text-sm md:text-base outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none min-w-0"
              min="0"
              max="24"
            />
            <div className="bg-slate-100 px-2 md:px-4 flex items-center justify-center border-l border-gray-200 shrink-0">
              <span className="text-gray-500 text-[10px] md:text-xs font-medium">Jam</span>
            </div>
          </div>
          <button
            onClick={() => handleTime(hours + 1, minutes)}
            className="text-gray-500 hover:text-gray-900 text-xl md:text-2xl w-5 md:w-6 flex-shrink-0 text-center focus:outline-none"
          >
            +
          </button>
        </div>

        {/* Kontrol MENIT */}
        <div className="flex items-center gap-1 md:gap-3 w-full">
          <button
            onClick={() => handleTime(hours, minutes - 15)}
            className="text-gray-500 hover:text-gray-900 text-xl md:text-2xl w-5 md:w-6 flex-shrink-0 text-center focus:outline-none"
          >
            -
          </button>
          <div className="flex-1 flex items-stretch border border-gray-200 rounded-md overflow-hidden h-10 md:h-12 w-full min-w-0">
            <input
              type="number"
              value={minutes}
              onChange={(e) => handleTime(hours, parseInt(e.target.value))}
              className="w-full text-center text-neutral-950 text-sm md:text-base outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none min-w-0"
              min="0"
              step="15"
            />
            <div className="bg-slate-100 px-2 md:px-3 flex items-center justify-center border-l border-gray-200 shrink-0">
              <span className="text-gray-500 text-[10px] md:text-xs font-medium">Menit</span>
            </div>
          </div>
          <button
            onClick={() => handleTime(hours, minutes + 15)}
            className="text-gray-500 hover:text-gray-900 text-xl md:text-2xl w-5 md:w-6 flex-shrink-0 text-center focus:outline-none"
          >
            +
          </button>
        </div>

      </div>
    </div>
  );
};


// ==========================================
// KOMPONEN UTAMA: Lifestyle Step
// ==========================================
function LifestyleStep({ formData, setFormData }) {

  // --- FUNGSI FORMATTER UMUM (Dipakai untuk Tidur & Fisik) ---
  const formatTimeDisplay = (h, m) => {
    if (h > 0 && m > 0) return `${h} jam ${m} mnt`;
    if (h > 0) return `${h} jam`;
    if (m > 0) return `${m} menit`;
    return '0 jam';
  };

  // --- KONVERSI DATA: Jam Tidur (Disimpan sebagai Desimal, misal 6.5) ---
  const hoursTidur = Math.floor(formData.sleep_hours || 0);
  const minutesTidur = Math.round(((formData.sleep_hours || 0) - hoursTidur) * 60);

  const handleTidurChange = (h, m) => {
    let decimalValue = h + (m / 60);
    
    const MAX_SLEEP = 14;
    if (decimalValue > MAX_SLEEP) decimalValue = MAX_SLEEP;

    const currentStudy = formData.study_hours || 0;
    const currentActivity = formData.activity_hours || 0;
    const maxAllowed = 24 - currentStudy - currentActivity;

    if (decimalValue > maxAllowed) decimalValue = maxAllowed;
    if (decimalValue < 0) decimalValue = 0;

    setFormData({ ...formData, sleep_hours: Number(decimalValue.toFixed(2)) });
  };

  // --- KONVERSI DATA: Aktivitas Fisik (Disimpan sebagai Desimal Jam, misal 1.5) ---
  const hoursFisik = Math.floor(formData.activity_hours || 0);
  const minutesFisik = Math.round(((formData.activity_hours || 0) - hoursFisik) * 60);

  const handleFisikChange = (h, m) => {
    let decimalValue = h + (m / 60);
    
    const MAX_ACTIVITY = 8;
    if (decimalValue > MAX_ACTIVITY) decimalValue = MAX_ACTIVITY;

    const currentStudy = formData.study_hours || 0;
    const currentSleep = formData.sleep_hours || 0;
    const maxAllowed = 24 - currentStudy - currentSleep;

    if (decimalValue > maxAllowed) decimalValue = maxAllowed;
    if (decimalValue < 0) decimalValue = 0;

    setFormData({ ...formData, activity_hours: Number(decimalValue.toFixed(2)) });
  };

  const isTotalMaxed = (formData.study_hours || 0) + (formData.sleep_hours || 0) + (formData.activity_hours || 0) >= 24;

  return (
    <div className="flex flex-col gap-5 md:gap-7 w-full">

      {/* Header Step Gaya Hidup */}
      <div className="flex flex-col gap-1 w-full">
        <h2 className="text-lg md:text-xl font-medium text-neutral-950 leading-7">
          Gaya Hidup
        </h2>
        <p className="text-sm font-normal text-gray-500 leading-5">
          Beberapa pertanyaan tentang keseharian kamu.
        </p>
      </div>

      {/* Area Form */}
      <div className="flex flex-col gap-4 md:gap-5 w-full">

        {/* 1. Jam Tidur (Custom Time Picker) */}
        <div>
          <TimePickerCard
            title="Berapa jam kamu tidur tadi malam?"
            hours={hoursTidur}
            minutes={minutesTidur}
            onTimeChange={handleTidurChange}
            displayValue={formatTimeDisplay(hoursTidur, minutesTidur)}
          />
          <div className="px-2 mt-2">
            {formData.sleep_hours >= 14 ? (
              <p className="text-[11px] md:text-xs text-orange-500 font-medium">Batas maksimal jam tidur adalah 14 jam.</p>
            ) : isTotalMaxed ? (
              <p className="text-[11px] md:text-xs text-orange-500 font-medium">Total seluruh waktu aktivitasmu hari ini telah mencapai batas 24 jam.</p>
            ) : null}
          </div>
        </div>

        {/* 2. Tekanan Finansial (Slider) */}
        <Slider
          label="Seberapa berat tekanan finansial?"
          value={formData.financial_pressure}
          onChange={v => setFormData({ ...formData, financial_pressure: v })}
          min={1}
          max={10}
          minLabel="Rendah"
          maxLabel="Tinggi"
        />

        {/* 3. Ekspektasi Keluarga (Slider) */}
        <Slider
          label="Seberapa tinggi ekspektasi keluarga?"
          value={formData.family_expectation}
          onChange={v => setFormData({ ...formData, family_expectation: v })}
          min={1}
          max={10}
          minLabel="Rendah"
          maxLabel="Tinggi"
        />

        {/* 4. Dukungan Sosial (Slider) */}
        <Slider
          label="Seberapa besar dukungan sosial yang kamu rasakan?"
          value={formData.social_support}
          onChange={v => setFormData({ ...formData, social_support: v })}
          min={1}
          max={10}
          minLabel="Rendah"
          maxLabel="Tinggi"
        />

        {/* 5. Aktivitas Fisik (Custom Time Picker) */}
        <div>
          <TimePickerCard
            title="Berapa lama kamu berolahraga atau beraktivitas fisik hari ini?"
            hours={hoursFisik}
            minutes={minutesFisik}
            onTimeChange={handleFisikChange}
            displayValue={formatTimeDisplay(hoursFisik, minutesFisik)}
          />
          <div className="px-2 mt-2">
            {formData.activity_hours >= 8 ? (
              <p className="text-[11px] md:text-xs text-orange-500 font-medium">Batas maksimal aktivitas fisik adalah 8 jam.</p>
            ) : isTotalMaxed ? (
              <p className="text-[11px] md:text-xs text-orange-500 font-medium">Total seluruh waktu aktivitasmu hari ini telah mencapai batas 24 jam.</p>
            ) : null}
          </div>
        </div>

      </div>
    </div>
  );
}

export default LifestyleStep;