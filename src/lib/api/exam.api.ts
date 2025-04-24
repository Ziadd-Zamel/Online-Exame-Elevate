import { getAuthHeader } from "../utils/auth-header";
// Get all Exams
export async function getExams() {
  const response = await fetch(`${process.env.API}/exams`, {
    headers: {
      ...(await getAuthHeader()),
    },
  });

  const payload: APIResponse<PaginatedResponse<{ exams: Exam[] }>> =
    await response.json();
  return payload;
}

// Get all Exams on a Subject
export async function getExamsBySubject(id: string) {
  const response = await fetch(`${process.env.API}/exams/?subject=${id}`, {
    headers: {
      ...(await getAuthHeader()),
    },
  });

  const payload: APIResponse<PaginatedResponse<{ exams: Exam[] }>> =
    await response.json();
  return payload;
}

// Get Exam by Id
export async function getExamsById(id: string) {
  const response = await fetch(`${process.env.API}/exams/${id}`, {
    headers: {
      ...(await getAuthHeader()),
    },
  });

  const payload: APIResponse<{ exam: Exam }> = await response.json();
  return payload;
}
