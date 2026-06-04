import { Heart } from 'lucide-react'
import Logo from '../common/Logo'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/constants'

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const YoutubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
)

const LinktreeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4v16" />
    <path d="M5.5 10.5h13" />
    <path d="M7 5.5l10 10" />
    <path d="M17 5.5l-10 10" />
  </svg>
)

function AboutFooter() {
  return (
    <footer className="bg-slate-950 pt-20 pb-10 border-t border-slate-900 overflow-hidden relative">
      {/* Subtle Glow Effect for Background */}
      <div className="absolute top-0 left-1/4 w-1/2 h-40 bg-emerald-900/20 blur-[120px] pointer-events-none"></div>

      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 mb-16">

          {/* Brand & Description (Takes 4 cols on large screens) */}
          <div className="col-span-2 lg:col-span-4 pr-0 lg:pr-8">
            <div className="mb-6">
              <Logo
                showText={true}
                variant="white"
                clickable={false}
                className="text-white"
              />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-8 max-w-sm">
              Burniva adalah platform kesehatan mental berbasis AI yang membantu mahasiswa memahami kondisi burnout dan menjaga keseimbangan hidup akademik secara proaktif.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="https://github.com/mhnaufal1/burniva-capstone" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-[14px] bg-slate-800/80 flex items-center justify-center text-slate-300 hover:bg-primary-500 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <GithubIcon />
              </a>
              <a href="#" className="w-11 h-11 rounded-[14px] bg-slate-800/80 flex items-center justify-center text-slate-300 hover:bg-primary-500 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <YoutubeIcon />
              </a>
              <a href="#" className="w-11 h-11 rounded-[14px] bg-slate-800/80 flex items-center justify-center text-slate-300 hover:bg-primary-500 hover:text-white hover:-translate-y-1 transition-all duration-300 shadow-sm">
                <LinktreeIcon />
              </a>
            </div>
          </div>

          {/* Links Columns (Takes 2 cols each) */}
          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-sm font-semibold text-white mb-6 tracking-wide">Produk</h4>
            <div className="flex flex-col gap-4">
              {['Dashboard', 'Cek Harian', 'To-Do AI', 'Riwayat'].map((item) => (
                <Link key={item} to={ROUTES.LOGIN} className="text-sm text-slate-400 hover:text-emerald-400 hover:translate-x-1 transition-all inline-block w-fit">
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-sm font-semibold text-white mb-6 tracking-wide">Project Team</h4>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Beranda', href: ROUTES.HOME },
                { label: 'Tim', href: ROUTES.TEAM },
                { label: 'Kontak', href: 'mailto:hafiznaufal27lp@gmail.com', external: true }
              ].map((item) => (
                item.external ? (
                  <a key={item.label} href={item.href} className="text-sm text-slate-400 hover:text-emerald-400 hover:translate-x-1 transition-all inline-block w-fit">
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.label} to={item.href} className="text-sm text-slate-400 hover:text-emerald-400 hover:translate-x-1 transition-all inline-block w-fit">
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-sm font-semibold text-white mb-6 tracking-wide">Resource</h4>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Dokumentasi', href: '#' },
                { label: 'Blog', href: 'https://naufaltech27.blogspot.com/2026/06/ketika-tekanan-kuliah-menjadi-terlalu.html' },
                { label: 'Bantuan', href: 'https://youtu.be/7eNydMQqC0w' }
              ].map((item) => (
                <a key={item.label} href={item.href} target={['Blog', 'Bantuan'].includes(item.label) ? '_blank' : '_self'} rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-emerald-400 hover:translate-x-1 transition-all inline-block w-fit">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            <h4 className="text-sm font-semibold text-white mb-6 tracking-wide">Tentang</h4>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Cerita Burniva', href: '#cerita' },
                { label: 'Apa Itu Burniva', href: '#apa-itu' },
                { label: 'Filosofi', href: '#filosofi' },
                { label: 'Nilai-Nilai', href: '#nilai' },
                { label: 'Perjalanan', href: '#perjalanan' }
              ].map((item) => (
                <a key={item.label} href={item.href} className="text-sm text-slate-400 hover:text-emerald-400 hover:translate-x-1 transition-all inline-block w-fit">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Line */}
        <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm text-slate-500 font-medium">© 2026 Burniva. Hak cipta dilindungi undang-undang.</p>
          <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[280px] md:max-w-none">
            Dibuat dengan <Heart className="w-4 h-4 text-slate-500 fill-slate-500 inline-block align-text-bottom mx-0.5" /> untuk kesehatan mental mahasiswa.
          </p>
        </div>

      </div>
    </footer>
  )
}

export default AboutFooter
