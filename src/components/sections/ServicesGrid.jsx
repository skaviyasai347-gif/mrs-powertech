import { motion } from 'framer-motion'
import {
  Sun,
  Building2,
  Factory,
  PanelsTopLeft,
  Cpu,
  Hammer,
  Wrench,
  MessageSquare,
  Landmark,
} from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { SERVICES } from '../../data/siteData'

const ICONS = [
  Sun,
  Building2,
  Factory,
  PanelsTopLeft,
  Cpu,
  Hammer,
  Wrench,
  MessageSquare,
  Landmark,
]

export default function ServicesGrid({ compact = false }) {
  const list = compact ? SERVICES.slice(0, 6) : SERVICES

  return (
    <section className="section-pad bg-white relative overflow-hidden">

      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-0 w-72 h-72 bg-gold/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeading
          eyebrow="Our Solutions"
          title="Complete Solar Solutions, Under One Roof"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {list.map((s, i) => {
            const Icon = ICONS[i % ICONS.length]

            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: (i % 3) * 0.1,
                }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-3xl bg-gradient-to-br from-[#FFFDF8] via-[#FFF8E7] to-[#FFFDF8] border border-gold/20 shadow-lg hover:shadow-2xl transition-all duration-300 p-8"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-200 to-gold flex items-center justify-center shadow-md mb-6">
                  <Icon className="text-white" size={28} />
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-gray-900 mb-3">
                  {s.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-7">
                  {s.desc}
                </p>
              </motion.div>
            )
          })}

        </div>

      </div>
    </section>
  )
}