import React from "react";
import { Card, Table } from "antd";
import { useAuth } from "../../context/AuthContext";

const Attendance = () => {
  const { user } = useAuth();

  const columns = [
    { title: "Month", dataIndex: "month", key: "month" },
    { title: "Attendance", dataIndex: "percentage", key: "percentage" },
  ];

  const records = user?.attendanceRecords || [];

  return (
    <Card title="Attendance">
      {records.length > 0 ? (
        <Table columns={columns} dataSource={records} pagination={false} rowKey="month" />
      ) : (
        <p>No attendance records assigned yet.</p>
      )}
    </Card>
  );
};

export default Attendance;
