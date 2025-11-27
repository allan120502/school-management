// src/pages/admin/ManageStudents.jsx
import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Space,
  Card,
  message,
} from "antd";
import {
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";

const { confirm } = Modal;

const ManageStudents = () => {
  const { students, setStudents } = useAuth();
  const [editingStudent, setEditingStudent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Open edit modal
  const openEditModal = (student) => {
    setEditingStudent(student);
    setModalVisible(true);
  };

  // Handle edit form submission
  const handleOk = (values) => {
    const updated = students.map((s) =>
      s.id === editingStudent.id
        ? {
            ...s,
            grades: values.grades || [],
            attendance: values.attendance || [],
            fees: values.fees || [],
          }
        : s
    );
    setStudents(updated);
    setModalVisible(false);
    message.success("Student updated successfully!");
  };

  // Generate next Reg No automatically
  const generateRegNo = () => {
    const year = new Date().getFullYear();
    const numbers = students
      .filter((s) => s.regNo)
      .map((s) => Number(s.regNo.split("-").pop()));
    const nextSeq = numbers.length > 0 ? Math.max(...numbers) + 1 : 1;
    return `${year}-STD-${String(nextSeq).padStart(3, "0")}`;
  };

  // Assign Reg No to a student
  const assignRegNoToStudent = (studentId) => {
    const regNo = generateRegNo();
    const updatedStudents = students.map((s) =>
      s.id === studentId ? { ...s, regNo } : s
    );
    setStudents(updatedStudents);
    message.success("Reg No assigned successfully!");
  };

  // Confirm and delete a student
  const deleteStudent = (studentId) => {
    confirm({
      title: "Are you sure you want to delete this student?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        const updatedStudents = students.filter((s) => s.id !== studentId);
        setStudents(updatedStudents);
        message.success("Student deleted successfully!");
      },
    });
  };

  // Table columns
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Reg No",
      dataIndex: "regNo",
      key: "regNo",
      render: (text, record) =>
        record.role === "student" ? (
          text || (
            <Button type="link" onClick={() => assignRegNoToStudent(record.id)}>
              Assign Reg No
            </Button>
          )
        ) : null,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          {record.role === "student" && (
            <Button danger onClick={() => deleteStudent(record.id)}>
              Delete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Card className="shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-yellow-500">
        Manage Students
      </h2>

      {students.length > 0 ? (
        <Table
          columns={columns}
          dataSource={students}
          rowKey="id"
          bordered
          pagination={{ pageSize: 8 }}
          rowClassName={(record, index) =>
            index % 2 === 0 ? "bg-white" : "bg-gray-50"
          }
          style={{ borderRadius: 8, overflow: "hidden" }}
          scroll={{ x: "max-content" }}
          className="manage-students-table"
        />
      ) : (
        <p className="text-gray-500 text-center mt-6">
          No students have registered yet.
        </p>
      )}

      {/* Edit Modal */}
      <Modal
        title={`Edit Student: ${editingStudent?.name || ""}`}
        open={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
        width={700}
      >
        {editingStudent && (
          <Form
            layout="vertical"
            initialValues={{
              grades: editingStudent.grades || [],
              attendance: editingStudent.attendance || [],
              fees: editingStudent.fees || [],
            }}
            onFinish={handleOk}
          >
            {/* Grades */}
            <Form.List name="grades">
              {(fields, { add, remove }) => (
                <Card title="Grades" size="small" className="mb-4">
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} align="baseline" className="mb-2">
                      <Form.Item
                        {...restField}
                        name={[name, "subject"]}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Subject" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "grade"]}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Grade" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Grade
                    </Button>
                  </Form.Item>
                </Card>
              )}
            </Form.List>

            {/* Attendance */}
            <Form.List name="attendance">
              {(fields, { add, remove }) => (
                <Card title="Attendance" size="small" className="mb-4">
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} align="baseline" className="mb-2">
                      <Form.Item
                        {...restField}
                        name={[name, "month"]}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Month" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "percentage"]}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Percentage" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Attendance
                    </Button>
                  </Form.Item>
                </Card>
              )}
            </Form.List>

            {/* Fees */}
            <Form.List name="fees">
              {(fields, { add, remove }) => (
                <Card title="Fees" size="small" className="mb-4">
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} align="baseline" className="mb-2">
                      <Form.Item
                        {...restField}
                        name={[name, "date"]}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Date" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "amount"]}
                        rules={[{ required: true }]}
                      >
                        <InputNumber placeholder="Amount" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "status"]}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Status" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Fee
                    </Button>
                  </Form.Item>
                </Card>
              )}
            </Form.List>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* Table styling */}
      <style>
        {`
          .manage-students-table .ant-table-thead > tr > th {
            background-color: #0B3D91;
            color: #FFD700;
            font-weight: bold;
            text-align: center;
          }
          .manage-students-table .ant-table-tbody > tr:hover {
            background-color: rgba(255, 215, 0, 0.2);
          }
          .manage-students-table .ant-btn-primary {
            background-color: #0B3D91;
            border-color: #FFD700;
            color: #FFD700;
            font-weight: bold;
          }
          .manage-students-table .ant-btn-primary:hover {
            background-color: #FFD700;
            color: #0B3D91;
          }
          .manage-students-table .ant-btn-danger {
            background-color: #FF4D4F;
            border-color: #FF4D4F;
            color: #fff;
          }
          .manage-students-table .ant-btn-danger:hover {
            background-color: #ff7875;
            border-color: #ff7875;
          }
          .manage-students-table .ant-btn-link {
            color: #0B3D91;
            font-weight: bold;
          }
          .manage-students-table .ant-btn-link:hover {
            color: #FFD700;
          }
        `}
      </style>
    </Card>
  );
};

export default ManageStudents;
