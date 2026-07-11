import { Link, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FolderKanban,
  Image,
  LogOut,
  Building2,
} from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    navigate({
      to: "/admin/Login",
    });
  }; 

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white shadow-lg">

      {/* Logo */}
      <div className="flex h-20 items-center justify-center border-b border-gray-200">
        <div className="flex items-center gapcd-3">
          <div className="rounded-xl bg-amber-500 p-3 text-white">
            <Building2 size={24} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900">
              BAALA
            </h2>
            <p className="text-xs tracking-widest text-gray-500">
              CONSTRUCTION
            </p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 p-5">

        <Link
          to="/admin/dashboard"
          activeProps={{
            className:
              "bg-amber-500 text-white shadow-lg",
          }}
          className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-700 transition-all duration-300 hover:bg-amber-50 hover:text-amber-600"
        >
          <LayoutDashboard size={20} />
          Dashboard
        </Link>

        <Link
          to="/admin/Projects"
          activeProps={{
            className:
              "bg-amber-500 text-white shadow-lg",
          }}
          className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-700 transition-all duration-300 hover:bg-amber-50 hover:text-amber-600"
        >
          <FolderKanban size={20} />
          Projects
        </Link>

        <Link
          to="/admin/gallery"
          activeProps={{
            className:
              "bg-amber-500 text-white shadow-lg",
          }}
          className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-700 transition-all duration-300 hover:bg-amber-50 hover:text-amber-600"
        >
          <Image size={20} />
          Gallery
        </Link>

      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-5">

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>

        <p className="mt-5 text-center text-xs text-gray-400">
          © 2026 BAALA Construction
        </p>

      </div>
    </aside>
  );
}