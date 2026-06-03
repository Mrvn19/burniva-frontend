import React, { useRef, useState } from 'react'
import { Camera, Pencil, Trash2 } from 'lucide-react'
import Avatar from '../../ui/Avatar'
import ConfirmationModal from '../../common/ConfirmationModal'

function ProfileAvatarCard({ adminName = 'Admin Burniva', email = 'admin@burniva.id', profileImage = null, onImageChange }) {
    const fileInputRef = useRef(null)
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        confirmText: '',
        variant: 'danger',
        onConfirm: () => {}
    })

    const handleCameraClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click()
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]
        if (file && onImageChange) {
            const reader = new FileReader()
            reader.onloadend = () => {
                onImageChange(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const firstLetter = adminName ? adminName.charAt(0).toUpperCase() : 'A'

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col items-center h-full">
            <h3 className="text-base font-bold text-slate-800 self-start mb-6">Foto Profil</h3>
            
            <div className="relative mt-2 w-fit mx-auto">
                {/* Avatar */}
                <div onClick={handleCameraClick} className="cursor-pointer group">
                    <Avatar 
                        src={profileImage} 
                        name={adminName} 
                        size="xl" 
                        className="shadow-inner group-hover:opacity-90 transition-opacity" 
                    />
                </div>
                
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    className="hidden" 
                />

                {/* Tombol Hapus */}
                {profileImage && (
                    <button 
                        onClick={() => {
                            setConfirmModal({
                                isOpen: true,
                                title: 'Hapus Foto Profil',
                                message: 'Hapus foto profil admin?',
                                confirmText: 'Ya, Hapus',
                                variant: 'danger',
                                onConfirm: () => onImageChange(null)
                            });
                        }}
                        className="absolute -top-1 -right-1 w-9 h-9 bg-white border border-red-100 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 hover:text-red-600 shadow-md transition-all z-10 cursor-pointer"
                    >
                        <Trash2 size={16} />
                    </button>
                )}

                {/* Tombol Edit */}
                <button 
                    onClick={handleCameraClick}
                    className="absolute -bottom-1 -right-1 w-9 h-9 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:text-primary-600 hover:border-primary-500 shadow-md transition-all z-10 cursor-pointer"
                >
                    <Pencil size={16} />
                </button>
            </div>

            <h4 className="text-base font-bold text-slate-800 mt-5">{adminName}</h4>
            <p className="text-sm text-slate-500 mt-0.5">{email}</p>

            <span className="mt-5 bg-primary-50 text-primary-700 border border-primary-100/70 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide">
                Admin
            </span>

            <ConfirmationModal 
                {...confirmModal}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
            />
        </div>
    )
}

export default ProfileAvatarCard
