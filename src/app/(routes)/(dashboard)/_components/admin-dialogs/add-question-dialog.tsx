// UI Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddQuestionForm from "./forms/add-question-form";

export default function AddQuestoinDialog() {
  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger asChild>
        <Button
          type="button"
          className="h-8 rounded-lg w-1/2 sm:w-48 bg-blue-500 font-bold text-white text-base"
        >
          ADD Question
        </Button>
      </DialogTrigger>
      {/* hidden Header */}
      <DialogHeader className="sr-only">
        {/* <DialogTitle>{exam.title}</DialogTitle>
          <DialogDescription className="justify-between flex items-center">
            {exam.numberOfQuestions} Questions
            <span>Duration: {exam.numberOfQuestions} min</span>
          </DialogDescription> */}
      </DialogHeader>
      {/* Content */}
      <DialogContent className="flex flex-col h-fit max-w-2xl">
        <AddQuestionForm />
      </DialogContent>
    </Dialog>
  );
}
