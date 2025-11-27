// src/pages/admin/AssignAttendance.jsx
import React, { useState } from "react";
import { Table, Button, Form, Input, Modal, Space, Card, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";

const AssignAttendance = () => {
  const { students, setStudents } = useAuth(); // REAL STUDENT DATA
  const [editingStudent, setEditingStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (student) => {
    setEditingStudent(student);
    setModalVisible(true);
  };

  const saveAttendance = (values) => {
    const updated = students.map((s) =>
      s.regNo === editingStudent.regNo
        ? { ...s, attendanceRecords: values.attendanceRecords }
        : s
    );

    setStudents(updated);
    message.success("Attendance updated successfully!");
    setModalVisible(false);
  };

  const columns = [
    { title: "Reg No", dataIndex: "regNo", key: "regNo" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => openModal(record)}
          style={{ backgroundColor: "#0B3D91", borderColor: "#FFD700", color: "#FFD700" }}
        >
          Assign Attendance
        </Button>
      ),
    },
  ];

  return (
    <Card className="p-6 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-yellow-500">
        Assign Attendance
      </h1>

      <Table
        columns={columns}
        dataSource={students}
        rowKey="regNo"
        bordered
        pagination={{ pageSize: 8 }}
        rowClassName={(record, index) => (index % 2 === 0 ? "bg-white" : "bg-gray-50")}
        scroll={{ x: "max-content" }}
        className="assign-attendance-table"
      />

      <Modal
        title={`Assign Attendance - ${editingStudent?.name}`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        {editingStudent && (
          <Form
            layout="vertical"
            onFinish={saveAttendance}
            initialValues={{
              attendanceRecords: editingStudent.attendanceRecords || [],
            }}
          >
            <Form.List name="attendanceRecords">
              {(fields, { add, remove }) => (
                <Card title="Attendance Records" size="small" className="mb-4 shadow-md">
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} align="baseline" className="mb-3">
                      <Form.Item
                        {...restField}
                        name={[name, "month"]}
                        rules={[{ required: true, message: "Month required" }]}
                      >
                        <Input placeholder="Month e.g. Jan" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "percentage"]}
                        rules={[{ required: true, message: "Percentage required" }]}
                      >
                        <Input placeholder="Attendance e.g. 96%" />
                      </Form.Item>
                      <MinusCircleOutlined style={{ color: "#FF0000", fontSize: "18px" }} onClick={() => remove(name)} />
                    </Space>
                  ))}

                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      style={{ borderColor: "#FFD700", color: "#0B3D91" }}
                    >
                      Add Attendance
                    </Button>
                  </Form.Item>
                </Card>
              )}
            </Form.List>

            <Form.Item className="mt-4">
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ backgroundColor: "#0B3D91", borderColor: "#FFD700", color: "#FFD700" }}
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>

      <style>
        {`
          .assign-attendance-table .ant-table-thead > tr > th {
            background-color: #0B3D91;
            color: #FFD700;
            font-weight: bold;
            text-align: center;
          }
          .assign-attendance-table .ant-table-tbody > tr:hover {
            background-color: rgba(255, 215, 0, 0.2);
          }
        `}
      </style>
    </Card>
  );
};

export default AssignAttendance;
