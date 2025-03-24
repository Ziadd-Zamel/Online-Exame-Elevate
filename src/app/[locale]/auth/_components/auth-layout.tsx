/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import React from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { socialButtons } from '@/lib/constants/api.constant';

const AuthLayout = ({ children }: Layout) => {
  return (
    <main className=" flex  min-h-screen justify-center lg:justify-start w-full lg:gap-32 xl:gap-40">
      <div className="overflow-hidden lg:block hidden  relative  w-1/2 shadow-tertiary rounded-r-[100px] ">
        {/* Left side */}
        <div className=" p-20 h-full   bg-[#f0f4fc]  ">
          <h1 className=" text-3xl xl:text-5xl font-bold xl:leading-[80px] ">
            Welcome to <br />
            <span className="text-blue-900">Elevate</span>
          </h1>
          <p className=" text-sm xl:text-lg mt-2">
            Quidem autem voluptatibus qui quaerat aspernatur <br /> architecto
            natus
          </p>
          <Image
            src={'/assets/bro.png'}
            alt=""
            width={410}
            height={380}
            className="mt-20"
          />
        </div>
      </div>
      <div className="py-20 lg:pr-20 flex flex-col w-full lg:w-1/2 ">
        <div className="flex items-center self-end gap-12 pr-10 lg:pr-12">
          <p className="flex text-xs sm:text-xl  items-center gap-1">
            English <ChevronDown size={10} />
          </p>
          <Link
            className="no-underline text-xs sm:text-xl  text-primaryMain font-bold"
            href={'/auth/login'}
          >
            Sign in
          </Link>
          <Link href="/auth/register">
            <Button
              variant={'outline'}
              className="rounded-2xl shadow-secondary text-primaryMain text-xs sm:text-xl "
            >
              Register
            </Button>
          </Link>
        </div>

        <div className=" self-center h-fit lg:self-start min-h-screen w-80 sm:w-[410px] flex flex-col gap-8 items- justify-center mt-8  ">
          {children}
          <div className="">
            <div className="flex items-center w-full gap-1">
              <div className="flex-grow h-px bg-gray-300" />
              <p className="text-sm whitespace-nowrap text-gray-500">
                Or Continue with
              </p>
              <div className="flex-grow h-px bg-gray-300" />
            </div>
            <div className="flex items-center justify-between w-full gap-3 sm:gap-7 px-6 mt-8">
              {socialButtons.map((button) => (
                <Button
                  key={button.name}
                  className="bg-transparent hover:bg-transparent w-16 h-16 rounded-2xl border-gray-300 border-[1px] shadow-icon flex items-center justify-center"
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
