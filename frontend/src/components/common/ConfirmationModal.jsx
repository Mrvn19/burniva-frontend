import React from 'react'
import { AlertTriangle } from 'lucide-react'

function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Ya, Lanjutkan",
    cancelText = "Batal",
    icon: Icon = AlertTriangle,
    variant = 'danger'
}) {
    if (!isOpen) return null;

    const colors = {
        danger: {
            bg: 'bg-red-50',
            icon: 'text-red-500',
            button: 'bg-red-500 hover:bg-red-600',
            border: 'border-transparent'
        },
        warning: {
            bg: 'bg-amber-50',
            icon: 'text-amber-500',
            button: 'bg-amber-500 hover:bg-amber-600',
            border: 'border-transparent'
        },
        info: {
            bg: 'bg-blue-50',
            icon: 'text-blue-500',
            button: 'bg-blue-500 hover:bg-blue-600',
            border: 'border-transparent'
        }
    };

    const color = colors[variant] || colors.danger;

    return (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${color.bg}`}>
                    <Icon size={24} className={color.icon} />
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-1">{title}</h3>
                <p className="text-sm text-slate-500 mb-6">{message}</p>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 h-10 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`flex-1 h-10 rounded-xl text-sm text-white font-medium transition-colors border ${color.button} ${color.border}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
