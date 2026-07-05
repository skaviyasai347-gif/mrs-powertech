import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown, Sun } from 'lucide-react'
import AnimatedCounter from '../ui/AnimatedCounter'
import { STATS } from '../../data/siteData'

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow" />
      <div className="absolute -top-40 -right-40 w-[36rem] h-[36rem] bg-gold/10 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] bg-gold/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
        animate={{ opacity: 0.25, rotate: 0, scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="absolute right-6 sm:right-16 top-24 sm:top-28"
      >
        <Sun className="text-gold w-32 h-32 sm:w-48 sm:h-48 animate-spin-slow" strokeWidth={0.75} />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-block text-gold text-xs sm:text-sm tracking-[0.35em] uppercase font-semibold mb-6"
        >
          Chennai&rsquo;s Premium Solar Partner
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.05] max-w-4xl"
        >
          Power Your Future with{' '}
          <span className="text-gold-gradient">Smart Solar Solutions</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-white/65 text-lg sm:text-xl mt-6 max-w-2xl leading-relaxed"
        >
          Empowering Homes and Businesses with Reliable Solar Energy
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <Link to="/products" className="btn-gold rounded-full px-8 py-4 text-center font-semibold">
            Explore Products
          </Link>
          <Link to="/contact" className="btn-outline-gold rounded-full px-8 py-4 text-center font-semibold">
            Get Free Consultation
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          {STATS.map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 sm:p-6 text-center">
              <AnimatedCounter value={s.value} suffix={s.suffix} />
              <p className="text-white/50 text-xs sm:text-sm mt-2 uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/70"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  )
}
