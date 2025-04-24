// React and Next.js
import React from "react";
import Image from "next/image";
import Link from "next/link";

// UI Components
import { Button } from "@/components/ui/button";

// Constants
import { socialButtons } from "@/lib/constants/data.constant";

// Icons
import { ChevronDown } from "lucide-react";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex justify-center lg:justify-start w-full lg:gap-32 xl:gap-40">
      {/* Left side */}
      <div className="overflow-hidden lg:block min-h-screen hidden relative w-1/2 shadow-tertiary rounded-r-[100px]">
        <div className="px-20 pt-12 py-3 h-full bg-[#f0f4fc]">
          <h1 className="text-3xl xl:text-5xl font-bold xl:leading-[80px]">
            Welcome to <br />
            <span className="text-blue-900">Elevate</span>
          </h1>
          <p className="text-sm xl:text-lg mt-2">
            Quidem autem voluptatibus qui quaerat aspernatur <br /> architecto
            natus
          </p>
          <Image
            src="/assets/bro.png"
            alt=""
            width={250}
            height={250}
            className="mt-12"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="pt-16 lg:pr-20 pb-10 flex flex-col w-full lg:w-1/2">
        <div className="flex items-center self-end gap-12 pr-10 lg:pr-12">
          <p className="flex text-xs sm:text-xl items-center gap-1">
            English <ChevronDown size={10} />
          </p>
          <Link
            href="/auth/login"
            className="no-underline text-xs sm:text-xl text-primaryMain font-bold"
          >
            Sign in
          </Link>
          <Link href="/auth/register">
            <Button
              variant="outline"
              className="rounded-2xl shadow-secondary text-primaryMain text-xs sm:text-xl"
            >
              Register
            </Button>
          </Link>
        </div>

        <div className="self-center h-full lg:self-start w-80 sm:w-[410px] justify-center flex flex-col gap-8 mt-8">
          {children}
          <div>
            <div className="flex items-center w-full gap-1">
              <div className="flex-grow h-px bg-gray-300" />
              <p className="text-sm whitespace-nowrap text-gray-500">
                Or Continue with
              </p>
              <div className="flex-grow h-px bg-gray-300" />
            </div>
            <div className="flex items-center justify-between w-full gap-3 sm:gap-7 px-6 mt-5">
              {socialButtons.map((button) => (
                <Button
                  key={button.name}
                  className="bg-transparent hover:bg-transparent w-14 h-14 rounded-2xl border-gray-300 border-[1px] shadow-icon flex items-center justify-center"
                >
                  <Image
                    src={button.src}
                    alt={button.name}
                    width={25}
                    height={25}
                    priority
                  />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
