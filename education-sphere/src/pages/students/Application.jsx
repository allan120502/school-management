import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Student pages
import StudentDashboard from "./StudentDashboard";
import Attendance from "./Attendance";
import Academics from "./AcademicProgress";
import Fees from "./Fees";

// Sidebar or Nav for student
const StudentNav = () => (
  <nav className="bg-gray-100 p-4 flex gap-4">
    <Link to="/student/dashboard" className="text-blue-700 font-semibold">Dashboard</Link>
    <Link to="/student/attendance" className="text-blue-700 font-semibold">Attendance</Link>
    <Link to="/student/academics" className="text-blue-700 font-semibold">Academics</Link>
    <Link to="/student/fees" className="text-blue-700 font-semibold">Fees</Link>
  </nav>
);

const Application = () => {
  const { user } = useAuth();

  // Redirect to login if not a student
  if (!user || user.role !== "student") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      {/* Navigation */}
      <StudentNav />

      {/* Main content */}
      <div className="p-6">
        <Routes>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="academics" element={<Academics />} />
          <Route path="fees" element={<Fees />} />
          {/* Default redirect to dashboard */}
          <Route path="" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Application;
