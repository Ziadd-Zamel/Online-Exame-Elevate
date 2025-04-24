import { getQuestionsHistory } from "@/lib/api/question.api";
import catchError from "@/lib/utils/catch-error";
import ExamCard from "./_components/exams-card";
import { Suspense } from "react";

export default async function Page() {
  // Fetch quiz history and handle any possible errors
  const [payload, error] = await catchError(() => getQuestionsHistory());

  // Show error state if the API call fails
  if (error) {
    return (
      <div className="w-full text-center py-12 bg-red-50 rounded-md shadow-sm">
        <p className="text-red-500">
          An error occurred while loading your quizzes. Please try again later.
        </p>
      </div>
    );
  }

  // Show empty state if user has no quiz history
  if (!payload?.history || !payload.history.QID) {
    return (
      <div className="w-full text-center py-12 bg-gray-50 rounded-md shadow-sm">
        <p className="text-gray-500">You haven’t taken any quizzes yet.</p>
      </div>
    );
  }

  const examId = payload.history.QID.exam;

  return (
    <Suspense
      fallback={
        <div className="w-full text-center py-12 bg-gray-50 rounded-md shadow-sm">
          <p className="text-gray-400 animate-pulse">loading your quizzes...</p>
        </div>
      }
    >
      <ExamCard history={payload.history} examId={examId || ""} />
    </Suspense>
  );
}
