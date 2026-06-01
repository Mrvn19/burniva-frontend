import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, ClipboardList, CheckSquare,
  History, User
} from 'lucide-react'
import { ROUTES } from '../../utils/constants'
import { classNames } from '../../utils/helpers'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: ROUTES.DASHBOARD },
  { label: 'Cek Harian', icon: ClipboardList,   path: ROUTES.INPUT     },
  { label: 'To-Do',     icon: CheckSquare,     path: ROUTES.TODO      },
  { label: 'Riwayat',   icon: History,         path: ROUTES.HISTORY   },
  { label: 'Profil',    icon: User,            path: ROUTES.PROFILE   },
]

function BottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex items-center justify-around z-40 lg:hidden px-2 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
      {navItems.map(({ label, icon: Icon, path }) => {
        // Logika aktif (menyala biru) yang sama persis dengan Sidebar
        const isMatch = 
          location.pathname === path || 
          (path === ROUTES.INPUT && location.pathname === ROUTES.RESULT) ||
          (path === ROUTES.HISTORY && location.pathname.startsWith('/riwayat/'));

        return (
          <NavLink
            key={path}
            to={path}
            className="flex flex-col items-center justify-center w-full py-2.5 gap-1 transition-colors"
          >
            <Icon 
              size={22} 
              className={classNames(
                'transition-colors',
                isMatch ? 'text-primary-600' : 'text-slate-400'
              )} 
            />
            <span 
              className={classNames(
                'text-[10px] font-medium transition-colors',
                isMatch ? 'text-primary-700' : 'text-slate-500'
              )}
            >
              {label}
            </span>
          </NavLink>
        )
      })}
    </nav>
  )
}

export default BottomNav