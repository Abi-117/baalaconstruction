import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Folder,
  MapPin,
  Calendar,
  UploadCloud,
  Loader2
} from "lucide-react";
import Sidebar from "@/components/admin/Sidebar";

export const Route = createFileRoute("/admin/projects")({
  component: ProjectsAdmin,
});

const API = "http://localhost:5000";

function ProjectsAdmin() {
  const [projects, setProjects] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState("");
  const [loading, setLoading] = useState(false);
  // Store multiple image previews
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [form, setForm] = useState<any>({
    title: "",
    category: "ongoing",
    location: "",
    year: "",
    completion: "",
    progress: 0,
    description: "",
    images: [] // Changed to array
  });

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API}/api/projects`);
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleImagesChange = (e: any) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setForm({ ...form, images: [...form.images, ...files] });
      
      const newPreviews = files.map((file: any) => URL.createObjectURL(file));
      setImagePreviews([...imagePreviews, ...newPreviews]);
    }
  };

  const removeImageFromForm = (index: number) => {
    const updatedImages = [...form.images];
    updatedImages.splice(index, 1);
    
    const updatedPreviews = [...imagePreviews];
    updatedPreviews.splice(index, 1);

    setForm({ ...form, images: updatedImages });
    setImagePreviews(updatedPreviews);
  };

  const submitProject = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = new FormData();
      
      // Append normal fields
      Object.keys(form).forEach((key) => {
        if (key !== "images" && form[key] !== null) {
          data.append(key, form[key]);
        }
      });

      // Append multiple images
      form.images.forEach((file: any) => {
        data.append("images", file);
      });

      if (editId) {
        await axios.put(`${API}/api/projects/${editId}`, data);
      } else {
        await axios.post(`${API}/api/projects`, data);
      }

      setOpen(false);
      setEditId("");
      resetForm();
      fetchProjects();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`${API}/api/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const editProject = (project: any) => {
    setEditId(project._id);
    setForm({
      title: project.title,
      category: project.category,
      location: project.location,
      year: project.year,
      completion: project.completion,
      progress: project.progress,
      description: project.description,
      images: [] // New uploads will go here
    });
    setImagePreviews(project.images || [project.image]); // Handle fallback if single image existed
    setOpen(true);
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "ongoing",
      location: "",
      year: "",
      completion: "",
      progress: 0,
      description: "",
      images: []
    });
    setImagePreviews([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans text-slate-800 antialiased">
      <Sidebar />

      <main className="flex-1 lg:ml-72 p-6 lg:p-10 max-w-7xl mx-auto w-full transition-all duration-300">
        
        {/* Top Action Banner */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Projects Management</h1>
            <p className="text-sm text-slate-500 mt-1">Create, view, update, and manage your portfolio projects.</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setOpen(true);
            }}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium px-5 py-3 rounded-xl shadow-sm shadow-indigo-200 transition-all group duration-200"
          >
            <Plus size={18} className="transition-transform group-hover:rotate-90" />
            Add New Project
          </button>
        </div>

        {/* Quick View Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Projects</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{projects.length}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-500">Completed</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {projects.filter(p => p.category === "completed").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-500">Ongoing</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {projects.filter(p => p.category === "ongoing").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-500">Avg. Progress</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {projects.length ? Math.round(projects.reduce((acc, curr) => acc + (Number(curr.progress) || 0), 0) / projects.length) : 0}%
            </p>
          </div>
        </div>

        {/* Project Grid */}
        {projects.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center max-w-xl mx-auto mt-12">
            <Folder className="mx-auto text-slate-300 mb-4" size={40} />
            <h3 className="text-lg font-semibold text-slate-700">No projects found</h3>
            <p className="text-slate-400 text-sm mt-1">Get started by creating your very first project showcase.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const displayImage = project.images?.[0] || project.image || "";
              return (
                <div
                  key={project._id}
                  className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col"
                >
                  <div className="relative aspect-video w-full bg-slate-100 overflow-hidden">
                    <img
                      src={displayImage}
                      alt={project.title}
                      className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                    <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider border ${
                      project.category === "completed" 
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}>
                      {project.category}
                    </span>
                    {project.images?.length > 1 && (
                      <span className="absolute bottom-3 right-3 bg-slate-900/70 backdrop-blur-sm text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                        +{project.images.length - 1} More Images
                      </span>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h2 className="font-bold text-lg text-slate-900 line-clamp-1">{project.title}</h2>
                      <p className="text-slate-500 text-xs mt-1 line-clamp-2">{project.description || "No description provided."}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <MapPin size={15} className="text-slate-400 shrink-0" />
                        <span className="truncate">{project.location || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={15} className="text-slate-400 shrink-0" />
                        <span>{project.year || "N/A"} ({project.completion || "Timeline"})</span>
                      </div>

                      <div className="pt-2">
                        <div className="flex justify-between text-xs font-medium text-slate-500 mb-1">
                          <span>Progress</span>
                          <span>{project.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              project.category === 'completed' ? 'bg-emerald-500' : 'bg-indigo-500'
                            }`} 
                            style={{ width: `${project.progress || 0}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => editProject(project)}
                        className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Edit Project"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => deleteProject(project._id)}
                        className="p-2 text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Admin Creator/Editor Modal */}
      {open && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">
                {editId ? "✍️ Edit Project Details" : "✨ Add New Project"}
              </h2>
              <button 
                onClick={() => setOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={submitProject} className="overflow-y-auto p-6 space-y-5 flex-1">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Project Title</label>
                  <input
                    name="title"
                    required
                    value={form.title}
                    onChange={handleChange}
                    placeholder="e.g. Luxury Highrise Apartments"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Project Status</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm"
                  >
                    <option value="ongoing">⏳ Ongoing</option>
                    <option value="completed">✅ Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Location</label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="City, Country"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Year</label>
                  <input
                    name="year"
                    value={form.year}
                    onChange={handleChange}
                    placeholder="e.g. 2026"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Timeline / Completion</label>
                  <input
                    name="completion"
                    value={form.completion}
                    onChange={handleChange}
                    placeholder="e.g. Q4 Completion"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Overall Progress Metric</label>
                  <span className="text-sm font-bold text-indigo-600">{form.progress}%</span>
                </div>
                <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <input
                    type="range"
                    name="progress"
                    min="0"
                    max="100"
                    value={form.progress}
                    onChange={handleChange}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">Project Summary Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Provide description..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm min-h-24"
                />
              </div>

              {/* Dynamic Multiple File Upload Zone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase">Project Gallery Images</label>
                <div className="space-y-4">
                  <label className="border-2 border-dashed border-slate-300 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/20 rounded-2xl p-5 text-center cursor-pointer flex flex-col items-center justify-center gap-2 transition-all">
                    <UploadCloud className="text-slate-400" size={28} />
                    <span className="text-xs font-medium text-slate-600">Click to upload image layouts</span>
                    <span className="text-[10px] text-slate-400">Can select multiple files together</span>
                    <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="hidden" />
                  </label>

                  {imagePreviews.length > 0 ? (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 border bg-slate-50 p-3 rounded-2xl">
                      {imagePreviews.map((url, index) => (
                        <div key={index} className="relative rounded-xl overflow-hidden aspect-video border group bg-white">
                          <img src={url} className="w-full h-full object-cover" alt="preview" />
                          <button
                            type="button"
                            onClick={() => removeImageFromForm(index)}
                            className="absolute top-1 right-1 bg-rose-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-200 h-20 flex items-center justify-center text-xs text-slate-400 bg-slate-50">
                      No active assets uploaded yet
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 sticky bottom-0 bg-white">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 font-medium text-slate-700 hover:bg-slate-50 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 min-w-32 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-medium text-sm transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving changes...
                    </>
                  ) : editId ? (
                    "Save Changes"
                  ) : (
                    "Publish Project"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}