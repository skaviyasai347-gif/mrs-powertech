import { motion } from 'framer-motion'
import {
  TrendingUp,
  Home,
  Leaf,
  Wrench,
  Landmark,
  Clock,
  BatteryCharging,
} from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { WHY_GO_SOLAR } from '../../data/siteData'

const ICONS = [
  TrendingUp,
  Home,
  Leaf,
  Wrench,
  Landmark,
  Clock,
  BatteryCharging,
]

export default function WhyGoSolar() {
  return (
    <section className="section-pad bg-white relative overflow-hidden">

      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gold/10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeading
          eyebrow="The Solar Advantage"
          title="Why Go Solar"
          subtitle="A single investment that pays back in savings, comfort and long-term energy security."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {WHY_GO_SOLAR.map((item, i) => {
            const Icon = ICONS[i % ICONS.length]

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: (i % 4) * 0.08,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="rounded-3xl bg-gradient-to-br from-white via-yellow-50 to-white border border-gold/20 shadow-lg hover:shadow-2xl transition-all duration-300 p-7"
              >

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-200 to-gold flex items-center justify-center shadow-md mb-6">
                  <Icon
                    className="text-white"
                    size={30}
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-7">
                  {item.desc}
                </p>

              </motion.div>
            )
          })}

        </div>

      </div>

    </section>
  )
}