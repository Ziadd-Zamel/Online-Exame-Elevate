import Image from "next/image";
import React from "react";
import NavLinks from "../components/nav-links";

const Sidebar = () => {
  return (
    <div className=" hidden md:flex flex-col gap-14 w-60">
      <Image src={"/assets/logo.svg"} alt="Elevate" width={150} height={0} />
      <NavLinks />
    </div>
  );
};

export default Sidebar;
