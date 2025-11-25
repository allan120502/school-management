// src/pages/admin/AdminDashboard.jsx
import React from "react";
import { Card, Row, Col, Statistic } from "antd";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Students" value={1200} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Teachers" value={75} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Finance Officers" value={5} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Parents" value={1100} />
          </Card>
        </Col>
      </Row>

      <Card className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Management Features</h2>
        <ul className="list-disc ml-6">
          <li>User Management & Role Assignments</li>
          <li>System Notifications</li>
          <li>School Analytics & Reports</li>
          <li>Logs & Audits</li>
        </ul>
      </Card>
    </div>
  );
};

export default AdminDashboard;
