import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, PackageSearch, FolderKanban, MessageSquareText, Star, LogOut, Menu, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'

const LINKS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: PackageSearch },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/enquiries', label: 'Enquiries', icon: MessageSquareText },
  { to: '/admin/reviews', label: 'Reviews', icon: Star }
]

export default function AdminLayout({ children, title }) {
  const [open, setOpen] = useState(false)
  const { signOut, user } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    toast.info('Signed out successfully')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-ink-950 flex">
      <aside className={`fixed lg:static z-40 inset-y-0 left-0 w-64 glass-strong lg:bg-ink-900 lg:border-r lg:border-gold/10 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 flex items-center gap-3 border-b border-gold/10">
          <img src="/logo.png" alt="logo" className="w-9 h-9 object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
          <div>
            <p className="font-display font-bold text-gold-gradient">MRS Powertech</p>
            <p className="text-[10px] text-white/40 uppercase tracking-widest">Admin Portal</p>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-gold/10 text-gold' : 'text-white/60 hover:text-gold hover:bg-gold/5'}`}
            >
              <l.icon size={18} /> {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-0 inset-x-0 p-4 border-t border-gold/10">
          <p className="text-xs text-white/40 mb-3 truncate px-2">{user?.email}</p>
          <button onClick={handleSignOut} className="flex items-center gap-2 text-sm text-white/60 hover:text-red-400 px-4 py-3 w-full rounded-xl hover:bg-red-400/5">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 glass border-b border-gold/10 px-5 py-4 flex items-center justify-between lg:justify-start gap-4">
          <button className="lg:hidden text-gold" onClick={() => setOpen(true)}><Menu size={22} /></button>
          <h1 className="font-display font-semibold text-lg">{title}</h1>
        </header>
        <motion.main initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="p-5 sm:p-8">
          {children}
        </motion.main>
      </div>
    </div>
  )
}
