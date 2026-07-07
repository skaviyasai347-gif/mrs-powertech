import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { FALLBACK_REVIEWS } from '../data/siteData'
import SectionHeading from '../components/ui/SectionHeading'
import CTABanner from '../components/sections/CTABanner'

export default function Reviews() {

  const [reviews, setReviews] = useState(FALLBACK_REVIEWS)


  useEffect(() => {

    let alive = true

    async function load() {

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })


      if (alive && !error && data?.length) {
        setReviews(data)
      }

    }

    load()

    return () => {
      alive = false
    }

  }, [])



  const avg = (
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
  ).toFixed(1)



  return (

    <>

      <section className="section-pad bg-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          <SectionHeading
            eyebrow="Customer Reviews"
            title="What Our Customers Say"
            subtitle={`Rated ${avg} / 5 by ${reviews.length}+ verified customers across Chennai.`}
          />



          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">


            {reviews.map((r, i) => (

              <motion.div

                key={r.id}

                initial={{ opacity: 0, y: 24 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true, margin: '-40px' }}

                transition={{
                  duration: 0.45,
                  delay: (i % 3) * 0.08
                }}

                className="bg-white border border-gold/20 rounded-2xl shadow-lg p-7"

              >


                <Quote
                  className="text-gold/50 mb-4"
                  size={28}
                />



                <p className="text-black/70 text-sm leading-relaxed mb-5">

                  {r.text}

                </p>



                <div className="flex items-center gap-1 mb-2">

                  {Array.from({ length: 5 }).map((_, j) => (

                    <Star

                      key={j}

                      size={16}

                      className={
                        j < r.rating
                          ? 'text-gold fill-gold'
                          : 'text-black/20'
                      }

                    />

                  ))}

                </div>



                <p className="font-semibold text-black">

                  {r.name}

                </p>



              </motion.div>

            ))}


          </div>


        </div>


      </section>


      <CTABanner />


    </>

  )

}