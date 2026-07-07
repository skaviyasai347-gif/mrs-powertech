import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignment =
    align === 'center'
      ? 'items-center text-center mx-auto'
      : 'items-start text-left'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className={`flex flex-col ${alignment} max-w-3xl mb-12`}
    >
      {eyebrow && (
        <span className="text-gold text-xs tracking-[0.35em] uppercase font-semibold mb-4">
          {eyebrow}
        </span>
      )}

      <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-black">
        {title}
      </h2>

      {subtitle && (
        <p className="text-gray-600 mt-5 text-base sm:text-lg leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}

      <div className="divider-gold w-24 mt-7" />
    </motion.div>
  )
}