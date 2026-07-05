import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShieldCheck } from 'lucide-react'
import { NAV_LINKS, COMPANY } from '../../data/siteData'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`}>
        <div className={`glass rounded-2xl flex items-center justify-between px-4 sm:px-6 transition-all duration-500 ${scrolled ? 'py-2 shadow-glass' : 'py-3'}`}>
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-ink-900 border border-gold/40 flex items-center justify-center overflow-hidden">
              <img src="/logo.jpeg" alt="MRS Powertech logo" className="w-9 h-9 object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            </div>
            <div className="leading-tight">
              <p className="font-display font-bold text-lg tracking-wide text-gold-gradient">{COMPANY.name}</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 -mt-1">{COMPANY.tagline}</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 text-sm font-medium transition-colors rounded-full ${
                    isActive ? 'text-gold' : 'text-white/75 hover:text-gold'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => navigate('/admin/login')} className="btn-outline-gold rounded-full px-4 py-2 text-sm flex items-center gap-2">
              <ShieldCheck size={16} /> Admin
            </button>
          </div>

          <button className="lg:hidden text-gold" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden mx-4 mt-2 glass-strong rounded-2xl p-4"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium ${isActive ? 'bg-gold/10 text-gold' : 'text-white/80'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <button
                onClick={() => { setOpen(false); navigate('/admin/login') }}
                className="btn-outline-gold rounded-xl px-4 py-3 text-sm mt-2 flex items-center justify-center gap-2"
              >
                <ShieldCheck size={16} /> Admin Login
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
