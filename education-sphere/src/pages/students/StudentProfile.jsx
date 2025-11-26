import React from "react";
import { Card, Descriptions } from "antd";
import { useAuth } from "../../context/AuthContext";

const StudentProfile = () => {
  const { user } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <Card title="Profile Information">
        <Descriptions column={1}>
          <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Role">{user.role}</Descriptions.Item>
          <Descriptions.Item label="ID">{user.id}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default StudentProfile;
