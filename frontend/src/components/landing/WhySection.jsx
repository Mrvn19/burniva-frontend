import { Check } from 'lucide-react'

const reasons = [
  'Deteksi burnout lebih awal',
  'Insight personal berbasis AI',
  'Monitoring kondisi mental harian',
  'To-do recovery otomatis',
  'Membantu menjaga produktivitas',
  'Dirancang khusus untuk mahasiswa'
]

function WhySection() {
  return (
    <section className="py-14 md:py-24 bg-[#FAFAFA] relative overflow-hidden">
      <div className="w-full px-4 md:px-16 lg:px-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Bagian Kiri: Video Embed Placeholder */}
          <div className="order-2 lg:order-1 relative group w-full max-w-2xl mx-auto">
            {/* Soft Green Shadow Drop */}
            <div className="absolute -inset-2 bg-primary-600/20 blur-2xl rounded-[40px] transform group-hover:scale-105 transition-transform duration-500"></div>

            <div className="relative aspect-video bg-slate-200 rounded-2xl border-[6px] border-primary-600 overflow-hidden shadow-2xl flex items-center justify-center transition-colors duration-300">
              <iframe
                className="w-full h-full pointer-events-none scale-[1.02] md:scale-[1.05]"
                src="https://www.youtube.com/embed/5qJpkTf3SRo?autoplay=1&mute=1&loop=1&playlist=5qJpkTf3SRo&controls=0&disablekb=1&playsinline=1&modestbranding=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Bagian Kanan: Konten & List */}
          <div className="order-1 lg:order-2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <p className="inline-block bg-primary-100 text-primary-600 text-xs md:text-sm font-medium px-3 py-1 rounded-full mb-4">
              Mengapa Burniva
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">
              Mengapa Burniva?
            </h2>
            <p className="text-sm md:text-base text-slate-500 leading-relaxed mb-8 max-w-lg">
              Burniva tidak hanya mendeteksi burnout, tetapi juga membantu kamu membangun rutinitas mental yang lebih sehat setiap hari.
            </p>

            <div className="flex flex-col gap-3 w-full max-w-md">
              {reasons.map((reason, idx) => (
                <div
                  key={idx}
                  className="bg-white px-5 py-3.5 rounded-2xl flex items-center gap-4 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 border border-slate-50"
                >
                  <div className="w-6 h-6 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                    <Check strokeWidth={3} className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm md:text-base text-slate-700 font-medium">{reason}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}

export default WhySection
