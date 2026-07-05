import Hero from '../components/sections/Hero'
import WhyChooseUs from '../components/sections/WhyChooseUs'
import WhyGoSolar from '../components/sections/WhyGoSolar'
import ServicesGrid from '../components/sections/ServicesGrid'
import SubsidyScheme from '../components/sections/SubsidyScheme'
import ReviewsSlider from '../components/sections/ReviewsSlider'
import CTABanner from '../components/sections/CTABanner'

export default function Home() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <ServicesGrid compact />
      <WhyGoSolar />
      <SubsidyScheme />
      <ReviewsSlider compact />
      <CTABanner />
    </>
  )
}
