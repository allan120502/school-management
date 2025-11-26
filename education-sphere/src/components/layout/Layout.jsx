// src/components/layout/Layout.jsx
import React, { useState } from "react";
import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const { Content } = AntLayout;

const Layout = ({ userRole }) => {
  // Desktop collapse
  const [collapsed, setCollapsed] = useState(false);

  // Mobile drawer
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapsed = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sidebar
        collapsed={collapsed}
        toggleCollapsed={toggleCollapsed}
        mobileOpen={mobileOpen}
        toggleMobile={toggleMobile}
        userRole={userRole}
      />

      <AntLayout>
        <Header
          collapsed={collapsed}
          toggleCollapsed={toggleCollapsed}
          toggleMobile={toggleMobile}
        />

        <Content style={{ margin: "24px 16px 0" }}>
          <div className="p-6 bg-gray-100 min-h-[80vh]">
            <Outlet />
          </div>
        </Content>

        <Footer />
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
