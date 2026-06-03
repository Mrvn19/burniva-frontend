import { Play, ArrowRight } from 'lucide-react'

function DemoSection() {
  return (
    <section id="demo" className="py-14 md:py-20 bg-slate-50 relative overflow-hidden">
      <div className="w-full px-4 md:px-16 lg:px-24 relative z-10">

        <div className="text-center mb-10 md:mb-12">
          <p className="inline-block bg-primary-100 text-primary-600 text-xs md:text-sm font-medium px-3 py-1 rounded-full mb-3 md:mb-4">
            Demo
          </p>
          <h2 className="text-xl md:text-4xl font-bold text-slate-800 mb-3 md:mb-4">
            Lihat Burniva Dalam Aksi
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Tonton bagaimana Burniva membantu mahasiswa memahami kondisi mental, mendeteksi burnout, dan memberikan rekomendasi personal berbasis AI.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Video Embed Container */}
          <div className="relative aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden shadow-xl border border-primary-800/20 bg-black">
            <iframe 
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/TctS0P2Zll0?si=6tb5eNu3H1mzHxj5&amp;controls=0" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="flex justify-center mt-10">
            <a 
              href="https://youtu.be/TctS0P2Zll0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors shadow-sm"
            >
              Buka di YouTube <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

export default DemoSection
