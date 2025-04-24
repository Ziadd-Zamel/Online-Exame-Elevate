import React from "react";
import DashboardHeader from "./dashboard-header";
import Sidebar from "@/components/layout/sidebar";
import { MobileHeader } from "@/components/layout/mobileHeader";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gray-100 flex flex-row justify-center w-full min-h-screen">
      <div className="bg-gray-100  w-full ">
        <MobileHeader />
        <div className="flex md:gap-14 md:py-10 px-5 md:pl-8 md:pr-20">
          <Sidebar />
          <div className="w-full max-w-screen-xl flex-col flex gap-10">
            <DashboardHeader />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
