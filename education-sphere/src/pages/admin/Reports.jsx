// src/pages/admin/Reports.jsx
import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import { UserOutlined, FileTextOutlined, DollarOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";

const Reports = () => {
  const { students = [] } = useAuth(); // default to empty array
  const totalStudents = students.length;

  // Calculate Average GPA safely
  const totalGPA = students.reduce((sum, student) => {
    const grades = student.grades || [];
    if (grades.length === 0) return sum;

    const gradeToPoint = { "A+":5, "A":4.5, "B+":4, "B":3.5, "C":3, "D":2, "F":0 };
    const gpa = grades.reduce((acc, g) => acc + (gradeToPoint[g.grade] || 0), 0) / grades.length;
    return sum + gpa;
  }, 0);
  const avgGPA = totalStudents ? (totalGPA / totalStudents).toFixed(2) : 0;

  // Calculate pending fees safely
  const pendingFees = students.reduce((sum, student) => {
    const feesArray = student.fees || [];
    const pending = feesArray
      .filter((f) => f.status?.toLowerCase() !== "paid")
      .reduce((s, f) => s + Number(f.amount || 0), 0);
    return sum + pending;
  }, 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-yellow-500 mb-6">Reports & Analytics</h1>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card
            className="shadow-lg rounded-lg hover:shadow-xl transition-shadow"
            style={{ borderLeft: "6px solid #FFD700" }}
          >
            <Statistic
              title="Total Students"
              value={totalStudents}
              prefix={<UserOutlined style={{ color: "#FFD700" }} />}
              valueStyle={{ color: "#0B3D91", fontWeight: "bold", fontSize: "1.8rem" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            className="shadow-lg rounded-lg hover:shadow-xl transition-shadow"
            style={{ borderLeft: "6px solid #FFD700" }}
          >
            <Statistic
              title="Average GPA"
              value={avgGPA}
              prefix={<FileTextOutlined style={{ color: "#FFD700" }} />}
              valueStyle={{ color: "#0B3D91", fontWeight: "bold", fontSize: "1.8rem" }}
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            className="shadow-lg rounded-lg hover:shadow-xl transition-shadow"
            style={{ borderLeft: "6px solid #FFD700" }}
          >
            <Statistic
              title="Pending Fees"
              value={pendingFees}
              prefix={<DollarOutlined style={{ color: "#FFD700" }} />}
              valueStyle={{ color: "#0B3D91", fontWeight: "bold", fontSize: "1.8rem" }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
