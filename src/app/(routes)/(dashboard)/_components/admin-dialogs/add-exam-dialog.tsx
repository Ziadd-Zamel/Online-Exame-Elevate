// UI Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddExamForm } from "./forms/add-exam-form";
import { Button } from "@/components/ui/button";

export default async function AddExamDialog() {
  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button className="bg-primaryMain hover:bg-primaryMain text-white rounded-2xl px-8 lg:px-12 h-10 lg:h-14 font-semibold text-base lg:text-xl">
          Add Exam
        </Button>
      </DialogTrigger>
      {/* hidden Header */}
      <DialogHeader className="sr-only"></DialogHeader>
      {/* Content */}
      <DialogContent className="flex flex-col h-fit max-w-2xl">
        <AddExamForm />
      </DialogContent>
    </Dialog>
  );
}
