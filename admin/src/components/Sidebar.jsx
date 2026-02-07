import { NavLink } from "react-router-dom";

const linkClasses = ({ isActive }) =>
  `block rounded-lg px-4 py-2 text-sm font-medium transition ${
    isActive ? "bg-amber-500 text-slate-900" : "text-slate-200 hover:bg-slate-800"
  }`;

const Sidebar = () => (
  <aside className="min-h-screen w-64 bg-slate-900/80 p-6">
    <div className="mb-8">
      <p className="text-xs uppercase tracking-widest text-amber-400">Admin Panel</p>
      <h1 className="text-2xl font-semibold text-white">Good Grounds</h1>
    </div>
    <nav className="space-y-2">
      <NavLink to="/" end className={linkClasses}>
        Dashboard
      </NavLink>
      <NavLink to="/menu" className={linkClasses}>
        Menu Management
      </NavLink>
      <NavLink to="/gallery" className={linkClasses}>
        Gallery
      </NavLink>
      <NavLink to="/messages" className={linkClasses}>
        Contact Messages
      </NavLink>
      <NavLink to="/settings" className={linkClasses}>
        Cafe Settings
      </NavLink>
    </nav>
  </aside>
);

export default Sidebar;
