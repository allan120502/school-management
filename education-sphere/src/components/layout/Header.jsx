// src/components/Layout/Header.jsx
import React from "react";
import { Layout, Avatar, Dropdown, Menu, Badge } from "antd";
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";
import logo from "/src/assets/images/Logo.png";

const { Header: AntHeader } = Layout;

const Header = () => {
  const { user, logout } = useAuth();

  const userMenu = (
    <Menu>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="logout" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader
      style={{
        backgroundColor: "#0B3D91",
        padding: "0 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left: Logo + Role */}
      <div className="flex items-center gap-4">
        <img src={logo} alt="ElimuSphere Logo" className="w-10 h-10 object-contain" />
        <span className="text-yellow-400 text-xl font-bold">{user?.role || "Dashboard"}</span>
      </div>

      {/* Right: Notifications + User */}
      <div className="flex items-center gap-4">
        <Badge count={3}>
          <BellOutlined style={{ fontSize: 20, color: "#FFD700", cursor: "pointer" }} />
        </Badge>
        <Dropdown overlay={userMenu} placement="bottomRight">
          <Avatar size="large" icon={<UserOutlined />} style={{ cursor: "pointer" }} />
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;
