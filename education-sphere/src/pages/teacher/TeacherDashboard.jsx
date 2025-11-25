// src/pages/teacher/TeacherDashboard.jsx
import React from "react";
import { Card, Table, Button } from "antd";

const TeacherDashboard = () => {
  const columns = [
    { title: "Student Name", dataIndex: "name", key: "name" },
    { title: "Class", dataIndex: "class", key: "class" },
    { title: "Attendance", dataIndex: "attendance", key: "attendance" },
    { title: "Grades", dataIndex: "grades", key: "grades" },
    { title: "Action", key: "action", render: () => <Button type="primary">Edit</Button> },
  ];

  const data = [
    { key: 1, name: "John Doe", class: "Form 2", attendance: "95%", grades: "A" },
    { key: 2, name: "Jane Smith", class: "Form 3", attendance: "88%", grades: "B+" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Manage Students</h2>
        <Table columns={columns} dataSource={data} />
      </Card>
    </div>
  );
};

export default TeacherDashboard;
