import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (data) => {
    const { error } = await signIn(data.email, data.password)
    if (error) {
      toast.error(error.message || 'Invalid credentials')
      return
    }
    toast.success('Welcome back')
    navigate('/admin')
  }

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow" />
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        className="relative glass-strong rounded-2xl p-8 sm:p-10 w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
            <ShieldCheck className="text-gold" size={26} />
          </div>
          <h1 className="font-display font-bold text-2xl">Admin Login</h1>
          <p className="text-white/50 text-sm mt-1">MRS Powertech Management Portal</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-wide text-white/50 mb-2 block">Email</label>
            <input {...register('email', { required: true })} type="email" className="w-full bg-ink-900 border border-gold/15 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold/50" placeholder="admin@mrspowertech.in" />
            {errors.email && <p className="text-red-400 text-xs mt-1">Email is required</p>}
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide text-white/50 mb-2 block">Password</label>
            <div className="relative">
              <input {...register('password', { required: true })} type={showPassword ? 'text' : 'password'} className="w-full bg-ink-900 border border-gold/15 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold/50 pr-11" placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-xs mt-1">Password is required</p>}
          </div>

          <div className="flex justify-end">
            <Link to="/admin/forgot-password" className="text-xs text-gold/80 hover:text-gold">Forgot password?</Link>
          </div>

          <button disabled={isSubmitting} type="submit" className="btn-gold rounded-xl py-3.5 w-full font-semibold disabled:opacity-50">
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <Link to="/" className="block text-center text-white/40 text-xs mt-6 hover:text-gold">← Back to website</Link>
      </motion.div>
    </div>
  )
}
