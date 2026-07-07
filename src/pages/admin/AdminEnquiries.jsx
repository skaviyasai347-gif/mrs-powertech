import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Trash2, Download, Mail } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { supabase } from '../../lib/supabase'

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchEnquiries = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
    if (!error) setEnquiries(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchEnquiries() }, [])

  const deleteEnquiry = async (id) => {
    if (!confirm('Delete this enquiry?')) return
    const { error } = await supabase.from('enquiries').delete().eq('id', id)
    if (error) { toast.error(error.message); return }
    toast.success('Enquiry deleted')
    fetchEnquiries()
  }

  const exportCSV = () => {
    if (!enquiries.length) { toast.info('No enquiries to export'); return }
    const headers = ['Name', 'Phone', 'Email', 'Product', 'Message', 'Source', 'Date']
    const rows = enquiries.map((e) => [
      e.name, e.phone, e.email || '', e.product_name || '', (e.message || '').replace(/\n/g, ' '), e.source || '', new Date(e.created_at).toLocaleString('en-IN')
    ])
    const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mrs-powertech-enquiries-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout title="Enquiry Management">
      <div className="flex justify-end mb-6">
        <button onClick={exportCSV} className="btn-outline-gold rounded-full px-5 py-2.5 text-sm font-semibold flex items-center gap-2">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="card-luxury overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-black/40 border-b border-black/10">
              <th className="p-4">Name</th><th className="p-4">Phone</th><th className="p-4">Product / Source</th><th className="p-4">Date</th><th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-6 text-center text-black/40">Loading...</td></tr>
            ) : enquiries.length === 0 ? (
              <tr><td colSpan={5} className="p-6 text-center text-black/40">No enquiries yet.</td></tr>
            ) : enquiries.map((e) => (
              <tr key={e.id} className="border-b border-black/5 align-top">
                <td className="p-4 font-medium">{e.name}</td>
                <td className="p-4 text-black/60">{e.phone}</td>
                <td className="p-4 text-black/60">
                  {e.product_name || <span className="italic text-black/30">{e.source}</span>}
                  {e.message && <p className="text-black/40 text-xs mt-1 max-w-xs">{e.message}</p>}
                </td>
                <td className="p-4 text-black/40 text-xs">{new Date(e.created_at).toLocaleString('en-IN')}</td>
                <td className="p-4 flex gap-2">
                  {e.email && <a href={`mailto:${e.email}`} className="text-gold"><Mail size={16} /></a>}
                  <button onClick={() => deleteEnquiry(e.id)} className="text-red-400"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}