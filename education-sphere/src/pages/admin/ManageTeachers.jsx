import React, { useState } from "react";
import { Table, Button, Form, Input, Modal, message, Card } from "antd";

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]); // starts empty
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (teacher) => {
    setEditingTeacher(teacher);
    setModalVisible(true);
  };

  const saveTeacher = (values) => {
    if (editingTeacher) {
      setTeachers((prev) =>
        prev.map((t) => (t.id === editingTeacher.id ? { ...t, ...values } : t))
      );
      message.success("Teacher updated!");
    } else {
      setTeachers((prev) => [...prev, { ...values, id: Date.now().toString() }]);
      message.success("Teacher added!");
    }
    setModalVisible(false);
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      render: (_, record) => <Button onClick={() => openModal(record)}>Edit</Button>,
    },
  ];

  return (
    <Card className="shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-yellow-500">Manage Teachers</h2>

      {teachers.length > 0 ? (
        <Table columns={columns} dataSource={teachers} rowKey="id" />
      ) : (
        <p className="text-gray-500 text-center mt-6">No teachers registered yet.</p>
      )}

      <Modal
        title={editingTeacher ? "Edit Teacher" : "Add Teacher"}
        open={modalVisible}
        footer={null}
        onCancel={() => setModalVisible(false)}
      >
        <Form layout="vertical" onFinish={saveTeacher} initialValues={editingTeacher}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ManageTeachers;
