import { BrainCog } from 'lucide-react'

function WhatIsBurniva() {
  return (
    <section id="apa-itu" className="py-16 md:py-24 bg-white">
      <div className="w-full px-4 md:px-12 lg:px-16 max-w-5xl mx-auto text-center">
        
        <div className="bg-[#EEF2FF] rounded-3xl p-10 md:p-16 flex flex-col items-center">
          <div className="text-[#006D5B] mb-6">
            <BrainCog size={40} strokeWidth={2} />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">
            Apa itu Burniva?
          </h2>
          
          <p className="text-base md:text-[17px] text-slate-500 leading-relaxed max-w-4xl mx-auto">
            Burniva adalah platform monitoring kesehatan mental berbasis AI yang dirancang untuk membantu mahasiswa memahami kondisi keseharian mereka melalui pendekatan preventif dan berbasis data. Burniva bukan alat diagnosis medis, melainkan alat pendukung kesadaran diri dan deteksi dini risiko burnout.
          </p>
        </div>

      </div>
    </section>
  )
}

export default WhatIsBurniva
