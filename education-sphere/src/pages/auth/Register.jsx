// src/pages/auth/RegisterStudent.jsx
import React from "react";
import { Form, Input, Button, Select } from "antd";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import logo from "/src/assets/images/Logo.png";

const { Option } = Select;

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const success = await register(values);
    if (!success) return;

    // Redirect based on role
    switch (values.role) {
      case "admin":
        navigate("/admin");
        break;
      case "teacher":
        navigate("/teacher");
        break;
      case "finance":
        navigate("/finance");
        break;
      case "parent":
        navigate("/parent");
        break;
      case "student":
        navigate("/student");
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-6">
        <img src={logo} alt="ElimuSphere Logo" className="w-32 h-32 object-contain" />

        <div className="bg-white border border-gray-300 p-8 rounded-lg shadow-md w-80">
          <h2 className="text-2xl font-semibold text-center mb-6" style={{ color: "#0B3D91" }}>
            Registration
          </h2>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Please enter your full name" }]}
            >
              <Input placeholder="Full Name" className="rounded-md border-gray-300" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input placeholder="Email" className="rounded-md border-gray-300" />
            </Form.Item>

            {/* Strong Password Validation */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter a password" },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
                },
              ]}
            >
              <Input.Password placeholder="Password" className="rounded-md border-gray-300" />
            </Form.Item>

            <Form.Item
              name="role"
              rules={[{ required: true, message: "Please select a role" }]}
            >
              <Select placeholder="Select Role" className="rounded-md">
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
                style={{ backgroundColor: "#0B3D91", color: "#FFD700" }}
              >
                Register
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="font-medium" style={{ color: "#0B3D91" }}>
              Login
            </Link>
          </div>
        </div>

        <div className="bg-white border border-gray-300 p-4 rounded-lg shadow-md w-80 text-center text-sm text-gray-500">
          © 2025 ElimuSphere
        </div>
      </div>
    </div>
  );
};

export default Register;
