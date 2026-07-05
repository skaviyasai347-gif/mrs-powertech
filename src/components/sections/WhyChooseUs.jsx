import { motion } from 'framer-motion'
import { BadgeCheck, Gem, Landmark, Wallet, Users, Zap, HeadphonesIcon, ShieldCheck, Star } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { WHY_CHOOSE_US } from '../../data/siteData'

const ICONS = [BadgeCheck, Gem, Landmark, Wallet, Users, Zap, HeadphonesIcon, ShieldCheck, Star]

export default function WhyChooseUs() {
  return (
    <section className="section-pad relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Why MRS Powertech" title="Built on Trust, Engineered for Performance" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((reason, i) => {
            const Icon = ICONS[i % ICONS.length]
            return (
              <motion.div
                key={reason}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                className="card-luxury p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                  <Icon className="text-gold" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-white/90">{reason}</h3>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
