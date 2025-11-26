import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ userRole }) => (
  <div className="flex min-h-screen">
    <Sidebar userRole={userRole} />
    <div className="flex-1 flex flex-col">
      <Header userRole={userRole} />
      <main className="p-6 flex-1 bg-gray-100">
        <Outlet /> {/* Nested pages render here */}
      </main>
      <Footer />
    </div>
  </div>
);

export default Layout;
