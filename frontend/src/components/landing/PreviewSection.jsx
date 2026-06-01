import dashboardImg from '../../assets/dash-preview.png';
import inputImg from '../../assets/input-preview.png';
import riwayatImg from '../../assets/history-preview.png';

function PreviewSection() {
  const previews = [
    {
      title: 'Dashboard',
      desc: 'Pantau skor burnout dan tren stres harian',
      image: dashboardImg,
    },
    {
      title: 'Cek Harian',
      desc: 'Isi data harian dengan mudah step by step',
      image: inputImg,
    },
    {
      title: 'Riwayat',
      desc: 'Lihat perkembangan kondisi dari waktu ke waktu',
      image: riwayatImg,
    },
  ];

  return (
    <section className="py-14 md:py-20 bg-slate-50">
      <div className="w-full px-4 md:px-16 lg:px-24">

        <div className="text-center mb-10 md:mb-12">
          <p className="text-xs md:text-sm font-medium text-blue-600 mb-2">Pratinjau</p>
          <h2 className="text-xl md:text-4xl font-bold text-slate-800">
            Antarmuka yang bersih dan intuitif
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {previews.map(({ title, desc, image }) => (
            <div
              key={title}
              className="rounded-2xl overflow-hidden shadow-lg group hover:-translate-y-1 transition-all duration-300 bg-white border border-slate-100"
            >
              <div className="h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={image}
                  alt={`Tampilan halaman ${title}`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="bg-white px-4 md:px-5 py-3 md:py-4 border-t border-slate-100">
                <p className="text-[13px] md:text-sm font-bold text-slate-800">{title}</p>
                <p className="text-[11px] md:text-xs text-slate-500 mt-1">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Tampilan antarmuka dapat berubah mengikuti pembaruan sistem
        </p>

      </div>
    </section>
  );
}

export default PreviewSection;