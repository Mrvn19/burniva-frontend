import React, { useState, useEffect, useMemo } from 'react'
import MonitoringStats from '../../components/admin/monitoring/MonitoringStats'
import MonitoringTable from '../../components/admin/monitoring/MonitoringTable'
import adminService from '../../services/admin/adminService'

function MonitoringAdmin() {
    const [activePeriod, setActivePeriod] = useState('semua')
    const [activeData, setActiveData] = useState([])
    const [isDownloading, setIsDownloading] = useState(false)

    useEffect(() => {
        const fetchMonitoringData = async () => {
            try {
                const data = await adminService.getMonitoringData(activePeriod)
                setActiveData(data)
            } catch (error) {
                console.error("Gagal mengambil data monitoring", error)
            }
        }
        fetchMonitoringData()
    }, [activePeriod])

    // Hitung jumlah statistik secara dinamis berdasarkan data aktif
    const stats = useMemo(() => {
        return activeData.reduce((acc, curr) => {
            const risk = (curr.risk || '').toLowerCase()
            if (risk === 'tinggi' || risk === 'high') acc.tinggi++
            else if (risk === 'sedang' || risk === 'medium') acc.sedang++
            else if (risk === 'rendah' || risk === 'low') acc.rendah++
            return acc
        }, { tinggi: 0, sedang: 0, rendah: 0 })
    }, [activeData])

    const handleDownload = async () => {
        try {
            setIsDownloading(true)
            const blob = await adminService.downloadReport()
            
            // Create a fake URL for the blob
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `Laporan_Burniva_${new Date().toISOString().split('T')[0]}.csv`
            
            // Trigger click
            document.body.appendChild(a)
            a.click()
            
            // Cleanup
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error("Gagal mengunduh laporan CSV:", error)
            alert("Terjadi kesalahan saat mengunduh laporan.")
        } finally {
            setIsDownloading(false)
        }
    }

    const handleDownloadExcel = async () => {
        try {
            setIsDownloading(true)
            const blob = await adminService.downloadExcelReport()
            
            // Create a fake URL for the blob
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `Laporan_Burniva_${new Date().toISOString().split('T')[0]}.xlsx`
            
            // Trigger click
            document.body.appendChild(a)
            a.click()
            
            // Cleanup
            document.body.removeChild(a)
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error("Gagal mengunduh laporan Excel:", error)
            alert("Terjadi kesalahan saat mengunduh laporan Excel.")
        } finally {
            setIsDownloading(false)
        }
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300">
            {/* Kartu Statistik Burnout */}
            <MonitoringStats 
                tinggiCount={stats.tinggi} 
                sedangCount={stats.sedang} 
                rendahCount={stats.rendah} 
            />

            {/* Bagian Tabel & Tombol Download */}
            <div className="flex flex-col gap-4">
                <div className="flex justify-end gap-3">
                    <button 
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDownloading ? '...' : 'Unduh CSV'}
                    </button>
                    <button 
                        onClick={handleDownloadExcel}
                        disabled={isDownloading}
                        className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isDownloading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        )}
                        {isDownloading ? 'Mengunduh...' : 'Unduh Excel (.xlsx)'}
                    </button>
                </div>
                
                {/* Tabel Monitoring Burnout */}
                <MonitoringTable 
                    data={activeData} 
                    activePeriod={activePeriod} 
                    onPeriodChange={setActivePeriod} 
                />
            </div>
        </div>
    )
}

export default MonitoringAdmin
