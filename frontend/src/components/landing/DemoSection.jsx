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
          {/* Video Placeholder Container */}
          <div className="relative aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#0a4635] to-[#128a69] shadow-xl group cursor-pointer border border-primary-800/20">
            
            {/* Soft grid overlay for texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px)] bg-[size:10%_100%] opacity-20"></div>
            
            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 text-center">
              
              {/* Play Button */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-105 group-hover:shadow-xl transition-all duration-300">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-700 ml-1.5" fill="currentColor" />
              </div>
              
              <div className="flex items-center gap-2 text-xs md:text-sm font-medium text-white/80 mb-3">
                <span>3 menit</span>
                <span>•</span>
                <span>Walkthrough lengkap</span>
              </div>
              
              <h3 className="text-lg md:text-2xl font-medium md:font-semibold max-w-lg leading-snug">
                Bagaimana Burniva membantu kamu mengelola burnout
              </h3>
            </div>
            
            {/* Subtle light glow effect */}
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_50%)]"></div>
          </div>
          
          <div className="flex justify-center mt-10">
            <button className="flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white px-6 py-3 rounded-full text-sm font-medium transition-colors shadow-sm">
              Tonton Demo Lengkap <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default DemoSection
