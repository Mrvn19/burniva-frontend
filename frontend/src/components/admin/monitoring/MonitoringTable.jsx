import React, { useState, useMemo, useEffect } from 'react'
import { classNames } from '../../../utils/helpers'
import { formatBurnout, formatMental, getBurnoutColor, getMentalColor } from '../../../utils/format'
import PenggunaPagination from '../pengguna/PenggunaPagination'

function MonitoringTable({ data = [], activePeriod = 'mingguan', onPeriodChange }) {
    const periods = [
        { id: 'semua', label: 'Semua Waktu' },
        { id: 'hari_ini', label: 'Hari ini' },
        { id: 'mingguan', label: 'Mingguan' },
        { id: 'bulanan', label: 'Bulanan' }
    ]

    // Helper for risk badge styling
    const getRiskBadgeStyles = (risk) => {
        const c = getBurnoutColor(risk);
        return `${c.bg} ${c.text} ${c.border}`;
    }

    const getMentalHealthBadgeStyles = (status) => {
        const c = getMentalColor(status);
        return `${c.bg} ${c.text} ${c.border}`;
    }

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    // Reset halaman ke 1 setiap kali periode atau data berubah
    useEffect(() => {
        setCurrentPage(1)
    }, [activePeriod, data])

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return data.slice(startIndex, startIndex + itemsPerPage)
    }, [data, currentPage, itemsPerPage])

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Header Area */}
            <div className="p-6 pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-50">
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Tabel Monitoring Burnout</h2>
                    <p className="text-sm text-slate-500 mt-0.5">Daftar assessment berdasarkan periode</p>
                </div>

                {/* Period Selector Pills */}
                <div className="flex items-center gap-1 bg-slate-50 p-1.5 rounded-2xl border border-slate-100/50 self-start sm:self-center">
                    {periods.map((period) => {
                        const isActive = activePeriod === period.id
                        return (
                            <button
                                key={period.id}
                                onClick={() => onPeriodChange(period.id)}
                                className={classNames(
                                    'px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200',
                                    isActive
                                        ? 'bg-white text-primary-500 shadow-sm border border-slate-100/30'
                                        : 'text-slate-500 hover:text-slate-800'
                                )}
                            >
                                {period.label}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Table Area */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/75 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <th className="py-4 px-6">Nama User</th>
                            <th className="py-4 px-6 text-center">Indeks Risiko</th>
                            <th className="py-4 px-6">Kategori AI</th>
                            <th className="py-4 px-6">Kondisi Mental AI</th>
                            <th className="py-4 px-6">Tanggal Assessment</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100/80">
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="py-10 text-center text-sm text-slate-400 font-medium">
                                    Tidak ada data assessment untuk periode ini.
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((row, index) => (
                                <tr 
                                    key={row.id || index} 
                                    className="hover:bg-slate-50/50 transition-colors duration-150 text-sm"
                                >
                                    <td className="py-4 px-6 font-semibold text-slate-800">
                                        {row.name}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                                            {row.burnoutScore ?? '-'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={classNames(
                                            'px-3 py-1 rounded-full text-xs font-bold border inline-block tracking-wide',
                                            getRiskBadgeStyles(row.risk)
                                        )}>
                                            {formatBurnout(row.risk)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={classNames(
                                            'px-3 py-1 rounded-full text-xs font-bold border inline-block tracking-wide',
                                            getMentalHealthBadgeStyles(row.mentalHealth)
                                        )}>
                                            {formatMental(row.mentalHealth)}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-slate-500">
                                        {row.date}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <PenggunaPagination 
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalItems={data.length}
                itemsPerPage={itemsPerPage}
                itemLabel="assessment"
            />
        </div>
    )
}

export default MonitoringTable
