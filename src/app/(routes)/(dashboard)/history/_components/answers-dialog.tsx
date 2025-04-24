// UI Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

// Local Components
import AnswerCard from "./answer-card";

// Types
type AnswersProps = {
  history: HistoryItem;
};
export default async function AnswersDialog({ history }: AnswersProps) {
  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger className="bg-blue-600 py-px text-white px-5 rounded-xl">
        Answers
      </DialogTrigger>
      {/* hidden Header */}
      <DialogHeader className="sr-only">
        <DialogTitle>Questions</DialogTitle>
        <DialogDescription className="justify-between flex items-center">
          Questions
        </DialogDescription>
      </DialogHeader>
      {/* Content */}
      <DialogContent className=" mx-auto p-4 max-w-sm lg:max-w-sm">
        {/*Answer Card*/}
        <AnswerCard history={history} />
        {/* Close Button */}
        <DialogClose asChild className="mt-5">
          <button className="w-full bg-primaryMain hover:bg-blue-600 text-white py-2 rounded-md">
            Close
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
