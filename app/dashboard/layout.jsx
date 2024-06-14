"use client";
import React from "react";
import SideNav from "./_components/SideNav";

function DashboardLayout({ children }) {
  return (
    <div>
      <div className="fixed bg-gray-900 md:w-64">
        <SideNav />
      </div>
      <div className="bg-gray-900 md:ml-64">{children}</div>
    </div>
  );
}

export default DashboardLayout;
