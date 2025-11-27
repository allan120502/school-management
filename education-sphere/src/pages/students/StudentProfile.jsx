// src/pages/students/StudentProfile.jsx
import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Card } from "antd";

const StudentProfile = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <Card className="w-full max-w-md">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        {user.role === "student" && (
          <p><strong>Student ID:</strong> {user.regNo || "Pending Admin Assignment"}</p>
        )}
      </Card>
    </div>
  );
};

export default StudentProfile;
