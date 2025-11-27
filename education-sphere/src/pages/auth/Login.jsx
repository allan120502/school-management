import React, { useState } from "react";
import { Form, Input, Button, Select } from "antd";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import logo from "/src/assets/images/Logo.png";

const { Option } = Select;

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const onFinish = async (values) => {
    setError("");

    // Convert studentId → identifier
    if (role === "student" && values.studentId) {
      values.identifier = values.studentId;
    }

    const success = await login({ ...values, role });

    if (!success) {
      setError("Invalid credentials or role.");
      return;
    }

    // Fetch real role from localStorage
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const actualRole = user.role;

    switch (actualRole) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "teacher":
        navigate("/teacher/dashboard");
        break;
      case "finance":
        navigate("/finance/dashboard");
        break;
      case "parent":
        navigate("/parent/dashboard");
        break;
      case "student":
        navigate("/student/dashboard");
        break;
      default:
        navigate("/");
        break;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <img src={logo} alt="Logo" className="w-32 h-32 mb-6" />

      <div className="bg-white p-8 rounded-lg shadow-md w-80 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: "#0B3D91" }}>
          Login
        </h2>

        {error && <p className="text-red-600 text-center mb-2">{error}</p>}

        <Form layout="vertical" onFinish={onFinish} className="w-full">

          {role === "student" && (
            <Form.Item
              name="studentId"
              rules={[{ required: true, message: "Enter Student ID" }]}
            >
              <Input placeholder="Student ID" />
            </Form.Item>
          )}

          {role !== "student" && (
            <Form.Item
              name="identifier"
              rules={[{ required: true, message: "Enter Email or Username" }]}
            >
              <Input placeholder="Email or Username" />
            </Form.Item>
          )}

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Enter password" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item name="role" rules={[{ required: true }]}>
            <Select placeholder="Select Role" onChange={(value) => setRole(value)}>
              <Option value="admin">Admin</Option>
              <Option value="teacher">Teacher</Option>
              <Option value="finance">Finance</Option>
              <Option value="parent">Parent</Option>
              <Option value="student">Student</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{
                background: "linear-gradient(to right, #0B3D91, #FFD700)",
                color: "#fff",
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <p className="text-gray-400 mt-4 text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-500 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
