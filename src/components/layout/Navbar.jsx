import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShieldCheck } from 'lucide-react'

import { NAV_LINKS, COMPANY } from '../../data/siteData'

export default function Navbar() {

  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()


  useEffect(() => {

    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }

  }, [])


  return (

    <motion.header

      initial={{ y:-30, opacity:0 }}

      animate={{ y:0, opacity:1 }}

      transition={{
        duration:0.6
      }}

      className={`
        fixed
        top-0
        inset-x-0
        z-50
        transition-all
        duration-500

        ${scrolled ? 'py-2' : 'py-4'}

      `}

    >



      <div className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
      ">



        <div

          className={`
            
            bg-white

            rounded-2xl

            flex
            items-center
            justify-between

            px-4
            sm:px-6

            border
            border-[#D4AF37]/40

            shadow-xl

            transition-all
            duration-500


            ${scrolled ? 'py-2 shadow-[0_8px_30px_rgba(212,175,55,0.25)]' : 'py-3'}

          `}

        >




          {/* LOGO */}

<Link
  to="/"
  className="
    flex
    items-center
    gap-3
    group
    shrink-0
  "
>

  {/* Bigger logo width without increasing navbar height */}
  <div
    className="
      w-20
      h-11

      bg-white

      border
      border-[#D4AF37]

      rounded-lg

      overflow-hidden

      flex
      items-center
      justify-center

      shadow-md

      transition-transform
      duration-300

      group-hover:scale-105
    "
  >

    <img
      src="/logo.jpg"
      alt="MRS Powertech logo"
      className="
        w-full
        h-full
        object-contain
        p-1
      "
      onError={(e)=>{
        e.currentTarget.style.display="none"
      }}
    />

  </div>



  <div className="leading-tight">

    <p
      className="
        font-display
        font-bold
        text-lg
        tracking-wide
        text-[#D4AF37]
      "
    >
      {COMPANY.name}
    </p>

    <p
      className="
        text-[10px]
        uppercase
        tracking-[0.2em]
        text-gray-500
        -mt-1
      "
    >
      {COMPANY.tagline}
    </p>

  </div>

</Link>







          {/* DESKTOP MENU */}


          <nav className="
            hidden
            lg:flex
            items-center
            gap-2
          ">


            {
              NAV_LINKS.map((link)=>(


                <NavLink

                  key={link.path}

                  to={link.path}


                  className={({isActive})=>`

                    relative

                    px-4
                    py-2

                    rounded-full

                    text-sm

                    font-medium

                    transition-all
                    duration-300


                    ${
                      isActive

                      ? 
                      'text-[#D4AF37] bg-[#D4AF37]/10'

                      :

                      'text-gray-700 hover:text-[#D4AF37]'

                    }


                    after:absolute
                    after:left-1/2
                    after:-bottom-1

                    after:h-[2px]

                    after:bg-[#D4AF37]

                    after:transition-all
                    after:duration-300


                    ${
                      isActive

                      ?
                      'after:w-8 after:-translate-x-1/2'

                      :

                      'after:w-0 hover:after:w-8 hover:after:-translate-x-1/2'

                    }

                  `}

                >

                  {link.label}


                </NavLink>


              ))
            }


          </nav>







          {/* ADMIN BUTTON */}


          <div className="
            hidden
            lg:flex
          ">


            <button

              onClick={()=>navigate('/admin/login')}

              className="

                border

                border-[#D4AF37]

                text-[#D4AF37]

                rounded-full

                px-5
                py-2

                text-sm

                flex
                items-center
                gap-2

                hover:bg-[#D4AF37]

                hover:text-white

                transition-all

                duration-300

              "

            >

              <ShieldCheck size={16}/>

              Admin


            </button>


          </div>







          {/* MOBILE ICON */}


          <button

            className="
              lg:hidden
              text-[#D4AF37]
            "

            onClick={()=>setOpen(!open)}

          >

            {

              open

              ?

              <X size={27}/>

              :

              <Menu size={27}/>

            }


          </button>



        </div>



      </div>








      {/* MOBILE MENU */}


      <AnimatePresence>


      {

        open && (


        <motion.div


          initial={{
            opacity:0,
            y:-15
          }}

          animate={{
            opacity:1,
            y:0
          }}

          exit={{
            opacity:0,
            y:-15
          }}


          className="

            lg:hidden

            mx-4

            mt-2

            bg-white

            border

            border-[#D4AF37]/40

            rounded-2xl

            p-4

            shadow-xl

          "


        >



          <div className="
            flex
            flex-col
            gap-2
          ">



          {

            NAV_LINKS.map((link)=>(


              <NavLink

                key={link.path}

                to={link.path}

                onClick={()=>setOpen(false)}

                className={({isActive})=>`

                  px-4
                  py-3

                  rounded-xl

                  text-sm


                  ${
                    isActive

                    ?

                    'bg-[#D4AF37]/10 text-[#D4AF37]'

                    :

                    'text-gray-700 hover:text-[#D4AF37]'

                  }

                `}

              >

                {link.label}


              </NavLink>


            ))

          }






          <button

            onClick={()=>{

              setOpen(false)

              navigate('/admin/login')

            }}


            className="

              border

              border-[#D4AF37]

              text-[#D4AF37]

              rounded-xl

              px-4
              py-3

              mt-2

              text-sm

              flex

              justify-center

              items-center

              gap-2

            "

          >

            <ShieldCheck size={16}/>

            Admin Login


          </button>




          </div>



        </motion.div>


        )

      }


      </AnimatePresence>



    </motion.header>

  )

}