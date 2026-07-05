import { motion } from 'framer-motion'
import { Sun, Building2, Factory, PanelsTopLeft, Cpu, Hammer, Wrench, MessageSquare, Landmark } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { SERVICES } from '../../data/siteData'

const ICONS = [Sun, Building2, Factory, PanelsTopLeft, Cpu, Hammer, Wrench, MessageSquare, Landmark]

export default function ServicesGrid({ compact = false }) {
  const list = compact ? SERVICES.slice(0, 6) : SERVICES
  return (
    <section className="section-pad relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our Solutions" title="Complete Solar Solutions, Under One Roof" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((s, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="card-luxury p-7"
              >
                <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center mb-5">
                  <Icon className="text-ink-950" size={26} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
