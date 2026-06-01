import React from 'react'
import { User, Mail } from 'lucide-react'

function ProfileAccountInfoCard({ adminName = 'Admin Burniva', email = 'admin@burniva.id', onChangeName, onChangeEmail, errorMsg }) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100/80 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-800">Informasi Akun</h3>
            
            {errorMsg && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 -mt-2">
                    <p className="text-sm font-medium text-red-600">{errorMsg}</p>
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Nama Admin */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Nama Admin</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <User size={18} />
                        </div>
                        <input 
                            type="text"
                            value={adminName}
                            onChange={(e) => onChangeName && onChangeName(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100/70 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/15 focus:border-primary-500 transition-all"
                            placeholder="Masukkan Nama Admin"
                            required
                        />
                    </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Email</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <Mail size={18} />
                        </div>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => onChangeEmail && onChangeEmail(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100/70 rounded-xl pl-11 pr-4 py-3.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/15 focus:border-primary-500 transition-all"
                            placeholder="Masukkan Email Admin"
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileAccountInfoCard
