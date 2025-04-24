// Next.js
import Image from "next/image";
// API & Utilities
import { getExamsById } from "@/lib/api/exam.api";
import catchError from "@/lib/utils/catch-error";

// Local Components
import AnswersDialog from "./answers-dialog";

// Icons
import { getExamIcon } from "@/lib/utils/get-exam-Icon";

// Types
type ExamCardProps = {
  history: HistoryItem;
  examId: string;
};

export default async function ExamCard({ history, examId }: ExamCardProps) {
  const [payload, error] = await catchError(() => getExamsById(examId));

  // Display error message if any
  if (error) return <p className="text-red-600 text-center py-6">{error}</p>;

  const exam = payload?.exam;
  if (!exam) {
    return;
  }
  return (
    <>
      <li className="shadow-tertiary flex justify-between items-center p-6 rounded-md">
        {/* Exam */}
        <div className="flex items-center gap-4">
          <Image
            src={getExamIcon(exam.title)}
            alt={exam.title}
            className="rounded-md object-contain"
            width={60}
            height={60}
          />
          <div className="flex flex-col">
            <h2 className="font-semibold">{exam.title}</h2>
            <p className="text-gray-500 text-xs">
              {exam.numberOfQuestions} Questions
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs">{exam.duration} Minutes</p>
          <AnswersDialog history={history} />
        </div>
      </li>
    </>
  );
}
