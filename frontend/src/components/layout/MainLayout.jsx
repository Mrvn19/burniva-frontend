import { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import BottomNav from './BottomNav' 
import { ROUTES } from '../../utils/constants'

const pageMeta = {
  [ROUTES.DASHBOARD]: { title: 'Dashboard',      subtitle: 'Pantau kondisi mental kamu hari ini' },
  [ROUTES.INPUT]:     { title: 'Cek Harian',     subtitle: 'Cek kondisi harian dan dapatkan rekomendasi AI' },
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

  const [showTopbar, setShowTopbar] = useState(true);
  const lastScrollY = useRef(0);

  // EVENT LISTENER UNTUK SMART HEADER (HIDE-ON-SCROLL)
  useEffect(() => {
    const mainElement = document.getElementById('main-content-wrapper');
    if (!mainElement) return;

    const handleScroll = () => {
      const currentScrollY = mainElement.scrollTop;
      const maxScroll = mainElement.scrollHeight - mainElement.clientHeight;
      
      // Cegah flickering karena 'bounce/overscroll' effect di bagian atas (iOS/Mac)
      if (currentScrollY <= 0) {
        setShowTopbar(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // Cegah flickering karena 'bounce/overscroll' effect di bagian paling bawah halaman
      // Jika user sudah mentok bawah atau kelebihan (bounce), abaikan perhitungan hide/show
      if (currentScrollY >= maxScroll - 1) {
        // Jangan update lastScrollY supaya saat mantul ke atas tidak dihitung sebagai 'scroll naik'
        return; 
      }

      // Beri sedikit toleransi (2px) agar getaran scroll minor tidak terus memicu state
      if (Math.abs(currentScrollY - lastScrollY.current) < 2) return;

      // Jika scroll turun dan sudah melewati batas 50px
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowTopbar(false);
      } 
      // Jika scroll naik
      else if (currentScrollY < lastScrollY.current) {
        setShowTopbar(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    mainElement.addEventListener('scroll', handleScroll, { passive: true });
    return () => mainElement.removeEventListener('scroll', handleScroll);
  }, []);

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
          show={showTopbar}
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