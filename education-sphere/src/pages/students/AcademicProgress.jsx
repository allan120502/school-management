import React from "react";
import { Card, Table } from "antd";
import { useAuth } from "../../context/AuthContext";

const Academics = () => {
  const { user } = useAuth();

  const columns = [
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Grade", dataIndex: "grade", key: "grade" },
  ];

  const grades = user?.grades || [];

  return (
    <Card title="Grades">
      {grades.length > 0 ? (
        <Table columns={columns} dataSource={grades} pagination={false} rowKey="subject" />
      ) : (
        <p>No grades assigned yet.</p>
      )}
    </Card>
  );
};

export default Academics;
