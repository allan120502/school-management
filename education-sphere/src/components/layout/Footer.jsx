import React from "react";
import { Layout } from "antd";

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter
      style={{
        textAlign: "center",
        backgroundColor: "#f7fafc",
        color: "#1e293b",
        borderTop: "1px solid #e2e8f0",
      }}
    >
      © {new Date().getFullYear()} ElimuSphere. All rights reserved.
    </AntFooter>
  );
};

export default Footer;
