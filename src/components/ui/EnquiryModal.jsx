import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { supabase } from '../../lib/supabase'

export default function EnquiryModal({ product, onClose }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const onSubmit = async (formData) => {
    const { error } = await supabase.from('enquiries').insert({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || null,
      message: formData.message || null,
      product_id: product?.id || null,
      product_name: product?.name || null,
      source: 'product_enquiry'
    })
    if (error) {
      toast.error('Could not submit enquiry. Please try again or call us directly.')
      return
    }
    toast.success('Enquiry submitted! Our team will contact you shortly.')
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="glass-strong rounded-2xl p-7 w-full max-w-md relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-gold">
            <X size={22} />
          </button>
          <h3 className="font-display font-bold text-xl mb-1">Enquire Now</h3>
          {product && <p className="text-white/50 text-sm mb-6">About: {product.name}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input {...register('name', { required: true })} placeholder="Your Name" className="w-full bg-ink-900 border border-gold/15 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold/50" />
              {errors.name && <p className="text-red-400 text-xs mt-1">Name is required</p>}
            </div>
            <div>
              <input {...register('phone', { required: true, minLength: 10 })} placeholder="Phone Number" className="w-full bg-ink-900 border border-gold/15 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold/50" />
              {errors.phone && <p className="text-red-400 text-xs mt-1">Valid phone number is required</p>}
            </div>
            <input {...register('email')} placeholder="Email (optional)" className="w-full bg-ink-900 border border-gold/15 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold/50" />
            <textarea {...register('message')} placeholder="Message (optional)" rows={3} className="w-full bg-ink-900 border border-gold/15 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold/50" />
            <button disabled={isSubmitting} type="submit" className="btn-gold rounded-full py-3 w-full font-semibold disabled:opacity-50">
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
