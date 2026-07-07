import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator as CalcIcon, Zap, IndianRupee, Leaf, Clock, Gauge, PiggyBank, Landmark } from 'lucide-react'
import { calculateSolarPlan } from '../lib/solarCalculator'
import SectionHeading from '../components/ui/SectionHeading'
import CTABanner from '../components/sections/CTABanner'

const CHENNAI_AREAS = ['Ambattur', 'Anna Nagar', 'Porur', 'Velachery', 'T. Nagar', 'Adyar', 'Tambaram', 'Other']

export default function Calculator() {
  const [monthlyUnits, setMonthlyUnits] = useState('')
  const [location, setLocation] = useState('Ambattur')
  const [connectionType, setConnectionType] = useState('Residential')
  const [result, setResult] = useState(null)

  const onCalculate = (e) => {
  e.preventDefault()

  const units = Number(monthlyUnits)

  if (!units || units <= 0) return

  setResult(
    calculateSolarPlan({
      monthlyUnits: units,
      connectionType,
    })
  )
}

  const cards = result
    ? [
        { icon: Gauge, label: 'Estimated System Size', value: `${result.systemSizeKw} kW` },
        { icon: Zap, label: 'Monthly Units', value: `${result.monthlyUnits.toLocaleString('en-IN')} kWh` },
        { icon: PiggyBank, label: 'Yearly Savings', value: `\u20b9${result.yearlySavings.toLocaleString('en-IN')}` },
        { icon: IndianRupee, label: 'Estimated Cost', value: `\u20b9${result.estimatedCost.toLocaleString('en-IN')}` },
        { icon: Landmark, label: 'Government Subsidy', value: result.subsidy ? `\u20b9${result.subsidy.toLocaleString('en-IN')}` : 'Not applicable' },
        { icon: Clock, label: 'Payback Period', value: result.paybackYears ? `${result.paybackYears} years` : '—' },
        { icon: PiggyBank, label: '25 Year Savings', value: `\u20b9${result.twentyFiveYearSavings.toLocaleString('en-IN')}` },
        { icon: Leaf, label: 'CO\u2082 Reduction / Year', value: `${result.co2ReductionTonnesPerYear} tonnes` }
      ]
    : []

  return (
    <>
      <section className="section-pad">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Plan Your Savings" title="Solar Savings Calculator" subtitle="Enter your monthly electricity consumption (units) to get an instant, indicative solar sizing and savings estimate." />

          <form onSubmit={onCalculate} className="card-luxury p-7 sm:p-10 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            <div>
              <label className="text-xs uppercase tracking-wide text-white/50 mb-2 block">
  Monthly Electricity Consumption (Units)
</label>

<input
  type="number"
  min="1"
  required
  value={monthlyUnits}
  onChange={(e) => setMonthlyUnits(e.target.value)}
  placeholder="e.g. 450"
                className="w-full bg-ink-900 border border-gold/15 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-white/50 mb-2 block">Location</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-ink-900 border border-gold/15 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold/50">
                {CHENNAI_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-white/50 mb-2 block">Connection Type</label>
              <select value={connectionType} onChange={(e) => setConnectionType(e.target.value)} className="w-full bg-ink-900 border border-gold/15 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold/50">
                <option>Residential</option>
                <option>Commercial</option>
                <option>Industrial</option>
              </select>
            </div>
            <button type="submit" className="btn-gold rounded-xl py-3.5 font-semibold sm:col-span-3 flex items-center justify-center gap-2">
              <CalcIcon size={18} /> Calculate My Savings
            </button>
          </form>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
              >
                {cards.map((c, i) => (
                  <motion.div
                    key={c.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.06 }}
                    className="glass rounded-2xl p-6 text-center"
                  >
                    <c.icon className="text-gold mx-auto mb-3" size={26} />
                    <p className="font-display font-bold text-xl text-gold-gradient">{c.value}</p>
                    <p className="text-white/50 text-xs mt-2 uppercase tracking-wide">{c.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-white/35 text-xs mt-8 text-center">
            Figures are indicative estimates based on average Chennai sun-hours and tariff slabs. A free site survey from our team will confirm exact sizing, cost and subsidy eligibility.
          </p>
        </div>
      </section>
      <CTABanner />
    </>
  )
}
