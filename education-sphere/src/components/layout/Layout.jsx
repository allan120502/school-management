import React, { useState } from "react";
import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const { Content } = AntLayout;

const Layout = ({ userRole }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sidebar
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        toggleMobile={() => setMobileOpen(!mobileOpen)}
        userRole={userRole}
      />
      <AntLayout>
        <Header />
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
