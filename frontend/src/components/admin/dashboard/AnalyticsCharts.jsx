import { useState } from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    PieChart, Pie, Cell
} from 'recharts'
import { Activity } from 'lucide-react'

function AnalyticsCharts({ trendData = [], distributionData = [] }) {
    const [trendPeriod, setTrendPeriod] = useState('Mingguan')

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Grafik Tren Burnout */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm lg:col-span-2">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-base font-bold text-slate-800">Grafik Tren Burnout</h3>
                        <p className="text-sm text-slate-500">Perubahan tingkat risiko burnout</p>
                    </div>
                    <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                        <button
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors bg-white text-primary-500 shadow-sm border border-slate-200 cursor-default`}
                        >
                            7 Hari Terakhir
                        </button>
                    </div>
                </div>
                
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={trendData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                            <RechartsTooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Line type="monotone" dataKey="value" stroke="#006D5B" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend Custom */}
                <div className="flex justify-center items-center gap-4 mt-6 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full border-[2px] border-emerald-500 bg-white" />
                        <span className="text-xs font-medium text-emerald-500">rendah</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full border-[2px] border-amber-500 bg-white" />
                        <span className="text-xs font-medium text-amber-500">sedang</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full border-[2px] border-red-500 bg-white" />
                        <span className="text-xs font-medium text-red-500">tinggi</span>
                    </div>
                </div>
            </div>

            {/* Distribusi Burnout (Donut Chart) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                <div>
                    <h3 className="text-base font-bold text-slate-800">Distribusi Burnout</h3>
                    <p className="text-sm text-slate-500">Berdasarkan total assessment</p>
                </div>
                
                <div className="flex-1 flex flex-col justify-center min-h-[220px]">
                    {distributionData.reduce((sum, item) => sum + item.value, 0) === 0 ? (
                        <div className="flex flex-col items-center justify-center w-full h-full opacity-50 py-10">
                            <Activity size={32} className="text-slate-400 mb-2" />
                            <p className="text-sm font-medium text-slate-500">Belum ada assessment</p>
                        </div>
                    ) : (
                        <>
                            <div className="h-[200px] w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={distributionData}
                                            innerRadius={65}
                                            outerRadius={85}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {distributionData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <RechartsTooltip 
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Custom Legend */}
                            <div className="flex flex-col gap-3 mt-4 px-2">
                                {distributionData.map((item) => (
                                    <div key={item.name} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                            <span className="text-slate-600">{item.name}</span>
                                        </div>
                                        <span className="font-semibold text-slate-800">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

        </div>
    )
}

export default AnalyticsCharts