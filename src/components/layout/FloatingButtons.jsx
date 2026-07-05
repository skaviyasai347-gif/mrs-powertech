import { MessageCircle, Phone } from 'lucide-react'
import { COMPANY } from '../../data/siteData'

export default function FloatingButtons() {
  const whatsappNumber = `91${COMPANY.phones[0]}`
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${whatsappNumber}?text=Hi%20MRS%20Powertech%2C%20I%27d%20like%20a%20free%20solar%20consultation.`}
        target="_blank" rel="noreferrer"
        className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="text-white" size={26} />
      </a>
      <a
        href={`tel:${COMPANY.phones[0]}`}
        className="w-14 h-14 rounded-full btn-gold flex items-center justify-center shadow-gold hover:scale-110 transition-transform"
        aria-label="Call us"
      >
        <Phone size={22} />
      </a>
    </div>
  )
}
