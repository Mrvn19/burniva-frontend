import { Plus } from 'lucide-react'

function NamePhilosophy() {
  return (
    <section id="filosofi" className="py-20 bg-white">
      <div className="w-full px-4 md:px-12 lg:px-16 max-w-5xl mx-auto text-center">
        
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-16">
          Filosofi Nama Burniva
        </h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-16 relative">
          
          {/* Kiri: BURN */}
          <div className="flex-1 text-center max-w-xs">
            <h3 className="text-4xl md:text-5xl font-black text-[#006D5B] mb-6 tracking-wide">
              BURN
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Diambil dari kata Burnout, merepresentasikan tantangan yang menjadi fokus utama Burniva, yaitu kelelahan fisik, emosional, dan mental yang sering dialami mahasiswa akibat tekanan akademik maupun kehidupan sehari-hari.
            </p>
          </div>

          {/* Tengah: Plus */}
          <div className="text-slate-300">
            <Plus size={32} strokeWidth={3} />
          </div>

          {/* Kanan: VIVA */}
          <div className="flex-1 text-center max-w-xs">
            <h3 className="text-4xl md:text-5xl font-black text-[#D4AF37] mb-6 tracking-wide">
              VIVA
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              Berasal dari bahasa Latin yang berarti hidup, bertumbuh, berkembang, dan bangkit. Kata ini melambangkan harapan dan semangat untuk terus melangkah menuju kondisi yang lebih baik.
            </p>
          </div>

        </div>

        {/* Closing */}
        <div className="pt-10 border-t border-slate-100 max-w-3xl mx-auto">
          <p className="text-[15px] md:text-base font-medium text-slate-600 leading-relaxed">
            "Burniva merepresentasikan perjalanan dari kesadaran terhadap risiko burnout menuju kehidupan yang lebih sehat, seimbang, dan bermakna."
          </p>
        </div>

      </div>
    </section>
  )
}

export default NamePhilosophy
