import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  FileText,
  ListChecks,
  IndianRupee,
} from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { SUBSIDY_SLABS } from '../../data/siteData'

const ELIGIBILITY = [
  'Indian citizen with a valid electricity connection',
  'Ownership of a suitable rooftop for solar installation',
  'No prior rooftop solar subsidy availed on the same connection',
  'Valid electricity bill and consumer number',
]

const DOCUMENTS = [
  'Electricity bill (recent)',
  'Consumer / Customer ID Number',
  'Aadhaar Card',
  'Bank Passbook Copy (for subsidy transfer)',
  'Roof Ownership Proof',
]

const PROCESS = [
  'Register on the National Surya Ghar Portal with consumer details',
  'Get rooftop feasibility approval from your DISCOM',
  'Install through an empanelled vendor like MRS Powertech',
  'Submit installation details and net-meter application',
  'Receive subsidy directly in your bank account',
]

export default function SubsidyScheme() {
  return (
    <section className="section-pad bg-white relative overflow-hidden">

      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-gold/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gold/10 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeading
          eyebrow="Government Scheme"
          title="Pradhan Mantri Surya Ghar Muft Bijli Yojana"
          subtitle="India's flagship rooftop solar scheme helping households access free electricity and generous government subsidy. MRS Powertech manages the complete application process for you."
        />

        {/* Eligibility & Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-gradient-to-br from-white via-yellow-50 to-white border border-gold/20 shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <ListChecks className="text-gold" size={28} />
              <h3 className="font-display text-2xl font-bold text-gray-900">
                Who is Eligible?
              </h3>
            </div>

            <ul className="space-y-4">
              {ELIGIBILITY.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-gray-600 leading-7"
                >
                  <CheckCircle2
                    className="text-gold mt-1 shrink-0"
                    size={20}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-gradient-to-br from-white via-yellow-50 to-white border border-gold/20 shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <FileText className="text-gold" size={28} />
              <h3 className="font-display text-2xl font-bold text-gray-900">
                Documents Required
              </h3>
            </div>

            <ul className="space-y-4">
              {DOCUMENTS.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-gray-600 leading-7"
                >
                  <CheckCircle2
                    className="text-gold mt-1 shrink-0"
                    size={20}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-br from-white via-yellow-50 to-white border border-gold/20 shadow-lg p-8 mb-10"
        >

          <h3 className="font-display text-2xl font-bold text-gray-900 mb-8">
            Application Process
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

            {PROCESS.map((step, i) => (
              <div key={step}>

                <div className="w-11 h-11 rounded-full bg-gold text-white font-bold flex items-center justify-center mb-4 shadow-md">
                  {i + 1}
                </div>

                <p className="text-gray-600 leading-7">
                  {step}
                </p>

              </div>
            ))}

          </div>

        </motion.div>

        {/* Subsidy Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-br from-white via-yellow-50 to-white border border-gold/20 shadow-lg p-8 mb-10"
        >

          <div className="flex items-center gap-3 mb-8">
            <IndianRupee className="text-gold" size={28} />
            <h3 className="font-display text-2xl font-bold text-gray-900">
              Government Subsidy
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            {SUBSIDY_SLABS.map((slab) => (
              <div
                key={slab.capacity}
                className="rounded-2xl border border-gold/20 bg-white shadow-md p-6 text-center hover:shadow-xl transition"
              >
                <p className="text-gray-500 uppercase text-xs tracking-wider mb-2">
                  {slab.capacity}
                </p>

                <p className="text-3xl font-bold text-gold">
                  ₹{slab.subsidy.toLocaleString('en-IN')}
                </p>
              </div>
            ))}

          </div>

        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/calculator"
            className="btn-gold rounded-full px-10 py-4 inline-block font-semibold shadow-lg"
          >
            Check Your Subsidy
          </Link>
        </div>

      </div>
    </section>
  )
}