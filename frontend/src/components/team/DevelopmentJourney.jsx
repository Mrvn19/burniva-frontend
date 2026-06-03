

function DevelopmentJourney() {
  const journeySteps = [
    { num: '1', title: 'Problem Discovery', desc: 'Identifying university student burnout issues' },
    { num: '2', title: 'Research & Dataset', desc: 'Data collection and behavioral analysis' },
    { num: '3', title: 'UI/UX Design', desc: 'Designing intuitive healthcare interfaces' },
    { num: '4', title: 'Frontend & Backend Development', desc: 'System architecture and implementation' },
    { num: '5', title: 'AI Integration', desc: 'Machine learning model deployment' },
    { num: '6', title: 'Testing', desc: 'Validation and performance tuning' },
    { num: '7', title: 'Deployment', desc: 'Cloud release and monitoring' }
  ]

  return (
    <section id="process" className="py-20 md:py-32 bg-white">
      <div className="w-full px-4 md:px-12 lg:px-16 max-w-[1400px] mx-auto">

        <div className="text-center mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-[#006D5B] mb-4">
            Perjalanan Pengembangan Burniva
          </h2>
          <p className="text-base text-slate-500 max-w-2xl mx-auto">
            Perjalanan pengembangan dari riset awal hingga peluncuran.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 lg:gap-4 items-start">
          {journeySteps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-full bg-white border-2 border-[#006D5B] shadow-sm flex items-center justify-center text-[#006D5B] font-bold text-lg mb-6 group-hover:bg-[#006D5B] group-hover:text-white transition-all duration-300">
                {step.num}
              </div>
              <h4 className="text-[13px] md:text-sm font-bold text-[#006D5B] leading-tight mb-3 px-1">
                {step.title}
              </h4>
              <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed px-2">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default DevelopmentJourney
