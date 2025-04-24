// API & Utilities
import { getSubjects } from "@/lib/api/subjects.api";
import catchError from "@/lib/utils/catch-error";

// Local Components
import ExamsList from "./_components/exams-list";

export default async function Page({ params, searchParams }: RouteProps) {
  // Params
  const { subject } = params;
  const decodedSubjectId = decodeURIComponent(subject);

  // Fetch subjects with error handling
  const [subjects] = await catchError(() => getSubjects(100));

  // Find the subject that matches the route param
  const selectedSubject = subjects?.subjects.find(
    (item) => item.name === decodedSubjectId
  );

  return (
    <>
      <ExamsList
        subjectId={selectedSubject?._id || ""}
        searchParams={searchParams}
      />
    </>
  );
}
