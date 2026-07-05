import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Star, Trash2, CheckCircle2, XCircle } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { supabase } from '../../lib/supabase'

export default function AdminReviews() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchReviews = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('reviews').select('*').order('created_at', { ascending: false })
    if (!error) setReviews(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchReviews() }, [])

  const toggleApproval = async (id, approved) => {
    const { error } = await supabase.from('reviews').update({ approved: !approved }).eq('id', id)
    if (error) { toast.error(error.message); return }
    fetchReviews()
  }

  const deleteReview = async (id) => {
    if (!confirm('Delete this review?')) return
    const { error } = await supabase.from('reviews').delete().eq('id', id)
    if (error) { toast.error(error.message); return }
    toast.success('Review deleted')
    fetchReviews()
  }

  return (
    <AdminLayout title="Review Management">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <p className="text-white/40">Loading...</p>
        ) : reviews.length === 0 ? (
          <p className="text-white/40">No reviews submitted yet.</p>
        ) : reviews.map((r) => (
          <div key={r.id} className="card-luxury p-5">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} className={i < r.rating ? 'text-gold fill-gold' : 'text-white/20'} />
              ))}
            </div>
            <p className="text-white/60 text-sm mb-3 line-clamp-3">{r.text}</p>
            <p className="font-medium text-sm mb-4">{r.name}</p>
            <div className="flex gap-2">
              <button onClick={() => toggleApproval(r.id, r.approved)} className={`text-xs rounded-full px-3 py-1.5 flex items-center gap-1 border ${r.approved ? 'border-green-400/30 text-green-400' : 'border-white/20 text-white/50'}`}>
                {r.approved ? <CheckCircle2 size={13} /> : <XCircle size={13} />} {r.approved ? 'Published' : 'Pending'}
              </button>
              <button onClick={() => deleteReview(r.id)} className="text-red-400 text-xs rounded-full px-3 py-1.5 border border-red-400/30 flex items-center gap-1">
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
