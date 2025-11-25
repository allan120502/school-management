// src/pages/parent/ParentDashboard.jsx
import React from "react";
import { Card, Table, Row, Col, Statistic } from "antd";

const ParentDashboard = () => {
  const childGrades = [
    { key: 1, subject: "Math", grade: "A" },
    { key: 2, subject: "English", grade: "B+" },
  ];

  const columns = [
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Grade", dataIndex: "grade", key: "grade" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Parent Portal</h1>

      <Row gutter={16}>
        <Col span={12}>
          <Card><Statistic title="Child Attendance" value="90%" /></Card>
        </Col>
        <Col span={12}>
          <Card><Statistic title="Overall GPA" value="3.5" /></Card>
        </Col>
      </Row>

      <Card className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Child Grades</h2>
        <Table columns={columns} dataSource={childGrades} pagination={false} />
      </Card>
    </div>
  );
};

export default ParentDashboard;
