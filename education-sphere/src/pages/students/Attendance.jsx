// src/pages/students/Attendance.jsx
import React from "react";
import { Card, Table } from "antd";

const Attendance = ({ attendanceRecords = [] }) => {
  const columns = [
    { title: "Month", dataIndex: "month", key: "month" },
    { title: "Attendance", dataIndex: "percentage", key: "percentage" },
  ];

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-4">Attendance</h2>
      {attendanceRecords.length > 0 ? (
        <Table columns={columns} dataSource={attendanceRecords} pagination={false} />
      ) : (
        <p className="text-gray-500">No attendance records available yet.</p>
      )}
    </Card>
  );
};

export default Attendance;
