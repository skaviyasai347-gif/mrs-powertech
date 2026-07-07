import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CTABanner() {
  return (
    <section className="relative section-pad overflow-hidden bg-white">

      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-white via-yellow-50 to-white shadow-2xl p-10 sm:p-16"
        >

          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/10 rounded-full blur-3xl"></div>

          <h2 className="relative font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-5">
            Ready to Switch to{' '}
            <span className="text-gold-gradient">
              Solar?
            </span>
          </h2>

          <div className="w-28 h-1 bg-gold mx-auto rounded-full mb-6"></div>

          <p className="relative text-gray-600 text-lg max-w-2xl mx-auto text-center leading-relaxed mb-10">
            Get a free site assessment and a customised solar plan from our
            expert team, with complete subsidy assistance.
          </p>

          <div className="relative flex flex-col sm:flex-row justify-center gap-5">

            <Link
              to="/calculator"
              className="btn-gold rounded-full px-8 py-4 font-semibold text-center shadow-lg"
            >
              Calculate Your Savings
            </Link>

            <Link
              to="/contact"
              className="btn-outline-gold rounded-full px-8 py-4 font-semibold text-center"
            >
              Talk to an Expert
            </Link>

          </div>

        </motion.div>

      </div>

    </section>
  )
}