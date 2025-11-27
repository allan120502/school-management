// src/pages/admin/ManageParents.jsx
import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { useAuth } from "../../context/AuthContext";

const ManageParents = () => {
  const { user, updateParents } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingParent, setEditingParent] = useState(null);

  // Get current parents list or empty array
  const parents = user?.parents || [];

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            setEditingParent(record);
            setIsModalOpen(true);
          }}
        >
          Edit
        </Button>
      ),
    },
  ];

  const handleSave = (values) => {
    let updatedParents;
    if (editingParent) {
      // Edit existing
      updatedParents = parents.map((p) =>
        p.id === editingParent.id ? { ...p, ...values } : p
      );
    } else {
      // Add new
      updatedParents = [...parents, { id: Date.now().toString(), ...values }];
    }

    updateParents(updatedParents);
    message.success("Parent saved successfully!");
    setIsModalOpen(false);
    setEditingParent(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Parents</h1>
      <Button type="primary" className="mb-4" onClick={() => setIsModalOpen(true)}>
        Add Parent
      </Button>

      <Table columns={columns} dataSource={parents} rowKey="id" />

      <Modal
        title={editingParent ? "Edit Parent" : "Add Parent"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingParent(null);
        }}
        footer={null}
      >
        <Form
          initialValues={editingParent || { name: "", email: "" }}
          onFinish={handleSave}
          layout="vertical"
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageParents;
