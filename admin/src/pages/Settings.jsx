import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useToast } from "../components/Toast.jsx";

const Settings = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    address: "",
    openingHours: "",
    socials: {
      instagram: "",
      facebook: "",
      twitter: "",
      tiktok: ""
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/api/settings");
        setForm({
          name: data.name || "",
          description: data.description || "",
          address: data.address || "",
          openingHours: data.openingHours || "",
          socials: {
            instagram: data.socials?.instagram || "",
            facebook: data.socials?.facebook || "",
            twitter: data.socials?.twitter || "",
            tiktok: data.socials?.tiktok || ""
          }
        });
      } catch (error) {
        addToast("Unable to load settings", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, [addToast]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("socials.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        socials: { ...prev.socials, [key]: value }
      }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await api.put("/api/settings", form);
      addToast("Settings updated");
    } catch (error) {
      addToast("Update failed", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-slate-400">Loading settings...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Cafe Settings</h2>
        <p className="text-sm text-slate-400">Update cafe profile and social links.</p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm">
            Cafe Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            />
          </label>
          <label className="text-sm">
            Opening Hours
            <input
              name="openingHours"
              value={form.openingHours}
              onChange={handleChange}
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
          <label className="text-sm md:col-span-2">
            Address
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            />
          </label>
        </div>

        <div className="mt-6">
          <h3 className="text-sm font-semibold text-slate-200">Social Links</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm">
              Instagram
              <input
                name="socials.instagram"
                value={form.socials.instagram}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
              />
            </label>
            <label className="text-sm">
              Facebook
              <input
                name="socials.facebook"
                value={form.socials.facebook}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
              />
            </label>
            <label className="text-sm">
              Twitter
              <input
                name="socials.twitter"
                value={form.socials.twitter}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
              />
            </label>
            <label className="text-sm">
              TikTok
              <input
                name="socials.tiktok"
                value={form.socials.tiktok}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="mt-6 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
};

export default Settings;
