import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'
import { Users } from 'lucide-react'

function PertumbuhanPenggunaChart({ growthData = [] }) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col h-[380px] w-full">
            <div>
                <h3 className="text-base font-bold text-slate-800">Total Pengguna Terdaftar</h3>
                <p className="text-sm text-slate-500">Akumulasi jumlah pengguna yang terdaftar dari waktu ke waktu</p>
            </div>

            <div className="flex-1 w-full mt-4 min-h-[220px]">
                {growthData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center w-full h-full opacity-50">
                        <Users size={32} className="text-slate-400 mb-2" />
                        <p className="text-sm font-medium text-slate-500">Belum ada data pertumbuhan</p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                                dataKey="name" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 11 }} 
                                dy={10} 
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: '#94a3b8', fontSize: 11 }} 
                                dx={-5}
                            />
                            <RechartsTooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                formatter={(value) => [`${value} Pengguna`, 'Total Terdaftar']}
                            />
                            <Line 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#0f766e" 
                                strokeWidth={2.5} 
                                dot={{ stroke: '#0f766e', strokeWidth: 2.5, fill: '#fff', r: 4 }}
                                activeDot={{ r: 6, strokeWidth: 0, fill: '#0f766e' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    )
}

export default PertumbuhanPenggunaChart
