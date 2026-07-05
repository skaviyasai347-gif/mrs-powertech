import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Zap, Calendar, X, PlayCircle } from 'lucide-react'
import { supabase, publicUrlFor, STORAGE_BUCKETS } from '../lib/supabase'
import { FALLBACK_PROJECTS, COMPANY } from '../data/siteData'
import SectionHeading from '../components/ui/SectionHeading'

export default function Projects() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS)
  const [active, setActive] = useState(null)

  useEffect(() => {
    let alive = true
    async function load() {
      const { data, error } = await supabase.from('projects').select('*').order('completion_date', { ascending: false })
      if (alive && !error && data?.length) {
        setProjects(data.map((p) => ({ ...p, cover_image: p.cover_image_path ? publicUrlFor(STORAGE_BUCKETS.projects, p.cover_image_path) : null })))
      }
    }
    load()
    return () => { alive = false }
  }, [])

  return (
    <section className="section-pad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our Work" title="Projects" subtitle="A selection of residential, commercial and industrial installations completed across Chennai." />

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              onClick={() => setActive(p)}
              className="break-inside-avoid card-luxury overflow-hidden cursor-pointer group"
            >
              <div className="h-56 bg-ink-800 relative overflow-hidden">
                {p.cover_image ? (
                  <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gold/20 font-display text-4xl">MRS</div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs bg-gold/90 text-ink-950 font-semibold px-3 py-1 rounded-full">{p.capacity}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg mb-1">{p.title}</h3>
                <p className="flex items-center gap-1 text-white/50 text-sm mb-2"><MapPin size={14} className="text-gold" /> {p.location}</p>
                <p className="text-white/55 text-sm line-clamp-2">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            >
              <div className="h-64 bg-ink-800 relative">
                {active.cover_image ? (
                  <img src={active.cover_image} alt={active.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gold/20 font-display text-5xl">MRS</div>
                )}
                <button onClick={() => setActive(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white">
                  <X size={18} />
                </button>
              </div>
              <div className="p-7">
                <h3 className="font-display font-bold text-2xl mb-3">{active.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-5">
                  <span className="flex items-center gap-1"><MapPin size={15} className="text-gold" /> {active.location}</span>
                  <span className="flex items-center gap-1"><Zap size={15} className="text-gold" /> {active.capacity}</span>
                  <span className="flex items-center gap-1"><Calendar size={15} className="text-gold" /> {active.completion_date}</span>
                </div>
                <p className="text-white/65 leading-relaxed mb-6">{active.description}</p>

                {active.video_url && (
                  <a href={active.video_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gold mb-6 hover:underline">
                    <PlayCircle size={20} /> Watch project video
                  </a>
                )}

                <div className="rounded-xl overflow-hidden border border-gold/15 h-48">
                  <iframe title="Project location" src={COMPANY.mapEmbed} className="w-full h-full" loading="lazy" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
