import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, CalendarCheck, Calendar } from 'lucide-react'
import { ROUTES } from '../utils/constants'
import StepIndicator from '../components/form/StepIndicator'
import MentalStep from '../components/form/MentalStep'
import AcademicStep from '../components/form/AcademicStep'
import LifestyleStep from '../components/form/LifestyleStep'
import ReviewStep from '../components/form/ReviewStep'
import LoadingScreen from '../components/common/LoadingScreen'
import { createAssessment } from '../services/assessmentService'
import { getDashboard } from '../services/dashboardService'
import { motion } from 'framer-motion'

function Input() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  
  // Status UX
  const [isChecking, setIsChecking] = useState(true)
  const [isLocked, setIsLocked] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const [formData, setFormData] = useState({
    stress: 5,
    anxiety: 5,
    emotional_pressure: 5,
    academic_pressure: 5,
    study_hours: 0,
    sleep_hours: 0,
    financial_pressure: 5,
    family_expectation: 5,
    social_support: 5,
    activity_hours: 0,
    mood_today: 'Biasa'
  });

  // Validasi awal (Silent Check)
  useEffect(() => {
    const checkDailyInput = async () => {
      try {
        const data = await getDashboard();
        if (data?.latest?.createdAt) {
          const latestDate = new Date(data.latest.createdAt).toLocaleDateString();
          const todayDate = new Date().toLocaleDateString();
          
          if (latestDate === todayDate) {
            setIsLocked(true);
            return;
          }
        }
      } catch (error) {
        console.error('Gagal mengecek status input harian:', error);
      } finally {
        // Beri sedikit jeda agar transisi loading terlihat elegan (opsional)
        setTimeout(() => setIsChecking(false), 800);
      }
    };
    checkDailyInput();
  }, []);

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
    else navigate(ROUTES.DASHBOARD)
  }

  const handleAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      const result = await createAssessment(formData);
      localStorage.setItem("analysisResult", JSON.stringify(result));
      navigate(ROUTES.RESULT);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Gagal melakukan analisis");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 1. STATE: LOADING (Mengecek Status)
  if (isChecking) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl p-8 max-w-md w-full shadow-[0px_10px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col items-center text-center"
        >
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
            <div className="absolute inset-0 rounded-full border-4 border-primary-500 border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldCheck className="text-primary-500 w-8 h-8" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Mengecek Status Harian...</h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Kami sedang memverifikasi apakah kamu sudah melakukan assessment hari ini.
          </p>
        </motion.div>
      </div>
    )
  }

  // 2. STATE: LOCKED (Sudah Isi Hari Ini)
  if (isLocked) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC] p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-[0px_20px_40px_-10px_rgba(0,0,0,0.08)] border border-slate-100"
        >
          {/* Header Graphic */}
          <div className="bg-primary-500 p-8 flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-700/20 rounded-full blur-xl -ml-10 -mb-10" />
            
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center relative z-10 mb-4"
            >
              <CheckCircle2 className="w-10 h-10 text-primary-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white relative z-10 text-center">✅ Cek Harian Hari Ini Sudah Selesai</h2>
          </div>

          {/* Content */}
          <div className="p-8">
            <p className="text-slate-600 text-center text-sm leading-relaxed mb-6">
              Terima kasih sudah meluangkan waktu untuk mengecek kondisi mentalmu hari ini. Burniva telah merekam assessment harianmu dan sedang membantu menganalisis kondisi burnout berdasarkan jawaban yang diberikan. Kamu bisa melakukan check-in kembali besok untuk menjaga konsistensi pemantauan kesehatan mental.
            </p>

            {/* Info Card */}
            <div className="bg-slate-50 rounded-2xl p-4 mb-8 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-100">
                  <Calendar className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Tanggal Assessment</p>
                  <p className="text-sm font-bold text-slate-800">{new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold tracking-wide uppercase">Terekam</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => navigate(ROUTES.RESULT)}
                className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <Activity size={18} />
                Lihat Analisis Hari Ini
              </button>
              <button 
                onClick={() => navigate(ROUTES.DASHBOARD)}
                className="w-full h-12 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl border border-slate-200 transition-all flex items-center justify-center"
              >
                Kembali ke Dashboard
              </button>
              <button 
                onClick={() => navigate(ROUTES.HISTORY)}
                className="w-full mt-1 text-sm text-slate-400 hover:text-primary-500 font-medium transition-colors"
              >
                Riwayat Assessment
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  // 3. STATE: MENGANALISIS (Saat submit)
  if (isAnalyzing) {
    return <LoadingScreen text="Menganalisis data kamu..." />
  }

  // 4. STATE: FORM INPUT NORMAL
  return (
    <div className="p-3 pb-24 md:p-10 md:pb-10 w-full max-w-4xl mx-auto min-h-screen bg-[#F8FAFC] flex flex-col pt-6 md:pt-12">
      
      {/* 🧠 HEADER & EDUCATIONAL INFO */}
      <div className="mb-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-2">
            🧠 Cek Harian
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">
            Lakukan assessment kesehatan mental harian untuk membantu Burniva menganalisis tingkat burnout dan memberikan rekomendasi terbaik untukmu.
          </p>
        </div>

        {/* Mini Info Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-400">🕒 Waktu Pengisian</span>
            <span className="text-sm font-semibold text-slate-800">± 2–3 menit</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-400">📅 Frekuensi</span>
            <span className="text-sm font-semibold text-slate-800">1 kali setiap hari</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-400">🧠 Tujuan</span>
            <span className="text-sm font-semibold text-slate-800">Analisis burnout</span>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-400">✨ Benefit</span>
            <span className="text-sm font-semibold text-slate-800">Insight & To-Do AI</span>
          </div>
        </div>

        {/* Educational Notice */}
        <div className="bg-primary-50/50 border border-primary-100 p-5 rounded-2xl">
          <h3 className="text-sm font-bold text-primary-700 mb-1">Kenapa perlu cek harian?</h3>
          <p className="text-sm text-primary-600/80 leading-relaxed">
            Assessment harian membantu Burniva memahami pola kesehatan mentalmu dari waktu ke waktu. Semakin rutin kamu mengisi check-in harian, semakin akurat insight burnout dan rekomendasi AI yang diberikan.
          </p>
        </div>
      </div>

      {/* FORM SECTION */}
      <StepIndicator currentStep={step} />
      <div className="bg-white rounded-2xl border-[0.67px] border-gray-200 shadow-sm p-4 md:p-10 flex flex-col gap-5 md:gap-10">
        <div className="py-2">
          {step === 1 && <MentalStep formData={formData} setFormData={setFormData} />}
          {step === 2 && <AcademicStep formData={formData} setFormData={setFormData} />}
          {step === 3 && <LifestyleStep formData={formData} setFormData={setFormData} />}
          {step === 4 && <ReviewStep formData={formData} setFormData={setFormData} />}
        </div>
        <div className="flex items-center justify-between pt-6 border-t-[0.67px] border-gray-200">
          <button
            onClick={handleBack}
            className="h-10 md:h-11 min-w-[90px] md:min-w-[112px] px-4 md:px-6 rounded-lg md:rounded-[10px] outline outline-[0.67px] outline-offset-[-0.67px] outline-gray-200 text-neutral-950 text-sm md:text-base font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            {step === 1 ? 'Batal' : 'Kembali'}
          </button>
          {step < 4 ? (
            <button
              onClick={handleNext}
              className="h-10 md:h-11 min-w-[90px] md:min-w-[112px] px-4 md:px-6 bg-primary-500 rounded-lg md:rounded-[10px] text-white text-sm md:text-base font-medium hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
            >
              Lanjut
            </button>
          ) : (
            <button
              onClick={handleAnalysis}
              disabled={isAnalyzing}
              className="h-10 md:h-11 px-5 md:px-8 bg-primary-500 rounded-lg md:rounded-[10px] text-white text-sm md:text-base font-medium hover:bg-primary-700 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Analisis Sekarang
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Input