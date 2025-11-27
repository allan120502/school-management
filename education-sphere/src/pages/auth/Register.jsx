import React, { useState } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "/src/assets/images/Logo.png";

const { Option } = Select;

export default function Register() {
  const { register, loading, currentUser } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("");

  const onFinish = async (values) => {
    const userData = { ...values, role };
    const success = await register(userData);
    if (!success) return;

    if (role === "student") {
      message.success(
        `Student registered successfully! Assigned Student ID: ${currentUser?.regNo || ""}`
      );
      navigate("/student/dashboard");
      return;
    }

    if (role === "admin") {
      message.success(`Admin registered successfully!`);
      navigate("/admin/dashboard");
      return;
    }

    if (role === "teacher") {
      message.success(`Teacher registered successfully!`);
      navigate("/teacher/dashboard");
      return;
    }

    if (role === "finance") {
      message.success(`Finance account registered successfully!`);
      navigate("/finance/dashboard");
      return;
    }

    if (role === "parent") {
      message.success(`Parent account registered successfully!`);
      navigate("/parent/dashboard");
      return;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <img src={logo} alt="Logo" className="w-32 h-32 mb-6" />

      <div className="bg-white p-8 rounded-lg shadow-md w-80 flex flex-col items-center">
        <h2
          className="text-2xl font-bold mb-4 text-center"
          style={{ color: "#0B3D91" }}
        >
          Register
        </h2>

        <Form layout="vertical" onFinish={onFinish} className="w-full">

          <Form.Item name="role" rules={[{ required: true }]}>
            <Select placeholder="Select Role" onChange={(value) => setRole(value)}>
              <Option value="admin">Admin</Option>
              <Option value="teacher">Teacher</Option>
              <Option value="finance">Finance</Option>
              <Option value="parent">Parent</Option>
              <Option value="student">Student</Option>
            </Select>
          </Form.Item>

          <Form.Item name="name" rules={[{ required: true }]}>
            <Input placeholder="Full Name" />
          </Form.Item>

          <Form.Item name="email" rules={[{ required: true }, { type: "email" }]}>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Password" />
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
              Register
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-2">
          <span className="text-gray-600 text-sm">
            Already have an account?{" "}
            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </span>
        </div>

      </div>
    </div>
  );
}
