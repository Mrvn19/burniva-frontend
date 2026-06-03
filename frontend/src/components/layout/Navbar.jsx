import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Activity } from 'lucide-react'
import { ROUTES } from '../../utils/constants'
import Button from '../ui/Button'
import Logo from '../common/Logo'

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Fitur', href: '#fitur' },
  { label: 'Cara Kerja', href: '#cara-kerja' },
  { label: 'Demo User', href: '#demo' },
  { label: 'FAQ', href: '#faq' },
]

function Navbar() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('beranda')

  useEffect(() => {
    const getActiveSection = () => {
      const offset = 96

      let current = navLinks[0].href.replace('#', '')

      navLinks.forEach(({ href }) => {
        const id = href.replace('#', '')
        const section = document.getElementById(id)

        if (!section) return

        const sectionTop =
          section.getBoundingClientRect().top + window.scrollY

        if (window.scrollY + offset >= sectionTop) {
          current = id
        }
      })

      setActiveSection(current)
    }

    getActiveSection()

    window.addEventListener('scroll', getActiveSection, { passive: true })
    window.addEventListener('resize', getActiveSection)

    return () => {
      window.removeEventListener('scroll', getActiveSection)
      window.removeEventListener('resize', getActiveSection)
    }
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)

    const el = document.querySelector(href)
    if (!el) return

    const offset = 80
    const top =
      el.getBoundingClientRect().top + window.scrollY - offset

    window.scrollTo({
      top,
      behavior: 'smooth',
    })

    setActiveSection(href.replace('#', ''))
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white border-b border-slate-100">
      <div className="w-full px-6 sm:px-10 md:px-16 lg:px-24 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(({ label, href }) => {
            const isActive = activeSection === href.replace('#', '')

            return (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className={`
                  relative py-2 text-sm transition-colors duration-300
                  ${
                    isActive
                      ? 'font-bold text-primary-700'
                      : 'font-medium text-slate-500 hover:text-slate-800'
                  }
                `}
              >
                {label}

                <span
                  className={`
                    absolute left-1/2 -bottom-1 h-[4px] w-[65%] -translate-x-1/2 rounded-full bg-slate-200
                    transition-all duration-300 ease-out origin-center
                    ${
                      isActive
                        ? 'opacity-100 scale-x-100'
                        : 'opacity-0 scale-x-0'
                    }
                  `}
                />
              </button>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate(ROUTES.LOGIN)}>
            Masuk
          </Button>
          <Button size="sm" onClick={() => navigate(ROUTES.REGISTER)}>
            Mulai Sekarang
          </Button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 flex flex-col gap-2 shadow-md">
          {navLinks.map(({ label, href }) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className="text-sm text-slate-600 py-2 text-center hover:text-primary-600 transition-colors"
            >
              {label}
            </button>
          ))}
          <div className="flex gap-2 mt-2 pt-2 border-t border-slate-100">
            <Button variant="outline" size="sm" fullWidth onClick={() => navigate(ROUTES.LOGIN)}>
              Masuk
            </Button>
            <Button size="sm" fullWidth onClick={() => navigate(ROUTES.REGISTER)}>
              Mulai Sekarang
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar