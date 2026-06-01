import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import StatsCards from '../../components/admin/dashboard/StatsCards'
import AnalyticsCharts from '../../components/admin/dashboard/AnalyticsCharts'
import RecentActivities from '../../components/admin/dashboard/RecentActivities'
import adminService from '../../services/admin/adminService'

function DashboardAdmin() {
    const [stats, setStats] = useState(null)
    const [analytics, setAnalytics] = useState(null)
    const [activities, setActivities] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)

    const fetchData = async () => {
        try {
            setIsRefreshing(true)
                const statsData = await adminService.getStats()
                setStats(statsData)

                const analyticsData = await adminService.getAnalyticsData()
                setAnalytics(analyticsData)

                const activitiesData = await adminService.getRecentActivities()
                setActivities(activitiesData)
            } catch (error) {
            console.error("Failed to fetch dashboard data", error)
        } finally {
            setIsRefreshing(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    // Sinkronisasi distributionData dengan nilai stats (Rendah, Sedang, Tinggi)
    const syncDistributionData = () => {
        if (!stats) return analytics?.distributionData || []
        return [
            { name: 'Rendah', value: stats.burnoutRendah, color: '#10b981' },
            { name: 'Sedang', value: stats.burnoutSedang, color: '#f59e0b' },
            { name: 'Tinggi', value: stats.burnoutTinggi, color: '#ef4444' }
        ]
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Dashboard Admin</h1>
                    <p className="text-sm md:text-base text-slate-500">Pantau metrik dan aktivitas pengguna hari ini.</p>
                </div>
                <button 
                    onClick={fetchData} 
                    disabled={isRefreshing}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
                >
                    <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
                    <span className="hidden sm:inline">Refresh Data</span>
                </button>
            </div>
            
            <StatsCards stats={stats} />
            <AnalyticsCharts trendData={analytics?.trendData} distributionData={syncDistributionData()} />
            <RecentActivities 
                activityData={analytics?.activityData} 
                activities={activities.length > 0 ? activities : []} 
            />
        </div>
    )
}

export default DashboardAdmin