// React
import React from "react";

// Next.js Components
import Image from "next/image";
import Link from "next/link";

// Types
type SubjectCardProps = {
  subject: Subject;
};

const SubjectCard = ({ subject }: SubjectCardProps) => {
  return (
    <Link
      href={`subjects/${subject.name}`}
      key={subject._id}
      className="relative w-full sm:w-[45%] h-64  xl:w-80 xl:h-72 rounded-lg overflow-hidden shadow-secondary"
    >
      {/* Subject Image */}
      <Image src={subject.icon} alt={subject.name} fill />

      {/* Overlay with subject name and description */}
      <div className="absolute w-64 sm:w-44 lg:w-64 p-3 bottom-11 left-1/2 -translate-x-1/2 text-white bg-[#1100ff66] rounded-lg backdrop-blur-lg">
        <div className="font-bold text-sm">{subject.name}</div>
        <p className=" text-xs sm:text-[10px] lg:text-xs">
          Voluptatem aut ut dignissimos blanditiis
        </p>
      </div>
    </Link>
  );
};

export default SubjectCard;
