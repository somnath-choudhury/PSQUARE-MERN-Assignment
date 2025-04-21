import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  LayoutDashboard,
  Users,
  UserCircle,
  ClipboardList,
  Calendar,
  LogOut,
  Menu,
  X,
  Bell,
} from "lucide-react";

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigation = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Candidates", icon: Users, path: "/candidates" },
    { name: "Employees", icon: UserCircle, path: "/employees" },
    { name: "Attendance", icon: ClipboardList, path: "/attendance" },
    { name: "Leaves", icon: Calendar, path: "/leaves" },
  ];

  return (
    <div className="flex bg-background">
      {/* Sidebar */}
      <aside
        className={`
    fixed lg:static w-[280px] h-full bg-white shadow-card z-50
    transform lg:transform-none transition-transform duration-200
  `}
      >
        <div className="flex flex-col h-full p-6 w-[280px]">
          {" "}
          {/* Ensure the sidebar div has a fixed width */}
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              {/* Logo Content */}
            </div>

            <span className="text-xl flex gap-2 font-semibold text-primary">
              <UserCircle />
              LOGO
            </span>
          </div>
          {/* Navigation */}
          <nav className="flex flex-col gap-6 space-y-2">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
            flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
            ${
              isActive
                ? "bg-primary text-white font-medium"
                : "text-secondary hover:bg-gray-50"
            }
          `}
                end={item.path === "/"}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
          {/* User Profile */}
          <div className="flex items-center justify-center gap-2 mt-4 ">
            <button
              onClick={handleLogout}
              className="flex items-center text-error gap-2 hover:bg-error/10 rounded-lg transition-colors"
            >
              <LogOut size={30} />
              <span className="text-base font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-50 rounded-lg"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-50 rounded-lg relative">
                <Bell size={20} className="text-secondary" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          <Outlet />
        </div>
      </main>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
