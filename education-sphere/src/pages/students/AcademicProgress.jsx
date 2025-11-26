// src/pages/students/Academics.jsx
import React from "react";
import { Card, Table } from "antd";

const Academics = ({ grades = [] }) => {
  const columns = [
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Grade", dataIndex: "grade", key: "grade" },
  ];

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Grades</h2>
      {grades.length > 0 ? (
        <Table columns={columns} dataSource={grades} pagination={false} />
      ) : (
        <p className="text-gray-500">No grades available yet.</p>
      )}
    </Card>
  );
};

export default Academics;
