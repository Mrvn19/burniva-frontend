import { useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, ClipboardList, CheckSquare,
  History, User, LogOut, Activity, X
} from 'lucide-react'
import { ROUTES } from '../../utils/constants'
import { classNames } from '../../utils/helpers'
import useAuthStore from '../../store/auth/useAuthStore'
import logoCol from '../../assets/icons/Logo.svg'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: ROUTES.DASHBOARD },
  { label: 'Cek Harian', icon: ClipboardList, path: ROUTES.INPUT },
  { label: 'To-Do', icon: CheckSquare, path: ROUTES.TODO },
  { label: 'Riwayat', icon: History, path: ROUTES.HISTORY },
  { label: 'Profil', icon: User, path: ROUTES.PROFILE },
]

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleLogout = () => {
    useAuthStore.getState().clearAuth()
    navigate(ROUTES.LOGIN)
  }

  return (
    <>
      {/* Overlay mobile - Naik ke z-[60] agar menutupi Topbar & BottomNav */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar desktop — static */}
      <aside className="hidden lg:flex w-[240px] flex-shrink-0 flex-col bg-white border-r border-slate-100 h-screen sticky top-0">
        <SidebarContent onOpenLogout={() => setShowLogoutModal(true)} />
      </aside>

      {/* Sidebar mobile — slide in - Naik ke z-[60] agar berada paling atas */}
      <aside className={classNames(
        'fixed top-0 left-0 h-screen w-[260px] bg-white shadow-2xl',
        'flex flex-col z-[60] lg:hidden',
        'transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <SidebarContent onOpenLogout={() => setShowLogoutModal(true)} onClose={onClose} />
      </aside>

      {/* MODAL KONFIRMASI LOGOUT */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <LogOut size={24} className="text-red-500" />
            </div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Keluar dari BURNIVA?</h3>
            <p className="text-sm text-slate-500 mb-6">Kamu perlu masuk lagi untuk mengakses aplikasi.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
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

function SidebarContent({ onOpenLogout, onClose }) {
  const location = useLocation()

  return (
    <>
      {/* Area Logo & Tombol Close */}
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <img src={logoCol} alt="BURNIVA" className="w-8 h-8 object-contain shrink-0" />
          <span className="text-base font-bold text-primary-500">BURNIVA</span>
        </div>

        {/* Tombol X Khusus Mobile */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigasi Menu */}
      <nav className="flex-1 px-4 py-2 flex flex-col gap-1.5 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isMatch =
            location.pathname === path ||
            (path === ROUTES.INPUT && location.pathname === ROUTES.RESULT) ||
            (path === ROUTES.HISTORY && location.pathname.startsWith('/riwayat/'));

          return (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={classNames(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium',
                'transition-colors duration-150',
                isMatch
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <Icon size={20} className={isMatch ? 'text-primary-600' : 'text-slate-500'} />
              {label}
            </NavLink>
          )
        })}
      </nav>

      {/* Logout - Diberi pb-10 agar tidak terlalu mepet layar bawah HP */}
      <div className="px-4 pb-5 pt-4">
        <button
          onClick={() => {
            if (onClose) onClose();
            onOpenLogout();
          }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 w-full transition-colors"
        >
          <LogOut size={20} className="text-slate-500" />
          Keluar
        </button>
      </div>
    </>
  )
}

export default Sidebar