import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown, Sun } from 'lucide-react'
import AnimatedCounter from '../ui/AnimatedCounter'
import { STATS } from '../../data/siteData'

export default function Hero() {
  const heroImages = [
    '/hero1.jpeg',
    '/hero2.jpeg',
    '/hero3.jpeg',
  ]

  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImages[currentImage]})`,
          filter: 'brightness(0.75) contrast(1.08)',
        }}
      />

      {/* Decorative Sun */}
      <motion.div
        initial={{ opacity: 0, rotate: -8, scale: 0.9 }}
        animate={{ opacity: 0.15, rotate: 0, scale: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        className="absolute right-6 sm:right-16 top-24 sm:top-28 z-10"
      >
        <Sun
          className="text-gold w-32 h-32 sm:w-48 sm:h-48 animate-spin-slow"
          strokeWidth={0.75}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-block text-gold text-sm sm:text-base tracking-[0.25em] uppercase font-medium mt-8 mb-5"> 
          Chennai&apos;s Premium Solar Partner
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-tight max-w-4xl text-gray-900">
          <span className="text-gold-gradient">
            Power Your Future with{' '}
             Smart Solar Solutions
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-white text-lg sm:text-xl mt-6 max-w-2xl leading-relaxed"
        >
          Empowering Homes and Businesses with Reliable Solar Energy.
          Save on electricity bills, increase your property's value,
          and contribute to a cleaner, greener future with premium
          solar solutions designed for Chennai.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <Link
            to="/products"
            className="btn-gold rounded-full px-8 py-4 text-center font-semibold transition-all duration-300 hover:scale-105"
          >
            Explore Products
          </Link>

          <Link
            to="/contact"
            className="btn-outline-gold rounded-full px-8 py-4 text-center font-semibold transition-all duration-300 hover:scale-105"
          >
            Get Free Consultation
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white/90 backdrop-blur-md border border-gold/20 rounded-2xl p-5 sm:p-6 text-center shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-gold text-3xl font-bold">
                <AnimatedCounter
                  value={s.value}
                  suffix={s.suffix}
                />
              </div>

              <p className="text-gray-600 text-xs sm:text-sm mt-2 uppercase tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold z-20"
      >
        <ChevronDown size={30} />
      </motion.div>

    </section>
  )
}