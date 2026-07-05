import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, PackageOpen } from 'lucide-react'
import { supabase, publicUrlFor, STORAGE_BUCKETS } from '../lib/supabase'
import { FALLBACK_PRODUCTS } from '../data/siteData'
import SectionHeading from '../components/ui/SectionHeading'
import EnquiryModal from '../components/ui/EnquiryModal'

const CATEGORIES = ['All', 'Solar Panels', 'Inverters', 'Batteries', 'Accessories']
const PAGE_SIZE = 8

export default function Products() {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS)
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('newest')
  const [page, setPage] = useState(1)
  const [enquiryProduct, setEnquiryProduct] = useState(null)

  useEffect(() => {
    let active = true
    async function load() {
      const { data, error } = await supabase.from('products').select('*').eq('availability', true)
      if (active) {
        if (!error && data?.length) {
          setProducts(data.map((p) => ({ ...p, image: p.image_path ? publicUrlFor(STORAGE_BUCKETS.products, p.image_path) : null })))
        }
        setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, [])

  const filtered = useMemo(() => {
    let list = [...products]
    if (category !== 'All') list = list.filter((p) => p.category === category)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q))
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [products, category, query, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <section className="section-pad">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Shop Solar" title="Our Products" subtitle="Tier-1 panels, inverters, batteries and accessories, sourced and tested for reliable performance." />

        <div className="flex flex-col lg:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1) }}
              placeholder="Search products or brands..."
              className="w-full glass rounded-full pl-11 pr-4 py-3 text-sm outline-none focus:border-gold/50"
            />
          </div>
          <div className="flex gap-3">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="glass rounded-full px-4 py-3 text-sm outline-none">
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => { setCategory(c); setPage(1) }}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                category === c ? 'bg-gold-gradient text-ink-950 border-transparent font-semibold' : 'border-gold/20 text-white/70 hover:border-gold/50'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {paged.length === 0 ? (
          <div className="text-center py-24 text-white/40">
            <PackageOpen className="mx-auto mb-4" size={40} />
            No products match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {paged.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                className="card-luxury overflow-hidden flex flex-col"
              >
                <div className="h-44 bg-ink-800 flex items-center justify-center">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <SlidersHorizontal className="text-gold/30" size={36} />
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="text-gold text-[11px] uppercase tracking-wide mb-1">{p.category}</span>
                  <h3 className="font-semibold mb-1 line-clamp-2">{p.name}</h3>
                  <p className="text-white/45 text-xs mb-3">{p.brand}</p>
                  <p className="text-white/55 text-sm line-clamp-3 mb-4 flex-1">{p.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="font-display font-bold text-gold-gradient">&#8377;{Number(p.price).toLocaleString('en-IN')}</span>
                    <button onClick={() => setEnquiryProduct(p)} className="btn-outline-gold text-xs rounded-full px-4 py-2">Enquire</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-9 h-9 rounded-full text-sm ${page === i + 1 ? 'bg-gold-gradient text-ink-950 font-semibold' : 'border border-gold/20 text-white/60'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {enquiryProduct && (
        <EnquiryModal product={enquiryProduct} onClose={() => setEnquiryProduct(null)} />
      )}
    </section>
  )
}
