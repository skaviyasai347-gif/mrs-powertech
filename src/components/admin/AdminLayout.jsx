import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  PackageSearch,
  FolderKanban,
  MessageSquareText,
  Star,
  LogOut,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react'

import { useAuth } from '../../context/AuthContext'
import { toast } from 'react-toastify'


const LINKS = [
  {
    to:'/admin',
    label:'Dashboard',
    icon:LayoutDashboard,
    end:true
  },
  {
    to:'/admin/products',
    label:'Products',
    icon:PackageSearch
  },
  {
    to:'/admin/projects',
    label:'Projects',
    icon:FolderKanban
  },
  {
    to:'/admin/enquiries',
    label:'Enquiries',
    icon:MessageSquareText
  },
  {
    to:'/admin/reviews',
    label:'Reviews',
    icon:Star
  }
]


export default function AdminLayout({children,title}) {

  const [open,setOpen]=useState(false)

  const {
    signOut,
    user
  } = useAuth()

  const navigate = useNavigate()



  const handleSignOut = async()=>{

    await signOut()

    toast.info(
      'Signed out successfully'
    )

    navigate('/admin/login')
  }



  return (

    <div className="
      min-h-screen
      bg-ink-950
      flex
      overflow-hidden
    ">


      {/* Sidebar */}

      <motion.aside

        initial={{
          x:-30,
          opacity:0
        }}

        animate={{
          x:0,
          opacity:1
        }}

        transition={{
          duration:.5
        }}

        className={`
          fixed lg:static
          z-40
          inset-y-0 left-0
          w-64

          bg-ink-900
          border-r
          border-gold/10

          transform
          transition-transform
          duration-300

          ${
            open
            ? 'translate-x-0'
            : '-translate-x-full'
          }

          lg:translate-x-0
        `}
      >


        {/* Logo */}

        <div
          className="
            p-6
            flex
            items-center
            gap-3
            border-b
            border-gold/10
          "
        >

          <div className="
            w-10 h-10
            rounded-full
            bg-white
            flex items-center justify-center
            overflow-hidden
          ">

            <img
              src="/logo.png"
              alt="logo"
              className="w-8 h-8 object-contain"
            />

          </div>


          <div>

            <p className="
              font-display
              font-bold
              text-gold-gradient
            ">
              MRS Powertech
            </p>

            <p className="
              text-[10px]
              text-white/40
              uppercase
              tracking-widest
            ">
              Admin Portal
            </p>

          </div>


        </div>



        {/* Navigation */}

        <nav className="p-4 space-y-2">

          {LINKS.map((l)=>(

            <NavLink

              key={l.to}

              to={l.to}

              end={l.end}

              onClick={()=>setOpen(false)}

              className={({isActive})=>

                `
                flex
                items-center
                gap-3

                px-4 py-3

                rounded-xl

                text-sm
                font-medium

                transition-all

                ${
                  isActive

                  ? 
                  'bg-gold/10 text-gold shadow-[0_0_15px_rgba(212,175,55,0.15)]'

                  :

                  'text-white/60 hover:text-gold hover:bg-gold/5'
                }

                `
              }

            >

              <l.icon size={18}/>

              {l.label}

            </NavLink>

          ))}


        </nav>



        {/* Bottom */}

        <div
          className="
            absolute
            bottom-0
            inset-x-0
            p-4
            border-t
            border-gold/10
          "
        >

          <div className="
            flex
            items-center
            gap-2
            mb-3
            px-2
          ">

            <ShieldCheck
              size={15}
              className="text-gold"
            />

            <p className="
              text-xs
              text-white/40
              truncate
            ">
              {user?.email}
            </p>

          </div>


          <button

            onClick={handleSignOut}

            className="
              flex
              items-center
              gap-2

              text-sm
              text-white/60

              hover:text-red-400

              px-4 py-3

              w-full

              rounded-xl

              hover:bg-red-400/5

              transition-colors
            "

          >

            <LogOut size={18}/>

            Sign Out

          </button>


        </div>


      </motion.aside>




      {/* Mobile overlay */}

      {open && (

        <div

          className="
            fixed
            inset-0
            bg-black/60
            z-30
            lg:hidden
          "

          onClick={()=>setOpen(false)}

        />

      )}




      {/* Main */}

      <div className="
        flex-1
        min-w-0
      ">


        <header

          className="
            sticky
            top-0
            z-20

            bg-ink-950/80
            backdrop-blur-xl

            border-b
            border-gold/10

            px-5
            py-4

            flex
            items-center
            gap-4
          "

        >

          <button

            className="
              lg:hidden
              text-gold
            "

            onClick={()=>setOpen(true)}

          >

            <Menu size={23}/>

          </button>


          <h1 className="
            font-display
            font-semibold
            text-lg
            text-white
          ">
            {title}
          </h1>


        </header>




        <motion.main

          initial={{
            opacity:0,
            y:10
          }}

          animate={{
            opacity:1,
            y:0
          }}

          transition={{
            duration:.4
          }}

          className="
            p-5
            sm:p-8
          "

        >

          {children}

        </motion.main>


      </div>


    </div>

  )
}