import { Heart, Lock, ShieldPlus, Lightbulb, TreeDeciduous } from 'lucide-react'

const values = [
  { icon: <Heart size={24} strokeWidth={2} />, label: 'Empati' },
  { icon: <Lock size={24} strokeWidth={2} />, label: 'Privasi' },
  { icon: <ShieldPlus size={24} strokeWidth={2} />, label: 'Preventif' },
  { icon: <Lightbulb size={24} strokeWidth={2} />, label: 'Inovasi' },
  { icon: <TreeDeciduous size={24} strokeWidth={2} />, label: 'Pertumbuhan' }
]

function BurnivaValues() {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="w-full px-4 md:px-12 lg:px-16 max-w-6xl mx-auto text-center">
        
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-12">
          Nilai-Nilai Burniva
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {values.map((val, idx) => (
            <div 
              key={idx}
              className="bg-white px-4 py-6 md:px-6 md:py-8 rounded-xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-slate-100 flex flex-col items-center justify-center gap-4 hover:border-emerald-100 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="text-[#006D5B]">
                {val.icon}
              </div>
              <span className="text-[14.5px] font-semibold text-[#0F172A] text-center">
                {val.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default BurnivaValues
