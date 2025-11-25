// src/pages/auth/ForgotPassword.jsx
import React, { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = ({ email }) => {
    setLoading(true);
    setTimeout(() => {
      message.success(`Password reset link sent to ${email}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card title="Forgot Password" style={{ width: 400 }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="student@example.com" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Send Reset Link
            </Button>
          </Form.Item>

          <div className="text-center">
            Back to <Link to="/login">Login</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPassword; // ✅ make sure this default export exists
