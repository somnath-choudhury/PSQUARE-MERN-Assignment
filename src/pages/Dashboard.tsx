import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Users, UserCircle, ClipboardList, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="fade-in items-center">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-secondary">
          Here's what's happening with your HR Management system today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link
          to="/candidates"
          className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-2 transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Users size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">45</p>
              <p className="text-secondary">Total Candidates</p>
            </div>
          </div>
        </Link>

        <Link
          to="/employees"
          className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-2 transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center">
              <UserCircle size={24} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">32</p>
              <p className="text-secondary">Total Employees</p>
            </div>
          </div>
        </Link>

        <Link
          to="/attendance"
          className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-2 transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-warning/10 flex items-center justify-center">
              <ClipboardList size={24} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">95%</p>
              <p className="text-secondary">Attendance Rate</p>
            </div>
          </div>
        </Link>

        <Link
          to="/leaves"
          className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-2 transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-error/10 flex items-center justify-center">
              <Calendar size={24} className="text-error" />
            </div>
            <div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-secondary">Active Leaves</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 shadow-card">
        <h2 className="text-lg font-semibold mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <UserCircle size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">New candidate application</p>
                <p className="text-sm text-secondary">
                  John Doe applied for Frontend Developer position
                </p>
              </div>
              <span className="ml-auto text-sm text-secondary">2h ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
