import { Search } from 'lucide-react'

function PenggunaFilters({ searchTerm, setSearchTerm, filterUniv, setFilterUniv, filterRisk, setFilterRisk, univOptions = [] }) {
    return (
        <div className="p-5 md:p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                    type="text"
                    placeholder="Cari pengguna berdasarkan nama atau email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-shadow"
                />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex gap-3">
                <select
                    value={filterUniv}
                    onChange={(e) => setFilterUniv(e.target.value)}
                    className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white text-slate-600 focus:outline-none focus:border-primary-500 outline-none cursor-pointer w-full sm:w-auto"
                >
                    <option value="">Semua Universitas</option>
                    {univOptions.map((univ, index) => (
                        <option key={index} value={univ}>{univ}</option>
                    ))}
                </select>
                <select
                    value={filterRisk}
                    onChange={(e) => setFilterRisk(e.target.value)}
                    className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm bg-white text-slate-600 focus:outline-none focus:border-primary-500 outline-none cursor-pointer w-full sm:w-auto"
                >
                    <option value="">Semua Risiko</option>
                    <option value="Tinggi">Tinggi</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Rendah">Rendah</option>
                </select>
            </div>
        </div>
    )
}

export default PenggunaFilters
