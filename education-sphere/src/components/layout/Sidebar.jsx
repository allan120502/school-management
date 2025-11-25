// src/components/Sidebar.jsx
import React from "react";
import { Menu, Layout, Drawer } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
  BookOutlined,
  DollarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import logo from "/src/assets/images/Logo.png";

const { Sider } = Layout;

const Sidebar = ({ collapsed, toggleCollapsed, mobileOpen, toggleMobile, userRole }) => {
  const location = useLocation();

  // Define menu items per role
  const menusByRole = {
    admin: [
      { key: "/admin", icon: <SettingOutlined />, label: "Admin Dashboard" },
    ],
    teacher: [
      { key: "/teacher", icon: <BookOutlined />, label: "Teacher Dashboard" },
    ],
    finance: [
      { key: "/finance", icon: <DollarOutlined />, label: "Finance Dashboard" },
    ],
    parent: [
      { key: "/parent", icon: <UserOutlined />, label: "Parent Dashboard" },
    ],
    student: [
      { key: "/student", icon: <HomeOutlined />, label: "Dashboard" },
      { key: "/student/profile", icon: <UserOutlined />, label: "Profile" },
      { key: "/student/attendance", icon: <CalendarOutlined />, label: "Attendance" },
      { key: "/student/academic", icon: <BookOutlined />, label: "Academics" },
      { key: "/student/fees", icon: <DollarOutlined />, label: "Fees" },
    ],
  };

  const menuItems = menusByRole[userRole] || [];

  const menu = (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[location.pathname]}
      style={{ backgroundColor: "#f7fafc", border: "none" }}
      items={menuItems.map((item) => ({
        key: item.key,
        icon: React.cloneElement(item.icon, { style: { color: "#1d4ed8" } }),
        label: <Link to={item.key} onClick={() => mobileOpen && toggleMobile()}>{item.label}</Link>,
      }))}
    />
  );

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        width={250}
        breakpoint="md"
        collapsedWidth={80}
        className="hidden md:flex flex-col shadow-md"
        style={{ backgroundColor: "#f7fafc" }}
      >
        <div className="flex items-center justify-center p-4 border-b" style={{ borderColor: "#e2e8f0" }}>
          <img src={logo} alt="Logo" className="w-10 h-10 mr-2 object-contain" style={{ display: collapsed ? "none" : "block" }} />
          <span className="text-xl font-bold" style={{ color: "#1d4ed8" }}>{collapsed ? "ES" : "ElimuSphere"}</span>
        </div>
        {menu}
      </Sider>

      <Drawer
        title={<div className="flex items-center gap-2"><img src={logo} alt="Logo" className="w-10 h-10 object-contain" /><span className="text-xl font-bold" style={{ color: "#1d4ed8" }}>ElimuSphere</span></div>}
        placement="left"
        closable={true}
        onClose={toggleMobile}
        open={mobileOpen}
        bodyStyle={{ padding: 0, backgroundColor: "#f7fafc" }}
        width={250}
      >
        {menu}
      </Drawer>
    </>
  );
};

export default Sidebar;
