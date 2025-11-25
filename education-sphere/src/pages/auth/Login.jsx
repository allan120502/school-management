// src/pages/auth/Login.jsx
import React from "react";
import { Form, Input, Button, Select } from "antd";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import logo from "/src/assets/images/Logo.png";

const { Option } = Select;

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const success = await login(values);
    if (!success) return;

    // Redirect based on selected role
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
            Login
          </h2>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input placeholder="Email" className="rounded-md border-gray-300" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password placeholder="Password" className="rounded-md border-gray-300" />
            </Form.Item>

            <Form.Item
              name="role"
              rules={[{ required: true, message: "Please select your role" }]}
            >
              <Select placeholder="Select Role" className="rounded-md">
                <Option value="admin">admin</Option>
                <Option value="teacher">teacher</Option>
                <Option value="finance">finance</Option>
                <Option value="parent">parent</Option>
                <Option value="student">student</Option>
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
                Log In
              </Button>
            </Form.Item>
          </Form>

          <div className="flex justify-between text-sm mt-4">
            <Link to="/forgot-password" className="text-yellow-400 font-medium">
              Forgot Password?
            </Link>
            <Link to="/register" className="text-yellow-400 font-medium">
              Register
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

export default Login;
