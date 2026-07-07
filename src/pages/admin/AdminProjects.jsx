import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Plus, Pencil, Trash2, X, ImagePlus } from 'lucide-react'
import AdminLayout from '../../components/admin/AdminLayout'
import { supabase, STORAGE_BUCKETS } from '../../lib/supabase'

export default function AdminProjects() {

  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [coverFile, setCoverFile] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm()


  const fetchProjects = async () => {

    setLoading(true)

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('completion_date', { ascending: false })

    if (!error) {
      setProjects(data || [])
    }

    setLoading(false)
  }


  useEffect(() => {
    fetchProjects()
  }, [])



  const openCreate = () => {

    setEditing(null)

    reset({
      title: '',
      location: '',
      capacity: '',
      completion_date: '',
      description: '',
      video_url: ''
    })

    setCoverFile(null)
    setModalOpen(true)

  }



  const openEdit = (p) => {

    setEditing(p)

    reset(p)

    setCoverFile(null)

    setModalOpen(true)

  }



  const onSubmit = async (formData) => {

    let cover_image_path = editing?.cover_image_path || null


    if (coverFile) {

      const filePath = `${Date.now()}-${coverFile.name}`


      const { error: uploadError } =
        await supabase.storage
          .from(STORAGE_BUCKETS.projects)
          .upload(filePath, coverFile)


      if (uploadError) {

        toast.error(
          'Upload failed: ' + uploadError.message
        )

        return

      }


      cover_image_path = filePath

    }



    const payload = {

      title: formData.title,

      location: formData.location,

      capacity: formData.capacity,

      completion_date: formData.completion_date,

      description: formData.description,

      video_url: formData.video_url || null,

      cover_image_path

    }



    const query = editing

      ? supabase
          .from('projects')
          .update(payload)
          .eq('id', editing.id)

      : supabase
          .from('projects')
          .insert(payload)



    const { error } = await query



    if (error) {

      toast.error(error.message)

      return

    }



    toast.success(
      editing
        ? 'Project updated'
        : 'Project added'
    )


    setModalOpen(false)

    fetchProjects()

  }




  const deleteProject = async (id) => {


    if (!confirm('Delete this project permanently?'))
      return



    const { error } =
      await supabase
        .from('projects')
        .delete()
        .eq('id', id)



    if (error) {

      toast.error(error.message)

      return

    }



    toast.success('Project deleted')

    fetchProjects()

  }





  return (

    <AdminLayout title="Project Management">


      <div className="flex justify-end mb-6">

        <button
          onClick={openCreate}
          className="btn-gold rounded-full px-5 py-2.5 text-sm font-semibold flex items-center gap-2"
        >

          <Plus size={16}/>

          Add Project

        </button>


      </div>





      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">


        {loading ? (

          <p className="text-gray-500">
            Loading...
          </p>


        ) : projects.length === 0 ? (

          <p className="text-gray-500">
            No projects yet. Add your first project.
          </p>


        ) : projects.map((p)=>(


          <div
            key={p.id}
            className="bg-white border border-gold/20 rounded-2xl shadow-lg p-5"
          >


            <h3 className="font-semibold text-lg text-black mb-1">

              {p.title}

            </h3>



            <p className="text-gray-600 text-xs mb-3">

              {p.location} • {p.capacity}

            </p>



            <p className="text-gray-700 text-sm line-clamp-2 mb-4">

              {p.description}

            </p>




            <div className="flex gap-2">


              <button

                onClick={() => openEdit(p)}

                className="btn-outline-gold text-xs rounded-full px-3 py-1.5 flex items-center gap-1"

              >

                <Pencil size={13}/>

                Edit

              </button>





              <button

                onClick={() => deleteProject(p.id)}

                className="text-red-600 hover:bg-red-50 text-xs rounded-full px-3 py-1.5 border border-red-200 flex items-center gap-1 transition"

              >

                <Trash2 size={13}/>

                Delete

              </button>



            </div>


          </div>


        ))}



      </div>







      {modalOpen && (


        <div

          className="fixed inset-0 z-[200] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"

          onClick={() => setModalOpen(false)}

        >



          <div

            onClick={(e)=>e.stopPropagation()}

            className="bg-white rounded-2xl shadow-2xl border border-gold/20 p-7 w-full max-w-xl max-h-[85vh] overflow-y-auto"

          >





            <div className="flex justify-between items-center mb-6">


              <h3 className="font-display font-bold text-2xl text-gold">

                {editing
                  ? 'Edit Project'
                  : 'Add Project'}

              </h3>




              <button
                onClick={() => setModalOpen(false)}
              >

                <X

                  size={20}

                  className="text-gray-700 hover:text-gold transition"

                />

              </button>


            </div>







            <form

              onSubmit={handleSubmit(onSubmit)}

              className="space-y-4"

            >





              <input

                {...register('title',{required:true})}

                placeholder="Project Title"

                className="w-full bg-white border border-gold/30 rounded-xl px-4 py-3 text-sm text-black placeholder:text-gray-500 outline-none focus:border-gold"

              />






              <div className="grid grid-cols-2 gap-4">


                <input

                  {...register('location',{required:true})}

                  placeholder="Location"

                  className="w-full bg-white border border-gold/30 rounded-xl px-4 py-3 text-sm text-black placeholder:text-gray-500 outline-none focus:border-gold"

                />



                <input

                  {...register('capacity',{required:true})}

                  placeholder="System Capacity (e.g. 5 kW)"

                  className="w-full bg-white border border-gold/30 rounded-xl px-4 py-3 text-sm text-black placeholder:text-gray-500 outline-none focus:border-gold"

                />



              </div>







              <input

                {...register('completion_date',{required:true})}

                type="date"

                className="w-full bg-white border border-gold/30 rounded-xl px-4 py-3 text-sm text-black outline-none focus:border-gold"

              />







              <textarea

                {...register('description')}

                rows={3}

                placeholder="Description"

                className="w-full bg-white border border-gold/30 rounded-xl px-4 py-3 text-sm text-black placeholder:text-gray-500 outline-none focus:border-gold"

              />







              <input

                {...register('video_url')}

                placeholder="Video URL (optional)"

                className="w-full bg-white border border-gold/30 rounded-xl px-4 py-3 text-sm text-black placeholder:text-gray-500 outline-none focus:border-gold"

              />







              <label

                className="flex items-center gap-3 border border-dashed border-gold/40 rounded-xl px-4 py-4 text-sm text-gray-700 cursor-pointer hover:bg-gold/5 transition"

              >



                <ImagePlus

                  size={20}

                  className="text-gold"

                />



                {coverFile

                  ? coverFile.name

                  : 'Upload cover image'}





                <input

                  type="file"

                  accept="image/*"

                  className="hidden"

                  onChange={(e)=>

                    setCoverFile(
                      e.target.files?.[0] || null
                    )

                  }

                />



              </label>







              <button

                disabled={isSubmitting}

                type="submit"

                className="btn-gold rounded-xl py-3 w-full font-semibold disabled:opacity-50"

              >


                {isSubmitting

                  ? 'Saving...'

                  : editing

                    ? 'Update Project'

                    : 'Add Project'

                }


              </button>





            </form>





          </div>


        </div>


      )}



    </AdminLayout>

  )

}