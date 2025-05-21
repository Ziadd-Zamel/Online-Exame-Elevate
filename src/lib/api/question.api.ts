import { getAuthHeader } from "../utils/auth-header";

// Get all questoin on exam
export async function getQuestions(id: string) {
  const response = await fetch(`${process.env.API}/questions?exam=${id}`, {
    headers: {
      ...(await getAuthHeader()),
    },
  });

  const payload: APIResponse<{ questions: Question[] }> = await response.json();

  return payload;
}

// Get user questoin history
export async function getQuestionsHistory() {
  const response = await fetch(`${process.env.API}/questions/history`, {
    headers: {
      ...(await getAuthHeader()),
    },
  });

  const payload: APIResponse<{ history: HistoryItem }> = await response.json();

  return payload;
}
