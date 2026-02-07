import { useEffect, useState } from "react";
import api from "../services/api.js";
import { useToast } from "../components/Toast.jsx";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/api/messages");
      setMessages(data);
    } catch (error) {
      addToast("Unable to load messages", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id) => {
    const shouldDelete = window.confirm("Delete this message?");
    if (!shouldDelete) {
      return;
    }
    try {
      await api.delete(`/api/messages/${id}`);
      addToast("Message deleted");
      fetchMessages();
    } catch (error) {
      addToast("Delete failed", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Contact Messages</h2>
        <p className="text-sm text-slate-400">Review and manage contact form submissions.</p>
      </div>

      {loading ? (
        <p className="text-slate-400">Loading messages...</p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message._id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{message.name}</h3>
                  <p className="text-xs text-slate-400">{message.email}</p>
                </div>
                <button
                  onClick={() => handleDelete(message._id)}
                  className="rounded-lg border border-red-500 px-3 py-1 text-xs text-red-400"
                >
                  Delete
                </button>
              </div>
              <p className="mt-3 text-sm text-slate-300">{message.message}</p>
            </div>
          ))}
          {messages.length === 0 && <p className="text-slate-400">No messages yet.</p>}
        </div>
      )}
    </div>
  );
};

export default Messages;
