// UI Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddDiplomaForm } from "./forms/add-diploma-form";
import { Button } from "@/components/ui/button";

export default async function AddDiplomaDialog() {
  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button className="bg-primaryMain text-white rounded-2xl px-12 h-14 font-semibold text-xl">
          Add Diploma
        </Button>
      </DialogTrigger>
      {/* hidden Header */}
      <DialogHeader className="sr-only"></DialogHeader>
      {/* Content */}
      <DialogContent className="flex flex-col h-fit max-w-2xl">
        <AddDiplomaForm />
      </DialogContent>
    </Dialog>
  );
}
