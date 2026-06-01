import React, { useState } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'

function ProfileSecurityCard({ oldPassword = '', newPassword = '', confirmPassword = '', onChangeOld, onChangeNew, onChangeConfirm, errorMsg }) {
    const [showOld, setShowOld] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100/80 shadow-sm space-y-5">
            <h3 className="text-base font-bold text-slate-800">Keamanan</h3>
            
            {errorMsg && (
                <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 -mt-2">
                    <p className="text-sm font-medium text-red-600">{errorMsg}</p>
                </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Password Lama */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Password Lama</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <Lock size={18} />
                        </div>
                        <input 
                            type={showOld ? "text" : "password"}
                            value={oldPassword}
                            onChange={(e) => onChangeOld && onChangeOld(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100/70 rounded-xl pl-11 pr-11 py-3.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/15 focus:border-primary-500 transition-all"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowOld(!showOld)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Password Baru */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Password Baru</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <Lock size={18} />
                        </div>
                        <input 
                            type={showNew ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => onChangeNew && onChangeNew(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100/70 rounded-xl pl-11 pr-11 py-3.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/15 focus:border-primary-500 transition-all"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew(!showNew)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>

                {/* Konfirmasi Password */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-600">Konfirmasi Password</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                            <Lock size={18} />
                        </div>
                        <input 
                            type={showConfirm ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => onChangeConfirm && onChangeConfirm(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100/70 rounded-xl pl-11 pr-11 py-3.5 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/15 focus:border-primary-500 transition-all"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileSecurityCard
