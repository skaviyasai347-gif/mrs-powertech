import { motion } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'
import { COMPANY } from '../../data/siteData'

export default function FloatingButtons() {
  const whatsappNumber = `91${COMPANY.phones[0]}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-4"
    >

      {/* WhatsApp */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi%20MRS%20Powertech%2C%20I%27d%20like%20a%20free%20solar%20consultation.`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          group relative
          w-14 h-14
          rounded-full
          bg-[#25D366]
          flex items-center justify-center
          shadow-lg
          hover:scale-110
          transition-all duration-300
        "
      >
        <span className="
          absolute inset-0
          rounded-full
          bg-[#25D366]
          animate-ping
          opacity-20
        " />

        <MessageCircle
          size={27}
          className="text-white relative z-10"
        />
      </a>


      {/* Call */}
      <a
        href={`tel:${COMPANY.phones[0]}`}
        aria-label="Call us"
        className="
          w-14 h-14
          rounded-full
          btn-gold
          flex items-center justify-center
          shadow-gold
          hover:scale-110
          hover:rotate-6
          transition-all duration-300
        "
      >
        <Phone size={23} />
      </a>

    </motion.div>
  )
}