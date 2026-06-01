import React from 'react'
import { X, User, Mail, GraduationCap, Calendar, BarChart3, Moon, Activity, Trash2, Ban, Unlock } from 'lucide-react'

const getRiskColor = (risk) => {
    const l = (risk || '').toLowerCase();
    if (l === 'high' || l === 'tinggi') {
        return { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', dot: 'bg-red-500' };
    }
    if (l === 'medium' || l === 'sedang') {
        return { text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100', dot: 'bg-amber-500' };
    }
    if (l === 'low' || l === 'rendah') {
        return { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', dot: 'bg-emerald-500' };
    }
    return { text: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-100', dot: 'bg-slate-500' };
}

const getMentalHealthColor = (status) => {
    const s = (status || '').toLowerCase();
    if (s === 'baik') {
        return { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100', dot: 'bg-emerald-500' };
    }
    if (s === 'buruk') {
        return { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100', dot: 'bg-red-500' };
    }
    return { text: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-100', dot: 'bg-slate-500' };
}

function UserDetailModal({ user, onClose, onToggleSuspend, onDelete, onResetInput }) {
    if (!user) return null

    const burnoutColors = getRiskColor(user.risk)
    const mentalColors = getMentalHealthColor(user.mentalHealth)

    // Generate mock academic & lifestyle load for detail page completeness
    const mockDetails = {
        studyHours: user.studyHours || (user.id % 2 === 0 ? 5 : 7),
        sleepHours: user.sleepHours || (user.id % 3 === 0 ? 5.5 : 7.2),
        socialStress: user.socialStress || (user.id % 4 === 0 ? 'Tinggi' : 'Normal'),
        academicLoad: user.academicLoad || (user.id % 2 === 0 ? 'Sangat Berat' : 'Sedang'),
    }

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
                
                {/* Header Modal */}
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Detail Pengguna</h3>
                        <p className="text-xs text-slate-400 mt-0.5">ID Pengguna: #{user.id}</p>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-1.5 rounded-xl border border-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Content Modal (Scrollable) */}
                <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
                    
                    {/* Profil Singkat */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100/50">
                        <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center text-white text-2xl font-bold shadow-sm">
                            {user.name.charAt(0)}
                        </div>
                        <div className="text-center sm:text-left flex-1">
                            <h4 className="text-lg font-bold text-slate-800 leading-tight">{user.name}</h4>
                            <p className="text-sm text-slate-400 font-medium flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                                <Mail size={13} /> {user.email}
                            </p>
                        </div>
                        <div className="shrink-0">
                            {user.isSuspended ? (
                                <span className="bg-red-50 text-red-500 border border-red-100 rounded-full px-3 py-1 text-xs font-bold tracking-wide">
                                    Suspended
                                </span>
                            ) : (
                                <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full px-3 py-1 text-xs font-bold tracking-wide">
                                    Aktif
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Informasi Akademis */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                <GraduationCap size={20} />
                            </div>
                            <div>
                                <span className="text-xs text-slate-400 font-medium">Universitas</span>
                                <p className="text-sm font-semibold text-slate-800 mt-0.5">{user.univ}</p>
                            </div>
                        </div>

                        <div className="border border-slate-100 rounded-2xl p-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500 shrink-0">
                                <Calendar size={20} />
                            </div>
                            <div>
                                <span className="text-xs text-slate-400 font-medium">Semester</span>
                                <p className="text-sm font-semibold text-slate-800 mt-0.5">Semester {user.semester}</p>
                            </div>
                        </div>
                    </div>

                    {/* Status AI Output */}
                    <div className="border border-slate-100 rounded-2xl p-5 space-y-4">
                        <div className="flex justify-between items-center mb-1">
                            <h5 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                                <BarChart3 size={16} className="text-slate-400" />
                                Hasil Analisis AI Terakhir
                            </h5>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-4">
                                <span className="text-xs text-slate-400 font-medium uppercase tracking-wide block mb-2">Prediksi Burnout</span>
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${burnoutColors.bg} ${burnoutColors.border}`}>
                                    <div className={`w-2 h-2 rounded-full ${burnoutColors.dot}`} />
                                    <span className={`text-xs font-bold ${burnoutColors.text}`}>{user.risk}</span>
                                </div>
                            </div>
                            <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-4">
                                <span className="text-xs text-slate-400 font-medium uppercase tracking-wide block mb-2">Kesehatan Mental</span>
                                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border ${mentalColors.bg} ${mentalColors.border}`}>
                                    <div className={`w-2 h-2 rounded-full ${mentalColors.dot}`} />
                                    <span className={`text-xs font-bold ${mentalColors.text}`}>{user.mentalHealth}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Faktor Tambahan & Kebiasaan */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-slate-50/50 rounded-2xl p-3 text-center border border-slate-100/50">
                            <Moon size={16} className="text-violet-500 mx-auto mb-1.5" />
                            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Jam Tidur</span>
                            <span className="text-sm font-bold text-slate-700 block mt-0.5">{mockDetails.sleepHours} jam</span>
                        </div>

                        <div className="bg-slate-50/50 rounded-2xl p-3 text-center border border-slate-100/50">
                            <Activity size={16} className="text-amber-500 mx-auto mb-1.5" />
                            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Jam Belajar</span>
                            <span className="text-sm font-bold text-slate-700 block mt-0.5">{mockDetails.studyHours} jam</span>
                        </div>

                        <div className="bg-slate-50/50 rounded-2xl p-3 text-center border border-slate-100/50">
                            <span className="text-sm font-bold text-red-500 block mb-1.5 leading-none">🧠</span>
                            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Beban Kuliah</span>
                            <span className="text-xs font-bold text-slate-700 block mt-1">{mockDetails.academicLoad}</span>
                        </div>

                        <div className="bg-slate-50/50 rounded-2xl p-3 text-center border border-slate-100/50">
                            <span className="text-sm font-bold text-blue-500 block mb-1.5 leading-none">👥</span>
                            <span className="text-[10px] text-slate-400 font-semibold block uppercase">Tekanan Sosial</span>
                            <span className="text-sm font-bold text-slate-700 block mt-0.5">{mockDetails.socialStress}</span>
                        </div>
                    </div>

                </div>

                {/* Footer Modal (Aksi) */}
                <div className="px-6 py-5 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-between items-center">
                    {/* Aksi Berbahaya (Suspend / Hapus / Reset) */}
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => { onResetInput(user.id); }}
                            className="flex-1 sm:flex-initial h-10 px-4 rounded-xl border border-blue-200 bg-blue-50 text-blue-600 text-sm font-semibold hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            <Calendar size={14} /> Reset Input Hari Ini
                        </button>
                        {user.isSuspended ? (
                            <button
                                onClick={() => { onToggleSuspend(user.id); }}
                                className="flex-1 sm:flex-initial h-10 px-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600 text-sm font-semibold hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <Unlock size={14} /> Aktifkan User
                            </button>
                        ) : (
                            <button
                                onClick={() => { onToggleSuspend(user.id); }}
                                className="flex-1 sm:flex-initial h-10 px-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-600 text-sm font-semibold hover:bg-amber-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <Ban size={14} /> Suspend User
                            </button>
                        )}
                        <button
                            onClick={() => { onDelete(user.id); onClose(); }}
                            className="flex-1 sm:flex-initial h-10 px-4 rounded-xl border border-red-200 bg-red-50 text-red-500 text-sm font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            <Trash2 size={14} /> Hapus Akun
                        </button>
                    </div>

                    <button 
                        onClick={onClose}
                        className="w-full sm:w-auto h-10 px-6 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold transition-all cursor-pointer"
                    >
                        Tutup Detail
                    </button>
                </div>

            </div>
        </div>
    )
}

export default UserDetailModal
