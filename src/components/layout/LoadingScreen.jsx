import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] bg-ink-950 flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative w-24 h-24 rounded-full border border-gold/30 flex items-center justify-center"
          >
            <div className="absolute inset-0 rounded-full border-t-2 border-gold animate-spin-slow" />
            <img src="/logo.png" alt="MRS Powertech" className="w-14 h-14 object-contain" onError={(e) => { e.currentTarget.style.display = 'none' }} />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 font-display text-gold-gradient tracking-[0.3em] text-sm uppercase"
          >
            MRS Powertech
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
