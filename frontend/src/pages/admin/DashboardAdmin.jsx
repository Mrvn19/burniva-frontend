import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import StatsCards from '../../components/admin/dashboard/StatsCards'
import AnalyticsCharts from '../../components/admin/dashboard/AnalyticsCharts'
import RecentActivities from '../../components/admin/dashboard/RecentActivities'
import adminService from '../../services/admin/adminService'
import LoadingScreen from '../../components/common/LoadingScreen'

function DashboardAdmin() {
    const [stats, setStats] = useState(null)
    const [analytics, setAnalytics] = useState(null)
    const [activities, setActivities] = useState([])
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [loading, setLoading] = useState(true)

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
            setLoading(false)
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

    if (loading) {
        return <LoadingScreen text="Memuat metrik sistem..." />
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">

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