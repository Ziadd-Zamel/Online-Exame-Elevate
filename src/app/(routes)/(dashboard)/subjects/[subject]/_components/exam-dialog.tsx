// UI Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// API & Utilities
import { getQuestions } from "@/lib/api/question.api";
import catchError from "@/lib/utils/catch-error";

// Local Components
import ExamFlow from "./exam-flow";

// Icons
import { FiInbox } from "react-icons/fi";

// Types
type QuestionsDialogProps = {
  examId: string;
};

export default async function ExamDialog({ examId }: QuestionsDialogProps) {
  // Fetching questions with error handling
  const [payload, error] = await catchError(() => getQuestions(examId));

  // If an error occurs, display it to the user
  if (error) return <p>{error}</p>;

  // Extracting questions from the API response
  const questions = payload?.questions || [];

  // Extracting the exam details from the first question
  const exam = questions[0]?.exam;

  // Determining if the questions is not empty
  const isEmpty = questions.length === 0;

  return (
    <Dialog>
      {/* Trigger */}
      <DialogTrigger className="bg-blue-600 py-px text-white px-5 rounded-xl">
        Start
      </DialogTrigger>
      {/* hidden Header */}
      <DialogHeader className="sr-only">
        <DialogTitle>{exam.title}</DialogTitle>
        <DialogDescription className="justify-between flex items-center">
          {exam.numberOfQuestions} Questions
          <span>Duration: {exam.numberOfQuestions} min</span>
        </DialogDescription>
      </DialogHeader>
      {/* Content */}
      <DialogContent className="flex flex-col h-fit">
        {isEmpty ? (
          <div className="flex-1 flex flex-col justify-center items-center text-center text-gray-500 space-y-3">
            <FiInbox className="text-4xl" />
            <p className="text-lg font-semibold">No questions available</p>
            <p className="text-sm">
              Please contact the administrator to add questions to this exam.
            </p>
          </div>
        ) : (
          <ExamFlow exam={exam} questions={questions} />
        )}
      </DialogContent>
    </Dialog>
  );
}
