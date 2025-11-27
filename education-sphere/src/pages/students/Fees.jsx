import React from "react";
import { Card, Table } from "antd";
import { useAuth } from "../../context/AuthContext";

const Fees = () => {
  const { user } = useAuth();
  const fees = user?.fees || [];

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Amount", dataIndex: "amount", key: "amount", render: val => val.toLocaleString() },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return (
    <Card title="Fees & Payments">
      {fees.length > 0 ? (
        <Table columns={columns} dataSource={fees} pagination={false} rowKey="date" />
      ) : (
        <p>No fees assigned yet.</p>
      )}
    </Card>
  );
};

export default Fees;
