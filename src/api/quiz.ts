import api from "./_api";

export type QUIZ_API_TYPES = {
  getList: {
    id: string;
    title: string;
  };
  get: {
    id: string;
    title: string;
  };
  post: {
    id: string;
  };
};

export async function getQuizList() {
  const { data } = await api.get<QUIZ_API_TYPES["getList"][]>("/quiz");

  return data;
}

export async function getQuiz(id: string) {
  const { data } = await api.get<QUIZ_API_TYPES["get"]>(`/quiz/${id}`);

  return data;
}

export async function postQuiz(values: { title: string }) {
  const { data } = await api.post<QUIZ_API_TYPES["post"]>("/quiz", values);

  return data;
}

export async function deleteQuiz(id: string) {
  await api.delete(`/quiz/${id}`);
}
