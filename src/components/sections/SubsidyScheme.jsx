import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, FileText, ListChecks, IndianRupee } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { SUBSIDY_SLABS } from '../../data/siteData'

const ELIGIBILITY = [
  'Indian citizen with a valid electricity connection',
  'Ownership of a suitable rooftop for solar installation',
  'No prior rooftop solar subsidy availed on the same connection',
  'Valid electricity bill and consumer number'
]

const DOCUMENTS = [
  'Electricity bill (recent)', 'Consumer / customer ID number', 'Aadhaar card',
  'Bank passbook copy (for subsidy transfer)', 'Roof ownership proof'
]

const PROCESS = [
  'Register on the national Surya Ghar portal with consumer details',
  'Get your rooftop feasibility approved by the DISCOM',
  'Install through an empanelled vendor like MRS Powertech',
  'Submit installation details and net-meter application',
  'Receive subsidy directly in your bank account after commissioning'
]

export default function SubsidyScheme() {
  return (
    <section className="section-pad bg-ink-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Government Scheme"
          title="Pradhan Mantri Surya Ghar Muft Bijli Yojana"
          subtitle="India's flagship rooftop solar scheme, helping households access free electricity and generous capital subsidy. MRS Powertech manages the entire application on your behalf."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="card-luxury p-7">
            <div className="flex items-center gap-3 mb-5">
              <ListChecks className="text-gold" size={24} />
              <h3 className="font-display font-semibold text-xl">Who is Eligible</h3>
            </div>
            <ul className="space-y-3">
              {ELIGIBILITY.map((e) => (
                <li key={e} className="flex gap-3 text-sm text-white/70"><CheckCircle2 className="text-gold shrink-0 mt-0.5" size={18} /> {e}</li>
              ))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="card-luxury p-7">
            <div className="flex items-center gap-3 mb-5">
              <FileText className="text-gold" size={24} />
              <h3 className="font-display font-semibold text-xl">Documents Required</h3>
            </div>
            <ul className="space-y-3">
              {DOCUMENTS.map((d) => (
                <li key={d} className="flex gap-3 text-sm text-white/70"><CheckCircle2 className="text-gold shrink-0 mt-0.5" size={18} /> {d}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="card-luxury p-7 mb-10">
          <h3 className="font-display font-semibold text-xl mb-6">Application Process</h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {PROCESS.map((step, i) => (
              <div key={step} className="relative">
                <div className="w-9 h-9 rounded-full bg-gold-gradient text-ink-950 font-bold flex items-center justify-center mb-3 text-sm">{i + 1}</div>
                <p className="text-white/65 text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="card-luxury p-7 mb-10">
          <div className="flex items-center gap-3 mb-6">
            <IndianRupee className="text-gold" size={24} />
            <h3 className="font-display font-semibold text-xl">Subsidy Chart</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SUBSIDY_SLABS.map((slab) => (
              <div key={slab.capacity} className="rounded-xl border border-gold/15 p-5 text-center">
                <p className="text-white/50 text-xs uppercase tracking-wide mb-2">{slab.capacity}</p>
                <p className="font-display text-2xl font-bold text-gold-gradient">&#8377;{slab.subsidy.toLocaleString('en-IN')}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="text-center">
          <Link to="/calculator" className="btn-gold rounded-full px-8 py-4 inline-block font-semibold">Check Your Subsidy</Link>
        </div>
      </div>
    </section>
  )
}
