import { useEffect, useState } from 'react'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, Tooltip, Legend, Filler
} from 'chart.js'
import { PackageSearch, FolderKanban, MessageSquareText, Users, HardDrive } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { supabase } from '../../lib/supabase'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend, Filler)

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, projects: 0, enquiries: 0, reviews: 0 })
  const [recentEnquiries, setRecentEnquiries] = useState([])

  useEffect(() => {
    async function load() {
      const [products, projects, enquiries, reviews, recent] = await Promise.all([
        supabase.from('products').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('enquiries').select('id', { count: 'exact', head: true }),
        supabase.from('reviews').select('id', { count: 'exact', head: true }),
        supabase.from('enquiries').select('*').order('created_at', { ascending: false }).limit(5)
      ])
      setStats({
        products: products.count || 0,
        projects: projects.count || 0,
        enquiries: enquiries.count || 0,
        reviews: reviews.count || 0
      })
      setRecentEnquiries(recent.data || [])
    }
    load()
  }, [])

  const cards = [
    { label: 'Total Products', value: stats.products, icon: PackageSearch },
    { label: 'Total Projects', value: stats.projects, icon: FolderKanban },
    { label: 'Total Enquiries', value: stats.enquiries, icon: MessageSquareText },
    { label: "Total Reviews", value: stats.reviews, icon: Users }
  ]

  const lineData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Visitors',
      data: [42, 58, 51, 66, 74, 90, 82],
      borderColor: '#D4AF37',
      backgroundColor: 'rgba(212,175,55,0.15)',
      fill: true,
      tension: 0.4,
      pointBackgroundColor: '#D4AF37'
    }]
  }

  const doughnutData = {
    labels: ['Solar Panels', 'Inverters', 'Batteries', 'Accessories'],
    datasets: [{
      data: [stats.products || 1, 1, 1, 1],
      backgroundColor: ['#D4AF37', '#8A6B18', '#F2D78E', '#453510'],
      borderWidth: 0
    }]
  }

  return (
    <AdminLayout title="Dashboard Overview">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="card-luxury p-6">
            <c.icon className="text-gold mb-3" size={22} />
            <p className="font-display text-3xl font-bold">{c.value}</p>
            <p className="text-white/50 text-xs mt-1 uppercase tracking-wide">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        <div className="card-luxury p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Today&rsquo;s Visitor Trend</h3>
          <Line data={lineData} options={{ responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#ffffff80' }, grid: { color: '#ffffff10' } }, y: { ticks: { color: '#ffffff80' }, grid: { color: '#ffffff10' } } } }} />
        </div>
        <div className="card-luxury p-6">
          <h3 className="font-semibold mb-4">Product Categories</h3>
          <Doughnut data={doughnutData} options={{ plugins: { legend: { labels: { color: '#ffffffb0' } } } }} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="card-luxury p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">Recent Enquiries</h3>
          {recentEnquiries.length === 0 ? (
            <p className="text-white/40 text-sm">No enquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {recentEnquiries.map((e) => (
                <div key={e.id} className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div>
                    <p className="font-medium text-sm">{e.name}</p>
                    <p className="text-white/40 text-xs">{e.phone}</p>
                  </div>
                  <span className="text-xs text-gold/70">{new Date(e.created_at).toLocaleDateString('en-IN')}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card-luxury p-6 flex flex-col items-center justify-center text-center">
          <HardDrive className="text-gold mb-3" size={26} />
          <p className="font-display text-2xl font-bold">Supabase Storage</p>
          <p className="text-white/40 text-xs mt-1">Monitor bucket usage from your Supabase project dashboard.</p>
        </div>
      </div>
    </AdminLayout>
  )
}