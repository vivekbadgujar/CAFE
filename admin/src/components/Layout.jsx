import Sidebar from "./Sidebar.jsx";
import { clearToken } from "../utils/auth.js";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="mb-6 flex items-center justify-end">
          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
        {children}
      </main>
    </div>
  );
};

export default Layout;
