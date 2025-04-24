import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { SearchIcon } from "lucide-react";
import React from "react";
import { MobileDrawer } from "../components/mobile-drawer";

export const MobileHeader = () => {
  return (
    <header className="flex md:hidden h-16 w-full items-center justify-between bg-primaryMain border-b border-[#dbdade] p-4">
      <div className="flex items-center gap-6">
        <MobileDrawer />
        <button aria-label="Search" className="text-white">
          <SearchIcon size={22} />
        </button>
      </div>

      <Avatar className="size-10">
        <AvatarImage src="/assets/profile.png" alt="User profile" />
      </Avatar>
    </header>
  );
};
