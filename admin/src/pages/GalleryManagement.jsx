import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useToast } from "../components/Toast.jsx";

const GalleryManagement = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/gallery");
      setImages(data);
    } catch (error) {
      addToast("Unable to load gallery", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      addToast("Select an image", "error");
      return;
    }
    setSaving(true);
    try {
      const payload = new FormData();
      payload.append("title", title);
      payload.append("image", file);
      await api.post("/api/gallery", payload, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setTitle("");
      setFile(null);
      addToast("Image uploaded");
      fetchImages();
    } catch (error) {
      addToast("Upload failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm("Delete this image?");
    if (!shouldDelete) {
      return;
    }
    try {
      await api.delete(`/api/gallery/${id}`);
      addToast("Image deleted");
      fetchImages();
    } catch (error) {
      addToast("Delete failed", "error");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Gallery Management</h2>
        <p className="text-sm text-slate-400">Upload or remove gallery images.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            />
          </label>
          <label className="text-sm">
            Image
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setFile(event.target.files[0])}
              className="mt-2 w-full"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="mt-4 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
        >
          {saving ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Gallery Images</h3>
        {loading ? (
          <p className="text-slate-400">Loading gallery...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {images.map((image) => (
              <div key={image._id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <img src={image.imageUrl} alt={image.title || "Gallery"} className="h-40 w-full rounded-lg object-cover" />
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-slate-200">{image.title || "Untitled"}</p>
                  <button
                    onClick={() => handleDelete(image._id)}
                    className="rounded-lg border border-red-500 px-3 py-1 text-xs text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManagement;
