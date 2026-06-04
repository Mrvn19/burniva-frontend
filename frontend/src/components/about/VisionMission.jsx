function VisionMission() {
  const missions = [
    "Meningkatkan kesadaran mental di kalangan mahasiswa.",
    "Membantu deteksi dini burnout secara mudah dan akurat.",
    "Menyediakan insight personal yang relevan dan dapat ditindaklanjuti.",
    "Mendukung terciptanya keseimbangan hidup mahasiswa (academic-life balance)."
  ]

  return (
    <section id="nilai" className="py-20 md:py-32 bg-white border-y border-slate-100">
      <div className="w-full px-4 md:px-12 lg:px-16 max-w-5xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          
          {/* Kiri: Visi */}
          <div className="bg-[#006D5B] text-white rounded-2xl p-10 md:p-14 shadow-md flex flex-col justify-center text-center md:text-left">
            <h2 className="text-3xl font-bold mb-6">
              Visi
            </h2>
            <p className="text-base md:text-[17px] text-white/90 leading-relaxed font-medium">
              "Menjadi pendamping digital yang membantu mahasiswa menjaga kesehatan mental dan mencegah burnout melalui pemanfaatan teknologi yang bertanggung jawab."
            </p>
          </div>

          {/* Kanan: Misi */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-[#0F172A] mb-6 text-center md:text-left">
              Misi
            </h2>
            <div className="space-y-4">
              {missions.map((mission, idx) => (
                <div key={idx} className="flex items-center gap-5 bg-[#F8FAFC]/50 border border-slate-200/80 rounded-xl p-4 md:p-5">
                  <div className="w-9 h-9 rounded-full bg-[#E6F0EC] text-[#006D5B] font-bold text-[15px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <p className="text-[14.5px] md:text-[15px] text-slate-600 leading-relaxed">
                    {mission}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default VisionMission
