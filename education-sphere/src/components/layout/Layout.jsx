// src/components/Layout.jsx
import React, { useState } from "react";
import { Layout as AntLayout } from "antd";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const { Content } = AntLayout;

const Layout = ({ children, userRole }) => {
  const [collapsed, setCollapsed] = useState(false); // Desktop sidebar


  return (
    <AntLayout style={{ minHeight: "100vh", backgroundColor: "#f7fafc" }}>
      {/* Single Sidebar, menu changes based on userRole */}
      <Sidebar
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
    
        userRole={userRole} // passes role to Sidebar
      />

      <AntLayout>
        <Header  userRole={userRole} />
        <Content style={{ margin: "16px" }}>{children}</Content>
        <Footer />
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
