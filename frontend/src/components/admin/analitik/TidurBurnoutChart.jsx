import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Cell } from 'recharts'
import { Moon } from 'lucide-react'

function TidurBurnoutChart({ sleepData = [] }) {
    // Custom Tooltip
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload
            return (
                <div className="bg-white p-3 border border-slate-100 shadow-lg rounded-xl text-sm">
                    <p className="font-bold text-slate-800 mb-1">{data.label}</p>
                    <p className="text-slate-600 mb-0.5">
                        <span className="font-semibold text-primary-600">{data.averageScore}</span> Poin (Rata-rata)
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                        Dari total <span className="font-semibold">{data.count}</span> assessment
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-[380px]">
            <div>
                <h3 className="text-base font-bold text-slate-800">Rata-rata Burnout berdasarkan Durasi Tidur</h3>
                <p className="text-sm text-slate-500">Perbandingan rata-rata indeks risiko burnout berdasarkan kelompok jam tidur</p>
            </div>

            <div className="flex-1 w-full mt-4 min-h-[220px]">
                {sleepData.length === 0 || sleepData.every(d => d.count === 0) ? (
                    <div className="flex flex-col items-center justify-center w-full h-full opacity-50">
                        <Moon size={32} className="text-slate-400 mb-2" />
                        <p className="text-sm font-medium text-slate-500">Belum ada data korelasi</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sleepData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="label" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
                                dy={10} 
                            />
                            <YAxis 
                                dataKey="averageScore"
                                domain={[0, 100]}
                                ticks={[0, 25, 50, 75, 100]}
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 11 }} 
                                dx={-5}
                            />
                            <RechartsTooltip cursor={{ fill: '#f8fafc' }} content={<CustomTooltip />} />
                            <Bar 
                                dataKey="averageScore" 
                                radius={[6, 6, 0, 0]}
                                barSize={40}
                            >
                                {sleepData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.averageScore > 50 ? '#f59e0b' : '#0f766e'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    )
}

export default TidurBurnoutChart
