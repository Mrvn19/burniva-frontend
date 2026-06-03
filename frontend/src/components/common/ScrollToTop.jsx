import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Coba reset window utama browser
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

    // 2. SOLUSI KLONINGAN BARU: Menembak pembungkus internal <main> yang menampung <Outlet />
    // Kita gunakan setTimeout 0ms agar DOM selesai me-render halaman baru terlebih dahulu
    const timer = setTimeout(() => {
      const mainContent = document.getElementById('main-content-wrapper') || document.querySelector('main');
      if (mainContent) {
        mainContent.scrollTo({ top: 0, behavior: 'instant' });
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

export default ScrollToTop;