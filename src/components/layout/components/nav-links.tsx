"use client";
import { MdSpaceDashboard } from "react-icons/md";
import { MdHistory } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri";
import React from "react";
import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const NavLinks = () => {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const navLinks = [
    {
      href: `/`,
      icon: (
        <MdSpaceDashboard
          size={22}
          className="text-primaryMain text-base lg:text-lg xl:text-2xl"
        />
      ),
      text: "Dashboard",
    },
    {
      href: "/history",
      icon: (
        <MdHistory
          size={22}
          className="text-primaryMain text-base lg:text-lg xl:text-2xl"
        />
      ),
      text: "Quiz History",
    },
  ];
  const isLinkActive = (linkHref: string): boolean => {
    // For dashboard (root route)
    if (
      linkHref === "/" &&
      (pathname === "/" || pathname === `/${params.locale}`)
    ) {
      return true;
    }

    // For other routes
    return pathname === linkHref || pathname === `/${params.locale}${linkHref}`;
  };
  const handleLogout = async () => {
    const res = await signOut({
      redirect: false,
      callbackUrl: "/auth/login",
    });

    if (res?.url) {
      router.push(res.url);
    }
  };
  return (
    <>
      <div className="flex flex-col gap-5 md:gap-8 w-full">
        {navLinks.map((link, index) => {
          const isActive = isLinkActive(link.href);
          return (
            <Link
              key={index}
              className={`flex justify-start items-center gap-5 md:gap-3 xl:gap-8 p-2 rounded-lg h-auto w-full ${
                isActive ? "bg-primaryMain text-white" : "text-[#696f79]"
              }`}
              href={link.href}
            >
              <div>
                {React.cloneElement(link.icon, {
                  className: isActive ? "text-white" : "text-primaryMain",
                })}
              </div>
              <span
                className={`font-semibold items-center  text-sm lg:text-base xl:text-xl ${
                  isActive ? "text-white" : "text-[#696f79]"
                }`}
              >
                {link.text}
              </span>
            </Link>
          );
        })}
      </div>

      <Button
        className="flex justify-start bg-transparent hover:bg-transparent items-center mt-4 md:mt-0 gap-5 xl:gap-8 p-2 h-auto w-full"
        onClick={handleLogout}
      >
        <RiLogoutBoxFill
          size={22}
          className="text-primaryMain text-base lg:text-lg xl:text-2xl"
        />
        <span className="font-semibold no-underline text-sm lg:text-base xl:text-xl  text-[#696f79]">
          Log Out
        </span>
      </Button>
    </>
  );
};

export default NavLinks;
