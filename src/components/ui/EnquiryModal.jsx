import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { toast } from 'react-toastify'
import { supabase } from '../../lib/supabase'

export default function EnquiryModal({ product, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (formData) => {
    const { error } = await supabase.from('enquiries').insert({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || null,
      message: formData.message || null,
      product_id: product?.id || null,
      product_name: product?.name || null,
      source: 'product_enquiry',
    })

    if (error) {
      toast.error(
        'Could not submit enquiry. Please try again or call us directly.'
      )
      return
    }

    toast.success('Enquiry submitted! Our team will contact you shortly.')
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 25 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md rounded-3xl bg-white border border-gold/20 shadow-2xl p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-gray-500 hover:text-gold transition"
          >
            <X size={22} />
          </button>

          <h3 className="font-display text-3xl font-bold text-gray-900 mb-2">
            Enquire Now
          </h3>

          {product && (
            <p className="text-gray-500 mb-6">
              About: <span className="font-semibold text-gold">{product.name}</span>
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            <div>
              <input
                {...register('name', { required: true })}
                placeholder="Your Name"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  Name is required
                </p>
              )}
            </div>

            <div>
              <input
                {...register('phone', {
                  required: true,
                  minLength: 10,
                })}
                placeholder="Phone Number"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  Valid phone number is required
                </p>
              )}
            </div>

            <input
              {...register('email')}
              placeholder="Email (Optional)"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
            />

            <textarea
              {...register('message')}
              rows={4}
              placeholder="Message (Optional)"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold/20 resize-none"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-gold w-full rounded-full py-3 font-semibold disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
            </button>

          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}