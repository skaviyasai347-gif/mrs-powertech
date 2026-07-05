import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CTABanner() {
  return (
    <section className="relative section-pad overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl glass-strong p-10 sm:p-16 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-radial-glow" />
          <h2 className="relative font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Ready to Switch to <span className="text-gold-gradient">Solar?</span>
          </h2>
          <p className="relative text-white/60 max-w-xl mx-auto mb-8">
            Get a free site assessment and a customised solar plan from our expert team, with complete subsidy assistance.
          </p>
          <div className="relative flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator" className="btn-gold rounded-full px-8 py-4 font-semibold">Calculate Your Savings</Link>
            <Link to="/contact" className="btn-outline-gold rounded-full px-8 py-4 font-semibold">Talk to an Expert</Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
