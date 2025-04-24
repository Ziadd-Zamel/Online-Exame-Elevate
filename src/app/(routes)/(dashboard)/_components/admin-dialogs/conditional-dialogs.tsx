"use client";

import { usePathname } from "next/navigation";
import AddDiplomaDialog from "./add-diploma-dialog";
import AddExamDialog from "./add-exam-dialog";

export default function ConditionalDialogs() {
  const pathname = usePathname();

  // Check if the current path is one of the paths for showing the Diploma dialog
  const isDiplomaPath =
    pathname === "/" || pathname === "/subject" || pathname === "/history";

  //Check if the current path is like /subjects/[something]
  const isExamPath =
    pathname.startsWith("/subjects/") && pathname.split("/").length >= 3;

  if (isExamPath) return <AddExamDialog />;
  if (isDiplomaPath) return <AddDiplomaDialog />;

  return null;
}
