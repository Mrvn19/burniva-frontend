function DevelopmentPrinciples() {
  const principles = [
    { title: 'Human-Centered', desc: 'Teknologi dirancang untuk membantu dan memahami kebutuhan manusia, bukan sebaliknya.' },
    { title: 'Privacy First', desc: 'Data dan privasi pengguna selalu menjadi prioritas utama dalam setiap fitur.' },
    { title: 'Early Detection', desc: 'Fokus pada pencegahan dan identifikasi masalah sebelum berkembang menjadi lebih berat.' },
    { title: 'Data-Driven', desc: 'Keputusan dan rekomendasi yang diberikan selalu didasarkan pada analisis data yang akurat.' },
    { title: 'Responsible AI', desc: 'Kecerdasan buatan digunakan secara etis dan bertanggung jawab untuk kebaikan bersama.' }
  ]

  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="w-full px-4 md:px-12 lg:px-16 max-w-5xl mx-auto text-center">
        
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-12">
          Burniva Dibangun Dengan Prinsip
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((p, idx) => (
            <div 
              key={idx}
              className="bg-[#F8FAFC]/50 border border-slate-200/70 p-6 md:p-8 rounded-xl text-left hover:shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:bg-white transition-all duration-300"
            >
              <h3 className="text-[14.5px] font-bold text-[#006D5B] mb-3">
                {p.title}
              </h3>
              <p className="text-[14px] md:text-[14.5px] text-slate-600 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default DevelopmentPrinciples
