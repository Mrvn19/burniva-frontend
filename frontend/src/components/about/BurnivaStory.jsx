import logoCol from '../../assets/icons/Logo.svg'

function BurnivaStory() {
  return (
    <section id="cerita" className="py-20 md:py-32 bg-white">
      <div className="w-full px-4 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Kiri: Logo Besar */}
          <div className="flex justify-center items-center relative">
            <div className="absolute w-[120%] h-[120%] bg-[#D4AF37]/5 blur-[60px] rounded-full z-0 -top-[10%] -left-[10%]"></div>
            <img
              src={logoCol}
              alt="Burniva Logo Big"
              className="w-48 md:w-72 lg:w-96 object-contain relative z-10 drop-shadow-xl"
            />
          </div>

          {/* Kanan: Teks Cerita */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-8">
              Cerita di Balik Burniva
            </h2>

            <div className="space-y-6 text-[15px] md:text-base text-slate-500 leading-relaxed text-center lg:text-left">
              <p>
                Tuntutan akademik yang tinggi, tenggat waktu tugas yang terus berdatangan, dan tekanan untuk selalu berprestasi seringkali membuat mahasiswa mengabaikan kesehatan mental mereka. Banyak yang terjebak dalam siklus kelelahan tanpa ujung.
              </p>
              <p>
                Kami menyadari bahwa banyak mahasiswa mengalami kelelahan ekstrem (burnout) tanpa menyadarinya hingga kondisi tersebut mempengaruhi nilai, motivasi belajar, dan kualitas hidup mereka secara signifikan. Fokus yang menurun dan rasa cemas menjadi teman sehari-hari.
              </p>
              <p>
                Didorong oleh kepedulian yang mendalam terhadap kesehatan mental, tim kami yang juga pernah merasakan kerasnya dunia perkuliahan memutuskan untuk mencari solusi. Kami ingin menciptakan sesuatu yang nyata dan berdampak.
              </p>
              <p>
                Burniva lahir dari kebutuhan akan alat preventif yang mudah diakses, tidak menghakimi, dan berbasis data. Kami percaya bahwa dengan mengenali batas kemampuan sejak dini, mahasiswa dapat mengambil langkah proaktif sebelum kelelahan berubah menjadi burnout yang melumpuhkan.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default BurnivaStory
