import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useToast } from "../components/Toast.jsx";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "Drinks",
  available: true,
  image: null
};

const MenuManagement = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/menu");
      setItems(data);
    } catch (error) {
      addToast("Unable to load menu items", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked, files } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : files ? files[0] : value
    }));
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name,
      description: item.description || "",
      price: item.price,
      category: item.category,
      available: item.available,
      image: null
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("description", form.description);
      payload.append("price", form.price);
      payload.append("category", form.category);
      payload.append("available", form.available);
      if (form.image) {
        payload.append("image", form.image);
      }

      if (editingId) {
        await api.put(`/api/menu/${editingId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        addToast("Menu item updated");
      } else {
        await api.post("/api/menu", payload, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        addToast("Menu item created");
      }
      resetForm();
      fetchItems();
    } catch (error) {
      addToast(error.response?.data?.message || "Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm("Delete this menu item?");
    if (!shouldDelete) {
      return;
    }
    try {
      await api.delete(`/api/menu/${id}`);
      addToast("Menu item deleted");
      fetchItems();
    } catch (error) {
      addToast("Delete failed", "error");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Menu Management</h2>
        <p className="text-sm text-slate-400">Add or update drinks and snacks.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 md:grid-cols-2">
        <label className="text-sm">
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
          />
        </label>
        <label className="text-sm">
          Price
          <input
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
          />
        </label>
        <label className="text-sm md:col-span-2">
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
          />
        </label>
        <label className="text-sm">
          Category
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
          >
            <option value="Drinks">Drinks</option>
            <option value="Snacks">Snacks</option>
          </select>
        </label>
        <label className="text-sm">
          Available
          <div className="mt-2 flex items-center gap-2">
            <input
              name="available"
              type="checkbox"
              checked={form.available}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-xs text-slate-400">Toggle availability</span>
          </div>
        </label>
        <label className="text-sm md:col-span-2">
          Image
          <input name="image" type="file" accept="image/*" onChange={handleChange} className="mt-2 w-full" />
        </label>
        <div className="flex gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
          >
            {saving ? "Saving..." : editingId ? "Update Item" : "Add Item"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-lg border border-slate-700 px-4 py-2 text-sm">
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Existing Items</h3>
        {loading ? (
          <p className="text-slate-400">Loading menu items...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <div key={item._id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-xs text-slate-400">{item.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-amber-400">${item.price}</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{item.description}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="rounded-lg border border-slate-700 px-3 py-1 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
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

export default MenuManagement;
