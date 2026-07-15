import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
} from 'lucide-react'

import { COMPANY, NAV_LINKS, SERVICES } from '../../data/siteData'

export default function Footer() {
  return (
    <footer className="relative bg-white border-t border-gold/20 pt-16 pb-8 overflow-hidden">

      {/* Soft gold glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#D4AF3720,transparent_60%)] pointer-events-none" />


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="
          relative max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4
          gap-10
        "
      >


        {/* Company */}
        {/* Company */}
<div>
  <div className="flex items-center gap-4 mb-5">
    <img
      src="/logo.jpg"
      alt="MRS Powertech Logo"
      className="w-16 h-16 object-contain"
      onError={(e) => {
        e.currentTarget.src = "/vite.svg";
      }}
    />

    <div>
      <p className="font-display font-bold text-2xl text-gold-gradient">
        {COMPANY.name}
      </p>

      <p className="text-xs tracking-[0.25em] uppercase text-gray-500">
        Empowering Life With Solar
      </p>
    </div>
  </div>

  <p className="text-gray-600 text-sm leading-relaxed">
    {COMPANY.tagline}. Premium residential, commercial and industrial
    solar solutions across Chennai.
  </p>

  <div className="flex gap-3 mt-6">
    {[Facebook, Instagram, Linkedin].map((Icon, i) => (
      <a
        key={i}
        href="#"
        className="
          w-10 h-10
          rounded-full
          border border-gold/30
          flex items-center justify-center
          text-gold
          hover:bg-gold
          hover:text-white
          hover:-translate-y-1
          transition-all duration-300
        "
      >
        <Icon size={17} />
      </a>
    ))}
  </div>
</div>




        {/* Navigation */}
        <div>

          <h4
            className="
              font-display text-gold mb-5
              text-sm tracking-[0.25em]
              uppercase
            "
          >
            Quick Links
          </h4>



          <ul className="space-y-3 text-sm">

            {NAV_LINKS.map((l)=>(
              <li key={l.path}>

                <Link
                  to={l.path}
                  className="
                    text-gray-600
                    hover:text-gold
                    transition-colors
                  "
                >
                  {l.label}
                </Link>

              </li>
            ))}

          </ul>


        </div>






        {/* Services */}
        <div>


          <h4
            className="
              font-display text-gold mb-5
              text-sm tracking-[0.25em]
              uppercase
            "
          >
            Services
          </h4>



          <ul className="space-y-3 text-sm">

            {SERVICES.slice(0,6).map((s)=>(
              <li
                key={s.title}
                className="
                  text-gray-600
                  hover:text-gold
                  transition-colors
                "
              >
                {s.title}
              </li>
            ))}

          </ul>


        </div>






        {/* Contact */}
        <div>


          <h4
            className="
              font-display text-gold mb-5
              text-sm tracking-[0.25em]
              uppercase
            "
          >
            Contact
          </h4>



          <ul className="space-y-4 text-sm text-gray-600">


            <li className="flex gap-3">

              <MapPin
                size={17}
                className="text-gold shrink-0 mt-1"
              />

              <span>
                {COMPANY.address}, {COMPANY.addressNote}
              </span>

            </li>



            {COMPANY.phones.map((p)=>(
              <li
                key={p}
                className="flex gap-3"
              >

                <Phone
                  size={17}
                  className="text-gold shrink-0"
                />


                <a
                  href={`tel:${p}`}
                  className="hover:text-gold transition-colors"
                >
                  {p}
                </a>


              </li>
            ))}




            <li className="flex gap-3">


              <Mail
                size={17}
                className="text-gold shrink-0"
              />


              <a
                href={`mailto:${COMPANY.email}`}
                className="hover:text-gold transition-colors"
              >
                {COMPANY.email}
              </a>


            </li>


          </ul>


        </div>



      </motion.div>






      {/* Map */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">


        <div
          className="
            rounded-2xl overflow-hidden
            border border-gold/30
            h-56
          "
        >

          <iframe
            title="MRS Powertech location"
            src={COMPANY.mapEmbed}
            className="
              w-full h-full
              grayscale-[20%]
              contrast-110
            "
            loading="lazy"
          />


        </div>


      </div>







      {/* Bottom */}

      <div
        className="
          relative max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          mt-8 pt-6
          border-t border-gray-200
          flex flex-col sm:flex-row
          justify-between
          items-center
          gap-3
          text-xs text-gray-500
        "
      >

        <p>
          © {new Date().getFullYear()} {COMPANY.name}.
          All rights reserved.
        </p>


        <p>
          Designed & engineered for solar excellence.
        </p>


      </div>








      {/* Developer Credit */}

      <div
        className="
          relative max-w-7xl mx-auto
          px-4 sm:px-6 lg:px-8
          mt-6 pt-6
          border-t border-gray-200
          text-center
        "
      >

        <p className="text-sm text-gray-500">

          Designed & Developed by{' '}


          <a
            href="https://growbrooo-software.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              font-semibold
              text-green-600
              hover:text-green-700
              transition-colors
            "
          >
            Growbroo
          </a>


        </p>


      </div>



    </footer>
  )
}