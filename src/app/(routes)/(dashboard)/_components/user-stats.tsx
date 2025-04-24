// React and Next
import React from "react";
import Image from "next/image";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";

// UI Components
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Icons
import { ClockIcon } from "lucide-react";
import { AiFillFlag } from "react-icons/ai";
import { FaCircleCheck } from "react-icons/fa6";

export default async function UserStats() {
  //User Data
  const session = await getServerSession(authOptions);

  //User Stats
  const userDeatails = [
    {
      id: 1,
      value: "27",
      label: "Quiz Passed",
      icon: (
        <AiFillFlag className="text-primaryMain size-5 lg:size-7 xl:size-10" />
      ),
    },
    {
      id: 2,
      value: "13 min",
      label: "Fastest Time",
      icon: (
        <ClockIcon className="text-primaryMain size-5 lg:size-7 xl:size-10" />
      ),
    },
    {
      id: 3,
      value: "200",
      label: "Correct Answers",
      icon: (
        <FaCircleCheck className="text-primaryMain size-5 lg:size-7 xl:size-10" />
      ),
    },
  ];

  return (
    <Card className="w-full px-4 py-8 shadow-secondary bg-transparent md:bg-white md:border border-none rounded-2xl">
      <CardContent className="p-0 flex lg:flex-row flex-col gap-10 lg:gap-6 lg:items-center">
        <Image
          src="/assets/profile.png"
          alt="picture"
          width={200}
          height={0}
          className="w-full sm:size-96 lg:size-40 xl:size-52 "
        />
        <div className="flex flex-col w-full max-w-[646px] gap-6">
          <div className="flex flex-col gap-1">
            <CardTitle className="font-bold capitalize text-main text-2xl text-primaryMain">
              {session?.user.username}
            </CardTitle>
            <CardDescription className="text-gray-400 text-lg">
              Voluptatem aut
            </CardDescription>
          </div>

          <Progress value={70} className="h-3 rounded-[30px] bg-gray-200" />

          <div className="flex gap-5 xl:gap-9 w-full flex-wrap">
            {userDeatails.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col md:flex-row items-center gap-4 xl:gap-5"
              >
                <div className="relative size-10 xl:size-16 shadow-secondary bg-white rounded-[10px] flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="flex items-center h-9 sm:h-fit md:items-start flex-col gap-1">
                  <div className="font-bold text-gray-500 lg:text-lg xl:text-3xl">
                    {stat.value}
                  </div>
                  <div className="font-normal text-gray-500 text-xs xl:text-base">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
