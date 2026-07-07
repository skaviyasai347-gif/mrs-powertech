import { Link } from 'react-router-dom'
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from 'lucide-react'
import { COMPANY, NAV_LINKS, SERVICES } from '../../data/siteData'

export default function Footer() {
  return (
    <footer className="relative bg-ink-950 border-t border-gold/10 pt-16 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Company */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full bg-ink-900 border border-gold/40 flex items-center justify-center overflow-hidden">
              <img
                src="/logo.png"
                alt="MRS Powertech logo"
                className="w-9 h-9 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>

            <p className="font-display font-bold text-lg text-gold-gradient">
              {COMPANY.name}
            </p>
          </div>

          <p className="text-white/60 text-sm leading-relaxed">
            {COMPANY.tagline}. Premium residential, commercial and industrial
            solar solutions across Chennai.
          </p>

          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full border border-gold/25 flex items-center justify-center text-gold/80 hover:bg-gold hover:text-ink-950 transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display text-gold mb-4 text-sm tracking-widest uppercase">
            Quick Links
          </h4>

          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.path}>
                <Link
                  to={l.path}
                  className="text-white/60 hover:text-gold transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display text-gold mb-4 text-sm tracking-widest uppercase">
            Services
          </h4>

          <ul className="space-y-2 text-sm">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.title} className="text-white/60">
                {s.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-gold mb-4 text-sm tracking-widest uppercase">
            Contact
          </h4>

          <ul className="space-y-3 text-sm text-white/60">
            <li className="flex gap-2">
              <MapPin
                size={16}
                className="text-gold shrink-0 mt-0.5"
              />
              {COMPANY.address}, {COMPANY.addressNote}
            </li>

            {COMPANY.phones.map((p) => (
              <li key={p} className="flex gap-2">
                <Phone size={16} className="text-gold shrink-0" />
                <a href={`tel:${p}`}>{p}</a>
              </li>
            ))}

            <li className="flex gap-2">
              <Mail size={16} className="text-gold shrink-0" />
              <a href={`mailto:${COMPANY.email}`}>
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Google Map */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="rounded-2xl overflow-hidden border border-gold/15 h-56">
          <iframe
            title="MRS Powertech location"
            src={COMPANY.mapEmbed}
            className="w-full h-full grayscale-[40%] contrast-125"
            loading="lazy"
          />
        </div>
      </div>

      {/* Copyright */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
        <p>
          &copy; {new Date().getFullYear()} {COMPANY.name}. All rights
          reserved.
        </p>

        <p>Designed &amp; engineered for solar excellence.</p>
      </div>

      {/* Designer Credit */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-white/10 text-center">
        <p className="text-sm text-white/50">
          Designed &amp; Developed by{' '}
          <a
            href="https://saikrishna-powerhouse.base44.app"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gold hover:text-yellow-300 transition-colors duration-300"
          >
            SaiKrishna
          </a>
        </p>
      </div>
    </footer>
  )
}