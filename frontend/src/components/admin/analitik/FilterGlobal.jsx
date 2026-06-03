import React from 'react'
import CustomDropdown from '../../ui/CustomDropdown'

function FilterGlobal({ 
    selectedPeriod = 'Semua Periode', 
    setSelectedPeriod, 
    selectedUniv = '', 
    setSelectedUniv, 
    selectedProdi = '', 
    setSelectedProdi,
    univOptions = [],
    prodiOptions = [],
    onApply
}) {
    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Filter Global</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Filter Tanggal */}
                <CustomDropdown
                    name="period"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod && setSelectedPeriod(e.target.value)}
                    options={[
                        { label: '01 Mei - 20 Mei 2026', value: '01 Mei - 20 Mei 2026' },
                        { label: '21 Mei - 31 Mei 2026', value: '21 Mei - 31 Mei 2026' },
                        { label: 'Semua Periode', value: 'Semua Periode' },
                    ]}
                    placeholder="Pilih Periode"
                />

                {/* Filter Universitas */}
                <CustomDropdown
                    name="univ"
                    value={selectedUniv}
                    onChange={(e) => setSelectedUniv && setSelectedUniv(e.target.value)}
                    options={[
                        { label: 'Semua Universitas', value: '' },
                        ...univOptions.map(u => ({ label: u, value: u }))
                    ]}
                    placeholder="Semua Universitas"
                    searchable={true}
                />

                {/* Filter Program Studi */}
                <CustomDropdown
                    name="prodi"
                    value={selectedProdi}
                    onChange={(e) => setSelectedProdi && setSelectedProdi(e.target.value)}
                    options={[
                        { label: 'Semua Program Studi', value: '' },
                        ...prodiOptions.map(p => ({ label: p, value: p }))
                    ]}
                    placeholder="Semua Program Studi"
                    searchable={true}
                />
            </div>

            <div className="flex justify-end pt-2">
                <button 
                    onClick={() => {
                        if (onApply) {
                            onApply(selectedPeriod, selectedUniv, selectedProdi);
                        }
                    }}
                    className="bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold py-2.5 px-6 rounded-xl transition-colors shadow-sm"
                >
                    Terapkan Filter
                </button>
            </div>
        </div>
    )
}

export default FilterGlobal
