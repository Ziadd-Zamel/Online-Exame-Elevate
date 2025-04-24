// React and Next
import React from "react";
import Image from "next/image";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

// UI Components
import { Input } from "@/components/ui/input";

// Local Components
import ConditionalDialogs from "./admin-dialogs/conditional-dialogs";

// Icons
import { SearchIcon } from "lucide-react";

export default async function DashboardHeader() {
  // Get Session
  const session = await getServerSession(authOptions);

  // Get User Data
  const user = session?.user;

  // Get User Role
  const role = user?.role;
  return (
    <>
      <div className=" hidden md:flex items-center gap-6 w-full">
        <div className="flex items-center flex-1  gap-6 px-3 h-10 lg:h-14 bg-white rounded-2xl shadow-main w-full ">
          <SearchIcon className="size-6 text-primaryMain" />
          <Input
            className="w-full border-none text-xl text-gray-400 font-normal placeholder:text-gray-400 focus-visible:ring-0"
            placeholder="Search Quiz"
          />
        </div>
        {role === "admin" && <ConditionalDialogs />}
        <Image
          src={"/assets/profile.png"}
          alt="Avatar"
          width={60}
          height={60}
          className="rounded-full"
        />
      </div>
    </>
  );
}
