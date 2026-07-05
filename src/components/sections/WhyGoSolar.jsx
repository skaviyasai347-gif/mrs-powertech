import { motion } from 'framer-motion'
import { TrendingUp, Home, Leaf, Wrench, Landmark, Clock, BatteryCharging } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { WHY_GO_SOLAR } from '../../data/siteData'

const ICONS = [TrendingUp, Home, Leaf, Wrench, Landmark, Clock, BatteryCharging]

export default function WhyGoSolar() {
  return (
    <section className="section-pad bg-ink-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="The Solar Advantage" title="Why Go Solar" subtitle="A single investment that pays back in savings, comfort and long-term energy security." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_GO_SOLAR.map((item, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                className="relative p-6 rounded-2xl border border-gold/10 hover:border-gold/30 transition-colors group"
              >
                <Icon className="text-gold mb-4 group-hover:scale-110 transition-transform" size={30} />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
