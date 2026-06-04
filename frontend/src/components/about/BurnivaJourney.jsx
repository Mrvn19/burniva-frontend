function BurnivaJourney() {
  const steps = [
    { title: 'Identifikasi Masalah', desc: 'Mengamati tingginya tingkat stres dan kelelahan di kalangan mahasiswa.' },
    { title: 'Riset Burnout Mahasiswa', desc: 'Melakukan studi mendalam tentang penyebab, gejala, dan dampak burnout akademik.' },
    { title: 'Pengembangan Model AI', desc: 'Membangun algoritma cerdas untuk menganalisis pola perilaku dan mendeteksi risiko.' },
    { title: 'Desain Platform Burniva', desc: 'Merancang antarmuka yang intuitif, ramah pengguna, dan berfokus pada pengalaman mahasiswa.' },
    { title: 'Implementasi Sistem', desc: 'Melahirkan Burniva sebagai platform utuh yang siap digunakan oleh mahasiswa.' }
  ]

  return (
    <section id="perjalanan" className="py-20 bg-[#F8FAFC]">
      <div className="w-full px-4 md:px-12 lg:px-16 max-w-4xl mx-auto">
        
        <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-16 text-center">
          Perjalanan Burniva
        </h2>

        <div className="relative border-l-2 border-slate-200 ml-4 md:ml-12">
          {steps.map((step, idx) => (
            <div key={idx} className="mb-12 pl-8 relative group cursor-default">
              <span 
                className="absolute -left-[7px] top-2 w-3 h-3 rounded-full transition-all duration-300 group-hover:scale-125 bg-slate-200 group-hover:bg-[#006D5B]"
              ></span>
              <h3 className="mb-2 text-[19px] md:text-xl font-semibold text-[#0F172A] group-hover:text-[#006D5B] transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-[14.5px] md:text-[15px] font-normal text-slate-500 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default BurnivaJourney
