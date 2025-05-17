import { getAuthHeader } from "../utils/auth-header";

// Get all Subjects
export async function getSubjects(limit?: number) {
  const response = await fetch(
    `${process.env.API}/subjects?limit=${limit || 100}`,
    {
      headers: {
        ...(await getAuthHeader()),
      },
    }
  );

  const payload: APIResponse<PaginatedResponse<{ subjects: Subject[] }>> =
    await response.json();

  return payload;
}
