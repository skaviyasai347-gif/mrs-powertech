import { motion } from 'framer-motion'
import { Target, Eye, HeartHandshake, Users } from 'lucide-react'
import SectionHeading from '../components/ui/SectionHeading'
import AnimatedCounter from '../components/ui/AnimatedCounter'
import CTABanner from '../components/sections/CTABanner'
import { STATS } from '../data/siteData'

const TIMELINE = [
  { year: '2019', title: 'Founded in Chennai', desc: 'MRS Powertech began with a mission to make solar energy accessible for local homes.' },
  { year: '2021', title: 'Commercial Expansion', desc: 'Extended services to commercial and industrial rooftop installations.' },
  { year: '2023', title: 'Subsidy Partner', desc: 'Became a trusted guide for the government solar subsidy application process.' },
  { year: '2026', title: '450+ Installations', desc: 'Crossed a major milestone in completed residential, commercial and industrial projects.' }
]

const TEAM = [
  { name: 'Site Engineering Team', role: 'Installation & Commissioning' },
  { name: 'Design & Consultation Team', role: 'System Design & Subsidy Guidance' },
  { name: 'Customer Success Team', role: 'After-Sales Support & Maintenance' }
]

export default function About() {
  return (
    <>
      <section className="section-pad bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <SectionHeading
            eyebrow="Our Story"
            title="Empowering Life with Solar, One Rooftop at a Time"
            subtitle="MRS Powertech is a Chennai-based solar energy company delivering premium residential, commercial and industrial solar solutions — from consultation and installation to government subsidy assistance and long-term maintenance."
            align="left"
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {[
              { icon: Target, title: 'Our Mission', text: 'Make clean, reliable solar energy accessible and affordable for every home and business in Chennai.' },
              { icon: Eye, title: 'Our Vision', text: 'To be Tamil Nadu’s most trusted name in premium solar installation and long-term energy partnership.' },
              { icon: HeartHandshake, title: 'Our Values', text: 'Certified craftsmanship, transparent pricing, and lifetime support — built on trust, not shortcuts.' }
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-gold/20 shadow-lg rounded-2xl p-7"
              >
                <v.icon className="text-gold mb-4" size={28} />

                <h3 className="font-display font-semibold text-xl mb-2 text-black">
                  {v.title}
                </h3>

                <p className="text-black/60 text-sm leading-relaxed">
                  {v.text}
                </p>

              </motion.div>
            ))}
          </div>


          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">

            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-white border border-gold/20 rounded-2xl p-6 text-center shadow-md"
              >
                <AnimatedCounter value={s.value} suffix={s.suffix} />

                <p className="text-black/50 text-xs sm:text-sm mt-2 uppercase tracking-wide">
                  {s.label}
                </p>

              </div>
            ))}

          </div>


          <SectionHeading
            eyebrow="Our Journey"
            title="Milestones"
            align="left"
          />


          <div className="relative border-l border-gold/30 pl-8 space-y-10 mb-20">

            {TIMELINE.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
              >

                <div className="absolute -left-[2.55rem] top-1 w-4 h-4 rounded-full bg-gold-gradient" />

                <span className="text-gold font-display font-bold text-lg">
                  {t.year}
                </span>

                <h3 className="font-semibold text-lg mt-1 text-black">
                  {t.title}
                </h3>

                <p className="text-black/60 text-sm mt-1 max-w-xl">
                  {t.desc}
                </p>

              </motion.div>
            ))}

          </div>


          <SectionHeading
            eyebrow="Our People"
            title="Meet Our Team"
            align="left"
          />


          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            {TEAM.map((m) => (
              <div
                key={m.name}
                className="bg-white border border-gold/20 shadow-lg rounded-2xl p-7 text-center"
              >

                <div className="w-16 h-16 rounded-full bg-gold/10 mx-auto flex items-center justify-center mb-4">

                  <Users className="text-gold" size={26} />

                </div>

                <h3 className="font-semibold text-black">
                  {m.name}
                </h3>

                <p className="text-black/50 text-sm mt-1">
                  {m.role}
                </p>

              </div>
            ))}

          </div>


        </div>
      </section>

      <CTABanner />

    </>
  )
}