import { useState, useMemo, useEffect } from 'react'
import PenggunaFilters from '../../components/admin/pengguna/PenggunaFilters'
import PenggunaTable from '../../components/admin/pengguna/PenggunaTable'
import PenggunaPagination from '../../components/admin/pengguna/PenggunaPagination'
import PrivacyBanner from '../../components/admin/pengguna/PrivacyBanner'
import UserDetailModal from '../../components/admin/pengguna/UserDetailModal'
import ConfirmationModal from '../../components/common/ConfirmationModal'
import adminService from '../../services/admin/adminService'

function PenggunaAdmin() {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    // States untuk filter & pencarian
    const [searchTerm, setSearchTerm] = useState('')
    const [filterUniv, setFilterUniv] = useState('')
    const [filterRisk, setFilterRisk] = useState('')

    // State detail user modal
    const [selectedUser, setSelectedUser] = useState(null)

    // States untuk pagination
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6 // Diubah menjadi 6 agar pas dengan mockup "Menampilkan 6 dari 8 pengguna"

    // State untuk konfirmasi
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        confirmText: '',
        variant: 'danger',
        onConfirm: () => {}
    })

    const fetchUsers = async () => {
        setIsLoading(true)
        try {
            const data = await adminService.getAllUsers()
            // Map data dari API agar sesuai dengan props tabel
            const formatted = data.map(u => ({
                id: u.id,
                name: u.name,
                email: u.email,
                profile_image: u.profile_image,
                univ: u.university || '-',
                prodi: u.major || '-',
                semester: u.semester || '-',
                lastBurnout: u.last_burnout_score,
                risk: u.last_burnout_prediction || 'Belum ada',
                mentalHealth: u.last_mental_health_prediction || 'N/A',
                isSuspended: u.is_suspended,
                createdAt: u.createdAt,
                totalAssessments: u.total_assessments,
                lastAssessmentDate: u.last_assessment_date
            }))
            setUsers(formatted)
        } catch (error) {
            console.error("Gagal mengambil data pengguna", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    // Fungsi suspend user
    const toggleSuspend = async (id) => {
        try {
            setIsLoading(true);
            await adminService.suspendUser(id)
            await fetchUsers() // Refresh data (AWAIT added)
            
            if (selectedUser && selectedUser.id === id) {
                setSelectedUser(prev => prev ? { ...prev, isSuspended: !prev.isSuspended } : null)
            }
        } catch (error) {
            console.error("Gagal mengubah status suspend", error)
            alert("Gagal mengubah status suspend")
        } finally {
            setIsLoading(false);
        }
    }

    // Fungsi hapus user
    const deleteUser = (id) => {
        setConfirmModal({
            isOpen: true,
            title: 'Hapus Pengguna',
            message: 'Yakin ingin menghapus pengguna ini? Semua data terkait (Todo, History) juga akan terhapus secara permanen.',
            confirmText: 'Ya, Hapus',
            variant: 'danger',
            onConfirm: async () => {
                try {
                    setIsLoading(true);
                    await adminService.deleteUser(id)
                    await fetchUsers() // Refresh data
                    setCurrentPage(1)
                    if (selectedUser && selectedUser.id === id) {
                        setSelectedUser(null)
                    }
                } catch (error) {
                    console.error("Gagal menghapus pengguna", error)
                    alert("Gagal menghapus pengguna")
                } finally {
                    setIsLoading(false);
                }
            }
        });
    }

    // Fungsi reset input harian user
    const resetInput = (id) => {
        setConfirmModal({
            isOpen: true,
            title: 'Reset Input Harian',
            message: 'Yakin ingin mereset akses Cek Harian pengguna ini untuk hari ini? Data assessment hari ini akan dihapus.',
            confirmText: 'Ya, Reset',
            variant: 'warning',
            onConfirm: async () => {
                try {
                    setIsLoading(true);
                    const res = await adminService.resetDailyInput(id);
                    alert(res.message || "Akses berhasil di-reset.");
                    await fetchUsers(); // Refresh data
                    if (selectedUser && selectedUser.id === id) {
                        setSelectedUser(null);
                    }
                } catch (error) {
                    console.error("Gagal mereset akses pengguna", error);
                    alert(error.response?.data?.message || "Gagal mereset akses pengguna");
                } finally {
                    setIsLoading(false);
                }
            }
        });
    }

    // Menghitung data yang sudah difilter
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            const matchUniv = filterUniv ? user.univ === filterUniv : true
            const matchRisk = filterRisk ? user.risk === filterRisk : true

            return matchSearch && matchUniv && matchRisk
        })
    }, [users, searchTerm, filterUniv, filterRisk])

    // Memotong data sesuai pagination
    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredUsers.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredUsers, currentPage, itemsPerPage])

    // Reset pagination ketika filter berubah
    useMemo(() => {
        setCurrentPage(1)
    }, [searchTerm, filterUniv, filterRisk])

    // Mengambil daftar universitas unik dari data pengguna
    const univOptions = useMemo(() => {
        const uniqueUnivs = new Set(users.map(u => u.univ).filter(u => u && u !== '-'))
        return Array.from(uniqueUnivs).sort()
    }, [users])


    return (
        <div className="p-4 md:p-8 max-w-[1400px] mx-auto space-y-6">

            {/* KONTEN UTAMA */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">

                {/* Top Controls: Search & Filters */}
                <PenggunaFilters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterUniv={filterUniv}
                    setFilterUniv={setFilterUniv}
                    filterRisk={filterRisk}
                    setFilterRisk={setFilterRisk}
                    univOptions={univOptions}
                />

                {/* Tabel Data */}
                <PenggunaTable
                    users={paginatedUsers}
                    isLoading={isLoading}
                    toggleSuspend={toggleSuspend}
                    deleteUser={deleteUser}
                    onViewDetail={setSelectedUser}
                />

                {/* Pagination Footer */}
                <PenggunaPagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalItems={filteredUsers.length}
                    itemsPerPage={itemsPerPage}
                />

            </div>

            {/* Info Privacy Banner */}
            <PrivacyBanner />

            {/* Modal Detail Pengguna */}
            {selectedUser && (
                <UserDetailModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                    onToggleSuspend={toggleSuspend}
                    onDelete={deleteUser}
                    onResetInput={resetInput}
                />
            )}

            {/* Modal Konfirmasi Umum */}
            <ConfirmationModal
                {...confirmModal}
                onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
            />

        </div>
    )
}

export default PenggunaAdmin