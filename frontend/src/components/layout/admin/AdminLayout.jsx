import { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'
import AdminBottomNav from './AdminBottomNav'

// Kamu bisa menyesuaikan meta page admin di sini
const adminPageMeta = {
    '/admin/dashboard': { title: 'Admin Dashboard', subtitle: 'Ringkasan sistem dan metrik utama' },
    '/admin/pengguna': { title: 'Kelola Pengguna', subtitle: 'Manajemen data pengguna terdaftar' },
    '/admin/monitoring': { title: 'Monitoring Burnout', subtitle: 'Pantau status mental seluruh pengguna' },
    '/admin/analitik': { title: 'Analitik', subtitle: 'Statistik dan insight sistem' },
    '/admin/profil': { title: 'Profil Admin', subtitle: 'Pengaturan akun admin kamu' },
}

function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation()

    // Mencari meta berdasarkan path saat ini
    const meta = adminPageMeta[location.pathname] || { title: 'BURNIVA Admin', subtitle: '' }

    // PENGAMAN TAMBAHAN: Memaksa area main langsung reset scroll ke koordinat 0 setiap pindah menu
    useEffect(() => {
        const mainElement = document.getElementById('admin-main-content');
        if (mainElement) {
            mainElement.scrollTop = 0;
        }
    }, [location.pathname]);

    const [showTopbar, setShowTopbar] = useState(true);
    const lastScrollY = useRef(0);

    // EVENT LISTENER UNTUK SMART HEADER (HIDE-ON-SCROLL)
    useEffect(() => {
        const mainElement = document.getElementById('admin-main-content');
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
            if (currentScrollY >= maxScroll - 1) {
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
            {/* Sidebar Admin */}
            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Area Utama */}
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
                {/* Topbar Admin */}
                <AdminTopbar
                    onToggleSidebar={() => setSidebarOpen(prev => !prev)}
                    title={meta.title}
                    subtitle={meta.subtitle}
                    show={showTopbar}
                />

                {/* Konten Utama Admin */}
                <main id="admin-main-content" className="flex-1 overflow-y-auto pb-10 lg:pb-0">
                    <Outlet />
                </main>
            </div>

            {/* Bottom Nav Admin Khusus Mobile */}
            <AdminBottomNav />
        </div>
    )
}

export default AdminLayout
