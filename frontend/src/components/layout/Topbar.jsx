import { useState, useRef, useEffect } from 'react'
import { Menu, User, LogOut, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'
import { classNames, getInitials } from '../../utils/helpers'
import useAuthStore from '../../store/auth/useAuthStore'
import Avatar from '../../components/ui/Avatar'

// (Notifikasi dihapus — fitur tidak digunakan)

function Topbar({ onToggleSidebar, title, subtitle, show = true }) {
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)

  const profileRef = useRef(null)

  const user = useAuthStore(s => s.user)
  const initials = getInitials(user?.name || 'U')

  // Tutup dropdown profile kalau klik di luar
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Notifikasi dihapus — tidak ada fungsi terkait

  const handleLogout = () => {
    useAuthStore.getState().clearAuth()
    navigate(ROUTES.LOGIN)
  }

  return (
    <>
      {/* REVISI DI SINI: Menerapkan animasi h-0 dan h-16 berdasarkan prop 'show'. lg: memastikan di desktop selalu tampil */}
      <header className={classNames(
        "bg-white flex items-center justify-between px-4 md:px-6 z-40 transition-all duration-300 ease-in-out shrink-0",
        show 
          ? "h-16 opacity-100 border-b border-slate-100 pointer-events-auto" 
          : "h-0 opacity-0 border-transparent pointer-events-none lg:h-16 lg:opacity-100 lg:border-b lg:border-slate-100 lg:pointer-events-auto"
      )}>

        {/* Kiri */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={20} />
          </button>
          <div>
            <h1 id="topbar-title" className="text-base font-semibold text-slate-800 leading-tight">{title}</h1>
            {subtitle ? <p id="topbar-subtitle" className="text-xs text-slate-400">{subtitle}</p> : <p id="topbar-subtitle" className="text-xs text-slate-400"></p>}
          </div>
        </div>

        {/* Kanan */}
        <div className="flex items-center gap-1">

          {/* Notifikasi dihapus */}

          {/* Avatar & Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setProfileOpen(!profileOpen) }}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <Avatar src={user?.profile_image} name={user?.name} size="sm" />
              <ChevronDown
                size={14}
                className={classNames(
                  'text-slate-400 transition-transform duration-200',
                  profileOpen && 'rotate-180'
                )}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-12 w-44 bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden z-50">
                <button
                  onClick={() => { navigate(ROUTES.PROFILE); setProfileOpen(false) }}
                  className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <User size={15} className="text-slate-400" />
                  Profil
                </button>
                <div className="h-px bg-slate-100" />
                <button
                  onClick={() => { setShowLogout(true); setProfileOpen(false) }}
                  className="flex items-center gap-2.5 w-full px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={15} />
                  Keluar
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      {/* REVISI DI SINI: Mengubah modal logout z-50 ke z-[100] atau tetap z-50 namun berada di luar posisi hierarki header */}
      {showLogout && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <LogOut size={24} className="text-red-500" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Keluar dari BURNIVA?</h3>
            <p className="text-sm text-slate-500 mb-6">Kamu perlu masuk lagi untuk mengakses aplikasi.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 h-10 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 h-10 rounded-xl bg-red-500 text-sm text-white font-medium hover:bg-red-600 transition-colors"
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Topbar