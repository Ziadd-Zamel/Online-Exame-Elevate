import React from "react";
import DashboardLayout from "./_components/dashboard-layout";

const layout = ({ children }: LayoutProps) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default layout;
