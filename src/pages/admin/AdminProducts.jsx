import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Plus, Pencil, Trash2, X, ImagePlus } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { supabase, publicUrlFor, STORAGE_BUCKETS } from '../../lib/supabase'

const CATEGORIES = ['Solar Panels', 'Inverters', 'Batteries', 'Accessories']

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()

  const fetchProducts = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (!error) setProducts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchProducts() }, [])

  const openCreate = () => { setEditing(null); reset({ name: '', category: CATEGORIES[0], brand: '', price: '', description: '', features: '', availability: true }); setImageFile(null); setModalOpen(true) }
  const openEdit = (p) => { setEditing(p); reset({ ...p, features: (p.features || []).join(', ') }); setImageFile(null); setModalOpen(true) }

  const onSubmit = async (formData) => {
    let image_path = editing?.image_path || null

    if (imageFile) {
      const filePath = `${Date.now()}-${imageFile.name}`
      const { error: uploadError } = await supabase.storage.from(STORAGE_BUCKETS.products).upload(filePath, imageFile)
      if (uploadError) {
        toast.error('Image upload failed: ' + uploadError.message)
        return
      }
      image_path = filePath
    }

    const payload = {
      name: formData.name,
      category: formData.category,
      brand: formData.brand,
      price: Number(formData.price),
      description: formData.description,
      features: formData.features.split(',').map((f) => f.trim()).filter(Boolean),
      availability: formData.availability === true || formData.availability === 'true',
      image_path
    }

    const query = editing
      ? supabase.from('products').update(payload).eq('id', editing.id)
      : supabase.from('products').insert(payload)

    const { error } = await query
    if (error) {
      toast.error(error.message)
      return
    }
    toast.success(editing ? 'Product updated' : 'Product added')
    setModalOpen(false)
    fetchProducts()
  }

  const deleteProduct = async (id) => {
    if (!confirm('Delete this product permanently?')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) { toast.error(error.message); return }
    toast.success('Product deleted')
    fetchProducts()
  }

  return (
    <AdminLayout title="Product Management">
      <div className="flex justify-end mb-6">
        <button onClick={openCreate} className="btn-gold rounded-full px-5 py-2.5 text-sm font-semibold flex items-center gap-2">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="card-luxury overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-white/40 border-b border-white/10">
              <th className="p-4">Name</th><th className="p-4">Category</th><th className="p-4">Price</th><th className="p-4">Availability</th><th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-6 text-center text-white/40">Loading...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={5} className="p-6 text-center text-white/40">No products yet. Add your first product.</td></tr>
            ) : products.map((p) => (
              <tr key={p.id} className="border-b border-white/5">
                <td className="p-4 font-medium">{p.name}</td>
                <td className="p-4 text-white/60">{p.category}</td>
                <td className="p-4 text-gold">₹{Number(p.price).toLocaleString('en-IN')}</td>
                <td className="p-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${p.availability ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {p.availability ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="p-4 flex gap-2">
                  <button onClick={() => openEdit(p)} className="text-gold hover:text-gold-300"><Pencil size={16} /></button>
                  <button onClick={() => deleteProduct(p.id)} className="text-red-400 hover:text-red-300"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="glass-strong rounded-2xl p-7 w-full max-w-xl max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display font-bold text-xl">{editing ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setModalOpen(false)}><X size={20} className="text-white/50" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input {...register('name', { required: true })} placeholder="Product Name" className="w-full bg-ink-900 border border-gold/15 rounded-xl px-4 py-3 text-sm outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <select {...register('category', { required: true })} className="w-full bg-ink-900 border border-gold/15 rounded-xl px-4 py-3 text-sm outline-none">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <input {...register('brand')} placeholder="Brand" className="w-full bg-ink-900 border border-gold/15 rounded-xl px-4 py-3 text-sm outline-none" />
              </div>
              <input {...register('price', { required: true })} type="number" placeholder="Price (₹)" className="w-full bg-ink-900 border border-gold/15 rounded-xl px-4 py-3 text-sm outline-none" />
              <textarea {...register('description')} rows={3} placeholder="Description" className="w-full bg-ink-900 border border-gold/15 rounded-xl px-4 py-3 text-sm outline-none" />
              <input {...register('features')} placeholder="Features (comma separated)" className="w-full bg-ink-900 border border-gold/15 rounded-xl px-4 py-3 text-sm outline-none" />
              <label className="flex items-center gap-2 text-sm text-white/60">
                <input type="checkbox" {...register('availability')} defaultChecked className="accent-gold" /> Available for sale
              </label>
              <label className="flex items-center gap-3 border border-dashed border-gold/25 rounded-xl px-4 py-4 text-sm text-white/50 cursor-pointer">
                <ImagePlus size={20} className="text-gold" />
                {imageFile ? imageFile.name : 'Upload product image'}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
              </label>
              <button disabled={isSubmitting} type="submit" className="btn-gold rounded-xl py-3 w-full font-semibold disabled:opacity-50">
                {isSubmitting ? 'Saving...' : editing ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
