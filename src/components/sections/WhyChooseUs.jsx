import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Gem,
  Landmark,
  Wallet,
  Users,
  Zap,
  HeadphonesIcon,
  ShieldCheck,
  Star,
} from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { WHY_CHOOSE_US } from '../../data/siteData'

const ICONS = [
  BadgeCheck,
  Gem,
  Landmark,
  Wallet,
  Users,
  Zap,
  HeadphonesIcon,
  ShieldCheck,
  Star,
]

export default function WhyChooseUs() {
  return (
    <section className="section-pad bg-white relative overflow-hidden">

      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-gold/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gold/10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeading
          eyebrow="Why MRS Powertech"
          title="Built on Trust, Engineered for Performance"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {WHY_CHOOSE_US.map((reason, i) => {
            const Icon = ICONS[i % ICONS.length]

            return (
              <motion.div
                key={reason}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.5,
                  delay: (i % 3) * 0.1,
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="rounded-3xl bg-gradient-to-br from-white via-yellow-50 to-white border border-gold/20 shadow-lg hover:shadow-2xl transition-all duration-300 p-7 flex items-start gap-5"
              >

                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-200 to-gold flex items-center justify-center shrink-0 shadow-md">
                  <Icon className="text-white" size={26} />
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 leading-7">
                    {reason}
                  </h3>
                </div>

              </motion.div>
            )
          })}

        </div>

      </div>

    </section>
  )
}