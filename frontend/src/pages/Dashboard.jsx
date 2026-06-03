import { useState, useEffect } from 'react'
import { Moon, BookOpen, Smile, Activity } from 'lucide-react'
import { getDashboard } from '../services/dashboardService'
import { getTodos } from '../services/todoService'
import useAuthStore from '../store/auth/useAuthStore'
import BurnoutCard from '../components/dashboard/BurnoutCard'
import SummaryCard from '../components/dashboard/SummaryCard'
import ChartSection from '../components/dashboard/ChartSection'
import InsightCard from '../components/dashboard/InsightCard'
import TodoCard from '../components/dashboard/TodoCard'
import LoadingScreen from '../components/common/LoadingScreen'

const getDynamicInsight = (burnoutLevel, mentalHealth) => {
  if (!burnoutLevel) return "Belum ada analisis. Yuk, isi data harianmu hari ini untuk melihat kondisimu!";
  
  const b = burnoutLevel.toLowerCase();
  const m = mentalHealth ? mentalHealth.toLowerCase() : 'baik';

  if (b === 'low' && m === 'baik') return "Kondisi mentalmu hari ini cukup stabil dengan risiko burnout rendah. Pertahankan pola hidup sehat dan keseimbangan aktivitas.";
  if (b === 'low' && m === 'buruk') return "Meski risiko burnout rendah, kesehatan mentalmu sedang kurang baik. Mungkin kamu sedang menghadapi stres personal. Luangkan waktu untuk dirimu sendiri.";
  if (b === 'medium' && m === 'baik') return "Kamu mulai menunjukkan tanda kelelahan ringan. Jangan lupa mengatur waktu istirahat di tengah aktivitas.";
  if (b === 'medium' && m === 'buruk') return "Kondisi burnout kamu berada di level sedang dengan kesehatan mental yang perlu perhatian. Coba luangkan waktu recovery dan kurangi tekanan.";
  if (b === 'high' && m === 'baik') return "Kondisimu cukup kelelahan secara fisik/akademik. Kurangi aktivitas berlebih sebelum memengaruhi mentalmu secara langsung.";
  if (b === 'high' && m === 'buruk') return "Kondisi burnout kamu cukup tinggi hari ini. Burniva sangat menyarankan pemulihan mental, pengurangan tekanan akademik, dan waktu istirahat yang cukup.";

  // Fallback
  return `Kondisi burnout kamu terdeteksi di level ${burnoutLevel}. Perhatikan kesehatan mentalmu.`;
};

const getMood = (score) => {
  if (!score) return "Belum ada";
  if (score <= 30) return "Tenang";
  if (score <= 60) return "Netral";
  return "Lelah";
};

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore(s => s.user);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
      
      const todosData = await getTodos();
      setTodos(todosData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen text="Memuat dashboard..." />
  }

  const doneTodos = todos.filter(t => t.status === 'completed').length;
  const totalTodos = todos.length;

  const summaryCards = [
    {
      icon: <Moon size={18} className="text-violet-500" />,
      iconBg: 'bg-violet-500/10 shadow-sm',
      label: 'Tidur Terakhir',
      value: dashboard?.latest?.sleep_hours ? `${dashboard.latest.sleep_hours} jam` : 'Belum ada',
    },
    {
      icon: <BookOpen size={18} className="text-amber-500" />,
      iconBg: 'bg-amber-500/10 shadow-sm',
      label: 'Fokus Belajar',
      value: dashboard?.latest?.study_hours ? `${dashboard.latest.study_hours} jam` : 'Belum ada',
    },
    {
      icon: <Smile size={18} className="text-emerald-500" />,
      iconBg: 'bg-emerald-500/10 shadow-sm',
      label: 'Mood Harian',
      value: dashboard?.latestPrediction?.mood_today || getMood(dashboard?.latest?.burnout_score),
    },
    {
      icon: <Activity size={18} className="text-red-500" />,
      iconBg: 'bg-red-500/10 shadow-sm',
      label: 'Level Stres',
      value: dashboard?.latest?.stress ? `${dashboard.latest.stress}/10` : 'Belum ada',
    },
  ];

  // Cek apakah data terbaru adalah hari ini
  const hasTodayData = Boolean(
    dashboard?.latest?.createdAt && 
    new Date(dashboard.latest.createdAt).toLocaleDateString() === new Date().toLocaleDateString()
  );

  // Level Stres & Mood (tetap pertahankan jika diperlukan di summary cards, atau pakai data riil)
  // Untuk saat ini kita pertahankan agar tidak error.

  return (
    <div className="flex flex-col gap-6 p-6 w-full max-w-[1200px] mx-auto bg-[#F8FAFC] min-h-screen">
      
      {/* Burnout Hero Card */}
      <BurnoutCard 
        burnoutScore={dashboard?.latest?.burnout_score}
        burnoutPrediction={dashboard?.latestPrediction?.burnout_prediction} 
        mentalHealthPrediction={dashboard?.latestPrediction?.mental_health_prediction} 
        insight={getDynamicInsight(
          dashboard?.latestPrediction?.burnout_prediction, 
          dashboard?.latestPrediction?.mental_health_prediction
        )}
        userName={user?.name}
        hasTodayData={hasTodayData}
      />

      {/* REVISI: 4 Summary Cards (2 Kolom di HP, 4 Kolom di PC) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {summaryCards.map(card => (
          <SummaryCard key={card.label} {...card} />
        ))}
      </div>

      {/* Grafik + Sidebar kanan */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kiri — Grafik (Makan 2 Kolom) */}
        <div className="lg:col-span-2">
          <ChartSection trendData={dashboard?.trend || []} />
        </div>

        {/* Kanan — Insight + Todo */}
        <div className="flex flex-col gap-6">
          <InsightCard 
            insight={dashboard?.latestPrediction?.daily_insight || getDynamicInsight(
              dashboard?.latestPrediction?.burnout_prediction, 
              dashboard?.latestPrediction?.mental_health_prediction
            )}
            hasTodayData={hasTodayData}
          />
          <TodoCard done={doneTodos} total={totalTodos} />
        </div>
      </div>

    </div>
  )
}

export default Dashboard