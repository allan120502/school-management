// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Layout
import Layout from "../components/layout/Layout";

// PrivateRoute
import PrivateRoute from "./PrivateRoute";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";

// Teacher Pages
import TeacherDashboard from "../pages/teacher/TeacherDashboard";

// Finance Pages
import FinanceDashboard from "../pages/finance/FinanceDashboard";

// Parent Pages
import ParentDashboard from "../pages/parent/ParentDashboard";

// Student Pages
import StudentDashboard from "../pages/students/StudentDashboard";
import StudentProfile from "../pages/students/StudentProfile";
import Attendance from "../pages/students/Attendance";
import Application from "../pages/students/Application";
import AcademicProgress from "../pages/students/AcademicProgress";
import Fees from "../pages/students/Fees";

// Auth Pages
import Login from "../pages/auth/Login";
import RegisterStudent from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterStudent />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Admin */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Layout userRole="admin">
              <Routes>
                <Route path="" element={<AdminDashboard />} />
              </Routes>
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Teacher */}
      <Route
        path="/teacher"
        element={
          <PrivateRoute allowedRoles={["teacher"]}>
            <Layout userRole="teacher">
              <Routes>
                <Route path="" element={<TeacherDashboard />} />
              </Routes>
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Finance */}
      <Route
        path="/finance"
        element={
          <PrivateRoute allowedRoles={["finance"]}>
            <Layout userRole="finance">
              <Routes>
                <Route path="" element={<FinanceDashboard />} />
              </Routes>
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Parent */}
      <Route
        path="/parent"
        element={
          <PrivateRoute allowedRoles={["parent"]}>
            <Layout userRole="parent">
              <Routes>
                <Route path="" element={<ParentDashboard />} />
              </Routes>
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Student */}
      <Route
        path="/student"
        element={
          <PrivateRoute allowedRoles={["student"]}>
            <Layout userRole="student">
              <Routes>
                <Route path="" element={<StudentDashboard />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="attendance" element={<Attendance />} />
                <Route path="application" element={<Application />} />
                <Route path="academic" element={<AcademicProgress />} />
                <Route path="fees" element={<Fees />} />
              </Routes>
            </Layout>
          </PrivateRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={<h1 className="p-6 text-3xl text-center" style={{ color: "#0B3D91" }}>404 - Page Not Found</h1>}
      />
    </Routes>
  );
};

export default AppRoutes;
