import { Users, UserCheck, ClipboardList, Sparkles, AlertTriangle, AlertCircle, ShieldCheck } from 'lucide-react'

// --- KOMPONEN KARTU STATISTIK ---
const StatCard = ({ icon: Icon, value, label, iconColor, iconBg }) => (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
            <Icon size={20} className={iconColor} />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-1">{value}</h3>
        <p className="text-sm text-slate-500">{label}</p>
    </div>
)

function StatsCards({ stats }) {
    const data = stats || {
        totalUsers: 0,
        activeToday: 0,
        totalAssessments: 0,
        aiPredictions: 0,
        burnoutTinggi: 0,
        burnoutSedang: 0,
        burnoutRendah: 0
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Baris 1: 4 Kartu */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Users} value={data.totalUsers} label="Total Pengguna" iconColor="text-primary-500" iconBg="bg-primary-50" />
                <StatCard icon={UserCheck} value={data.activeToday} label="Pengguna Aktif Hari Ini" iconColor="text-primary-500" iconBg="bg-primary-50" />
                <StatCard icon={ClipboardList} value={data.totalAssessments} label="Total Assessment" iconColor="text-primary-500" iconBg="bg-primary-50" />
                <StatCard icon={Sparkles} value={data.aiPredictions} label="Prediksi AI Hari Ini" iconColor="text-primary-500" iconBg="bg-primary-50" />
            </div>
            {/* Baris 2: 3 Kartu */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard icon={AlertTriangle} value={data.burnoutTinggi} label="Burnout Tinggi" iconColor="text-red-500" iconBg="bg-red-50" />
                <StatCard icon={AlertCircle} value={data.burnoutSedang} label="Burnout Sedang" iconColor="text-amber-500" iconBg="bg-amber-50" />
                <StatCard icon={ShieldCheck} value={data.burnoutRendah} label="Burnout Rendah" iconColor="text-emerald-500" iconBg="bg-emerald-50" />
            </div>
        </div>
    )
}

export default StatsCards