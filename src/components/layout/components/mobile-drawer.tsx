import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { HiMenuAlt2 } from "react-icons/hi";
import NavLinks from "./nav-links";
import Image from "next/image";
import { IoMdClose } from "react-icons/io";

export function MobileDrawer() {
  return (
    <Drawer direction="top">
      <DrawerTrigger>
        <HiMenuAlt2 className="text-white" size={24} />
      </DrawerTrigger>
      <DrawerContent className="w-full rounded-none px-3 py-5">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Move Goal</DrawerTitle>
          <DrawerDescription>Set your daily activity goal.</DrawerDescription>
        </DrawerHeader>
        <div className="flex items-center justify-between">
          <Image src={"/assets/logo.svg"} alt="Elevate" width={90} height={0} />
          <DrawerClose className="bg-transparent border-none" asChild>
            <IoMdClose className="cursor-pointer" size={26} />
          </DrawerClose>
        </div>
        <div className="w-40 mt-8">
          <NavLinks />
        </div>
        <DrawerFooter className="sr-only">
          <Button>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
