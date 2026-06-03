import { Eye, Ban, Unlock, Trash2 } from 'lucide-react'
import { formatBurnout, formatMental, getBurnoutColor, getMentalColor } from '../../../utils/format'

// Fungsi pembantu untuk warna badge risiko
const getRiskBadgeColor = (risk) => {
    const c = getBurnoutColor(risk);
    return `${c.bg} ${c.text} ${c.border}`;
}

const getMentalHealthBadgeColor = (status) => {
    const c = getMentalColor(status);
    return `${c.bg} ${c.text} ${c.border}`;
}

function PenggunaTable({ users, isLoading, toggleSuspend, deleteUser, onViewDetail }) {
    return (
        <div className="overflow-x-auto lg:overflow-visible w-full">
            <table className="w-full text-left text-xs md:text-sm table-auto border-collapse min-w-[900px] lg:min-w-0">
                <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-500 font-semibold">
                    <tr>
                        <th className="px-4 py-4 font-semibold text-slate-600">Nama Lengkap</th>
                        <th className="px-4 py-4 font-semibold text-slate-600">Email</th>
                        <th className="px-4 py-4 font-semibold text-slate-600">Universitas</th>
                        <th className="px-4 py-4 font-semibold text-slate-600 text-center">Semester</th>
                        <th className="px-4 py-4 font-semibold text-slate-600 text-center">Indeks Risiko</th>
                        <th className="px-4 py-4 font-semibold text-slate-600 text-center">Kategori AI</th>
                        <th className="px-4 py-4 font-semibold text-slate-600 text-center">Kondisi Mental AI</th>
                        <th className="px-4 py-4 font-semibold text-slate-600 text-center w-[120px]">Aksi</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                    {isLoading ? (
                        <tr>
                            <td colSpan="7" className="px-4 py-12 text-center text-slate-400 font-medium">
                                Sedang memuat data pengguna...
                            </td>
                        </tr>
                    ) : users.length === 0 ? (
                        <tr>
                            <td colSpan="7" className="px-4 py-12 text-center text-slate-400">
                                Tidak ada data pengguna yang ditemukan.
                            </td>
                        </tr>
                    ) : (
                        users.map((user) => (
                            <tr key={user.id} className={`hover:bg-slate-50/30 transition-colors ${user.isSuspended ? 'bg-slate-50/60 opacity-70' : ''}`}>
                                <td className="px-4 py-4 font-bold text-slate-800 whitespace-nowrap">{user.name}</td>
                                <td className="px-4 py-4 text-slate-500 font-medium whitespace-nowrap">{user.email}</td>
                                <td className="px-4 py-4 text-slate-500 whitespace-nowrap lg:whitespace-normal">{user.univ}</td>
                                <td className="px-4 py-4 text-center text-slate-500">{user.semester}</td>
                                <td className="px-4 py-4 text-center">
                                    <span className="font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                                        {user.lastBurnout ?? '-'}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold border ${getRiskBadgeColor(user.risk)}`}>
                                        {formatBurnout(user.risk)}
                                    </span>
                                </td>
                                <td className="px-4 py-4 text-center">
                                    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold border ${getMentalHealthBadgeColor(user.mentalHealth)}`}>
                                        {formatMental(user.mentalHealth)}
                                    </span>
                                </td>

                                {/* Sel Aksi */}
                                <td className="px-4 py-4">
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => onViewDetail && onViewDetail(user)}
                                            className="text-primary-500 hover:opacity-80 transition-opacity"
                                            title="Lihat Detail"
                                        >
                                            <Eye size={18} className="stroke-[2.25]" />
                                        </button>

                                        {user.isSuspended ? (
                                            <button
                                                onClick={() => toggleSuspend(user.id)}
                                                className="text-[#10b981] hover:opacity-80 transition-opacity"
                                                title="Buka Suspend"
                                            >
                                                <Unlock size={18} className="stroke-[2.25]" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => toggleSuspend(user.id)}
                                                className="text-[#f59e0b] hover:opacity-80 transition-opacity"
                                                title="Suspend Pengguna"
                                            >
                                                <Ban size={18} className="stroke-[2.25]" />
                                            </button>
                                        )}

                                        <button
                                            onClick={() => deleteUser(user.id)}
                                            className="text-[#ef4444] hover:opacity-80 transition-opacity"
                                            title="Hapus Pengguna"
                                        >
                                            <Trash2 size={18} className="stroke-[2.25]" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PenggunaTable
