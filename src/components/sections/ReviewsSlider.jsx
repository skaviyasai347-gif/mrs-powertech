import { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Star, Quote } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import { supabase } from '../../lib/supabase'
import { FALLBACK_REVIEWS } from '../../data/siteData'
import SectionHeading from '../ui/SectionHeading'

export default function ReviewsSlider({ compact = false }) {
  const [reviews, setReviews] = useState(FALLBACK_REVIEWS)

  useEffect(() => {
    let active = true

    async function load() {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })

      if (active && !error && data?.length) {
        setReviews(data)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [])

  const list = compact ? reviews.slice(0, 6) : reviews

  return (
    <section className="section-pad bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeading
          eyebrow="Customer Voices"
          title="Trusted by Homes and Businesses Across Chennai"
        />

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={28}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-12"
        >
          {list.map((r) => (
            <SwiperSlide key={r.id}>

              <div className="h-full rounded-3xl border border-gold/20 bg-gradient-to-br from-white via-yellow-50 to-white shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 p-7 flex flex-col">

                <Quote
                  className="text-gold mb-5"
                  size={34}
                />

                <p className="text-gray-600 leading-7 text-sm flex-1">
                  {r.text}
                </p>

                <div className="flex items-center gap-1 mt-6 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={17}
                      className={
                        i < r.rating
                          ? 'fill-gold text-gold'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>

                <p className="font-semibold text-gray-900 text-lg">
                  {r.name}
                </p>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  )
}