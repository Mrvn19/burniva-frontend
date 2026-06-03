import { Search } from 'lucide-react'
import CustomDropdown from '../../ui/CustomDropdown'

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
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="w-full sm:w-48">
                    <CustomDropdown
                        name="filterUniv"
                        value={filterUniv}
                        onChange={(e) => setFilterUniv(e.target.value)}
                        options={[
                            { label: 'Semua Universitas', value: '' },
                            ...univOptions.map(u => ({ label: u, value: u }))
                        ]}
                        placeholder="Semua Universitas"
                        searchable={true}
                    />
                </div>
                <div className="w-full sm:w-48">
                    <CustomDropdown
                        name="filterRisk"
                        value={filterRisk}
                        onChange={(e) => setFilterRisk(e.target.value)}
                        options={[
                            { label: 'Semua Risiko', value: '' },
                            { label: 'Tinggi', value: 'Tinggi' },
                            { label: 'Sedang', value: 'Sedang' },
                            { label: 'Rendah', value: 'Rendah' }
                        ]}
                        placeholder="Semua Risiko"
                    />
                </div>
            </div>
        </div>
    )
}

export default PenggunaFilters
