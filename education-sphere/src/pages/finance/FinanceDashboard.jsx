// src/pages/finance/FinanceDashboard.jsx
import React from "react";
import { Table, Card, Statistic, Row, Col, Button } from "antd";

const FinanceDashboard = () => {
  const columns = [
    { title: "Student", dataIndex: "student", key: "student" },
    { title: "Class", dataIndex: "class", key: "class" },
    { title: "Fees Due", dataIndex: "fees", key: "fees" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Action", key: "action", render: () => <Button type="primary">Update</Button> },
  ];

  const data = [
    { key: 1, student: "John Doe", class: "Form 2", fees: "$300", status: "Pending" },
    { key: 2, student: "Jane Smith", class: "Form 3", fees: "$400", status: "Paid" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Finance Dashboard</h1>

      <Row gutter={16}>
        <Col span={12}><Card><Statistic title="Total Fees Collected" value="$50,000" /></Card></Col>
        <Col span={12}><Card><Statistic title="Pending Fees" value="$5,000" /></Card></Col>
      </Row>

      <Card className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Fees Management</h2>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default FinanceDashboard;
