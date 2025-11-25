// src/pages/students/StudentDashboard.jsx
import React from "react";
import { Card, Row, Col, Statistic, Table } from "antd";

const StudentDashboard = () => {
  const gradesData = [
    { key: 1, subject: "Math", grade: "A" },
    { key: 2, subject: "English", grade: "B+" },
  ];

  const gradesColumns = [
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Grade", dataIndex: "grade", key: "grade" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>

      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Statistic title="Attendance" value="92%" />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic title="Overall GPA" value="3.7" />
          </Card>
        </Col>
      </Row>

      <Card className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Grades</h2>
        <Table columns={gradesColumns} dataSource={gradesData} pagination={false} />
      </Card>
    </div>
  );
};

export default StudentDashboard;
