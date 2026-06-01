import { useState, useEffect } from 'react' // <-- Tambahkan useEffect di sini
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import BottomNav from './BottomNav' 
import { ROUTES } from '../../utils/constants'

const pageMeta = {
  [ROUTES.DASHBOARD]: { title: 'Dashboard',      subtitle: 'Pantau kondisi mental kamu hari ini' },
  [ROUTES.INPUT]:     { title: 'Cek Harian',     subtitle: 'Isi check-in harian untuk mendapatkan analisis burnout dan rekomendasi personal berbasis AI.' },
  [ROUTES.TODO]:      { title: 'To-Do',          subtitle: 'Daftar tugas harian dari rekomendasi AI' },
  [ROUTES.HISTORY]:   { title: 'Riwayat',        subtitle: 'Catatan kondisi mental kamu sebelumnya' },
  [ROUTES.PROFILE]:   { title: 'Profil',         subtitle: 'Informasi akun kamu' },
  [ROUTES.RESULT]:    { title: 'Hasil Analisis', subtitle: 'Insight berbasis AI dari data yang kamu masukkan' },
}

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const meta = pageMeta[location.pathname] || { title: 'BURNIVA', subtitle: '' }

  // PENGAMAN TAMBAHAN: Memaksa area main langsung reset scroll ke koordinat 0 setiap pindah menu
  useEffect(() => {
    const mainElement = document.getElementById('main-content-wrapper');
    if (mainElement) {
      mainElement.scrollTop = 0;
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Topbar
          onToggleSidebar={() => setSidebarOpen(prev => !prev)}
          title={meta.title}
          subtitle={meta.subtitle}
        />
        
        {/* Berikan id="main-content-wrapper" agar mudah ditembak oleh useEffect di atas */}
        <main id="main-content-wrapper" className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <Outlet />
        </main>
      </div>

      <BottomNav />
    </div>
  )
}

export default MainLayout