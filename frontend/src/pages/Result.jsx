import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Sparkles, ArrowRight, RotateCcw, ArrowLeft, ListChecks } from 'lucide-react';
import { ROUTES } from '../utils/constants';
import ResultCard from '../components/result/ResultCard';
import FactorBreakdown from '../components/result/FactorBreakdown';
import LoadingScreen from '../components/common/LoadingScreen';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { getHistoryDetail } from '../services/historyService';
import { resetAssessmentToday } from '../services/assessmentService';
import { getBurnoutColor, getMentalColor, formatBurnout, formatMental } from '../utils/format';

function Result() {
  const navigate = useNavigate();
  const { id: urlId } = useParams();

  const isDetailMode = !!urlId;
  const [result, setResult] = useState({});
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, title: '', message: '', onConfirm: null });

  const handleResetInput = () => {
    setConfirmModal({
      isOpen: true,
      title: 'Reset & Input Ulang',
      message: 'Data assessment dan rekomendasi Todo Anda hari ini akan dihapus. Anda harus mengisi ulang dari awal. Apakah Anda yakin?',
      onConfirm: async () => {
        try {
          await resetAssessmentToday();
          setConfirmModal(prev => ({ ...prev, isOpen: false }));
          navigate(ROUTES.INPUT);
        } catch (error) {
          console.error("Gagal melakukan reset:", error);
          alert(error.response?.data?.message || "Terjadi kesalahan saat reset data");
        }
      }
    });
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        let fetchId = urlId;
        if (!isDetailMode) {
          const localData = JSON.parse(localStorage.getItem("analysisResult"));
          if (localData && localData.id) {
            fetchId = localData.id;
          }
        }

        if (fetchId) {
          const data = await getHistoryDetail(fetchId);
          setResult(data.history);
          setTodos(data.todos || []);
        }
      } catch (error) {
        console.error("Failed to load result:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [urlId, isDetailMode]);

  // Update Topbar Title dynamically if we are in History Detail mode
  useEffect(() => {
    if (isDetailMode && result?.createdAt) {
      const dateStr = new Date(result.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      const titleEl = document.getElementById('topbar-title');
      const subtitleEl = document.getElementById('topbar-subtitle');
      if (titleEl) titleEl.innerText = dateStr;
      if (subtitleEl) subtitleEl.innerText = 'Detail Riwayat Assessment';
    }
  }, [result?.createdAt, isDetailMode]);

  const getFactorLevel = (val) => {
    if (!val) return 'Tidak diketahui';
    if (val >= 7) return 'Tinggi';
    if (val >= 4) return 'Sedang';
    return 'Rendah';
  };

  const getSleepLevel = (val) => {
    if (!val) return 'Tidak diketahui';
    if (val < 6) return 'Kurang';
    if (val <= 8) return 'Cukup';
    return 'Berlebih';
  };



  const dominantFactors = [
    { label: "Stres", level: getFactorLevel(result?.stress) },
    { label: "Kecemasan", level: getFactorLevel(result?.anxiety) },
    { label: "Tekanan Akademik", level: getFactorLevel(result?.academic_pressure) },
    { label: "Tidur", level: getSleepLevel(result?.sleep_hours) }
  ];

  if (loading) {
    return <LoadingScreen text="Memuat hasil analisis..." />;
  }

  return (
    <div className="p-4 pb-24 md:p-10 md:pb-10 md:px-20 lg:px-32 bg-[#F8FAFC] min-h-screen flex flex-col gap-4 md:gap-6">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-4 md:gap-6">

        {/* Kartu Utama */}
        <ResultCard 
          burnoutLevel={result?.burnout_level} 
          burnoutScore={result?.burnout_score}
        />

        {/* Grid Skor Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 p-4 md:p-6 shadow-sm flex flex-col">
            <div className="mb-4 md:mb-6">
              <h3 className="text-lg font-medium text-neutral-950 leading-7 mb-1">Skor Detail</h3>
              <p className="text-sm text-gray-500">
                Metrik utama dari hasil analisis
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <div className="bg-slate-50 rounded-[10px] border-[0.67px] border-gray-200 p-3 flex items-center justify-between">
                <span className="text-sm text-gray-500">Kategori AI</span>
                <div className={`px-3 py-1 border-[0.67px] rounded-lg ${getBurnoutColor(result?.burnout_level).bg} ${getBurnoutColor(result?.burnout_level).border}`}>
                  <span className={`text-xs font-bold ${getBurnoutColor(result?.burnout_level).text}`}>
                    {formatBurnout(result?.burnout_level)}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-[10px] border-[0.67px] border-gray-200 p-3 flex items-center justify-between">
                <span className="text-sm text-gray-500">Kondisi Mental AI</span>
                <div className={`px-3 py-1 border-[0.67px] rounded-lg ${getMentalColor(result?.Prediction?.mental_health_prediction).bg} ${getMentalColor(result?.Prediction?.mental_health_prediction).border}`}>
                  <span className={`text-xs font-bold ${getMentalColor(result?.Prediction?.mental_health_prediction).text}`}>
                    {formatMental(result?.Prediction?.mental_health_prediction)}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 rounded-[10px] border-[0.67px] border-gray-200 p-3 text-xs text-gray-600 mt-auto leading-relaxed">
                <span className="font-semibold text-gray-800">Insight AI:</span> Berdasarkan hasil analisis, tingkat risiko burnout Anda berada di kategori <b>{formatBurnout(result?.burnout_level)}</b> dengan indikasi kesehatan mental <b>{formatMental(result?.Prediction?.mental_health_prediction)}</b>.
              </div>
            </div>
          </div>

          <FactorBreakdown factors={[
            { label: 'Stres', value: (result?.stress || 0) * 10, level: getFactorLevel(result?.stress), color: 'danger' },
            { label: 'Kecemasan', value: (result?.anxiety || 0) * 10, level: getFactorLevel(result?.anxiety), color: 'warning' },
            { label: 'Beban Akademik', value: (result?.academic_pressure || 0) * 10, level: getFactorLevel(result?.academic_pressure), color: 'indigo' },
          ]} />
        </div>

        {/* Faktor Dominan Burnout */}
        <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 p-4 md:p-6 shadow-sm flex flex-col gap-3 md:gap-4">
          <h3 className="text-lg font-medium text-neutral-950">Faktor Dominan Burnout</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {dominantFactors.map((f, i) => (
              <div key={i} className="bg-slate-50 p-3 rounded-[10px] border-[0.67px] border-gray-200">
                <p className="text-xs text-gray-500 mb-1">{f.label}</p>
                <p className={
                  `text-sm font-semibold ${f.level === 'Tinggi' || f.level === 'Kurang' ? 'text-red-600' : 'text-neutral-950'}`
                }>
                  {f.level}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Todo Generated */}
        <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 p-4 md:p-6 shadow-sm flex flex-col gap-3 md:gap-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-[10px] bg-green-50 flex items-center justify-center">
              <ListChecks size={16} className="text-green-800" />
            </div>
            <h3 className="text-lg font-medium text-neutral-950">To-Do Spesial (Dibuat Otomatis)</h3>
          </div>
          <div className="flex flex-col gap-3">
            {todos.length > 0 ? (
              todos.map(todo => (
                <div key={todo.id} className="p-4 bg-slate-50 border border-slate-200 rounded-[10px] flex items-center gap-4">
                  <div className="w-5 h-5 rounded-md border-2 border-slate-300 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-neutral-950">{todo.title}</p>
                    <p className="text-xs text-gray-500">{todo.description}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic p-4 bg-slate-50 rounded-[10px] border border-slate-200">Tidak ada Todo otomatis yang dibuat.</p>
            )}
          </div>
        </div>

        {/* Rekomendasi List - Mapping Array String Langsung dari Backend */}
        <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 p-4 md:p-6 shadow-sm flex flex-col gap-3 md:gap-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-[10px] bg-primary-50 flex items-center justify-center">
              <Sparkles size={16} className="text-primary-500" />
            </div>
            <h3 className="text-lg font-medium text-neutral-950">Rekomendasi AI</h3>
          </div>
          <div className="flex flex-col gap-3">
            {result?.recommendation?.length > 0 ? (
              result.recommendation.map((item, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-[10px] border-[0.67px] border-gray-200 text-gray-700 leading-relaxed">
                  {item}
                </div>
              ))
            ) : (
              <div className="p-4 bg-slate-50 rounded-[10px] border-[0.67px] border-gray-200 text-gray-500 italic">
                Belum ada rekomendasi.
              </div>
            )}
          </div>
        </div>

        {/* Footer Buttons — Kondisional Menyesuaikan Asal Halaman */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-end gap-3 md:gap-4 mt-2">
          {isDetailMode ? (
            <button
              onClick={() => navigate(ROUTES.HISTORY)}
              className="h-10 md:h-11 px-4 md:px-6 bg-primary-500 text-white rounded-lg md:rounded-[10px] text-sm md:text-base font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} /> Kembali ke Riwayat
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate(ROUTES.HISTORY)}
                className="h-10 md:h-11 px-4 md:px-6 rounded-lg md:rounded-[10px] outline outline-[0.67px] outline-offset-[-0.67px] outline-gray-200 text-neutral-950 text-sm md:text-base font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                Lihat Riwayat <ArrowRight size={16} />
              </button>
              <button
                onClick={handleResetInput}
                className="h-10 md:h-11 px-4 md:px-6 bg-primary-500 rounded-lg md:rounded-[10px] text-white text-sm md:text-base font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw size={16} /> Reset & Input Ulang
              </button>
            </>
          )}
        </div>

      </div>

      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        onConfirm={confirmModal.onConfirm}
        onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
        confirmText="Ya, Reset"
        cancelText="Batal"
        variant="warning"
      />
    </div>
  );
}

export default Result;