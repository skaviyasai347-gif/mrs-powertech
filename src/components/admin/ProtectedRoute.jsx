import { Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()


  if (loading) {
    return (
      <div
        className="
          min-h-screen
          bg-ink-950
          flex
          flex-col
          items-center
          justify-center
          gap-5
        "
      >

        {/* Spinner */}
        <motion.div
          animate={{
            rotate:360
          }}
          transition={{
            duration:1.2,
            repeat:Infinity,
            ease:'linear'
          }}
          className="
            w-12 h-12
            rounded-full
            border-2
            border-gold/20
            border-t-gold
          "
        />


        <motion.p
          initial={{
            opacity:0
          }}
          animate={{
            opacity:1
          }}
          transition={{
            duration:.5
          }}
          className="
            text-sm
            text-white/50
            tracking-widest
            uppercase
          "
        >
          Verifying Admin Access...
        </motion.p>


      </div>
    )
  }


  if (!session) {
    return (
      <Navigate
        to="/admin/login"
        replace
      />
    )
  }


  return children
}