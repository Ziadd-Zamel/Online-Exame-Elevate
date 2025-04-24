// API & Utilities
import { getExamsBySubject } from "@/lib/api/exam.api";
import catchError from "@/lib/utils/catch-error";

// Local Components
import ExamDialog from "./exam-dialog";

// Icons
import { getExamIcon } from "@/lib/utils/get-exam-Icon";
import Image from "next/image";

// Types
type ExamsListProps = {
  searchParams: SearchParams;
  subjectId: string;
};

export default async function ExamsList({ subjectId }: ExamsListProps) {
  // Fetch exams data with error handling
  const [payload, error] = await catchError(() => getExamsBySubject(subjectId));

  // Display error message if any
  if (error) return <p className="text-red-600 text-center py-6">{error}</p>;

  // Check if exams exist and have content
  const hasExams = payload?.exams && payload.exams.length > 0;

  return (
    <section className="flex items-end flex-col">
      {hasExams && (
        <h1 className="self-start text-lg font-medium mb-4">Frontend Quiz</h1>
      )}

      {/* Empty state or Exams list */}
      {!hasExams ? (
        <div className="w-full text-center py-12 bg-gray-50 rounded-md shadow-sm">
          <p className="text-gray-500">
            No exams are available for this Quiz yet.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Please check back later or try another Quiz.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-6 w-full">
          {payload.exams.map((exam) => (
            <li
              key={exam._id}
              className="shadow-tertiary flex justify-between items-center p-6 rounded-md"
            >
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
                <ExamDialog examId={exam._id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
