import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardLayout from './components/layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import CandidatesPage from './pages/candidates/CandidatesPage';
import CandidateDetailsPage from './pages/candidates/CandidateDetailsPage';
import EmployeesPage from './pages/employees/EmployeesPage';
import EmployeeDetailsPage from './pages/employees/EmployeeDetailsPage';
import AttendancePage from './pages/attendance/AttendancePage';
import LeavesPage from './pages/leaves/LeavesPage';
import LeaveCalendarPage from './pages/leaves/LeaveCalendarPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Dashboard Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="candidates" element={<CandidatesPage />} />
            <Route path="candidates/:id" element={<CandidateDetailsPage />} />
            <Route path="employees" element={<EmployeesPage />} />
            <Route path="employees/:id" element={<EmployeeDetailsPage />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="leaves" element={<LeavesPage />} />
            <Route path="leave-calendar" element={<LeaveCalendarPage />} />
          </Route>
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;