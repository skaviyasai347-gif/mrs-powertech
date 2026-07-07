import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { COMPANY } from '../data/siteData'
import SectionHeading from '../components/ui/SectionHeading'

export default function Contact() {

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()


  const onSubmit = async (formData) => {

    const { error } = await supabase.from('enquiries').insert({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || null,
      message: formData.message,
      source: 'contact_form'
    })


    if (error) {
      toast.error('Something went wrong. Please call us directly.')
      return
    }

    toast.success('Message sent! We will get back to you shortly.')
    reset()

  }



  return (

    <section className="section-pad bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <SectionHeading
          eyebrow="Get In Touch"
          title="Contact Us"
          subtitle="Have a question or ready for a free consultation? Reach out — we respond within the same business day."
        />



        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">


          <motion.form
            initial={{opacity:0,x:-20}}
            whileInView={{opacity:1,x:0}}
            viewport={{once:true}}
            transition={{duration:.6}}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white border border-gold/20 rounded-2xl shadow-lg p-7 sm:p-9 lg:col-span-3 space-y-4"
          >


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              <div>

                <input
                  {...register('name',{required:true})}
                  placeholder="Full Name"
                  className="w-full bg-white border border-gold/30 rounded-xl px-4 py-3 text-sm text-black outline-none focus:border-gold"
                />

                {errors.name &&
                  <p className="text-red-500 text-xs mt-1">
                    Name is required
                  </p>
                }

              </div>



              <div>

                <input
                  {...register('phone',{required:true,minLength:10})}
                  placeholder="Phone Number"
                  className="w-full bg-white border border-gold/30 rounded-xl px-4 py-3 text-sm text-black outline-none focus:border-gold"
                />

                {errors.phone &&
                  <p className="text-red-500 text-xs mt-1">
                    Valid phone number required
                  </p>
                }

              </div>

            </div>



            <input
              {...register('email')}
              type="email"
              placeholder="Email Address"
              className="w-full bg-white border border-gold/30 rounded-xl px-4 py-3 text-sm text-black outline-none focus:border-gold"
            />



            <div>

              <textarea
                {...register('message',{required:true})}
                rows={5}
                placeholder="Tell us about your solar requirement..."
                className="w-full bg-white border border-gold/30 rounded-xl px-4 py-3 text-sm text-black outline-none focus:border-gold"
              />


              {errors.message &&
                <p className="text-red-500 text-xs mt-1">
                  Please share a short message
                </p>
              }

            </div>



            <button
              disabled={isSubmitting}
              type="submit"
              className="btn-gold rounded-full py-3.5 w-full font-semibold disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>


          </motion.form>





          <motion.div
            initial={{opacity:0,x:20}}
            whileInView={{opacity:1,x:0}}
            viewport={{once:true}}
            transition={{duration:.6}}
            className="lg:col-span-2 space-y-5"
          >


            {[
              {
                icon: MapPin,
                title:'Our Office',
                content:<>{COMPANY.address}<br/>{COMPANY.addressNote}</>
              },
              {
                icon: Phone,
                title:'Call Us',
                content:
                  COMPANY.phones.map((p)=>(
                    <a
                      key={p}
                      href={`tel:${p}`}
                      className="block text-black/60 text-sm hover:text-gold"
                    >
                      {p}
                    </a>
                  ))
              },
              {
                icon: Mail,
                title:'Email Us',
                content:
                  <a
                    href={`mailto:${COMPANY.email}`}
                    className="text-black/60 text-sm hover:text-gold"
                  >
                    {COMPANY.email}
                  </a>
              },
              {
                icon: Clock,
                title:'Business Hours',
                content:
                  <>Mon – Sat: 9:00 AM – 7:00 PM<br/>Sunday: By appointment</>
              }
            ].map((item)=>{

              const Icon=item.icon

              return (

                <div
                  key={item.title}
                  className="bg-white border border-gold/20 rounded-2xl shadow-lg p-6 flex gap-4"
                >

                  <Icon
                    className="text-gold shrink-0"
                    size={22}
                  />

                  <div>

                    <h3 className="font-semibold text-black mb-1">
                      {item.title}
                    </h3>

                    <p className="text-black/60 text-sm">
                      {item.content}
                    </p>

                  </div>

                </div>

              )

            })}



            <a
              href={`https://wa.me/91${COMPANY.phones[0]}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] text-white font-semibold py-3.5"
            >
              <MessageCircle size={18}/>
              Chat on WhatsApp
            </a>



          </motion.div>


        </div>



        <div className="rounded-2xl overflow-hidden border border-gold/20 h-80 mt-10">

          <iframe
            title="MRS Powertech location map"
            src={COMPANY.mapEmbed}
            className="w-full h-full"
            loading="lazy"
          />

        </div>



      </div>


    </section>

  )

}