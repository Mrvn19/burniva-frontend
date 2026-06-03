import { User, LineChart, Sparkles, Palette } from 'lucide-react'
import logoCol from '../../assets/icons/Logo.svg'

const logoElements = [
  {
    icon: <User size={24} />,
    title: 'Siluet Kepala',
    description: 'Melambangkan kesehatan mental dan kesadaran diri. Bentuk kepala manusia menjadi simbol utama yang merepresentasikan fokus Burniva terhadap kesejahteraan psikologis mahasiswa. Elemen ini menggambarkan bahwa setiap perjalanan menuju kondisi mental yang lebih baik selalu dimulai dari pemahaman terhadap diri sendiri.'
  },
  {
    icon: <LineChart size={24} />,
    title: 'Grafik Pertumbuhan',
    description: 'Melambangkan perkembangan dan pemulihan. Garis grafik yang bergerak naik menunjukkan proses pertumbuhan yang positif. Elemen ini merepresentasikan pemantauan kondisi harian, perkembangan kesehatan mental, peningkatan kualitas hidup, dan kemajuan kecil yang terjadi secara konsisten.'
  },
  {
    icon: <Sparkles size={24} />,
    title: 'Bintang',
    description: 'Bintang melambangkan kecerdasan, insight, dan harapan. Sebagai elemen yang terinspirasi dari peran Artificial Intelligence dalam Burniva, bintang merepresentasikan kemampuan sistem untuk mengubah data menjadi pemahaman yang membantu pengguna mengenali risiko burnout lebih awal dan mengambil langkah yang tepat.'
  },
  {
    icon: <Palette size={24} />,
    title: 'Warna Hijau',
    description: 'Melambangkan ketenangan, keseimbangan, dan pemulihan. Warna utama Burniva dipilih karena memiliki asosiasi yang kuat dengan kesehatan, ketenangan pikiran, rasa aman, stabilitas emosional, dan pertumbuhan.'
  }
]

function LogoPhilosophy() {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="w-full px-4 md:px-12 lg:px-16 max-w-[1400px] mx-auto text-center">

        <div className="mb-16">
          <img src={logoCol} alt="Burniva Logo" className="w-16 h-16 mx-auto mb-6 object-contain" />
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-6">
            Filosofi Logo Burniva
          </h2>
          <p className="text-[15px] md:text-base text-slate-500 leading-relaxed max-w-2xl mx-auto">
            Logo Burniva menggambarkan perjalanan seseorang dalam memahami kondisi mentalnya, mengenali risiko burnout sejak dini, dan bertumbuh menuju kondisi yang lebih sehat melalui kesadaran diri, pemantauan berkelanjutan, dan dukungan teknologi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {logoElements.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[24px] p-8 border border-slate-100 hover:border-emerald-100 hover:shadow-[0_8px_24px_rgb(0,0,0,0.04)] transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-[#006D5B] rounded-xl flex items-center justify-center mb-6 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-[17px] font-bold text-[#0F172A] mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default LogoPhilosophy
