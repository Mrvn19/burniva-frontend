import { ChevronLeft, ChevronRight } from 'lucide-react'

function PenggunaPagination({ currentPage, setCurrentPage, totalItems, itemsPerPage, itemLabel = 'pengguna' }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="p-5 md:p-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p className="text-slate-400 font-medium">
                {totalItems > 0 
                    ? `Menampilkan ${startIndex} - ${endIndex} dari ${totalItems} ${itemLabel}` 
                    : `Tidak ada data ${itemLabel}`}
            </p>
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1 || totalItems === 0}
                    className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-400 disabled:opacity-40 disabled:hover:bg-white transition-all shadow-sm"
                >
                    <ChevronLeft size={16} />
                </button>
                <span className="text-slate-600 font-medium px-2">{currentPage} / {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages || totalItems === 0}
                    className="w-8 h-8 flex items-center justify-center rounded-xl border border-slate-100 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:hover:bg-white transition-all shadow-sm"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    )
}

export default PenggunaPagination
