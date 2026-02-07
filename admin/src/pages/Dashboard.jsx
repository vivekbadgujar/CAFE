import { useEffect, useState } from "react";
import api from "../services/api.js";

const StatCard = ({ label, value }) => (
  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
    <p className="text-sm text-slate-400">{label}</p>
    <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({ menu: 0, messages: 0, gallery: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [menu, messages, gallery] = await Promise.all([
          api.get("/api/menu"),
          api.get("/api/messages"),
          api.get("/api/gallery")
        ]);
        setStats({
          menu: menu.data.length,
          messages: messages.data.length,
          gallery: gallery.data.length
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold">Dashboard Overview</h2>
      {loading ? (
        <p className="text-slate-400">Loading stats...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <StatCard label="Total Menu Items" value={stats.menu} />
          <StatCard label="Total Messages" value={stats.messages} />
          <StatCard label="Gallery Images" value={stats.gallery} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
