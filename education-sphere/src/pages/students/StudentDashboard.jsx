// src/pages/students/StudentDashboard.jsx
import React from "react";
import { Card, Row, Col } from "antd";
import Attendance from "./Attendance";
import Academics from "./AcademicProgress";
import Fees from "./Fees";
import { useAuth } from "../../context/AuthContext";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Student Dashboard</h1>

      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <h3 className="font-semibold">Overall GPA</h3>
            <p>{user?.gpa ?? "No GPA recorded yet"}</p>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <h3 className="font-semibold">Attendance</h3>
            <p>
              {user?.attendanceRecords?.length
                ? `${user.attendanceRecords.length} records available`
                : "No attendance records yet"}
            </p>
          </Card>
        </Col>
      </Row>

      <Academics grades={user?.grades ?? []} />
      <Attendance attendanceRecords={user?.attendanceRecords ?? []} />
      <Fees feesRecords={user?.feesRecords ?? []} />
    </div>
  );
};

export default StudentDashboard;
