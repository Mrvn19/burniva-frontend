import { MoreHorizontal, Activity } from 'lucide-react'
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts'
import Avatar from '../../ui/Avatar'

function RecentActivities({ activityData = [], activities = [] }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
            
            {/* Aktivitas Pengguna (Bar Chart) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm lg:col-span-2">
                <div className="mb-6">
                    <h3 className="text-base font-bold text-slate-800">Aktivitas Pengguna</h3>
                    <p className="text-sm text-slate-500">Dalam 7 hari terakhir</p>
                </div>
                
                <div className="h-[250px] w-full">
                    {activityData.length === 0 ? (
                        <div className="flex flex-col items-center justify-center w-full h-full opacity-50">
                            <Activity size={32} className="text-slate-400 mb-2" />
                            <p className="text-sm font-medium text-slate-500">Belum ada aktivitas minggu ini</p>
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <RechartsTooltip 
                                    cursor={{ fill: '#f8fafc' }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="value" fill="#006D5B" radius={[4, 4, 0, 0]} barSize={45} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Aktivitas Terbaru (List) */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-base font-bold text-slate-800">Aktivitas Terbaru</h3>
                    <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={20} />
                    </button>
                </div>
                
                <div className="flex flex-col gap-5 flex-1 overflow-y-auto">
                    {activities.length === 0 ? (
                        <div className="flex flex-col items-center justify-center flex-1 text-center opacity-50 py-10">
                            <Activity size={32} className="text-slate-400 mb-2" />
                            <p className="text-sm font-medium text-slate-500">Belum ada aktivitas</p>
                        </div>
                    ) : (
                        activities.map((act) => (
                            <div key={act.id} className="flex items-start gap-3">
                                <Avatar 
                                    src={act.photoUrl} 
                                    name={act.name} 
                                    size="sm" 
                                    className="w-9 h-9 text-sm flex-shrink-0 mt-0.5 shadow-sm"
                                />
                                <div>
                                    <p className="text-sm text-slate-700 leading-snug">
                                        <span className="font-bold text-slate-900">{act.name}</span> {act.action}
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">{
                                        new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }).format(new Date(act.time))
                                    }</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

        </div>
    )
}

export default RecentActivities