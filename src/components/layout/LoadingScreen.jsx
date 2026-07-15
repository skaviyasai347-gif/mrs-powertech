import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.05,
            filter: 'blur(8px)',
          }}
          transition={{
            duration: 0.7,
            ease: 'easeInOut',
          }}
          className="
            fixed inset-0
            z-[10000]
            bg-gradient-to-br
            from-white
            via-amber-50
            to-yellow-100
            flex
            flex-col
            items-center
            justify-center
            overflow-hidden
          "
        >
          {/* Background Glow */}
          <div
            className="
              absolute
              w-72
              h-72
              rounded-full
              bg-amber-300/25
              blur-3xl
              animate-pulse
            "
          />

          {/* Logo Circle */}
          <motion.div
            initial={{
              scale: 0.6,
              opacity: 0,
              rotate: -15,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              rotate: 0,
            }}
            transition={{
              duration: 0.9,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="
              relative
              w-32
              h-32
              rounded-full
              border-2
              border-yellow-500
              bg-white
              shadow-[0_0_35px_rgba(212,175,55,0.35)]
              flex
              items-center
              justify-center
              overflow-hidden
            "
          >
            {/* Rotating Gold Ring */}
            <div
              className="
                absolute
                inset-0
                rounded-full
                border-[3px]
                border-transparent
                border-t-yellow-500
                animate-spin-slow
              "
            />

            {/* Company Logo */}
            <motion.img
              src="/logo.jpg"
              alt="MRS Powertech"
              className="
                w-24
                h-24
                object-contain
                rounded-full
                relative
                z-10
              "
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              onError={(e) => {
                console.error("Logo not found");
                e.currentTarget.style.display = "none";
              }}
            />
          </motion.div>

          {/* Brand Name */}
          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.35,
              duration: 0.6,
            }}
            className="
              mt-7
              font-display
              bg-gradient-to-r
              from-yellow-500
              via-amber-400
              to-yellow-600
              bg-clip-text
              text-transparent
              tracking-[0.35em]
              text-sm
              uppercase
            "
          >
            MRS Powertech
          </motion.p>

          {/* Tagline */}
          <motion.p
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.6,
            }}
            className="
              mt-3
              text-gray-600
              text-xs
              tracking-widest
              uppercase
            "
          >
            Powering Tomorrow With Clean Energy
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}